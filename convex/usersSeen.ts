import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addUserSeen = mutation({
  args: {
    mainUser: v.string(),
    seenUser: v.string(),
  },
  handler: async (ctx, args) => {
    const duplicate = await ctx.db
      .query("usersSeen")
      .filter((q) =>
        q.and(
          q.eq(q.field("mainUser"), args.mainUser),
          q.eq(q.field("seenUser"), args.seenUser)
        )
      )
      .collect();

    if (duplicate.length == 0) {
      await ctx.db.insert("usersSeen", {
        mainUser: args.mainUser,
        seenUser: args.seenUser,
      });
      return (
        "Utilizatorul" +
        args.mainUser +
        "tocmai l-a vazut pe " +
        args.seenUser +
        "."
      );
    } else {
      return "Utilizatorul " + args.seenUser + "a mai fost vazut.";
    }
  },
});

export const isSeen = query({
  args: {
    mainUser: v.string(),
    seenUser: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("usersSeen")
      .filter((q) =>
        q.and(
          q.eq(q.field("mainUser"), args.mainUser),
          q.eq(q.field("seenUser"), args.seenUser)
        )
      )
      .collect();
  },
});

export const notSeen = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const allUserSeen = await ctx.db
      .query("usersSeen")
      .filter((q) => q.eq(q.field("mainUser"), args.userName))
      .collect();

    const allCV = await ctx.db.query("cv").collect();

    const notSeenUserNames = [];
    for (let i = 0; i < allCV.length; i++) {
      let seen = false;
      for (let j = 0; j < allUserSeen.length; j++) {
        if (allUserSeen[j].seenUser === allCV[i].userName) {
          seen = true;
          break;
        }
      }
      if (!seen && allCV[i].userName !== args.userName) {
        // Verificăm și excludem userName-ul dat ca argument
        notSeenUserNames.push(allCV[i].userName);
      }
    }

    return notSeenUserNames;
  },
});
