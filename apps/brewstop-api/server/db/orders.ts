import { useDatabase } from "nitro/database";

import type { Order, OrderItem, OrderStatus } from "../data/orders";

const mapOrderRow = (row: Record<string, unknown>): Order => {
  return {
    id: String(row.id),
    items: JSON.parse(String(row.items)) as OrderItem[],
    total: Number(row.total),
    status: row.status as OrderStatus,
    createdAt: String(row.createdAt),
  };
};

const ensureOrdersTable = async () => {
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
};

export const listOrders = async () => {
  await ensureOrdersTable();
  const db = useDatabase();

  const result = await db.sql`
    SELECT * FROM orders
    ORDER BY createdAt DESC
  `;

  const rows = result?.rows ?? [];

  return rows.map(mapOrderRow);
};

export const getOrderById = async (id: string) => {
  await ensureOrdersTable();
  const db = useDatabase();

  const result = await db.sql`
    SELECT * FROM orders WHERE id = ${id}
  `;

  const rows = result?.rows ?? [];

  if (!rows[0]) {
    return null;
  }

  return mapOrderRow(rows[0]);
};

export const createOrder = async (payload: {
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}) => {
  await ensureOrdersTable();
  const db = useDatabase();
  const order: Order = {
    id: crypto.randomUUID(),
    items: payload.items,
    total: payload.total,
    status: payload.status,
    createdAt: new Date().toISOString(),
  };

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

  return order;
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  await ensureOrdersTable();
  const db = useDatabase();

  await db.sql`
    UPDATE orders SET status = ${status} WHERE id = ${id}
  `;

  return getOrderById(id);
};

export const deleteOrder = async (id: string) => {
  await ensureOrdersTable();
  const db = useDatabase();

  await db.sql`
    DELETE FROM orders WHERE id = ${id}
  `;
};
