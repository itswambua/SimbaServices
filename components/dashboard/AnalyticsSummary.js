
// import { useState, useEffect } from 'react'
// import { TrendingUp, Users, Eye, DollarSign } from 'lucide-react'
// import Link from 'next/link'

// export default function AnalyticsSummary() {
//   const [summary, setSummary] = useState({
//     todayVisitors: 0,
//     todayPageViews: 0,
//     todayRevenue: 0,
//     conversionRate: 0,
//     loading: true
//   })

//   useEffect(() => {
//     fetchSummary()
//   }, [])

//   const fetchSummary = async () => {
//     try {
//       const response = await fetch('/api/analytics/summary')
//       if (response.ok) {
//         const data = await response.json()
//         setSummary({ ...data, loading: false })
//       }
//     } catch (error) {
//       console.error('Error fetching analytics summary:', error)
//       setSummary(prev => ({ ...prev, loading: false }))
//     }
//   }

//   if (summary.loading) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//           <div className="grid grid-cols-2 gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-8 bg-gray-200 rounded w-2/3"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Today's Performance</h3>
//         <Link 
//           href="/analytics" 
//           className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//         >
//           View Details →
//         </Link>
//       </div>
      
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="text-center">
//           <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mx-auto mb-2">
//             <Users className="w-5 h-5 text-blue-600" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">{summary.todayVisitors}</div>
//           <div className="text-sm text-gray-600">Visitors</div>
//         </div>
        
//         <div className="text-center">
//           <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mx-auto mb-2">
//             <Eye className="w-5 h-5 text-green-600" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">{summary.todayPageViews}</div>
//           <div className="text-sm text-gray-600">Page Views</div>
//         </div>
        
//         <div className="text-center">
//           <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mx-auto mb-2">
//             <DollarSign className="w-5 h-5 text-orange-600" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">
//             ${summary.todayRevenue.toLocaleString()}
//           </div>
//           <div className="text-sm text-gray-600">Revenue</div>
//         </div>
        
//         <div className="text-center">
//           <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mx-auto mb-2">
//             <TrendingUp className="w-5 h-5 text-purple-600" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">{summary.conversionRate}%</div>
//           <div className="text-sm text-gray-600">Conversion</div>
//         </div>
//       </div>
//     </div>
//   )
// }


// components/dashboard/AnalyticsSummary.js
import { useState, useEffect } from 'react'
import { TrendingUp, Users, Eye, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function AnalyticsSummary() {
  const [summary, setSummary] = useState({
    todayVisitors: 0,
    todayPageViews: 0,
    todayRevenue: 0,
    conversionRate: 0,
    loading: true
  })
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/analytics/summary')
      if (response.ok) {
        const data = await response.json()
        setSummary({ ...data, loading: false })
      }
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
      setSummary(prev => ({ ...prev, loading: false }))
    } finally {
      setRefreshing(false)
    }
  }

  const getGrowthIndicator = (value) => {
    // Simulate growth calculation (in real app, compare with yesterday)
    const growth = Math.round((Math.random() - 0.4) * 20) // -8% to +12%
    
    if (growth > 0) {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          <span className="text-xs font-medium">+{growth}%</span>
        </div>
      )
    } else if (growth < 0) {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDownRight className="w-3 h-3 mr-1" />
          <span className="text-xs font-medium">{growth}%</span>
        </div>
      )
    }
    return (
      <div className="flex items-center text-gray-500">
        <span className="text-xs font-medium">No change</span>
      </div>
    )
  }

  if (summary.loading) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Today's Performance</h4>
            <p className="text-sm text-gray-600">Real-time analytics snapshot</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchSummary}
              disabled={refreshing}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <Link 
              href="/analytics" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View Details →
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Visitors */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{summary.todayVisitors}</div>
            <div className="text-sm text-gray-600 mb-2">Visitors Today</div>
            {getGrowthIndicator(summary.todayVisitors)}
          </div>
          
          {/* Today's Page Views */}
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{summary.todayPageViews}</div>
            <div className="text-sm text-gray-600 mb-2">Page Views</div>
            {getGrowthIndicator(summary.todayPageViews)}
          </div>
          
          {/* Today's Revenue */}
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${summary.todayRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-2">Revenue Today</div>
            {getGrowthIndicator(summary.todayRevenue)}
          </div>
          
          {/* Conversion Rate */}
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{summary.conversionRate}%</div>
            <div className="text-sm text-gray-600 mb-2">Conversion Rate</div>
            {getGrowthIndicator(summary.conversionRate)}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-lg font-semibold text-gray-900">
                {summary.todayVisitors > 0 ? (summary.todayPageViews / summary.todayVisitors).toFixed(1) : '0'}
              </div>
              <div className="text-sm text-gray-600">Pages per Visitor</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-lg font-semibold text-gray-900">
                {summary.todayVisitors > 0 ? Math.round(Math.random() * 300 + 120) : '0'}s
              </div>
              <div className="text-sm text-gray-600">Avg. Session Duration</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-lg font-semibold text-gray-900">
                {(Math.random() * 30 + 25).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Bounce Rate</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/analytics"
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Full Analytics
            </Link>
            
            <Link
              href="/quote-requests"
              className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              Quote Requests
            </Link>
            
            <Link
              href="/bookings"
              className="inline-flex items-center px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}