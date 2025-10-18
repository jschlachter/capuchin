"use client";
import React from "react";
import Link from "next/link";
import { users } from "@/lib/sample-users";
import AddUserModal from "@/components/AddUserModal";
import UsersTable from "./components/UsersTable";

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

      <div className="mt-4">
        <UsersTable />
      </div>
    </div>
  );
}
