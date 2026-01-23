<template>
  <div class="app-shell">
    <section class="hero">
      <div class="hero-copy">
        <span class="badge">BrewStop Live</span>
        <h1>{{ truckName }}</h1>
        <p>
          Track the BrewStop truck in real time, browse the menu, and drop in fresh
          orders while the espresso machine is still warm.
        </p>
        <div class="hero-actions">
          <button class="primary" @click="seedData">Seed demo data</button>
          <button class="ghost" @click="refresh">Refresh</button>
        </div>
      </div>
      <div class="hero-media">
        <img
          class="hero-image"
          src="/brew_hero.jpeg"
          alt="BrewStop coffee truck and espresso setup"
        />
        <div class="hero-card">
          <h2>Today’s Hours</h2>
          <div v-if="hours">
            <p class="hours-range">
              <strong>{{ hours.open }}</strong> — <strong>{{ hours.close }}</strong>
            </p>
            <p class="order-meta">Open on {{ hours.days.join(", ") }}</p>
          </div>
          <p v-else>Hours not loaded yet.</p>
        </div>
      </div>
    </section>

    <section class="card-grid">
      <div class="panel">
        <h2>Menu Highlights</h2>
        <div class="menu-list">
          <div v-for="item in menu" :key="item.id" class="menu-item">
            <span>{{ item.name }}</span>
            <div>
              <small>{{ item.category }}</small>
              <strong> · ${{ item.price.toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <h2>Order Form</h2>
        <p class="order-meta">Choose your favorites and send the order to the truck.</p>
        <form class="order-form" @submit.prevent="submitOrder">
          <div class="order-item-row" v-for="item in menu" :key="item.id">
            <div>
              <span class="menu-title">{{ item.name }}</span>
              <div class="order-meta">${{ item.price.toFixed(2) }} · {{ item.category }}</div>
            </div>
            <input
              v-model.number="orderDraft[item.id]"
              type="number"
              min="0"
              class="quantity"
            />
          </div>
          <div class="total-row">
            <span>Total</span>
            <strong>${{ orderTotal.toFixed(2) }}</strong>
          </div>
          <button class="primary" type="submit" :disabled="isSubmitting || orderTotal === 0">
            {{ isSubmitting ? "Sending..." : "Place Order" }}
          </button>
          <p v-if="orderError" class="form-error">{{ orderError }}</p>
          <p v-if="orderSuccess" class="form-success">Order sent! {{ orderSuccess }}</p>
        </form>
      </div>

      <div class="panel">
        <h2>Recent Orders</h2>
        <div class="order-list">
          <div v-for="order in orders" :key="order.id" class="order-item">
            <div>
              <span>#{{ order.id.slice(0, 6) }}</span>
              <div class="order-meta">
                {{ order.items.length }} items · ${{ order.total.toFixed(2) }}
              </div>
            </div>
            <span class="status" :class="order.status">{{ order.status }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  id: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
}

interface Hours {
  open: string;
  close: string;
  days: string[];
}

const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;

const truckName = ref("BrewStop Coffee");
const menu = ref<MenuItem[]>([]);
const hours = ref<Hours | null>(null);
const orders = ref<Order[]>([]);
const orderDraft = ref<Record<string, number>>({});
const isSubmitting = ref(false);
const orderError = ref<string | null>(null);
const orderSuccess = ref<string | null>(null);

const orderTotal = computed(() => {
  return menu.value.reduce((total, item) => {
    const quantity = orderDraft.value[item.id] ?? 0;
    return total + item.price * quantity;
  }, 0);
});

const fetchTruck = async () => {
  const response = await $fetch<{ name: string }>(`${apiBase}/api/truck`);
  truckName.value = response.name;
};

const fetchMenu = async () => {
  const response = await $fetch<{ items: MenuItem[] }>(`${apiBase}/api/menu`);
  menu.value = response.items;
  if (!Object.keys(orderDraft.value).length) {
    orderDraft.value = menu.value.reduce<Record<string, number>>((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {});
  }
};

const fetchHours = async () => {
  hours.value = await $fetch<Hours>(`${apiBase}/api/hours`);
};

const fetchOrders = async () => {
  const response = await $fetch<{ orders: Order[] }>(`${apiBase}/api/orders`);
  orders.value = response.orders;
};

const refresh = async () => {
  try {
    await Promise.all([fetchTruck(), fetchMenu(), fetchHours(), fetchOrders()]);
  } catch (err) {
    console.error("Failed to refresh data:", err);
  }
};

const seedData = async () => {
  try {
    await $fetch(`${apiBase}/api/seed`, { method: "POST" });
    await refresh();
  } catch (err) {
    console.error("Failed to seed data:", err);
    alert("Failed to seed data. Check console for details.");
  }
};

const submitOrder = async () => {
  orderError.value = null;
  orderSuccess.value = null;
  const items = menu.value
    .map((item) => ({ id: item.id, quantity: orderDraft.value[item.id] ?? 0 }))
    .filter((item) => item.quantity > 0);

  if (!items.length) {
    orderError.value = "Select at least one item to place an order.";
    return;
  }

  try {
    isSubmitting.value = true;
    const response = await $fetch<{ order: Order }>(`${apiBase}/api/orders`, {
      method: "POST",
      body: {
        items,
        total: orderTotal.value,
      },
    });
    orderSuccess.value = `Order #${response.order.id.slice(0, 6)} received.`;
    orderDraft.value = Object.keys(orderDraft.value).reduce<Record<string, number>>(
      (acc, key) => {
        acc[key] = 0;
        return acc;
      },
      {}
    );
    await fetchOrders();
  } catch (error) {
    orderError.value = "Unable to place order. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  await refresh();
});
</script>
