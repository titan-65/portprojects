import { useDatabase } from "nitro/database";

import type { MenuItem } from "../data/menu";

const mapMenuRow = (row: Record<string, unknown>): MenuItem => {
  return {
    id: String(row.id),
    name: String(row.name),
    price: Number(row.price),
    category: row.category as MenuItem["category"],
  };
};

const ensureMenuTable = async () => {
  const db = useDatabase();

  await db.sql`
    CREATE TABLE IF NOT EXISTS menu (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL
    )
  `;
};

export const listMenuItems = async () => {
  await ensureMenuTable();
  const db = useDatabase();

  const result = await db.sql`
    SELECT * FROM menu
    ORDER BY name ASC
  `;

  const rows = result?.rows ?? [];

  return rows.map(mapMenuRow);
};

export const getMenuItemById = async (id: string) => {
  await ensureMenuTable();
  const db = useDatabase();

  const result = await db.sql`
    SELECT * FROM menu WHERE id = ${id}
  `;

  const rows = result?.rows ?? [];

  if (!rows[0]) {
    return null;
  }

  return mapMenuRow(rows[0]);
};
