import { useDatabase } from "nitro/database";

export interface Hours {
  open: string;
  close: string;
  days: string[];
}

const ensureHoursTable = async () => {
  const db = useDatabase();

  await db.sql`
    CREATE TABLE IF NOT EXISTS hours (
      id TEXT PRIMARY KEY,
      open TEXT NOT NULL,
      close TEXT NOT NULL,
      days TEXT NOT NULL
    )
  `;
};

export const getHours = async () => {
  await ensureHoursTable();
  const db = useDatabase();

  const result = await db.sql`
    SELECT * FROM hours WHERE id = 'default'
  `;

  const rows = result?.rows ?? [];

  if (!rows[0]) {
    return null;
  }

  return {
    open: String(rows[0].open),
    close: String(rows[0].close),
    days: JSON.parse(String(rows[0].days)) as string[],
  } satisfies Hours;
};
