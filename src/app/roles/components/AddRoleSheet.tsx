"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PERMISSIONS = [
  "user:create",
  "user:read",
  "user:update",
  "user:delete",
  "role:assign",
  "role:read",
  "role:update",
  "role:delete",
];

export default function AddRoleSheet() {
  const [selected, setSelected] = React.useState<string[]>([]);

  function togglePermission(permission: string) {
    setSelected((prev) => (prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]));
  }

  function removePermission(permission: string) {
    setSelected((prev) => prev.filter((p) => p !== permission));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Role</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Role</SheetTitle>
          <SheetDescription>Fill in the details below to create a new role.</SheetDescription>
        </SheetHeader>
        <form className="p-4 flex flex-col gap-3 space-y-3">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role-name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <Input id="role-name" placeholder="Enter role name" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role-description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description
            </label>
            <Textarea id="role-description" placeholder="Enter a description for this role" rows={4} />
          </div>

          {/* Permissions selection (multi-select dropdown with pills) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Permissions</label>
            <div className="flex items-start gap-3">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select permissions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={8} className="w-64">
                    <DropdownMenuGroup>
                      {PERMISSIONS.map((perm) => (
                        <DropdownMenuCheckboxItem
                          key={perm}
                          checked={selected.includes(perm)}
                          onCheckedChange={() => togglePermission(perm)}
                        >
                          {perm}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No permissions selected</span>
                ) : (
                  selected.map((perm) => (
                    <span key={perm} className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
                      <span className="truncate">{perm}</span>
                      <button
                        type="button"
                        onClick={() => removePermission(perm)}
                        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted/50 text-xs"
                        aria-label={`Remove ${perm}`}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Enabled toggle can go here */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="role-enabled" className="h-4 w-4" defaultChecked />
            <label htmlFor="role-enabled" className="text-sm font-medium">
              Enabled
            </label>
          </div>
        </form>
        <SheetFooter>
          <div className="flex items-center justify-end gap-2">
            <SheetClose asChild>
              <Button type="submit">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
