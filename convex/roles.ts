import { mutation } from "./_generated/server";
import { v } from "convex/values";

const createRole = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    permissions: v.array(v.string()),
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
    });

    return roleId;
  },
});

export default { createRole };
