import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Router
import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './pages/Dashboard.vue';
import Inventory from './pages/Inventory.vue';
import ProductRegistration from './pages/ProductRegistration.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const routes = [
  { path: '/', component: Dashboard },
  { path: '/inventory', component: Inventory },
  { path: '/add-product', component: ProductRegistration },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app');
