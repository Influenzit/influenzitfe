import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { BellIcon, LockIcon, LogoutIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { Bottom, Container, InnerWrapper, ProfileImageCont, Top } from './style'

const ProfileSidebar = () => {
  const router = useRouter();
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
            <button onClick={() => router.push("/dashboard/profile/information")}>
                <UserIcon />
                <span>Business Information</span>
            </button>
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
