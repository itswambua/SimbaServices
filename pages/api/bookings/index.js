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

import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const bookings = await prisma.booking.findMany({
        include: { customer: true },
        orderBy: { date: 'desc' }
      })
      res.status(200).json(bookings)
    } catch (error) {
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
      res.status(500).json({ error: 'Failed to create booking' })
    }
  }
}