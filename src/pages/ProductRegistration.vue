<template>
  <v-container>
    <h1 class="mb-6">Add New Product</h1>
    <v-form @submit.prevent="onSubmit" v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.name" label="Product Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-select :items="categories" v-model="form.category" label="Category" required />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.price" label="Price" type="number" step="0.01" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.stock" label="Initial Stock" type="number" required />
        </v-col>
      </v-row>
      <v-textarea v-model="form.description" label="Description" rows="3" />
      <v-btn color="primary" type="submit" class="mt-4">Add Product</v-btn>
      <v-alert v-if="showAlert" type="success" class="mt-4">Product added!</v-alert>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addProduct, productCategories } from '../store'
const valid = ref(false)
const showAlert = ref(false)
const categories = productCategories
const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category: ''
})
function onSubmit() {
  if (!form.value.name || !form.value.price || !form.value.stock || !form.value.category) return
  addProduct({
    name: form.value.name,
    description: form.value.description,
    price: parseFloat(form.value.price),
    stock: parseInt(form.value.stock, 10),
    category: form.value.category,
  })
  form.value = { name: '', description: '', price: '', stock: '', category: '' }
  showAlert.value = true
  setTimeout(() => (showAlert.value = false), 1600)
}
</script>

<style scoped>
</style>
