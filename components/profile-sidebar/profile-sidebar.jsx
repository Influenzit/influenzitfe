import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../app/reducers/user'
import { BellIcon, LockIcon, LogoutIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { Bottom, Container, InnerWrapper, ProfileImageCont, Top } from './style'

const ProfileSidebar = () => {
  const user = useSelector(getUser);
  const router = useRouter();
  const [userData, setUserData] = useState({})
  useEffect(() => {
    if(user) {
        setUserData(user)
    }
  }, [user])
  
  return (
    <Container>
        <Top>
            <ProfileImageCont>
                <InnerWrapper>
                    <Image src="/profile-pic.png" alt="profile picture" layout='fill' objectFit='contain' objectPosition="center"/>
                </InnerWrapper>
            </ProfileImageCont>
            <h2>Websitechic</h2>
            <p>Lagos, Nigeria.</p>
        </Top>
        <Bottom>
            {
                userData?.account?.is_businessowner && (
                    <button onClick={() => router.push("/dashboard/profile/information")}>
                        <UserIcon />
                        <span>Business Information</span>
                    </button>
                )
            }
            {
                (userData?.account?.is_influencer || userData?.account?.is_creator) && (
                    <button onClick={() => router.push("/dashboard/profile/influencer")}>
                        <UserIcon />
                        <span>Influencer Information</span>
                    </button>
                )
            }
            <button onClick={() => router.push("/dashboard/profile/password")}>
                <LockIcon />
                <span>Password & Security</span>
            </button>
            <button onClick={() => router.push("/dashboard/profile/billing")}>
                <WalletIcon />
                <span>Billing & Payments</span>
            </button>
            <button onClick={() => router.push("/dashboard/profile/notifications")}>
                <BellIcon />
                <span>Notifications</span>
            </button>
            <button onClick={() => router.push("/")}>
                <LogoutIcon />
                <span>Logout</span>
            </button>
        </Bottom>
    </Container>
  )
}

export default ProfileSidebar
