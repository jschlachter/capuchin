
"use client";

import * as React from "react";
import { users as sampleUsers } from "@/lib/sample-users";

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
import { matchSorter } from "match-sorter";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
};

export default function UsersTable() {
        // Use local sample users for the table (fallback to empty array)
        const users: User[] = (sampleUsers as unknown as User[]) || [];

    const [globalFilter, setGlobalFilter] = React.useState<string>("");
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({
        firstName: false,
        lastName: false,
        email: false,
    });

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

    const columns = React.useMemo<ColumnDef<User, unknown>[]>(
        () => [
            {
                id: "name",
                header: "Name",
                // Make the column sortable by providing an accessor that favors lastName then firstName
                accessorFn: (row: User) => `${row.lastName} ${row.firstName}`.trim(),
                enableSorting: true,
                cell: (info: CellContext<User, unknown>) => {
                    const row = info.row.original;
                    const fullName = `${row.firstName} ${row.lastName}`.trim();
                    return (
                        <div className="flex flex-col">
                            <div className="font-medium">
                                <Highlight text={fullName} query={globalFilter} />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <Highlight text={String(row.email ?? "")} query={globalFilter} />
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "firstName",
                header: "First Name",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="font-medium">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
            {
                accessorKey: "lastName",
                header: "Last Name",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="font-medium">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
            {
                accessorKey: "email",
                header: "Email",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="text-sm text-muted-foreground">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
            {
                accessorKey: "phone",
                header: "Phone",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="text-sm text-muted-foreground">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
                    {
                        accessorKey: "addressLine1",
                        header: "Street",
                        cell: (info: CellContext<User, unknown>) => (
                            <div className="text-sm text-muted-foreground">
                                <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                            </div>
                        ),
                    },
            {
                accessorKey: "city",
                header: "City",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="text-sm text-muted-foreground">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
            {
                accessorKey: "state",
                header: "State",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="text-sm text-muted-foreground">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
            {
                accessorKey: "zip",
                header: "ZIP",
                cell: (info: CellContext<User, unknown>) => (
                    <div className="text-sm text-muted-foreground">
                        <Highlight text={String(info.getValue() ?? "")} query={globalFilter} />
                    </div>
                ),
            },
        ],
        [globalFilter]
    );

    const table = useReactTable({
        data: users,
        columns,
        state: {
            sorting,
            globalFilter,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filterValue: string) => {
            if (!filterValue) return true;
            const haystack: string[] = [];
            // Include hidden columns in the global search by iterating all cells
            for (const cell of row.getAllCells()) {
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
                        placeholder="Search users..."
                        className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm"
                    />
                </div>
            </div>
            <table className="w-full min-w-[600px] table-auto">
                <thead className="bg-background/50 text-left text-sm text-muted-foreground">
                    {table.getHeaderGroups().map((headerGroup: HeaderGroup<User>) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: Header<User, unknown>) => {
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
                    {table.getRowModel().rows.map((row: Row<User>) => (
                        <tr key={row.id} className="even:bg-muted/40">
                            {row.getVisibleCells().map((cell: Cell<User, unknown>) => (
                                <td key={cell.id} className="px-4 py-3">
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