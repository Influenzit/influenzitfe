import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Loader from '../components/loading'
import { Container } from '../styles/landing.style'
import DashboardFooter from '../components/dashboard-footer'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../app/reducers/user'
import { useRouter } from 'next/router'
import { getMessage, isError, isLoading, isSuccess, setLoading, setUserType } from '../app/reducers/status'
import ErrorPopup from '../components/error-popup'
import SuccessPopup from '../components/success-popup'
import { hasAValidAccount } from '../helpers/helper'
import { useQuery } from '@tanstack/react-query'
import { getUserAccount } from '../api/auth'

const LandingLayout = ({children, title, description}) => {
  const user = useSelector(getUser);
  const loadingStatus = useSelector(isLoading);
  const errorStatus = useSelector(isError);
  const successStatus = useSelector(isSuccess);
  const message = useSelector(getMessage);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { data, refetch } = useQuery(["get-user"], async () => {
    return await getUserAccount(localStorage.getItem("user-id"));
}, {
    staleTime: false,
    enabled: false,
    retry: false,
    onSuccess(res) {
        dispatch(setLoading(false));
        dispatch(updateUser(res.data.data));
    },
    onError(res) {
        dispatch(setLoading(false));
        if (router.pathname.includes("/dashboard")) {
          router.push("/login")
        }
    } 
});
  
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setUserType(localStorage.getItem("user-type")));
    refetch();
  }, [])
  
  useEffect(() => {
    const authRoutes = ["/login", "/register", "/reset-password"];
    const token = localStorage.getItem("token");
    if(user && token) {
      setIsLoggedIn(!!user);
      if (!!user && !hasAValidAccount(user)) {
          if((router.pathname !== "/dashboard/account-type") && router.pathname.includes("/dashboard") && !router.pathname.includes("create/")) {
              router.push("/dashboard/account-type")
          }
      } else if (router.pathname.includes("/dashboard/account-type")) {
        router.push("/dashboard")
      }
      if (!!user && authRoutes.includes(router.pathname)) {
          router.push("/dashboard")
      }
    } else {
     
    }
  }, [user, router.pathname])
  return (
    <Container>
       <Head>
        <title>{title ? title : "Influenzit"}</title>
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