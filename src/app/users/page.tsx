"use client";
import React from "react";
import Link from "next/link";
import { users } from "@/lib/sample-users";
import AddUserModal from "@/components/AddUserModal";

export default function UsersPage() {
  return (
    <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>

      <div className="flex items-center justify-end">
        <AddUserModal
          onAdd={(data) => {
            // TODO: persist the new user (API call or state update)
            // For now just log the submission
            // In a real app, you'd assign an id and update the users list
            // or revalidate server data.
            console.log("New user:", data);
          }}
        />
      </div>

      <ul className="mt-4 divide-y rounded-md border">
        {users.map((u) => (
          <li key={u.id} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{`${u.firstName} ${u.lastName}`}</div>
                <div className="text-sm text-muted-foreground">{u.email}</div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>{u.phone}</div>
                <Link href={`/users/${u.id}`} className="text-primary">
                  View
                </Link>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {u.fullAddress ??
                `${u.addressLine1}${u.addressLine2 ? `, ${u.addressLine2}` : ""}, ${u.city}, ${u.state} ${u.zip}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
