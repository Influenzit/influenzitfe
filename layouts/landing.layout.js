import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Loader from '../components/loading'
import { Container } from '../styles/landing.style'
import DashboardFooter from '../components/dashboard-footer'
import { useSelector } from 'react-redux'
import { getUser } from '../app/reducers/user'
import { useRouter } from 'next/router'
import { getMessage, isError, isLoading, isSuccess } from '../app/reducers/status'
import ErrorPopup from '../components/error-popup'
import SuccessPopup from '../components/success-popup'
import { hasAValidAccount } from '../helpers/helper'

const LandingLayout = ({children, title, description}) => {
  const user = useSelector(getUser);
  const loadingStatus = useSelector(isLoading);
  const errorStatus = useSelector(isError);
  const successStatus = useSelector(isSuccess);
  const message = useSelector(getMessage);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  useEffect(() => {
    const authRoutes = ["/login", "/register", "/reset-password"];
    setIsLoggedIn(!!user);
    if (!!user && !hasAValidAccount(user)) {
        if((router.pathname !== "/dashboard/account-type") && router.pathname.includes("dashboard") && !router.pathname.includes("create/")) {
            router.push("/dashboard/account-type")
        }
    }
    if (!!user && authRoutes.includes(router.pathname)) {
        router.push("/dashboard/projects")
    }
    if (!user && router.pathname.includes("/dashboard")) {
        router.push("/login")
    }
  }, [user, router.pathname])
  return (
    <Container>
       <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
        {loadingStatus && <Loader />}
        {errorStatus && <ErrorPopup message={message} />}
        {successStatus && <SuccessPopup message={message} />}
        <main>{children}</main>
      {isLoggedIn && router.pathname.includes("/dashboard")? (<DashboardFooter />) : (<Footer />)}
    </Container>
  )
}

export default LandingLayout