

// components/TrackingProvider.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initializeTracking, trackPageView } from '../lib/analytics'

export default function TrackingProvider({ children }) {
  const router = useRouter()
  
  useEffect(() => {
    // Initialize tracking on mount
    initializeTracking()
  }, [])
  
  useEffect(() => {
    // Track route changes
    const handleRouteChange = (url) => {
      trackPageView(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  return children
}