import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addJobDetails = mutation({
  args: {
    userName: v.string(),
    jobName: v.string(),
    salary: v.string(),
  },
  handler: async (ctx, args) => {
    const jobExists = await ctx.db
      .query("jobDetails")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();
    if (jobExists.length > 0) return "You already have a Job.";
    else {
      await ctx.db.insert("jobDetails", {
        userName: args.userName,
        jobName: args.jobName,
        salary: args.salary,
      });
      return "Un job a fost creat cu succes!";
    }
  },
});

export const jobExists = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const jobExists = await ctx.db
      .query("jobDetails")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();

    if (jobExists.length > 0) return true;
    else return false;
  },
});

export const getJobDetails = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const cv = await ctx.db
      .query("jobDetails")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();

    return cv;
  },
});
