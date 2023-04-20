import React from 'react'
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import tiktok from "../../assets/tiktok.svg";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import { ConnectFlex, SocialCard, SocialCardList, SocialMediaContainer } from '../../styles/profile.style';
import Image from 'next/image';
import Link from 'next/link';
import { accountMedia, getUserSocialMedia } from 'api/auth';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setLoading } from 'app/reducers/status';

const Stage5 = ({user}) => {
    const dispatch = useDispatch();
    const [listD, setListD] = useState([])
    const { data: socialData, refetch: refetchSocialData } = useQuery(["get-social-media"], async () => {
        return await getUserSocialMedia();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(data) {
            setListD(data.data.data);
            dispatch(setLoading(false));
        },
        onError(res) {
            dispatch(setLoading(false));
        } 
    });
    useEffect(() => {
      refetchSocialData();
    }, []);
    const getFacebookList = () => {
        if(socialData) {
            let list = listD.filter((val) => val.platform === "facebook");
            return list
        }
    }
    const getTwitterList = () => {
        if(socialData) {
            let list = listD.filter((val) => val.platform === "twitter");
            return list
        }
    }
    const getTiktokList = () => {
        if(socialData) {
            let list = listD.filter((val) => val.platform === "tiktok");
            return list
        }
    }
    const getYoutubeList = () => {
        if(socialData) {
            let list = listD.filter((val) => val.platform === "google");
            return list
        }
    }
    
  return (
    <div>
        <div>
            <SocialMediaContainer>
                <h1>Instagram </h1>
                <SocialCardList>
                    {getFacebookList()?.length ? (
                        getFacebookList()?.map((account) => (
                            <SocialCard>
                                <p>{account.profile_name}</p>
                                <div>
                                    <button>Set as Default</button>
                                    <button>Disconnect</button>
                                </div>
                            </SocialCard>
                        ))
                    ): <p>No instagram account connected</p>
                    }
                </SocialCardList>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=instagram&user=${user.id}`}>
                    <a>
                        <Image
                            src={instagram}
                            width={25}
                            height={25}
                            alt="social"
                        />
                        <span>Connect New Account</span>
                    </a>
                </Link>
            </SocialMediaContainer>
            <SocialMediaContainer>
                <h1>Twitter</h1>
                <SocialCardList>
                    {getTwitterList()?.length ? (
                        getTwitterList()?.map((account) => (
                            <SocialCard>
                                <p>{account.profile_name}</p>
                                <div>
                                    <button>Set as Default</button>
                                    <button>Disconnect</button>
                                </div>
                            </SocialCard>
                        ))
                    ): <p>No Twitter account connected</p>
                    }
                </SocialCardList>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=twitter&user=${user.id}`}>
                    <a>
                        <Image
                            src={twitter}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Connect New Account</span>
                    </a>
                </Link>
            </SocialMediaContainer>
            <SocialMediaContainer>
                <h1>TikTok</h1>
                <SocialCardList>
                    {getTiktokList()?.length ? (
                        getTiktokList()?.map((account) => (
                            <SocialCard>
                                <p>{account.profile_name}</p>
                                <div>
                                    <button>Set as Default</button>
                                    <button>Disconnect</button>
                                </div>
                            </SocialCard>
                        ))
                    ): <p>No Tiktok account connected</p>
                    }
                </SocialCardList>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=tiktok&user=${user.id}`}>
                    <a>
                        <Image
                            src={tiktok}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Connect New Account</span>
                    </a>
                </Link>
            </SocialMediaContainer>
            <SocialMediaContainer>
                <h1>Facebook</h1>
                <SocialCardList>
                    {getFacebookList()?.length ? (
                        getFacebookList()?.map((account) => (
                            <SocialCard>
                                <p>{account.profile_name}</p>
                                <div>
                                    <button>Set as Default</button>
                                    <button>Disconnect</button>
                                </div>
                            </SocialCard>
                        ))
                    ): <p>No Facebook account connected</p>
                    }
                </SocialCardList>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=facebook&user=${user.id}`}>
                    <a>
                        <Image
                            src={facebook}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Connect New Account</span>
                    </a>
                </Link>
            </SocialMediaContainer>
            <SocialMediaContainer>
                <h1>Youtube</h1>
                <SocialCardList>
                    {getYoutubeList()?.length ? (
                        getYoutubeList()?.map((account) => (
                            <SocialCard>
                                <p>{account.profile_name}</p>
                                <div>
                                    <button>Set as Default</button>
                                    <button>Disconnect</button>
                                </div>
                            </SocialCard>
                        ))
                    ): <p>No Youtube account connected</p>
                    }
                </SocialCardList>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=google&user=${user.id}`}>
                    <a>
                        <Image
                            src={youtube}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Connect New Account</span>
                    </a>
                </Link>
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
                                <span>Connect New Account</span>
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
    </div>
  )
}

export default Stage5