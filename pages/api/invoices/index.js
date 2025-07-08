

// pages/api/invoices/index.js
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
      
      if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' })
      }

      if (!dueDate) {
        return res.status(400).json({ error: 'Due date is required' })
      }
      
      // Generate invoice ID
      const invoiceCount = await prisma.invoice.count()
      const invoiceId = `INV-${String(invoiceCount + 1).padStart(3, '0')}`
      
      // Create invoice data based on schema fields
      const invoiceData = { 
        invoiceId,
        customerId,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate)
      }
      
      // Only add optional fields if they exist
      if (bookingId) {
        invoiceData.bookingId = bookingId
      }
      
      if (items) {
        invoiceData.items = items
      }
      
      // Check if notes field exists in the schema before adding it
      try {
        // Check if notes is defined in the schema by querying an invoice with notes field
        await prisma.$queryRaw`SELECT "notes" FROM "Invoice" LIMIT 1`;
        // If no error is thrown, add notes to the invoice data
        if (notes) {
          invoiceData.notes = notes
        }
      } catch (schemaError) {
        console.warn('Notes field is not defined in the schema, skipping it');
        // Don't add notes field if it's not in the schema
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
      res.status(500).json({ error: 'Failed to create invoice: ' + error.message })
    }
  }
}