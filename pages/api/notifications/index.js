// pages/api/notifications/index.js
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    // Mock notifications data - replace with real database queries
    const notifications = [
      {
        id: 1,
        title: 'New Booking Request',
        message: 'Sarah Johnson has requested a cleaning service for July 5th',
        type: 'booking',
        read: false,
        createdAt: '2025-07-02T14:30:00Z',
        actionUrl: '/bookings/1'
      },
      {
        id: 2,
        title: 'Payment Received',
        message: 'Payment of $200 received from Mike Chen',
        type: 'payment',
        read: false,
        createdAt: '2025-07-02T13:15:00Z',
        actionUrl: '/invoices/89'
      },
      {
        id: 3,
        title: 'Customer Review',
        message: 'Emma Davis left a 5-star review for your service',
        type: 'review',
        read: true,
        createdAt: '2025-07-02T11:45:00Z',
        actionUrl: '/reviews/3'
      },
      {
        id: 4,
        title: 'Schedule Reminder',
        message: 'You have 3 appointments scheduled for tomorrow',
        type: 'reminder',
        read: true,
        createdAt: '2025-07-02T09:00:00Z',
        actionUrl: '/bookings'
      },
      {
        id: 5,
        title: 'System Update',
        message: 'New features have been added to your dashboard',
        type: 'system',
        read: true,
        createdAt: '2025-07-01T16:20:00Z',
        actionUrl: '/dashboard'
      }
    ]

    // Count unread notifications
    const unreadCount = notifications.filter(n => !n.read).length

    return res.status(200).json({
      notifications,
      unreadCount
    })

  } else if (req.method === 'POST') {
    // Mark notification as read
    const { notificationId } = req.body

    if (!notificationId) {
      return res.status(400).json({ message: 'Notification ID required' })
    }

    // TODO: Update notification read status in database
    // await markNotificationAsRead(notificationId, session.user.id)

    return res.status(200).json({ message: 'Notification marked as read' })

  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}