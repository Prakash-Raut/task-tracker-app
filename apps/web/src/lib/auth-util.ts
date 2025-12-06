// import { auth } from "@task-tracker-app/auth"
// import { headers } from "next/headers"
// import { redirect } from "next/navigation"

// export const requireAuth = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   })

//   if (!session || !session.user) {
//     redirect("/login")
//   }

//   return {
//     session: session.session,
//     user: session.user,
//   }
// }
