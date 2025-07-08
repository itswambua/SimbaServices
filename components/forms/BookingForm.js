// import { useState, useEffect } from 'react'
// import { X } from 'lucide-react'

// export default function BookingForm({ booking, onClose, onSave }) {
//   const [customers, setCustomers] = useState([])
//   const [formData, setFormData] = useState({
//     customerId: booking?.customerId || '',
//     service: booking?.service || '',
//     date: booking?.date ? booking.date.split('T')[0] : '',
//     time: booking?.time || '',
//     address: booking?.address || '',
//     notes: booking?.notes || ''
//   })

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch('/api/customers')
//       const data = await response.json()
//       setCustomers(data)
//     } catch (error) {
//       console.error('Error fetching customers:', error)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     try {
//       const url = booking ? `/api/bookings/${booking.id}` : '/api/bookings'
//       const method = booking ? 'PUT' : 'POST'
      
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       })
      
//       if (response.ok) {
//         const savedBooking = await response.json()
//         onSave(savedBooking)
//         onClose()
//       }
//     } catch (error) {
//       console.error('Error saving booking:', error)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">
//             {booking ? 'Edit Booking' : 'New Booking'}
//           </h3>
//           <button onClick={onClose}>
//             <X className="w-5 h-5" />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Customer</label>
//             <select
//               required
//               value={formData.customerId}
//               onChange={(e) => setFormData({...formData, customerId: e.target.value})}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select Customer</option>
//               {customers.map(customer => (
//                 <option key={customer.id} value={customer.id}>
//                   {customer.name}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Service</label>
//             <select
//               required
//               value={formData.service}
//               onChange={(e) => setFormData({...formData, service: e.target.value})}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select Service</option>
//               <option value="Regular Cleaning">Regular Cleaning</option>
//               <option value="Deep Cleaning">Deep Cleaning</option>
//               <option value="Move In/Out Cleaning">Move In/Out Cleaning</option>
//               <option value="Office Cleaning">Office Cleaning</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Date</label>
//             <input
//               type="date"
//               required
//               value={formData.date}
//               onChange={(e) => setFormData({...formData, date: e.target.value})}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Time</label>
//             <input
//               type="time"
//               required
//               value={formData.time}
//               onChange={(e) => setFormData({...formData, time: e.target.value})}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Address</label>
//             <textarea
//               required
//               value={formData.address}
//               onChange={(e) => setFormData({...formData, address: e.target.value})}
//               rows={3}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Notes</label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData({...formData, notes: e.target.value})}
//               rows={2}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
          
//           <div className="flex space-x-3">
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//             >
//               {booking ? 'Update' : 'Create'}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



// components/forms/BookingForm.js
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function BookingForm({ booking, onClose, onSave }) {
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState({
    customerId: booking?.customerId || '',
    service: booking?.service || '',
    date: booking?.date ? booking.date.split('T')[0] : '',
    time: booking?.time || '',
    address: booking?.address || '',
    notes: booking?.notes || ''
  })
  const [loading, setLoading] = useState(true)
  const [customerDetails, setCustomerDetails] = useState({})

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    // If customer changes, auto-fill address from customer details
    if (formData.customerId && customerDetails[formData.customerId]?.address) {
      setFormData(prev => ({
        ...prev,
        address: customerDetails[formData.customerId].address || prev.address
      }))
    }
  }, [formData.customerId, customerDetails])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/customers')
      const data = await response.json()
      setCustomers(data)
      
      // Create a map of customer details for easy lookup
      const detailsMap = {}
      data.forEach(customer => {
        detailsMap[customer.id] = {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address
        }
      })
      setCustomerDetails(detailsMap)
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching customers:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const url = booking ? `/api/bookings/${booking.id}` : '/api/bookings'
      const method = booking ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const savedBooking = await response.json()
        onSave(savedBooking)
        onClose()
      } else {
        console.error('Error response:', await response.text())
      }
    } catch (error) {
      console.error('Error saving booking:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCustomerChange = (customerId) => {
    setFormData({
      ...formData,
      customerId
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {booking ? 'Edit Booking' : 'New Booking'}
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <select
              required
              value={formData.customerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            >
              <option value="">Select Service</option>
              <option value="Regular Cleaning">Regular Cleaning</option>
              <option value="Deep Cleaning">Deep Cleaning</option>
              <option value="Move In/Out Cleaning">Move In/Out Cleaning</option>
              <option value="Office Cleaning">Office Cleaning</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            />
            {formData.customerId && !formData.address && (
              <p className="mt-1 text-sm text-gray-500">
                Using customer's address
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>{booking ? 'Updating...' : 'Creating...'}</span>
                </div>
              ) : (
                booking ? 'Update' : 'Create'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}