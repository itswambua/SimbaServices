


// pages/api/emails/index.js (update)
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Check if only count is requested
      if (req.query.countOnly === 'true') {
        const whereClause = {};
        
        // Filter by status if provided
        if (req.query.status) {
          whereClause.status = req.query.status;
        }
        
        const count = await prisma.email.count({
          where: whereClause
        });
        
        return res.status(200).json({ count });
      }
      
      const emails = await prisma.email.findMany({
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(emails)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch emails' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { to, subject, content } = req.body
      
      const email = await prisma.email.create({
        data: {
          to,
          subject,
          content,
          status: 'draft'
        }
      })
      
      res.status(201).json(email)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create email draft' })
    }
  }
}