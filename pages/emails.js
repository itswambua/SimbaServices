import { useState } from 'react'
import { Mail, Send, Inbox, Trash2, Search, Plus } from 'lucide-react'

export default function Emails() {
  const [emails, setEmails] = useState([
    {
      id: 1,
      to: 'john@email.com',
      subject: 'Booking Confirmation - Deep Cleaning',
      content: 'Thank you for booking our deep cleaning service...',
      date: '2025-06-17',
      status: 'sent'
    },
    {
      id: 2,
      to: 'sarah@email.com', 
      subject: 'Service Reminder - Tomorrow',
      content: 'This is a friendly reminder about your cleaning service...',
      date: '2025-06-16',
      status: 'sent'
    }
  ])

  const [showCompose, setShowCompose] = useState(false)

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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea rows={6} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Send
              </button>
              <button 
                onClick={() => setShowCompose(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {emails.map((email) => (
            <div key={email.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{email.to}</div>
                    <div className="text-sm text-gray-500">{email.subject}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{email.date}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {email.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}