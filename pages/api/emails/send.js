// pages/api/emails/send.js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { to, subject, content, attachments = [], from = 'Simba Cleaning <info@simbacleaning.com>' } = req.body

    if (!to || !subject || !content) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // In a production app, you would send the actual email here
    // For now, we'll just save it to the database

    // Create a new email record
    const email = await prisma.email.create({
      data: {
        to,
        subject,
        content,
        status: 'sent', // In a real app, you'd set this after confirming the email was sent
        sentAt: new Date(),
      }
    })

    // Also create a notification for the sent email
    await prisma.notification.create({
      data: {
        type: 'system',
        title: `Email Sent: ${subject}`,
        message: `Email was sent to ${to}`,
        read: false,
        createdAt: new Date(),
        additionalInfo: JSON.stringify({
          recipient: to,
          subject: subject,
          sentAt: new Date().toISOString()
        })
      }
    }).catch(error => {
      // Don't fail the entire request if notification creation fails
      console.error('Failed to create notification for sent email:', error)
    })

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      emailId: email.id
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}