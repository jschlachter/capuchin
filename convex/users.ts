import { mutation } from "./_generated/server";
import { v } from "convex/values";

const createUser = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("externalId"), args.externalId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      externalId: args.externalId,
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username,
      email: args.email,
      phone: args.phone,
      avatarUrl: args.avatarUrl,
      locale: args.locale,
      timeZone: args.timeZone,
      isActive: args.isActive,
      isLocked: args.isLocked,
      lockoutDateTime: args.lockoutDateTime,
      roleIds: args.roleIds,
    });

    return userId;
  },
});

export default { createUser };
