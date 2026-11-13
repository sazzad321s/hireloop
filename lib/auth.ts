import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { MongoClient } from "mongodb"

// The MongoDB client is created once per server process. When MONGODB_URI is
// missing, email/password auth is unavailable and better-auth reports it,
// but the rest of the app (and OAuth) still boots.
const mongoClient = process.env.MONGODB_URI
  ? new MongoClient(process.env.MONGODB_URI)
  : null

// Google is optional: only register the provider when credentials exist,
// otherwise better-auth would fail requests to /api/auth/callback/google.
const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}

export const auth = betterAuth({
  ...(mongoClient
    ? { database: mongodbAdapter(mongoClient.db('hireloop'), { client: mongoClient }) }
    : {}),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    ...google,
  },
})
