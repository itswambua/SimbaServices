// In pages/settings.js
import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Bell, Shield, Palette, Save } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    businessName: 'Simba Cleaning Services',
    email: 'admin@simbacleaning.com',
    phone: '+61 400 123 456',
    address: '123 Business St, Sydney NSW 2000',
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingReminders: true
    }
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // In a real app, fetch from API
      // For now, we'll use the default state
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // In a real app, send to your API
      // For demo, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage for persistence between page refreshes
      localStorage.setItem('businessSettings', JSON.stringify(settings))
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your business settings and preferences</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
          Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Information */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Business Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input 
                type="text" 
                value={settings.businessName}
                onChange={(e) => setSettings({...settings, businessName: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input 
                type="tel" 
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea 
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                <p className="text-xs text-gray-500">Receive booking and customer updates via email</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="emailToggle"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  className="sr-only"
                />
                <label 
                  htmlFor="emailToggle" 
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      settings.notifications.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
                <p className="text-xs text-gray-500">Receive booking alerts via text message</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="smsToggle"
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                  className="sr-only"
                />
                <label 
                  htmlFor="smsToggle" 
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.notifications.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      settings.notifications.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <span className="text-sm font-medium text-gray-700">Booking Reminders</span>
                <p className="text-xs text-gray-500">Send automated reminders before appointments</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="reminderToggle"
                  checked={settings.notifications.bookingReminders}
                  onChange={(e) => handleNotificationChange('bookingReminders', e.target.checked)}
                  className="sr-only"
                />
                <label 
                  htmlFor="reminderToggle" 
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.notifications.bookingReminders ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      settings.notifications.bookingReminders ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            {/* Configuration Section */}
            {(settings.notifications.emailNotifications || 
              settings.notifications.smsNotifications || 
              settings.notifications.bookingReminders) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Notification Settings</h4>
                
                {/* {settings.notifications.emailNotifications && (
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Template
                    </label>
                    <select 
                      className="block w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="default"
                    >
                      <option value="default">Default Template</option>
                      <option value="minimal">Minimal Template</option>
                      <option value="detailed">Detailed Template</option>
                    </select>
                  </div>
                )} */}
                
                {settings.notifications.smsNotifications && (
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      SMS Provider
                    </label>
                    <select 
                      className="block w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="twilio"
                    >
                      <option value="twilio">Twilio</option>
                      <option value="messagemedia">MessageMedia</option>
                      <option value="custom">Custom Provider</option>
                    </select>
                  </div>
                )}
                
                {settings.notifications.bookingReminders && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Remind Before Appointment
                    </label>
                    <select 
                      className="block w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="24"
                    >
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  )
}