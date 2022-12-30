import React, { useEffect, useState, useRef } from 'react'
import { ConnectDropdown, ConnectDropdownCont, Container, Controls, ControlsA, GetStartedBtn, LoginBtn, Logo, NavLinks, ProfilePicWrapper, ResponsiveNav, Right, SearchBtn, SearchBtnC, SearchBtnResponsive, SearchByBtn, SearchByOption, SearchContainer, SidebarBtn, SwitchBtn, SwitchDropdownCont, UserBtn, UserDropdown, Wrapper } from './style'

import Image from 'next/image'
import Link from 'next/link'
import { BagIcon, BellIcon, BoxIcon, CollaborationIcon, DashboardIcon, HamburgerIcon, HashTagIcon, LogoutIcon, MailIcon, SettingsIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { useRouter } from 'next/router'
import { connect, useDispatch, useSelector } from 'react-redux'
import { clearUser, getUser, updateUser } from '../../app/reducers/user'
import { clearBusiness } from '../../app/reducers/business'
import { getUserType, setError, setLoading, setUserType } from '../../app/reducers/status'
import { useMutation } from '@tanstack/react-query'
import { accountTypeUpdate, getUserAccount } from '../../api/auth'
import switchIcon from "../../assets/switch.svg"
import { getSocketInstance } from '../../socket/instance'

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
  const [searchString, setSearchString] = useState("");
  const [notificationAvailable, setNotificationAvailable] = useState(false);
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
  const mutation = useMutation(profileData => {
    return accountTypeUpdate(profileData);
  }, {
    onSuccess(successRes) {
      const res = successRes.data;
      if(res.errors || res.status === "error") {
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
      } else {
        getUserAccount(res.data.user_id).then((userRes) => {
          if(userRes.data.data) {
            dispatch(setLoading(false));
            dispatch(updateUser(userRes.data.data));
            if(userRes.data.data.account.is_creator && currentAcctType !== "Creator") {
                dispatch(setUserType("Creator"))
            }
            if(userRes.data.data.account.is_influencer && currentAcctType !== "Influencer") {
                dispatch(setUserType("Influencer"))
            }
          }
        }).catch(_ => {
          dispatch(setError({error: true, message: "An error occured"}));
        })
      }},
    onError(error) {
      const res = error.response.data;
      if(res){
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
        return;
      }
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: "An error occured"}));
    }
  }
  )
  const registerAs = (type) => {
    dispatch(setLoading(true));
    mutation.mutate({
      type
    })
  }
  const handleAccountChange = (val) => {
    if(userDetails) {
        const { is_businessowner, is_creator, is_influencer } = userDetails.account;
        if(val === "Business Owner" && is_businessowner) {
            dispatch(setUserType("Business Owner"))
        } else if(!is_businessowner && val === "Business Owner") {
            router.push("/dashboard/create/business-owner");
        }
        if(val === "Influencer" && is_influencer) {
            dispatch(setUserType("Influencer"));
        } else if(!is_influencer && val === "Influencer") {
            registerAs("influencer");
        }
        if(val === "Creator" && is_creator) {
            dispatch(setUserType("Creator"));
        } else if(!is_creator && val === "Creator") {
            registerAs("creator");
        }
    }
  }
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    dispatch(clearUser());
    dispatch(clearBusiness());
    router.replace("/login");
  }
  useEffect(() => {
    setIsLoggedIn(!!user);
    if(router.pathname.includes("/dashboard")) {
        setShowSearchBar(false);
    } else {
        setShowSearchBar(true);
    }
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
    if (!!userDetails) {
        const socketInstance = getSocketInstance()
    
        socketInstance.channel(userDetails.email).listen(".Notification", (e) => {
            setNotificationAvailable(!!e.data.length);
        })

    }
    return () => {
      removeEventListener("click", handleClosing);
    }
  }, [userDetails])
  
  return (
    <Container>
        <Wrapper>
            <Logo href="/">
                <Image src="/influenzit.svg" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            </Logo>
            {
                isLoggedIn ? (
                    <Right>
                        {
                            showSearchBar ? (
                                <>
                                    <ConnectDropdown onClick={() => handleConnectOpen()} ref={connectRef}>
                                        <span>Explore</span><Image src="/down-chev-b.svg" alt="" height={7} width={10} />
                                        {
                                            showConnect && <ConnectDropdownCont>
                                                <Link href="/explore/influencers">
                                                    <a><span>Influencers</span></a>
                                                </Link>
                                                <Link href="/explore/creators">
                                                    <a><span>Creators</span></a>
                                                </Link>
                                                <Link href="/explore/services">
                                                    <a><span>Services</span></a>
                                                </Link>
                                            </ConnectDropdownCont>
                                        }
                                    </ConnectDropdown>
                                    <SearchContainer showSearch={showSearchRes} >
                                        <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search by name" />
                                        <SearchBtnC onClick={(e) => {
                                            e.preventDefault();
                                            router.push(`/explore?search=${searchString}`);
                                        }}>
                                            <Image src="/search-b.svg" alt="" height={25} width={25}/>
                                        </SearchBtnC>
                                    </SearchContainer>
                                    <SearchBtnResponsive onClick={() => {
                                        setShowSearchRes(!showSearchRes)
                                    }}>
                                        <Image src="/search-b.svg" alt="" height={25} width={25}/>
                                    </SearchBtnResponsive>
                                </>
                            ) : null
                        }
                        <ControlsA showNotify={notificationAvailable}>
                            <Link href="/dashboard/notifications">
                                <a id="bell-icon">
                                    <BellIcon />
                                </a>
                            </Link>
                            <Link href="/dashboard/messages">
                                <a id="message-icon">
                                    <MailIcon />
                                </a>
                            </Link>
                        </ControlsA>
                        <UserBtn onClick={() => handleProfileOpen()} ref={profileRef}>
                            <ProfilePicWrapper>
                                <Image src={user?.account?.media?.[0]?.url ? user?.account?.media?.[0]?.url : `https://ui-avatars.com/api/?name=${userDetails?.firstname}+${userDetails?.lastname}&color=FFFFFF&background=12544D`} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                            {
                                showDropdown && <UserDropdown>
                                    <button onClick={() => router.push("/dashboard")}><DashboardIcon /><span>Dashboard</span></button>
                                    <button onClick={() => router.push(currentAcctType === "Influencer" ? `/influencer/${userDetails.account.id}` : currentAcctType === "Creator" ? "/creators/profile" : "/business-owner/profile")}><UserIcon /><span>Profile</span></button>
                                    {/* <button onClick={() => router.push("/dashboard/profile/billing")}><WalletIcon /><span>Wallet</span></button>
                                    <button onClick={() => router.push("/dashboard/profile")}><SettingsIcon /><span>Settings</span></button> */}
                                    <button onClick={logout}><LogoutIcon /><span>Logout</span></button>
                                </UserDropdown>
                            }
                        </UserBtn>
                        <SwitchBtn onClick={() => toggleSwitchAccount()} ref={switchRef}>
                            <Image src={switchIcon} alt="" height={24} width={24} />
                            {
                                showSwitchAccount && <SwitchDropdownCont>
                                    <button onClick={() => handleAccountChange("Business Owner")}><span>Business Owner</span></button>
                                    <button onClick={() => handleAccountChange("Creator")}><span>Creator</span></button>
                                    <button onClick={() => handleAccountChange("Influencer")}><span>Influencer</span></button>
                                </SwitchDropdownCont>
                            }
                        </SwitchBtn>
                        <SidebarBtn onClick={handleShowSidebar} ref={sidebarBtn}>
                            <HamburgerIcon />
                        </SidebarBtn>
                    </Right>
                ) : (
                    <Right>
                        <NavLinks>
                            <Link href="/explore">Explore</Link>
                            <Link href="/pricing">Pricing</Link>
                        </NavLinks>
                        <Controls>
                            <Link href="/login" passHref>
                                <LoginBtn>Login</LoginBtn>
                            </Link>
                            <Link href="/register" passHref>
                                <GetStartedBtn>Get Started</GetStartedBtn>
                            </Link>
                        </Controls>
                        <SidebarBtn onClick={() => setShowSidebar(!showSidebar)} ref={sidebarBtn}>
                            <HamburgerIcon />
                        </SidebarBtn>
                    </Right>
                )
            }

            <ResponsiveNav show={showSidebar} ref={sidebarRef} onClick={() => setShowSidebar(false)}>
            {
                !isLoggedIn ? (
                        <NavLinks show={true}>
                            <Link href="/explore">Explore</Link>
                            <Link href="/pricing">Pricing</Link>
                        </NavLinks>
                ) : (
                    <NavLinks show={true}>
                        <Link href="/dashboard/campaigns">
                            <a><HashTagIcon /><span>Campaigns</span></a>
                        </Link>
                        <Link href="/dashboard/projects">
                            <a><BagIcon /><span>Projects</span></a>
                        </Link>
                        <Link href="/dashboard/collaborations">
                            <a><CollaborationIcon /><span>Collaborations</span></a>
                        </Link>
                    </NavLinks>
                )
            }

        </ResponsiveNav>
        </Wrapper>
    </Container>
  )
}

export default Nav