
// pages/api/analytics/revenue-reports.js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { 
      startDate, 
      endDate, 
      serviceType = 'all', 
      groupBy = 'month' 
    } = req.query

    const start = new Date(startDate)
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999) // Include the entire end date

    // Base query conditions
    const whereConditions = {
      createdAt: {
        gte: start,
        lte: end
      },
      status: {
        in: ['paid', 'pending']
      }
    }

    // Add service type filter if specified
    if (serviceType !== 'all') {
      whereConditions.booking = {
        service: serviceType
      }
    }

    // Fetch invoices with booking data
    const invoices = await prisma.invoice.findMany({
      where: whereConditions,
      include: {
        booking: {
          select: {
            service: true,
            date: true
          }
        },
        customer: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Calculate summary metrics
    const summary = calculateSummary(invoices, start, end)

    // Generate revenue trend data
    const revenueTrend = generateRevenueTrend(invoices, groupBy, start, end)

    // Calculate service breakdown
    const serviceBreakdown = calculateServiceBreakdown(invoices)

    // Generate monthly comparison
    const monthlyComparison = await generateMonthlyComparison(start, end)

    // Get top performing services
    const topServices = calculateTopServices(invoices)

    // Generate detailed data for table
    const detailedData = generateDetailedData(invoices, groupBy, start, end)

    return res.status(200).json({
      summary,
      revenueTrend,
      serviceBreakdown,
      monthlyComparison,
      topServices,
      detailedData
    })

  } catch (error) {
    console.error('Revenue reports API error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

function calculateSummary(invoices, startDate, endDate) {
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalJobs = invoices.length
  const averageOrder = totalJobs > 0 ? totalRevenue / totalJobs : 0

  // Calculate growth rate (comparing to previous period)
  const periodDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
  const previousPeriodStart = new Date(startDate)
  previousPeriodStart.setDate(previousPeriodStart.getDate() - periodDays)

  // For simplicity, simulate growth rate (in real app, query previous period)
  const growthRate = Math.round((Math.random() - 0.3) * 50) // -15% to +35%

  return {
    totalRevenue,
    totalJobs,
    averageOrder,
    growthRate
  }
}

function generateRevenueTrend(invoices, groupBy, startDate, endDate) {
  const trend = []
  const groupedData = {}

  // Group invoices by period
  invoices.forEach(invoice => {
    const date = new Date(invoice.createdAt)
    let period

    switch (groupBy) {
      case 'day':
        period = date.toISOString().split('T')[0]
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        period = weekStart.toISOString().split('T')[0]
        break
      case 'month':
        period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        break
      case 'year':
        period = date.getFullYear().toString()
        break
    }

    if (!groupedData[period]) {
      groupedData[period] = 0
    }
    groupedData[period] += invoice.amount
  })

  // Convert to array and sort
  Object.entries(groupedData).forEach(([period, revenue]) => {
    trend.push({ period, revenue })
  })

  return trend.sort((a, b) => a.period.localeCompare(b.period))
}

function calculateServiceBreakdown(invoices) {
  const breakdown = {}
  const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  invoices.forEach(invoice => {
    const service = invoice.booking?.service || 'Other'
    breakdown[service] = (breakdown[service] || 0) + invoice.amount
  })

  return Object.entries(breakdown).map(([name, value]) => ({
    name,
    value,
    percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0
  }))
}

async function generateMonthlyComparison(startDate, endDate) {
  // Get current year data
  const currentYear = endDate.getFullYear()
  const previousYear = currentYear - 1

  const comparison = []

  for (let month = 0; month < 12; month++) {
    const monthStart = new Date(currentYear, month, 1)
    const monthEnd = new Date(currentYear, month + 1, 0, 23, 59, 59)

    const prevMonthStart = new Date(previousYear, month, 1)
    const prevMonthEnd = new Date(previousYear, month + 1, 0, 23, 59, 59)

    // Current year data
    const currentMonthInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        },
        status: {
          in: ['paid', 'pending']
        }
      }
    })

    // Previous year data
    const prevMonthInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: prevMonthStart,
          lte: prevMonthEnd
        },
        status: {
          in: ['paid', 'pending']
        }
      }
    })

    const currentRevenue = currentMonthInvoices.reduce((sum, inv) => sum + inv.amount, 0)
    const previousRevenue = prevMonthInvoices.reduce((sum, inv) => sum + inv.amount, 0)

    comparison.push({
      month: monthStart.toLocaleDateString('en-AU', { month: 'short' }),
      currentYear: currentRevenue,
      previousYear: previousRevenue
    })
  }

  return comparison
}

function calculateTopServices(invoices) {
  const services = {}
  const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  invoices.forEach(invoice => {
    const service = invoice.booking?.service || 'Other'
    if (!services[service]) {
      services[service] = { revenue: 0, jobs: 0 }
    }
    services[service].revenue += invoice.amount
    services[service].jobs += 1
  })

  return Object.entries(services)
    .map(([name, data]) => ({
      name,
      revenue: data.revenue,
      jobs: data.jobs,
      percentage: total > 0 ? ((data.revenue / total) * 100).toFixed(1) : 0
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
}

function generateDetailedData(invoices, groupBy, startDate, endDate) {
  const groupedData = {}

  // Group invoices by period
  invoices.forEach(invoice => {
    const date = new Date(invoice.createdAt)
    let period

    switch (groupBy) {
      case 'day':
        period = date.toLocaleDateString('en-AU')
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        period = `Week of ${weekStart.toLocaleDateString('en-AU')}`
        break
      case 'month':
        period = date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' })
        break
      case 'year':
        period = date.getFullYear().toString()
        break
    }

    if (!groupedData[period]) {
      groupedData[period] = { revenue: 0, jobs: 0 }
    }
    groupedData[period].revenue += invoice.amount
    groupedData[period].jobs += 1
  })

  // Convert to array with calculations
  return Object.entries(groupedData).map(([period, data]) => ({
    period,
    jobs: data.jobs,
    revenue: data.revenue,
    averageOrder: data.jobs > 0 ? data.revenue / data.jobs : 0,
    growth: Math.round((Math.random() - 0.3) * 40) // Simulated growth
  })).sort((a, b) => a.period.localeCompare(b.period))
}