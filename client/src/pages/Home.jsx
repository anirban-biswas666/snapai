import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Aitools from '../Components/Aitools'
import Testimonial from '../Components/Testimonial'
import Plan from '../Components/Plan'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero />
      <Aitools/>
      <Testimonial/>
      <Plan/>
      <Footer/>
    </>
  )
}

export default Home
