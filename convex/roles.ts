import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const createRole = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    permissions: v.array(v.string()),
    enabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existingRole = await ctx.db
      .query("roles")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingRole) {
      return existingRole._id;
    }

    const roleId = await ctx.db.insert("roles", {
      name: args.name,
      description: args.description,
      permissions: args.permissions,
      enabled: args.enabled,
    });

    return roleId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("roles").collect();
  },
});
