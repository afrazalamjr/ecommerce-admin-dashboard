<template>
  <v-container>
    <h1 class="mb-6">Revenue Analysis Dashboard</h1>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <span class="text-h5">Total Orders</span>
          <div class="text-h4 mt-2">{{ totalOrders }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <span class="text-h5">Total Revenue</span>
          <div class="text-h4 mt-2">${{ totalRevenue.toFixed(2) }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedCategory"
          :items="['All', ...productCategories]"
          label="Category"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedPeriod"
          :items="['Daily', 'Monthly', 'All']"
          label="Period"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <BarChart :chart-data="barData" :options="barOptions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { sales, totalOrders, totalRevenue, productCategories, getProductById } from '../store'
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const selectedCategory = ref('All')
const selectedPeriod = ref('Daily')

// Prepare sales grouped by day or month, with filtered category
type GroupKey = string
const formatDate = (date: string) => date.slice(0, 10)
const formatMonth = (date: string) => date.slice(0, 7)

const filteredSales = computed(() => {
  if (selectedCategory.value === 'All') return sales.value
  return sales.value.filter(s => {
    const prod = getProductById(s.productId)
    return prod && prod.category === selectedCategory.value
  })
})

const grouped = computed(() => {
  let map: Record<GroupKey, number> = {}
  filteredSales.value.forEach(s => {
    let key = 'All'
    if (selectedPeriod.value === 'Daily') { key = formatDate(s.date) }
    else if (selectedPeriod.value === 'Monthly') { key = formatMonth(s.date) }
    if (!map[key]) map[key] = 0;
    map[key] += s.total
  })
  return map
})

const barData = computed(() => ({
  labels: Object.keys(grouped.value),
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: '#1976d2',
      data: Object.values(grouped.value),
    }
  ]
}))

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Revenue Trends' },
  },
}

const BarChart = Bar
</script>

<script lang="ts">
export default {
  components: { BarChart: Bar }
}
</script>

<style scoped>
</style>
