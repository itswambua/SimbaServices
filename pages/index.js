
// import Link from 'next/link'
// import { Phone, Mail, MapPin, Star, Clock, Shield, Users, CheckCircle } from 'lucide-react'

// export default function Home() {
//   Home.useLayout = false
  
//   const services = [
//     {
//       name: 'Regular Cleaning',
//       description: 'Weekly or bi-weekly cleaning to keep your home spotless',
//       price: 'From $80',
//       features: ['Dusting', 'Vacuuming', 'Mopping', 'Bathroom cleaning']
//     },
//     {
//       name: 'Deep Cleaning',
//       description: 'Thorough cleaning for move-ins, move-outs, or seasonal cleaning',
//       price: 'From $200',
//       features: ['Inside appliances', 'Baseboards', 'Light fixtures', 'Cabinet interiors']
//     },
//     {
//       name: 'Office Cleaning',
//       description: 'Professional cleaning services for your workplace',
//       price: 'From $150',
//       features: ['Desk sanitization', 'Floor cleaning', 'Trash removal', 'Window cleaning']
//     }
//   ]

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       text: 'Simba Cleaning transformed my home! Professional, reliable, and thorough.',
//       rating: 5
//     },
//     {
//       name: 'Mike Chen',
//       text: 'Best cleaning service in Sydney. They always exceed my expectations.',
//       rating: 5
//     },
//     {
//       name: 'Emma Davis',
//       text: 'Punctual, friendly, and they pay attention to every detail.',
//       rating: 5
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-blue-600">Simba Cleaning Services</h1>
//             </div>
//             <nav className="hidden md:flex space-x-8">
//               <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
//               <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
//               <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Reviews</a>
//               <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
//               <Link href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                 Staff Login
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Professional Cleaning Services in Sydney
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
//               Reliable, thorough, and affordable cleaning services for your home and office.
//               Let us handle the cleaning while you focus on what matters most.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
//                 Get Free Quote
//               </a>
//               <a href="tel:+61400123456" className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600">
//                 Call Now: (04) 0012 3456
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Simba Cleaning?</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Shield className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Insured & Bonded</h3>
//               <p className="text-gray-600">Fully insured and bonded for your peace of mind</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Clock className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
//               <p className="text-gray-600">Punctual service you can count on</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
//               <p className="text-gray-600">Professional cleaners with years of experience</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">About Simba Cleaning Services</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Your trusted cleaning partner in Sydney, committed to excellence and customer satisfaction
//             </p>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
//               <p className="text-gray-600 mb-6">
//                 Founded in Sydney, Simba Cleaning Services has been providing exceptional cleaning solutions 
//                 to homes and businesses across the city. We understand that a clean environment is essential 
//                 for health, productivity, and peace of mind.
//               </p>
//               <p className="text-gray-600 mb-6">
//                 Our team of dedicated professionals takes pride in delivering thorough, reliable cleaning 
//                 services that exceed expectations. We use eco-friendly products and proven techniques to 
//                 ensure your space is not just clean, but truly spotless.
//               </p>
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                   <span className="text-gray-700">Licensed and Insured</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                   <span className="text-gray-700">Eco-friendly Products</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                   <span className="text-gray-700">Satisfaction Guaranteed</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                   <span className="text-gray-700">Flexible Scheduling</span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-blue-50 rounded-lg p-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
//               <p className="text-gray-600 mb-6">
//                 To provide exceptional cleaning services that allow our clients to focus on what matters 
//                 most to them, while we take care of maintaining a clean, healthy, and welcoming environment.
//               </p>
//               <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Values:</h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li>• <strong>Reliability:</strong> We show up when we say we will</li>
//                 <li>• <strong>Quality:</strong> We maintain the highest cleaning standards</li>
//                 <li>• <strong>Trust:</strong> Your home and office are safe with us</li>
//                 <li>• <strong>Respect:</strong> We treat your space as our own</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services */}
//       <section id="services" className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We offer comprehensive cleaning solutions tailored to your needs
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
//                 <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
//                 <p className="text-gray-600 mb-4">{service.description}</p>
//                 <div className="text-3xl font-bold text-blue-600 mb-6">{service.price}</div>
//                 <ul className="space-y-2 mb-8">
//                   {service.features.map((feature, idx) => (
//                     <li key={idx} className="flex items-center">
//                       <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//                 <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
//                   Book Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white rounded-lg shadow p-6">
//                 <div className="flex mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
//                 <div className="font-semibold">{testimonial.name}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact */}
//       <section id="contact" className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
//             <p className="text-gray-600">Ready to book your cleaning service? Contact us today!</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             <div>
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <Phone className="w-6 h-6 text-blue-600 mr-4" />
//                   <div>
//                     <div className="font-semibold">Phone</div>
//                     <div className="text-gray-600">+61 400 123 456</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Mail className="w-6 h-6 text-blue-600 mr-4" />
//                   <div>
//                     <div className="font-semibold">Email</div>
//                     <div className="text-gray-600">info@simbacleaning.com.au</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <MapPin className="w-6 h-6 text-blue-600 mr-4" />
//                   <div>
//                     <div className="font-semibold">Service Area</div>
//                     <div className="text-gray-600">Sydney and surrounding areas</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <form className="space-y-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="Your Email"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="tel"
//                     placeholder="Your Phone"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <textarea
//                     rows={4}
//                     placeholder="Tell us about your cleaning needs..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Get Free Quote
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold mb-4">Simba Cleaning Services</h3>
//             <p className="text-gray-400 mb-4">Professional cleaning services you can trust</p>
//             <div className="flex justify-center space-x-6">
//               <span>Phone: +61 400 123 456</span>
//               <span>Email: info@simbacleaning.com.au</span>
//             </div>
//             <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
//               <p>&copy; 2025 Simba Cleaning Services. All rights reserved.</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// pages/index.js (REPLACE your existing file)
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Star, Clock, Shield, Users, CheckCircle, ChevronLeft, ChevronRight, Play, Award, ThumbsUp } from 'lucide-react'

export default function Home() {
  Home.useLayout = false
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const services = [
    {
      name: 'Regular Cleaning',
      description: 'Weekly or bi-weekly cleaning to keep your home spotless',
      price: 'From $80',
      features: ['Dusting & Vacuuming', 'Kitchen & Bathroom Deep Clean', 'Mopping & Sanitizing', 'Trash Removal'],
      beforeImage: '/images/services/regular-before.jpg',
      afterImage: '/images/services/regular-after.jpg',
      icon: '🏠'
    },
    {
      name: 'Deep Cleaning',
      description: 'Thorough cleaning for move-ins, move-outs, or seasonal refresh',
      price: 'From $200',
      features: ['Inside Appliances', 'Baseboards & Light Fixtures', 'Cabinet Interiors', 'Window Cleaning'],
      beforeImage: '/images/services/deep-before.jpg',
      afterImage: '/images/services/deep-after.jpg',
      icon: '✨'
    },
    {
      name: 'Office Cleaning',
      description: 'Professional cleaning services for your workplace',
      price: 'From $150',
      features: ['Desk Sanitization', 'Floor Deep Clean', 'Restroom Maintenance', 'Common Area Cleaning'],
      beforeImage: '/images/services/office-before.jpg',
      afterImage: '/images/services/office-after.jpg',
      icon: '🏢'
    }
  ]

  const heroSlides = [
    {
      image: '/images/hero/hero-1.jpg',
      title: 'Professional Cleaning with a Smile!',
      subtitle: 'Let Simba take care of the mess while you enjoy your clean space',
      cta: 'Get Free Quote'
    },
    {
      image: '/images/hero/hero-2.jpg', 
      title: 'Trusted by 500+ Sydney Families',
      subtitle: 'Join our growing family of satisfied customers across Sydney',
      cta: 'See Reviews'
    },
    {
      image: '/images/hero/hero-3.jpg',
      title: 'Eco-Friendly & Safe Cleaning',
      subtitle: 'Using green products that are safe for your family and pets',
      cta: 'Learn More'
    }
  ]

  const galleryImages = [
    { 
      src: '/images/gallery/living-room-clean.jpg', 
      alt: 'Clean Living Room', 
      category: 'Residential',
      description: 'Sparkling living room transformation'
    },
    { 
      src: '/images/gallery/kitchen-after.jpg', 
      alt: 'Sparkling Kitchen', 
      category: 'Kitchen',
      description: 'Kitchen deep clean and organization'
    },
    { 
      src: '/images/gallery/office-space.jpg', 
      alt: 'Clean Office Space', 
      category: 'Commercial',
      description: 'Professional office cleaning'
    },
    { 
      src: '/images/gallery/bathroom-clean.jpg', 
      alt: 'Pristine Bathroom', 
      category: 'Bathroom',
      description: 'Bathroom restoration and sanitization'
    },
    { 
      src: '/images/gallery/bedroom-tidy.jpg', 
      alt: 'Organized Bedroom', 
      category: 'Bedroom',
      description: 'Bedroom organization and cleaning'
    },
    { 
      src: '/images/gallery/restaurant-clean.jpg', 
      alt: 'Restaurant Cleaning', 
      category: 'Commercial',
      description: 'Restaurant deep cleaning service'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Simba Cleaning transformed my home! Professional, reliable, and they always leave everything spotless. The team is incredibly friendly and trustworthy.',
      rating: 5,
      image: '/images/testimonials/sarah.jpg',
      location: 'Bondi, NSW',
      service: 'Regular Cleaning'
    },
    {
      name: 'Mike Chen',
      text: 'Best cleaning service in Sydney! The attention to detail is amazing, and they use eco-friendly products which is important to our family.',
      rating: 5,
      image: '/images/testimonials/mike.jpg',
      location: 'Parramatta, NSW',
      service: 'Deep Cleaning'
    },
    {
      name: 'Emma Davis',
      text: 'Punctual, professional, and reasonably priced. I recommend them to all my friends! They make my office look brand new every week.',
      rating: 5,
      image: '/images/testimonials/emma.jpg',
      location: 'Manly, NSW',
      service: 'Office Cleaning'
    }
  ]

  const stats = [
    { number: '500+', label: 'Happy Customers', icon: Users },
    { number: '5000+', label: 'Cleans Completed', icon: CheckCircle },
    { number: '5', label: 'Years Experience', icon: Award },
    { number: '4.9/5', label: 'Average Rating', icon: Star }
  ]

  // Auto-play hero slider
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity logo-hover">
              <img 
                src="/images/simba-logo.png" 
                alt="Simba Cleaning Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = 'none'
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-gradient">Simba Cleaning</h1>
                <p className="text-sm text-orange-500 font-medium">Professional Services</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Gallery</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <Link href="/auth/signin" className="btn-primary">
                Staff Login
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div 
              className="h-full bg-cover bg-center bg-gray-200 flex items-center slide-bg"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundColor: '#e5e7eb' // Fallback color
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-responsive-xl font-bold mb-6 animate-fade-in text-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact" className="btn-secondary hover-lift">
                    {slide.cta}
                  </a>
                  <a href="tel:+61400123456" className="btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                    Call Now: (04) 0012 3456
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-dark text-white p-3 rounded-full hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-dark text-white p-3 rounded-full hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-6 right-6 glass-dark text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1 h-3 bg-white mr-1"></div>
              <div className="w-1 h-3 bg-white"></div>
            </div>
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">Why Choose Simba Cleaning?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Just like our friendly lion mascot, we bring strength, reliability, and a smile to every cleaning job!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-interactive text-center hover-lift">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insured & Bonded</h3>
              <p className="text-gray-600">Fully insured and bonded for your complete peace of mind and protection</p>
            </div>
            <div className="card-interactive text-center hover-lift">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
              <p className="text-gray-600">Punctual service you can count on, every single time without fail</p>
            </div>
            <div className="card-interactive text-center hover-lift">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Professional cleaners with years of experience and training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services with Before/After */}
      <section id="services" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">Our Cleaning Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the amazing transformations we achieve with our professional cleaning services
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-interactive overflow-hidden hover-lift">
                {/* Before/After Image Comparison */}
                <div className="relative h-48 bg-gray-200 before-after-card">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative overflow-hidden">
                      <div className="before-after-label before-label">
                        Before
                      </div>
                      <div 
                        className="h-full bg-cover bg-center bg-gray-300"
                        style={{ 
                          backgroundImage: `url(${service.beforeImage})`,
                          backgroundColor: '#d1d5db'
                        }}
                      />
                    </div>
                    <div className="before-after-divider"></div>
                    <div className="w-1/2 relative overflow-hidden">
                      <div className="before-after-label after-label">
                        After
                      </div>
                      <div 
                        className="h-full bg-cover bg-center bg-gray-300"
                        style={{ 
                          backgroundImage: `url(${service.afterImage})`,
                          backgroundColor: '#d1d5db'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{service.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-orange-500 mb-4">{service.price}</div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full btn-primary hover-scale">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section id="gallery" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">Our Work in Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our recent cleaning transformations across Sydney
            </p>
          </div>
          
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item group hover-scale">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${image.src})`,
                    backgroundColor: '#e5e7eb'
                  }}
                />
                <div className="gallery-overlay">
                  <div className="text-white">
                    <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded mb-2">
                      {image.category}
                    </span>
                    <p className="font-medium">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">About Simba Cleaning Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted cleaning partner in Sydney, bringing the strength and reliability of a lion to every job
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-6">
                Founded in Sydney, Simba Cleaning Services has been providing exceptional cleaning solutions 
                to homes and businesses across the city. Just like our lion mascot, we approach every job 
                with strength, pride, and a commitment to excellence.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of dedicated professionals takes pride in delivering thorough, reliable cleaning 
                services that exceed expectations. We use eco-friendly products and proven techniques to 
                ensure your space is not just clean, but truly spotless.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg hover-lift">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg hover-lift">
                  <div className="text-2xl font-bold text-orange-600">5 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
            </div>
            <div className="space-y-4 animate-slide-in-right">
              <div 
                className="h-64 bg-cover bg-center rounded-lg shadow-lg bg-gray-200 hover-scale"
                style={{ 
                  backgroundImage: 'url(/images/about/team-photo.jpg)',
                  backgroundColor: '#e5e7eb'
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="h-32 bg-cover bg-center rounded-lg shadow bg-gray-200 hover-scale"
                  style={{ 
                    backgroundImage: 'url(/images/about/office-photo.jpg)',
                    backgroundColor: '#e5e7eb'
                  }}
                />
                <div 
                  className="h-32 bg-cover bg-center rounded-lg shadow bg-gray-200 hover-scale"
                  style={{ 
                    backgroundImage: 'url(/images/about/equipment-photo.jpg)',
                    backgroundColor: '#e5e7eb'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Don't just take our word for it - hear from our satisfied customers!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card hover-lift">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center bg-gray-300 mr-4"
                    style={{ 
                      backgroundImage: `url(${testimonial.image})`,
                      backgroundColor: '#d1d5db'
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-xs text-blue-600">{testimonial.service}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600">Ready to experience the Simba difference? Contact us today!</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center hover-lift p-4 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-600">+61 400 123 456</div>
                </div>
              </div>
              <div className="flex items-center hover-lift p-4 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-600">info@simbacleaning.com.au</div>
                </div>
              </div>
              <div className="flex items-center hover-lift p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <div className="font-semibold">Service Area</div>
                  <div className="text-gray-600">Sydney and surrounding areas</div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Why Choose Us?</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">100% Satisfaction Guaranteed</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm">Fully Insured & Bonded</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Flexible Scheduling</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input-focus w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input-focus w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="input-focus w-full"
                  />
                </div>
                <div>
                  <select className="input-focus w-full">
                    <option value="">Select Service</option>
                    <option value="regular">Regular Cleaning</option>
                    <option value="deep">Deep Cleaning</option>
                    <option value="office">Office Cleaning</option>
                  </select>
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your cleaning needs..."
                    className="input-focus w-full"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full btn-secondary hover-scale"
                >
                  Get Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/images/simba-logo.png" 
                alt="Simba Cleaning Logo" 
                className="h-8 w-auto"
                onError={(e) => e.target.style.display = 'none'}
              />
              <h3 className="text-2xl font-bold">Simba Cleaning Services</h3>
            </div>
            <p className="text-gray-400 mb-6">Professional cleaning services you can trust</p>
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+61 400 123 456</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@simbacleaning.com.au</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
              <p>&copy; 2025 Simba Cleaning Services. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}