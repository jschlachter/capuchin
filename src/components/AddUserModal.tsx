"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  addressLine1: z.string().min(1, "Street address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const digits = val.replace(/\D/g, "");
        if (digits.length === 9) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
        if (digits.length === 5) return digits;
        return val.trim();
      }
      return val;
    },
    z
      .string()
      .min(1, "Zip code is required")
      .regex(/^\d{5}(-\d{4})?$/, "Invalid US ZIP code")
  ),
  // _def: z.any().optional(), // temporary shim to avoid type error with useForm, --- IGNORE ---
});

type UserForm = z.infer<typeof userSchema>;

export default function AddUserModal({ onAdd }: { onAdd?: (data: UserForm) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: UserForm) {
    if (onAdd) onAdd(data);
    reset();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Add User</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
          <SheetDescription>Enter user contact details.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">First Name</span>
              <Input {...register("firstName")} />
              {errors.firstName && <span className="text-xs text-destructive">{errors.firstName.message}</span>}
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Last Name</span>
              <Input {...register("lastName")} />
              {errors.lastName && <span className="text-xs text-destructive">{errors.lastName.message}</span>}
            </label>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Email</h3>
            <p className="mt-1 text-xs text-muted-foreground">The user&apos;s primary email address.</p>

            <div className="mt-3">
              <label className="flex flex-col gap-1">
                <span className="sr-only">Email</span>
                <Input type="email" {...register("email")} placeholder="name@example.com" />
                {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
              </label>
            </div>
          </div>

          <hr className="my-4 border-t" />

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground">Phone</h3>
            <p className="mt-1 text-xs text-muted-foreground">A phone number where the user can be reached.</p>

            <div className="mt-3">
              <label className="flex flex-col gap-1">
                <span className="sr-only">Phone</span>
                <Input {...register("phone")} placeholder="(555) 555-5555" />
                {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
              </label>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Address</h3>
            <p className="mt-1 text-xs text-muted-foreground">Street address and postal details.</p>

            <div className="mt-3 space-y-3">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">Street Address</span>
                <Input {...register("addressLine1")} placeholder="123 Main St" />
                {errors.addressLine1 && <span className="text-xs text-destructive">{errors.addressLine1.message}</span>}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">Address (line 2)</span>
                <Input {...register("addressLine2")} placeholder="Apt, Suite, etc. (optional)" />
                {errors.addressLine2 && <span className="text-xs text-destructive">{errors.addressLine2.message}</span>}
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">City</span>
                  <Input {...register("city")} placeholder="City" />
                  {errors.city && <span className="text-xs text-destructive">{errors.city.message}</span>}
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">State</span>
                  <Input {...register("state")} placeholder="State" />
                  {errors.state && <span className="text-xs text-destructive">{errors.state.message}</span>}
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Zip Code</span>
                  <Input {...register("zip")} placeholder="Zip" />
                  {errors.zip && <span className="text-xs text-destructive">{errors.zip.message}</span>}
                  <span className="text-xs text-muted-foreground">Format: 5 digits (12345) or ZIP+4 (12345-6789).</span>
                </label>
              </div>
            </div>
          </div>

          <SheetFooter>
            <div className="flex w-full justify-end gap-2">
              <SheetClose asChild>
                <Button variant="ghost">Cancel</Button>
              </SheetClose>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
