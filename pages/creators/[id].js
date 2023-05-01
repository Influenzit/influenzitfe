import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCreator, getCreators } from '../../api/influencer'
import { startConversation } from '../../api/messaging'
import { setLoading } from '../../app/reducers/status'
import LandingLayout from '../../layouts/landing.layout'
import { BackImage, Bottom, BottomSection, Campaign, CollaborateBtn, Container, HeroSectionOne, ImageCard, ImageContainer, ImageContainerTwo, Info, LeftSection, Listing, Popup, ProfileCategory, ProfileData, ProfileDetails, ProfileImgCont, ProfileStats, RightSection, SeeMoreCont, Skill, SkillCard, Social, SocialWrapper, StatCard, Stats, StatWrapper, Tag, Tags, Top, UserCard, UserCardSection, UserImage, WorkCard, Wrapper, UserDetails } from '../../styles/creator-profile.style'
import { toast } from 'react-toastify'
import { FormContainer, UpdateModal } from '../../styles/view.style'
import { InputContainer } from '../../styles/profile.style'
import { createDispute } from '../../api/support'
import { getUser } from '../../app/reducers/user'
import { Content, DataSection, EmptyWrapper, TabBtn, Tabs } from '../../styles/influencer-profile'
import ProfileCard from '../../components/profile-card'
import ServiceCard from '../../components/service-card'

const CreatorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inData, setInData] = useState(null);
  const user = useSelector(getUser);
  const [currentTab, setCurrentTab] = useState("instagram");
  const dispatch = useDispatch();
  const [showEngagePopup, setShowEngagePopup] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeSubject, setDisputeSubject] = useState("");
  const [disputeMessage, setDisputeMessage] = useState("");
  const { data: creatorsData, refetch: refetchCreatorsData } = useQuery(["get-creators"], async () => {
        return await getCreators("");
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });

  const { data: creatorData, refetch: refetchCreatorData } = useQuery(["get-creator"], async () => {
    return await getCreator(id);
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
const startConversationMutation = useMutation((data) => {
    return startConversation(data);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
        } else {
            router.push("/dashboard/messages");
        }
    },
    onError(error) {
        const res = error.response.data;
        if(res){
        dispatch(setError({error: true, message: res.message}));
        return;
        }
        dispatch(setError({error: true, message: "An error occured"}));
    }
});
const createDisputeMutation = useMutation( disputeData => {
    return createDispute(disputeData);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
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
        if(res){
          dispatch(setLoading(false));
          dispatch(setError({error: true, message: res.message}));
          return;
        }
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: "An error occured"}));
    }
});
const handleStartConversation = () => {
    if(user?.id) {
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
    if(user?.id) {
       setShowDispute(true);
    } else {
        toast.error("Please login before you can report account", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
}
const handleCreateDispute = () => {
    if(!disputeSubject && !disputeSubject) {
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
useEffect(() => {
    dispatch(setLoading(true));
    refetchCreatorsData();
    if(id){
        refetchCreatorData();
    }
}, [router.pathname, id]);
useEffect(() => {
    if(creatorData?.data?.data) {
        setInData(creatorData?.data?.data);
    }
}, [creatorData])
  return (
    <Container>
        <HeroSectionOne>
            <Wrapper>
                {
                    (inData?.media.length <= 1) && (
                        <ImageContainer>
                            <div id="img">
                                <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                            </div>
                        </ImageContainer>
                    )
                }
                {
                    (inData?.media.length === 2) && (
                        <ImageContainerTwo>
                            <div className='wrap'>
                                <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                            </div>
                            <div className='wrap'>
                                <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                            </div>
                        </ImageContainerTwo>
                    )
                }
                {
                    (inData?.media.length === 3) && (
                        <ImageContainerTwo>
                            <div className='wrap'>
                                <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                            </div>
                            <div className="wrap">
                                <div className='wrap-top'>
                                    <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                                </div>
                                <div className='wrap-bottom'>
                                    <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                                </div>
                            </div>
                        </ImageContainerTwo>
                    )
                }
                {
                    (inData?.media.length === 4) && (
                        <ImageContainerTwo>
                            <div className='wrap'>
                                <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                            </div>
                            <div className='wrap'>
                                <div className='wrap-top'>
                                    <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                                </div>
                                <div className='wrap-bottom'>
                                    <div>
                                        <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                                    </div>
                                    <div>
                                        <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
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
                                        <Image src="/nigeria.svg"  alt="" height={16} width={16}/>
                                        <span>Nigeria</span>
                                    </p>
                                    <Image src="/dot.svg"  alt="" height={4} width={4}/>
                                    <p>
                                        <Image src="/gender.svg"  alt="" height={16} width={16}/>
                                        <span>{inData?.gender}</span>
                                    </p>
                                    <Image src="/dot.svg"  alt="" height={4} width={4}/>
                                    <p>
                                        <Image src="/star-p.svg"  alt="" height={16} width={16}/>
                                        <span>{inData?.rating.rating_count} ({inData?.rating.reviews_count} ratings)</span>
                                    </p>
                                </div>
                            </UserDetails>
                            <UserImage>
                                <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                            </UserImage>
                        </UserCardSection>
                        <Info>
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
                                <TabBtn isActive={currentTab === "facebook"} onClick={() => setCurrentTab("facebook")}>Facebook</TabBtn>
                                <TabBtn isActive={currentTab === "twitter"} onClick={() => setCurrentTab("twitter")}>Twitter</TabBtn>
                                <TabBtn isActive={currentTab === "tiktok"} onClick={() => setCurrentTab("tiktok")}>TikTok</TabBtn>
                                <TabBtn isActive={currentTab === "youtube"} onClick={() => setCurrentTab("youtube")}>Youtube</TabBtn>
                            </Tabs>
                            {
                                currentTab === "instagram" && inData?.instagram_verified ? (
                                    <Content>
                                        
                                    </Content>
                                ) : (currentTab === "instagram") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={120} width={120}/>
                                            <h3>Instagram not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                            {
                                currentTab === "facebook" && inData?.facebook_verified ? (
                                    <Content>
                                        
                                    </Content>
                                ) : (currentTab === "facebook") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={120} width={120}/>
                                            <h3>Facebook not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                            {
                                currentTab === "twitter" && inData?.twitter_verified ? (
                                    <Content>
                                        
                                    </Content>
                                ) : (currentTab === "twitter") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={120} width={120}/>
                                            <h3>Twitter not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                                {
                                currentTab === "tiktok" && inData?.tiktok_verified ? (
                                    <Content>
                                        
                                    </Content>
                                ) : (currentTab === "tiktok") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={120} width={120}/>
                                            <h3>TikTok not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                                {
                                currentTab === "youtube" && inData?.tiktok_verified ? (
                                    <Content>
                                        
                                    </Content>
                                ) : (currentTab === "youtube") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={120} width={120}/>
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
                                    <p>@{inData?.instagram}</p>
                                </div>
                            </Social>
                            <Social>
                                <div>
                                    <Image src="/youtube.svg" alt="" height={32} width={32} />
                                </div>
                                <div>
                                    <h4>YOUTUBE</h4>
                                    <p>@{inData?.youtube}</p>
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
                                    <p>@{inData?.tiktok}</p>
                                </div>
                            </Social>
                            <Social>
                                <div>
                                    <Image src="/twitter.png" alt="" height={32} width={32} />
                                </div>
                                <div>
                                    <h4>TWITTER</h4>
                                    <p>@{inData?.twitter}</p>
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
                                    <p>@{inData?.facebook}</p>
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
                                <h1>{inData?.analytics.influenzit.completed_campaigns_count}</h1>
                                <p>Completed <br /> Campaigns</p>
                            </div>
                            <div className='cont'>
                                <h1>{inData?.rating.rating_count}</h1>
                                <div>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                </div>
                                <p>{inData?.rating.reviews_count} ratings</p>
                            </div>
                        </Campaign>
                    </RightSection>
                </BottomSection>
                {inData?.services.length ?
                    <Listing>
                        <h3>Services</h3>
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
                }
                 <Listing>
                    <h3>Similar creators</h3>
                    <Bottom>
                        {
                            creatorsData?.data?.data?.data.slice(0, 4).map((val, i) => {
                                let genSkills = "";
                                val.skills.forEach((val, i) => {
                                    if(i < 5){
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
                                    imgSrc={val?.media.filter(med => med.identifier === 'profile_pic')?.[0]?.url ?? '/niche8.png'  }
                                    handle={val.twitter}
                                    name={`${val.user.firstname} ${val.user.lastname}`}
                                    sex={val.gender}
                                    skills={genSkills}
                                    address={val.address}
                                />
                            })
                        }
                    </Bottom>
                </Listing>
            </Wrapper>
        </HeroSectionOne>
        {showDispute &&(
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
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CreatorProfile