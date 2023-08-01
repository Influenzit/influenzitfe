import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getInfluencer, getInfluencers } from '../../api/influencer'
import { startConversation } from '../../api/messaging'
import { setLoading } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import LandingLayout from '../../layouts/landing.layout'
import { Controls, CreatorsCard, CreatorDetails, SocialHandle } from '../../styles/business-owner.style'
import { BackImage, Bottom, BottomSection, Campaign, CollaborateBtn, Container, HeroSectionOne, ImageContainer, ImageContainerTwo, Info, LeftSection, Listing, RightSection, SkillCard, Social, SocialWrapper, Tag, Tags, Top, UserCardSection, WorkCard, Wrapper, UserDetails, UserImage } from '../../styles/creator-profile.style'
import { AnalyticChart, AnalyticStats, AwardCard, Content, DataSection, DataSectionTwo, EmptyWrapper, ExperienceWrapper, Left, PostLayer, PostStats, PostWrapper, Right, SectionTwo, ServRate, ServStats, ServUserCard, SkillGuage, SocialPost, SocialStats, Stat, TabBtn, Tabs, TopImg, PerformanceCont, EngagementCard, StatsCard, Flex, AnalyticCard, MapWrapper, CountryList, CountrySection, Guage } from '../../styles/influencer-profile';
import { Details, FormContainer, UpdateModal } from '../../styles/view.style'
import { InputContainer } from '../../styles/profile.style'
import { createDispute } from '../../api/support'
import ServiceCard from '../../components/service-card'
import ProfileCard from '../../components/profile-card'
import { numberFormatter } from '../../helpers/helper'
import { Chart } from "react-google-charts"
import { colors } from 'styles/theme'
import { WorldMap } from 'react-svg-worldmap'
import { Country } from 'country-state-city'

const CreatorProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const user = useSelector(getUser);
    const [inData, setInData] = useState(null);
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState("instagram");
    const [showEngagePopup, setShowEngagePopup] = useState(false);
    const [showDispute, setShowDispute] = useState(false);
    const [disputeSubject, setDisputeSubject] = useState("");
    const [country] = useState(Country.getAllCountries());

    const optionsPie = {
        pieHole: 0.5,
        is3D: false,
        colors: ["#DF475C", "#2A2939"]
    };
    const generateCountryData = () => {
        let cData = [];
        JSON.parse(inData?.analytics?.youtube?.countryviews === 0 ? false : inData?.analytics?.youtube?.countryviews ?? "[]").forEach((val, i) => (
            cData.push({
                country: val[0].toLocaleLowerCase(),
                value: val[1]
            })
        ))
        return cData.sort((a,b) => b.value - a.value);
    }
    const generateICountryData = () => {
        let cData = [];
        let countryObj = JSON.parse(inData?.analytics?.instagram?.audience_country ?? "{}")
        Object.keys(countryObj).forEach((val, i) => (
            cData.push({
                country: val.toLocaleLowerCase(),
                value: countryObj[val]
            })
        ))
        return cData.sort((a,b) => b.value - a.value);
    }
    const generateTotalCount = () => {
        let cData = 0;
        JSON.parse(inData?.analytics?.youtube?.countryviews === 0 ? false : inData?.analytics?.youtube?.countryviews ?? "[]").forEach((val, i) => (
            cData += val[1]
        ))
        return cData;
    }
    const generateITotalCount = () => {
        let cData = 0;
        generateICountryData()?.forEach((val, i) => (
            cData += val.value
        ))
        return cData;
    }
    const getTopFive = () => {
        let topFive = [];
        generateCountryData()?.forEach((val) => {
            if (topFive.length < 6) {
                topFive.push(val)
            } else {
                if (topFive.some((valu) => valu.value < val.value)) {
                    topFive.push(val);
                    topFive.splice(topFive.lastIndexOf(topFive.filter((valu) => valu.value < val.value)[0]), 1);
                }
                
            }
        })
        return topFive;
    }
    const getITopFive = () => {
        let topFive = [];
        generateICountryData()?.forEach((val) => {
            if (topFive.length < 6) {
                topFive.push(val)
            } else {
                if (topFive.some((valu) => valu.value < val.value)) {
                    topFive.push(val);
                    topFive.splice(topFive.lastIndexOf(topFive.filter((valu) => valu.value < val.value)[0]), 1);
                }
                
            }
        })
        return topFive;
    }
    const generateGenderData = () => {
        const eData = [
            ["Gender", "Count"],
            ...JSON.parse(inData?.analytics?.youtube?.genderviewerPercentage === 0 ? false : inData?.analytics?.youtube?.genderviewerPercentage ?? "[]")
        ]
        return eData;
    }
    const [disputeMessage, setDisputeMessage] = useState("");
    const { data: influencerData, refetch: refetchInfluencerData } = useQuery(["get-influencer"], async () => {
        return await getInfluencer(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess() {
            dispatch(setLoading(false));
        },
        onError(res) {
            dispatch(setLoading(false));
        }
    });
    const { data: influencersData, refetch: refetchInfluencersData } = useQuery(["get-influencers"], async () => {
        return await getInfluencers("");
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });
    const startConversationMutation = useMutation((data) => {
        return startConversation(data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if (res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({ error: true, message: res.message }));
            } else {
                router.push("/dashboard/messages");
            }
        },
        onError(error) {
            const res = error.response.data;
            if (res) {
                dispatch(setError({ error: true, message: res.message }));
                return;
            }
            dispatch(setError({ error: true, message: "An error occured" }));
        }
    });
    const handleLinkCopy = () => {
        navigator.clipboard.writeText(location.href);
        toast.success("Profile URL copied to clipboard", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const createDisputeMutation = useMutation(disputeData => {
        return createDispute(disputeData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if (res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({ error: true, message: res.message }));
            } else {
                dispatch(setLoading(false));
                toast.success("Dispute created successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setShowDispute(false);
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
        }
    });
    const handleStartConversation = () => {
        if (user?.id) {
            startConversationMutation.mutate({
                to_user_id: inData?.user_id,
                text: "Hi " + inData?.user?.firstname,
            })
        } else {
            toast.error("Please login to start a conversation", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const handleReportAccount = () => {
        if (user?.id) {
            setShowDispute(true);
        } else {
            toast.error("Please login before you can report account", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const handleCreateDispute = () => {
        if (!disputeSubject && !disputeSubject) {
            return;
        } else {
            dispatch(setLoading(true));
            createDisputeMutation.mutate({
                subject: disputeSubject,
                message: disputeMessage,
                account_id: id,
            })
        }
    }
    const getCoverImages = (list) => {
        const checker = ["cover_img_1", "cover_img_2", "cover_img_3", "cover_img_4"]
        return list?.filter((val) => checker.includes(val.identifier))
    }
    useEffect(() => {
        refetchInfluencersData();
        if (id) {
            refetchInfluencerData();
        }
    }, [router.pathname, id]);
    useEffect(() => {
        if (influencerData?.data?.data) {
            setInData(influencerData?.data?.data);
        }
    }, [influencerData])
    const generateRatingText = (num) => {
        console.log(num)
        if(num < 2) {
            return "average";
        } else if ((num > 2) && (num < 5)) {
            return "good";
        } else {
            return "excellent";
        }
    }
    return (

        <Container>
            {inData ? 
            <>
            <HeroSectionOne>
                {/* <BackImage>
                <UserCard>
                    <ProfileStats>
                        <ProfileImgCont>
                            <Image src={inData?.media?.[0]?.url ? inData?.media?.[0]?.url : `https://ui-avatars.com/api/?name=${inData?.user?.firstname}+${inData?.user?.lastname}&color=FFFFFF&background=12544D`}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                        </ProfileImgCont>
                        <ProfileData>
                            <div>
                                <Image src="/users.svg" height={20} width={20} />
                                <span>{inData?.gender}</span>
                            </div>
                            <div>
                                <Image src="/verified.svg" height={20} width={20} />
                                <span>Verified</span>
                            </div>
                        </ProfileData>
                        <p>0/5 (<span>0 Feedbacks</span>)</p>
                        <p>Member since {(new Date(inData?.created_at).toDateString())}</p>
                        <button onClick={handleLinkCopy}>Share Profile</button>
                    </ProfileStats>
                    <ProfileDetails>
                        <h2>{inData?.user?.firstname} {inData?.user.lastname}</h2>
                        <ProfileCategory>
                            <div><Image src="/niche.svg" height={25} width={25}/><p>Influencer&apos;s Niche</p></div>
                            <div><Image src="/flag.svg" height={25} width={25}/><p>Nigeria</p></div>
                            <div><Image src="/instagram.svg" height={25} width={25}/><p>{inData?.instagram}</p> <span>0</span></div>
                        </ProfileCategory>
                        <p>{inData?.biography}</p>
                        <SeeMoreCont>
                            <button>Click to see more</button>
                        </SeeMoreCont>
                        
                    </ProfileDetails>
                    <Stats>
                        <StatWrapper>
                            <StatCard textColor='#2B368C' bgColor="#F9F9FC">
                                <h3>{inData?.analytics?.influenzit?.ongoing_campaigns_count}</h3>
                                <p>Ongoing Engagements</p>
                            </StatCard>
                            <StatCard textColor='#019B2C' bgColor="#F7FCF9">
                                <h3>{inData?.analytics?.influenzit?.completed_campaigns_count}</h3>
                                <p>Completed Campaigns</p>
                            </StatCard>
                            <StatCard textColor='#FF0000' bgColor="#FFF7F7">
                                <h3>{inData?.analytics?.influenzit?.cancelled_campaigns_count}</h3>
                                <p>Cancelled Engagements</p>
                            </StatCard>
                            <StatCard textColor='#000' bgColor="#F8F8F8">
                                <h3>{inData?.analytics?.influenzit?.campaign_engagements}</h3>
                                <p>Total Engagement</p>
                            </StatCard> 
                        </StatWrapper>
                        <p>Send Offer to this creator by clicking on the button.</p>
                        <button onClick={() => setShowEngagePopup(!showEngagePopup)}>
                            <span>Engage Influencer</span> <Image src="/down-chev.svg" height={10} width={10} />
                            <Popup show={showEngagePopup}>
                                <button onClick={handleStartConversation}>
                                    <span>Send a message</span><Image src="/arr-r.svg" height={10} width={10} />
                                </button>
                                <button onClick={handleReportAccount}>
                                    <span>Report Account</span><Image src="/arr-r.svg" height={10} width={10} />
                                </button>
                            </Popup>
                        </button>
                    </Stats>
                </UserCard>
            </BackImage> */}

                <Wrapper>
                    {
                        (getCoverImages(inData?.media)?.length === 1) && (
                            <ImageContainer>
                                <div id="img">
                                    <Image src={getCoverImages(inData?.media)[0]?.url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                </div>
                            </ImageContainer>
                        )
                    }
                    {
                        (getCoverImages(inData?.media)?.length === 2) && (
                            <ImageContainerTwo>
                                <div className='wrap'>
                                    <Image src={getCoverImages(inData?.media)[0].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                </div>
                                <div className='wrap'>
                                    <Image src={getCoverImages(inData?.media)[1].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                </div>
                            </ImageContainerTwo>
                        )
                    }
                    {
                        (getCoverImages(inData?.media)?.length === 3) && (
                            <ImageContainerTwo>
                                <div className='wrap'>
                                    <Image src={getCoverImages(inData?.media)[0].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                </div>
                                <div className="wrap">
                                    <div className='wrap-top'>
                                        <Image src={getCoverImages(inData?.media)[1].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                    </div>
                                    <div className='wrap-bottom'>
                                        <Image src={getCoverImages(inData?.media)[2].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                    </div>
                                </div>
                            </ImageContainerTwo>
                        )
                    }
                    {
                        (getCoverImages(inData?.media)?.length === 4) && (
                            <ImageContainerTwo>
                                <div className='wrap'>
                                    <Image src={getCoverImages(inData?.media)[0].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                </div>
                                <div className='wrap'>
                                    <div className='wrap-top'>
                                        <Image src={getCoverImages(inData?.media)[1].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                    </div>
                                    <div className='wrap-bottom'>
                                        <div>
                                            <Image src={getCoverImages(inData?.media)[2].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                        </div>
                                        <div>
                                            <Image src={getCoverImages(inData?.media)[3].url} alt="" layout='fill' objectPosition="top center" objectFit="cover" />
                                        </div>
                                    </div>
                                </div>
                            </ImageContainerTwo>
                        )
                    }
                    <BottomSection>
                        <LeftSection>
                            <UserCardSection>
                                <UserDetails>
                                    <h2>{inData?.user?.name}</h2>
                                    <div>
                                        <p>
                                            <Image src="/nigeria.svg" alt="" height={16} width={16} />
                                            <span>Nigeria</span>
                                        </p>
                                        <Image src="/dot.svg" alt="" height={4} width={4} />
                                        <p>
                                            <Image src="/gender.svg" alt="" height={16} width={16} />
                                            <span>{inData?.gender}</span>
                                        </p>
                                        <Image src="/dot.svg" alt="" height={4} width={4} />
                                        <p>
                                            <Image src="/star-p.svg" alt="" height={16} width={16} />
                                            <span>{inData?.rating.rating_count} ({inData?.rating.reviews_count} ratings)</span>
                                        </p>
                                    </div>
                                </UserDetails>
                                <UserImage>
                                    <Image src={inData?.user?.profile_pic} alt="" layout='fill' objectPosition="center" objectFit="cover" />
                                </UserImage>
                            </UserCardSection>
                            <Info>
                                <h3>{inData?.headline}</h3>
                                <p>{inData?.biography}</p>
                                <Tags>
                                    {
                                        inData?.skills.map((val, i) => (
                                            <Tag key={i}>{val.name}</Tag>
                                        ))
                                    }
                                </Tags>
                            </Info>
                            <DataSection>
                                <Tabs>
                                    <TabBtn isActive={currentTab === "instagram"} onClick={() => setCurrentTab("instagram")}>Instagram</TabBtn>
                                    <TabBtn isActive={currentTab === "youtube"} onClick={() => setCurrentTab("youtube")}>Youtube</TabBtn>
                                    <TabBtn isActive={currentTab === "facebook"} onClick={() => setCurrentTab("facebook")}>Facebook</TabBtn>
                                    {/* <TabBtn isActive={currentTab === "twitter"} onClick={() => setCurrentTab("twitter")}>Twitter</TabBtn> */}
                                    <TabBtn isActive={currentTab === "tiktok"} onClick={() => setCurrentTab("tiktok")}>TikTok</TabBtn>
                                </Tabs>
                                {
                                    currentTab === "instagram" && inData?.analytics?.instagram && inData?.analytics?.options?.instagram_source === "facebook" ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.instagram?.followers_count))}</h1>
                                                    <p>Followers</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(inData?.analytics?.instagram?.reach)}</h1>
                                                    <p>Reach</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{inData?.analytics?.instagram?.impressions}</h1>
                                                    <p>Impressions</p>
                                                </Stat>
                                            </AnalyticStats>
                                            <h3>Audience Insights</h3>
                                            <AnalyticChart>
                                                <MapWrapper>
                                                    <AnalyticCard style={{ border: "none" }}>
                                                        <h2>Audience Location</h2>
                                                        <WorldMap color={colors.primaryColor} size="lg" data={generateICountryData()} />
                                                    </AnalyticCard>
                                                    <CountryList>
                                                        {
                                                            getITopFive().map((val, i) => (
                                                                <CountrySection key={i}>
                                                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: colors.textColor }}>
                                                                        <p>{country.filter((valu) => valu.isoCode.toLocaleLowerCase() === val.country)[0].flag} {country.filter((valu) => valu.isoCode.toLocaleLowerCase() === val.country)[0].name}</p>
                                                                        <div>{(((val.value) / generateITotalCount()) * 100).toFixed(2)}%</div>
                                                                    </div>
                                                                    <Guage guage={(((val.value) / generateITotalCount()) * 100).toFixed(2)}/>
                                                                </CountrySection>
                                                            ))
                                                        }
                                                    </CountryList>
                                                </MapWrapper>
                                            </AnalyticChart>
                                            <PerformanceCont>
                                                <Flex>
                                                    <EngagementCard>
                                                        <h3>Engagement Rate</h3>
                                                        <div id="wrapper">
                                                            <h1>{inData?.analytics?.instagram?.engagement_rate ?? 0}%</h1>
                                                            <div>
                                                                <p>{generateRatingText(Number(inData?.analytics?.instagram?.engagement_rate ?? "0"))}</p>
                                                            </div>
                                                        </div>
                                                    </EngagementCard>
                                                    <StatsCard>
                                                        <h3>Avg. likes per post</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/heart-p.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.instagram?.likes))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                                <Flex>
                                                    <StatsCard>
                                                        <h3>Avg. comments per post</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/comment.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.instagram?.comments))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                    <StatsCard>
                                                        <h3>Profile views</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/eye.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(inData?.analytics?.instagram?.profile_views)}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                            </PerformanceCont>
                                        </Content>
                                    ) : (currentTab === "instagram") && inData?.analytics?.options?.instagram_source === "facebook" && (
                                        <Content>
                                            <EmptyWrapper>
                                                <Image src="/empty.png" alt="" height={120} width={120} />
                                                <h3>Instagram not connected yet</h3>
                                            </EmptyWrapper>
                                        </Content>
                                    )
                                }
                                {
                                    currentTab === "facebook" && inData?.analytics?.facebook ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats style={{ marginBottom: "20px" }}>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.facebook?.page_fans))}</h1>
                                                    <p>Followers</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(inData?.analytics?.facebook?.count)}</h1>
                                                    <p>Reach</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{inData?.analytics?.facebook?.engagement}%</h1>
                                                    <p>Engagement</p>
                                                </Stat>
                                            </AnalyticStats>

                                            <PerformanceCont>
                                                <Flex className='flex'>
                                                    <EngagementCard>
                                                        <h3>Engagement Rate</h3>
                                                        <div id="wrapper">
                                                            <h1>{inData?.analytics?.facebook?.engagement}%</h1>
                                                            <div>
                                                                <p>Average</p>
                                                                <span>Higher than 60% of influencers</span>
                                                            </div>
                                                        </div>
                                                    </EngagementCard>
                                                    <StatsCard>
                                                        <h3>Avg. likes per post</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/heart-p.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.facebook?.page_like_total))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                                <Flex className='flex'>
                                                    <StatsCard>
                                                        <h3>Impressions</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/comment.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.facebook?.page_impressions))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                    <StatsCard>
                                                        <h3>Profile views</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/eye.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(inData?.analytics?.facebook?.page_views_total)}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                            </PerformanceCont>
                                        </Content>
                                    ) : (currentTab === "facebook") && (
                                        <Content>
                                            <EmptyWrapper>
                                                <Image src="/empty.png" alt="" height={120} width={120} />
                                                <h3>Facebook not connected yet</h3>
                                            </EmptyWrapper>
                                        </Content>
                                    )
                                }
                                {
                                    currentTab === "instagram" && inData?.analytics?.instagram_ensemble && inData?.analytics?.options?.instagram_source === "ensemble" ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats style={{ marginBottom: "20px" }}>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.instagram_ensemble?.followers_count))}</h1>
                                                    <p>Followers</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(inData?.analytics?.instagram_ensemble?.follows_count)}</h1>
                                                    <p>Follow</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{Number(inData?.analytics?.instagram_ensemble?.engagement_rate ?? "0").toFixed(2)}%</h1>
                                                    <p>Engagement</p>
                                                </Stat>
                                            </AnalyticStats>

                                            <PerformanceCont>
                                                <Flex className='flex'>
                                                    <EngagementCard>
                                                        <h3>Engagement Rate</h3>
                                                        <div id="wrapper">
                                                            <h1>{Number(inData?.analytics?.instagram_ensemble?.engagement_rate ?? "0").toFixed(2)}%</h1>
                                                            <div>
                                                                <p>{generateRatingText(Number(inData?.analytics?.instagram_ensemble?.engagement_rate ?? "0"))}</p>
                                                                {/* <span>Higher than 60% of influencers</span> */}
                                                            </div>
                                                        </div>
                                                    </EngagementCard>
                                                    <StatsCard>
                                                        <h3>Avg. likes per post</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/heart-p.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.instagram_ensemble?.average_likes))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                                <Flex className='flex'>
                                                    <StatsCard>
                                                        <h3>Avg. comments per post</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/comment.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.instagram_ensemble?.average_comments))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                    {/* <StatsCard>
                                                        <h3>Profile views</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/eye.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(inData?.analytics?.facebook?.page_views_total)}</h1>
                                                        </div>
                                                    </StatsCard> */}
                                                </Flex>
                                            </PerformanceCont>
                                        </Content>
                                    ) : (currentTab === "instagram") && (
                                        <Content>
                                            <EmptyWrapper>
                                                <Image src="/empty.png" alt="" height={120} width={120} />
                                                <h3>Instagram not connected yet</h3>
                                            </EmptyWrapper>
                                        </Content>
                                    )
                                }
                                {
                                    currentTab === "twitter" && inData?.analytics?.twitter ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats style={{ marginBottom: "20px" }}>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.twitter?.following_count))}</h1>
                                                    <p>Following</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.twitter?.followers_count))}</h1>
                                                    <p>Followers</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.twitter?.tweet_count))}</h1>
                                                    <p>Tweet Count</p>
                                                </Stat>
                                            </AnalyticStats>
                                        </Content>
                                    ) : (currentTab === "twitter") && (
                                        <Content>
                                            <EmptyWrapper>
                                                <Image src="/empty.png" alt="" height={120} width={120} />
                                                <h3>Twitter not connected yet</h3>
                                            </EmptyWrapper>
                                        </Content>
                                    )
                                }
                                {
                                    currentTab === "tiktok" && inData?.analytics?.tiktok ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats style={{ marginBottom: "20px" }}>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.tiktok?.following_count))}</h1>
                                                    <p>Following</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.tiktok?.follower_count))}</h1>
                                                    <p>Followers</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.tiktok?.likes_count))}</h1>
                                                    <p>Likes Count</p>
                                                </Stat>
                                            </AnalyticStats>
                                        </Content>
                                    ) : (currentTab === "tiktok") && (
                                        <Content>
                                            <EmptyWrapper>
                                                <Image src="/empty.png" alt="" height={120} width={120} />
                                                <h3>TikTok not connected yet</h3>
                                            </EmptyWrapper>
                                        </Content>
                                    )
                                }
                                {
                                    currentTab === "youtube" && inData?.analytics?.youtube ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.youtube?.subscribersGained))}</h1>
                                                    <p>Subscribers</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(inData?.analytics?.youtube?.views)}</h1>
                                                    <p>Total video views</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{numberFormatter(inData?.analytics?.youtube?.estimatedMinutesWatched)}</h1>
                                                    <p>Estimatated Minutes Watched</p>
                                                </Stat>
                                            </AnalyticStats>
                                            <h3>Audience Insights</h3>
                                            <AnalyticChart>
                                                <AnalyticCard>
                                                    <h2>Gender</h2>
                                                    <Chart
                                                        chartType="PieChart"
                                                        width="100%"
                                                        height="400px"
                                                        data={generateGenderData()}
                                                        options={optionsPie}
                                                    />
                                                </AnalyticCard>
                                                <MapWrapper>
                                                    <AnalyticCard style={{ border: "none" }}>
                                                        <h2>Audience Location</h2>
                                                        <WorldMap color={colors.primaryColor} size="lg" data={generateCountryData()} />
                                                    </AnalyticCard>
                                                    <CountryList>
                                                        {
                                                            getTopFive().map((val, i) => (
                                                                <CountrySection key={i}>
                                                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: colors.textColor }}>
                                                                        <p>{country.filter((valu) => valu.isoCode.toLocaleLowerCase() === val.country)[0].flag} {country.filter((valu) => valu.isoCode.toLocaleLowerCase() === val.country)[0].name}</p>
                                                                        <div>{(((val.value) / generateTotalCount()) * 100).toFixed(2)}%</div>
                                                                    </div>
                                                                    <Guage guage={(((val.value) / generateTotalCount()) * 100).toFixed(2)}/>
                                                                </CountrySection>
                                                            ))
                                                        }
                                                    </CountryList>
                                                </MapWrapper>
                                            </AnalyticChart>
                                            <h3>Performance</h3>
                                            <PerformanceCont>
                                                <Flex>
                                                    <EngagementCard>
                                                        <h3>Avg. view percentage</h3>
                                                        <div id="wrapper">
                                                            <h1>{inData?.analytics?.youtube?.averageViewPercentage}%</h1>
                                                            <div>
                                                                <p>Average</p>
                                                                <span>Higher than 60% of influencers</span>
                                                            </div>
                                                        </div>
                                                    </EngagementCard>
                                                    <StatsCard>
                                                        <h3>Avg. likes per video</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/heart-p.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.youtube?.likes))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                                <Flex>
                                                    <StatsCard>
                                                        <h3>Avg. comments per video</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/comment.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(Number(inData?.analytics?.youtube?.comments))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                    <StatsCard>
                                                        <h3>Avg. views per video</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/eye.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(inData?.analytics?.youtube?.averageViewDuration)}</h1>
                                                        </div>
                                                    </StatsCard>
                                                </Flex>
                                                <div style={{ marginTop: "20px" }}>
                                                    <Image src={"/youtube-full.png"} height={35} width={156.1} />
                                                </div>
                                            </PerformanceCont>
                                        </Content>
                                    ) : (currentTab === "youtube") && (
                                        <Content>
                                            <EmptyWrapper>
                                                <Image src="/empty.png" alt="" height={120} width={120} />
                                                <h3>Youtube not connected yet</h3>
                                            </EmptyWrapper>
                                        </Content>
                                    )
                                }
                            </DataSection>
                        </LeftSection>
                        <RightSection>
                            <h3>Social Media Handles</h3>
                            <SocialWrapper>
                                <Social>
                                    <div>
                                        <Image src="/instagram.png" alt="" height={32} width={32} />
                                    </div>
                                    <div>
                                        <h4>INSTAGRAM</h4>
                                        <p title={inData?.instagram}>@{inData?.instagram}</p>
                                    </div>
                                </Social>
                                <Social>
                                    <div>
                                        <Image src="/youtube.svg" alt="" height={32} width={32} />
                                    </div>
                                    <div>
                                        <h4>YOUTUBE</h4>
                                        <p title={inData?.youtube}>@{inData?.youtube}</p>
                                    </div>
                                </Social>
                            </SocialWrapper>
                            <SocialWrapper>
                                <Social>
                                    <div>
                                        <Image src="/tiktok.png" alt="" height={32} width={32} />
                                    </div>
                                    <div>
                                        <h4>TIKTOK</h4>
                                        <p title={inData?.tiktok}>@{inData?.tiktok}</p>
                                    </div>
                                </Social>
                                <Social>
                                    <div>
                                        <Image src="/twitter.png" alt="" height={32} width={32} />
                                    </div>
                                    <div>
                                        <h4>TWITTER</h4>
                                        <p title={inData?.twitter}>@{inData?.twitter}</p>
                                    </div>
                                </Social>
                            </SocialWrapper>
                            <SocialWrapper>
                                <Social style={{ minWidth: "100%" }}>
                                    <div>
                                        <Image src="/facebook.png" alt="" height={32} width={32} />
                                    </div>
                                    <div>
                                        <h4>FACEBOOK</h4>
                                        <p title={inData?.facebook}>@{inData?.facebook}</p>
                                    </div>
                                </Social>
                            </SocialWrapper>
                            <CollaborateBtn onClick={handleStartConversation}>
                                <Image src="/envelope.svg" alt="" height={28} width={28} />
                                <span>Collaborate with Influencer</span>
                            </CollaborateBtn>
                            <h3>Performance</h3>
                            <Campaign>
                                <div className='cont'>
                                    <h1>{inData?.analytics?.influenzit.completed_campaigns_count}</h1>
                                    <p>Completed <br /> Campaigns</p>
                                </div>
                                <div className='cont'>
                                    <h1>{inData?.rating.rating_count}</h1>
                                    <div>
                                        <Image src="/star-p.svg" alt="" height={15} width={15} />
                                        <Image src="/star-p.svg" alt="" height={15} width={15} />
                                        <Image src="/star-p.svg" alt="" height={15} width={15} />
                                        <Image src="/star-p.svg" alt="" height={15} width={15} />
                                        <Image src="/star-p.svg" alt="" height={15} width={15} />
                                    </div>
                                    <p>{inData?.rating.reviews_count} ratings</p>
                                </div>
                            </Campaign>
                        </RightSection>
                    </BottomSection>
                    {/* {inData?.services.length ?
                        <Listing>
                            <h3>Services</h3>
                            <Bottom style={{ columnGap: "15px" }}>
                                {
                                    inData?.services.map((val, i) => (
                                        <ServiceCard
                                            key={i}
                                            title={val.name}
                                            imgSrc={val.media[0]?.url ?? "/web-services.jpg"}
                                            userName={inData?.user?.name}
                                            price={`${val.currency} ${val.starting_from}`}
                                            serviceLink={`/services/${val.id}`}
                                            profileImg={inData?.user?.profile_pic}
                                        />
                                    ))
                                }
                            </Bottom>
                        </Listing> : null
                    } */}
                    {/* {inData?.services.length ?
                    <Listing>
                        <h3>Portfolio</h3>
                        <Bottom style={{ columnGap: "15px"}}>
                            {
                            inData?.services.map((val, i) => (
                                <ServiceCard
                                    key={i}
                                    title={val.name}
                                    imgSrc={val.media[0]?.url ?? "/web-services.jpg"}
                                    userName={inData?.user?.name}
                                    price={`${val.currency} ${val.starting_from}`}
                                    serviceLink={`/services/${val.id}`}
                                    profileImg={inData?.user?.profile_pic}
                                />
                            )) 
                            }
                        </Bottom>
                    </Listing> : null
                } */}
                    {/* {inData?.reviews.length ?
                    <Listing>
                        <h3>Reviews</h3>
                        <Bottom style={{ columnGap: "15px"}}>
                            {
                                inData?.services.map((val, i) => (
                                   <ReviewCard>
                                        <h3>Testimonial Heading</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget leo rutrum, ullamcorper dolor eu, faucibus massa.</p>
                                        <UserCard>
                                            <UserImage>
                                            <Image src="/review.png" alt="review-img" layout="fill" objectFit="cover" objectPosition="center"/>
                                            </UserImage>
                                            <UserDetails>
                                            <h4>Aaron Musk</h4>
                                            <p>CEO at Krystal Bag Palace</p>
                                            </UserDetails>
                                        </UserCard>
                                    </ReviewCard>
                                )) 
                            }
                        </Bottom>
                    </Listing> : null
                } */}
                    <Listing>
                        {inData?.similar.length ? <h3>Similar influencers</h3> : null}
                        <Bottom>
                            {
                                inData?.similar.map((val, i) => {
                                    let genSkills = "";
                                    val?.skills?.forEach((val, i) => {
                                        if (i < 5) {
                                            if (i !== 0) {
                                                genSkills += `| ${val.name} `
                                            } else {
                                                genSkills += `${val.name} `
                                            }
                                        }
                                    })
                                    return <ProfileCard
                                        key={i}
                                        profileLink={`/influencers/${val.id}`}
                                        imgSrc={val?.user?.profile_pic}
                                        handle={val.twitter}
                                        name={`${val.user.firstname} ${val.user.lastname}`}
                                        sex={val.gender}
                                        skills={genSkills}
                                        address={val.address}
                                        platforms={val}
                                    />
                                })
                            }
                        </Bottom>
                    </Listing>
                </Wrapper>
            </HeroSectionOne>
            {showDispute && (
                <UpdateModal>
                    <FormContainer>
                        <h3>Report Account</h3>
                        <InputContainer>
                            <label>Subject</label>
                            <input type="text"
                                value={disputeSubject}
                                onChange={(e) => setDisputeSubject(e.target.value)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Message</label>
                            <textarea
                                value={disputeMessage}
                                onChange={(e) => setDisputeMessage(e.target.value)}
                            >
                            </textarea>
                        </InputContainer>
                        <button onClick={() => setShowDispute(false)}>Go back</button>
                        <button onClick={handleCreateDispute}>Create Dispute</button>
                    </FormContainer>
                </UpdateModal>
            )}
            </> : <div style={{ minHeight: "50vh", display: "flex", alignItems: 'center', justifyContent: "center" }}><p style={{ textAlign: 'center' }}>Fetching Influencer...</p></div>
            }
        </Container>
    )
}
CreatorProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CreatorProfile