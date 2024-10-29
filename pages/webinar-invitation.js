import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createWaitlist } from '../api/waitlist'
import { isLoading, setError, setLoading } from '../app/reducers/status'
import Loader from '../components/loading'
import Footer from '../components/waitlist-footer'
import { Answer, Faq, FaqWrapper, Question, WrapperSix } from '../styles/home.style'
import { AccessCard, AccessCardT, Banner, CardLayer, Container, Details, ImgContainer, Info, Wrapper, IframeWrapper, IframeWrapperT } from '../styles/waitlist.style'

const InfluencerWaitlist = () => {
  const [faq, setFaq] = useState({});
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const loadingStatus = useSelector(isLoading);
  const mutation = useMutation(waitlistData => {
    return createWaitlist(waitlistData);
  }, {
    onSuccess(successRes) {
        const res = successRes.data;
        console.log(successRes);
        toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        setEmail("");
        dispatch(setLoading(false));
    },
    onError(error) {
        const res = error.response.data;
        if(res){
          dispatch(setLoading(false));
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          setEmail("");
          return;
        }
        dispatch(setLoading(false));
        toast.error("An error occured", {
            position: toast.POSITION.TOP_RIGHT
        });
        setEmail("");
      }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mutation.mutate({
        email,
        account_type: "Influencer",
    })
  }

  return (
    <Container>
        <Banner>
            <Image src="/influenzit_logo.png" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            <h1>Webinar Invitation: 
            <br />
            Transform Your Marketing with Influenzit</h1>
            <p>Find the right brands and collaborations to grow your<br /> following and increase your earnings</p>          
        </Banner>
        <Wrapper>
            <h1 id="h1">Unlock the Power of Influencer Collaborations to Boost Your Business</h1>
            <p id="p">Are you a business owner aiming to amplify your brand&apos;s reach and connect authentically with your target audience? Join our exclusive weekly webinar to discover how Influenzit.com can revolutionize your marketing strategy through seamless influencer collaborations.</p>
            <p id="p">
                <strong>Date:</strong> Every Friday
                <br />
                <strong>Time:</strong> 7 PM - 8:00 PM (GMT + 1)
                <br />
                <strong>Platform:</strong> Live Webinar (Link will be provided upon registration)
            </p>
            <Info>
                <Details>
                    <h1><strong>In this free webinar, you&apos;ll learn how to: </strong></h1>
                    <ul>
                        <li><strong>Understand Your Audience:</strong> Leverage Influenzit&apos;s robust analytics to dive deep into your audience&apos;s demographics, behaviours, and interests.</li>
                        <li><strong>Find the Perfect Influencers:</strong> Utilize our AI-driven matchmaking tool to connect with influencers who align with your brand and campaign goals.</li>
                        <li><strong>Collaborate Effectively:</strong> Learn the step-by-step process of sending collaboration requests, negotiating campaign details, and setting clear goals and budgets.</li>
                        <li><strong>Manage Campaigns with Ease:</strong> Monitor progress, approve deliverables, and communicate securely with influencers through our platform.</li>
                        <li><strong>Secure Transactions:</strong> Understand how our escrow payment system ensures secure and transparent financial transactions.</li>
                        <li><strong>Analyze and Optimize:</strong> Use post-campaign analytics to measure success and strategize for future marketing efforts.</li>
                    </ul>
                  </Details>
                <ImgContainer>
                    <Image src="/w-banner-2.png" alt="banner" layout='fill' loading="lazy" objectFit="cover" objectPosition="center" />
                </ImgContainer>
            </Info>
            <Info isInverse>
                <ImgContainer>
                    <Image src="/w-banner-3.png" alt="banner" layout='fill' loading="lazy" objectFit="cover" objectPosition="center" />
                </ImgContainer>
                <Details isInverse>
                  <h1><strong>Why Attend?</strong></h1>
                  <ul>
                      <li><strong>Interactive Q&A Session:</strong> Get your questions answered in real-time by our expert team.</li>
                      <li><strong>Live Demonstration:</strong> See Influenzit in action with a walkthrough of key features.</li>
                      <li><strong>Exclusive Insights:</strong> Gain access to tips and best practices for successful influencer collaborations.</li>
                  </ul>
                </Details>
            </Info>
            <Info>
                <Details>
                  <h1><strong>Who Should Attend?</strong></h1>
                  <ul>
                      <li>Business owners and entrepreneurs looking to enhance their marketing efforts.</li>
                      <li>Marketing professionals seeking efficient ways to collaborate with influencers.</li>
                      <li>Anyone interested in learning about influencer marketing platforms.</li>
                  </ul>
                </Details>
                <ImgContainer>
                    <Image src="/w-banner-4.png" alt="banner" layout='fill' loading="lazy" objectFit="cover" objectPosition="center" />
                </ImgContainer>
            </Info>
            <AccessCard id="register" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flex: '1' }}>
                    <h2>Limited Seats Available!</h2>
                    <p>Don&apos;t miss out on this opportunity to elevate your marketing strategy. Secure your spot now and take the first step towards impactful influencer collaborations.</p>
                    <h2>Register Now!</h2>
                </div>
                
                <form method="post" action="https://systeme.io/embedded/23320948/subscription" 
                    style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '100%', flex: '1' }}>
                    <input 
                        type="text" 
                        name="first_name" 
                        placeholder="First Name" 
                        style={{ padding: '10px', fontSize: '16px', width: '100%', borderRadius: '24px', border: '1px solid #ccc' }}
                    />
                    <input 
                        type="text" 
                        name="surname" 
                        placeholder="Last Name" 
                        style={{ padding: '10px', fontSize: '16px', width: '100%', borderRadius: '24px', border: '1px solid #ccc' }}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email Address" 
                        style={{ padding: '10px', fontSize: '16px', width: '100%', borderRadius: '24px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" className="btn" 
                            style={{ padding: '12px', fontSize: '16px', color: '#fff', backgroundColor: '#007BFF', border: 'none', borderRadius: '24px', cursor: 'pointer' }}>
                        Register Now
                    </button>
                </form>
            </AccessCard>
        </Wrapper>
        <Footer />
        {loadingStatus && <Loader />}
    </Container>
  )
}

export default InfluencerWaitlist
