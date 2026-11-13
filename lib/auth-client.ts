import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  /** Optional on the client: requests fall back to the current origin. */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
})

export const { signIn, signUp, signOut, useSession } = authClient
