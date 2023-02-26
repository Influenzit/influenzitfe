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
import { BackImage, Bottom, BottomSection, Campaign, CollaborateBtn, Container, HeroSectionOne, ImageContainer, ImageContainerTwo, Info, LeftSection, Listing, RightSection, SkillCard, Social, SocialWrapper, Tag, Tags, Top, UserCardSection, WorkCard, Wrapper } from '../../styles/creator-profile.style'
import { AwardCard, Content, DataSection, DataSectionTwo, EmptyWrapper, ExperienceWrapper, Left, PostLayer, PostStats, PostWrapper, Right, SectionTwo, ServRate, ServStats, ServUserCard, SkillGuage, SocialPost, SocialStats, TabBtn, Tabs, TopImg } from '../../styles/influencer-profile';
import { Details, FormContainer, UpdateModal } from '../../styles/view.style'
import { InputContainer } from '../../styles/profile.style'
import { createDispute } from '../../api/support'
import ServiceCard from '../../components/service-card'
import { UserDetails, UserImage } from '../../styles/home.style'
import ProfileCard from '../../components/profile-card'

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
    const handleLinkCopy = () => {
        navigator.clipboard.writeText(location.href);
        toast.success("Profile URL copied to clipboard", {
            position: toast.POSITION.TOP_RIGHT
          });
    }
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
        refetchInfluencersData();
        if(id){
            refetchInfluencerData();
        }
    }, [router.pathname, id]);
    useEffect(() => {
        if(influencerData?.data?.data) {
            setInData(influencerData?.data?.data);
        }
    }, [influencerData])
    
  return (
    <Container>
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
                                        <span>5.0 (20 ratings)</span>
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
                                <h1>5.0</h1>
                                <div>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                                </div>
                                <p>20 ratings</p>
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
                    <h3>Similar creators</h3>
                    <Bottom>
                        {
                            influencersData?.data?.data?.data.splice(0, 4).map((val, i) => {
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