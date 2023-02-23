import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getInfluencer } from '../../api/influencer'
import { startConversation } from '../../api/messaging'
import { setLoading } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import LandingLayout from '../../layouts/landing.layout'
import { Controls, CreatorsCard, CreatorDetails, SocialHandle } from '../../styles/business-owner.style'
import { BackImage, Bottom, Container, HeroSectionOne, ImageContainer, Popup, ProfileCategory, ProfileData, ProfileDetails, ProfileImgCont, ProfileStats, SeeMoreCont, SkillCard, StatCard, Stats, StatWrapper, Top, UserCard, WorkCard, Wrapper } from '../../styles/creator-profile.style'
import { AwardCard, Content, DataSection, DataSectionTwo, EmptyWrapper, ExperienceWrapper, ImageWrap, Left, PostLayer, PostStats, PostWrapper, Right, SectionTwo, ServRate, ServStats, ServUserCard, SkillGuage, SocialPost, SocialStats, TabBtn, Tabs, TopImg } from '../../styles/influencer-profile';
import { FormContainer, UpdateModal } from '../../styles/view.style'
import { InputContainer } from '../../styles/profile.style'
import { createDispute } from '../../api/support'
import ServiceCard from '../../components/service-card'

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
                <ImageContainer>
                    <div id='right'>
                        <Image src={inData?.user?.profile_pic}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                    </div>
                    <div id='left'>
                        
                    </div>
                </ImageContainer>
                <SkillCard>
                    <Top><h3>Services</h3></Top>
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
                </SkillCard>
                <SectionTwo>
                    <Left>
                        <DataSection>
                            <Tabs>
                                <TabBtn isActive={currentTab === "instagram"} onClick={() => setCurrentTab("instagram")}>Instagram</TabBtn>
                                <TabBtn isActive={currentTab === "facebook"} onClick={() => setCurrentTab("facebook")}>Facebook</TabBtn>
                                <TabBtn isActive={currentTab === "twitter"} onClick={() => setCurrentTab("twitter")}>Twitter</TabBtn>
                                <TabBtn isActive={currentTab === "tiktok"} onClick={() => setCurrentTab("tiktok")}>TikTok</TabBtn>
                            </Tabs>
                            {
                                currentTab === "instagram" && inData?.instagram_verified ? (
                                    <Content>
                                        <PostWrapper>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                        </PostWrapper>
                                        <PostStats>
                                            <div>
                                                <p><span>123</span>Posts</p>
                                            </div>
                                            <div>
                                                <p><span>540</span>Followers</p>
                                            </div>
                                            <div>
                                                <p><span>78%</span>Engagements</p>
                                            </div>
                                        </PostStats>
                                    </Content>
                                ) : (currentTab === "instagram") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={150} width={150}/>
                                            <h3>Instagram not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                            {
                                currentTab === "facebook" && inData?.facebook_verified ? (
                                    <Content>
                                        <PostWrapper>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                        </PostWrapper>
                                        <PostStats>
                                            <div>
                                                <p><span>123</span>Posts</p>
                                            </div>
                                            <div>
                                                <p><span>540</span>Followers</p>
                                            </div>
                                            <div>
                                                <p><span>78%</span>Engagements</p>
                                            </div>
                                        </PostStats>
                                    </Content>
                                ) : (currentTab === "facebook") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={150} width={150}/>
                                            <h3>Facebook not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                            {
                                currentTab === "twitter" && inData?.twitter_verified ? (
                                    <Content>
                                        <PostWrapper>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                        </PostWrapper>
                                        <PostStats>
                                            <div>
                                                <p><span>123</span>Posts</p>
                                            </div>
                                            <div>
                                                <p><span>540</span>Followers</p>
                                            </div>
                                            <div>
                                                <p><span>78%</span>Engagements</p>
                                            </div>
                                        </PostStats>
                                    </Content>
                                ) : (currentTab === "twitter") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={150} width={150}/>
                                            <h3>Twitter not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                             {
                                currentTab === "tiktok" && inData?.tiktok_verified ? (
                                    <Content>
                                        <PostWrapper>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                            <SocialPost>
                                                <Image src="/social-post.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
                                                <PostLayer>
                                                    <p><Image src="/heart.svg" height={20} width={20} /><span>5</span></p>
                                                    <p><Image src="/chat.svg" height={20} width={20} /><span>5</span></p>
                                                </PostLayer>
                                            </SocialPost>
                                        </PostWrapper>
                                        <PostStats>
                                            <div>
                                                <p><span>123</span>Posts</p>
                                            </div>
                                            <div>
                                                <p><span>540</span>Followers</p>
                                            </div>
                                            <div>
                                                <p><span>78%</span>Engagements</p>
                                            </div>
                                        </PostStats>
                                    </Content>
                                ) : (currentTab === "tiktok") && (
                                    <Content>
                                        <EmptyWrapper>
                                            <Image src="/empty.png" alt="" height={150} width={150}/>
                                            <h3>TikTok not connected yet</h3>
                                        </EmptyWrapper>
                                    </Content>
                                )
                            }
                            
                        </DataSection>
                        <DataSectionTwo>
                            <Tabs>
                                <TabBtn isActive={true}>Experience</TabBtn>
                            </Tabs>
                            <Content>
                                <ExperienceWrapper>
                                <WorkCard>
                                    <h3>Lead UI/UX Designer &amp; Wordpress Developer | Websitechic Digital influencer</h3>
                                    <div>
                                        <p><Image src="/bag-icon.svg" height={20} width={20} /><span>Company Name</span></p>
                                        <p><Image src="/calendar.svg" height={20} width={20} /><span>March 2020 - Present</span></p>
                                    </div>
                                    <p>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem ameteism conctetur adipisci velit sedate quianon.</p>
                                </WorkCard> 
                                <WorkCard>
                                    <h3>Lead UI/UX Designer &amp; Wordpress Developer | Websitechic Digital influencer</h3>
                                    <div>
                                        <p><Image src="/bag-icon.svg" height={20} width={20} /><span>Company Name</span></p>
                                        <p><Image src="/calendar.svg" height={20} width={20} /><span>March 2020 - Present</span></p>
                                    </div>
                                    <p>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem ameteism conctetur adipisci velit sedate quianon.</p>
                                </WorkCard> 
                                </ExperienceWrapper>
                            </Content>
                        </DataSectionTwo>
                    </Left>
                    <Right>
                        <SkillCard>
                            <Top>
                                <h3>Social Profiles</h3>
                            </Top>
                            <Bottom style={{ flexDirection: "column"}}>
                                <SocialStats>
                                    <Image src="/instagram.svg" height={25} width={25}/>
                                    <p>{inData?.instagram}</p>
                                    <span>{inData?.analytics?.instagram?.count ?? 0}</span>
                                </SocialStats>
                                <SocialStats>
                                    <Image src="/twitter.svg" height={25} width={25}/>
                                    <p>{inData?.twitter}</p>
                                    <span>{inData?.analytics?.twitter?.count ?? 0}</span>
                                </SocialStats>
                                <SocialStats>
                                    <Image src="/facebook.svg" height={25} width={25}/>
                                    <p>{inData?.facebook}</p>
                                    <span>{inData?.analytics?.facebook?.count}</span>
                                </SocialStats>
                                <SocialStats>
                                    <Image src="/tiktok.svg" height={25} width={25}/>
                                    <p>{inData?.tiktok}</p>
                                    <span>{inData?.analytics?.tiktok?.count}</span>
                                </SocialStats>
                            </Bottom>
                        </SkillCard>
                        <SkillCard>
                            <Top>
                                <h3>Awards &amp; Certifications</h3>
                            </Top>
                            <Bottom style={{ flexDirection: "column"}}>
                                <AwardCard>
                                    <Image src="/award.svg" height={50} width={50}/>
                                    <div>
                                        <p>Public Engagement</p>
                                        <span>Feb 09, 2021</span>
                                    </div>
                                </AwardCard>
                                <AwardCard>
                                    <Image src="/award.svg" height={50} width={50}/>
                                    <div>
                                        <p>Public Engagement</p>
                                        <span>Feb 09, 2021</span>
                                    </div>
                                </AwardCard>
                                <AwardCard>
                                    <Image src="/award.svg" height={50} width={50}/>
                                    <div>
                                        <p>Public Engagement</p>
                                        <span>Feb 09, 2021</span>
                                    </div>
                                </AwardCard>
                            </Bottom>
                        </SkillCard>
                        <SkillCard>
                            <Top>
                                <h3>My Skills</h3>
                            </Top>
                            <Bottom style={{ flexDirection: "column"}}>
                                {
                                    inData?.skills.map((val, i) => (
                                        <SkillGuage level={val.rate} key={i}>
                                            <p>{val.name}</p>
                                            <div></div>
                                        </SkillGuage>
                                    ))
                                }
                            </Bottom>
                        </SkillCard>
                    </Right>
                </SectionTwo>
                <SkillCard>
                    <Top><h3>Similar Creators</h3></Top>
                    <Bottom style={{ justifyContent: "space-between"}}>
                        <CreatorsCard>
                            <TopImg>
                                <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                            </TopImg>
                            <CreatorDetails>
                                <h4>Ezekiel Phoenixgold</h4>
                                <p>Male | Lagos, Nigeria</p>
                                <SocialHandle>
                                <Link href="/" targer="_blank" passHref>
                                    <a><Image src="/twitter.svg" alt="" height={16} width={16}/><span>itzphoenixgold | 16k reach</span></a>
                                </Link>
                                </SocialHandle>
                                <p>Laptop Lifestyle | Photography | Fashion</p>
                                <Controls>
                                <Link href="/" passHref>
                                    <a>Engage</a>
                                </Link>
                                {/* <button><Image src="/list.svg" alt="" height={24} width={24}/></button> */}
                                </Controls>
                            </CreatorDetails>
                        </CreatorsCard>
                        <CreatorsCard>
                            <TopImg>
                                <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                            </TopImg>
                            <CreatorDetails>
                                <h4>Ezekiel Phoenixgold</h4>
                                <p>Male | Lagos, Nigeria</p>
                                <SocialHandle>
                                <Link href="/" targer="_blank" passHref>
                                    <a><Image src="/twitter.svg" alt="" height={16} width={16}/><span>itzphoenixgold | 16k reach</span></a>
                                </Link>
                                </SocialHandle>
                                <p>Laptop Lifestyle | Photography | Fashion</p>
                                <Controls>
                                <Link href="/" passHref>
                                    <a>Engage</a>
                                </Link>
                                {/* <button><Image src="/list.svg" alt="" height={24} width={24}/></button> */}
                                </Controls>
                            </CreatorDetails>
                        </CreatorsCard>
                        <CreatorsCard>
                            <TopImg>
                                <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                            </TopImg>
                            <CreatorDetails>
                                <h4>Ezekiel Phoenixgold</h4>
                                <p>Male | Lagos, Nigeria</p>
                                <SocialHandle>
                                <Link href="/" targer="_blank" passHref>
                                    <a><Image src="/twitter.svg" alt="" height={16} width={16}/><span>itzphoenixgold | 16k reach</span></a>
                                </Link>
                                </SocialHandle>
                                <p>Laptop Lifestyle | Photography | Fashion</p>
                                <Controls>
                                <Link href="/" passHref>
                                    <a>Engage</a>
                                </Link>
                                {/* <button><Image src="/list.svg" alt="" height={24} width={24}/></button> */}
                                </Controls>
                            </CreatorDetails>
                        </CreatorsCard>
                        <CreatorsCard>
                            <TopImg>
                                <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                            </TopImg>
                            <CreatorDetails>
                                <h4>Ezekiel Phoenixgold</h4>
                                <p>Male | Lagos, Nigeria</p>
                                <SocialHandle>
                                <Link href="/" targer="_blank" passHref>
                                    <a><Image src="/twitter.svg" alt="" height={16} width={16}/><span>itzphoenixgold | 16k reach</span></a>
                                </Link>
                                </SocialHandle>
                                <p>Laptop Lifestyle | Photography | Fashion</p>
                                <Controls>
                                <Link href="/" passHref>
                                    <a>Engage</a>
                                </Link>
                                {/* <button><Image src="/list.svg" alt="" height={24} width={24}/></button> */}
                                </Controls>
                            </CreatorDetails>
                        </CreatorsCard>
                    </Bottom>
                </SkillCard>
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