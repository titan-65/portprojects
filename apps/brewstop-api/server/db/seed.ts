import { useDatabase } from "nitro/database";

import type { MenuItem } from "../data/menu";
import type { OrderItem } from "../data/orders";

const seedMenu = async () => {
  const db = useDatabase();

  await db.sql`
    CREATE TABLE IF NOT EXISTS menu (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL
    )
  `;

  await db.sql`DELETE FROM menu`;

  const items: MenuItem[] = [
    { id: "latte", name: "Latte", price: 4.5, category: "coffee" },
    { id: "espresso", name: "Espresso", price: 3, category: "coffee" },
    { id: "chai", name: "Chai Tea", price: 4, category: "tea" },
    { id: "croissant", name: "Croissant", price: 3.5, category: "food" },
  ];

  for (const item of items) {
    await db.sql`
      INSERT INTO menu (id, name, price, category)
      VALUES (${item.id}, ${item.name}, ${item.price}, ${item.category})
    `;
  }

  return items;
};

const seedHours = async () => {
  const db = useDatabase();

  await db.sql`
    CREATE TABLE IF NOT EXISTS hours (
      id TEXT PRIMARY KEY,
      open TEXT NOT NULL,
      close TEXT NOT NULL,
      days TEXT NOT NULL
    )
  `;

  await db.sql`DELETE FROM hours`;

  const hours = {
    id: "default",
    open: "08:00",
    close: "16:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  };

  await db.sql`
    INSERT INTO hours (id, open, close, days)
    VALUES (${hours.id}, ${hours.open}, ${hours.close}, ${JSON.stringify(hours.days)})
  `;

  return hours;
};

const seedOrders = async () => {
  const db = useDatabase();

  await db.sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `;

  await db.sql`DELETE FROM orders`;

  const now = new Date();
  const orders = [
    {
      id: crypto.randomUUID(),
      items: [
        { id: "latte", quantity: 2 },
        { id: "croissant", quantity: 1 },
      ] as OrderItem[],
      total: 12.5,
      status: "ready",
      createdAt: new Date(now.getTime() - 1000 * 60 * 25).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      items: [{ id: "espresso", quantity: 1 }] as OrderItem[],
      total: 3,
      status: "preparing",
      createdAt: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      items: [
        { id: "chai", quantity: 1 },
        { id: "latte", quantity: 1 },
      ] as OrderItem[],
      total: 8.5,
      status: "pending",
      createdAt: now.toISOString(),
    },
  ];

  for (const order of orders) {
    await db.sql`
      INSERT INTO orders (id, items, total, status, createdAt)
      VALUES (
        ${order.id},
        ${JSON.stringify(order.items)},
        ${order.total},
        ${order.status},
        ${order.createdAt}
      )
    `;
  }

  return orders;
};

export const seedDatabase = async () => {
  const menu = await seedMenu();
  const hours = await seedHours();
  const orders = await seedOrders();

  return { menu, hours, orders };
};
