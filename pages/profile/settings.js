// // pages/profile/settings.js
// import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/router'
// import { User, Mail, Phone, MapPin, Save, ArrowLeft, Camera } from 'lucide-react'

// export default function ProfileSettings() {
//   const { data: session, update } = useSession()
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [error, setError] = useState('')

//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     role: '',
//     avatar: ''
//   })

//   useEffect(() => {
//     if (session?.user) {
//       setProfile({
//         name: session.user.name || '',
//         email: session.user.email || '',
//         phone: session.user.phone || '',
//         address: session.user.address || '',
//         role: session.user.role || '',
//         avatar: session.user.avatar || ''
//       })
//     }
//   }, [session])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
//     setSuccess(false)

//     try {
//       const response = await fetch('/api/profile/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profile),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         // Update the session with new user data
//         await update({
//           ...session,
//           user: {
//             ...session.user,
//             ...profile
//           }
//         })
//         setSuccess(true)
//         setTimeout(() => setSuccess(false), 3000)
//       } else {
//         setError(data.message || 'Failed to update profile')
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (field, value) => {
//     setProfile(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center text-gray-600 hover:text-gray-900"
//               >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Back
//               </button>
//               <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow">
//           {/* Profile Header */}
//           <div className="px-6 py-8 border-b border-gray-200">
//             <div className="flex items-center space-x-6">
//               <div className="relative">
//                 <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                   {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
//                 </div>
//                 <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
//                   <Camera className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">{profile.name || 'User'}</h2>
//                 <p className="text-gray-600">{profile.email}</p>
//                 <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mt-1">
//                   {profile.role}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
//             {/* Success Message */}
//             {success && (
//               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                 <p className="text-green-600 text-sm">Profile updated successfully!</p>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <p className="text-red-600 text-sm">{error}</p>
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     value={profile.name}
//                     onChange={(e) => handleInputChange('name', e.target.value)}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                   <input
//                     type="email"
//                     value={profile.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                   <input
//                     type="tel"
//                     value={profile.phone}
//                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//               </div>

//               {/* Role (Read-only) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Role
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.role}
//                   disabled
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <textarea
//                   value={profile.address}
//                   onChange={(e) => handleInputChange('address', e.target.value)}
//                   rows={3}
//                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter your address"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-6 border-t border-gray-200">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 ) : (
//                   <Save className="w-5 h-5 mr-2" />
//                 )}
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// pages/profile/settings.js (REPLACE your existing file)
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { User, Mail, Phone, MapPin, Save, ArrowLeft, Camera } from 'lucide-react'
import ImageUpload from '../../components/common/ImageUpload'

export default function ProfileSettings() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    avatar: ''
  })

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',
        address: session.user.address || '',
        role: session.user.role || '',
        avatar: session.user.avatar || ''
      })
    }
  }, [session])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })

      const data = await response.json()

      if (response.ok) {
        // Update the session with new user data
        await update({
          ...session,
          user: {
            ...session.user,
            ...profile
          }
        })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAvatarChange = (imageData) => {
    setProfile(prev => ({
      ...prev,
      avatar: imageData.base64
    }))
  }

  const handleAvatarRemove = () => {
    setProfile(prev => ({
      ...prev,
      avatar: ''
    }))
  }

  const getUserInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Profile Header */}
          <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50">
            <div className="flex items-start space-x-6">
              {/* Avatar Upload */}
              <div className="flex-shrink-0 relative">
                {profile.avatar ? (
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full transition-opacity duration-200 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <ImageUpload
                          currentImage={profile.avatar}
                          onImageChange={handleAvatarChange}
                          onImageRemove={handleAvatarRemove}
                          size="large"
                          shape="circle"
                          placeholder="Change Photo"
                          className="absolute inset-0 opacity-0"
                        />
                        <button
                          onClick={() => document.querySelector('input[type="file"]')?.click()}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          title="Change photo"
                        >
                          <Camera className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                      {getUserInitials(profile.name)}
                    </div>
                    <div className="absolute inset-0">
                      <ImageUpload
                        currentImage={null}
                        onImageChange={handleAvatarChange}
                        size="large"
                        shape="circle"
                        placeholder="Add Photo"
                        className="!border-0 !p-0 !bg-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity rounded-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full transition-opacity duration-200 flex items-center justify-center">
                        <button
                          onClick={() => document.querySelector('input[type="file"]')?.click()}
                          className="opacity-0 hover:opacity-100 p-2 bg-white rounded-full hover:bg-gray-100 transition-all duration-200"
                          title="Add photo"
                        >
                          <Camera className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name || 'User'}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mt-2">
                  {profile.role}
                </span>
                <p className="text-sm text-gray-500 mt-3">
                  Click on your profile picture to update it
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-green-600 text-sm font-medium">Profile updated successfully!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Role (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  value={profile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Profile Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Keep your profile information up to date for better service delivery</li>
            <li>• Your profile photo helps customers and team members recognize you</li>
            <li>• Phone number is important for urgent communication</li>
            <li>• Address information helps with scheduling and route optimization</li>
          </ul>
        </div>
      </div>
    </div>
  )
}