// In pages/emails.js
import { useState, useEffect } from 'react'
import { Mail, Send, Inbox, Trash2, Search, Plus, Clock } from 'lucide-react'

export default function Emails() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [showCompose, setShowCompose] = useState(false)
  const [emails, setEmails] = useState({
    inbox: [],
    sent: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmails()
  }, [])

  const fetchEmails = async () => {
    try {
      setLoading(true)
      // In a real app, you would fetch from your API
      // Mock data for now
      setEmails({
        inbox: [
          {
            id: 1,
            from: 'john@example.com',
            subject: 'Booking Inquiry',
            content: 'I would like to book a cleaning service...',
            date: '2025-07-02',
            status: 'unread'
          },
          {
            id: 2,
            from: 'sarah@example.com',
            subject: 'Question about deep cleaning',
            content: 'Do you provide carpet cleaning as part of...',
            date: '2025-07-01',
            status: 'read'
          }
        ],
        sent: [
          {
            id: 1,
            to: 'john@example.com',
            subject: 'Booking Confirmation - Deep Cleaning',
            content: 'Thank you for booking our deep cleaning service...',
            date: '2025-06-17',
            status: 'sent'
          },
          {
            id: 2,
            to: 'sarah@example.com', 
            subject: 'Service Reminder - Tomorrow',
            content: 'This is a friendly reminder about your cleaning service...',
            date: '2025-06-16',
            status: 'sent'
          }
        ]
      })
    } catch (error) {
      console.error('Error fetching emails:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emails</h1>
          <p className="text-gray-600">Manage customer communications</p>
        </div>
        <button 
          onClick={() => setShowCompose(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </button>
      </div>

      {showCompose && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Compose Email</h3>
          {/* Email composition form */}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inbox Column */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 border-b p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Inbox className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-gray-900">Inbox</h3>
              {emails.inbox.filter(e => e.status === 'unread').length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {emails.inbox.filter(e => e.status === 'unread').length} new
                </span>
              )}
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Search className="w-4 h-4" />
            </button>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
            {emails.inbox.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>Your inbox is empty</p>
              </div>
            ) : (
              emails.inbox.map(email => (
                <div 
                  key={email.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    email.status === 'unread' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${email.status === 'unread' ? 'text-gray-900' : 'text-gray-600'}`}>
                        {email.from}
                      </p>
                      <p className={`text-sm ${email.status === 'unread' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {email.subject}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">{email.date}</span>
                      {email.status === 'unread' && (
                        <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sent Column */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 border-b p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Send className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium text-gray-900">Sent</h3>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Search className="w-4 h-4" />
            </button>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
            {emails.sent.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Send className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No sent emails</p>
              </div>
            ) : (
              emails.sent.map(email => (
                <div 
                  key={email.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">To: {email.to}</p>
                      <p className="text-sm text-gray-900">{email.subject}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {email.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}