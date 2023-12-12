import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { useMutation, useQuery } from "convex/react";

export const addPreMatch = mutation({
  args: {
    currentUser: v.string(),
    matchedUser: v.string(),
  },
  handler: async (ctx, args) => {
    //verificam daca nu ne a dat smash deja userul la caruia vrem sa i dam noi
    const isMatch = await ctx.db
      .query("preMatch")
      .filter((q) =>
        q.and(
          q.eq(q.field("user1"), args.matchedUser),
          q.eq(q.field("user2"), args.currentUser)
        )
      )
      .unique();

    const preMatchExist = await ctx.db
      .query("preMatch")
      .filter((q) =>
        q.and(
          q.eq(q.field("user1"), args.currentUser),
          q.eq(q.field("user2"), args.matchedUser)
        )
      )
      .collect();

    if (preMatchExist && preMatchExist.length > 0) {
      return "Acest preMatch exista deja in tabela!";
    } else if (isMatch == null) {
      await ctx.db.insert("preMatch", {
        user1: args.currentUser,
        user2: args.matchedUser,
      });
      return "A match is waiting " + args.matchedUser + " to smash.";
    } else {
      await ctx.db.delete(isMatch._id);
      const matchExist = await ctx.db
        .query("matches")
        .filter((q) =>
          q.or(
            q.and(
              q.eq(q.field("user1"), args.currentUser),
              q.eq(q.field("user2"), args.matchedUser)
            ),
            q.and(
              q.eq(q.field("user1"), args.matchedUser),
              q.eq(q.field("user2"), args.currentUser)
            )
          )
        )
        .collect();

      if (matchExist && matchExist.length > 0) {
        return "This match already exist!";
      } else {
        await ctx.db.insert("matches", {
          user1: args.currentUser,
          user2: args.matchedUser,
        });
        return "It's a match!";
      }
    }
  },
});

export const allPreMatch = query({
  handler: async (ctx) => {
    return await ctx.db.query("preMatch").collect();
  },
});

export const getMatches = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("matches")
      .filter((q) =>
        q.or(
          q.eq(q.field("user1"), args.userName),
          q.eq(q.field("user2"), args.userName)
        )
      )
      .collect();

    return matches;
  },
});
