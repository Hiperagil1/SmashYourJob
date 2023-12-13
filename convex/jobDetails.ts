import { useQuery } from "convex/react";
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

export const getJobListForUserList = query({
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

    let matchedProfiles = [];
    let jobs = [];
    if (matches) {
      for (let i = 0; i < matches?.length; i++) {
        if (matches[i].user1 === args.userName) {
          matchedProfiles.push(matches[i].user2);
          const cv = await ctx.db
            .query("jobDetails")
            .filter((q) => q.eq(q.field("userName"), matches[i].user2))
            .collect();
          if (cv && cv.length > 0) {
            jobs.push(cv[0].jobName);
          }
        } else if (matches[i].user2 === args.userName) {
          matchedProfiles.push(matches[i].user1);
          const cv = await ctx.db
            .query("jobDetails")
            .filter((q) => q.eq(q.field("userName"), matches[i].user1))
            .collect();

          if (cv && cv.length > 0) {
            jobs.push(cv[0].jobName);
          }
        }
      }
    }
    return jobs;
  },
});
