import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getInfluencer, getInfluencers } from '../../../../../../api/influencer'
import { startConversation } from '../../../../../../api/messaging'
import { setLoading } from '../../../../../../app/reducers/status'
import { getUser } from '../../../../../../app/reducers/user'
import LandingLayout from '../../../../../../layouts/landing.layout'
import { Controls, CreatorsCard, CreatorDetails, SocialHandle } from '../../../../../../styles/business-owner.style'
import { BackImage, Bottom, BottomSection, Campaign, CollaborateBtn, Container, HeroSectionOne, ImageContainer, ImageContainerTwo, Info, LeftSection, Listing, RightSection, SkillCard, Social, SocialWrapper, Tag, Tags, Top, UserCardSection, WorkCard, Wrapper, UserDetails, UserImage } from '../../../../../../styles/creator-profile.style'
import { AnalyticChart, AnalyticStats, AwardCard, Content, DataSection, DataSectionTwo, EmptyWrapper, ExperienceWrapper, Left, PostLayer, PostStats, PostWrapper, Right, SectionTwo, ServRate, ServStats, ServUserCard, SkillGuage, SocialPost, SocialStats, Stat, TabBtn, Tabs, TopImg, PerformanceCont, EngagementCard, StatsCard, Flex, AnalyticCard, MapWrapper, CountryList, CountrySection, Guage } from '../../../../../../styles/influencer-profile';
import { Details, FormContainer, UpdateModal } from '../../../../../../styles/view.style'
import { InputContainer } from '../../../../../../styles/profile.style'
import { createDispute } from '../../../../../../api/support'
import ServiceCard from '../../../../../../components/service-card'
import ProfileCard from '../../../../../../components/profile-card'
import { numberFormatter } from '../../../../../../helpers/helper'
import { Chart } from "react-google-charts"
import { colors } from 'styles/theme'
import { WorldMap } from 'react-svg-worldmap'
import { Country } from 'country-state-city'
import AdminLayout from 'layouts/admin.layout'
import { getSingleUser, updateAccountAdmin } from 'api/admin'
import { ProjectCard, ProjectDetails, UserMiniCard } from 'styles/dashboard'
import { ActionBtn, TBody, THead, Table, TableContent, TableHeader, TableWrapped, TableWrapper, Td, Th, Tr, TrH } from 'styles/connect-pages.style'

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
        let countryObj = JSON.parse(inData?.analytics?.instagram_insights?.audience_country ?? "{}")
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
    const { data: userData, refetch: refetchUserData } = useQuery(["get-single-account"], async () => {
        return await getSingleUser(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            if(res.data.data) {
                setInData(res.data.data);
            }
        },
        onError() {
            dispatch(setLoading(false))
        }
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
                to_user_id: inData.user_id,
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
    const updateAccountMutation = useMutation(
        (data) => {
          return updateAccountAdmin(id, data);
        },
        {
          onSuccess(successRes) {
            const res = successRes.data;
            toast.success("Account verified successfully", {
                position: toast.POSITION.TOP_RIGHT
              });
            dispatch(setLoading(false));
            refetchUserData();
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
      const handleSocialToggle = (key, value) => {
        dispatch(setLoading(true));
        updateAccountMutation.mutate({
            [key]: value
        });
      }
    useEffect(() => {
        dispatch(setLoading(true));
        if (id) {
            refetchUserData();
        }
    }, [router.pathname, id]);
    useEffect(() => {
        if (userData?.data?.data) {
            setInData(userData?.data?.data);
        }
    }, [userData])
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
        <Container style={{ padding: "20px" }}>
            <HeroSectionOne>
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
                        <LeftSection style={{ width: "100%" }}>
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
                            <TableWrapped style={{ marginTop: "50px" }}>
                                <TableHeader>
                                    <h2>Social Handles</h2>
                                </TableHeader>
                                <TableWrapper style={{ marginBottom: "15px" }}>
                                    <TableContent>
                                    <Table>
                                        <THead>
                                            <TrH>
                                                <Th cellWidth="370px">Social Media</Th>
                                                <Th cellWidth="250px">Handle</Th>
                                                <Th cellWidth="120px">Status</Th>
                                                <Th cellWidth="200px">Action</Th>
                                            </TrH>
                                        </THead>
                                        <TBody>
                                            <Tr>
                                                <Td
                                                cellWidth="370px">Instagram</Td>
                                                <Td cellWidth="250px">@{inData?.instagram}</Td>
                                                <Td cellWidth="120px">{inData?.instagram_verified ? "Verified" : "Not Verified"}</Td>
                                                <Td cellWidth="200px" style={{ display: "flex",  justifyContent: "space-between", paddingRight: "20px" }}>
                                                    <ActionBtn onClick={() => handleSocialToggle("instagram_verified", !inData?.instagram_verified)}>{inData?.instagram_verified ? "Disapprove" : "Approve"}</ActionBtn>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td cellWidth="370px">Facebook</Td>
                                                <Td cellWidth="250px">@{inData?.facebook}</Td>
                                                <Td cellWidth="120px">{inData?.facebook_verified ? "Verified" : "Not Verified"}</Td>
                                                <Td cellWidth="200px" style={{ display: "flex",  justifyContent: "space-between", paddingRight: "20px" }}>
                                                    <ActionBtn onClick={() => handleSocialToggle("facebook_verified", !inData?.facebook_verified)}>{inData?.facebook_verified ? "Disapprove" : "Approve"}</ActionBtn>
                                                </Td>
                                            </Tr>
                                        </TBody>
                                    </Table>
                                    </TableContent>
                                </TableWrapper>
                            </TableWrapped>
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
                                    <TabBtn isActive={currentTab === "twitter"} onClick={() => setCurrentTab("twitter")}>Twitter</TabBtn>
                                    <TabBtn isActive={currentTab === "tiktok"} onClick={() => setCurrentTab("tiktok")}>TikTok</TabBtn>
                                    <TabBtn isActive={currentTab === "services"} onClick={() => setCurrentTab("services")}>Services</TabBtn>
                                    <TabBtn isActive={currentTab === "businesses"} onClick={() => setCurrentTab("businesses")}>Businesses</TabBtn>
                                </Tabs>
                                {
                                    currentTab === "instagram" && inData?.instagram_verified ? (
                                        <Content>
                                            <h3>Influencer Summary</h3>
                                            <AnalyticStats>
                                                <Stat>
                                                    <h1>{numberFormatter(Number(inData?.analytics?.instagram_insights?.follower_count))}</h1>
                                                    <p>Followers</p>
                                                </Stat>
                                                <Stat isCenter>
                                                    <h1>{numberFormatter(inData?.analytics?.instagram_insights?.reach)}</h1>
                                                    <p>Reach</p>
                                                </Stat>
                                                <Stat>
                                                    <h1>{inData?.analytics?.instagram_insights?.impressions}</h1>
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
                                                            <h1>{inData?.analytics?.instagram_insights?.engagement_rate ?? 0}%</h1>
                                                            <div>
                                                                <p>{generateRatingText(Number(inData?.analytics?.instagram_insights?.engagement_rate ?? "0"))}</p>
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
                                                            <h1>{numberFormatter(Number(inData?.analytics?.instagram_insights?.likes))}</h1>
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
                                                            <h1>{numberFormatter(Number(inData?.analytics?.instagram_insights?.comments))}</h1>
                                                        </div>
                                                    </StatsCard>
                                                    <StatsCard>
                                                        <h3>Profile views</h3>
                                                        <div>
                                                            <span>
                                                                <Image src="/eye.svg" alt="heart" height={25} width={25} />
                                                            </span>
                                                            <h1>{numberFormatter(inData?.analytics?.instagram_insights?.profile_views)}</h1>
                                                        </div>
                                                    </StatsCard>
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
                                    currentTab === "facebook" && inData?.facebook_verified ? (
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
                                                <Flex>
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
                                                <Flex>
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
                                    currentTab === "twitter" && inData?.twitter_verified ? (
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
                                    currentTab === "tiktok" && inData?.tiktok_verified ? (
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
                                    currentTab === "youtube" && inData?.youtube_verified ? (
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
                                {
                                    currentTab === "services" && (
                                        inData?.services.length ?
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
                                        </Listing> : (
                                            <Content>
                                                <EmptyWrapper>
                                                    <Image src="/empty.png" alt="" height={120} width={120} />
                                                    <h3>No Service</h3>
                                                </EmptyWrapper>
                                            </Content>
                                        )
                                        
                                    )
                                }
                                {
                                    currentTab === "businesses" && (
                                        inData?.businesses.length ?
                                        <Listing>
                                            <h3>Businesses</h3>
                                            <Bottom style={{ columnGap: "15px" }}>
                                                {
                                                    inData?.businesses.map((val, i) => (
                                                        <div key={i}>
                                                            <ProjectCard>
                                                                <UserMiniCard>
                                                                    <div>
                                                                        <h4>{val.name}</h4>
                                                                        <p>{val.email}</p>
                                                                    </div>
                                                                </UserMiniCard>
                                                                <ProjectDetails style={{ borderRight: "0" }}>
                                                                    <div id="img">
                                                                        <Image src={val.media[0].url} layout="fill" objectFit="cover" objectPosition="center"/>
                                                                    </div>
                                                                    <div>
                                                                        <h4>{val.website}</h4>
                                                                        <p>{val.phone}</p>
                                                                    </div>
                                                                </ProjectDetails>
                                                                
                                                            </ProjectCard>
                                                        </div>
                                                    ))
                                                }
                                            </Bottom>
                                        </Listing> : (
                                            <Content>
                                                <EmptyWrapper>
                                                    <Image src="/empty.png" alt="" height={120} width={120} />
                                                    <h3>No Business</h3>
                                                </EmptyWrapper>
                                            </Content>
                                        )
                                        
                                    )
                                }
                            </DataSection>
                        </LeftSection>
                    </BottomSection>
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
        </Container>
    )
}
CreatorProfile.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default CreatorProfile