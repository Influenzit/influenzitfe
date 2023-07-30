import React from 'react'
import LandingLayout from '../layouts/landing.layout'
import { Container } from '../styles/404.style'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <Container>
        <h1>Server Error</h1>
        <p>Sorry, something seems to be broken</p>
        <div>
          <Link href="/">Go back home</Link>
        </div>
    </Container>
  )
}
NotFound.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default NotFound;
