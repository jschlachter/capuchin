import { Button } from "@/components/ui/button";
import AddRoleSheet from "./components/AddRoleSheet";
import RolesTable, { type Role } from "./components/RolesTable";

const sampleRoles: Role[] = [
  {
    id: "role-1",
    name: "Admin",
    description: "Full access to all resources",
    permissions: ["read", "write", "delete"],
  },
  {
    id: "role-2",
    name: "Editor",
    description: "Can edit content",
    permissions: ["read", "write"],
  },
  {
    id: "role-3",
    name: "Viewer",
    description: "Read-only access",
    permissions: ["read"],
  },
];

export default function RolesPage() {
  return (
    <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Roles</h1>
      </div>

      <div className="flex items-center justify-end">
        <AddRoleSheet />
      </div>

      <div className="mt-4">
        <RolesTable roles={sampleRoles} />
      </div>
    </div>
  );
}
