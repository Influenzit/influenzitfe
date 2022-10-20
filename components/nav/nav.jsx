import React, { useEffect, useState } from 'react'
import { ConnectDropdown, ConnectDropdownCont, Container, Controls, ControlsA, GetStartedBtn, LoginBtn, Logo, NavLinks, ProfilePicWrapper, Right, SearchBtn, SearchBtnC, SearchByBtn, SearchByOption, SearchContainer, UserBtn, UserDropdown, Wrapper } from './style'

import Image from 'next/image'
import Link from 'next/link'
import { BagIcon, BellIcon, CollaborationIcon, HashTagIcon, LogoutIcon, MailIcon, SettingsIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getUser } from '../../app/reducers/user'
import { hasAValidAccount } from '../../helpers/helper'

const Nav = () => {
  const user = useSelector(getUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchBy, setSearchBy] = useState("influencer");
  const dispatch = useDispatch();
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter()
  const handleSearchOption = (val) => {
    setSearchBy(val)
    setShowSearchOption(false)
  }
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user])
  
  
  const logout = () => {
    sessionStorage.clear()
    dispatch(clearUser());
    router.push("/login");
  }
  
  if (isLoggedIn && !hasAValidAccount(user)) {
    if((router.pathname !== "/dashboard/account-type") && router.pathname.includes("dashboard") && !router.pathname.includes("create/")) {
        router.push("/dashboard/account-type")
    }
  }
  return (
    <Container>
        <Wrapper>
            <Logo href="/">
                <Image src="/influenzit.svg" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            </Logo>
            {
                isLoggedIn ? (
                    <Right>
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
                        <ConnectDropdown onClick={() => setShowConnect(!showConnect)}>
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
                        <UserBtn onClick={() => setShowDropdown(!showDropdown)}>
                            <ProfilePicWrapper>
                                <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                            {
                                showDropdown && <UserDropdown>
                                    <button onClick={() => router.push("/influencer/profile")}><UserIcon /><span>Profile</span></button>
                                    <button onClick={() => {}}><WalletIcon /><span>Wallet</span></button>
                                    <button onClick={() => router.push("/dashboard/profile/information")}><SettingsIcon /><span>Settings</span></button>
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