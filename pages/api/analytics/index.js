// pages/api/analytics/index.js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { timeRange = '30' } = req.query
    const days = parseInt(timeRange)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    // Calculate previous period for growth comparison
    const previousStartDate = new Date()
    previousStartDate.setDate(previousStartDate.getDate() - (days * 2))
    const previousEndDate = new Date()
    previousEndDate.setDate(previousEndDate.getDate() - days)

    // Fetch website traffic data (simulated - you'd integrate with Google Analytics or similar)
    const traffic = await getTrafficAnalytics(startDate, days)
    
    // Fetch revenue data from database
    const revenue = await getRevenueAnalytics(startDate, previousStartDate, previousEndDate)

    return res.status(200).json({
      traffic,
      revenue
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getTrafficAnalytics(startDate, days) {
  // In a real application, you would integrate with Google Analytics API
  // For now, we'll generate simulated data based on quote requests and patterns
  
  try {
    // Get quote requests to estimate traffic conversion
    const quoteRequests = await prisma.quoteRequest.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Simulate traffic data based on quote requests
    // Assuming 1 quote request per 20-50 visitors (2-5% conversion rate)
    const conversionRate = 0.035 // 3.5% average
    const estimatedVisitors = Math.round(quoteRequests.length / conversionRate)
    const estimatedPageViews = Math.round(estimatedVisitors * 2.5) // Average 2.5 pages per session

    // Generate daily traffic data
    const dailyTraffic = []
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      
      // Simulate daily variations
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const weekendMultiplier = isWeekend ? 0.7 : 1
      
      const baseVisitors = Math.round((estimatedVisitors / days) * weekendMultiplier)
      const dailyVariation = 0.8 + (Math.random() * 0.4) // ±20% variation
      
      dailyTraffic.push({
        date: date.toISOString().split('T')[0],
        visitors: Math.round(baseVisitors * dailyVariation),
        pageViews: Math.round(baseVisitors * dailyVariation * 2.5)
      })
    }

    // Calculate growth (simulated)
    const currentPeriodVisitors = estimatedVisitors
    const previousPeriodVisitors = Math.round(currentPeriodVisitors * (0.85 + Math.random() * 0.3))
    const visitorGrowth = Math.round(((currentPeriodVisitors - previousPeriodVisitors) / previousPeriodVisitors) * 100)

    // Simulated traffic sources
    const topSources = [
      { name: 'Google Search', visitors: Math.round(estimatedVisitors * 0.45), percentage: 45 },
      { name: 'Direct', visitors: Math.round(estimatedVisitors * 0.25), percentage: 25 },
      { name: 'Social Media', visitors: Math.round(estimatedVisitors * 0.15), percentage: 15 },
      { name: 'Referrals', visitors: Math.round(estimatedVisitors * 0.10), percentage: 10 },
      { name: 'Email', visitors: Math.round(estimatedVisitors * 0.05), percentage: 5 }
    ]

    return {
      totalVisitors: estimatedVisitors,
      totalPageViews: estimatedPageViews,
      visitorGrowth,
      pageViewGrowth: visitorGrowth + Math.round((Math.random() - 0.5) * 10),
      sessionGrowth: Math.round((Math.random() - 0.5) * 20),
      conversionRate: (conversionRate * 100).toFixed(1),
      bounceRate: (35 + Math.random() * 20).toFixed(1),
      averageSessionDuration: `${Math.floor(Math.random() * 3 + 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      dailyTraffic,
      topSources
    }

  } catch (error) {
    console.error('Error generating traffic analytics:', error)
    return {
      totalVisitors: 0,
      totalPageViews: 0,
      visitorGrowth: 0,
      pageViewGrowth: 0,
      sessionGrowth: 0,
      conversionRate: '0.0',
      bounceRate: '0.0',
      averageSessionDuration: '0:00',
      dailyTraffic: [],
      topSources: []
    }
  }
}

async function getRevenueAnalytics(startDate, previousStartDate, previousEndDate) {
  try {
    // Current period revenue
    const currentInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: startDate
        },
        status: {
          in: ['paid', 'pending']
        }
      },
      include: {
        booking: {
          select: {
            service: true
          }
        }
      }
    })

    // Previous period revenue for comparison
    const previousInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        },
        status: {
          in: ['paid', 'pending']
        }
      }
    })

    const totalRevenue = currentInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const previousRevenue = previousInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    
    const revenueGrowth = previousRevenue > 0 
      ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100)
      : 0

    // Revenue by service type
    const serviceRevenue = {}
    currentInvoices.forEach(invoice => {
      const service = invoice.booking?.service || 'Other'
      serviceRevenue[service] = (serviceRevenue[service] || 0) + invoice.amount
    })

    const byServiceType = Object.entries(serviceRevenue).map(([name, value]) => ({
      name,
      value
    }))

    // Monthly revenue for the chart (last 6 months)
    const monthlyRevenue = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date()
      monthStart.setMonth(monthStart.getMonth() - i)
      monthStart.setDate(1)
      monthStart.setHours(0, 0, 0, 0)
      
      const monthEnd = new Date(monthStart)
      monthEnd.setMonth(monthEnd.getMonth() + 1)
      
      const monthInvoices = await prisma.invoice.findMany({
        where: {
          createdAt: {
            gte: monthStart,
            lt: monthEnd
          },
          status: {
            in: ['paid', 'pending']
          }
        }
      })
      
      const monthRevenue = monthInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
      
      monthlyRevenue.push({
        month: monthStart.toLocaleDateString('en-AU', { month: 'short', year: '2-digit' }),
        revenue: monthRevenue
      })
    }

    // Calculate average order value
    const averageOrderValue = currentInvoices.length > 0 
      ? totalRevenue / currentInvoices.length 
      : 0

    return {
      totalRevenue,
      revenueGrowth,
      byServiceType,
      monthlyRevenue,
      averageOrderValue
    }

  } catch (error) {
    console.error('Error calculating revenue analytics:', error)
    return {
      totalRevenue: 0,
      revenueGrowth: 0,
      byServiceType: [],
      monthlyRevenue: [],
      averageOrderValue: 0
    }
  }
}