import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div className='layout'>
      <Head>
        <title>Store and Shop 🏪</title>
    <meta name="google-site-verification" content="nxLmRlojdzeFtpwkAVLByCOZz9P7ocnBFB2wBzIYz3U" />
      </Head>

      <header>
        <Navbar/>
      </header>

      <main className="main-container">
        {children}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
