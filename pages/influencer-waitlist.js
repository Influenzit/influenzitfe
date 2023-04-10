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
import { AccessCard, Banner, CardLayer, Container, Details, ImgContainer, Info, Wrapper, IframeWrapper } from '../styles/waitlist.style'

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
            <h1>Monetize your<br /> influence with Influenzit</h1>
            <p>Find the right brands and collaborations to grow your<br /> following and increase your earnings</p>
            <Link href="#register">Sign Up</Link>
        </Banner>
        <Wrapper>
            <h1 id="h1">Welcome to Influenzit</h1>
            <p id="p">A one-stop solution for influencers looking to monetize their online following and connect with the right brands and campaigns. With our user-friendly platform and diverse range of business owners, you can easily find the perfect collaborations to elevate your brand perception and increase your earning potential.</p>
            <Info>
                <Details>
                    <h1>Monetize your audience </h1>
                    <p>Whether you&apos;re a micro-influencer with a focused following or a mini-influencer with a passion for a specific niche, Influenzit connects you with the right brands and campaigns to grow your following and monetize your influence.</p>
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
                    <h1>Connect to the right brands</h1>
                    <p>Our platform offers a unique &quot;do it yourself&quot; solution that simplifies the process of finding and collaborating with the right businesses. With real-time access to thousands of industry-specific social media influencers at the click of a button, you can easily find and collaborate with the right partners to elevate your brand perception and increase sales.</p>
                </Details>
            </Info>
            <Info>
                <Details>
                    <h1>Make informed decisions</h1>
                    <p>In addition to providing access to a diverse range of business owners, Influenzit also offers data reporting that allows you to measure the success of your campaigns and make informed decisions about future collaborations. Plus, our platform offers resources and support for new influencers to help them grow their following and succeed in the industry.</p>
                </Details>
                <ImgContainer>
                    <Image src="/w-banner-4.png" alt="banner" layout='fill' loading="lazy" objectFit="cover" objectPosition="center" />
                </ImgContainer>
            </Info>
            <AccessCard id="register">
                <div>
                    <h2>Get Early Access</h2>
                    <p>Sign up now for early access to Influenzit and receive an exclusive early-bird incentive of 5% off your commission for your first collaboration.</p>
                </div>
                <IframeWrapper>
                    <iframe src='https://cdn.forms-content.sg-form.com/6cee0834-c26a-11ed-90af-f2e097933c84'>

                    </iframe>
                    {/* <form>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                        <button onClick={handleSubmit}>Sign up</button>
                    </form> */}
                </IframeWrapper>
            </AccessCard>
        </Wrapper>
        <WrapperSix>
            <h1>Frequently asked questions</h1>
            <p>Everything you need to know about the product and billing.</p>
            <FaqWrapper>
                {
                faqs.map((val, i) => (
                    <Faq key={i}>
                    <Question onClick={() => handleFaqToggle(i)}>
                        <span>{val.question}</span>
                        <span>{faq?.[i] ? (<Image src="/close.svg" alt="" height={20} width={20} />) : (<Image src="/open.svg" alt="" height={20} width={20} />)}</span>
                    </Question>
                    {
                        faq?.[i] && (
                        <Answer>
                            {val.answer}
                        </Answer>
                        )
                    }
                    </Faq>
                ))
                }
            </FaqWrapper>
        </WrapperSix>
        <Footer />
        {loadingStatus && <Loader />}
    </Container>
  )
}

export default InfluencerWaitlist
