import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addJobSeen = mutation({
  args: {
    employee: v.string(),
    jobSeen: v.string(),
  },
  handler: async (ctx, args) => {
    const duplicate = await ctx.db
      .query("jobsSeen")
      .filter((q) =>
        q.and(
          q.eq(q.field("employee"), args.employee),
          q.eq(q.field("jobSeen"), args.jobSeen)
        )
      )
      .collect();

    if (duplicate.length == 0) {
      await ctx.db.insert("jobsSeen", {
        employee: args.employee,
        jobSeen: args.jobSeen,
      });
      return (
        "Utilizatorul" +
        args.employee +
        "tocmai l-a vazut pe " +
        args.jobSeen +
        "."
      );
    } else {
      return "Utilizatorul " + args.jobSeen + "a mai fost vazut.";
    }
  },
});

export const isSeen = query({
  args: {
    employee: v.string(),
    jobSeen: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("jobsSeen")
      .filter((q) =>
        q.and(
          q.eq(q.field("employee"), args.employee),
          q.eq(q.field("jobSeen"), args.jobSeen)
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
      .query("jobsSeen")
      .filter((q) => q.eq(q.field("employee"), args.userName))
      .collect();

    const allCV = await ctx.db.query("jobDetails").collect();

    const notJobSeenNames = [];
    for (let i = 0; i < allCV.length; i++) {
      let seen = false;
      for (let j = 0; j < allUserSeen.length; j++) {
        if (allUserSeen[j].jobSeen === allCV[i].userName) {
          seen = true;
          break;
        }
      }
      if (!seen && allCV[i].userName !== args.userName) {
        // Verificăm și excludem userName-ul dat ca argument
        notJobSeenNames.push(allCV[i].userName);
      }
    }

    return notJobSeenNames;
  },
});
