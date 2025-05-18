<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item-title class="text-h6 py-4">E-Commerce Admin</v-list-item-title>
        <v-list-item to="/" title="Dashboard" prepend-icon="mdi-view-dashboard" />
        <v-list-item to="/inventory" title="Inventory" prepend-icon="mdi-warehouse" />
        <v-list-item to="/add-product" title="Add Product" prepend-icon="mdi-plus-box" />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      </v-app-bar>
      <v-container class="mt-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style scoped>
.v-navigation-drawer {
  min-width: 240px;
}
</style>
