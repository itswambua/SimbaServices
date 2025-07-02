

// import { SessionProvider } from 'next-auth/react'
// import { useRouter } from 'next/router'
// import Layout from '/components/layout/Layout'
// import '../styles/globals.css'

// export default function App({ 
//   Component, 
//   pageProps: { session, ...pageProps } 
// }) {
//   const router = useRouter()
  
//   // Don't use layout for public pages and auth pages
//   const publicPages = ['/', '/auth/signin', '/auth/error']
//   const useLayout = !publicPages.includes(router.pathname)

//   return (
//     <SessionProvider session={session}>
//       {useLayout ? (
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </SessionProvider>
//   )
// }

import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Head from 'next/head'
// Comment out the globals.css import temporarily
// import '../styles/globals.css'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const router = useRouter()
  
  // Don't use layout for public pages and auth pages
  const publicPages = ['/', '/auth/signin', '/auth/error']
  const useLayout = !publicPages.includes(router.pathname)

  return (
    <>
      <Head>
        {/* Tailwind CSS CDN - This will work immediately */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'simba-blue': '#4F46E5',
                    'simba-orange': '#F97316',
                    'simba-brown': '#D97706',
                  }
                }
              }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            .text-gradient {
              background: linear-gradient(135deg, #4F46E5, #F97316);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .hover-lift {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hover-lift:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
            
            .hover-scale:hover {
              transform: scale(1.05);
            }
            
            .logo-hover {
              transition: transform 0.3s ease, filter 0.3s ease;
            }
            
            .logo-hover:hover {
              transform: scale(1.05);
              filter: brightness(1.1);
            }
            
            .hero-slider {
              position: relative;
              height: 100vh;
              overflow: hidden;
            }
            
            .hero-slide {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              transition: opacity 1s ease-in-out;
            }
            
            .hero-slide.active {
              opacity: 1;
            }
            
            .slide-bg {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .container-custom {
              max-width: 1280px;
              margin-left: auto;
              margin-right: auto;
            }
            
            .section-padding {
              padding-top: 4rem;
              padding-bottom: 4rem;
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            @media (min-width: 640px) {
              .section-padding {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
              }
            }
            
            @media (min-width: 1024px) {
              .section-padding {
                padding-left: 2rem;
                padding-right: 2rem;
              }
            }
            
            .text-responsive-xl {
              font-size: 2.25rem;
              line-height: 2.5rem;
              font-weight: 700;
            }
            
            @media (min-width: 640px) {
              .text-responsive-xl {
                font-size: 3rem;
                line-height: 1;
              }
            }
            
            @media (min-width: 1024px) {
              .text-responsive-xl {
                font-size: 3.75rem;
                line-height: 1;
              }
            }
            
            .text-responsive-lg {
              font-size: 1.5rem;
              line-height: 2rem;
              font-weight: 700;
            }
            
            @media (min-width: 640px) {
              .text-responsive-lg {
                font-size: 1.875rem;
                line-height: 2.25rem;
              }
            }
            
            @media (min-width: 1024px) {
              .text-responsive-lg {
                font-size: 2.25rem;
                line-height: 2.5rem;
              }
            }
            
            .before-after-divider {
              position: absolute;
              top: 0;
              left: 50%;
              width: 2px;
              height: 100%;
              background: white;
              z-index: 10;
            }
            
            .before-after-label {
              position: absolute;
              top: 8px;
              z-index: 20;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
            }
            
            .before-label {
              left: 8px;
              background: #EF4444;
              color: white;
            }
            
            .after-label {
              right: 8px;
              background: #10B981;
              color: white;
            }
            
            .gallery-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 1.5rem;
            }
            
            .gallery-item {
              position: relative;
              overflow: hidden;
              border-radius: 0.5rem;
              aspect-ratio: 1;
              background: #f3f4f6;
            }
            
            .gallery-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
              opacity: 0;
              transition: opacity 0.3s ease;
              display: flex;
              align-items: flex-end;
              padding: 1rem;
            }
            
            .gallery-item:hover .gallery-overlay {
              opacity: 1;
            }
            
            .text-shadow {
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .text-shadow-lg {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            
            .glass-dark {
              background: rgba(0, 0, 0, 0.15);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-fade-in {
              animation: fadeIn 0.8s ease-out;
            }
          `
        }} />
      </Head>
      <SessionProvider session={session}>
        {useLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  )
}