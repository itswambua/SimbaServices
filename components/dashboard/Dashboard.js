

// components/dashboard/Dashboard.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import StatsCard from './StatsCard'
import RecentActivity from './RecentActivity'
import { Calendar, DollarSign, FileText, Users, Clock } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalInvoices: 0,
    totalCustomers: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    
    const fetchRealtimeActivity = () => {
      // In a real app, you might use websockets or polling
      // For now, we'll simulate with a timer
      const activityTimer = setInterval(() => {
        fetchStats();
      }, 30000); // Check for new activity every 30 seconds
      
      return () => clearInterval(activityTimer);
    }

    const cleanup = fetchRealtimeActivity()
    return () => {
      cleanup(); // Clean up the timer when component unmounts
    }
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      
      // Fetch actual counts from respective endpoints
      const customersResponse = await fetch('/api/customers?countOnly=true')
      const customersData = await customersResponse.json()
      
      const bookingsResponse = await fetch('/api/bookings?countOnly=true')
      const bookingsData = await bookingsResponse.json()
      
      const invoicesResponse = await fetch('/api/invoices?countOnly=true')
      const invoicesData = await invoicesResponse.json()
      
      setStats({
        totalBookings: bookingsData.count || data.totalBookings,
        totalRevenue: data.totalRevenue,
        totalInvoices: invoicesData.count || data.totalInvoices,
        totalCustomers: customersData.count || data.totalCustomers
      })
      
      setRecentBookings(data.recentBookings || [])
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const handleBookingClick = (booking) => {
    router.push(`/bookings?id=${booking.id}`)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Invoices"
          value={stats.totalInvoices}
          icon={FileText}
          color="orange"
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments.</p>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleBookingClick(booking)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{booking.customerName}</p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}