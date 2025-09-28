import React from "react";
import { users } from "@/lib/sample-users";

type Props = {
  params: { id: string };
};

export default function UserPage({ params }: Props) {
  const { id } = params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
        <h1 className="text-2xl font-semibold">User Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">No user with ID {id}.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
      <h1 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h1>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div>
          <strong>Email:</strong> <span className="ml-2">{user.email}</span>
        </div>
        <div>
          <strong>Phone:</strong> <span className="ml-2">{user.phone}</span>
        </div>
        <div>
          <strong>Address:</strong>
          <div className="ml-2">
            {user.fullAddress ?? (
              <>
                <div>
                  {user.addressLine1}
                  {user.addressLine2 ? `, ${user.addressLine2}` : ""}
                </div>
                <div>{`${user.city}, ${user.state} ${user.zip}`}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
