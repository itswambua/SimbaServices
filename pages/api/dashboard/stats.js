// pages/api/dashboard/stats.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // TODO: Replace with real database queries
    // For now, return mock data
    const stats = {
      totalBookings: 156,
      totalRevenue: 24750,
      totalInvoices: 89,
      totalCustomers: 67,
      recentBookings: [
        {
          id: 1,
          customerName: 'Sarah Johnson',
          service: 'Regular Cleaning',
          date: '2025-07-03',
          time: '10:00 AM',
          status: 'confirmed'
        },
        {
          id: 2,
          customerName: 'Mike Chen',
          service: 'Deep Cleaning',
          date: '2025-07-03',
          time: '2:00 PM',
          status: 'pending'
        },
        {
          id: 3,
          customerName: 'Emma Davis',
          service: 'Office Cleaning',
          date: '2025-07-04',
          time: '9:00 AM',
          status: 'confirmed'
        }
      ],
      recentActivity: [
        {
          id: 1,
          type: 'booking',
          message: 'New booking from Sarah Johnson',
          timestamp: '2025-07-02T10:30:00Z'
        },
        {
          id: 2,
          type: 'payment',
          message: 'Payment received from Mike Chen - $200',
          timestamp: '2025-07-02T09:15:00Z'
        },
        {
          id: 3,
          type: 'invoice',
          message: 'Invoice #089 sent to Emma Davis',
          timestamp: '2025-07-02T08:45:00Z'
        }
      ]
    }

    return res.status(200).json(stats)

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}