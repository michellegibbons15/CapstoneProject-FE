import React from 'react'
import Header from '../Components/Header'
import Slideshow from '../Components/Landing/Slideshow'
import Homepage from '../Components/Landing/Homepage'
import Footer from '../Components/Landing/Footer'
import ReviewList from '../Components/Landing/ReviewList'

const Landing = () => {
  return (
    <div className="landing">
      <Header/>
      <main>
        <Slideshow/>
        <Homepage />
        <ReviewList/>
      </main>
      <Footer />
    </div>
  )
}

export default Landing
