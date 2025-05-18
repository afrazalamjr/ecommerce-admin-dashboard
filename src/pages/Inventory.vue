<template>
  <v-container>
    <h1 class="mb-6">Inventory Management</h1>
    <v-text-field
      v-model="search"
      label="Search Products"
      class="mb-4"
    />
    <v-data-table
      :headers="headers"
      :items="filteredProducts"
      :search="search"
      class="elevation-1"
      item-key="id"
      :footer-props="{ 'items-per-page-options': [5, 10, 50] }"
      disable-sort
    >
      <template #item.stock="{ item }">
        <v-text-field
          v-model.number="item.stock"
          type="number"
          min="0"
          style="max-width:70px"
          @blur="saveInventory(item)"
        />
      </template>
      <template #item.warning="{ item }">
        <span v-if="item.stock <= 5" class="text-error font-weight-bold">Low stock</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { products, updateProductInventory } from '../store'

const search = ref('')
const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Category', value: 'category' },
  { title: 'Description', value: 'description' },
  { title: 'Price', value: 'price' },
  { title: 'Stock', value: 'stock' },
  { title: 'Warning', value: 'warning' }
]
const filteredProducts = computed(() => {
  if (!search.value) return products.value
  return products.value.filter(
    p =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.description.toLowerCase().includes(search.value.toLowerCase()) ||
      p.category.toLowerCase().includes(search.value.toLowerCase())
  )
})
function saveInventory(item) {
  updateProductInventory(item.id, item.stock)
}
</script>

<style scoped>
.text-error { color: #e53935; }
</style>
