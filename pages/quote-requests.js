

// pages/quote-requests.js - Admin Dashboard for Quote Requests
import { useState, useEffect } from 'react'
import { 
  Mail, Phone, User, Calendar, MessageSquare, Filter, 
  Search, Eye, Edit, Trash2, CheckCircle, Clock, 
  AlertCircle, XCircle, Send
} from 'lucide-react'
import { useRouter } from 'next/router'

export default function QuoteRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusCounts, setStatusCounts] = useState({})
  const [adminNotes, setAdminNotes] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchQuoteRequests()
  }, [])

  const fetchQuoteRequests = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/quote-requests')
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
        
        // Calculate status counts
        const counts = data.reduce((counts, request) => {
          counts[request.status] = (counts[request.status] || 0) + 1
          return counts
        }, {})
        setStatusCounts(counts)
      }
    } catch (error) {
      console.error('Error fetching quote requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (id, status) => {
    try {
      setUpdateError('')
      setUpdateSuccess(false)
      
      const response = await fetch('/api/quote-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id, 
          status, 
          adminNotes: selectedRequest?.adminNotes || adminNotes 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const result = await response.json()
      
      // Update local state with the updated request
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === id ? { ...req, status, adminNotes: selectedRequest?.adminNotes || adminNotes } : req
        )
      )
      
      // Update status counts
      setStatusCounts(prev => {
        const updated = { ...prev }
        // Decrement previous status count
        const previousStatus = requests.find(req => req.id === id)?.status
        if (previousStatus) {
          updated[previousStatus] = Math.max(0, (updated[previousStatus] || 0) - 1)
        }
        // Increment new status count
        updated[status] = (updated[status] || 0) + 1
        return updated
      })
      
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
      
    } catch (error) {
      console.error('Error updating request:', error)
      setUpdateError('Failed to update status. Please try again.')
    }
  }
  
  const deleteRequest = async (id) => {
    if (confirm('Are you sure you want to delete this quote request?')) {
      try {
        const response = await fetch(`/api/quote-requests?id=${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          // Update status counts before removing from list
          const requestToDelete = requests.find(req => req.id === id)
          if (requestToDelete) {
            setStatusCounts(prev => {
              const updated = { ...prev }
              updated[requestToDelete.status] = Math.max(0, (updated[requestToDelete.status] || 0) - 1)
              return updated
            })
          }
          
          setRequests(requests.filter(req => req.id !== id))
          setShowModal(false)
          setSelectedRequest(null)
        }
      } catch (error) {
        console.error('Error deleting request:', error)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'quoted':
        return 'bg-purple-100 text-purple-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      case 'declined':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />
      case 'contacted':
        return <Clock className="w-4 h-4" />
      case 'quoted':
        return <MessageSquare className="w-4 h-4" />
      case 'converted':
        return <CheckCircle className="w-4 h-4" />
      case 'declined':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.phone && request.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      request.service.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const convertToCustomer = (request) => {
    router.push({
      pathname: '/customers',
      query: { 
        createNew: true,
        name: request.name,
        email: request.email,
        phone: request.phone || '',
      }
    })
  }

  const createBookingFromRequest = (request) => {
    router.push({
      pathname: '/bookings',
      query: { 
        createNew: true,
        customerName: request.name,
        customerEmail: request.email,
        customerPhone: request.phone || '',
        service: request.service,
      }
    })
  }

  const sendEmailToCustomer = (request) => {
    router.push({
      pathname: '/emails',
      query: { 
        compose: true,
        to: request.email,
        subject: `Your Quote Request - ${request.service}`,
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
          <p className="text-gray-600">Manage customer quote requests and follow up</p>
        </div>
        <div className="text-sm text-gray-500">
          Total: {requests.length} requests
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">New</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.new || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Contacted</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.contacted || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Quoted</p>
              <p className="text-2xl font-bold text-purple-600">{statusCounts.quoted || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Converted</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.converted || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Declined</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.declined || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="converted">Converted</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quote requests found</h3>
            <p className="text-gray-500">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filters' : 'Quote requests will appear here when customers submit them'}
            </p>
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
                    Property Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
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
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {request.email}
                          </div>
                          {request.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {request.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.propertySize || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(request.submittedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedRequest(request)
                          setAdminNotes(request.adminNotes || '')
                          setShowModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRequest(request.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for viewing/editing request */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Quote Request Details</h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedRequest(null)
                  setAdminNotes('')
                  setUpdateError('')
                  setUpdateSuccess(false)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {updateSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Status updated successfully!
              </div>
            )}

            {updateError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {updateError}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">
                    <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline">
                      {selectedRequest.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.phone ? (
                      <a href={`tel:${selectedRequest.phone}`} className="text-blue-600 hover:underline">
                        {selectedRequest.phone}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRequest.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Size</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRequest.propertySize || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRequest.submittedAt)}</p>
                </div>
              </div>

              {selectedRequest.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedRequest.message}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Update Status</label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['new', 'contacted', 'quoted', 'converted', 'declined'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateRequestStatus(selectedRequest.id, status)}
                      className={`px-3 py-2 text-xs font-medium rounded-full transition-colors ${
                        selectedRequest.status === status
                          ? getStatusColor(status)
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add notes about this request..."
                ></textarea>
                <button
                  onClick={() => {
                    // Update just the notes without changing status
                    updateRequestStatus(selectedRequest.id, selectedRequest.status)
                  }}
                  className="mt-2 px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  Save Notes
                </button>
              </div>

              {/* Quick Action Buttons */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => sendEmailToCustomer(selectedRequest)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </button>
                  
                  <button
                    onClick={() => convertToCustomer(selectedRequest)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Add as Customer
                  </button>
                  
                  <button
                    onClick={() => createBookingFromRequest(selectedRequest)}
                    className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Booking
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedRequest(null)
                  setAdminNotes('')
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}