// // pages/api/notifications/index.js
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '../auth/[...nextauth]'

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions)
  
//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' })
//   }

//   if (req.method === 'GET') {
//     // Mock notifications data - replace with real database queries
//     const notifications = [
//       {
//         id: 1,
//         title: 'New Booking Request',
//         message: 'Sarah Johnson has requested a cleaning service for July 5th',
//         type: 'booking',
//         read: false,
//         createdAt: '2025-07-02T14:30:00Z',
//         actionUrl: '/bookings/1'
//       },
//       {
//         id: 2,
//         title: 'Payment Received',
//         message: 'Payment of $200 received from Mike Chen',
//         type: 'payment',
//         read: false,
//         createdAt: '2025-07-02T13:15:00Z',
//         actionUrl: '/invoices/89'
//       },
//       {
//         id: 3,
//         title: 'Customer Review',
//         message: 'Emma Davis left a 5-star review for your service',
//         type: 'review',
//         read: true,
//         createdAt: '2025-07-02T11:45:00Z',
//         actionUrl: '/reviews/3'
//       },
//       {
//         id: 4,
//         title: 'Schedule Reminder',
//         message: 'You have 3 appointments scheduled for tomorrow',
//         type: 'reminder',
//         read: true,
//         createdAt: '2025-07-02T09:00:00Z',
//         actionUrl: '/bookings'
//       },
//       {
//         id: 5,
//         title: 'System Update',
//         message: 'New features have been added to your dashboard',
//         type: 'system',
//         read: true,
//         createdAt: '2025-07-01T16:20:00Z',
//         actionUrl: '/dashboard'
//       }
//     ]

//     // Count unread notifications
//     const unreadCount = notifications.filter(n => !n.read).length

//     return res.status(200).json({
//       notifications,
//       unreadCount
//     })

//   } else if (req.method === 'POST') {
//     // Mark notification as read
//     const { notificationId } = req.body

//     if (!notificationId) {
//       return res.status(400).json({ message: 'Notification ID required' })
//     }

//     // TODO: Update notification read status in database
//     // await markNotificationAsRead(notificationId, session.user.id)

//     return res.status(200).json({ message: 'Notification marked as read' })

//   } else {
//     res.setHeader('Allow', ['GET', 'POST'])
//     return res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }


// pages/api/notifications/index.js - Fixed with proper payment links
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    // Mock notifications data with corrected payment links
    const notifications = [
      {
        id: 1,
        title: 'New Booking Request',
        message: 'Sarah Johnson has requested a cleaning service for July 5th',
        type: 'booking',
        read: false,
        createdAt: '2025-07-02T14:30:00Z',
        actionUrl: '/bookings',
        actionText: 'View Bookings',
        additionalInfo: {
          customerName: 'Sarah Johnson',
          serviceType: 'Regular Cleaning',
          requestedDate: 'July 5th, 2025'
        }
      },
      {
        id: 2,
        title: 'Payment Received',
        message: 'Payment of $200 received from Mike Chen for Invoice #INV-002',
        type: 'payment',
        read: false,
        createdAt: '2025-07-02T13:15:00Z',
        actionUrl: '/payments', // Fixed: now points to payments page
        actionText: 'View Payment Details',
        additionalInfo: {
          customerName: 'Mike Chen',
          amount: '$200',
          invoiceId: 'INV-002',
          paymentMethod: 'Bank Transfer'
        }
      },
      {
        id: 3,
        title: 'Customer Review',
        message: 'Emma Davis left a 5-star review for your service',
        type: 'review',
        read: true,
        createdAt: '2025-07-02T11:45:00Z',
        actionUrl: '/customers',
        actionText: 'View Customer',
        additionalInfo: {
          customerName: 'Emma Davis',
          rating: 5,
          reviewText: 'Excellent service! Very professional and thorough.'
        }
      },
      {
        id: 4,
        title: 'Schedule Reminder',
        message: 'You have 3 appointments scheduled for tomorrow',
        type: 'reminder',
        read: true,
        createdAt: '2025-07-02T09:00:00Z',
        actionUrl: '/bookings',
        actionText: 'View Schedule',
        additionalInfo: {
          appointmentCount: 3,
          date: 'Tomorrow',
          nextAppointment: '9:00 AM - John Smith'
        }
      },
      {
        id: 5,
        title: 'Invoice Generated',
        message: 'Invoice #INV-003 has been generated for Lisa Wilson',
        type: 'invoice',
        read: false,
        createdAt: '2025-07-02T08:30:00Z',
        actionUrl: '/invoices',
        actionText: 'View Invoice',
        additionalInfo: {
          invoiceId: 'INV-003',
          customerName: 'Lisa Wilson',
          amount: '$150',
          dueDate: 'July 16th, 2025'
        }
      },
      {
        id: 6,
        title: 'New Quote Request',
        message: 'Robert Brown submitted a quote request for office cleaning',
        type: 'quote',
        read: false,
        createdAt: '2025-07-01T16:45:00Z',
        actionUrl: '/quote-requests',
        actionText: 'View Quote Request',
        additionalInfo: {
          customerName: 'Robert Brown',
          serviceType: 'Office Cleaning',
          propertySize: '5000 sq ft'
        }
      },
      {
        id: 7,
        title: 'System Update',
        message: 'New features have been added to your dashboard',
        type: 'system',
        read: true,
        createdAt: '2025-07-01T16:20:00Z',
        actionUrl: '/dashboard',
        actionText: 'View Dashboard',
        additionalInfo: {
          updateType: 'Feature Update',
          version: '2.1.0',
          features: ['Enhanced analytics', 'Payment tracking', 'Improved notifications']
        }
      },
      {
        id: 8,
        title: 'Overdue Invoice Alert',
        message: 'Invoice #INV-001 is now 5 days overdue',
        type: 'alert',
        read: false,
        createdAt: '2025-07-01T10:00:00Z',
        actionUrl: '/invoices?status=overdue',
        actionText: 'View Overdue Invoices',
        additionalInfo: {
          invoiceId: 'INV-001',
          customerName: 'Alex Thompson',
          amount: '$120',
          daysPastDue: 5
        }
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