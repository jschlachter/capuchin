"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  BookOpen,
  Command,
  GalleryVerticalEnd,
  User,
  Settings2,
} from "lucide-react";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavSecurity } from "./NavSecurity";

// This is sample data.
const data = {
  teams: [
    { name: "Acme Inc.", logo: GalleryVerticalEnd, plan: "Pro" },
    { name: "Monsters Inc.", logo: BookOpen, plan: "Enterprise" },
    { name: "Soylent Corp.", logo: Command, plan: "Trial" },
  ],
  security: [
    {
      title: "Manage",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Groups",
          url: "/groups",
        },
        {
          title: "Roles",
          url: "/roles",
        },
        {
          title: "Permissions",
          url: "/permissions",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecurity items={data.security} />
      </SidebarContent>
      <SidebarFooter>{/* footer content */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
