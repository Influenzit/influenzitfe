import React from 'react'
import LandingLayout from '../layouts/Landing.layout'
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