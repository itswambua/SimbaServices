// components/layout/Sidebar.js (Updated)
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Mail, 
  Users, 
  Settings,
  MessageSquare,
  BarChart3
} from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const [counts, setCounts] = useState({
    quoteRequests: 0,
    bookings: 0,
    customers: 0,
    invoices: 0,
    emails: 0
  })
  
  useEffect(() => {
    fetchNotificationCounts()
    
    // Set up polling to update counts
    const countTimer = setInterval(() => {
      fetchNotificationCounts()
    }, 60000) // Update every minute
    
    return () => clearInterval(countTimer)
  }, [])
  
  const fetchNotificationCounts = async () => {
    try {
      // Fetch quote requests with 'new' status
      const quoteResponse = await fetch('/api/quote-requests?status=new&countOnly=true')
      const quoteData = await quoteResponse.json()
      
      // Fetch unread emails
      const emailResponse = await fetch('/api/emails?status=unread&countOnly=true')
      const emailData = await emailResponse.json()
      
      // Fetch invoices with 'overdue' status
      const invoiceResponse = await fetch('/api/invoices?status=overdue&countOnly=true')
      const invoiceData = await invoiceResponse.json()
      
      // Fetch bookings with 'pending' status
      const bookingResponse = await fetch('/api/bookings?status=pending&countOnly=true')
      const bookingData = await bookingResponse.json()
      
      // Fetch new customers created in the last 7 days
      const customerResponse = await fetch('/api/customers?newOnly=true&countOnly=true')
      const customerData = await customerResponse.json()
      
      setCounts({
        quoteRequests: quoteData.count || 0,
        bookings: bookingData.count || 0,
        customers: customerData.count || 0,
        invoices: invoiceData.count || 0,
        emails: emailData.count || 0
      })
    } catch (error) {
      console.error('Error fetching notification counts:', error)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { 
      name: 'Analytics', 
      href: '/analytics', 
      icon: BarChart3,
      description: 'Traffic & Revenue Reports'
    },
    { 
      name: 'Quote Requests', 
      href: '/quote-requests', 
      icon: MessageSquare,
      count: counts.quoteRequests
    },
    { 
      name: 'Bookings', 
      href: '/bookings', 
      icon: Calendar,
      count: counts.bookings
    },
    { 
      name: 'Customers', 
      href: '/customers', 
      icon: Users,
      count: counts.customers
    },
    { 
      name: 'Invoices', 
      href: '/invoices', 
      icon: FileText,
      count: counts.invoices
    },
    { 
      name: 'Emails', 
      href: '/emails', 
      icon: Mail,
      count: counts.emails
    },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Simba Cleaning</h1>
        <p className="text-sm text-gray-600">Admin Dashboard</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={item.description || item.name}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </div>
                
                {item.count > 0 && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {item.count > 99 ? '99+' : item.count}
                  </span>
                )}
                
                {item.name === 'Analytics' && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
      
      <div className="px-4 mt-10">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Analytics Insights</h3>
          <p className="text-xs text-blue-600 mb-3">
            Track your website performance and revenue trends in real-time.
          </p>
          <Link 
            href="/analytics"
            className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded flex items-center justify-center transition-colors"
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            View Analytics
          </Link>
        </div>
      </div>
      
      {/* <div className="px-4 mt-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Need Help?</h3>
          <p className="text-xs text-gray-600 mb-3">
            Contact technical support for assistance with the dashboard.
          </p>
          <a 
            href="mailto:support@simbacleaning.com"
            className="text-xs text-white bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded flex items-center justify-center transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div> */}
    </aside>
  )
}