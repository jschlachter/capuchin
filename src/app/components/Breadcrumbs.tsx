"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { users } from "@/lib/sample-users";

function formatSegment(seg: string) {
  try {
    const decoded = decodeURIComponent(seg);
    return decoded
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))
      .join(" ");
  } catch {
    return seg;
  }
}

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";

  // Normalize and split path
  const segments = pathname.split("/").filter(Boolean);

  // Render root only
  if (segments.length === 0) {
    return (
      <Breadcrumb aria-label="breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb aria-label="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          const href = "/" + segments.slice(0, idx + 1).join("/");

          // Map user id to name when path is /users/:id
          let label = formatSegment(seg);
          if (idx > 0 && segments[idx - 1] === "users" && /^\d+$/.test(seg)) {
            const u = users.find((x) => x.id === seg);
            if (u) label = `${u.firstName} ${u.lastName}`;
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
