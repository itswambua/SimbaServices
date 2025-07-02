// // pages/index.js - Updated with requested changes
// import Link from 'next/link'
// import { useState, useEffect } from 'react'
// import { 
//   Phone, Mail, MapPin, Star, Clock, Shield, Users, CheckCircle, 
//   ChevronLeft, ChevronRight, Play, Award, ThumbsUp, User, ChevronDown 
// } from 'lucide-react'

// export default function Home() {
//   Home.useLayout = false
  
//   // Hero slider state
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)

//   // Contact form state
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     propertySize: '',
//     message: ''
//   })
  
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   // Admin check - you can replace this with your actual admin logic
//   const [isAdmin, setIsAdmin] = useState(false)

//   useEffect(() => {
//     // Check if user is admin - replace this with your actual auth logic
//     const checkAdminStatus = () => {
//       // Example: check localStorage, cookies, or make API call
//       const adminToken = localStorage.getItem('adminToken')
//       // You could also check session storage or make an API call
//       setIsAdmin(!!adminToken)
//     }
    
//     checkAdminStatus()
//   }, [])

//   // Data arrays
//   const services = [
//     {
//       name: 'Regular Cleaning',
//       description: 'Weekly or bi-weekly cleaning to keep your home spotless',
//       price: 'From $80',
//       features: ['Dusting & Vacuuming', 'Kitchen & Bathroom Deep Clean', 'Mopping & Sanitizing', 'Trash Removal'],
//       beforeImage: '/images/services/regular-before.jpg',
//       afterImage: '/images/services/regular-after.jpg',
//       icon: '🏠',
//       serviceType: 'regular'
//     },
//     {
//       name: 'Deep Cleaning',
//       description: 'Thorough cleaning for move-ins, move-outs, or seasonal refresh',
//       price: 'From $200',
//       features: ['Inside Appliances', 'Baseboards & Light Fixtures', 'Cabinet Interiors', 'Window Cleaning'],
//       beforeImage: '/images/services/deep-before.jpg',
//       afterImage: '/images/services/deep-after.jpg',
//       icon: '✨',
//       serviceType: 'deep'
//     },
//     {
//       name: 'Office Cleaning',
//       description: 'Professional cleaning services for your workplace',
//       price: 'From $150',
//       features: ['Desk Sanitization', 'Floor Deep Clean', 'Restroom Maintenance', 'Common Area Cleaning'],
//       beforeImage: '/images/services/office-before.jpg',
//       afterImage: '/images/services/office-after.jpg',
//       icon: '🏢',
//       serviceType: 'office'
//     }
//   ]

//   const heroSlides = [
//     {
//       image: '/images/hero/hero-1.jpg',
//       title: 'Professional Cleaning with a Smile!',
//       subtitle: 'Let Simba take care of the mess while you enjoy your clean space',
//       cta: 'Get Free Quote'
//     },
//     {
//       image: '/images/hero/hero-2.jpg', 
//       title: 'Trusted by 500+ Sydney Families',
//       subtitle: 'Join our growing family of satisfied customers across Sydney',
//       cta: 'See Reviews'
//     },
//     {
//       image: '/images/hero/hero-3.jpg',
//       title: 'Eco-Friendly & Safe Cleaning',
//       subtitle: 'Using green products that are safe for your family and pets',
//       cta: 'Learn More'
//     }
//   ]

//   const galleryImages = [
//     { 
//       src: '/images/gallery/living-room-clean.jpg', 
//       alt: 'Clean Living Room', 
//       category: 'Residential',
//       description: 'Sparkling living room transformation'
//     },
//     { 
//       src: '/images/gallery/kitchen-after.jpg', 
//       alt: 'Sparkling Kitchen', 
//       category: 'Kitchen',
//       description: 'Kitchen deep clean and organization'
//     },
//     { 
//       src: '/images/gallery/office-space.jpg', 
//       alt: 'Clean Office Space', 
//       category: 'Commercial',
//       description: 'Professional office cleaning'
//     },
//     { 
//       src: '/images/gallery/bathroom-clean.jpg', 
//       alt: 'Pristine Bathroom', 
//       category: 'Bathroom',
//       description: 'Bathroom restoration and sanitization'
//     },
//     { 
//       src: '/images/gallery/bedroom-tidy.jpg', 
//       alt: 'Organized Bedroom', 
//       category: 'Bedroom',
//       description: 'Bedroom organization and cleaning'
//     },
//     { 
//       src: '/images/gallery/restaurant-clean.jpg', 
//       alt: 'Restaurant Cleaning', 
//       category: 'Commercial',
//       description: 'Restaurant deep cleaning service'
//     }
//   ]

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       text: 'Simba Cleaning transformed my home! Professional, reliable, and they always leave everything spotless. The team is incredibly friendly and trustworthy.',
//       rating: 5,
//       image: '/images/testimonials/sarah.jpg',
//       location: 'Bondi, NSW',
//       service: 'Regular Cleaning'
//     },
//     {
//       name: 'Mike Chen',
//       text: 'Best cleaning service in Sydney! The attention to detail is amazing, and they use eco-friendly products which is important to our family.',
//       rating: 5,
//       image: '/images/testimonials/mike.jpg',
//       location: 'Parramatta, NSW',
//       service: 'Deep Cleaning'
//     },
//     {
//       name: 'Emma Davis',
//       text: 'Punctual, professional, and reasonably priced. I recommend them to all my friends! They make my office look brand new every week.',
//       rating: 5,
//       image: '/images/testimonials/emma.jpg',
//       location: 'Manly, NSW',
//       service: 'Office Cleaning'
//     }
//   ]

//   const stats = [
//     { number: '500+', label: 'Happy Customers', icon: Users },
//     { number: '5000+', label: 'Cleans Completed', icon: CheckCircle },
//     { number: '5', label: 'Years Experience', icon: Award },
//     { number: '4.9/5', label: 'Average Rating', icon: Star }
//   ]

//   // Form validation function
//   const validateForm = () => {
//     const newErrors = {}
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required'
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required'
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email'
//     }
    
//     if (!formData.service) {
//       newErrors.service = 'Please select a service'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   // Form input change handler
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }))
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }))
//     }
//   }

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!validateForm()) return
    
//     setIsSubmitting(true)
    
//     try {
//       // Replace this with your actual API call
//       console.log('Form submitted:', formData)
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000))
      
//       setIsSubmitted(true)
      
//       // Reset form after 3 seconds
//       setTimeout(() => {
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           service: '',
//           propertySize: '',
//           message: ''
//         })
//         setIsSubmitted(false)
//       }, 3000)
      
//     } catch (error) {
//       console.error('Submission error:', error)
//       alert('Something went wrong. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Service booking handler
//   const handleBookService = (serviceType) => {
//     // Scroll to contact form and pre-select the service
//     setFormData(prev => ({
//       ...prev,
//       service: serviceType
//     }))
    
//     // Scroll to contact section
//     const contactSection = document.getElementById('contact')
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   // Auto-play hero slider
//   useEffect(() => {
//     if (!isAutoPlaying) return
    
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying, heroSlides.length])

//   // Hero slider controls
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
//     setIsAutoPlaying(false)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
//     setIsAutoPlaying(false)
//   }

//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//     setIsAutoPlaying(false)
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             {/* Logo and Brand */}
//             <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity logo-hover">
//               <img 
//                 src="/images/simba-logo.png" 
//                 alt="Simba Cleaning Logo" 
//                 className="h-12 w-auto"
//                 onError={(e) => {
//                   // Fallback if image doesn't load
//                   e.target.style.display = 'none'
//                 }}
//               />
//               <div>
//                 <h1 className="text-2xl font-bold text-gradient">Simba Cleaning</h1>
//                 <p className="text-sm text-orange-500 font-medium">Professional Services</p>
//               </div>
//             </Link>

//             {/* Navigation */}
//             <nav className="hidden md:flex space-x-8">
//               <a href="#services" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</a>
//               <a href="#gallery" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Gallery</a>
//               <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
//               <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Reviews</a>
//               <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a>
//               {/* Only show Staff Login to admins or when specifically needed */}
//               {isAdmin && (
//                 <Link href="/auth/signin" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
//                   Staff Login
//                 </Link>
//               )}
//             </nav>

//             {/* Mobile Menu Button */}
//             <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Slider Section */}
//       <section className="relative h-screen overflow-hidden hero-slider">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={index}
//             className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
//           >
//             <div 
//               className="h-full bg-cover bg-center bg-gray-200 flex items-center slide-bg"
//               style={{
//                 backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
//                 backgroundColor: '#e5e7eb' // Fallback color
//               }}
//             >
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-shadow-lg">
//                   {slide.title}
//                 </h1>
//                 <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
//                   {slide.subtitle}
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors hover-lift">
//                     {slide.cta}
//                   </a>
//                   <a href="tel:+61400123456" className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
//                     Call Now: (04) 0012 3456
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {/* Slider Controls */}
//         <button 
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>
//         <button 
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>

//         {/* Slide Indicators */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentSlide ? 'bg-white' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>

//         {/* Play/Pause Button */}
//         <button
//           onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//           className="absolute bottom-6 right-6 bg-black bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
//           title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
//         >
//           {isAutoPlaying ? (
//             <div className="w-4 h-4 flex items-center justify-center">
//               <div className="w-1 h-3 bg-white mr-1"></div>
//               <div className="w-1 h-3 bg-white"></div>
//             </div>
//           ) : (
//             <Play className="w-4 h-4" />
//           )}
//         </button>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, index) => (
//               <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
//                 <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
//                 <div className="text-3xl font-bold mb-1">{stat.number}</div>
//                 <div className="text-sm opacity-90">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services with Before/After */}
//       <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Cleaning Services</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               See the amazing transformations we achieve with our professional cleaning services
//             </p>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
//                 {/* Before/After Image Comparison */}
//                 <div className="relative h-48 bg-gray-200">
//                   <div className="absolute inset-0 flex">
//                     <div className="w-1/2 relative overflow-hidden">
//                       <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
//                         Before
//                       </div>
//                       <div 
//                         className="h-full bg-cover bg-center bg-gray-300"
//                         style={{ 
//                           backgroundImage: `url(${service.beforeImage})`,
//                           backgroundColor: '#d1d5db'
//                         }}
//                       />
//                     </div>
//                     <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white z-10"></div>
//                     <div className="w-1/2 relative overflow-hidden">
//                       <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
//                         After
//                       </div>
//                       <div 
//                         className="h-full bg-cover bg-center bg-gray-300"
//                         style={{ 
//                           backgroundImage: `url(${service.afterImage})`,
//                           backgroundColor: '#d1d5db'
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-3">{service.icon}</span>
//                     <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">{service.description}</p>
//                   <div className="text-2xl font-bold text-orange-500 mb-4">{service.price}</div>
//                   <ul className="space-y-2 mb-6">
//                     {service.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-sm">
//                         <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                   <button 
//                     onClick={() => handleBookService(service.serviceType)}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors hover-scale font-semibold"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Gallery Showcase */}
//       <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Work in Action</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Take a look at some of our recent cleaning transformations across Sydney
//             </p>
//           </div>
          
//           <div className="gallery-grid">
//             {galleryImages.map((image, index) => (
//               <div key={index} className="gallery-item group hover-scale">
//                 <div 
//                   className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
//                   style={{ 
//                     backgroundImage: `url(${image.src})`,
//                     backgroundColor: '#e5e7eb'
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                   <div className="text-white">
//                     <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded mb-2">
//                       {image.category}
//                     </span>
//                     <p className="font-medium">{image.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Trust Indicators moved here */}
//           <div className="mt-16 text-center">
//             <div className="inline-flex flex-wrap items-center gap-6 bg-white rounded-full px-8 py-4 shadow-lg">
//               <div className="flex items-center text-sm">
//                 <Shield className="w-5 h-5 text-green-500 mr-2" />
//                 <span className="font-medium">Licensed & Insured</span>
//               </div>
//               <div className="flex items-center text-sm">
//                 <Clock className="w-5 h-5 text-blue-500 mr-2" />
//                 <span className="font-medium">24hr Response</span>
//               </div>
//               <div className="flex items-center text-sm">
//                 <ThumbsUp className="w-5 h-5 text-orange-500 mr-2" />
//                 <span className="font-medium">Satisfaction Guaranteed</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Simba Cleaning Services</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Your trusted cleaning partner in Sydney, bringing the strength and reliability of a lion to every job
//             </p>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div className="animate-slide-in-left">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
//               <p className="text-gray-600 mb-6">
//                 Founded in Sydney, Simba Cleaning Services has been providing exceptional cleaning solutions 
//                 to homes and businesses across the city. Just like our lion mascot, we approach every job 
//                 with strength, pride, and a commitment to excellence.
//               </p>
//               <p className="text-gray-600 mb-6">
//                 Our team of dedicated professionals takes pride in delivering thorough, reliable cleaning 
//                 services that exceed expectations. We use eco-friendly products and proven techniques to 
//                 ensure your space is not just clean, but truly spotless.
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-4 bg-blue-50 rounded-lg hover-lift">
//                   <div className="text-2xl font-bold text-blue-600">500+</div>
//                   <div className="text-sm text-gray-600">Happy Customers</div>
//                 </div>
//                 <div className="text-center p-4 bg-orange-50 rounded-lg hover-lift">
//                   <div className="text-2xl font-bold text-orange-600">5 Years</div>
//                   <div className="text-sm text-gray-600">Experience</div>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-4 animate-slide-in-right">
//               <div 
//                 className="h-64 bg-cover bg-center rounded-lg shadow-lg bg-gray-200 hover-scale"
//                 style={{ 
//                   backgroundImage: 'url(/images/about/team-photo.jpg)',
//                   backgroundColor: '#e5e7eb'
//                 }}
//               />
//               <div className="grid grid-cols-2 gap-4">
//                 <div 
//                   className="h-32 bg-cover bg-center rounded-lg shadow bg-gray-200 hover-scale"
//                   style={{ 
//                     backgroundImage: 'url(/images/about/office-photo.jpg)',
//                     backgroundColor: '#e5e7eb'
//                   }}
//                 />
//                 <div 
//                   className="h-32 bg-cover bg-center rounded-lg shadow bg-gray-200 hover-scale"
//                   style={{ 
//                     backgroundImage: 'url(/images/about/equipment-photo.jpg)',
//                     backgroundColor: '#e5e7eb'
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
//             <p className="text-gray-600">Don't just take our word for it - hear from our satisfied customers!</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white rounded-lg p-6 shadow-md hover-lift relative">
//                 <div className="absolute top-0 left-4 text-4xl text-gray-200 font-serif">"</div>
//                 <div className="flex items-center mb-4">
//                   <div 
//                     className="w-12 h-12 rounded-full bg-cover bg-center bg-gray-300 mr-4"
//                     style={{ 
//                       backgroundImage: `url(${testimonial.image})`,
//                       backgroundColor: '#d1d5db'
//                     }}
//                   />
//                   <div>
//                     <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                     <div className="text-sm text-gray-500">{testimonial.location}</div>
//                     <div className="text-xs text-blue-600">{testimonial.service}</div>
//                   </div>
//                 </div>
//                 <div className="flex mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 italic">"{testimonial.text}"</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Contact Section */}
//       <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
//         <div className="max-w-7xl mx-auto">
//           {isSubmitted ? (
//             // Success Message
//             <div className="max-w-2xl mx-auto text-center">
//               <div className="bg-white rounded-2xl shadow-xl p-8">
//                 <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <CheckCircle className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
//                 <p className="text-gray-600 text-lg mb-6">
//                   We've received your quote request and will get back to you within 24 hours with a personalized quote.
//                 </p>
//                 <div className="bg-blue-50 rounded-lg p-4 mb-6">
//                   <p className="text-blue-800 font-medium">
//                     📧 Check your email for a confirmation message
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <Phone className="w-4 h-4 mr-1" />
//                     <span>+61 400 123 456</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Mail className="w-4 h-4 mr-1" />
//                     <span>info@simbacleaning.com.au</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Contact Form
//             <>
//               <div className="text-center mb-12">
//                 <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get Your Free Quote Today!</h2>
//                 <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//                   Ready to experience the Simba difference? Fill out the form below and we'll get back to you within 24 hours with a personalized quote.
//                 </p>
//                 <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
//                     <span>Free Consultation</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
//                     <span>No Obligation</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
//                     <span>24hr Response</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                 {/* Simplified Contact Information */}
//                 <div className="space-y-8">
//                   <div className="bg-white rounded-2xl p-8 shadow-lg">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                    
//                     <div className="space-y-6">
//                       <a href="tel:+61400123456" className="flex items-center hover-lift p-4 rounded-xl bg-blue-50 transition-all duration-200 cursor-pointer group">
//                         <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
//                           <Phone className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="font-semibold text-gray-900">Call Us Now</div>
//                           <div className="text-blue-600 font-medium">+61 400 123 456</div>
//                           <div className="text-sm text-gray-500">Mon-Sat: 8AM-6PM</div>
//                         </div>
//                       </a>
                      
//                       <a href="mailto:info@simbacleaning.com.au" className="flex items-center hover-lift p-4 rounded-xl bg-orange-50 transition-all duration-200 cursor-pointer group">
//                         <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
//                           <Mail className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="font-semibold text-gray-900">Email Us</div>
//                           <div className="text-orange-600 font-medium">info@simbacleaning.com.au</div>
//                           <div className="text-sm text-gray-500">Quick response guaranteed</div>
//                         </div>
//                       </a>
                      
//                       <div className="flex items-center hover-lift p-4 rounded-xl bg-green-50 transition-all duration-200 cursor-pointer">
//                         <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
//                           <MapPin className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="font-semibold text-gray-900">Service Area</div>
//                           <div className="text-green-600 font-medium">Sydney & Surrounds</div>
//                           <div className="text-sm text-gray-500">30km radius from CBD</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Enhanced Contact Form */}
//                 <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
//                   {/* Decorative background */}
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>
                  
//                   <div className="relative z-10">
//                     <div className="text-center mb-8">
//                       <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Your Free Quote</h3>
//                       <p className="text-gray-600">Fill out the form below and get a personalized quote within 24 hours</p>
//                     </div>
                    
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                       {/* Name Field */}
//                       <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                           Your Name *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="text"
//                             value={formData.name}
//                             onChange={(e) => handleInputChange('name', e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                             placeholder="Enter your full name"
//                           />
//                         </div>
//                         {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//                       </div>

//                       {/* Email Field */}
//                       <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                           Email Address *
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="email"
//                             value={formData.email}
//                             onChange={(e) => handleInputChange('email', e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                             placeholder="your@email.com"
//                           />
//                         </div>
//                         {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//                       </div>

//                       {/* Phone Field */}
//                       <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                           Phone Number
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="tel"
//                             value={formData.phone}
//                             onChange={(e) => handleInputChange('phone', e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                             placeholder="+61 400 123 456"
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500">We'll call you to discuss your requirements</p>
//                       </div>

//                       {/* Service Type */}
//                       <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                           Service Required *
//                         </label>
//                         <div className="relative">
//                           <select
//                             value={formData.service}
//                             onChange={(e) => handleInputChange('service', e.target.value)}
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
//                           >
//                             <option value="">Choose the service you need</option>
//                             <option value="regular">🏠 Regular Cleaning (Weekly/Bi-weekly)</option>
//                             <option value="deep">✨ Deep Cleaning (One-time)</option>
//                             <option value="office">🏢 Office/Commercial Cleaning</option>
//                             <option value="move">📦 Move In/Out Cleaning</option>
//                             <option value="other">❓ Other (Please specify below)</option>
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                         </div>
//                         {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
//                       </div>

//                       {/* Property Size */}
//                       <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                           Property Size
//                         </label>
//                         <div className="grid grid-cols-2 gap-3">
//                           {['1-2 Bedrooms', '3-4 Bedrooms', '5+ Bedrooms', 'Office Space'].map((size) => (
//                             <label key={size} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                               formData.propertySize === size 
//                                 ? 'border-blue-500 bg-blue-50 text-blue-700' 
//                                 : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//                             }`}>
//                               <input 
//                                 type="radio" 
//                                 name="propertySize" 
//                                 value={size} 
//                                 checked={formData.propertySize === size}
//                                 onChange={(e) => handleInputChange('propertySize', e.target.value)}
//                                 className="sr-only" 
//                               />
//                               <div className="flex items-center justify-center w-full text-center">
//                                 <span className="text-sm font-medium">{size}</span>
//                               </div>
//                             </label>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Message Field */}
//                       <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                           Tell Us About Your Cleaning Needs
//                         </label>
//                         <textarea
//                           rows={4}
//                           value={formData.message}
//                           onChange={(e) => handleInputChange('message', e.target.value)}
//                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
//                           placeholder="Please describe any specific requirements, preferred timing, or areas that need special attention..."
//                         ></textarea>
//                         <p className="text-xs text-gray-500">The more details you provide, the more accurate your quote will be</p>
//                       </div>

//                       {/* Submit Button */}
//                       <div className="pt-4">
//                         <button
//                           type="submit"
//                           disabled={isSubmitting}
//                           className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-orange-600 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
//                         >
//                           {isSubmitting ? (
//                             <div className="flex items-center justify-center">
//                               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                               Sending Your Request...
//                             </div>
//                           ) : (
//                             'Get My Free Quote Now! 🚀'
//                           )}
//                         </button>
//                         <p className="text-center text-xs text-gray-500 mt-3">
//                           By submitting this form, you agree to receive communications from Simba Cleaning Services. 
//                           We respect your privacy and will never share your information.
//                         </p>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <img 
//                 src="/images/simba-logo.png" 
//                 alt="Simba Cleaning Logo" 
//                 className="h-8 w-auto"
//                 onError={(e) => e.target.style.display = 'none'}
//               />
//               <h3 className="text-2xl font-bold">Simba Cleaning Services</h3>
//             </div>
//             <p className="text-gray-400 mb-6">Professional cleaning services you can trust</p>
//             <div className="flex justify-center space-x-8 text-sm mb-6">
//               <div className="flex items-center">
//                 <Phone className="w-4 h-4 mr-2" />
//                 <span>+61 400 123 456</span>
//               </div>
//               <div className="flex items-center">
//                 <Mail className="w-4 h-4 mr-2" />
//                 <span>info@simbacleaning.com.au</span>
//               </div>
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

// pages/index.js - Complete file with all sections and enhanced validation
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Phone, Mail, MapPin, Star, Clock, Shield, Users, CheckCircle, 
  ChevronLeft, ChevronRight, Play, Award, ThumbsUp, User, ChevronDown 
} from 'lucide-react'

export default function Home() {
  Home.useLayout = false
  
  // Hero slider state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    propertySize: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Admin check
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminToken = localStorage.getItem('adminToken')
      setIsAdmin(!!adminToken)
    }
    
    checkAdminStatus()
  }, [])

  // Data arrays
  const services = [
    {
      name: 'Regular Cleaning',
      description: 'Weekly or bi-weekly cleaning to keep your home spotless',
      price: 'From $80',
      features: ['Dusting & Vacuuming', 'Kitchen & Bathroom Deep Clean', 'Mopping & Sanitizing', 'Trash Removal'],
      beforeImage: '/images/services/regular-before.jpg',
      afterImage: '/images/services/regular-after.jpg',
      icon: '🏠',
      serviceType: 'regular'
    },
    {
      name: 'Deep Cleaning',
      description: 'Thorough cleaning for move-ins, move-outs, or seasonal refresh',
      price: 'From $200',
      features: ['Inside Appliances', 'Baseboards & Light Fixtures', 'Cabinet Interiors', 'Window Cleaning'],
      beforeImage: '/images/services/deep-before.jpg',
      afterImage: '/images/services/deep-after.jpg',
      icon: '✨',
      serviceType: 'deep'
    },
    {
      name: 'Office Cleaning',
      description: 'Professional cleaning services for your workplace',
      price: 'From $150',
      features: ['Desk Sanitization', 'Floor Deep Clean', 'Restroom Maintenance', 'Common Area Cleaning'],
      beforeImage: '/images/services/office-before.jpg',
      afterImage: '/images/services/office-after.jpg',
      icon: '🏢',
      serviceType: 'office'
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

  // Enhanced form validation function
  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation (Australian format)
    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '')
      const australianMobileRegex = /^(\+?61|0)?4\d{8}$/
      const australianLandlineRegex = /^(\+?61|0)?[23578]\d{8}$/
      
      if (!australianMobileRegex.test(cleanPhone) && !australianLandlineRegex.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid Australian phone number (e.g., 0400 123 456)'
      }
    }
    
    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    // Message validation
    if (formData.message.trim() && formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (at least 10 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Real-time validation for individual fields
  const validateField = (field, value) => {
    const fieldErrors = { ...errors }
    
    switch (field) {
      case 'name':
        delete fieldErrors.name
        if (value.trim() && value.trim().length < 2) {
          fieldErrors.name = 'Name must be at least 2 characters'
        } else if (value.trim() && !/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          fieldErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes'
        }
        break
        
      case 'email':
        delete fieldErrors.email
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          fieldErrors.email = 'Please enter a valid email address'
        }
        break
        
      case 'phone':
        delete fieldErrors.phone
        if (value.trim()) {
          const cleanPhone = value.replace(/[\s\-\(\)]/g, '')
          const australianMobileRegex = /^(\+?61|0)?4\d{8}$/
          const australianLandlineRegex = /^(\+?61|0)?[23578]\d{8}$/
          
          if (!australianMobileRegex.test(cleanPhone) && !australianLandlineRegex.test(cleanPhone)) {
            fieldErrors.phone = 'Please enter a valid Australian phone number'
          }
        }
        break
        
      case 'message':
        delete fieldErrors.message
        if (value.trim() && value.trim().length < 10) {
          fieldErrors.message = 'Please provide more details (at least 10 characters)'
        }
        break
        
      default:
        delete fieldErrors[field]
    }
    
    setErrors(fieldErrors)
  }

  // Form input change handler with real-time validation
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    validateField(field, value)
  }

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/[^\d+]/g, '')
    
    if (cleaned.startsWith('+61')) {
      const rest = cleaned.substring(3)
      if (rest.length <= 1) return '+61 '
      if (rest.length <= 4) return `+61 ${rest}`
      if (rest.length <= 7) return `+61 ${rest.substring(0, 1)} ${rest.substring(1, 4)} ${rest.substring(4)}`
      return `+61 ${rest.substring(0, 1)} ${rest.substring(1, 4)} ${rest.substring(4, 7)} ${rest.substring(7, 10)}`
    }
    
    if (cleaned.startsWith('0')) {
      if (cleaned.length <= 4) return cleaned
      if (cleaned.length <= 7) return `${cleaned.substring(0, 4)} ${cleaned.substring(4)}`
      return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7, 10)}`
    }
    
    return value
  }

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    handleInputChange('phone', formatted)
  }

  // Enhanced form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        errorElement.focus()
      }
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          status: 'new'
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      const result = await response.json()
      console.log('Form submitted successfully:', result)
      
      setIsSubmitted(true)
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          propertySize: '',
          message: ''
        })
        setErrors({})
        setIsSubmitted(false)
      }, 4000)
      
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: 'Something went wrong. Please try again or call us directly.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Service booking handler
  const handleBookService = (serviceType) => {
    setFormData(prev => ({
      ...prev,
      service: serviceType
    }))
    
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity logo-hover">
              <img 
                src="/images/simba-logo.png" 
                alt="Simba Cleaning Logo" 
                className="h-12 w-auto"
                onError={(e) => {
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
              <a href="#services" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</a>
              <a href="#gallery" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Gallery</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a>
              {isAdmin && (
                <Link href="/auth/signin" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  Staff Login
                </Link>
              )}
            </nav>

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
                backgroundColor: '#e5e7eb'
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors hover-lift">
                    {slide.cta}
                  </a>
                  <a href="tel:+61400123456" className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Call Now: (04) 0012 3456
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

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

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-6 right-6 bg-black bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
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

      {/* Services with Before/After */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Cleaning Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the amazing transformations we achieve with our professional cleaning services
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative overflow-hidden">
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
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
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white z-10"></div>
                    <div className="w-1/2 relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
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
                  <button 
                    onClick={() => handleBookService(service.serviceType)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors hover-scale font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Work in Action</h2>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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

          {/* Trust Indicators moved here */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap items-center gap-6 bg-white rounded-full px-8 py-4 shadow-lg">
              <div className="flex items-center text-sm">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-medium">24hr Response</span>
              </div>
              <div className="flex items-center text-sm">
                <ThumbsUp className="w-5 h-5 text-orange-500 mr-2" />
                <span className="font-medium">Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Simba Cleaning Services</h2>
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
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Don't just take our word for it - hear from our satisfied customers!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover-lift relative">
                <div className="absolute top-0 left-4 text-4xl text-gray-200 font-serif">"</div>
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

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          {isSubmitted ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
                <p className="text-gray-600 text-lg mb-6">
                  We've received your quote request and will get back to you within 24 hours with a personalized quote.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 font-medium">
                    📧 Check your email for a confirmation message
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>+61 400 123 456</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>info@simbacleaning.com.au</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get Your Free Quote Today!</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Ready to experience the Simba difference? Fill out the form below and we'll get back to you within 24 hours with a personalized quote.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span>No Obligation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span>24hr Response</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                    
                    <div className="space-y-6">
                      <a href="tel:+61400123456" className="flex items-center hover-lift p-4 rounded-xl bg-blue-50 transition-all duration-200 cursor-pointer group">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900">Call Us Now</div>
                          <div className="text-blue-600 font-medium">+61 400 123 456</div>
                          <div className="text-sm text-gray-500">Mon-Sat: 8AM-6PM</div>
                        </div>
                      </a>
                      
                      <a href="mailto:info@simbacleaning.com.au" className="flex items-center hover-lift p-4 rounded-xl bg-orange-50 transition-all duration-200 cursor-pointer group">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900">Email Us</div>
                          <div className="text-orange-600 font-medium">info@simbacleaning.com.au</div>
                          <div className="text-sm text-gray-500">Quick response guaranteed</div>
                        </div>
                      </a>
                      
                      <div className="flex items-center hover-lift p-4 rounded-xl bg-green-50 transition-all duration-200 cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900">Service Area</div>
                          <div className="text-green-600 font-medium">Sydney & Surrounds</div>
                          <div className="text-sm text-gray-500">30km radius from CBD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Your Free Quote</h3>
                      <p className="text-gray-600">Fill out the form below and get a personalized quote within 24 hours</p>
                    </div>
                    
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                      {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-600 text-sm">{errors.submit}</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Your Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white ${
                              errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                            }`}
                            placeholder="Enter your full name"
                            aria-invalid={errors.name ? 'true' : 'false'}
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white ${
                              errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                            }`}
                            placeholder="your@email.com"
                            aria-invalid={errors.email ? 'true' : 'false'}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white ${
                              errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                            }`}
                            placeholder="0400 123 456"
                            aria-invalid={errors.phone ? 'true' : 'false'}
                          />
                        </div>
                        {errors.phone ? (
                          <p className="text-red-500 text-xs">{errors.phone}</p>
                        ) : (
                          <p className="text-xs text-gray-500">We'll call you to discuss your requirements</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Service Required *
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={(e) => handleInputChange('service', e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none ${
                              errors.service ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                            }`}
                            aria-invalid={errors.service ? 'true' : 'false'}
                          >
                            <option value="">Choose the service you need</option>
                            <option value="regular">🏠 Regular Cleaning (Weekly/Bi-weekly)</option>
                            <option value="deep">✨ Deep Cleaning (One-time)</option>
                            <option value="office">🏢 Office/Commercial Cleaning</option>
                            <option value="move">📦 Move In/Out Cleaning</option>
                            <option value="other">❓ Other (Please specify below)</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Property Size
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {['1-2 Bedrooms', '3-4 Bedrooms', '5+ Bedrooms', 'Office Space'].map((size) => (
                            <label key={size} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              formData.propertySize === size 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}>
                              <input 
                                type="radio" 
                                name="propertySize" 
                                value={size} 
                                checked={formData.propertySize === size}
                                onChange={(e) => handleInputChange('propertySize', e.target.value)}
                                className="sr-only" 
                              />
                              <div className="flex items-center justify-center w-full text-center">
                                <span className="text-sm font-medium">{size}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Tell Us About Your Cleaning Needs
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white resize-none ${
                            errors.message ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Please describe any specific requirements, preferred timing, or areas that need special attention..."
                          aria-invalid={errors.message ? 'true' : 'false'}
                        ></textarea>
                        {errors.message ? (
                          <p className="text-red-500 text-xs">{errors.message}</p>
                        ) : (
                          <p className="text-xs text-gray-500">The more details you provide, the more accurate your quote will be</p>
                        )}
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-orange-600 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                              Sending Your Request...
                            </div>
                          ) : (
                            'Get My Free Quote Now! 🚀'
                          )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3">
                          By submitting this form, you agree to receive communications from Simba Cleaning Services. 
                          We respect your privacy and will never share your information.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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