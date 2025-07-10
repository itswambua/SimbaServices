// // components/analytics/AnalyticsDashboard.js
// import { useState, useEffect } from 'react'
// import { 
//   TrendingUp, Users, DollarSign, Calendar, 
//   BarChart3, PieChart, Globe, Clock,
//   ArrowUpRight, ArrowDownRight, RefreshCw
// } from 'lucide-react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts'

// export default function AnalyticsDashboard() {
//   const [analytics, setAnalytics] = useState({
//     traffic: {},
//     revenue: {},
//     loading: true
//   })
//   const [timeRange, setTimeRange] = useState('30') // days
//   const [refreshing, setRefreshing] = useState(false)

//   useEffect(() => {
//     fetchAnalytics()
//   }, [timeRange])

//   const fetchAnalytics = async () => {
//     try {
//       setRefreshing(true)
//       const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
//       if (response.ok) {
//         const data = await response.json()
//         setAnalytics({ ...data, loading: false })
//       }
//     } catch (error) {
//       console.error('Error fetching analytics:', error)
//     } finally {
//       setRefreshing(false)
//     }
//   }

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-AU', {
//       style: 'currency',
//       currency: 'AUD'
//     }).format(amount)
//   }

//   const formatNumber = (num) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'k'
//     }
//     return num.toString()
//   }

//   const getGrowthIcon = (growth) => {
//     if (growth > 0) return <ArrowUpRight className="w-4 h-4 text-green-500" />
//     if (growth < 0) return <ArrowDownRight className="w-4 h-4 text-red-500" />
//     return null
//   }

//   const getGrowthColor = (growth) => {
//     if (growth > 0) return 'text-green-600'
//     if (growth < 0) return 'text-red-600'
//     return 'text-gray-600'
//   }

//   const COLORS = ['#4F46E5', '#F97316', '#10B981', '#EF4444', '#8B5CF6']

//   if (analytics.loading) {
//     return (
//       <div className="space-y-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="bg-white rounded-lg shadow p-6">
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
//           <p className="text-gray-600">Monitor your website traffic and revenue performance</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <select
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="7">Last 7 days</option>
//             <option value="30">Last 30 days</option>
//             <option value="90">Last 90 days</option>
//             <option value="365">Last year</option>
//           </select>
//           <button
//             onClick={fetchAnalytics}
//             disabled={refreshing}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Key Metrics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Website Visitors */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Website Visitors</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {formatNumber(analytics.traffic.totalVisitors || 0)}
//               </p>
//               <div className="flex items-center mt-1">
//                 {getGrowthIcon(analytics.traffic.visitorGrowth)}
//                 <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.traffic.visitorGrowth)}`}>
//                   {analytics.traffic.visitorGrowth > 0 ? '+' : ''}
//                   {analytics.traffic.visitorGrowth}% from last period
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-blue-100 rounded-full">
//               <Users className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         {/* Page Views */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Page Views</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {formatNumber(analytics.traffic.totalPageViews || 0)}
//               </p>
//               <div className="flex items-center mt-1">
//                 {getGrowthIcon(analytics.traffic.pageViewGrowth)}
//                 <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.traffic.pageViewGrowth)}`}>
//                   {analytics.traffic.pageViewGrowth > 0 ? '+' : ''}
//                   {analytics.traffic.pageViewGrowth}% from last period
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-green-100 rounded-full">
//               <Globe className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         {/* Total Revenue */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {formatCurrency(analytics.revenue.totalRevenue || 0)}
//               </p>
//               <div className="flex items-center mt-1">
//                 {getGrowthIcon(analytics.revenue.revenueGrowth)}
//                 <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.revenue.revenueGrowth)}`}>
//                   {analytics.revenue.revenueGrowth > 0 ? '+' : ''}
//                   {analytics.revenue.revenueGrowth}% from last period
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-orange-100 rounded-full">
//               <DollarSign className="w-6 h-6 text-orange-600" />
//             </div>
//           </div>
//         </div>

//         {/* Average Session Duration */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {analytics.traffic.averageSessionDuration || '0:00'}
//               </p>
//               <div className="flex items-center mt-1">
//                 {getGrowthIcon(analytics.traffic.sessionGrowth)}
//                 <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.traffic.sessionGrowth)}`}>
//                   {analytics.traffic.sessionGrowth > 0 ? '+' : ''}
//                   {analytics.traffic.sessionGrowth}% from last period
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-purple-100 rounded-full">
//               <Clock className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Traffic Trend Chart */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Traffic Trend</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={analytics.traffic.dailyTraffic || []}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="visitors" 
//                 stroke="#4F46E5" 
//                 strokeWidth={2}
//                 name="Visitors"
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="pageViews" 
//                 stroke="#F97316" 
//                 strokeWidth={2}
//                 name="Page Views"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Revenue by Service Type */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Service Type</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <RechartsPieChart>
//               <Pie
//                 dataKey="value"
//                 data={analytics.revenue.byServiceType || []}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//               >
//                 {(analytics.revenue.byServiceType || []).map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => formatCurrency(value)} />
//             </RechartsPieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Monthly Revenue Trend */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={analytics.revenue.monthlyRevenue || []}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip formatter={(value) => formatCurrency(value)} />
//               <Bar dataKey="revenue" fill="#4F46E5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Top Traffic Sources */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Traffic Sources</h3>
//           <div className="space-y-4">
//             {(analytics.traffic.topSources || []).map((source, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                   <span className="text-sm font-medium text-gray-900">{source.name}</span>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-semibold text-gray-900">{formatNumber(source.visitors)}</div>
//                   <div className="text-xs text-gray-500">{source.percentage}%</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Additional Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Conversion Rate */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
//             <TrendingUp className="w-5 h-5 text-green-500" />
//           </div>
//           <div className="text-3xl font-bold text-gray-900 mb-2">
//             {analytics.traffic.conversionRate || '0'}%
//           </div>
//           <p className="text-sm text-gray-600">
//             Visitors who submitted quote requests
//           </p>
//         </div>

//         {/* Average Order Value */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Avg. Order Value</h3>
//             <DollarSign className="w-5 h-5 text-blue-500" />
//           </div>
//           <div className="text-3xl font-bold text-gray-900 mb-2">
//             {formatCurrency(analytics.revenue.averageOrderValue || 0)}
//           </div>
//           <p className="text-sm text-gray-600">
//             Average invoice amount
//           </p>
//         </div>

//         {/* Bounce Rate */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Bounce Rate</h3>
//             <BarChart3 className="w-5 h-5 text-orange-500" />
//           </div>
//           <div className="text-3xl font-bold text-gray-900 mb-2">
//             {analytics.traffic.bounceRate || '0'}%
//           </div>
//           <p className="text-sm text-gray-600">
//             Single-page sessions
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }



// components/analytics/AnalyticsDashboard.js (Improved Layout)
import { useState, useEffect } from 'react'
import { 
  TrendingUp, Users, DollarSign, Calendar, 
  BarChart3, PieChart, Globe, Clock,
  ArrowUpRight, ArrowDownRight, RefreshCw,
  ExternalLink, Download, Target, Activity
} from 'lucide-react'

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    traffic: {},
    revenue: {},
    loading: true
  })
  const [timeRange, setTimeRange] = useState('30') // days
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true)
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics({ ...data, loading: false })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setAnalytics({ traffic: {}, revenue: {}, loading: false })
    } finally {
      setRefreshing(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const getGrowthIcon = (growth) => {
    if (growth > 0) return <ArrowUpRight className="w-4 h-4 text-green-500" />
    if (growth < 0) return <ArrowDownRight className="w-4 h-4 text-red-500" />
    return null
  }

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  if (analytics.loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Monitor your website traffic and revenue performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={fetchAnalytics}
            disabled={refreshing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Cards - Enhanced Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Website Visitors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Website Visitors</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(analytics.traffic.totalVisitors || 0)}
              </p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(analytics.traffic.visitorGrowth)}
                <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.traffic.visitorGrowth)}`}>
                  {analytics.traffic.visitorGrowth > 0 ? '+' : ''}
                  {analytics.traffic.visitorGrowth}% from last period
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Page Views</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(analytics.traffic.totalPageViews || 0)}
              </p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(analytics.traffic.pageViewGrowth)}
                <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.traffic.pageViewGrowth)}`}>
                  {analytics.traffic.pageViewGrowth > 0 ? '+' : ''}
                  {analytics.traffic.pageViewGrowth}% from last period
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(analytics.revenue.totalRevenue || 0)}
              </p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(analytics.revenue.revenueGrowth)}
                <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.revenue.revenueGrowth)}`}>
                  {analytics.revenue.revenueGrowth > 0 ? '+' : ''}
                  {analytics.revenue.revenueGrowth}% from last period
                </span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Average Session Duration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Avg. Session Duration</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.traffic.averageSessionDuration || '0:00'}
              </p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(analytics.traffic.sessionGrowth)}
                <span className={`text-xs font-medium ml-1 ${getGrowthColor(analytics.traffic.sessionGrowth)}`}>
                  {analytics.traffic.sessionGrowth > 0 ? '+' : ''}
                  {analytics.traffic.sessionGrowth}% from last period
                </span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Improved Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Traffic Data (2/3 width on xl screens) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Website Traffic Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Website Traffic Trend</h3>
                <p className="text-sm text-gray-600 mt-1">Daily visitor and page view statistics</p>
              </div>
              <BarChart3 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <th className="text-left py-3 font-semibold">Date</th>
                    <th className="text-right py-3 font-semibold">Visitors</th>
                    <th className="text-right py-3 font-semibold">Page Views</th>
                    <th className="text-right py-3 font-semibold">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(analytics.traffic.dailyTraffic || []).slice(-7).map((day, index) => (
                    <tr key={index} className="text-sm hover:bg-gray-50">
                      <td className="py-4 text-gray-900 font-medium">{day.date}</td>
                      <td className="py-4 text-right font-medium text-blue-600">{day.visitors}</td>
                      <td className="py-4 text-right font-medium text-orange-600">{day.pageViews}</td>
                      <td className="py-4 text-right text-gray-500">
                        {day.visitors > 0 ? (day.pageViews / day.visitors).toFixed(1) : '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(analytics.traffic.dailyTraffic || []).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No traffic data available</p>
                <p className="text-sm">Data will appear here once tracking is active</p>
              </div>
            )}
          </div>

          {/* Monthly Revenue Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Monthly Revenue Trend</h3>
                <p className="text-sm text-gray-600 mt-1">Revenue performance over time</p>
              </div>
              <Activity className="w-6 h-6 text-gray-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <th className="text-left py-3 font-semibold">Month</th>
                    <th className="text-right py-3 font-semibold">Revenue</th>
                    <th className="text-right py-3 font-semibold">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(analytics.revenue.monthlyRevenue || []).map((month, index) => {
                    const prevMonth = analytics.revenue.monthlyRevenue[index - 1]
                    const growth = prevMonth ? ((month.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1) : 0
                    
                    return (
                      <tr key={index} className="text-sm hover:bg-gray-50">
                        <td className="py-4 text-gray-900 font-medium">{month.month}</td>
                        <td className="py-4 text-right font-bold text-green-600">
                          {formatCurrency(month.revenue)}
                        </td>
                        <td className="py-4 text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            growth > 0 ? 'bg-green-100 text-green-800' : 
                            growth < 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {growth > 0 ? '+' : ''}{growth}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Revenue & Metrics (1/3 width on xl screens) */}
        <div className="space-y-6">
          {/* Revenue by Service Type */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue by Service</h3>
                <p className="text-sm text-gray-600 mt-1">Service breakdown</p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {(analytics.revenue.byServiceType || []).map((service, index) => {
                const colors = ['bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500']
                const bgColors = ['bg-blue-50', 'bg-orange-50', 'bg-green-50', 'bg-red-50', 'bg-purple-50']
                const textColors = ['text-blue-700', 'text-orange-700', 'text-green-700', 'text-red-700', 'text-purple-700']
                
                return (
                  <div key={index} className={`p-4 rounded-lg ${bgColors[index % bgColors.length]} border border-opacity-20`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-3 ${colors[index % colors.length]}`}></div>
                        <span className="font-medium text-gray-900 text-sm">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 text-sm">{formatCurrency(service.value)}</div>
                        <div className={`text-xs ${textColors[index % textColors.length]} font-medium`}>
                          {service.percentage}% of total
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {(analytics.revenue.byServiceType || []).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">No revenue data available</p>
                <p className="text-sm">Complete some bookings to see data</p>
              </div>
            )}
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 gap-4">
            {/* Conversion Rate */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {analytics.traffic.conversionRate || '0'}%
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Visitors who submitted quote requests
                </p>
                <div className="bg-green-100 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(analytics.traffic.conversionRate || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Average Order Value */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg. Order Value</h3>
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {formatCurrency(analytics.revenue.averageOrderValue || 0)}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Average invoice amount
                </p>
                <div className="flex justify-center">
                  {/* Target indicator - commented but preserved */}
                  {/* <div className="bg-blue-100 px-3 py-1 rounded-full text-xs font-medium text-blue-700">
                    Target: $200
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics Row - Commented but preserved */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Bounce Rate</h3>
            <BarChart3 className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {analytics.traffic.bounceRate || '0'}%
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Single-page sessions
            </p>
            <div className="bg-orange-100 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(analytics.traffic.bounceRate || 0, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Top Traffic Sources - Commented but preserved */}
      {/* <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Traffic Sources</h3>
        <div className="space-y-4">
          {(analytics.traffic.topSources || []).map((source, index) => {
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-red-500']
            
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${colors[index % colors.length]}`}></div>
                  <span className="text-sm font-medium text-gray-900">{source.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatNumber(source.visitors)}</div>
                  <div className="text-xs text-gray-500">{source.percentage}%</div>
                </div>
              </div>
            )
          })}
        </div>
      </div> */}

      {/* Enhanced Analytics Notice - Commented but preserved */}
      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExternalLink className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-900">Enhanced Analytics Available</h3>
            <p className="text-blue-700 mt-1">
              Install the recharts library to enable interactive charts and advanced visualizations:
            </p>
            <div className="mt-3 bg-blue-100 rounded-lg p-3">
              <code className="text-sm text-blue-800">npm install recharts</code>
            </div>
            <div className="mt-4 flex space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <a 
                href="https://recharts.org/en-US/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Learn More
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}