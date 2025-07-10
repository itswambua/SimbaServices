


// components/dashboard/Dashboard.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import StatsCard from './StatsCard'
import RecentActivity from './RecentActivity'
import AnalyticsSummary from './AnalyticsSummary'
import { 
  Calendar, DollarSign, FileText, Users, Clock, 
  TrendingUp, BarChart3, Plus, ArrowRight, Bell,
  CheckCircle, AlertCircle, Eye, MessageSquare
} from 'lucide-react'

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
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    fetchStats()
    fetchAlerts()
    
    const fetchRealtimeActivity = () => {
      // In a real app, you might use websockets or polling
      // For now, we'll simulate with a timer
      const activityTimer = setInterval(() => {
        fetchStats();
        fetchAlerts();
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

  const fetchAlerts = async () => {
    try {
      // Fetch overdue invoices
      const overdueResponse = await fetch('/api/invoices?status=overdue&countOnly=true')
      const overdueData = await overdueResponse.json()
      
      // Fetch pending bookings
      const pendingResponse = await fetch('/api/bookings?status=pending&countOnly=true')
      const pendingData = await pendingResponse.json()
      
      // Fetch new quote requests
      const quotesResponse = await fetch('/api/quote-requests?status=new&countOnly=true')
      const quotesData = await quotesResponse.json()

      const newAlerts = []
      
      if (overdueData.count > 0) {
        newAlerts.push({
          type: 'warning',
          message: `${overdueData.count} overdue invoice${overdueData.count > 1 ? 's' : ''} need attention`,
          action: () => router.push('/invoices?status=overdue')
        })
      }
      
      if (pendingData.count > 0) {
        newAlerts.push({
          type: 'info',
          message: `${pendingData.count} booking${pendingData.count > 1 ? 's' : ''} pending confirmation`,
          action: () => router.push('/bookings?status=pending')
        })
      }
      
      if (quotesData.count > 0) {
        newAlerts.push({
          type: 'success',
          message: `${quotesData.count} new quote request${quotesData.count > 1 ? 's' : ''} received`,
          action: () => router.push('/quote-requests?status=new')
        })
      }
      
      setAlerts(newAlerts)
    } catch (error) {
      console.error('Error fetching alerts:', error)
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

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'info':
        return <Bell className="w-5 h-5 text-blue-500" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
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
        <div className="animate-pulse bg-white rounded-lg shadow p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString('en-AU', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getAlertBgColor(alert.type)}`}
              onClick={alert.action}
            >
              <div className="flex items-center">
                {getAlertIcon(alert.type)}
                <span className="ml-3 text-sm font-medium text-gray-900">{alert.message}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      )}

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          color="blue"
          onClick={() => router.push('/bookings')}
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
          onClick={() => router.push('/analytics')}
        />
        <StatsCard
          title="Invoices"
          value={stats.totalInvoices}
          icon={FileText}
          color="orange"
          onClick={() => router.push('/invoices')}
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="purple"
          onClick={() => router.push('/customers')}
        />
      </div>

      {/* Quick Actions - MOVED UP */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/bookings?createNew=true')}
            className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <Calendar className="w-5 h-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-blue-600 font-medium">New Booking</span>
          </button>
          
          <button
            onClick={() => router.push('/customers')}
            className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <Users className="w-5 h-5 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-green-600 font-medium">Add Customer</span>
          </button>
          
          <button
            onClick={() => router.push('/invoices')}
            className="flex items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
          >
            <FileText className="w-5 h-5 text-orange-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-orange-600 font-medium">Create Invoice</span>
          </button>
          
          <button
            onClick={() => router.push('/analytics')}
            className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <BarChart3 className="w-5 h-5 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-purple-600 font-medium">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Section - MOVED DOWN */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Analytics Overview
            </h2>
            <p className="text-gray-600 mt-1">Real-time performance metrics for today</p>
          </div>
          <button
            onClick={() => router.push('/analytics')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm shadow-md hover:shadow-lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Full Analytics
          </button>
        </div>
        <AnalyticsSummary />
      </div>

      {/* Recent Activity and Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            <button
              onClick={() => router.push('/bookings')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No upcoming appointments scheduled</p>
              <button
                onClick={() => router.push('/bookings?createNew=true')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.slice(0, 5).map((booking) => (
                <div 
                  key={booking.id} 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                  onClick={() => handleBookingClick(booking)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
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
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              ))}
              
              {recentBookings.length > 5 && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => router.push('/bookings')}
                    className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2"
                  >
                    View {recentBookings.length - 5} more appointments
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
          <Eye className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {((stats.totalRevenue / Math.max(stats.totalBookings, 1))).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Average Job Value</div>
            <div className="text-xs text-gray-500 mt-1">AUD per booking</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {stats.totalCustomers > 0 ? (stats.totalBookings / stats.totalCustomers).toFixed(1) : '0'}
            </div>
            <div className="text-sm text-gray-600">Bookings per Customer</div>
            <div className="text-xs text-gray-500 mt-1">Customer retention metric</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {stats.totalInvoices > 0 ? ((stats.totalRevenue / stats.totalInvoices)).toFixed(0) : '0'}
            </div>
            <div className="text-sm text-gray-600">Average Invoice</div>
            <div className="text-xs text-gray-500 mt-1">AUD per invoice</div>
          </div>
        </div>
      </div>
    </div>
  )
}