import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowSidebar, getUserType, setShowSidebar } from "../../app/reducers/status";
import { getUser } from "../../app/reducers/user";
import {
  BagIcon,
  BoxIcon,
  DashboardIcon,
  HashTagIcon,
  LockIcon,
  MailIcon,
  ProjectIcon,
  SettingsIcon,
  SupportIcon,
  UserIcon,
  WalletIcon,
} from "../../assets/svgIcons";
import {
  Container,
  InnerWrapper,
  NavButton,
  ProfileImageCont,
  Status,
} from "./style";

const Sidebar = () => {
  const user = useSelector(getUser);
  const currentUserType = useSelector(getUserType);
  const showSidebar = useSelector(getShowSidebar);
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  const handleRouting = (link) => {
    dispatch(setShowSidebar(false));
    router.push(link);
  }
  return (
    <Container showSidebar={showSidebar}>
      <NavButton
        onClick={() => handleRouting("/dashboard")}
        isActive={router.pathname === "/dashboard"}
      >
        <DashboardIcon />
        <span>Home</span>
      </NavButton>
      {(currentUserType === "Business Owner" ||
        currentUserType === "Creator") && (
        <NavButton
          onClick={() => handleRouting("/dashboard/projects")}
          isActive={router.pathname === "/dashboard/projects"}
        >
          <ProjectIcon />
          <span>Projects</span>
        </NavButton>
      )}
      {(currentUserType === "Business Owner" ||
        currentUserType === "Influencer") && (
        <NavButton
          onClick={() =>
            handleRouting(
              currentUserType === "Business Owner"
                ? "/dashboard/campaigns/business"
                : "/dashboard/campaigns/influencer"
            )
          }
          isActive={router.pathname.includes("campaigns")}
        >
          <HashTagIcon />
          <span>Campaigns</span>
        </NavButton>
      )}
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
      {(currentUserType === "Creator") && (
        <NavButton
          onClick={() => handleRouting("/dashboard/services")}
          isActive={router.pathname.includes("services")}
        >
          <BagIcon />
          <span>Services</span>
        </NavButton>
      )}
      <NavButton
        onClick={() => handleRouting("/dashboard/wallet")}
        isActive={router.pathname.includes("/dashboard/wallet")}
      >
        <WalletIcon />
        <span>Wallet</span>
      </NavButton>
      <NavButton
        onClick={() =>handleRouting("/dashboard/messages")}
        isActive={router.pathname.includes("/dashboard/messages")}
      >
        <MailIcon />
        <span>Messages</span>
      </NavButton>
      <NavButton
        onClick={() => handleRouting("/dashboard/profile")}
        isActive={router.pathname === "/dashboard/profile"}
      >
        <SettingsIcon />
        <span>Account Settings</span>
      </NavButton>
      {/* <NavButton onClick={() => router.push("/dashboard/profile/password")} isActive={router.pathname.includes("/dashboard/profile/password")}>
            <LockIcon />
            <span>Security</span>
        </NavButton> */}
      <NavButton
        onClick={() => handleRouting("/dashboard/support")}
        isActive={router.pathname.includes("/dashboard/support")}
      >
        <SupportIcon />
        <span>Support</span>
      </NavButton>
    </Container>
  );
};

export default Sidebar;
