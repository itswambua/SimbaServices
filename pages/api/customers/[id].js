import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id },
        include: { bookings: true, invoices: true }
      })
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' })
      }
      res.status(200).json(customer)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customer' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, email, phone, address } = req.body
      const customer = await prisma.customer.update({
        where: { id },
        data: { name, email, phone, address }
      })
      res.status(200).json(customer)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update customer' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.customer.delete({
        where: { id }
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete customer' })
    }
  }
}