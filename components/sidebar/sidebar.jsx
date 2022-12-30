import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserType } from '../../app/reducers/status';
import { getUser } from '../../app/reducers/user';
import { BagIcon, BoxIcon, DashboardIcon, HashTagIcon, LockIcon, SettingsIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { Container, InnerWrapper, NavButton, ProfileImageCont, Status } from './style'

const Sidebar = () => {
    const user = useSelector(getUser);
    const currentUserType = useSelector(getUserType);
    const router = useRouter();
    const [userData, setUserData] = useState({});
    useEffect(() => {
      if(user) {
          setUserData(user)
      }
    }, [user])
  return (
    <Container>
        <ProfileImageCont>
            <InnerWrapper>
                <Image src={ user?.account?.media?.[0]?.url ? user?.account?.media?.[0]?.url : `https://ui-avatars.com/api/?name=${userData?.firstname}+${userData?.lastname}&color=FFFFFF&background=12544D`} alt="profile picture" layout='fill' objectFit='cover' objectPosition="center"/>
            </InnerWrapper>
        </ProfileImageCont>
        <Status>{currentUserType !== "null" ? currentUserType : "None Selected"}</Status>
        <NavButton onClick={() => router.push("/dashboard")} isActive={router.pathname === "/dashboard"}>
            <DashboardIcon />
            <span>Dashbord</span>
        </NavButton>
        {
            (currentUserType === "Business Owner" || currentUserType === "Creator") && (
                <NavButton onClick={() => router.push("/dashboard/projects")} isActive={router.pathname === "/dashboard/projects"}>
                    <BagIcon />
                    <span>Projects</span>
                </NavButton>
            )
        }
        {
            (currentUserType === "Business Owner" || currentUserType === "Influencer") && (
                <NavButton onClick={() => router.push("/dashboard/campaigns")} isActive={router.pathname === "/dashboard/campaigns"}>
                    <HashTagIcon />
                    <span>Campaigns</span>
                </NavButton>
            )
        }
        {
            currentUserType === "Business Owner" && (
                <NavButton onClick={() => router.push("/dashboard/profile/information")} isActive={router.pathname === "/dashboard/profile/information"}>
                    <BagIcon />
                    <span>Business</span>
                </NavButton>
            )
        }
        {
            (currentUserType === "Influencer" || currentUserType === "Creator") && (
                <NavButton onClick={() => router.push("/dashboard/profile/influencer")} isActive={router.pathname === "/dashboard/profile/influencer" }>
                    <BagIcon />
                    <span>Profile</span>
                </NavButton>
            )
        }
        {
            (currentUserType === "Influencer" || currentUserType === "Creator") && (
                <NavButton onClick={() => router.push("/dashboard/profile/services")} isActive={router.pathname.includes("/dashboard/profile/services")}>
                    <BoxIcon />
                    <span>Services</span>
                </NavButton>
            )
        }
        <NavButton onClick={() => router.push("/dashboard/profile/billing")} isActive={router.pathname.includes("/dashboard/profile/billing")}>
            <WalletIcon />
            <span>Wallet</span>
        </NavButton>
        <NavButton onClick={() => router.push("/dashboard/profile")} isActive={router.pathname === "/dashboard/profile"}>
            <UserIcon />
            <span>Account</span>
        </NavButton>
        <NavButton onClick={() => router.push("/dashboard/profile/password")} isActive={router.pathname.includes("/dashboard/profile/password")}>
            <LockIcon />
            <span>Security</span>
        </NavButton>
    </Container>
  )
}

export default Sidebar