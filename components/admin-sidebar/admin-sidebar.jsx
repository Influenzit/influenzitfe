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
import { NavButtonD } from "components/sidebar/style";

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
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
  const handleRouting = (link) => {
    dispatch(setShowSidebar(false));
    setShowCampaignDropdown(false);
    router.push(link);
  }
  return (
    <Container showSidebar={showSidebar}>
      <NavButton
        onClick={() => handleRouting("/admin/u/dashboard")}
        isActive={router.pathname === "/admin/u/dashboard"}
      >
        <DashboardIcon />
        <span>Home</span>
      </NavButton>
      <NavButton
        onClick={() => handleRouting("/admin/u/dashboard/accounts")}
        isActive={router.pathname.includes("/admin/u/dashboard/accounts")}
      >
        <UserIcon />
        <span>Accounts</span>
      </NavButton>
      <NavButton
        onClick={() => handleRouting("/admin/u/dashboard/projects")}
        isActive={router.pathname === "/admin/u/dashboard/projects"}
      >
        <ProjectIcon />
        <span>Projects</span>
      </NavButton>
       <NavButton
          onClick={() => handleRouting("/admin/u/dashboard/businesses")}
          isActive={router.pathname === "/admin/u/dashboard/businesses"}
        >
          <BagIcon />
          <span>Businesses</span>
        </NavButton>
      <NavButton
        onClick={() => handleRouting("/admin/u/dashboard/wallet")}
        isActive={router.pathname.includes("/admin/u/dashboard/wallet")}
      >
        <WalletIcon />
        <span>Wallets</span>
      </NavButton>
      <NavButton
         onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
         isActive={router.pathname === "/admin/u/dashboard/campaigns"}
        >
          <HashTagIcon />
          <span>Campaigns</span>
      </NavButton>
      {
        showCampaignDropdown ? <>
          <NavButtonD
          onClick={() =>
            handleRouting("/admin/u/dashboard/campaigns")
          }
          isActive={router.pathname === "/admin/u/dashboard/campaigns"}
        >
          <span>Campaigns</span>
        </NavButtonD>
        <NavButtonD
          onClick={() =>
            handleRouting("/admin/u/dashboard/campaigns/requests")
          }
          isActive={router.pathname.includes("campaigns")}
        >
          <span>Campaign Requests</span>
        </NavButtonD>
        </> : null
      }
      <NavButton
        onClick={() => handleRouting("/admin/u/dashboard/support")}
        isActive={router.pathname.includes("/admin/u/dashboard/support")}
      >
        <SupportIcon />
        <span>Support</span>
      </NavButton>
      <NavButton
        onClick={() => handleRouting("/admin/u/dashboard/activities")}
        isActive={router.pathname.includes("/admin/u/dashboard/activities")}
      >
        <UserIcon />
        <span>Activities</span>
      </NavButton>
    </Container>
  );
};

export default Sidebar;
