//metodele pentru tabela users
import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

//returneaza accountType daca username si password sunt valide
//returneaza null in caz contrar
export const getUser = query({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const userExists = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .collect();

    return userExists;
  },
});

export const addUser = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    accountType: v.boolean(), //false -> angajat true -> angajator
  },

  handler: async (ctx, args) => {
    // Verificăm dacă utilizatorul există deja înainte de a încerca adăugarea
    const userExists = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .collect();

    if (userExists.length > 0) {
      // Utilizatorul există deja, poți trata acest caz în consecință (afisează o eroare, întoarce un mesaj, etc.)
      return "Utilizatorul există deja.";
    } else {
      // Adăugăm utilizatorul în baza de date
      await ctx.db.insert("users", {
        username: args.username,
        password: args.password,
        accountType: args.accountType,
      });
      // Returnăm un mesaj de succes sau altceva, dacă este necesar
      return "Utilizatorul a fost adăugat cu succes.";
    }
  },
});
