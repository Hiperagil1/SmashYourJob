import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addCV = mutation({
  args: {
    userName: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.string(),
    aboutMe: v.string(),
  },
  handler: async (ctx, args) => {
    const cvExists = await ctx.db
      .query("cv")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();
    if (cvExists.length > 0) return "You already have a CV.";
    else {
      await ctx.db.insert("cv", {
        userName: args.userName,
        firstName: args.firstName,
        lastName: args.lastName,
        phone: args.phone,
        email: args.email,
        address: args.address,
        aboutMe: args.aboutMe,
      });
      return "CV creat cu succes!";
    }
  },
});

export const getCV = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const cv = await ctx.db
      .query("cv")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();

    return cv;
  },
});

export const cvExists = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const cvExists = await ctx.db
      .query("cv")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();

    if (cvExists.length > 0) return true;
    else return false;
  },
});

export const allCV = query({
  handler: async (ctx, args) => {
    const allCV = await ctx.db.query("cv").collect(); // Utilizăm ctx.db.query pentru a accesa tabela 'cv' și find() pentru a obține toate înregistrările
    return allCV;
  },
});
