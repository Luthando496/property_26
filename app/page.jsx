import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import InfoBoxes from '@/components/InfoBoxes'
import Link from 'next/link'
import React from 'react'



const page = () => {

  console.log(process.env.MONGODB_URI)
  return (
    <>
        <Hero />
        <InfoBoxes />
        <HomeProperties />
    </>
  )
}

export default page
