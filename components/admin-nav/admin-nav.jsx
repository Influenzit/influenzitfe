import React, { useEffect, useState, useRef } from 'react'
import { ConnectDropdown, ConnectDropdownCont, Container, Controls, ControlsA, GetStartedBtn, LoginBtn, Logo, NavLinks, ProfilePicWrapper, ResponsiveNav, Right, SearchBtn, SearchBtnC, SearchBtnResponsive, SearchByBtn, SearchByOption, SearchContainer, SidebarBtn, UserBtn, UserDropdown, Wrapper } from './style'

import Image from 'next/image'
import Link from 'next/link'
import { BagIcon, BellIcon, BoxIcon, CollaborationIcon, HamburgerIcon, HashTagIcon, LogoutIcon, MailIcon, SettingsIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { useRouter } from 'next/router'
import { connect, useDispatch, useSelector } from 'react-redux'
import { clearUser, getUser, updateUser } from '../../app/reducers/user'
import { clearBusiness } from '../../app/reducers/business'
import { getUserType, setError, setLoading, setUserType } from '../../app/reducers/status'
import { useMutation } from '@tanstack/react-query'
import { accountTypeUpdate, getUserAccount } from '../../api/auth'
import switchIcon from "../../assets/switch.svg"

const Nav = () => {
  const user = useSelector(getUser);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [searchBy, setSearchBy] = useState("influencers");
  const currentAcctType = useSelector(getUserType);
  const switchRef = useRef(null);
  const connectRef = useRef(null);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarBtn = useRef(null);
  const dispatch = useDispatch();
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const [showSearchRes, setShowSearchRes] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const handleSearchOption = (val) => {
    setSearchBy(val)
    setShowSearchOption(false)
  }
  const toggleSwitchAccount = () => {
    setShowSwitchAccount(!showSwitchAccount);
    setShowConnect(false);
    setShowDropdown(false);
    setShowSearchRes(false);
    setShowSidebar(false);
  }
  
  const handleProfileOpen = () => {
    setShowConnect(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    setShowSidebar(false);
    setShowDropdown(!showDropdown);
  }
  const handleConnectOpen = () => {
    setShowConnect(!showConnect);
    setShowDropdown(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    setShowSidebar(false);
  }
  const handleShowSidebar = () => {
    setShowConnect(false);
    setShowDropdown(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    setShowSidebar(!showSidebar);
  }
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    dispatch(clearUser());
    dispatch(clearBusiness());
    router.replace("/admin/u/login");
  }
  useEffect(() => {
    setIsLoggedIn(!!user);
    if(user) {
        setUserDetails(user);
    }
  }, [user, router.pathname]);
  const handleClosing = (e) => {
        if(connectRef.current && !connectRef.current.innerHTML.includes(e.target.innerHTML)) {
            setShowConnect(false);
        }
        if(profileRef.current && !profileRef.current.innerHTML.includes(e.target.innerHTML)) {
            setShowDropdown(false);
        }
        if(switchRef.current && !switchRef.current.innerHTML.includes(e.target.innerHTML)) {
            setShowSwitchAccount(false);
        }
        if(sidebarRef.current && sidebarBtn.current && !sidebarRef.current.innerHTML.includes(e.target.innerHTML) && !sidebarBtn.current.innerHTML.includes(e.target.innerHTML)) {
            setShowSidebar(false);
        }
    }
  useEffect(() => {
    addEventListener("click", handleClosing);
    return () => {
      removeEventListener("click", handleClosing);
    }
  }, [])
  
  return (
    <Container>
        <Wrapper>
            <Logo href="/">
                <Image src="/influenzit.svg" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            </Logo>
            {
                isLoggedIn ? (
                    <Right>
                        <UserBtn onClick={() => handleProfileOpen()} ref={profileRef}>
                            <ProfilePicWrapper>
                                <Image src={user?.account?.media?.[0]?.url ? user?.account?.media?.[0]?.url : `https://ui-avatars.com/api/?name=${userDetails?.firstname}+${userDetails?.lastname}&color=FFFFFF&background=12544D`} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                            {
                                showDropdown && <UserDropdown>
                                    <button onClick={() => router.push("/admin/u/dashboard")}><BoxIcon /><span>Dashboard</span></button>
                                    {/* <button onClick={() => router.push(currentAcctType === "Influencer" ? `/influencer/${userDetails.account.id}` : currentAcctType === "Creator" ? "/creators/profile" : "/business-owner/profile")}><UserIcon /><span>Profile</span></button>
                                    <button onClick={() => router.push("/dashboard/profile/billing")}><WalletIcon /><span>Wallet</span></button>
                                    <button onClick={() => router.push("/dashboard/profile")}><SettingsIcon /><span>Settings</span></button> */}
                                    <button onClick={logout}><LogoutIcon /><span>Logout</span></button>
                                </UserDropdown>
                            }
                        </UserBtn>
                        <SidebarBtn onClick={handleShowSidebar} ref={sidebarBtn}>
                            <HamburgerIcon />
                        </SidebarBtn>
                    </Right>
                ) : (
                    <Right>
                        {/* <NavLinks>
                            <Link href="/explore">Explore</Link>
                        </NavLinks> */}
                        <Controls>
                            <Link href="/login" passHref>
                                <LoginBtn>Login</LoginBtn>
                            </Link>
                        </Controls>
                        <SidebarBtn onClick={() => setShowSidebar(!showSidebar)} ref={sidebarBtn}>
                            <HamburgerIcon />
                        </SidebarBtn>
                    </Right>
                )
            }

            <ResponsiveNav show={showSidebar} ref={sidebarRef} onClick={() => setShowSidebar(false)}>
                <NavLinks show={true}>
                    {/* <Link href="/explore">Explore</Link> */}
                </NavLinks>
            </ResponsiveNav>
        </Wrapper>
    </Container>
  )
}

export default Nav