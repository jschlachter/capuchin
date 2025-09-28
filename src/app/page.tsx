"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
      {tasks?.map(({ _id, text, isCompleted }) => {
        return (
          <div key={_id} className="p-2">
            {text} {isCompleted ? "✅" : "❌"}
          </div>
        );
      })}
    </div>
  );
}
