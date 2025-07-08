


// pages/invoices.js
import { useState, useEffect } from 'react'
import { FileText, Calendar, DollarSign, Download, Trash2, Edit, Plus, CheckCircle, XCircle, AlertCircle, Send } from 'lucide-react'
import { useRouter } from 'next/router'
import InvoiceForm from '../components/invoices/InvoiceForm'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/invoices')
      if (!response.ok) throw new Error('Failed to fetch invoices')
      const data = await response.json()
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      setErrorMessage('Failed to load invoices. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInvoice = () => {
    setEditingInvoice(null)
    setShowForm(true)
  }

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice)
    setShowForm(true)
  }

  const handleSaveInvoice = (savedInvoice) => {
    if (editingInvoice) {
      // Update existing invoice in the list
      setInvoices(prev => prev.map(inv => 
        inv.id === savedInvoice.id ? savedInvoice : inv
      ))
      setSuccessMessage('Invoice updated successfully')
    } else {
      // Add new invoice to the list
      setInvoices(prev => [savedInvoice, ...prev])
      setSuccessMessage('Invoice created successfully')
    }
    
    setShowForm(false)
    setEditingInvoice(null)
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleDeleteInvoice = async (invoiceId) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) throw new Error('Failed to delete invoice')
        
        // Update local state
        setInvoices(invoices.filter(invoice => invoice.id !== invoiceId))
        setSuccessMessage('Invoice deleted successfully')
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      } catch (error) {
        console.error('Error deleting invoice:', error)
        setErrorMessage('Failed to delete invoice')
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      }
    }
  }

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      const response = await fetch(`/api/invoices/generatepdf?id=${invoiceId}`)
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      // Get the PDF as a blob
      const blob = await response.blob()
      
      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Invoice-${invoiceId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading invoice:', error)
      setErrorMessage('Failed to download invoice')
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleSendInvoiceEmail = (invoice) => {
    router.push({
      pathname: '/emails',
      query: {
        compose: true,
        to: invoice.customer?.email || '',
        subject: `Invoice #${invoice.invoiceId} - Simba Cleaning Services`,
      }
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </span>
        )
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </span>
        )
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Create and manage your invoices</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          onClick={handleCreateInvoice}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
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

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoices...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          {invoices.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-500 mb-6">Create your first invoice to start tracking payments</p>
              <button 
                onClick={handleCreateInvoice}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Invoice
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issued Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
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
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-500 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            {invoice.invoiceId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.customer?.name || 'Unknown Customer'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.customer?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(invoice.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(invoice.issueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(invoice.dueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            className="text-gray-600 hover:text-gray-900"
                            title="Download Invoice"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleSendInvoiceEmail(invoice)}
                            className="text-gray-600 hover:text-gray-900"
                            title="Send Email"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Invoice"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Invoice"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Invoice Form Modal */}
      {showForm && (
        <InvoiceForm 
          onClose={() => {
            setShowForm(false)
            setEditingInvoice(null)
          }}
          onSave={handleSaveInvoice}
          initialInvoice={editingInvoice}
        />
      )}
    </div>
  )
}