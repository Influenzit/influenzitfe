import React, { useEffect, useState, useRef } from "react";
import {
  Center,
  ConnectDropdown,
  ConnectDropdownCont,
  Container,
  Controls,
  ControlsA,
  GetStartedBtn,
  LoginBtn,
  Logo,
  NavLinks,
  NotificationCont,
  ProfilePicWrapper,
  Qlinks,
  ResponsiveNav,
  Right,
  SearchBtn,
  SearchBtnC,
  SearchBtnResponsive,
  SearchByBtn,
  SearchByOption,
  SearchContainer,
  SidebarBtn,
  SwitchBtn,
  SwitchDropdownCont,
  UserBtn,
  UserDropdown,
  Wrapper,
} from "./style";

import Image from "next/image";
import Link from "next/link";
import {
  BagIcon,
  BellIcon,
  BoxIcon,
  CollaborationIcon,
  DashboardIcon,
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
  getShowSidebar,
  getUserType,
  setError,
  setLoading,
  setShowSidebar,
  setUserType,
} from "../../app/reducers/status";
import { useMutation, useQuery } from "@tanstack/react-query";
import { accountTypeUpdate, getUserAccount } from "../../api/auth";
import switchIcon from "../../assets/switch.svg";
import { getSocketInstance } from "../../socket/instance";
import { getNotifications, markAllAsRead } from "../../api/notification";

const Nav = () => {
  const user = useSelector(getUser);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [searchBy, setSearchBy] = useState("influencers");
  const currentAcctType = useSelector(getUserType);
  const rShowSidebar = useSelector(getShowSidebar);
  const switchRef = useRef(null);
  const connectRef = useRef(null);
  const profileRef = useRef(null);
  const notifyRef = useRef(null);
  const notifyBtn = useRef(null);
  const sidebarBtn = useRef(null);
  const dispatch = useDispatch();
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const [showSearchRes, setShowSearchRes] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  //   const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const [searchString, setSearchString] = useState("");
  const [notificationAvailable, setNotificationAvailable] = useState(false);
  //   const handleSearchOption = (val) => {
  //     setSearchBy(val)
  //     setShowSearchOption(false)
  //   }
  //   const toggleSwitchAccount = () => {
  //     setShowSwitchAccount(!showSwitchAccount);
  //     setShowConnect(false);
  //     setShowDropdown(false);
  //     setShowSearchRes(false);
  //     // setShowSidebar(false);

  //   }
  const { data, refetch } = useQuery(
    ["get-notifications"],
    async () => {
      return await getNotifications();
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
    }
  );
  const readNotificationMutation = useMutation(
    () => {
      return markAllAsRead();
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        setShowNotification(false);
        dispatch(setLoading(false));
      },
      onError(error) {
        const res = error.response.data;
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const handleProfileOpen = () => {
    setShowConnect(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    setShowNotification(false);
    setShowDropdown(!showDropdown);
  };
  const handleNotification = () => {
    setShowConnect(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    // setShowSidebar(false);
    setShowDropdown(false);
    setShowNotification(!showNotification);
    if (!showNotification) {
      refetch();
    }
  };
  const handleConnectOpen = () => {
    setShowConnect(!showConnect);
    setShowNotification(false);
    setShowDropdown(false);
    setShowSwitchAccount(false);
    setShowSearchRes(false);
    // setShowSidebar(false);
  };
  const handleShowSidebar = () => {
    dispatch(setShowSidebar(!rShowSidebar));
  };
  const mutation = useMutation(
    (profileData) => {
      return accountTypeUpdate(profileData);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        if (res.errors || res.status === "error") {
          dispatch(setLoading(false));
          dispatch(setError({ error: true, message: res.message }));
        } else {
          getUserAccount()
            .then((userRes) => {
              if (userRes.data.data) {
                dispatch(setLoading(false));
                dispatch(updateUser(userRes.data.data));
                if (
                  userRes.data.data.account.is_creator &&
                  currentAcctType !== "Creator"
                ) {
                  dispatch(setUserType("Creator"));
                }
                if (
                  userRes.data.data.account.is_influencer &&
                  currentAcctType !== "Influencer"
                ) {
                  dispatch(setUserType("Influencer"));
                }
              }
            })
            .catch((_) => {
              dispatch(setError({ error: true, message: "An error occured" }));
            });
        }
      },
      onError(error) {
        const res = error.response.data;
        if (res) {
          dispatch(setLoading(false));
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setLoading(false));
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const registerAs = (type) => {
    dispatch(setLoading(true));
    mutation.mutate({
      type,
    });
  };
  const handleAccountChange = (val) => {
    if (userDetails) {
      const { is_businessowner, is_creator, is_influencer } =
        userDetails.account;
      if (val === "Business Owner" && is_businessowner) {
        dispatch(setUserType("Business Owner"));
      } else if (!is_businessowner && val === "Business Owner") {
        router.push("/dashboard/create/business-owner");
      }
      if (val === "Influencer" && is_influencer) {
        dispatch(setUserType("Influencer"));
      } else if (!is_influencer && val === "Influencer") {
        registerAs("influencer");
      }
      if (val === "Creator" && is_creator) {
        dispatch(setUserType("Creator"));
      } else if (!is_creator && val === "Creator") {
        registerAs("creator");
      }
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    dispatch(clearUser());
    dispatch(clearBusiness());
    router.replace("/login");
  };
  useEffect(() => {
    setIsLoggedIn(!!user);
    if (router.pathname.includes("/dashboard")) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
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
    if (
      notifyRef.current &&
      notifyBtn.current &&
      !notifyRef.current.innerHTML.includes(e.target.innerHTML) &&
      !notifyBtn.current.innerHTML.includes(e.target.innerHTML)
    ) {
      setShowNotification(false);
    }
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
  const handleMarkRead = () => {
    dispatch(setLoading(true));
    readNotificationMutation.mutate();
  };
  useEffect(() => {
    addEventListener("click", handleClosing);
    addEventListener("scroll", toggleBG);
    if (!!userDetails) {
      const socketInstance = getSocketInstance();
      socketInstance.channel(userDetails.email).listen(".Notification", (e) => {
        setNotificationAvailable(!!e.data.length);
      });
    }
    return () => {
      removeEventListener("click", handleClosing);
      removeEventListener("scroll", toggleBG);
    };
  }, [userDetails]);

  const bizInfo = JSON.parse(localStorage.getItem('businesses'))

  return (
    <Container showBg={router.pathname.includes("/dashboard") ? true : showBg}>
      <Wrapper fullWidth={router.pathname.includes("/dashboard")}>
        <div id="logo">
          {router.pathname.includes("/dashboard") && isLoggedIn && (
            <SidebarBtn onClick={handleShowSidebar} ref={sidebarBtn}>
              <Image src="/hamburger.svg" alt="ham" height={20} width={20} />
            </SidebarBtn>
          )}
          <Logo href="/">
          

          <Image src="/influenzit_logo.png" alt="logo" height={30} width={120} className="object-contain" style={{cursor: "pointer"}}/>
          </Logo>
        </div>
        {isLoggedIn ? (
          <Right isLoggedIn>
            {/* {
                            showSearchBar ? (
                                <>
                                    <ConnectDropdown onClick={() => handleConnectOpen()} ref={connectRef}>
                                        <span>Explore</span><Image src="/down-chev-b.svg" alt="" height={7} width={10} />
                                        {
                                            showConnect && <ConnectDropdownCont>
                                                <Link href="/explore/influencers">
                                                    <a><span>Influencers</span></a>
                                                </Link>
                                                <Link href="/explore/creators">
                                                    <a><span>Creators</span></a>
                                                </Link>
                                                <Link href="/explore/services">
                                                    <a><span>Services</span></a>
                                                </Link>
                                            </ConnectDropdownCont>
                                        }
                                    </ConnectDropdown>
                                    <SearchContainer showSearch={showSearchRes} >
                                        <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search by name" />
                                        <SearchBtnC onClick={(e) => {
                                            e.preventDefault();
                                            router.push(`/explore?search=${searchString}`);
                                        }}>
                                            <Image src="/search-b.svg" alt="" height={25} width={25}/>
                                        </SearchBtnC>
                                    </SearchContainer>
                                    <SearchBtnResponsive onClick={() => {
                                        setShowSearchRes(!showSearchRes)
                                    }}>
                                        <Image src="/search-b.svg" alt="" height={25} width={25}/>
                                    </SearchBtnResponsive>
                                </>
                            ) : null
                        } */}
            <Qlinks>
              <Link href="/dashboard" passHref>
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
            </Qlinks>
            <ControlsA showNotify={notificationAvailable} showMessage={false}>
              <Link href="/dashboard/messages">
                <a id="mail-icon">
                  <MailIcon />
                </a>
              </Link>
              <div ref={notifyBtn} id="notify-cont">
                <button id="bell-icon" onClick={handleNotification}>
                  <BellIcon />
                </button>
                {showNotification && (
                  <NotificationCont ref={notifyRef}>
                    <div id="heading">
                      <h3>Notifications</h3>
                      <button onClick={handleMarkRead}>Mark all as read</button>
                    </div>
                    <div id="container">
                      {data?.data?.data?.map((val, i) => (
                        <div id="notify" key={i}>
                          <div id="notify-pic">
                            <Image
                              src={val.payload?.image ?? ""}
                              alt="pic"
                              layout="fill"
                              objectPosition="center"
                              objectFit="cover"
                            />
                          </div>
                          <div>
                            <p>{val.payload.text}</p>
                            <span>{val.created_at}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </NotificationCont>
                )}
              </div>
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
                  <div id="user-d" onClick={() => router.push("/dashboard")}>
                    <h4>{user.name}</h4>
                    <p>{currentAcctType}</p>
                    {currentAcctType === "Business Owner" &&  <div className='text-gray-500 text-xs'>Business ID: {bizInfo[0].reference} </div>}

                  </div>
                  <div id="switch">
                    <p>Switch Account</p>
                    {currentAcctType !== "Business Owner" && (
                      <button
                        onClick={() => handleAccountChange("Business Owner")}
                      >
                        <span>Business Owner</span>
                      </button>
                    )}
                    {currentAcctType !== "Creator" && (
                      <button onClick={() => handleAccountChange("Creator")}>
                        <span>Creator</span>
                      </button>
                    )}
                    {currentAcctType !== "Influencer" && (
                      <button onClick={() => handleAccountChange("Influencer")}>
                        <span>Influencer</span>
                      </button>
                    )}
                  </div>
                  {/* <button onClick={() => router.push("/dashboard")}><DashboardIcon /><span>Dashboard</span></button>
                                    <button onClick={() => router.push(currentAcctType === "Influencer" ? `/influencer/${userDetails.account.id}` : currentAcctType === "Creator" ? "/creators/profile" : "/business-owner/profile")}><UserIcon /><span>Profile</span></button> */}
                  {/* <button onClick={() => router.push("/dashboard/profile/billing")}><WalletIcon /><span>Wallet</span></button>
                                    <button onClick={() => router.push("/dashboard/profile")}><SettingsIcon /><span>Settings</span></button> */}
                  <button onClick={logout} id="logout">
                    <span>Logout</span>
                  </button>
                </UserDropdown>
              )}
            </UserBtn>
            {/* <SwitchBtn onClick={() => toggleSwitchAccount()} ref={switchRef}>
                            <Image src={switchIcon} alt="" height={24} width={24} />
                            {
                                showSwitchAccount && <SwitchDropdownCont>
                                    <button onClick={() => handleAccountChange("Business Owner")}><span>Business Owner</span></button>
                                    <button onClick={() => handleAccountChange("Creator")}><span>Creator</span></button>
                                    <button onClick={() => handleAccountChange("Influencer")}><span>Influencer</span></button>
                                </SwitchDropdownCont>
                            }
                        </SwitchBtn> */}
          </Right>
        ) : (
          <Right>
            <Center>
              <NavLinks>
                <Link href="/">Home</Link>
              </NavLinks>
              <NavLinks>
                <Link href="/register">Join Influencers</Link>
              </NavLinks>
              <ConnectDropdown
                onClick={() => handleConnectOpen()}
                ref={connectRef}
              >
                <span>Explore</span>
                <Image src="/down-chev-b.svg" alt="" height={7} width={10} />
                {showConnect && (
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
                  </ConnectDropdownCont>
                )}
              </ConnectDropdown>
              {/* <NavLinks>
                <Link href="/pricing">Pricing</Link>
              </NavLinks> */}
            </Center>
            <Controls>
              <Link href="/login" passHref>
                <LoginBtn>Login</LoginBtn>
              </Link>
              <Link href="/register" passHref>
                <GetStartedBtn>Get Started</GetStartedBtn>
              </Link>
            </Controls>
          </Right>
        )}

        {/* <ResponsiveNav show={showSidebar} ref={sidebarRef} onClick={() => setShowSidebar(false)}>
            {
                !isLoggedIn ? (
                        <NavLinks show={true}>
                            <Link href="/explore">Explore</Link>
                            <Link href="/pricing">Pricing</Link>
                        </NavLinks>
                ) : (
                    <NavLinks show={true}>
                        <Link href="/dashboard/campaigns">
                            <a><HashTagIcon /><span>Campaigns</span></a>
                        </Link>
                        <Link href="/dashboard/projects">
                            <a><BagIcon /><span>Projects</span></a>
                        </Link>
                        <Link href="/dashboard/collaborations">
                            <a><CollaborationIcon /><span>Collaborations</span></a>
                        </Link>
                    </NavLinks>
                )
            }
            </ResponsiveNav> */}
      </Wrapper>
    </Container>
  );
};

export default Nav;
