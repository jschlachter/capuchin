import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }).index("byText", ["text"]),
  users: defineTable({
    externalId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    username: v.string(),
    email: v.array(
      v.object({
        email: v.string(),
        verified: v.boolean(),
        primary: v.boolean(),
      })
    ),
    phone: v.array(
      v.object({
        phone: v.string(),
        verified: v.boolean(),
        primary: v.boolean(),
      })
    ),
    avatarUrl: v.optional(v.string()),
    locale: v.string(),
    timeZone: v.string(),
    isActive: v.boolean(),
    isLocked: v.boolean(),
    lockoutDateTime: v.optional(v.number()),
    roleIds: v.array(v.string()),
  }),
  roles: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    permissions: v.array(v.string()),
    enabled: v.boolean(),
  }),
});
