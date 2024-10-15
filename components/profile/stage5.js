import React from "react";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import tiktok from "../../assets/tiktok.svg";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import {
  ConnectFlex,
  SocialCard,
  SocialCardList,
  SocialMediaContainer,
  ViewProfileBtn,
} from "../../styles/profile.style";
import Image from "next/image";
import Link from "next/link";
import {
  accountMedia,
  disconnectSocialMedia,
  getUserSocialMedia,
} from "api/auth";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getUserType, setError, setLoading } from "app/reducers/status";
import { UpdateModal } from "styles/view.style";
import { WelcomeModal } from "styles/connect-pages.style";
import { toast } from "react-toastify";
import { FacebookBtn, SocialIcon } from "styles/auth.style";
import { useRouter } from "next/router";

const Stage5 = ({ user }) => {
  const dispatch = useDispatch();
  const [listD, setListD] = useState([]);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const currentAcctType = useSelector(getUserType);
  const router = useRouter();
  const { data: socialData, refetch: refetchSocialData } = useQuery(
    ["get-social-media"],
    async () => {
      return await getUserSocialMedia();
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(data) {
        setListD(data.data.data);
        dispatch(setLoading(false));
      },
      onError(res) {
        dispatch(setLoading(false));
      },
    }
  );
  const updateSocialMutation = useMutation(
    (data) => {
      return disconnectSocialMedia(data);
    },
    {
      onSuccess() {
        toast.success("Account Disconnected", {
          position: toast.POSITION.TOP_RIGHT,
        });
        refetchSocialData();
        dispatch(setLoading(false));
      },
      onError(error) {
        const res = error.response.data;
        dispatch(setLoading(false));
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const disconnectSocialMediaFunc = (id) => {
    dispatch(setLoading(true));
    updateSocialMutation.mutate(id);
  };
  useEffect(() => {
    refetchSocialData();
  }, []);
  const getFacebookList = () => {
    if (socialData) {
      let list = listD.filter((val) => val.platform === "facebook");
      return list;
    }
  };
  const getInstagramList = () => {
    if (socialData) {
      let list = listD.filter((val) => val.platform === "instagram");
      return list;
    }
  };
  const getTwitterList = () => {
    if (socialData) {
      let list = listD.filter((val) => val.platform === "twitter");
      return list;
    }
  };
  const getTiktokList = () => {
    if (socialData) {
      let list = listD.filter((val) => val.platform === "tiktok");
      return list;
    }
  };
  const getYoutubeList = () => {
    if (socialData) {
      let list = listD.filter((val) => val.platform === "google");
      return list;
    }
  };

  return (
    <div>
      <div>
        <SocialMediaContainer>
          <h1>Twitter</h1>
          { <SocialCardList>
                    {getTwitterList()?.length ? (
                        getTwitterList()?.map((account, i) => (
                            <SocialCard key={i}>
                                <p>{account.profile_name}<br/><span>{account.profile_type}</span></p>
                                <div>
                                    {currentAcctType === "Creator" && (<button onClick={() => router.push(`/creators/${user.account.slug}`)}>View</button>)}
                                    {currentAcctType === "Influencer" && (<button onClick={() => router.push(`/influencers/${user.account.slug}`)}>View</button>)}
                                    <button onClick={() => {
                                        disconnectSocialMediaFunc(account.id)
                                    }}>Disconnect</button>
                                </div>
                            </SocialCard>
                        ))
                    ): <p>No Twitter account connected</p>
                    }
                </SocialCardList> }
          // <p>Connection of Twitter is coming soon</p>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=twitter&user=${user?.id}`}
          >
            <a>
              <Image src={twitter} width={25} height={25} alt="social" />
              <span>Connect</span>
            </a>
          </Link>
        </SocialMediaContainer>
        <SocialMediaContainer>
          <h1>TikTok</h1>
          <SocialCardList>
            {getTiktokList()?.length ? (
              getTiktokList()?.map((account, i) => (
                <SocialCard key={i}>
                  <p>
                    {account.profile_name}
                    <br />
                    <span>{account.profile_type}</span>
                  </p>
                  <div>
                    {currentAcctType === "Creator" && (
                      <button
                        onClick={() =>
                          router.push(`/creators/${user.account.slug}`)
                        }
                      >
                        View
                      </button>
                    )}
                    {currentAcctType === "Influencer" && (
                      <button
                        onClick={() =>
                          router.push(`/influencers/${user.account.slug}`)
                        }
                      >
                        View
                      </button>
                    )}
                    <button
                      onClick={() => {
                        disconnectSocialMediaFunc(account.id);
                      }}
                    >
                      Disconnect
                    </button>
                  </div>
                </SocialCard>
              ))
            ) : (
              <p>No Tiktok account connected</p>
            )}
          </SocialCardList>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=tiktok&user=${user?.id}`}
          >
            <a>
              <Image src={tiktok} width={25} height={25} alt="social" />
              <span>Connect</span>
            </a>
          </Link>
        </SocialMediaContainer>
        <SocialMediaContainer>
          <h1>Facebook</h1>
          <SocialCardList>
            {getFacebookList()?.length ? (
              getFacebookList()?.map((account, i) => (
                <SocialCard key={i}>
                  <p>
                    {account.profile_name}
                    <br />
                    <span>{account.profile_type}</span>
                  </p>
                  <div>
                    {currentAcctType === "Creator" && (
                      <button
                        onClick={() =>
                          router.push(`/creators/${user.account.slug}`)
                        }
                      >
                        View
                      </button>
                    )}
                    {currentAcctType === "Influencer" && (
                      <button
                        onClick={() =>
                          router.push(`/influencers/${user.account.slug}`)
                        }
                      >
                        View
                      </button>
                    )}
                    <button
                      onClick={() => {
                        disconnectSocialMediaFunc(account.id);
                      }}
                    >
                      Disconnect
                    </button>
                  </div>
                </SocialCard>
              ))
            ) : (
              <p>No Facebook account connected</p>
            )}
          </SocialCardList>

          <Link
            href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=facebook&user=${user?.id}`}
          >
            <FacebookBtn style={{ width: "250px" }}>
              <SocialIcon>
                <Image src="/facebook-r.svg" alt="" height={22} width={22} />
              </SocialIcon>
              <span>Connect to Facebook</span>
            </FacebookBtn>
          </Link>
        </SocialMediaContainer>
        <SocialMediaContainer>
          <h1>Youtube</h1>
          <SocialCardList>
            {getYoutubeList()?.length ? (
              getYoutubeList()?.map((account, i) => (
                <SocialCard key={i}>
                  <p>
                    {account.profile_name}
                    <br />
                    <span>{account.profile_type}</span>
                  </p>
                  <div>
                    {currentAcctType === "Creator" && (
                      <button
                        onClick={() =>
                          router.push(`/creators/${user.account.slug}`)
                        }
                      >
                        View
                      </button>
                    )}
                    {currentAcctType === "Influencer" && (
                      <button
                        onClick={() =>
                          router.push(`/influencers/${user.account.slug}`)
                        }
                      >
                        View
                      </button>
                    )}
                    <button
                      onClick={() => {
                        disconnectSocialMediaFunc(account.id);
                      }}
                    >
                      Disconnect
                    </button>
                  </div>
                </SocialCard>
              ))
            ) : (
              <p>No Youtube account connected</p>
            )}
          </SocialCardList>
          <button id="connect-btn" onClick={() => setShowNotifyModal(true)}>
            <Image
              src={"/youtube_dark.png"}
              width={36.1}
              height={25}
              alt="social"
            />
            <span>Connect</span>
          </button>
        </SocialMediaContainer>
        {/* <ConnectFlex>
               
                {
                    user?.account?.twitter_verified ?
                    <div>
                        <Image
                            src={twitter}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Twitter Connected</span>
                    </div>:
                    (
                        <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=twitter&user=${user.id}`}>
                            <a>
                                <Image
                                    src={twitter}
                                    width={25}
                                    height={25}
        
                                    alt="social"
                                />
                                <span>Connect</span>
                            </a>
                        </Link>
                    )
                }
                {
                    user?.account?.tiktok_verified ?
                    <div>
                        <Image
                            src={tiktok}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>TikTok Connected</span>
                    </div>:
                    (
                        <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=tiktok&user=${user.id}`}>
                            <a>
                                <Image
                                    src={tiktok}
                                    width={25}
                                    height={25}

                                    alt="social"
                                />
                                <span>Connect TikTok</span>
                            </a>
                        </Link>
                    )
                }
                {
                    user?.account?.facebook_verified ?
                    <div>
                        <Image
                            src={facebook}
                            width={25}
                            height={25}
                            alt="social"
                        />
                        <span>Facebook Connected</span>
                    </div>:
                    (
                        <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=facebook&user=${user.id}`}>
                            <a>
                                <Image
                                    src={facebook}
                                    width={25}
                                    height={25}
                                    alt="social"
                                />
                                <span>Connect Facebook</span>
                            </a>
                        </Link>
                    )
                }
                {
                    user?.account?.youtube_verified ?
                    <div>
                        <Image
                            src={youtube}
                            width={25}
                            height={25}
                            alt="social"
                        />
                        <span>Youtube Connected</span>
                    </div>:
                    (
                        <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=google&user=${user.id}`}>
                            <a>
                                <Image
                                    src={youtube}
                                    width={25}
                                    height={25}
                                    alt="social"
                                />
                                <span>Connect Youtube</span>
                            </a>
                        </Link>
                    )
                }
            </ConnectFlex> */}
      </div>
      {showNotifyModal && (
        <UpdateModal>
          <WelcomeModal>
            <div>
              <button onClick={() => setShowNotifyModal(false)}>
                <Image src="/cancel.svg" alt="" height={14} width={14} />
              </button>
            </div>
            <p>
              (Influenzit&apos;s) use and transfer to any other app of
              information received from Google APIs will adhere to the Google
              API Services User Data Policy, including the Limited Use
              requirements. To learn more, please visit the{" "}
              <Link
                href={
                  "https://developers.google.com/terms/api-services-user-data-policy"
                }
                passHref
              >
                <a target="_blank" rel="noopener noreferrer">
                  Google API Services User Data Policy
                </a>
              </Link>
              .
            </p>
            <div>
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=google&user=${user.id}`}
              >
                <a>Connect</a>
              </Link>
            </div>
          </WelcomeModal>
        </UpdateModal>
      )}
    </div>
  );
};

export default Stage5;
