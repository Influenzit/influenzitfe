import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { Container } from '../styles/landing.style'
import DashboardFooter from '../components/dashboard-footer'
const LandingLayout = ({children, title, description}) => {
  const isLoggedIn = true;
  return (
    <Container>
       <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
        <main>{children}</main>
      {isLoggedIn ? (<DashboardFooter />) : (<Footer />)}
    </Container>
  )
}

export default LandingLayout