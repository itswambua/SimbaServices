// import { useState } from 'react'
// import { Search, Bell, User, LogOut, ChevronDown } from 'lucide-react'

// export default function Header({ user, onLogout }) {
//   const [showUserMenu, setShowUserMenu] = useState(false)

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Search */}
//         <div className="flex-1 max-w-lg">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="flex items-center space-x-4">
//           {/* Notifications */}
//           <button className="p-2 text-gray-400 hover:text-gray-600 relative">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
//           </button>

//           {/* User Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
//             >
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User className="w-4 h-4 text-blue-600" />
//               </div>
//               <div className="hidden md:block text-left">
//                 <div className="text-sm font-medium text-gray-900">{user?.name}</div>
//                 <div className="text-xs text-gray-500">{user?.email}</div>
//               </div>
//               <ChevronDown className="w-4 h-4 text-gray-400" />
//             </button>

//             {showUserMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
//                 <div className="px-4 py-2 border-b border-gray-100">
//                   <div className="text-sm font-medium text-gray-900">{user?.name}</div>
//                   <div className="text-xs text-gray-500">{user?.email}</div>
//                   {user?.role && (
//                     <div className="text-xs text-blue-600 capitalize">{user.role}</div>
//                   )}
//                 </div>
                
//                 <button
//                   onClick={() => {
//                     setShowUserMenu(false)
//                     // Navigate to profile/settings
//                   }}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   Profile Settings
//                 </button>
                
//                 <button
//                   onClick={() => {
//                     setShowUserMenu(false)
//                     onLogout()
//                   }}
//                   className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// components/layout/Header.js
// import { useState, useRef, useEffect } from 'react'
// import { useSession, signOut } from 'next-auth/react'
// import { Search, User, LogOut, Settings, ChevronDown } from 'lucide-react'
// import Link from 'next/link'
// import NotificationsDropdown from './NotificationsDropdown'

// export default function Header() {
//   const { data: session } = useSession()
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
//   const userMenuRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setIsUserMenuOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const handleSignOut = () => {
//     signOut({ 
//       callbackUrl: '/auth/signin',
//       redirect: true 
//     })
//   }

//   const getUserInitials = (name) => {
//     if (!name) return 'U'
//     return name.split(' ').map(n => n[0]).join('').toUpperCase()
//   }

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left side - Logo and Search */}
//           <div className="flex items-center flex-1">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-blue-600">Simba Cleaning</h1>
//               <span className="ml-3 text-gray-500">Admin Dashboard</span>
//             </div>
            
//             {/* Search Bar */}
//             <div className="max-w-lg w-full lg:max-w-xs ml-8">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Search..."
//                   type="search"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right side - Notifications and User Menu */}
//           <div className="flex items-center space-x-4">
//             {/* Notifications */}
//             <NotificationsDropdown />

//             {/* User Menu */}
//             <div className="relative" ref={userMenuRef}>
//               <button
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                 className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                   {getUserInitials(session?.user?.name)}
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium text-gray-900">
//                     {session?.user?.name || 'Admin User'}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {session?.user?.email}
//                   </p>
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               </button>

//               {/* Dropdown Menu */}
//               {isUserMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//                   <div className="py-1">
//                     {/* User Info Header */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">
//                         {session?.user?.name || 'Admin User'}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {session?.user?.email}
//                       </p>
//                       <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mt-1">
//                         {session?.user?.role || 'Admin'}
//                       </span>
//                     </div>

//                     {/* Menu Items */}
//                     <Link
//                       href="/profile/settings"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     >
//                       <User className="w-4 h-4 mr-3" />
//                       Profile Settings
//                     </Link>

//                     <Link
//                       href="/settings"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     >
//                       <Settings className="w-4 h-4 mr-3" />
//                       Account Settings
//                     </Link>

//                     <div className="border-t border-gray-100 my-1"></div>
                    
//                     <button
//                       onClick={handleSignOut}
//                       className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
//                     >
//                       <LogOut className="w-4 h-4 mr-3" />
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }



// components/layout/Header.js
import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Search, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NotificationsDropdown from './NotificationsDropdown'

export default function Header() {
  const { data: session } = useSession()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const userMenuRef = useRef(null)
  const searchResultsRef = useRef(null)
  const searchInputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
      if (searchResultsRef.current && 
          !searchResultsRef.current.contains(event.target) && 
          searchInputRef.current !== event.target) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      performSearch(searchTerm)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchTerm])

  const performSearch = async (query) => {
    setIsSearching(true)
    
    try {
      // Search customers
      const customersResponse = await fetch(`/api/customers?search=${encodeURIComponent(query)}`)
      const customersData = await customersResponse.json()
      
      // Search bookings
      const bookingsResponse = await fetch(`/api/bookings?search=${encodeURIComponent(query)}`)
      const bookingsData = await bookingsResponse.json()
      
      // Search invoices
      const invoicesResponse = await fetch(`/api/invoices?search=${encodeURIComponent(query)}`)
      const invoicesData = await invoicesResponse.json()
      
      // Combine results
      const results = [
        ...customersData.map(item => ({
          type: 'customer',
          title: item.name,
          subtitle: item.email,
          url: `/customers?id=${item.id}`,
          id: item.id
        })),
        ...bookingsData.map(item => ({
          type: 'booking',
          title: `${item.service} for ${item.customer?.name || 'Unknown'}`,
          subtitle: new Date(item.date).toLocaleDateString() + ' ' + item.time,
          url: `/bookings?id=${item.id}`,
          id: item.id
        })),
        ...invoicesData.map(item => ({
          type: 'invoice',
          title: `Invoice #${item.invoiceId}`,
          subtitle: `${item.customer?.name || 'Unknown'} - ${new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(item.amount)}`,
          url: `/invoices?id=${item.id}`,
          id: item.id
        }))
      ]
      
      setSearchResults(results)
      setShowSearchResults(results.length > 0)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setShowSearchResults(false)
    }
  }

  const handleSearchResultClick = (url) => {
    router.push(url)
    setShowSearchResults(false)
    setSearchTerm('')
  }

  const handleSignOut = () => {
    signOut({ 
      callbackUrl: '/auth/signin',
      redirect: true 
    })
  }

  const getUserInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Search */}
          <div className="flex items-center flex-1">
            <div className="flex items-center">
              <Link href="/dashboard">
                <h1 className="text-xl font-bold text-blue-600">Simba Cleaning</h1>
              </Link>
              <span className="ml-3 text-gray-500">Admin Dashboard</span>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-lg w-full lg:max-w-xs ml-8 relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={searchInputRef}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search customers, bookings, invoices..."
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      if (searchResults.length > 0) {
                        setShowSearchResults(true)
                      }
                    }}
                  />
                  {isSearching && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                    </div>
                  )}
                </div>
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div 
                  ref={searchResultsRef}
                  className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto z-50"
                >
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No results found
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((result, index) => (
                        <div 
                          key={`${result.type}-${result.id}`}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleSearchResultClick(result.url)}
                        >
                          <div className="flex items-start">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3
                              ${result.type === 'customer' ? 'bg-blue-100 text-blue-600' : 
                                result.type === 'booking' ? 'bg-green-100 text-green-600' : 
                                'bg-orange-100 text-orange-600'}
                            `}>
                              {result.type === 'customer' ? <User className="w-4 h-4" /> : 
                               result.type === 'booking' ? <span className="text-sm font-bold">B</span> : 
                               <span className="text-sm font-bold">I</span>}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{result.title}</div>
                              <div className="text-xs text-gray-500">{result.subtitle}</div>
                              <div className="text-xs text-gray-400 capitalize">{result.type}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationsDropdown />

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {getUserInitials(session?.user?.name)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {session?.user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session?.user?.email}
                      </p>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mt-1">
                        {session?.user?.role || 'Admin'}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href="/profile/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Account Settings
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
