// // components/invoices/InvoiceForm.js
// import { useState, useEffect } from 'react'
// import { X, Plus, Trash2, Calculator, Calendar, User, FileText, DollarSign } from 'lucide-react'

// export default function InvoiceForm({ onClose, onSave, initialInvoice = null }) {
//   const [customers, setCustomers] = useState([])
//   const [bookings, setBookings] = useState([])
//   const [selectedCustomerId, setSelectedCustomerId] = useState('')
//   const [customerBookings, setCustomerBookings] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     customerId: '',
//     bookingId: '',
//     dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
//     items: [{ description: '', quantity: 1, rate: 0 }],
//     notes: '',
//     terms: 'Payment due within 14 days. Late payments may incur a fee.'
//   })
//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     fetchCustomers()
//     fetchBookings()

//     // If editing an existing invoice
//     if (initialInvoice) {
//       setFormData({
//         customerId: initialInvoice.customerId || '',
//         bookingId: initialInvoice.bookingId || '',
//         dueDate: initialInvoice.dueDate ? new Date(initialInvoice.dueDate).toISOString().split('T')[0] : '',
//         items: initialInvoice.items || [{ description: '', quantity: 1, rate: 0 }],
//         notes: initialInvoice.notes || '',
//         terms: initialInvoice.terms || 'Payment due within 14 days. Late payments may incur a fee.'
//       })
//       setSelectedCustomerId(initialInvoice.customerId || '')
//     }
//   }, [initialInvoice])

//   // When customer selection changes, filter available bookings
//   useEffect(() => {
//     if (selectedCustomerId) {
//       const filteredBookings = bookings.filter(booking => booking.customerId === selectedCustomerId)
//       setCustomerBookings(filteredBookings)
      
//       // If there's only one booking, select it automatically
//       if (filteredBookings.length === 1 && !formData.bookingId) {
//         setFormData(prev => ({
//           ...prev,
//           bookingId: filteredBookings[0].id,
//           // Pre-fill with booking service as first item
//           items: [{ 
//             description: `${filteredBookings[0].service} - ${new Date(filteredBookings[0].date).toLocaleDateString()}`, 
//             quantity: 1, 
//             rate: getDefaultRate(filteredBookings[0].service)
//           }]
//         }))
//       }
//       // If customer changed and their booking doesn't match current bookingId
//       else if (!filteredBookings.find(b => b.id === formData.bookingId)) {
//         setFormData(prev => ({
//           ...prev,
//           bookingId: ''
//         }))
//       }
//     } else {
//       setCustomerBookings([])
//     }
//   }, [selectedCustomerId, bookings])

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch('/api/customers')
//       if (response.ok) {
//         const data = await response.json()
//         setCustomers(data)
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error)
//     }
//   }

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch('/api/bookings')
//       if (response.ok) {
//         const data = await response.json()
//         // Filter to only get non-cancelled bookings
//         const activeBookings = data.filter(booking => booking.status !== 'cancelled')
//         setBookings(activeBookings)
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error)
//     }
//   }

//   const getDefaultRate = (service) => {
//     switch (service) {
//       case 'Regular Cleaning':
//         return 80
//       case 'Deep Cleaning':
//         return 200
//       case 'Office Cleaning':
//         return 150
//       case 'Move In/Out Cleaning':
//         return 250
//       default:
//         return 100
//     }
//   }

//   const handleCustomerChange = (customerId) => {
//     setSelectedCustomerId(customerId)
//     setFormData(prev => ({
//       ...prev,
//       customerId
//     }))
//   }

//   const handleBookingChange = (bookingId) => {
//     const selectedBooking = bookings.find(b => b.id === bookingId)
    
//     setFormData(prev => ({
//       ...prev,
//       bookingId,
//       // Update the first item description if it's empty or was auto-filled
//       items: prev.items.length === 1 && (prev.items[0].description === '' || prev.items[0].description.includes('Cleaning')) 
//         ? [{ 
//             description: `${selectedBooking.service} - ${new Date(selectedBooking.date).toLocaleDateString()}`, 
//             quantity: 1, 
//             rate: getDefaultRate(selectedBooking.service)
//           }] 
//         : prev.items
//     }))
//   }

//   const addItem = () => {
//     setFormData(prev => ({
//       ...prev,
//       items: [...prev.items, { description: '', quantity: 1, rate: 0 }]
//     }))
//   }

//   const removeItem = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       items: prev.items.filter((_, i) => i !== index)
//     }))
//   }

//   const updateItem = (index, field, value) => {
//     // For quantity and rate, convert to number
//     if (field === 'quantity' || field === 'rate') {
//       value = parseFloat(value) || 0
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       items: prev.items.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }))
//   }

//   const calculateSubtotal = () => {
//     return formData.items.reduce((total, item) => {
//       return total + (item.quantity * item.rate)
//     }, 0)
//   }

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.1 // 10% tax
//   }

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax()
//   }

//   const validateForm = () => {
//     const newErrors = {}
    
//     if (!formData.customerId) {
//       newErrors.customerId = 'Please select a customer'
//     }
    
//     if (!formData.dueDate) {
//       newErrors.dueDate = 'Please select a due date'
//     }
    
//     let hasEmptyItems = false
//     formData.items.forEach((item, index) => {
//       if (!item.description) {
//         hasEmptyItems = true
//       }
//     })
    
//     if (hasEmptyItems) {
//       newErrors.items = 'Please fill in all item descriptions'
//     }
    
//     if (formData.items.length === 0) {
//       newErrors.items = 'Please add at least one item'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!validateForm()) {
//       return
//     }
    
//     setLoading(true)
    
//     try {
//       const invoiceData = {
//         customerId: formData.customerId,
//         bookingId: formData.bookingId || null,
//         amount: calculateTotal(),
//         dueDate: formData.dueDate,
//         items: formData.items,
//         notes: formData.notes,
//         terms: formData.terms
//       }
      
//       const url = initialInvoice 
//         ? `/api/invoices/${initialInvoice.id}` 
//         : '/api/invoices'
      
//       const method = initialInvoice ? 'PUT' : 'POST'
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(invoiceData)
//       })
      
//       if (!response.ok) {
//         throw new Error('Failed to save invoice')
//       }
      
//       const savedInvoice = await response.json()
//       onSave(savedInvoice)
      
//     } catch (error) {
//       console.error('Error saving invoice:', error)
//       setErrors({ submit: 'Failed to save invoice. Please try again.' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center">
//             <FileText className="w-6 h-6 text-blue-600 mr-2" />
//             <h2 className="text-2xl font-bold text-gray-900">
//               {initialInvoice ? 'Edit Invoice' : 'Create New Invoice'}
//             </h2>
//           </div>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 focus:outline-none"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {errors.submit && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//             {errors.submit}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Customer Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Customer <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                 <select
//                   value={formData.customerId}
//                   onChange={(e) => handleCustomerChange(e.target.value)}
//                   className={`pl-10 block w-full border ${errors.customerId ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                 >
//                   <option value="">Select a customer</option>
//                   {customers.map(customer => (
//                     <option key={customer.id} value={customer.id}>
//                       {customer.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {errors.customerId && (
//                 <p className="mt-1 text-sm text-red-600">{errors.customerId}</p>
//               )}
//             </div>

//             {/* Due Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Due Date <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                 <input
//                   type="date"
//                   value={formData.dueDate}
//                   onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
//                   className={`pl-10 block w-full border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                 />
//               </div>
//               {errors.dueDate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
//               )}
//             </div>

//             {/* Related Booking */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Related Booking (Optional)
//               </label>
//               <select
//                 value={formData.bookingId}
//                 onChange={(e) => handleBookingChange(e.target.value)}
//                 disabled={!selectedCustomerId}
//                 className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
//               >
//                 <option value="">Select a booking</option>
//                 {customerBookings.map(booking => (
//                   <option key={booking.id} value={booking.id}>
//                     {booking.service} - {new Date(booking.date).toLocaleDateString()} {booking.time}
//                   </option>
//                 ))}
//               </select>
//               {!selectedCustomerId && (
//                 <p className="mt-1 text-sm text-gray-500">Select a customer first to see their bookings</p>
//               )}
//             </div>
//           </div>

//           {/* Invoice Items */}
//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
//               <button
//                 type="button"
//                 onClick={addItem}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
//               >
//                 <Plus className="w-4 h-4 mr-1" />
//                 Add Item
//               </button>
//             </div>
            
//             {errors.items && (
//               <p className="mb-2 text-sm text-red-600">{errors.items}</p>
//             )}
            
//             <div className="bg-gray-50 rounded-lg p-4">
//               <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium text-gray-700">
//                 <div className="col-span-6">Description</div>
//                 <div className="col-span-2">Quantity</div>
//                 <div className="col-span-3">Rate</div>
//                 <div className="col-span-1"></div>
//               </div>
              
//               {formData.items.map((item, index) => (
//                 <div key={index} className="grid grid-cols-12 gap-2 mb-2">
//                   <div className="col-span-6">
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(e) => updateItem(index, 'description', e.target.value)}
//                       placeholder="Service description"
//                       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) => updateItem(index, 'quantity', e.target.value)}
//                       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-3">
//                     <div className="relative">
//                       <span className="absolute left-3 top-2 text-gray-500">$</span>
//                       <input
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         value={item.rate}
//                         onChange={(e) => updateItem(index, 'rate', e.target.value)}
//                         className="block w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-span-1 flex items-center justify-center">
//                     <button
//                       type="button"
//                       onClick={() => removeItem(index)}
//                       disabled={formData.items.length <= 1}
//                       className="text-red-600 hover:text-red-800 disabled:text-gray-400"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               {/* Totals */}
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-end text-sm">
//                   <div className="w-1/3">
//                     <div className="flex justify-between py-1">
//                       <span className="font-medium">Subtotal:</span>
//                       <span>${calculateSubtotal().toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between py-1">
//                       <span className="font-medium">Tax (10%):</span>
//                       <span>${calculateTax().toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between py-2 font-bold text-lg">
//                       <span>Total:</span>
//                       <span>${calculateTotal().toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Notes & Terms */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Notes (Optional)
//               </label>
//               <textarea
//                 value={formData.notes}
//                 onChange={(e) => setFormData({...formData, notes: e.target.value})}
//                 rows={3}
//                 placeholder="Additional notes for the customer"
//                 className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               ></textarea>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Terms & Conditions
//               </label>
//               <textarea
//                 value={formData.terms}
//                 onChange={(e) => setFormData({...formData, terms: e.target.value})}
//                 rows={3}
//                 className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               ></textarea>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   {initialInvoice ? 'Updating...' : 'Creating...'}
//                 </>
//               ) : (
//                 <>
//                   <DollarSign className="w-4 h-4 mr-2" />
//                   {initialInvoice ? 'Update Invoice' : 'Create Invoice'}
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



// components/invoices/InvoiceForm.js
import { useState, useEffect } from 'react'
import { X, Plus, Trash2, Calculator, Calendar, User, FileText, DollarSign } from 'lucide-react'

export default function InvoiceForm({ onClose, onSave, initialInvoice = null }) {
  const [customers, setCustomers] = useState([])
  const [bookings, setBookings] = useState([])
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [customerBookings, setCustomerBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerId: '',
    bookingId: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    items: [{ description: '', quantity: 1, rate: 0 }],
    notes: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchCustomers()
    fetchBookings()

    // If editing an existing invoice
    if (initialInvoice) {
      setFormData({
        customerId: initialInvoice.customerId || '',
        bookingId: initialInvoice.bookingId || '',
        dueDate: initialInvoice.dueDate ? new Date(initialInvoice.dueDate).toISOString().split('T')[0] : '',
        items: initialInvoice.items || [{ description: '', quantity: 1, rate: 0 }],
        notes: initialInvoice.notes || ''
      })
      setSelectedCustomerId(initialInvoice.customerId || '')
    }
  }, [initialInvoice])

  // When customer selection changes, filter available bookings
  useEffect(() => {
    if (selectedCustomerId) {
      const filteredBookings = bookings.filter(booking => booking.customerId === selectedCustomerId)
      setCustomerBookings(filteredBookings)
      
      // If there's only one booking, select it automatically
      if (filteredBookings.length === 1 && !formData.bookingId) {
        setFormData(prev => ({
          ...prev,
          bookingId: filteredBookings[0].id,
          // Pre-fill with booking service as first item
          items: [{ 
            description: `${filteredBookings[0].service} - ${new Date(filteredBookings[0].date).toLocaleDateString()}`, 
            quantity: 1, 
            rate: getDefaultRate(filteredBookings[0].service)
          }]
        }))
      }
      // If customer changed and their booking doesn't match current bookingId
      else if (!filteredBookings.find(b => b.id === formData.bookingId)) {
        setFormData(prev => ({
          ...prev,
          bookingId: ''
        }))
      }
    } else {
      setCustomerBookings([])
    }
  }, [selectedCustomerId, bookings])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers')
      if (response.ok) {
        const data = await response.json()
        setCustomers(data)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        // Filter to only get non-cancelled bookings
        const activeBookings = data.filter(booking => booking.status !== 'cancelled')
        setBookings(activeBookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const getDefaultRate = (service) => {
    switch (service) {
      case 'Regular Cleaning':
        return 80
      case 'Deep Cleaning':
        return 200
      case 'Office Cleaning':
        return 150
      case 'Move In/Out Cleaning':
        return 250
      default:
        return 100
    }
  }

  const handleCustomerChange = (customerId) => {
    setSelectedCustomerId(customerId)
    setFormData(prev => ({
      ...prev,
      customerId
    }))
  }

  const handleBookingChange = (bookingId) => {
    const selectedBooking = bookings.find(b => b.id === bookingId)
    
    if (selectedBooking) {
      setFormData(prev => ({
        ...prev,
        bookingId,
        // Update the first item description if it's empty or was auto-filled
        items: prev.items.length === 1 && (prev.items[0].description === '' || prev.items[0].description.includes('Cleaning')) 
          ? [{ 
              description: `${selectedBooking.service} - ${new Date(selectedBooking.date).toLocaleDateString()}`, 
              quantity: 1, 
              rate: getDefaultRate(selectedBooking.service)
            }] 
          : prev.items
      }))
    }
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0 }]
    }))
  }

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const updateItem = (index, field, value) => {
    // For quantity and rate, convert to number
    if (field === 'quantity' || field === 'rate') {
      value = parseFloat(value) || 0
    }
    
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (item.quantity * item.rate)
    }, 0)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customerId) {
      newErrors.customerId = 'Please select a customer'
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Please select a due date'
    }
    
    let hasEmptyItems = false
    formData.items.forEach((item, index) => {
      if (!item.description) {
        hasEmptyItems = true
      }
    })
    
    if (hasEmptyItems) {
      newErrors.items = 'Please fill in all item descriptions'
    }
    
    if (formData.items.length === 0) {
      newErrors.items = 'Please add at least one item'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      const invoiceData = {
        customerId: formData.customerId,
        bookingId: formData.bookingId || null,
        amount: calculateTotal(),
        dueDate: formData.dueDate,
        items: formData.items,
        notes: formData.notes
      }
      
      const url = initialInvoice 
        ? `/api/invoices/${initialInvoice.id}` 
        : '/api/invoices'
      
      const method = initialInvoice ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save invoice')
      }
      
      const savedInvoice = await response.json()
      onSave(savedInvoice)
      
    } catch (error) {
      console.error('Error saving invoice:', error)
      setErrors({ submit: error.message || 'Failed to save invoice. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              {initialInvoice ? 'Edit Invoice' : 'Create New Invoice'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {errors.submit && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <select
                  value={formData.customerId}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className={`pl-10 block w-full border ${errors.customerId ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.customerId && (
                <p className="mt-1 text-sm text-red-600">{errors.customerId}</p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className={`pl-10 block w-full border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>

            {/* Related Booking */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Related Booking (Optional)
              </label>
              <select
                value={formData.bookingId}
                onChange={(e) => handleBookingChange(e.target.value)}
                disabled={!selectedCustomerId}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Select a booking</option>
                {customerBookings.map(booking => (
                  <option key={booking.id} value={booking.id}>
                    {booking.service} - {new Date(booking.date).toLocaleDateString()} {booking.time}
                  </option>
                ))}
              </select>
              {!selectedCustomerId && (
                <p className="mt-1 text-sm text-gray-500">Select a customer first to see their bookings</p>
              )}
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </button>
            </div>
            
            {errors.items && (
              <p className="mb-2 text-sm text-red-600">{errors.items}</p>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium text-gray-700">
                <div className="col-span-6">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-3">Rate</div>
                <div className="col-span-1"></div>
              </div>
              
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Service description"
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={formData.items.length <= 1}
                      className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Total */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-end text-sm">
                  <div className="w-1/3">
                    <div className="flex justify-between py-2 font-bold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              placeholder="Additional notes for the customer"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {initialInvoice ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  {initialInvoice ? 'Update Invoice' : 'Create Invoice'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}