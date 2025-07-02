import { useState } from 'react'
import { User, Mail, Phone, MapPin, Bell, Shield, Palette } from 'lucide-react'

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

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your business settings and preferences</p>
      </div>

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
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email Notifications</span>
              <input 
                type="checkbox" 
                checked={settings.notifications.emailNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, emailNotifications: e.target.checked}
                })}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">SMS Notifications</span>
              <input 
                type="checkbox" 
                checked={settings.notifications.smsNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, smsNotifications: e.target.checked}
                })}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Booking Reminders</span>
              <input 
                type="checkbox" 
                checked={settings.notifications.bookingReminders}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, bookingReminders: e.target.checked}
                })}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}