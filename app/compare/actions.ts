"use server";

import type { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";

export type GetDbTablesResult =
  | { ok: true; tables: string[] }
  | { ok: false; error: string };

function mysqlConfig() {
  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT ?? "3306");
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD ?? "";
  const database = process.env.MYSQL_DATABASE;

  if (!user) {
    return { ok: false as const, error: "Missing MYSQL_USER in .env" };
  }
  if (!database) {
    return { ok: false as const, error: "Missing MYSQL_DATABASE in .env" };
  }
  if (Number.isNaN(port)) {
    return { ok: false as const, error: "MYSQL_PORT must be a number" };
  }

  return { ok: true as const, host, port, user, password, database };
}

export async function getDbTables(): Promise<GetDbTablesResult> {
  const cfg = mysqlConfig();
  if (!cfg.ok) {
    return cfg;
  }

  let connection: Awaited<ReturnType<typeof mysql.createConnection>> | undefined;
  try {
    connection = await mysql.createConnection({
      host: cfg.host,
      port: cfg.port,
      user: cfg.user,
      password: cfg.password,
      database: cfg.database,
    });

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME",
      [cfg.database],
    );

    return {
      ok: true,
      tables: rows.map((r) => String(r.TABLE_NAME)),
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown database error";
    return { ok: false, error: message };
  } finally {
    await connection?.end().catch(() => undefined);
  }
}
