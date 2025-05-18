import { ref, computed } from 'vue'

// --- DEMO DATA --- //

export const productCategories = ['Electronics', 'Books', 'Home', 'Fashion', 'Toys']

export const products = ref([
  { id: 1, name: 'Echo Dot', description: 'Amazon smart speaker', price: 49.99, stock: 12, category: 'Electronics' },
  { id: 2, name: 'Kindle Paperwhite', description: 'Amazon e-reader', price: 139.99, stock: 6, category: 'Electronics' },
  { id: 3, name: 'Walmart Blender', description: 'Powerful kitchen blender', price: 39.99, stock: 8, category: 'Home' },
  { id: 4, name: 'Organic Kids Pajamas', description: 'Soft sleepwear', price: 24.99, stock: 21, category: 'Fashion' },
  { id: 5, name: 'Walmart SuperFit Toy Car', description: 'Popular for kids', price: 15.49, stock: 4, category: 'Toys' },
  { id: 6, name: 'Self-Help Bestseller', description: 'Bestselling book', price: 12.99, stock: 2, category: 'Books' }
])

// {date: ISO, productId, quantity, total}
export const sales = ref([
  { date: '2024-05-16', productId: 1, quantity: 2, total: 99.98 },
  { date: '2024-05-16', productId: 2, quantity: 1, total: 139.99 },
  { date: '2024-05-15', productId: 3, quantity: 3, total: 119.97 },
  { date: '2024-05-14', productId: 4, quantity: 2, total: 49.98 },
  { date: '2024-05-13', productId: 5, quantity: 1, total: 15.49 },
  { date: '2024-05-13', productId: 6, quantity: 1, total: 12.99 },
  // more for demo
  { date: '2024-05-12', productId: 1, quantity: 1, total: 49.99 },
  { date: '2024-05-11', productId: 3, quantity: 2, total: 79.98 },
  { date: '2024-05-10', productId: 4, quantity: 1, total: 24.99 }
])

// --- COMPOSABLES 🗃️ --- //
// Utility to get product details
export const getProductById = id => products.value.find(p => p.id === id)

export const totalRevenue = computed(() =>
  sales.value.reduce((sum, s) => sum + s.total, 0)
)
export const totalOrders = computed(() =>
  sales.value.reduce((sum, s) => sum + s.quantity, 0)
)
export const revenueByCategory = computed(() => {
  const map = {}
  sales.value.forEach(s => {
    const prod = getProductById(s.productId)
    if (prod) {
      map[prod.category] = (map[prod.category] || 0) + s.total
    }
  })
  return map
})

export function addProduct(product) {
  const id = Math.max(...products.value.map(p => p.id)) + 1
  products.value.push({ ...product, id })
}
export function updateProductInventory(id, newStock) {
  const prod = getProductById(id)
  if (prod) prod.stock = newStock
}
