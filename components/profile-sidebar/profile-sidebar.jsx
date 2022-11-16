import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserType } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import { BellIcon, ChevronRight, LockIcon, LogoutIcon, SettingsIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { Bottom, Container, InnerWrapper, ProfileImageCont, ToggleBtn, Top, Wrapper } from './style'

const ProfileSidebar = () => {
  const user = useSelector(getUser);
  const currentUserType = useSelector(getUserType);
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    if(user) {
        setUserData(user)
    }
  }, [user])
  return (
    <Wrapper show={show}>
        <ToggleBtn onClick={() => setShow(!show)}>
            <ChevronRight />
        </ToggleBtn>
        <Container>
            <Top>
                <ProfileImageCont>
                    <InnerWrapper>
                        <Image src="/profile-pic.png" alt="profile picture" layout='fill' objectFit='contain' objectPosition="center"/>
                    </InnerWrapper>
                </ProfileImageCont>
                <h2>{userData.firstname} {userData.lastname}</h2>
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
                            <SettingsIcon />
                            <span>Services</span>
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
    </Wrapper>
  )
}

export default ProfileSidebar
