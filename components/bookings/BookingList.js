import { useState, useEffect } from 'react'
import BookingCard from './BookingCard'
import BookingForm from './BookingForm'
import { Plus } from 'lucide-react'

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookingCreated = (newBooking) => {
    setBookings([newBooking, ...bookings])
    setShowForm(false)
  }

  if (loading) {
    return <div className="flex justify-center">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </button>
      </div>

      {showForm && (
        <BookingForm
          onBookingCreated={handleBookingCreated}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )
}