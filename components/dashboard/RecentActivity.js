

// components/dashboard/RecentActivity.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Calendar, DollarSign, FileText, Clock, MessageSquare, User, Mail } from 'lucide-react'

export default function RecentActivity() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    try {
      // Fetch the dashboard stats
      const statsResponse = await fetch('/api/dashboard/stats')
      const statsData = await statsResponse.json()
      
      // Fetch recent quote requests
      const quoteResponse = await fetch('/api/quote-requests?limit=5')
      const quoteData = await quoteResponse.json()
      
      // Combine the activities
      let combinedActivities = [...(statsData.recentActivity || [])]
      
      // Convert quote requests to activity format
      if (Array.isArray(quoteData)) {
        const quoteActivities = quoteData.map(quote => ({
          id: `quote-${quote.id}`,
          type: 'quote',
          message: `New quote request from ${quote.name} for ${quote.service}`,
          timestamp: quote.submittedAt,
          data: quote
        }))
        combinedActivities = [...combinedActivities, ...quoteActivities]
      }
      
      // Sort by timestamp (most recent first)
      combinedActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      // Take the 10 most recent activities
      setActivities(combinedActivities.slice(0, 10))
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleActivityClick = (activity) => {
    switch (activity.type) {
      case 'booking':
        router.push(`/bookings?id=${activity.data?.id || ''}`)
        break
      case 'payment':
      case 'invoice':
        router.push(`/invoices?id=${activity.data?.id || ''}`)
        break
      case 'quote':
        router.push(`/quote-requests?id=${activity.data?.id || ''}`)
        break
      case 'customer':
        router.push(`/customers?id=${activity.data?.id || ''}`)
        break
      case 'email':
        router.push(`/emails?id=${activity.data?.id || ''}`)
        break
      default:
        // If we don't have a specific route, just go to the type's main page
        router.push(`/${activity.type}s`)
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4" />
      case 'payment':
        return <DollarSign className="w-4 h-4" />
      case 'invoice':
        return <FileText className="w-4 h-4" />
      case 'quote':
        return <MessageSquare className="w-4 h-4" />
      case 'customer':
        return <User className="w-4 h-4" />
      case 'email':
        return <Mail className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'booking':
        return 'text-blue-600 bg-blue-100'
      case 'payment':
        return 'text-green-600 bg-green-100'
      case 'invoice':
        return 'text-orange-600 bg-orange-100'
      case 'quote':
        return 'text-purple-600 bg-purple-100'
      case 'customer':
        return 'text-yellow-600 bg-yellow-100'
      case 'email':
        return 'text-indigo-600 bg-indigo-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity to display.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleActivityClick(activity)}
            >
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}