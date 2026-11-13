import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { APIError } from "better-auth/api"
import { MongoClient } from "mongodb"

import { DEFAULT_USER_ROLE, isUserRole, USER_ROLES } from "@/lib/user-roles"

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
    ? {
        database: mongodbAdapter(mongoClient.db("hireloop"), {
          client: mongoClient,
        }),
      }
    : {}),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        required: true,
        defaultValue: DEFAULT_USER_ROLE,
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Accept only known roles. OAuth sign-ups don't send a role, so they
        // fall back to the default instead of failing.
        before: async (user) => {
          const role = user.role ?? DEFAULT_USER_ROLE

          if (!isUserRole(role)) {
            throw new APIError("BAD_REQUEST", {
              message: `Role must be one of: ${USER_ROLES.join(", ")}.`,
            })
          }

          return { data: { ...user, role } }
        },
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    ...google,
  },
})
