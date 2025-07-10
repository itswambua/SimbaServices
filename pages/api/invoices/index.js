


// pages/api/invoices/index.js - Fixed with better error handling
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Parse query parameters
      const { search, countOnly, status } = req.query
      
      // Build where clause
      const whereClause = {}
      
      // Add search filter if provided
      if (search) {
        whereClause.OR = [
          { invoiceId: { contains: search, mode: 'insensitive' } },
          // Search in customer name or email
          { 
            customer: {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
              ]
            }
          }
        ]
      }
      
      // Filter by status if provided
      if (status) {
        whereClause.status = status
      }
      
      // Get overdue invoices
      if (status === 'overdue') {
        whereClause.dueDate = {
          lt: new Date()
        }
        whereClause.status = 'pending'
      }
      
      // Check if only count is requested
      if (countOnly === 'true') {
        const count = await prisma.invoice.count({
          where: whereClause
        })
        
        return res.status(200).json({ count })
      }
      
      // Otherwise fetch invoices with filters
      const invoices = await prisma.invoice.findMany({
        where: whereClause,
        include: { customer: true, booking: true },
        orderBy: { createdAt: 'desc' }
      })
      
      res.status(200).json(invoices)
    } catch (error) {
      console.error('Error in invoices API:', error)
      res.status(500).json({ error: 'Failed to fetch invoices' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { customerId, bookingId, amount, dueDate, items, notes } = req.body
      
      // Validation
      if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' })
      }

      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return res.status(400).json({ error: 'Valid amount is required' })
      }

      if (!dueDate) {
        return res.status(400).json({ error: 'Due date is required' })
      }

      // Check if customer exists
      const customer = await prisma.customer.findUnique({
        where: { id: customerId }
      })

      if (!customer) {
        return res.status(400).json({ error: 'Customer not found' })
      }

      // Check if booking exists (if provided)
      if (bookingId) {
        const booking = await prisma.booking.findUnique({
          where: { id: bookingId }
        })

        if (!booking) {
          return res.status(400).json({ error: 'Booking not found' })
        }

        if (booking.customerId !== customerId) {
          return res.status(400).json({ error: 'Booking does not belong to the selected customer' })
        }
      }
      
      // Generate invoice ID
      const invoiceCount = await prisma.invoice.count()
      const invoiceId = `INV-${String(invoiceCount + 1).padStart(3, '0')}`
      
      // Create invoice data based on schema fields
      const invoiceData = { 
        invoiceId,
        customerId,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: 'pending'
      }
      
      // Only add optional fields if they exist
      if (bookingId) {
        invoiceData.bookingId = bookingId
      }
      
      if (items) {
        // Validate items is valid JSON
        try {
          JSON.parse(items)
          invoiceData.items = items
        } catch (e) {
          return res.status(400).json({ error: 'Invalid items format' })
        }
      }
      
      // Add notes if provided
      if (notes) {
        invoiceData.notes = notes
      }
      
      // Create the invoice
      const invoice = await prisma.invoice.create({
        data: invoiceData,
        include: { customer: true, booking: true }
      })
      
      // Return the created invoice
      res.status(201).json(invoice)
      
    } catch (error) {
      console.error('Error creating invoice:', error)
      
      // Handle specific Prisma errors
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Duplicate invoice ID. Please try again.' })
      }
      
      if (error.code === 'P2003') {
        return res.status(400).json({ error: 'Invalid customer or booking reference' })
      }
      
      res.status(500).json({ error: 'Failed to create invoice: ' + (error.message || 'Unknown error') })
    }
  }

  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}