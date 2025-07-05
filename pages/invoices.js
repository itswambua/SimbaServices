// In pages/invoices.js
import { useState, useEffect } from 'react'
import { FileText, Calendar, DollarSign, Download, Trash2, Edit, Plus } from 'lucide-react'
import { useRouter } from 'next/router'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
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
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInvoice = () => {
    // Redirect to invoice creation page or open a modal
    // For now, let's just alert
    alert('Create invoice functionality would open a form here')
  }

  const handleEdit = (invoiceId) => {
    // Redirect to invoice edit page or open a modal
    alert(`Edit invoice ${invoiceId}`)
  }

  const handleDelete = async (invoiceId) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`, {
          method: 'DELETE',
        })
        if (!response.ok) throw new Error('Failed to delete invoice')
        
        // Update local state
        setInvoices(invoices.filter(invoice => invoice.id !== invoiceId))
        alert('Invoice deleted successfully')
      } catch (error) {
        console.error('Error deleting invoice:', error)
        alert('Failed to delete invoice')
      }
    }
  }

  const handleDownload = async (invoiceId) => {
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
      alert('Failed to download invoice')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Track and manage your invoices</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          onClick={handleCreateInvoice}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoices...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table headers */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  {/* Other table headers */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    {/* Invoice data cells */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleDownload(invoice.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(invoice.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit Invoice"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(invoice.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Invoice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}