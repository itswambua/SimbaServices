// pages/api/quote-requests.js (update)
import { prisma } from '../../lib/prisma'

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
        
        const count = await prisma.quoteRequest.count({
          where: whereClause
        });
        
        return res.status(200).json({ count });
      }
      
      // Get limit if provided
      const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
      
      // Build where clause
      const whereClause = {};
      if (req.query.status) {
        whereClause.status = req.query.status;
      }
      
      const quoteRequests = await prisma.quoteRequest.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc'
        },
        ...(limit && { take: limit })
      })
      
      res.status(200).json(quoteRequests)
    } catch (error) {
      console.error('Error fetching quote requests:', error)
      res.status(500).json({ error: 'Failed to fetch quote requests' })
    }
  }




  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        phone,
        service,
        propertySize,
        message,
        submittedAt,
        status
      } = req.body

      // Validate required fields
      if (!name || !email || !service) {
        return res.status(400).json({ 
          error: 'Missing required fields: name, email, and service are required' 
        })
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Invalid email format' 
        })
      }

      // Validate phone if provided
      if (phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
        const australianMobileRegex = /^(\+?61|0)?4\d{8}$/
        const australianLandlineRegex = /^(\+?61|0)?[23578]\d{8}$/
        
        if (!australianMobileRegex.test(cleanPhone) && !australianLandlineRegex.test(cleanPhone)) {
          return res.status(400).json({ 
            error: 'Invalid phone number format' 
          })
        }
      }

      // Create the quote request
      const quoteRequest = await prisma.quoteRequest.create({
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          service,
          propertySize: propertySize || null,
          message: message ? message.trim() : null,
          status: status || 'new',
          submittedAt: submittedAt ? new Date(submittedAt) : new Date()
        }
      })

      // TODO: Send email notification to admin
      // TODO: Send confirmation email to customer

      res.status(201).json({
        success: true,
        message: 'Quote request submitted successfully',
        id: quoteRequest.id
      })
      
    } catch (error) {
      console.error('Error creating quote request:', error)
      res.status(500).json({ 
        error: 'Failed to submit quote request. Please try again.' 
      })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, status, notes, adminNotes } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Quote request ID is required' })
      }

      const updatedRequest = await prisma.quoteRequest.update({
        where: { id },
        data: {
          status: status || undefined,
          notes: notes !== undefined ? notes : undefined,
          adminNotes: adminNotes !== undefined ? adminNotes : undefined,
          updatedAt: new Date()
        }
      })

      res.status(200).json({
        success: true,
        message: 'Quote request updated successfully',
        data: updatedRequest
      })
      
    } catch (error) {
      console.error('Error updating quote request:', error)
      res.status(500).json({ 
        error: 'Failed to update quote request' 
      })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Quote request ID is required' })
      }

      await prisma.quoteRequest.delete({
        where: { id }
      })

      res.status(200).json({
        success: true,
        message: 'Quote request deleted successfully'
      })
      
    } catch (error) {
      console.error('Error deleting quote request:', error)
      res.status(500).json({ 
        error: 'Failed to delete quote request' 
      })
    }
  }

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}