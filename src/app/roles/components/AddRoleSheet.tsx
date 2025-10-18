"use client";

import React, { useState } from "react";
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
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";

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
  const createRole = useMutation(api.roles.createRole);

  const roleSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be 50 characters or less"),
    // make description optional and coerce empty string to undefined
    description: z.string().max(250).optional(),
    permissions: z.array(z.string()).min(1, "Select at least one permission"),
    enabled: z.boolean().optional(),
  });

  type RoleForm = z.infer<typeof roleSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RoleForm>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "", description: "", permissions: [], enabled: true },
  });

  const [open, setOpen] = useState(false);

  const permissions = watch("permissions") || [];

  function removePermission(permission: string) {
    setValue(
      "permissions",
      permissions.filter((p) => p !== permission)
    );
  }

  const onSubmit: SubmitHandler<RoleForm> = async (data) => {
    // Call the Convex mutation to create the role and log the result
    try {
      // Ensure enabled is a boolean (Convex mutation requires boolean)
      const payload = { ...data, enabled: Boolean(data.enabled) } as RoleForm & { enabled: boolean };
      const id = await createRole(payload);
      console.log("Create role", data, "->", id);
      // On success: reset the form to default values and close the sheet
      reset({ name: "", description: "", permissions: [], enabled: true });
      setOpen(false);
    } catch (err) {
      console.error("Failed to create role", err);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">Add Role</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Role</SheetTitle>
          <SheetDescription>Fill in the details below to create a new role.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-3 space-y-3">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role-name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <Input id="role-name" placeholder="Enter role name" {...register("name")} />
            {errors.name ? <p className="text-sm text-destructive">{String(errors.name.message)}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role-description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description
            </label>
            <Textarea
              id="role-description"
              placeholder="Enter a description for this role"
              rows={4}
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-destructive">{String(errors.description.message)}</p>
            ) : null}
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
                          checked={permissions.includes(perm)}
                          onCheckedChange={(checked) => {
                            const current = permissions || [];
                            if (checked) {
                              if (!current.includes(perm)) setValue("permissions", [...current, perm]);
                            } else {
                              setValue(
                                "permissions",
                                current.filter((p: string) => p !== perm)
                              );
                            }
                          }}
                        >
                          {perm}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap gap-2">
                {permissions.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No permissions selected</span>
                ) : (
                  permissions.map((perm) => (
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
                {errors.permissions ? (
                  <p className="text-sm text-destructive">{String(errors.permissions.message)}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Enabled toggle can go here */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="role-enabled" className="h-4 w-4" {...register("enabled")} />
            <label htmlFor="role-enabled" className="text-sm font-medium">
              Enabled
            </label>
          </div>

          <SheetFooter>
            <div className="flex items-center justify-end gap-2">
              <SheetClose asChild>
                <Button>Cancel</Button>
              </SheetClose>
              <Button type="submit">Save</Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
