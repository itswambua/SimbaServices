

// pages/api/customers/index.js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Parse query parameters
      const { search, countOnly, newOnly } = req.query
      
      // Build where clause
      const where = {}
      
      // Add search filter if provided
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } }
        ]
      }
      
      // Check for new customers (last 7 days)
      if (newOnly === 'true') {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        
        where.createdAt = {
          gte: sevenDaysAgo
        }
      }
      
      // Check if only count is requested
      if (countOnly === 'true') {
        const count = await prisma.customer.count({
          where
        })
        
        return res.status(200).json({ count })
      }
      
      // Otherwise fetch customers with filters
      const customers = await prisma.customer.findMany({
        where,
        include: {
          _count: {
            select: { bookings: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      
      res.status(200).json(customers)
    } catch (error) {
      console.error('Error in customers API:', error)
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
      console.error('Error creating customer:', error)
      res.status(500).json({ error: 'Failed to create customer' })
    }
  }
}