// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default async function handler(req, res) {
//   const { method } = req

//   switch (method) {
//     case 'GET':
//       try {
//         const invoices = await prisma.invoice.findMany({
//           include: {
//             customer: true,
//             booking: true
//           },
//           orderBy: {
//             createdAt: 'desc'
//           }
//         })
//         res.status(200).json(invoices)
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch invoices' })
//       }
//       break

//     case 'POST':
//       try {
//         const { customerId, amount, tax, dueDate, bookingId } = req.body
        
//         // Generate invoice number
//         const invoiceCount = await prisma.invoice.count()
//         const invoiceNumber = `INV-${String(invoiceCount + 1).padStart(4, '0')}`
        
//         const invoice = await prisma.invoice.create({
//           data: {
//             businessId: 'default-business-id', // In real app, get from auth
//             customerId,
//             bookingId,
//             invoiceNumber,
//             amount,
//             tax,
//             dueDate: new Date(dueDate)
//           },
//           include: {
//             customer: true,
//             booking: true
//           }
//         })
        
//         res.status(201).json(invoice)
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to create invoice' })
//       }
//       break

//     default:
//       res.setHeader('Allow', ['GET', 'POST'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }

// import { prisma } from '../../../lib/prisma'

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const invoices = await prisma.invoice.findMany({
//         include: { customer: true, booking: true },
//         orderBy: { createdAt: 'desc' }
//       })
//       res.status(200).json(invoices)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch invoices' })
//     }
//   }

//   if (req.method === 'POST') {
//     try {
//       const { customerId, bookingId, amount, dueDate } = req.body
      
//       // Generate invoice ID
//       const invoiceCount = await prisma.invoice.count()
//       const invoiceId = `INV-${String(invoiceCount + 1).padStart(3, '0')}`
      
//       const invoice = await prisma.invoice.create({
//         data: { 
//           invoiceId, 
//           customerId, 
//           bookingId, 
//           amount: parseFloat(amount), 
//           dueDate: new Date(dueDate) 
//         },
//         include: { customer: true, booking: true }
//       })
//       res.status(201).json(invoice)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create invoice' })
//     }
//   }
// }


// pages/api/invoices/index.js
// import { prisma } from '../../../lib/prisma'

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       // Check if only count is requested
//       if (req.query.countOnly === 'true') {
//         const whereClause = {};
        
//         // Filter by status if provided
//         if (req.query.status) {
//           whereClause.status = req.query.status;
//         }
        
//         // Get overdue invoices
//         if (req.query.status === 'overdue') {
//           whereClause.dueDate = {
//             lt: new Date()
//           };
//           whereClause.status = 'pending';
//         }
        
//         const count = await prisma.invoice.count({
//           where: whereClause
//         });
        
//         return res.status(200).json({ count });
//       }
      
//       const invoices = await prisma.invoice.findMany({
//         include: { customer: true, booking: true },
//         orderBy: { createdAt: 'desc' }
//       })
//       res.status(200).json(invoices)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch invoices' })
//     }
//   }

//   if (req.method === 'POST') {
//     try {
//       const { customerId, bookingId, amount, dueDate, items, notes, terms } = req.body
      
//       // Generate invoice ID
//       const invoiceCount = await prisma.invoice.count()
//       const invoiceId = `INV-${String(invoiceCount + 1).padStart(3, '0')}`
      
//       const invoice = await prisma.invoice.create({
//         data: { 
//           invoiceId, 
//           customerId, 
//           bookingId, 
//           amount: parseFloat(amount), 
//           dueDate: new Date(dueDate),
//           notes,
//           terms,
//           items: JSON.stringify(items) // Store as JSON string
//         },
//         include: { customer: true, booking: true }
//       })
//       res.status(201).json(invoice)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create invoice' })
//     }
//   }
// }


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
          { notes: { contains: search, mode: 'insensitive' } },
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
      
      // Generate invoice ID
      const invoiceCount = await prisma.invoice.count()
      const invoiceId = `INV-${String(invoiceCount + 1).padStart(3, '0')}`
      
      // Create invoice without terms field
      const invoice = await prisma.invoice.create({
        data: { 
          invoiceId, 
          customerId, 
          bookingId, 
          amount: parseFloat(amount), 
          dueDate: new Date(dueDate),
          notes,
          items: JSON.stringify(items) // Store as JSON string
        },
        include: { customer: true, booking: true }
      })
      
      res.status(201).json(invoice)
    } catch (error) {
      console.error('Error creating invoice:', error)
      res.status(500).json({ error: 'Failed to create invoice: ' + error.message })
    }
  }
}