import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCreator } from '../../api/influencer'
import { startConversation } from '../../api/messaging'
import { setLoading } from '../../app/reducers/status'
import LandingLayout from '../../layouts/landing.layout'
import { BackImage, Bottom, Container, HeroSectionOne, ImageCard, Popup, ProfileCategory, ProfileData, ProfileDetails, ProfileImgCont, ProfileStats, SeeMoreCont, Skill, SkillCard, StatCard, Stats, StatWrapper, Top, UserCard, WorkCard, Wrapper } from '../../styles/creator-profile.style'
import { toast } from 'react-toastify'
import { FormContainer, UpdateModal } from '../../styles/view.style'
import { InputContainer } from '../../styles/profile.style'
import { createDispute } from '../../api/support'
import { getUser } from '../../app/reducers/user'
const CreatorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inData, setInData] = useState(null);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [showEngagePopup, setShowEngagePopup] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeSubject, setDisputeSubject] = useState("");
  const [disputeMessage, setDisputeMessage] = useState("");

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
            <BackImage>
            <Image src="/profile.png" alt="" layout="fill" objectPosition="center" objectFit="cover" id="back-img"/>
            <UserCard>
                <ProfileStats>
                    <ProfileImgCont>
                        <Image src={inData?.media?.[0]?.url ? inData?.media?.[0]?.url : `https://ui-avatars.com/api/?name=${inData?.user?.firstname}+${inData?.user?.lastname}&color=FFFFFF&background=12544D`}  alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                    </ProfileImgCont>
                    <ProfileData>
                        <div>
                            <Image src="/users.svg" height={20} width={20} />
                            <span>Male</span>
                        </div>
                        <div>
                            <Image src="/verified.svg" height={20} width={20} />
                            <span>Verified</span>
                        </div>
                    </ProfileData>
                    <p>0/5 (<span>0 Feedbacks</span>)</p>
                    <p>Member since Feb 09, 2021.</p>
                    <button>Share Profile</button>
                </ProfileStats>
                <ProfileDetails>
                    <h2>{inData?.user?.firstname} {inData?.user.lastname}</h2>
                    <ProfileCategory>
                        <div><Image src="/niche.svg" height={25} width={25}/><p>Creators&apos;s Niche</p></div>
                        <div><Image src="/flag.svg" height={25} width={25}/><p>Nigeria</p></div>
                        <div><Image src="/instagram.svg" height={25} width={25}/><p>{inData?.instagram}</p> <span>0</span></div>
                    </ProfileCategory>
                    <p>{inData?.biography}</p>  
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
                        <span>Engage Creator</span> <Image src="/down-chev.svg" height={10} width={10} />
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
            </BackImage>
            <Wrapper>
                <SkillCard>
                    <Top><h3>Skills</h3></Top>
                    <Bottom>
                        {
                            inData?.skills.map((val, i) => (
                                <Skill key={i}>{val.name}</Skill>
                            ))
                        }
                    </Bottom>
                </SkillCard>
                <SkillCard>
                    <Top><h3>Portfolio</h3></Top>
                    <Bottom style={{ justifyContent: "space-between"}}>
                        <ImageCard>
                            <Image src="/portfolio.png" layout='fill' objectFit='cover' objectPosition='center' />
                        </ImageCard>
                        <ImageCard>
                            <Image src="/portfolio.png" layout='fill' objectFit='cover' objectPosition='center' />
                        </ImageCard>
                        <ImageCard>
                            <Image src="/portfolio.png" layout='fill' objectFit='cover' objectPosition='center' />
                        </ImageCard>
                        <ImageCard>
                            <Image src="/portfolio.png" layout='fill' objectFit='cover' objectPosition='center' />
                        </ImageCard>
                    </Bottom>
                </SkillCard>
                <SkillCard>
                    <Top><h3>Work Experience</h3></Top>
                    <Bottom>
                        <WorkCard>
                            <h3>Lead UI/UX Designer &amp; Wordpress Developer | Websitechic Digital Service</h3>
                            <div>
                                <p><Image src="/bag-icon.svg" height={20} width={20} /><span>Company Name</span></p>
                                <p><Image src="/calendar.svg" height={20} width={20} /><span>March 2020 - Present</span></p>
                            </div>
                            <p>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem ameteism conctetur adipisci velit sedate quianon.</p>
                        </WorkCard>
                        <WorkCard>
                            <h3>Front End Web Developer &amp; Creative Designer</h3>
                            <div>
                                <p><Image src="/bag-icon.svg" height={20} width={20} /><span>Company Name</span></p>
                                <p><Image src="/calendar.svg" height={20} width={20} /><span>May 2018 - Jun 2019</span></p>
                            </div>
                            <p>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem ameteism conctetur adipisci velit sedate quianon.</p>
                        </WorkCard>
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