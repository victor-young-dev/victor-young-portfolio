import { getSql } from "@/lib/db";

/**
 * Small hand-rolled query builders shared by every collection's CRUD actions.
 * Table/column names here are always fixed strings from our own code, never
 * client input, so string-building them is safe — only VALUES are parameterized.
 *
 * The return type defaults to `JsonRow` rather than `Record<string, unknown>` —
 * server functions must prove their return value is JSON-serializable, and an
 * `unknown` index signature can't be proven, only a concrete primitive union can.
 */
export type JsonRow = Record<string, string | number | boolean | null | string[]>;

export async function listGeneric<T extends JsonRow = JsonRow>(
  table: string,
  orderBy = "sort_order, id",
): Promise<T[]> {
  const sql = await getSql();
  return sql.query<T>(`select * from ${table} order by ${orderBy}`);
}

export async function insertGeneric<T extends JsonRow = JsonRow>(
  table: string,
  data: Record<string, unknown>,
  jsonColumns: string[] = [],
): Promise<T> {
  const sql = await getSql();
  const columns = Object.keys(data);
  const placeholders = columns.map((col, i) => (jsonColumns.includes(col) ? `$${i + 1}::jsonb` : `$${i + 1}`));
  const values = columns.map((col) => (jsonColumns.includes(col) ? JSON.stringify(data[col]) : data[col]));
  const rows = await sql.query<T>(
    `insert into ${table} (${columns.join(", ")}) values (${placeholders.join(", ")}) returning *`,
    values,
  );
  return rows[0];
}

export async function updateGeneric<T extends JsonRow = JsonRow>(
  table: string,
  id: number,
  data: Record<string, unknown>,
  jsonColumns: string[] = [],
): Promise<T> {
  const sql = await getSql();
  const columns = Object.keys(data);
  const sets = columns.map((col, i) => `${col} = $${i + 1}${jsonColumns.includes(col) ? "::jsonb" : ""}`);
  const values = columns.map((col) => (jsonColumns.includes(col) ? JSON.stringify(data[col]) : data[col]));
  const rows = await sql.query<T>(
    `update ${table} set ${sets.join(", ")} where id = $${columns.length + 1} returning *`,
    [...values, id],
  );
  return rows[0];
}

export async function deleteGeneric(table: string, id: number): Promise<void> {
  const sql = await getSql();
  await sql.query(`delete from ${table} where id = $1`, [id]);
}
