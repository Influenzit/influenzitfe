import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { Container } from '../styles/landing.style'
const LandingLayout = ({children, title, description}) => {
  return (
    <Container>
       <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
        <main>{children}</main>
      <Footer />
    </Container>
  )
}

export default LandingLayout