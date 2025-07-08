// import { PrismaClient } from '@prisma/client'
// import nodemailer from 'nodemailer'

// const prisma = new PrismaClient()

// export default async function handler(req, res) {
//   const { method } = req

//   switch (method) {
//     case 'GET':
//       try {
//         const emails = await prisma.email.findMany({
//           orderBy: {
//             createdAt: 'desc'
//           }
//         })
//         res.status(200).json(emails)
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch emails' })
//       }
//       break

//     case 'POST':
//       try {
//         const { to, subject, body } = req.body
        
//         // Create email transport (configure with your email provider)
//         const transporter = nodemailer.createTransporter({
//           // Configure your email provider here
//           host: process.env.SMTP_HOST,
//           port: 587,
//           secure: false,
//           auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS
//           }
//         })
        
//         // Send email
//         await transporter.sendMail({
//           from: process.env.SMTP_FROM,
//           to,
//           subject,
//           html: body
//         })
        
//         // Save to database
//         const email = await prisma.email.create({
//           data: {
//             businessId: 'default-business-id',
//             from: process.env.SMTP_FROM,
//             to,
//             subject,
//             body
//           }
//         })
        
//         res.status(201).json(email)
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to send email' })
//       }
//       break

//     default:
//       res.setHeader('Allow', ['GET', 'POST'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }


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