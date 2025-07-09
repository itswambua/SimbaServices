

// pages/api/analytics/track.js
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { pageViews, events } = req.body

    // Store page views
    if (pageViews && pageViews.length > 0) {
      await Promise.all(pageViews.map(async (view) => {
        await prisma.pageView.create({
          data: {
            page: view.page,
            timestamp: new Date(view.timestamp),
            userAgent: view.userAgent,
            referrer: view.referrer || null,
            sessionId: view.sessionId
          }
        })
      }))
    }

    // Store events
    if (events && events.length > 0) {
      await Promise.all(events.map(async (event) => {
        await prisma.analyticsEvent.create({
          data: {
            eventName: event.event,
            properties: JSON.stringify(event.properties || {}),
            timestamp: new Date(event.timestamp),
            page: event.page,
            sessionId: event.sessionId
          }
        })
      }))
    }

    return res.status(200).json({ success: true })

  } catch (error) {
    console.error('Tracking API error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}