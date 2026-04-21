import ItemBox from "@/components/itemBox";
import { getDbTables } from "./actions";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  const result = await getDbTables();

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold text-foreground">MySQL tables</h1>
      {result.ok ? (
        result.tables.length === 0 ? (
          <p className="text-muted-foreground">No tables in this schema.</p>
        ) : (
          <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-2 p-0">
            {result.tables.map((table) => (
              <li key={table}>
                <ItemBox text={table} />
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="text-red-600 dark:text-red-400" role="alert">
          {result.error}
        </p>
      )}
    </main>
  );
}
