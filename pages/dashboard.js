// // pages/dashboard.js (UPDATE your existing file)
// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react'
// import Dashboard from '../components/dashboard/Dashboard'
// import { LogOut, User } from 'lucide-react'

// export default function DashboardPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (status === 'loading') return // Still loading

//     if (!session) {
//       router.push('/auth/signin')
//     }
//   }, [session, status, router])

//   const handleSignOut = () => {
//     signOut({ 
//       callbackUrl: '/auth/signin',
//       redirect: true 
//     })
//   }

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!session) {
//     return null // Will redirect
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-blue-600">Simba Cleaning</h1>
//               <span className="ml-4 text-gray-500">Admin Dashboard</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <User className="w-5 h-5 text-gray-400" />
//                 <span className="text-gray-700">Welcome, {session.user?.name || session.user?.email}</span>
//               </div>
//               <button
//                 onClick={handleSignOut}
//                 className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <Dashboard />
//       </main>
//     </div>
//   )
// }

// pages/dashboard.js (UPDATE your existing file)
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Dashboard from '../components/dashboard/Dashboard'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Dashboard />
    </div>
  )
}