import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Loader from '../components/loading'
import { Container, Content, NetworkModal, Wrapper } from '../styles/landing.style'
import DashboardFooter from '../components/dashboard-footer'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getUser, updateUser } from '../app/reducers/user'
import { useRouter } from 'next/router'
import { getLogoutModalStatus, getMessage, getUserType, getVerifyStatus, isError, isLoading, isSuccess, setLoading, setLogoutModal, setUserType, updateVerifyStatus } from '../app/reducers/status'
import ErrorPopup from '../components/error-popup'
import SuccessPopup from '../components/success-popup'
import { hasAValidAccount } from '../helpers/helper'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserAccount, logoutUser } from '../api/auth'
import AdminNav from '../components/admin-nav'
import Sidebar from '../components/sidebar'
import { toast } from 'react-toastify'
import LogoutModal from '../components/logout-modal'
import VerifyEmail from '../components/verify-email'
import { clearBusiness } from 'app/reducers/business'
import { getUserStatus } from 'api/campaigns'

const LandingLayout = ({children, title, description}) => {
  const user = useSelector(getUser);
  const loadingStatus = useSelector(isLoading);
  const errorStatus = useSelector(isError);
  const successStatus = useSelector(isSuccess);
  const verifyStatus = useSelector(getVerifyStatus);
  const currentAcctType = useSelector(getUserType);
  const showLogoutModal = useSelector(getLogoutModalStatus);
  const [showNetworkStatusModal, setShowNetworkStatusModal] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [networkMessage, setNetworkMessage] = useState("");
  const message = useSelector(getMessage);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  
  const { data, refetch } = useQuery(["get-user"], async () => {
      return await getUserAccount();
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
          if(localStorage.getItem("token")) {
            localStorage.clear();
            dispatch(clearUser());
            dispatch(clearBusiness());
            if(router.pathname.includes("/dashboard")) {
              router.replace("/login");
            }
          } else {
            localStorage.clear();
            if(router.pathname.includes("/dashboard")) {
              router.replace("/login");
            }
          }
      } 
  });
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  const offlineFunc = () => {
    setShowNetworkStatusModal(true);
    setNetworkMessage("You are offline");
    setIsOnline(false);
    setTimeout(() => {
      setShowNetworkStatusModal(false);
    }, 10000);
  }
  const onlineFunc = () => {
    setShowNetworkStatusModal(true);
    setNetworkMessage("You are back online");
    setIsOnline(true);
    setTimeout(() => {
      setShowNetworkStatusModal(false);
    }, 10000);
  }
  const updateActivity = () => {
    localStorage.setItem("last-activity", `${Date.now()}`);
  }
  const checkActivity = () => {
    if(localStorage.getItem("last-activity")) {
      const lastTime = Number(localStorage.getItem("last-activity") ?? "0");
      const allowedTime = Number(process.env.NEXT_PUBLIC_ALLOWED_INACTIVITY_TIME ?? "5000");
      if((Date.now() - lastTime) > allowedTime) {
       if(localStorage.getItem("token") && user) {
        dispatch(setLogoutModal(true));
       }
      }
    } else {
      localStorage.setItem("last-activity", `${Date.now()}`);
    }
  }
  let evInterval;
  useEffect(() => {
    dispatch(setUserType(localStorage.getItem("user-type")));
    refetch();
    addEventListener("offline", offlineFunc);
    addEventListener("online", onlineFunc);
    // Checking for mouseup, keydown, scroll and mousemove to update the last time the user interacted with the website
    addEventListener("mouseup", updateActivity);
    addEventListener("scroll", updateActivity);
    addEventListener("keydown", updateActivity);
    addEventListener("mousemove", updateActivity);
    evInterval = setInterval(checkActivity, 2000);
    return () => {
      removeEventListener("offline", offlineFunc);
      removeEventListener("online", onlineFunc);
      removeEventListener("mouseup", updateActivity);
      removeEventListener("scroll", updateActivity);
      removeEventListener("keydown", updateActivity);
      removeEventListener("mousemove", updateActivity);
      clearInterval(evInterval);
    }
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
          if(router.pathname.includes("/dashboard") && user.is_admin) {
            router.push("/admin/u/dashboard")
        }
      } else if (router.pathname.includes("/dashboard/account-type")) {
        router.push("/dashboard")
      }
      if (!!user && authRoutes.includes(router.pathname)) {
          router.push("/dashboard")
      }
      getUserStatus().then((statusRes) => {
        dispatch(updateVerifyStatus({
            campaignCount: statusRes.data.data.campaignRequestCounts,
            emailVerified: statusRes.data.data.email_is_verified,
        }))
       });
    }
    if(authRoutes.includes(router.pathname) && token) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [user, router.pathname])
  if ((isLoggedIn || !router.pathname.includes("/dashboard")) && show) {
    return (
      <Container>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K5F8M5ZL"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          </noscript>
         <Head>
          <script>
            {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K5F8M5ZL')
            }
          </script>
          <title>{title ? title : "INFLUENZIT  - The Number One Influencer Marketing Platform In Nigeria."}</title>
          <meta name="description" content={description} />
          <meta name="facebook-domain-verification" content="yaoox27tyrn1d5eslbbvp1d9w4lwnj" />
          <meta name="keyword" content="Influencer marketing company in Nigeria, The best influencer marketing platform in Nigeria, Influencer marketing company 2023, 
          The best influencer marketing platform 2023, Influencer marketing pricing in Nigeria, How to find influencers to grow my business, How to find influencers 
          to promote products in Nigeria, Influencer marketing strategy 2023, Influencer marketing strategy, Influencer marketing cost 2023, Influencer marketing cost 
          in Nigeria, Influencer marketing agency in Nigeria, Influencer marketing agency 2023, Influencer marketing platform in Nigeria, Nigeria influencer marketing platform, 
          Nigeria influencer marketing agency, Nigeria macro influencers 2023, Nigeria macro influencers, Macro influencers in Nigeria, Online marketing influencers in Nigeria, Influencer marketplace in Nigeria, The best influencer marketing 
          agency in Nigeria, The best influencer marketing agency, Influencer campaign 2023, Influencer campaign in Nigeria, 
          Influencer marketing companies in Nigeria, Influencer marketing companies 2023, Influencers marketing services in Nigeria, Influencers marketing services, Influenzit 
          influencers, Influenzit marketing platform, Influenzit pricing, Influencers marketing platform for business owners in Nigeria, Influencers marketing website in Nigeria, 
          Influencer marketing website 2023, Using Nigerian influencers for marketing, Paid influencer marketing, Influencers promoting business in Nigeria, Best influencer marketing 
          platform for small businesses in Nigeria, Influencers to promote your business in Nigeria, Find influencers to promote your business, Platform to connect influencers with brands in Nigeria, 
          Influenzit, what is influenzit, influenzit sign-up page, influenzit login page, who created influenzit" />
          <link rel="icon" href="/favicon.ico" />
          <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
          {/* <meta http-equiv="Content-Security-Policy" content="image-src phplaravel-870335-3074787.cloudwaysapps.com api.influenzit.com ui-avatars.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com connect.facebook.net accounts.google.com js.paystack.co; font-src 'self' fonts.googleapis.com fonts.gstatic.com;" /> */}
          <meta http-equiv="X-Content-Type-Options" content="nosniff" />
          <meta http-equiv="Permissions-Policy" content="camera=(); battery=(self); geolocation=(); microphone=(self)" />
          <meta http-equiv="Referrer-Policy" content="origin-when-cross-origin" />
        </Head>
          {(!!user && user?.is_admin) ? (
            <AdminNav />
          ): (
            <Nav />
          )}
          {loadingStatus && <Loader />}
          {errorStatus && <ErrorPopup message={message} />}
          {successStatus && <SuccessPopup message={message} />}
          {showLogoutModal && <LogoutModal />}
          <Wrapper>
            {router.pathname.includes("/dashboard") && <Sidebar />}
            <Content isPadded={router.pathname.includes("/dashboard")}>
              {!router.pathname.includes("/dashboard") ? children : (verifyStatus?.emailVerified || router.pathname.includes("/dashboard/create-request") || router.pathname.includes("/dashboard/campaigns/request-preview/")) ? children : <VerifyEmail />}
              {isLoggedIn && router.pathname.includes("/dashboard")? null : (<Footer />)}
            </Content>
          </Wrapper>
          {
            showNetworkStatusModal ? <NetworkModal status={isOnline}><span>{networkMessage}</span></NetworkModal> : null
          }
      </Container>
    )
  } else {
    return null
  }
 
}

export default LandingLayout
