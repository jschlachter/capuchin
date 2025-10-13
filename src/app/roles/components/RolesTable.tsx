"use client";

import * as React from "react";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  CellContext,
  HeaderGroup,
  Row,
  SortingState,
  Header,
  Cell,
} from "@tanstack/react-table";
import { ChevronsUpDown, ChevronDown, ChevronUp, Search } from "lucide-react";
import Pill from "@/components/ui/pill";
import { matchSorter } from "match-sorter";

export type Role = {
  _id: string;
  name: string;
  description?: string | null;
  permissions: string[];
};

type Props = {
  roles: Role[];
};

export default function RolesTable() {
  const roles = useQuery(api.roles.get) || [];

  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  function Highlight({ text, query }: { text?: string | null; query: string }) {
    if (!text) return <>{""}</>;
    if (!query) return <>{text}</>;
    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    const parts: Array<{ text: string; match?: boolean }> = [];
    let start = 0;
    let idx = lower.indexOf(q, start);
    while (idx !== -1) {
      if (idx > start) parts.push({ text: text.slice(start, idx) });
      parts.push({ text: text.slice(idx, idx + q.length), match: true });
      start = idx + q.length;
      idx = lower.indexOf(q, start);
    }
    if (start < text.length) parts.push({ text: text.slice(start) });
    return (
      <>
        {parts.map((p, i) =>
          p.match ? (
            <mark key={i} className="bg-yellow-200/60 text-current rounded px-0.5">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          )
        )}
      </>
    );
  }
  const columns = React.useMemo<ColumnDef<Role, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info: CellContext<Role, unknown>) => (
          <div className="font-medium">
            <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info: CellContext<Role, unknown>) => (
          <div className="text-sm text-muted-foreground">
            <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
          </div>
        ),
      },
      {
        accessorKey: "permissions",
        header: "Permissions",
        cell: (info: CellContext<Role, unknown>) => {
          const perms = info.getValue() as string[];
          return (
            <div className="flex flex-wrap gap-2">
              {perms && perms.length > 0 ? (
                perms.map((p) => (
                  <Pill key={p} className="bg-primary/10 text-primary px-2">
                    <Highlight text={p} query={globalFilter} />
                  </Pill>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No permissions</span>
              )}
            </div>
          );
        },
      },
    ],
    [globalFilter]
  );

  const table = useReactTable({
    data: roles,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue: string) => {
      if (!filterValue) return true;
      // Build a flat array of searchable strings for the row
      const haystack: string[] = [];
      for (const cell of row.getVisibleCells()) {
        const v = cell.getValue();
        if (Array.isArray(v)) {
          haystack.push((v as string[]).join(" "));
        } else if (v != null) {
          haystack.push(String(v));
        }
      }
      const joined = haystack.join(" ");
      const results = matchSorter([joined], filterValue, { keys: [(item: string) => item] });
      return results.length > 0;
    },
  });

  return (
    <div className="mt-4 overflow-x-auto rounded-md border">
      <div className="p-3 flex items-center gap-3">
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search roles..."
            className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm"
          />
        </div>
      </div>
      <table className="w-full min-w-[600px] table-auto">
        <thead className="bg-background/50 text-left text-sm text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Role>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<Role, unknown>) => {
                const canSort = header.column.getCanSort();
                const sortState = header.column.getIsSorted();
                return (
                  <th key={header.id} className="px-4 py-2 text-sm font-medium">
                    {header.isPlaceholder ? null : (
                      <div
                        className={"flex items-center gap-2 select-none " + (canSort ? "cursor-pointer" : "")}
                        onClick={canSort ? () => header.column.toggleSorting() : undefined}
                      >
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                        <div className="flex items-center">
                          {canSort ? (
                            sortState === false ? (
                              <ChevronsUpDown size={14} className="text-muted-foreground" />
                            ) : sortState === "asc" ? (
                              <ChevronUp size={14} className="text-primary" />
                            ) : (
                              <ChevronDown size={14} className="text-primary" />
                            )
                          ) : null}
                        </div>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<Role>) => (
            <tr key={row.id} className="even:bg-muted/40">
              {row.getVisibleCells().map((cell: Cell<Role, unknown>) => (
                <td key={cell.id} className="px-4 py-3 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
