import React, { useEffect, useState } from 'react'
import { ConnectDropdown, ConnectDropdownCont, Container, Controls, ControlsA, GetStartedBtn, LoginBtn, Logo, NavLinks, ProfilePicWrapper, Right, SearchBtn, SearchBtnC, SearchByBtn, SearchByOption, SearchContainer, UserBtn, UserDropdown, Wrapper } from './style'

import Image from 'next/image'
import Link from 'next/link'
import { BagIcon, BellIcon, CollaborationIcon, HashTagIcon, LogoutIcon, MailIcon, SettingsIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { useRouter } from 'next/router'
import { connect, useDispatch, useSelector } from 'react-redux'
import { clearUser, getUser, updateUser } from '../../app/reducers/user'
import { clearBusiness } from '../../app/reducers/business'
import { getUserType, setError, setLoading, setUserType } from '../../app/reducers/status'
import { useMutation } from '@tanstack/react-query'
import { accountTypeUpdate, getUserAccount } from '../../api/auth'
import { useRef } from 'react'

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
  const dispatch = useDispatch();
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const router = useRouter();
  const handleSearchOption = (val) => {
    setSearchBy(val)
    setShowSearchOption(false)
  }
  const toggleSwitchAccount = () => {
    setShowSwitchAccount(!showSwitchAccount);
    setShowConnect(false);
    setShowDropdown(false);
  }
  
  const handleProfileOpen = () => {
    setShowConnect(false);
    setShowSwitchAccount(false);
    setShowDropdown(!showDropdown);
  }
  const handleConnectOpen = () => {
    setShowConnect(!showConnect);
    setShowDropdown(false);
    setShowSwitchAccount(false);
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
            localStorage.setItem("user", JSON.stringify(userRes.data.data));
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
    router.push("/login");
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
        const { is_influencer, is_creator, is_businessowner} = user.account
        if(is_businessowner) {
            dispatch(setUserType("Business Owner"));
        } else {
            is_influencer ? dispatch(setUserType("Influencer")) : (is_creator && dispatch(setUserType("Creator")));
        }
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
                        {
                            showSearchBar ? (
                                <SearchContainer>
                                    <SearchByBtn onClick={() => setShowSearchOption(!showSearchOption)}>
                                        <span>{searchBy}</span><Image src="/down-chev-b.svg" alt="" height={7} width={10} />
                                        {
                                            showSearchOption && <SearchByOption>
                                                <button onClick={() => handleSearchOption("influencers")}>influencers</button>
                                                <button onClick={() => handleSearchOption("creators")}>creators</button>
                                            </SearchByOption>
                                        }
                                    </SearchByBtn>
                                    <input type="text" placeholder="Search by name" />
                                    <SearchBtnC>
                                        <Image src="/search-b.svg" alt="" height={25} width={25}/>
                                    </SearchBtnC>
                                </SearchContainer>
                            ) : (
                            <>
                                <ConnectDropdown onClick={() => toggleSwitchAccount()} ref={switchRef}>
                                    <span>{currentAcctType}</span><Image src="/switch.png" alt="" height={24} width={24} />
                                    {
                                        showSwitchAccount && <ConnectDropdownCont>
                                                <button onClick={() => handleAccountChange("Business Owner")}><span>Business Owner</span></button>
                                                <button onClick={() => handleAccountChange("Creator")}><span>Creator</span></button>
                                                <button onClick={() => handleAccountChange("Influencer")}><span>Influencer</span></button>
                                        </ConnectDropdownCont>
                                    }
                                </ConnectDropdown>
                            </>
                            )
                        }
                        <ConnectDropdown onClick={() => handleConnectOpen()} ref={connectRef}>
                            <span>My Connects</span><Image src="/down-chev-b.svg" alt="" height={7} width={10} />
                            {
                                showConnect && <ConnectDropdownCont>
                                    <Link href="/dashboard/campaigns">
                                        <a><HashTagIcon /><span>Campaigns</span></a>
                                    </Link>
                                    <Link href="/dashboard/projects">
                                        <a><BagIcon /><span>Projects</span></a>
                                    </Link>
                                    <Link href="/dashboard/collaborations">
                                        <a><CollaborationIcon /><span>Collaborations</span></a>
                                    </Link>
                                </ConnectDropdownCont>
                            }
                        </ConnectDropdown>
                        <ControlsA>
                            <Link href="/dashboard/notifications">
                                <a>
                                    <BellIcon />
                                </a>
                            </Link>
                            <Link href="/dashboard/messages">
                                <a>
                                    <MailIcon />
                                </a>
                            </Link>
                        </ControlsA>
                        <UserBtn onClick={() => handleProfileOpen()} ref={profileRef}>
                            <ProfilePicWrapper>
                                <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                            {
                                showDropdown && <UserDropdown>
                                    <button onClick={() => router.push(currentAcctType === "Influencer" ? "/influencer/profile" : currentAcctType === "Creator" ? "/creators/profile" : "/business-owner/profile")}><UserIcon /><span>Profile</span></button>
                                    <button onClick={() => {}}><WalletIcon /><span>Wallet</span></button>
                                    <button onClick={() => router.push(`${user.account.is_businessowner ? "/dashboard/profile/information" : "/dashboard/profile/influencer"}`)}><SettingsIcon /><span>Settings</span></button>
                                    <button onClick={logout}><LogoutIcon /><span>Logout</span></button>
                                </UserDropdown>
                            }
                        </UserBtn>
                    </Right>
                ) : (
                    <Right>
                        <NavLinks>
                            <Link href="/">Home</Link>
                            <Link href="/creators">Creators</Link>
                            <Link href="/business-owner">Business Owner</Link>
                            <Link href="/pricing">Pricing</Link>
                        </NavLinks>
                        <Controls>
                            <SearchBtn>
                                <Image src="/search-b.svg" alt="" height={25} width={25}/>
                            </SearchBtn>
                            <Link href="/login" passHref>
                                <LoginBtn>Login</LoginBtn>
                            </Link>
                            <Link href="/register" passHref>
                                <GetStartedBtn>Get Started</GetStartedBtn>
                            </Link>
                        </Controls>
                    </Right>
                )
            }
        </Wrapper>
    </Container>
  )
}

export default Nav