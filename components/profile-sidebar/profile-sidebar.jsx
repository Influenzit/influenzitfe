import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserType } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import { BellIcon, LockIcon, LogoutIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { Bottom, Container, InnerWrapper, ProfileImageCont, Top } from './style'

const ProfileSidebar = () => {
  const user = useSelector(getUser);
  const currentUserType = useSelector(getUserType);
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
                currentUserType === "Business Owner" && (
                    <button onClick={() => router.push("/dashboard/profile/information")}>
                        <UserIcon />
                        <span>Business Information</span>
                    </button>
                )
            }
            {
                (currentUserType === "Influencer" || currentUserType === "Creator") && (
                    <button onClick={() => router.push("/dashboard/profile/influencer")}>
                        <UserIcon />
                        <span>{currentUserType} Information</span>
                    </button>
                )
            }
             {
                (currentUserType === "Influencer" || currentUserType === "Creator") && (
                    <button onClick={() => router.push("/dashboard/profile/services")}>
                        <UserIcon />
                        <span>Services0</span>
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
