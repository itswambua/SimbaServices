// // components/dashboard/StatsCard.js
// export default function StatsCard({ title, value, icon: Icon, color }) {
//   const colorClasses = {
//     blue: 'bg-blue-500',
//     green: 'bg-green-500',
//     orange: 'bg-orange-500',
//     purple: 'bg-purple-500'
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-3 rounded-full ${colorClasses[color]}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )
// }


// components/dashboard/StatsCard.js (Updated)
export default function StatsCard({ title, value, icon: Icon, color, onClick }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  }

  const hoverClasses = {
    blue: 'hover:bg-blue-50 hover:border-blue-200',
    green: 'hover:bg-green-50 hover:border-green-200',
    orange: 'hover:bg-orange-50 hover:border-orange-200',
    purple: 'hover:bg-purple-50 hover:border-purple-200'
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow p-6 border border-gray-100 transition-all duration-200 ${
        onClick ? `cursor-pointer ${hoverClasses[color]} hover:shadow-lg transform hover:-translate-y-1` : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {onClick && (
            <p className="text-xs text-gray-500 mt-2">Click to view details</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]} ${onClick ? 'transform transition-transform hover:scale-110' : ''}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}