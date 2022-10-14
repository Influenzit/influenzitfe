import React from 'react'
import LandingLayout from '../layouts/landing.layout'
import { HeroSectionOne } from '../styles/pricing.style'

const Webinar = () => {
  return (
    <div>
        <HeroSectionOne>
            <h1>Webinar</h1>
        </HeroSectionOne>
    </div>
  )
}
Webinar.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Webinar