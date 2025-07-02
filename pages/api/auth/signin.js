
// import { useState } from 'react'
// import { signIn, getSession } from 'next-auth/react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import { Mail, Lock, ArrowLeft } from 'lucide-react'

// export default function SignIn() {
//   // This page should not use the dashboard layout
//   SignIn.useLayout = false
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const result = await signIn('credentials', {
//         email,
//         password,
//         redirect: false
//       })

//       if (result?.error) {
//         setError('Invalid email or password')
//       } else {
//         // Redirect to dashboard on successful login
//         router.push('/dashboard')
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <Link href="/" className="flex items-center justify-center text-blue-600 hover:text-blue-800 mb-6">
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Website
//         </Link>
        
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Staff Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Sign in to access the dashboard
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1 relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter your password"
//                 />
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {loading ? 'Signing in...' : 'Sign in'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//               <h4 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h4>
//               <div className="text-xs text-blue-700 space-y-1">
//                 <div><strong>Admin:</strong> admin@simbacleaning.com / password123</div>
//                 <div><strong>Staff:</strong> staff@simbacleaning.com / staff123</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// pages/api/auth/signin.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    // Demo authentication - replace with real authentication logic
    const demoUsers = [
      {
        id: 1,
        email: 'admin@simbacleaning.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      }
    ]

    const user = demoUsers.find(u => u.email === email && u.password === password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate a simple token (in production, use JWT or similar)
    const token = Buffer.from(`${user.id}-${Date.now()}`).toString('base64')

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Signin error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}