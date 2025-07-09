// lib/analytics.js - Client-side tracking utility
let sessionStartTime = null
let pageViewCount = 0

export const initializeTracking = () => {
  if (typeof window === 'undefined') return
  
  sessionStartTime = Date.now()
  pageViewCount = 0
  
  // Track initial page view
  trackPageView()
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // Track session end
  window.addEventListener('beforeunload', handleSessionEnd)
  
  // Track scroll depth
  let maxScrollDepth = 0
  window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth
      localStorage.setItem('maxScrollDepth', maxScrollDepth)
    }
  })
}

export const trackPageView = (page = window.location.pathname) => {
  if (typeof window === 'undefined') return
  
  pageViewCount++
  
  const data = {
    page,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    sessionId: getSessionId(),
    pageViewCount
  }
  
  // Store in localStorage for later sending
  const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]')
  pageViews.push(data)
  localStorage.setItem('pageViews', JSON.stringify(pageViews))
  
  // Send immediately if online
  if (navigator.onLine) {
    sendTrackingData()
  }
}

export const trackEvent = (eventName, properties = {}) => {
  if (typeof window === 'undefined') return
  
  const data = {
    event: eventName,
    properties,
    timestamp: Date.now(),
    page: window.location.pathname,
    sessionId: getSessionId()
  }
  
  const events = JSON.parse(localStorage.getItem('events') || '[]')
  events.push(data)
  localStorage.setItem('events', JSON.stringify(events))
  
  if (navigator.onLine) {
    sendTrackingData()
  }
}

export const trackQuoteRequest = (formData) => {
  trackEvent('quote_request_submitted', {
    service: formData.service,
    propertySize: formData.propertySize,
    hasPhone: !!formData.phone,
    messageLength: formData.message?.length || 0
  })
}

export const trackFormInteraction = (formField, action) => {
  trackEvent('form_interaction', {
    field: formField,
    action, // 'focus', 'blur', 'change'
    page: window.location.pathname
  })
}

const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    trackEvent('page_hidden')
  } else {
    trackEvent('page_visible')
  }
}

const handleSessionEnd = () => {
  const sessionDuration = sessionStartTime ? Date.now() - sessionStartTime : 0
  const scrollDepth = localStorage.getItem('maxScrollDepth') || 0
  
  trackEvent('session_end', {
    duration: sessionDuration,
    pageViews: pageViewCount,
    maxScrollDepth: parseInt(scrollDepth)
  })
  
  // Force send all remaining data
  sendTrackingData(true)
}

const sendTrackingData = async (force = false) => {
  try {
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]')
    const events = JSON.parse(localStorage.getItem('events') || '[]')
    
    if (pageViews.length === 0 && events.length === 0 && !force) return
    
    const payload = {
      pageViews,
      events,
      timestamp: Date.now()
    }
    
    // Use sendBeacon for better reliability during page unload
    if (navigator.sendBeacon && force) {
      navigator.sendBeacon('/api/analytics/track', JSON.stringify(payload))
    } else {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    }
    
    // Clear sent data
    localStorage.removeItem('pageViews')
    localStorage.removeItem('events')
    localStorage.removeItem('maxScrollDepth')
    
  } catch (error) {
    console.error('Failed to send tracking data:', error)
  }
}