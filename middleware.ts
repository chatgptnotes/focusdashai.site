import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Allow public routes
      const publicPaths = ['/', '/login', '/api/auth']
      const isPublicPath = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))

      if (isPublicPath) {
        return true
      }

      // Require authentication for all other routes
      return !!token
    },
  },
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|templates).*)'],
}
