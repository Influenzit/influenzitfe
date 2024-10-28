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
  const handleFaqToggle = (index) => {
    console.log(index)
    setFaq((prev) => {
      let copyOfPrev = {...prev};
      if(!!copyOfPrev?.[index]) {
        copyOfPrev = {...copyOfPrev, [index]: false}
      } else {
        copyOfPrev = {...copyOfPrev, [index]: true}
      }
      console.log(copyOfPrev);
      return copyOfPrev;
    })
  }
  const faqs = [
    {
        question: "How do I sign up for early access to Influenzit?",
        answer: "You can sign up for early access by providing your email address on our pre-launch landing page.",
    },
    {
        question: "What kind of collaborations are available on Influenzit?",
        answer: "Influenzit offers collaborations with a diverse range of business owners across a variety of industries. You can easily find and collaborate with brands that align with your interests and audience. Brands can also find and reach out to you from your profile."},
    {
        question: "How does Influenzit help me grow my following?",
        answer: "Influenzit offers a range of resources and support for new influencers to help them grow their following and succeed in the industry. Our platform also connects you with complementary businesses and creatives to cross-pollinate your audiences. "},

 {
        question: "How do I measure the success of my campaigns on Influenzit?",
        answer: "Influenzit offers data reporting that allows you to measure the success of your campaigns and make informed decisions about future collaborations. You can track metrics such as engagement, reach, and conversions.",
}
  ]
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
            {/* <div>
                <Link href="#register">Sign Up</Link>
                <Link href="/business-waitlist">Business Owner Waitlist</Link>
            </div> */}           
        </Banner>
        <Wrapper>
            <h1 id="h1">Unlock the Power of Influencer Collaborations to Boost Your Business</h1>
            <p id="p">Are you a business owner aiming to amplify your brand's reach and connect authentically with your target audience? Join our exclusive weekly webinar to discover how Influenzit.com can revolutionize your marketing strategy through seamless influencer collaborations.</p>
            <p>
                <strong>Date:</strong> Every Friday
                <br />
                <strong>Time:</strong> 7 PM - 8:00 PM (GMT + 1)
                <br />
                <strong>Platform:</strong> Live Webinar (Link will be provided upon registration)
            </p>
            <Info>
                <Details>
                    <h1><strong>In this free webinar, you'll learn how to: </strong></h1>
                    <ul>
                        <li><strong>Understand Your Audience:</strong> Leverage Influenzit's robust analytics to dive deep into your audience's demographics, behaviours, and interests.</li>
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
            <AccessCard id="register">
                <div>
                    <h2>Limited Seats Available!</h2>
                    <p>Don't miss out on this opportunity to elevate your marketing strategy. Secure your spot now and take the first step towards impactful influencer collaborations.</p>
                    <h2>Register Now!</h2>
                </div>
                <IframeWrapper>
                    {/* <iframe src='https://cdn.forms-content.sg-form.com/6cee0834-c26a-11ed-90af-f2e097933c84'>

                    </iframe> */}
                    <form>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                        <button onClick={handleSubmit}>Sign up</button>
                    </form>
                </IframeWrapper>
            </AccessCard>
        </Wrapper>
        <Footer />
        {loadingStatus && <Loader />}
    </Container>
  )
}

export default InfluencerWaitlist
