import React, { useEffect, useState, useRef } from "react";
import {
  GetStartedBtn,
  Logo,
  NavLinks,
  ProfilePicWrapper,
  ResponsiveNav,
  SearchBtn,
  SearchBtnC,
  SearchBtnResponsive,
  SearchByBtn,
  SearchByOption,
  SearchContainer,
  SidebarBtn,
} from "./style";

import Image from "next/image";
import Link from "next/link";
import {
  BagIcon,
  BellIcon,
  BoxIcon,
  CollaborationIcon,
  ExploreIcon,
  HamburgerIcon,
  HashTagIcon,
  LogoutIcon,
  MailIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from "../../assets/svgIcons";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearUser, getUser, updateUser } from "../../app/reducers/user";
import { clearBusiness } from "../../app/reducers/business";
import {
  getUserType,
  setError,
  setLoading,
  setUserType,
} from "../../app/reducers/status";
import { useMutation } from "@tanstack/react-query";
import { accountTypeUpdate, getUserAccount } from "../../api/auth";
import switchIcon from "../../assets/switch.svg";
import {
  Center,
  ConnectDropdown,
  ConnectDropdownCont,
  Container,
  Controls,
  ControlsA,
  LoginBtn,
  Qlinks,
  Right,
  UserBtn,
  UserDropdown,
  Wrapper,
} from "../nav/style";

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
  const sidebarRef = useRef(null);
  const sidebarBtn = useRef(null);
  const dispatch = useDispatch();
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const connectMRef = useRef(null);
  const connectM2Ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const [showSearchRes, setShowSearchRes] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMConnect, setShowMConnect] = useState(false);
  const [showM2Connect, setShowM2Connect] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const router = useRouter();
  const handleSearchOption = (val) => {
    setSearchBy(val);
    setShowSearchOption(false);
  };
  const handleProfileOpen = () => {
    setShowConnect(false);
    setShowM2Connect(false);
    setShowMConnect(false);
    setShowSearchRes(false);
    setShowDropdown(!showDropdown);
  };
  const handleConnectOpen = () => {
    setShowConnect(!showConnect);
    setShowM2Connect(!showM2Connect);
    setShowMConnect(!showMConnect);
    setShowNotification(false);
    setShowDropdown(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    // setShowSidebar(false);
  };
  const handleShowSidebar = () => {
    setShowConnect(false);
    setShowDropdown(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    setShowSidebar(!showSidebar);
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    dispatch(clearUser());
    dispatch(clearBusiness());
    router.replace("/admin/u/login");
  };
  useEffect(() => {
    setIsLoggedIn(!!user);
    if (user) {
      setUserDetails(user);
    }
  }, [user, router.pathname]);
  const handleClosing = (e) => {
    if (
      connectRef.current &&
      !connectRef.current.innerHTML.includes(e.target.innerHTML)
    ) {
      setShowConnect(false);
    }
    if (
      connectMRef.current &&
      !connectMRef.current.innerHTML.includes(e.target.innerHTML)
    ) {
      setShowMConnect(false);
    }
    if (
      connectM2Ref.current &&
      !connectM2Ref.current.innerHTML.includes(e.target.innerHTML)
    ) {
      setShowM2Connect(false);
    }
    if (
      profileRef.current &&
      !profileRef.current.innerHTML.includes(e.target.innerHTML)
    ) {
      setShowDropdown(false);
    }
    if (
      switchRef.current &&
      !switchRef.current.innerHTML.includes(e.target.innerHTML)
    ) {
      setShowSwitchAccount(false);
    }
    // if(sidebarRef.current && sidebarBtn.current && !sidebarRef.current.innerHTML.includes(e.target.innerHTML) && !sidebarBtn.current.innerHTML.includes(e.target.innerHTML)) {
    //     setShowSidebar(false);
    // }
  };
  const toggleBG = (e) => {
    if (
      window.screenTop > 100 ||
      document.documentElement.scrollTop > 100 ||
      document.body.scrollTop > 100
    ) {
      setShowBg(true);
    } else {
      setShowBg(false);
    }
  };
  useEffect(() => {
    addEventListener("click", handleClosing);
    addEventListener("scroll", toggleBG);
    return () => {
      removeEventListener("click", handleClosing);
      removeEventListener("scroll", toggleBG);
    };
  }, []);

  return (
    <Container showBg={router.pathname.includes("/dashboard") ? true : showBg}>
      <Wrapper fullWidth={router.pathname.includes("/admin/u/dashboard")}>
        <div id="logo">
          {router.pathname.includes("/dashboard") && isLoggedIn && (
            <SidebarBtn onClick={handleShowSidebar} ref={sidebarBtn}>
              <Image src="/hamburger.svg" alt="ham" height={20} width={20} />
            </SidebarBtn>
          )}
          <Logo href="/">
            <Image
              src="/influenzit_logo.png"
              alt="logo"
              height={30}
              width={120}
              className="object-contain"
              style={{ cursor: "pointer" }}
            />
          </Logo>
        </div>
        {isLoggedIn ? (
          <Right>
            <Qlinks>
              <Link href="/admin/u/dashboard" passHref>
                <a>Dashboard</a>
              </Link>
              <Link href="/explore/influencers" passHref>
                <a>Find Influencers</a>
              </Link>
              <Link href="/explore/creators" passHref>
                <a>Find Creators</a>
              </Link>
              <Link href="/explore/services" passHref>
                <a>Find Services</a>
              </Link>
              <Link href="/explore/campaign-requests">
                <a>Find Requests</a>
              </Link>
            </Qlinks>
            <ControlsA
              showNotify={false}
              showMessage={false}
              style={{ border: "none" }}
            >
              <ConnectDropdown
                className="explore"
                onClick={() => handleConnectOpen()}
                ref={connectM2Ref}
              >
                <ExploreIcon />
                {showM2Connect && (
                  <ConnectDropdownCont>
                    <Link href="/explore/influencers">
                      <a>
                        <span>Influencers</span>
                      </a>
                    </Link>
                    <Link href="/explore/creators">
                      <a>
                        <span>Creators</span>
                      </a>
                    </Link>
                    <Link href="/explore/services">
                      <a>
                        <span>Services</span>
                      </a>
                    </Link>
                    <Link href="/explore/campaign-requests">
                      <a>
                        <span>Requests</span>
                      </a>
                    </Link>
                  </ConnectDropdownCont>
                )}
              </ConnectDropdown>
            </ControlsA>
            <UserBtn onClick={() => handleProfileOpen()} ref={profileRef}>
              <ProfilePicWrapper>
                <Image
                  src={user?.profile_pic}
                  alt="profile-picture"
                  layout="fill"
                  objectPosition="center"
                  objectFit="cover"
                />
              </ProfilePicWrapper>
              {showDropdown && (
                <UserDropdown>
                  <div
                    id="user-d"
                    onClick={() => router.push("/admin/u/dashboard")}
                  >
                    <h4>{user.name}</h4>
                    <p>Admin</p>
                  </div>
                  <button onClick={logout} className="logout">
                    <span>Logout</span>
                  </button>
                </UserDropdown>
              )}
            </UserBtn>
            <SidebarBtn onClick={handleShowSidebar} ref={sidebarBtn}>
              <HamburgerIcon />
            </SidebarBtn>
          </Right>
        ) : (
          <Right>
            <Center>
              <NavLinks>
                <Link href="/">Home</Link>
              </NavLinks>
              <NavLinks>
                <Link href="/explore/influencers">Influencers</Link>
              </NavLinks>
              <NavLinks>
                <Link href="/explore/campaign-requests">Campaign Requests</Link>
              </NavLinks>
              <NavLinks>
                <Link href="/explore/creators">Creators</Link>
              </NavLinks>
              <NavLinks>
                <Link href="/explore/services">Services</Link>
              </NavLinks>
            </Center>
            <Controls>
              <ConnectDropdown
                className="explore"
                onClick={() => handleConnectOpen()}
                ref={connectMRef}
                show={true}
              >
                <ExploreIcon />
                {showMConnect && (
                  <ConnectDropdownCont>
                    <Link href="/explore/influencers">
                      <a>
                        <span>Influencers</span>
                      </a>
                    </Link>
                    <Link href="/explore/creators">
                      <a>
                        <span>Creators</span>
                      </a>
                    </Link>
                    <Link href="/explore/services">
                      <a>
                        <span>Services</span>
                      </a>
                    </Link>
                    <Link href="/explore/campaign-requests">
                      <a>
                        <span>Requests</span>
                      </a>
                    </Link>
                  </ConnectDropdownCont>
                )}
              </ConnectDropdown>
              <Link href="/admin/u/login" passHref>
                <LoginBtn>Login</LoginBtn>
              </Link>
            </Controls>
          </Right>
        )}

        {/* <ResponsiveNav show={showSidebar} ref={sidebarRef} onClick={() => setShowSidebar(false)}>
                <NavLinks show={true}>
                </NavLinks>
            </ResponsiveNav> */}
      </Wrapper>
    </Container>
  );
};

export default Nav;
