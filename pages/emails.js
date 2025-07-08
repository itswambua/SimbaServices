// // In pages/emails.js
// import { useState, useEffect } from 'react'
// import { Mail, Send, Inbox, Trash2, Search, Plus, Clock } from 'lucide-react'

// export default function Emails() {
//   const [activeTab, setActiveTab] = useState('inbox')
//   const [showCompose, setShowCompose] = useState(false)
//   const [emails, setEmails] = useState({
//     inbox: [],
//     sent: []
//   })
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchEmails()
//   }, [])

//   const fetchEmails = async () => {
//     try {
//       setLoading(true)
//       // In a real app, you would fetch from your API
//       // Mock data for now
//       setEmails({
//         inbox: [
//           {
//             id: 1,
//             from: 'john@example.com',
//             subject: 'Booking Inquiry',
//             content: 'I would like to book a cleaning service...',
//             date: '2025-07-02',
//             status: 'unread'
//           },
//           {
//             id: 2,
//             from: 'sarah@example.com',
//             subject: 'Question about deep cleaning',
//             content: 'Do you provide carpet cleaning as part of...',
//             date: '2025-07-01',
//             status: 'read'
//           }
//         ],
//         sent: [
//           {
//             id: 1,
//             to: 'john@example.com',
//             subject: 'Booking Confirmation - Deep Cleaning',
//             content: 'Thank you for booking our deep cleaning service...',
//             date: '2025-06-17',
//             status: 'sent'
//           },
//           {
//             id: 2,
//             to: 'sarah@example.com', 
//             subject: 'Service Reminder - Tomorrow',
//             content: 'This is a friendly reminder about your cleaning service...',
//             date: '2025-06-16',
//             status: 'sent'
//           }
//         ]
//       })
//     } catch (error) {
//       console.error('Error fetching emails:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Emails</h1>
//           <p className="text-gray-600">Manage customer communications</p>
//         </div>
//         <button 
//           onClick={() => setShowCompose(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Compose
//         </button>
//       </div>

//       {showCompose && (
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Compose Email</h3>
//           {/* Email composition form */}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Inbox Column */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="bg-gray-50 border-b p-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <Inbox className="w-5 h-5 text-blue-600 mr-2" />
//               <h3 className="font-medium text-gray-900">Inbox</h3>
//               {emails.inbox.filter(e => e.status === 'unread').length > 0 && (
//                 <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                   {emails.inbox.filter(e => e.status === 'unread').length} new
//                 </span>
//               )}
//             </div>
//             <button className="text-gray-500 hover:text-gray-700">
//               <Search className="w-4 h-4" />
//             </button>
//           </div>
          
//           <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
//             {emails.inbox.length === 0 ? (
//               <div className="p-6 text-center text-gray-500">
//                 <Mail className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//                 <p>Your inbox is empty</p>
//               </div>
//             ) : (
//               emails.inbox.map(email => (
//                 <div 
//                   key={email.id}
//                   className={`p-4 hover:bg-gray-50 cursor-pointer ${
//                     email.status === 'unread' ? 'bg-blue-50' : ''
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className={`text-sm font-medium ${email.status === 'unread' ? 'text-gray-900' : 'text-gray-600'}`}>
//                         {email.from}
//                       </p>
//                       <p className={`text-sm ${email.status === 'unread' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
//                         {email.subject}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-xs text-gray-500">{email.date}</span>
//                       {email.status === 'unread' && (
//                         <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Sent Column */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="bg-gray-50 border-b p-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <Send className="w-5 h-5 text-green-600 mr-2" />
//               <h3 className="font-medium text-gray-900">Sent</h3>
//             </div>
//             <button className="text-gray-500 hover:text-gray-700">
//               <Search className="w-4 h-4" />
//             </button>
//           </div>
          
//           <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
//             {emails.sent.length === 0 ? (
//               <div className="p-6 text-center text-gray-500">
//                 <Send className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//                 <p>No sent emails</p>
//               </div>
//             ) : (
//               emails.sent.map(email => (
//                 <div 
//                   key={email.id}
//                   className="p-4 hover:bg-gray-50 cursor-pointer"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600">To: {email.to}</p>
//                       <p className="text-sm text-gray-900">{email.subject}</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-xs text-gray-500 flex items-center">
//                         <Clock className="w-3 h-3 mr-1" />
//                         {email.date}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// pages/emails.js
import { useState, useEffect } from 'react'
import { 
  Mail, Send, Inbox, Trash2, Search, Plus, Clock, 
  ArrowLeft, Paperclip, User, ChevronLeft, Bookmark,
  Star, X, AlertCircle, CheckCircle
} from 'lucide-react'
import { useRouter } from 'next/router'

export default function Emails() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [showCompose, setShowCompose] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    content: '',
    attachments: []
  })
  const [emails, setEmails] = useState({
    inbox: [],
    sent: []
  })
  const [loading, setLoading] = useState(true)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchEmails()
    
    // Check URL parameters for email composition
    if (router.query.compose) {
      setShowCompose(true)
      if (router.query.to) {
        setComposeData(prev => ({ ...prev, to: router.query.to }))
      }
      if (router.query.subject) {
        setComposeData(prev => ({ ...prev, subject: router.query.subject }))
      }
    }
  }, [router.query])

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
            fromName: 'John Smith',
            subject: 'Booking Inquiry',
            content: 'I would like to book a cleaning service for my 3-bedroom house next week. Do you have any availability on Tuesday or Wednesday afternoon? We have a medium-sized home with 2 bathrooms that need a thorough cleaning. We also have 2 dogs, so pet-friendly cleaning products would be appreciated.\n\nAdditionally, I was wondering if you offer any discounts for regular bookings? We\'re thinking of setting up a bi-weekly cleaning schedule.\n\nLooking forward to your response,\nJohn Smith',
            date: '2025-07-02T14:30:00Z',
            status: 'unread',
            labels: ['inquiry']
          },
          {
            id: 2,
            from: 'sarah@example.com',
            fromName: 'Sarah Johnson',
            subject: 'Question about deep cleaning',
            content: 'Hello,\n\nDo you provide carpet cleaning as part of your deep cleaning service? We have several rooms with carpets that need some attention. I\'d also like to know if you bring your own cleaning supplies or if we need to provide anything.\n\nThank you,\nSarah',
            date: '2025-07-01T13:15:00Z',
            status: 'read',
            labels: ['inquiry']
          },
          {
            id: 3,
            from: 'mike@example.com',
            fromName: 'Mike Wilson',
            subject: 'Cancellation Request',
            content: 'Hi there,\n\nI need to cancel my booking scheduled for this Friday (July 5th) at 2pm. Something unexpected came up and I won\'t be able to have my apartment cleaned that day. Is it possible to reschedule for next Monday instead?\n\nSorry for the inconvenience,\nMike',
            date: '2025-06-30T10:45:00Z',
            status: 'read',
            labels: ['urgent']
          },
          {
            id: 4,
            from: 'emma@example.com',
            fromName: 'Emma Davis',
            subject: 'Invoice #INV-087 Payment Confirmation',
            content: 'Dear Simba Cleaning,\n\nI\'ve just completed the payment for invoice #INV-087 for the office cleaning service last week. The payment was made via bank transfer. Could you please confirm once it\'s received?\n\nThanks,\nEmma Davis\nSunshine Corp',
            date: '2025-06-29T09:20:00Z',
            status: 'read',
            labels: ['payment']
          }
        ],
        sent: [
          {
            id: 1,
            to: 'john@example.com',
            toName: 'John Smith',
            subject: 'Booking Confirmation - Deep Cleaning',
            content: 'Dear John,\n\nThank you for booking our deep cleaning service. This email confirms your appointment for Monday, June 20th, 2025 at 10:00 AM.\n\nOur team will arrive at your provided address promptly. We\'ll bring all necessary cleaning supplies and equipment. Please ensure access to the property and clear any valuable or fragile items you prefer we don\'t handle.\n\nIf you need to reschedule or have any questions, please contact us at least 24 hours before your appointment.\n\nWe look forward to providing you with exceptional cleaning service!\n\nBest regards,\nSimba Cleaning Team',
            date: '2025-06-17T15:30:00Z',
            status: 'sent',
            labels: ['confirmation']
          },
          {
            id: 2,
            to: 'sarah@example.com', 
            toName: 'Sarah Johnson',
            subject: 'Service Reminder - Tomorrow',
            content: 'Hello Sarah,\n\nThis is a friendly reminder about your cleaning service scheduled for tomorrow at 1:00 PM. Our team will arrive at your address and provide the regular cleaning service you\'ve booked.\n\nIf you need to make any changes or have special instructions, please let us know as soon as possible.\n\nThank you for choosing Simba Cleaning!\n\nBest regards,\nSimba Cleaning Team',
            date: '2025-06-16T09:00:00Z',
            status: 'sent',
            labels: ['reminder']
          },
          {
            id: 3,
            to: 'mike@example.com',
            toName: 'Mike Wilson',
            subject: 'RE: Quote for Office Cleaning',
            content: 'Hi Mike,\n\nThank you for your inquiry about our office cleaning services. Based on the information you provided for your 5000 sq ft office space, we can offer the following options:\n\n1. Regular Cleaning (3 times per week): $800/month\n2. Deep Cleaning (monthly): $650 per session\n3. One-time Initial Cleaning: $850\n\nAll packages include floor cleaning, dusting, washroom sanitizing, and waste removal. Window cleaning can be added for an additional fee.\n\nWould you like to schedule a free on-site assessment? This would allow us to provide a more accurate quote tailored to your specific needs.\n\nBest regards,\nSimba Cleaning Team',
            date: '2025-06-15T14:20:00Z',
            status: 'sent',
            labels: ['quote']
          }
        ]
      })
    } catch (error) {
      console.error('Error fetching emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompose = (e) => {
    e.preventDefault()
    
    if (!composeData.to || !composeData.subject) {
      setErrorMessage('Please fill in all required fields')
      return
    }
    
    setSendingEmail(true)
    
    // Simulate sending email
    setTimeout(() => {
      const newEmail = {
        id: Date.now(),
        to: composeData.to,
        toName: composeData.to.split('@')[0],
        subject: composeData.subject,
        content: composeData.content,
        date: new Date().toISOString(),
        status: 'sent',
        labels: []
      }
      
      setEmails(prev => ({
        ...prev,
        sent: [newEmail, ...prev.sent]
      }))
      
      setComposeData({
        to: '',
        subject: '',
        content: '',
        attachments: []
      })
      
      setShowCompose(false)
      setSendingEmail(false)
      setSuccessMessage('Email sent successfully')
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }, 1500)
  }

  const handleReply = (email) => {
    let recipientEmail = ''
    let recipientName = ''
    let subject = ''
    
    if (activeTab === 'inbox') {
      recipientEmail = email.from
      recipientName = email.fromName
      subject = `RE: ${email.subject}`
    } else {
      recipientEmail = email.to
      recipientName = email.toName
      subject = `RE: ${email.subject}`
    }
    
    setComposeData({
      to: recipientEmail,
      subject: subject,
      content: `\n\n-------- Original Message --------\nFrom: ${recipientName} <${recipientEmail}>\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.content}`,
      attachments: []
    })
    
    setShowCompose(true)
    setSelectedEmail(null)
  }

  const markAsRead = (emailId) => {
    setEmails(prev => ({
      ...prev,
      inbox: prev.inbox.map(email => 
        email.id === emailId ? { ...email, status: 'read' } : email
      )
    }))
  }

  const deleteEmail = (emailId, tab) => {
    setEmails(prev => ({
      ...prev,
      [tab]: prev[tab].filter(email => email.id !== emailId)
    }))
    
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
    }
    
    // Yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    }
    
    // Within last 7 days
    if (now - date < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString('en-AU', { weekday: 'short' })
    }
    
    // This year
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
    }
    
    // Earlier years
    return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getFullDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const countUnread = () => {
    return emails.inbox.filter(email => email.status === 'unread').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emails</h1>
          <p className="text-gray-600">Manage customer communications</p>
        </div>
        <button 
          onClick={() => {
            setComposeData({
              to: '',
              subject: '',
              content: '',
              attachments: []
            })
            setShowCompose(true)
            setSelectedEmail(null)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </button>
      </div>

      {/* Success or Error Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800">{successMessage}</span>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">{errorMessage}</span>
        </div>
      )}

      {/* Email Interface */}
      {!showCompose ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab('inbox')
                setSelectedEmail(null)
              }}
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === 'inbox' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Inbox className="w-5 h-5 mr-2" />
              Inbox
              {countUnread() > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {countUnread()}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('sent')
                setSelectedEmail(null)
              }}
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === 'sent' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Send className="w-5 h-5 mr-2" />
              Sent
            </button>
          </div>

          <div className="flex h-[600px]">
            {/* Email List */}
            <div className={`w-1/3 border-r overflow-y-auto ${selectedEmail ? 'hidden md:block' : ''}`}>
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {emails[activeTab].length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    {activeTab === 'inbox' ? (
                      <>
                        <Mail className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p>Your inbox is empty</p>
                      </>
                    ) : (
                      <>
                        <Send className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p>No sent emails</p>
                      </>
                    )}
                  </div>
                ) : (
                  emails[activeTab].map(email => (
                    <div 
                      key={email.id}
                      onClick={() => {
                        setSelectedEmail(email)
                        if (activeTab === 'inbox' && email.status === 'unread') {
                          markAsRead(email.id)
                        }
                      }}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        selectedEmail && selectedEmail.id === email.id ? 'bg-blue-50' : ''
                      } ${
                        activeTab === 'inbox' && email.status === 'unread' ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                          {activeTab === 'inbox' 
                            ? email.fromName.charAt(0).toUpperCase()
                            : email.toName.charAt(0).toUpperCase()
                          }
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{formatDate(email.date)}</span>
                          {email.labels.includes('urgent') && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                              Urgent
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className={`text-sm font-medium ${
                          activeTab === 'inbox' && email.status === 'unread' 
                            ? 'text-gray-900' 
                            : 'text-gray-600'
                        }`}>
                          {activeTab === 'inbox' ? email.fromName : email.toName}
                        </p>
                        <p className={`text-sm ${
                          activeTab === 'inbox' && email.status === 'unread' 
                            ? 'font-medium text-gray-900' 
                            : 'text-gray-500'
                        }`}>
                          {email.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {email.content.split('\n')[0]}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Email Detail View */}
            {selectedEmail ? (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b flex items-center">
                  <button 
                    onClick={() => setSelectedEmail(null)}
                    className="md:hidden mr-2 text-gray-600 hover:text-gray-900"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex-1 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {selectedEmail.subject}
                    </h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleReply(selectedEmail)}
                        title="Reply"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteEmail(
                          selectedEmail.id, 
                          activeTab
                        )}
                        title="Delete"
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium mr-4">
                        {activeTab === 'inbox' 
                          ? selectedEmail.fromName.charAt(0).toUpperCase()
                          : selectedEmail.toName.charAt(0).toUpperCase()
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activeTab === 'inbox' 
                            ? `${selectedEmail.fromName} <${selectedEmail.from}>`
                            : `${selectedEmail.toName} <${selectedEmail.to}>`
                          }
                        </p>
                        <p className="text-sm text-gray-500">
                          {getFullDate(selectedEmail.date)}
                        </p>
                      </div>
                    </div>
                    {selectedEmail.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedEmail.labels.map(label => (
                          <span 
                            key={label}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              label === 'urgent' ? 'bg-red-100 text-red-800' :
                              label === 'inquiry' ? 'bg-blue-100 text-blue-800' :
                              label === 'payment' ? 'bg-green-100 text-green-800' :
                              label === 'quote' ? 'bg-purple-100 text-purple-800' :
                              label === 'confirmation' ? 'bg-teal-100 text-teal-800' :
                              label === 'reminder' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="prose max-w-none">
                    {selectedEmail.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-800">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <button 
                      onClick={() => handleReply(selectedEmail)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-500">
                <div>
                  <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select an email to read</h3>
                  <p>Click on an email from the list to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex items-center">
            <button 
              onClick={() => setShowCompose(false)}
              className="text-gray-600 hover:text-gray-900 mr-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium text-gray-900">New Message</h3>
          </div>

          <form onSubmit={handleCompose} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                <input
                  type="email"
                  value={composeData.to}
                  onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                <textarea
                  rows={15}
                  value={composeData.content}
                  onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-900 mr-3"
                  title="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-500">
                  {composeData.attachments.length > 0 
                    ? `${composeData.attachments.length} files attached` 
                    : 'No files attached'}
                </span>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="mr-3 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {sendingEmail ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}