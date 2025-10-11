import { Button } from "@/components/ui/button";
import AddRoleSheet from "./components/AddRoleSheet";
import RolesTable, { type Role } from "./components/RolesTable";

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
        <RolesTable />
      </div>
    </div>
  );
}
