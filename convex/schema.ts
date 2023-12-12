import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//aici sunt declarate tabelele
export default defineSchema({
  users: defineTable({
    username: v.string(),
    password: v.string(),
    accountType: v.boolean(),
  }),

  cv: defineTable({
    userName: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.string(),
    aboutMe: v.string(),
  }),

  preMatch: defineTable({
    user1: v.string(),
    user2: v.string(),
  }),

  matches: defineTable({
    user1: v.string(),
    user2: v.string(),
  }),

  usersSeen: defineTable({
    mainUser: v.string(),
    seenUser: v.string(),
  }),

  jobsSeen: defineTable({
    employee: v.string(),
    jobSeen: v.string(),
  }),

  jobDetails: defineTable({
    userName: v.string(),
    jobName: v.string(),
    salary: v.string(),
  }),
});
