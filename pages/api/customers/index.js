import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          _count: {
            select: { bookings: true }
          }
        }
      })
      res.status(200).json(customers)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customers' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, address } = req.body
      const customer = await prisma.customer.create({
        data: { name, email, phone, address }
      })
      res.status(201).json(customer)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create customer' })
    }
  }
}