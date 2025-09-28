"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
  HeaderGroup,
  Row,
} from "@tanstack/react-table";
import Pill from "@/components/ui/pill";

export type Role = {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
};

type Props = {
  roles: Role[];
};

export default function RolesTable({ roles }: Props) {
  const columns = React.useMemo<ColumnDef<Role, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info: CellContext<Role, unknown>) => <div className="font-medium">{info.getValue() as string}</div>,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info: CellContext<Role, unknown>) => (
          <div className="text-sm text-muted-foreground">{(info.getValue() as string) ?? "—"}</div>
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
                    {p}
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
    []
  );

  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-4 overflow-x-auto rounded-md border">
      <table className="w-full min-w-[600px] table-auto">
        <thead className="bg-background/50 text-left text-sm text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Role>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th key={header.id} className="px-4 py-2 text-sm font-medium">
                  {header.isPlaceholder ? null : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<Role>) => (
            <tr key={row.id} className="even:bg-muted/40">
              {row.getVisibleCells().map((cell: any) => (
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
