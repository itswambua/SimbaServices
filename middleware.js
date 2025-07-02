import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// Only protect these specific routes - NOT the home page
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/bookings/:path*', 
    '/customers/:path*',
    '/invoices/:path*',
    '/emails/:path*',
    '/settings/:path*'
  ]
}