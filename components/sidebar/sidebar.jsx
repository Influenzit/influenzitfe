import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getShowSidebar, getUserType } from '../../app/reducers/status';
import { getUser } from '../../app/reducers/user';
import { BagIcon, BoxIcon, DashboardIcon, HashTagIcon, LockIcon, MailIcon, ProjectIcon, SettingsIcon, SupportIcon, UserIcon, WalletIcon } from '../../assets/svgIcons'
import { Container, InnerWrapper, NavButton, ProfileImageCont, Status } from './style'

const Sidebar = () => {
    const user = useSelector(getUser);
    const currentUserType = useSelector(getUserType);
    const showSidebar = useSelector(getShowSidebar);
    const router = useRouter();
    const [userData, setUserData] = useState({});
    useEffect(() => {
      if(user) {
          setUserData(user)
      }
    }, [user])
  return (
    <Container showSidebar={showSidebar}>
        <NavButton onClick={() => router.push("/dashboard")} isActive={router.pathname === "/dashboard"}>
            <DashboardIcon />
            <span>Home</span>
        </NavButton>
        {
            (currentUserType === "Business Owner" || currentUserType === "Creator") && (
                <NavButton onClick={() => router.push("/dashboard/projects")} isActive={router.pathname === "/dashboard/projects"}>
                    <ProjectIcon />
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
        {/* {
            currentUserType === "Business Owner" && (
                <NavButton onClick={() => router.push("/dashboard/profile/information")} isActive={router.pathname === "/dashboard/profile/information"}>
                    <BagIcon />
                    <span>Business</span>
                </NavButton>
            )
        } */}
        {/* {
            (currentUserType === "Influencer" || currentUserType === "Creator") && (
                <NavButton onClick={() => router.push("/dashboard/profile/influencer")} isActive={router.pathname === "/dashboard/profile/influencer" }>
                    <BagIcon />
                    <span>Profile</span>
                </NavButton>
            )
        } */}
        {
            (currentUserType === "Influencer" || currentUserType === "Creator") && (
                <NavButton onClick={() => router.push("/dashboard/profile/services")} isActive={router.pathname.includes("/dashboard/profile/services")}>
                    <BagIcon />
                    <span>Services</span>
                </NavButton>
            )
        }
        <NavButton onClick={() => router.push("/dashboard/profile/wallet")} isActive={router.pathname.includes("/dashboard/profile/wallet")}>
            <WalletIcon />
            <span>Wallet</span>
        </NavButton>
        <NavButton onClick={() => router.push("/dashboard/messages")} isActive={router.pathname.includes("/dashboard/messages")}>
            <MailIcon />
            <span>Messages</span>
        </NavButton>
        <NavButton onClick={() => router.push("/dashboard/profile")} isActive={router.pathname === "/dashboard/profile"}>
            <SettingsIcon />
            <span>Account Settings</span>
        </NavButton>
        {/* <NavButton onClick={() => router.push("/dashboard/profile/password")} isActive={router.pathname.includes("/dashboard/profile/password")}>
            <LockIcon />
            <span>Security</span>
        </NavButton> */}
        <NavButton onClick={() => router.push("/dashboard/support")} isActive={router.pathname.includes("/dashboard/support")}>
            <SupportIcon />
            <span>Support</span>
        </NavButton>
    </Container>
  )
}

export default Sidebar