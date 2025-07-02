import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
        include: { customer: true }
      })
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' })
      }
      res.status(200).json(booking)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch booking' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { customerId, service, date, time, address, notes, status } = req.body
      const booking = await prisma.booking.update({
        where: { id },
        data: { 
          customerId, 
          service, 
          date: new Date(date), 
          time, 
          address, 
          notes,
          status: status || 'pending'
        },
        include: { customer: true }
      })
      res.status(200).json(booking)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.booking.delete({
        where: { id }
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete booking' })
    }
  }
}