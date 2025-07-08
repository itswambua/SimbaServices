// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default async function handler(req, res) {
//   const { method } = req

//   switch (method) {
//     case 'GET':
//       try {
//         const bookings = await prisma.booking.findMany({
//           include: {
//             customer: true,
//             business: true
//           },
//           orderBy: {
//             scheduledAt: 'desc'
//           }
//         })
//         res.status(200).json(bookings)
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch bookings' })
//       }
//       break

//     case 'POST':
//       try {
//         const { customerId, title, description, scheduledAt, duration, price } = req.body
        
//         const booking = await prisma.booking.create({
//           data: {
//             businessId: 'default-business-id', // In real app, get from auth
//             customerId,
//             title,
//             description,
//             scheduledAt: new Date(scheduledAt),
//             duration,
//             price
//           },
//           include: {
//             customer: true
//           }
//         })
        
//         res.status(201).json(booking)
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to create booking' })
//       }
//       break

//     default:
//       res.setHeader('Allow', ['GET', 'POST'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }

// pages/api/bookings/index.js
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
        
//         const count = await prisma.booking.count({
//           where: whereClause
//         });
        
//         return res.status(200).json({ count });
//       }
      
//       const bookings = await prisma.booking.findMany({
//         include: { customer: true },
//         orderBy: { date: 'desc' }
//       })
//       res.status(200).json(bookings)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch bookings' })
//     }
//   }

//   if (req.method === 'POST') {
//     try {
//       const { customerId, service, date, time, address, notes } = req.body
//       const booking = await prisma.booking.create({
//         data: { customerId, service, date: new Date(date), time, address, notes },
//         include: { customer: true }
//       })
//       res.status(201).json(booking)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create booking' })
//     }
//   }
// }


// pages/api/bookings/index.js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Parse query parameters
      const { search, countOnly, status } = req.query
      
      // Build where clause
      const where = {}
      
      // Add status filter if provided
      if (status) {
        where.status = status
      }
      
      // Add search filter if provided
      if (search) {
        // Search in multiple fields
        where.OR = [
          // Search in service field
          { service: { contains: search, mode: 'insensitive' } },
          // Search in notes field
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
      
      // Check if only count is requested
      if (countOnly === 'true') {
        const count = await prisma.booking.count({
          where
        })
        
        return res.status(200).json({ count })
      }
      
      // Otherwise fetch bookings with filters
      const bookings = await prisma.booking.findMany({
        where,
        include: { customer: true },
        orderBy: { date: 'desc' }
      })
      
      res.status(200).json(bookings)
    } catch (error) {
      console.error('Error in bookings API:', error)
      res.status(500).json({ error: 'Failed to fetch bookings' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { customerId, service, date, time, address, notes } = req.body
      const booking = await prisma.booking.create({
        data: { customerId, service, date: new Date(date), time, address, notes },
        include: { customer: true }
      })
      res.status(201).json(booking)
    } catch (error) {
      console.error('Error creating booking:', error)
      res.status(500).json({ error: 'Failed to create booking' })
    }
  }
}