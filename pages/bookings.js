// import { useState, useEffect } from 'react'
// import { Calendar, Clock, User, MapPin } from 'lucide-react'
// import BookingForm from '../components/forms/BookingForm'

// export default function Bookings() {
//   const [bookings, setBookings] = useState([])
//   const [showForm, setShowForm] = useState(false)
//   const [editingBooking, setEditingBooking] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchBookings()
//   }, [])

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch('/api/bookings')
//       if (response.ok) {
//         const data = await response.json()
//         setBookings(data)
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBookingSaved = (savedBooking) => {
//     if (editingBooking) {
//       setBookings(bookings.map(b => b.id === savedBooking.id ? savedBooking : b))
//     } else {
//       setBookings([savedBooking, ...bookings])
//     }
//     setEditingBooking(null)
//     setShowForm(false)
//   }

//   const handleEdit = (booking) => {
//     setEditingBooking(booking)
//     setShowForm(true)
//   }

//   const handleDelete = async (bookingId) => {
//     if (confirm('Are you sure you want to cancel this booking?')) {
//       try {
//         const response = await fetch(`/api/bookings/${bookingId}`, {
//           method: 'DELETE'
//         })
//         if (response.ok) {
//           setBookings(bookings.filter(b => b.id !== bookingId))
//         }
//       } catch (error) {
//         console.error('Error deleting booking:', error)
//       }
//     }
//   }

//   const handleAddNew = () => {
//     setEditingBooking(null)
//     setShowForm(true)
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed': return 'bg-green-100 text-green-800'
//       case 'pending': return 'bg-yellow-100 text-yellow-800'
//       case 'cancelled': return 'bg-red-100 text-red-800'
//       case 'completed': return 'bg-blue-100 text-blue-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-AU')
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Loading bookings...</h1>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
//           <p className="text-gray-600">Manage your cleaning service appointments</p>
//         </div>
//         <button 
//           onClick={handleAddNew}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           New Booking
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         {bookings.length === 0 ? (
//           <div className="text-center py-12">
//             <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
//             <p className="text-gray-500 mb-4">Get started by creating your first booking</p>
//             <button 
//               onClick={handleAddNew}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Create First Booking
//             </button>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Service
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date & Time
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Address
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <tr key={booking.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <User className="w-5 h-5 text-gray-400 mr-2" />
//                         <div className="text-sm font-medium text-gray-900">
//                           {booking.customer?.name || 'Unknown Customer'}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {booking.service}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {formatDate(booking.date)}
//                         <Clock className="w-4 h-4 ml-3 mr-1" />
//                         {booking.time}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         <span className="truncate max-w-xs">{booking.address}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button 
//                         onClick={() => handleEdit(booking)}
//                         className="text-blue-600 hover:text-blue-900 mr-3"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(booking.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {showForm && (
//         <BookingForm
//           booking={editingBooking}
//           onClose={() => {
//             setShowForm(false)
//             setEditingBooking(null)
//           }}
//           onSave={handleBookingSaved}
//         />
//       )}
//     </div>
//   )
// }


// pages/bookings.js
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, MapPin, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { useRouter } from 'next/router'
import BookingForm from '../components/forms/BookingForm'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancellingBooking, setIsCancellingBooking] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBookings()
    
    // Check URL parameters for new booking
    if (router.query.createNew) {
      setEditingBooking(null)
      setShowForm(true)
    }
  }, [router.query])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setErrorMessage('Failed to load bookings. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookingSaved = (savedBooking) => {
    if (editingBooking) {
      setBookings(bookings.map(b => b.id === savedBooking.id ? savedBooking : b))
      setSuccessMessage('Booking updated successfully')
    } else {
      setBookings([savedBooking, ...bookings])
      setSuccessMessage('Booking created successfully')
    }
    setEditingBooking(null)
    setShowForm(false)
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleEdit = (booking) => {
    setEditingBooking(booking)
    setShowForm(true)
  }

  const handleCancelBooking = (booking) => {
    setIsCancellingBooking(booking)
    setShowCancelModal(true)
    setCancelReason('')
  }

  const confirmCancelBooking = async () => {
    if (!cancellingBooking) return
    
    setIsSendingEmail(true)
    
    try {
      // First update booking status to cancelled
      const updateResponse = await fetch(`/api/bookings/${cancellingBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...cancellingBooking,
          status: 'cancelled',
          notes: cancellingBooking.notes 
            ? `${cancellingBooking.notes}\n\nCancellation reason: ${cancelReason}` 
            : `Cancellation reason: ${cancelReason}`
        })
      })
      
      if (!updateResponse.ok) {
        throw new Error('Failed to cancel booking')
      }
      
      // If customer has email, create an email notification
      if (cancellingBooking.customer?.email) {
        // Create a new email in the sent folder
        const emailResponse = await fetch('/api/emails/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: cancellingBooking.customer.email,
            subject: `Booking Cancellation: ${cancellingBooking.service} on ${formatDate(cancellingBooking.date)}`,
            content: `Dear ${cancellingBooking.customer.name},

We're writing to confirm that your booking for ${cancellingBooking.service} on ${formatDate(cancellingBooking.date)} at ${cancellingBooking.time} has been cancelled.

${cancelReason ? `Reason for cancellation: ${cancelReason}` : ''}

If you would like to reschedule, please don't hesitate to contact us or make a new booking through our website.

Thank you for your understanding.

Best regards,
Simba Cleaning Services Team`
          })
        })
        
        if (!emailResponse.ok) {
          console.error('Failed to send cancellation email')
        }
      }
      
      // Update local state
      setBookings(bookings.map(b => 
        b.id === cancellingBooking.id 
          ? { ...b, status: 'cancelled' } 
          : b
      ))
      
      setSuccessMessage('Booking cancelled successfully and notification sent')
      setShowCancelModal(false)
      setIsCancellingBooking(null)
      setCancelReason('')
      
    } catch (error) {
      console.error('Error cancelling booking:', error)
      setErrorMessage('Failed to cancel booking')
    } finally {
      setIsSendingEmail(false)
      
      // Clear success/error messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleAddNew = () => {
    setEditingBooking(null)
    setShowForm(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU')
  }
  
  const sendReminderEmail = (booking) => {
    router.push({
      pathname: '/emails',
      query: {
        compose: true,
        to: booking.customer?.email || '',
        subject: `Reminder: Your Upcoming ${booking.service} Appointment`,
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">Loading bookings...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">Manage your cleaning service appointments</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Booking
        </button>
      </div>

      {/* Success or Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-700">{successMessage}</span>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">{errorMessage}</span>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first booking</p>
            <button 
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create First Booking
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className={booking.status === 'cancelled' ? 'bg-gray-50 text-gray-500' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customer?.name || 'Unknown Customer'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(booking.date)}
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="truncate max-w-xs">{booking.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {booking.status !== 'cancelled' && (
                          <>
                            <button 
                              onClick={() => handleEdit(booking)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Booking"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleCancelBooking(booking)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Booking"
                            >
                              Cancel
                            </button>
                            {booking.customer?.email && (
                              <button 
                                onClick={() => sendReminderEmail(booking)}
                                className="text-green-600 hover:text-green-900"
                                title="Send Reminder Email"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <BookingForm
          booking={editingBooking}
          onClose={() => {
            setShowForm(false)
            setEditingBooking(null)
          }}
          onSave={handleBookingSaved}
        />
      )}

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && cancellingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cancel Booking
            </h3>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this booking?
            </p>
            
            <div className="mb-4 bg-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Customer:</div>
                <div className="font-medium">{cancellingBooking.customer?.name}</div>
                
                <div className="text-gray-500">Service:</div>
                <div className="font-medium">{cancellingBooking.service}</div>
                
                <div className="text-gray-500">Date & Time:</div>
                <div className="font-medium">{formatDate(cancellingBooking.date)} at {cancellingBooking.time}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Cancellation
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter reason for cancellation..."
              ></textarea>
              {cancellingBooking.customer?.email && (
                <p className="mt-2 text-sm text-gray-500">
                  A cancellation email will be sent to {cancellingBooking.customer.email}
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCancelModal(false)
                  setIsCancellingBooking(null)
                  setCancelReason('')
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancelBooking}
                disabled={isSendingEmail}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center disabled:opacity-50"
              >
                {isSendingEmail ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Confirm Cancellation'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}