import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/admin-nav'
import Footer from '../components/footer'
import Loader from '../components/loading'
import { Container, Content, Wrapper } from '../styles/landing.style'
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
import Sidebar from 'components/admin-sidebar'

const AdminLayout = ({ children, title, description }) => {
  const user = useSelector(getUser);
  const loadingStatus = useSelector(isLoading);
  const errorStatus = useSelector(isError);
  const successStatus = useSelector(isSuccess);
  const message = useSelector(getMessage);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data, refetch } = useQuery(["get-user"], async () => {
    return await getUserAccount(localStorage.getItem("admin-user-id"));
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
      if (router.pathname.includes("/admin/u/dashboard")) {
        router.push("/admin/u/login");
        localStorage.clear();
        dispatch(updateUser(null));
      }
    }
  });

  useEffect(() => {
    const authRoutes = ["/admin/u/login"];
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsLoggedIn(!!user && user.is_admin);
      if (!!user && authRoutes.includes(router.pathname) && user.is_admin) {
        router.push("/admin/u/dashboard")
      }
      if(!user?.is_admin && !token){
        localStorage.clear();
        router.replace("/admin/u/login")
      }
    } 
  }, [user, router.pathname])
  useEffect(() => {
    refetch();
  }, [])
  
  if (isLoggedIn || !router.pathname.includes("/admin/u/dashboard")) {
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
        <Wrapper>
            {router.pathname.includes("/dashboard") && <Sidebar />}
            <Content isPadded={router.pathname.includes("/dashboard")}>
              {children}
            </Content>
          </Wrapper>
      </Container>
    )
  } else {
    return null;
  }
}

export default AdminLayout