
// // pages/api/auth/[...nextauth].js (UPDATE or CREATE this file)
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         // Demo users - replace with real database lookup
//         const users = [
//           {
//             id: 1,
//             email: 'admin@simbacleaning.com',
//             password: 'password123',
//             name: 'Admin User',
//             role: 'admin'
//           },
//           {
//             id: 2,
//             email: 'staff@simbacleaning.com',
//             password: 'staff123',
//             name: 'Staff User',
//             role: 'staff'
//           }
//         ]

//         const user = users.find(
//           u => u.email === credentials.email && u.password === credentials.password
//         )

//         if (user) {
//           // Return user object without password
//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role
//           }
//         }
        
//         return null // Invalid credentials
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error'
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       session.user.role = token.role
//       session.user.id = token.sub
//       return session
//     }
//   },
//   session: {
//     strategy: 'jwt'
//   },
//   secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here'
// })

// pages/api/auth/[...nextauth].js (UPDATE or CREATE this file)
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Demo users - replace with real database lookup
        const users = [
          {
            id: 1,
            email: 'admin@simbacleaning.com',
            password: 'password123',
            name: 'Admin User',
            role: 'admin',
            phone: '+61 400 123 456',
            address: '123 Main St, Sydney NSW 2000'
          },
          {
            id: 2,
            email: 'staff@simbacleaning.com',
            password: 'staff123',
            name: 'Staff User',
            role: 'staff',
            phone: '+61 400 789 012',
            address: '456 George St, Sydney NSW 2000'
          }
        ]

        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        )

        if (user) {
          // Return user object without password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone || '',
            address: user.address || ''
          }
        }
        
        return null // Invalid credentials
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.phone = user.phone
        token.address = user.address
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.sub
      session.user.phone = token.phone
      session.user.address = token.address
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here'
})