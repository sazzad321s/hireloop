import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  /** Optional on the client: requests fall back to the current origin. */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  /** Types the extra `user` fields (e.g. `role`) defined in lib/auth.ts. */
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
