// components/layout/NotificationsDropdown.js
import { useState, useEffect, useRef } from 'react'
import { Bell, Calendar, DollarSign, Star, Clock, Settings, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [bellAnimating, setBellAnimating] = useState(false)
  const dropdownRef = useRef(null)
  const lastCheckTimeRef = useRef(new Date().toISOString())

  useEffect(() => {
    fetchNotifications()
    
    // Set up polling for new notifications
    const notificationTimer = setInterval(() => {
      checkForNewNotifications()
    }, 30000) // Check every 30 seconds
    
    // Click outside handler to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      clearInterval(notificationTimer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/notifications')
      if (!response.ok) throw new Error('Failed to fetch notifications')
      
      const data = await response.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
      
      // Update last check time
      lastCheckTimeRef.current = new Date().toISOString()
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkForNewNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/check-new', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Last-Check-Time': lastCheckTimeRef.current
        }
      })
      
      if (!response.ok) return
      
      const data = await response.json()
      
      // If there are new notifications
      if (data.hasNewNotifications) {
        // Fetch the updated notifications
        fetchNotifications()
        
        // Animate the bell
        setBellAnimating(true)
        setTimeout(() => setBellAnimating(false), 2000)
        
        // Play notification sound if browser supports it and user hasn't muted
        try {
          const notificationSound = new Audio('/sounds/notification.mp3')
          notificationSound.volume = 0.5
          notificationSound.play().catch(e => console.log('Auto-play prevented by browser'))
        } catch (e) {
          // Silent fail - audio not crucial
        }
      }
      
      // Update the last check time regardless
      lastCheckTimeRef.current = data.lastCheckTime || new Date().toISOString()
    } catch (error) {
      console.error('Error checking for new notifications:', error)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      })
      
      if (!response.ok) throw new Error('Failed to mark notification as read')
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST'
      })
      
      if (!response.ok) throw new Error('Failed to mark all notifications as read')
      
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    setIsOpen(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4" />
      case 'payment':
        return <DollarSign className="w-4 h-4" />
      case 'review':
        return <Star className="w-4 h-4" />
      case 'reminder':
        return <Clock className="w-4 h-4" />
      case 'system':
        return <Settings className="w-4 h-4" />
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'alert':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking':
        return 'text-blue-600 bg-blue-100'
      case 'payment':
        return 'text-green-600 bg-green-100'
      case 'review':
        return 'text-yellow-600 bg-yellow-100'
      case 'reminder':
        return 'text-purple-600 bg-purple-100'
      case 'system':
        return 'text-gray-600 bg-gray-100'
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'alert':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-blue-600 bg-blue-100'
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg ${
          bellAnimating ? 'animate-bounce' : ''
        }`}
        aria-label={`Notifications - ${unreadCount} unread`}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(notification.createdAt)}
                          </span>
                          {notification.actionUrl && (
                            <Link 
                              href={notification.actionUrl}
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View <ExternalLink className="w-3 h-3 ml-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-gray-600 hover:text-gray-800"
                  disabled={unreadCount === 0}
                >
                  Mark all read
                </button>
                <Link 
                  href="/notifications"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  View all
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}