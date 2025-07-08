// pages/api/invoices/[id].js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Invoice ID is required' })
  }

  if (req.method === 'GET') {
    try {
      const invoice = await prisma.invoice.findUnique({
        where: { id },
        include: { customer: true, booking: true }
      })
      
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' })
      }
      
      res.status(200).json(invoice)
    } catch (error) {
      console.error('Error fetching invoice:', error)
      res.status(500).json({ error: 'Failed to fetch invoice' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { customerId, bookingId, amount, dueDate, status, items, notes } = req.body
      
      const invoiceData = {
        customerId,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate)
      }
      
      // Only add optional fields if they exist
      if (bookingId) {
        invoiceData.bookingId = bookingId
      }
      
      if (status) {
        invoiceData.status = status
      }
      
      if (items) {
        invoiceData.items = items
      }
      
      // Check if notes field exists in the schema before adding it
      try {
        // Check if notes is defined in the schema by querying an invoice with notes field
        await prisma.$queryRaw`SELECT "notes" FROM "Invoice" LIMIT 1`;
        // If no error is thrown, add notes to the invoice data
        if (notes !== undefined) {
          invoiceData.notes = notes
        }
      } catch (schemaError) {
        console.warn('Notes field is not defined in the schema, skipping it');
        // Don't add notes field if it's not in the schema
      }
      
      const invoice = await prisma.invoice.update({
        where: { id },
        data: invoiceData,
        include: { customer: true, booking: true }
      })
      
      res.status(200).json(invoice)
    } catch (error) {
      console.error('Error updating invoice:', error)
      res.status(500).json({ error: 'Failed to update invoice: ' + error.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.invoice.delete({
        where: { id }
      })
      
      res.status(204).end()
    } catch (error) {
      console.error('Error deleting invoice:', error)
      res.status(500).json({ error: 'Failed to delete invoice' })
    }
  }
}