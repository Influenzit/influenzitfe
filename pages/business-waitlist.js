import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../components/waitlist-footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createWaitlist } from "../api/waitlist";
import { isLoading, setLoading } from "../app/reducers/status";
import {
  Answer,
  Faq,
  FaqWrapper,
  Question,
  WrapperSix,
} from "../styles/home.style";
import {
  AccessCard,
  AccessCardT,
  Banner,
  CardLayer,
  Container,
  Details,
  FBanner,
  IframeWrapper,
  IframeWrapperT,
  ImageBanner,
  ImgContainer,
  Info,
  Wrapper,
} from "../styles/waitlist.style";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/loading";

const BusinessWaitlist = () => {
  const [faq, setFaq] = useState({});
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const loadingStatus = useSelector(isLoading);
  const mutation = useMutation(
    (waitlistData) => {
      return createWaitlist(waitlistData);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(setLoading(false));
        setEmail("");
      },
      onError(error) {
        const res = error.response.data;
        if (res) {
          dispatch(setLoading(false));
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setEmail("");
          return;
        }
        dispatch(setLoading(false));
        toast.error("An error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEmail("");
      },
    }
  );
  const handleFaqToggle = (index) => {
    console.log(index);
    setFaq((prev) => {
      let copyOfPrev = { ...prev };
      if (!!copyOfPrev?.[index]) {
        copyOfPrev = { ...copyOfPrev, [index]: false };
      } else {
        copyOfPrev = { ...copyOfPrev, [index]: true };
      }
      console.log(copyOfPrev);
      return copyOfPrev;
    });
  };
  const faqs = [
    {
      question:
        "How does Influenzit differ from other influencer marketing platforms?",
      answer: `Influenzit offers a unique "do it yourself" solution for small businesses looking to engage influencers and collaborations. By providing everything needed from start to finish on our platform, we eliminate the need for external processes that can increase the cost of influencer marketing. Our platform also offers data reporting that allows you to measure the success of your campaigns and make informed decisions about future collaborations`,
    },
    {
      question:
        "How long will it take for my business to start collaborating with influencers on Influenzit?",
      answer: `Our team is working hard to launch Influenzit as soon as possible. By joining our waitlist, you will be the first to know when we launch and can start collaborating with influencers on our platform`,
    },
    {
      question: "How do I know if Influenzit is right for my business?",
      answer:
        "nfluenzit is a great fit for small and medium-sized businesses looking to improve their online presence and increase sales through influencer marketing. Our platform provides access to a diverse range of industry-specific influencers, offers data reporting for measuring campaign success, and simplifies the process of finding and collaborating with the right partners",
    },
    {
      question: "How do I sign up for the Influenzit waitlist?",
      answer:
        "Signing up for our waitlist is easy! Simply go to our website and provide your email address to be added to the list. We will notify you as soon as we launch and provide instructions on how to start using our platform.",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mutation.mutate({
      email,
      account_type: "Business",
    });
  };
  return (
    <Container style={{ paddingTop: "0" }}>
      <FBanner>
        <Image
          src="/influenzit_logo.png"
          alt="logo"
          height={30}
          width={120}
          style={{ cursor: "pointer" }}
        />
        <h1>
          Be the First to Know When Influenzit Launches and Get 6 Months of Free
          Access to the Ultimate Influencer Marketing Solution!
        </h1>
      </FBanner>
      <ImageBanner>
        <Image
          src="/w-banner-5.png"
          alt="banner"
          layout="fill"
          loading="lazy"
          objectFit="cover"
          objectPosition="center"
        />
      </ImageBanner>
      <Wrapper>
        <h4 id="quick">
          Are you a small or medium-sized business looking to improve your
          online visibility and drive sales? Do you struggle with the high cost
          and complexity of using influencers and valuable partnerships?
          Influenzit is here to help.
        </h4>
        <Info>
          <Details>
            <p>
              Our platform is a one-stop solution for businesses looking to
              improve their online presence and increase sales. We provide
              real-time access to thousands of industry-specific social media
              influencers at the click of a button, allowing you to easily find
              and collaborate with the right partners to elevate your brand
              perception and increase sales.
              <br /> <br />
              We also offer a business collaboration hub where complementary
              businesses can cross-pollinate their audiences and a pool of
              vetted and approved creatives ready to bring campaigns to life.
              With clear data reporting and a user-friendly interface, our
              platform simplifies the process of finding and collaborating with
              the right partners to drive success.
            </p>
          </Details>
          <ImgContainer>
            <Image
              src="/hero1.png"
              alt="banner"
              layout="fill"
              loading="lazy"
              objectFit="cover"
              objectPosition="center"
            />
          </ImgContainer>
        </Info>
      </Wrapper>
      <AccessCardT>
        <p>
          Join our waitlist today to be the first to know when we launch. As a
          thank you for your interest, you will receive 6 months of free use
          without paying any commission when you sign up. Don&apos;t miss out on
          this exclusive opportunity to take your business to the next level
          with Influenzit.
        </p>
        <h4>
          Sign up now and be a part of the future of influencer marketing.
        </h4>
        <IframeWrapperT>
          <iframe src="https://cdn.forms-content.sg-form.com/0843c3b7-d63d-11ed-b682-ca7e906127bd"></iframe>
        </IframeWrapperT>
      </AccessCardT>
      <WrapperSix>
        <h1>Frequently asked questions</h1>
        <p>Everything you need to know about the product and billing.</p>
        <FaqWrapper>
          {faqs.map((val, i) => (
            <Faq key={i}>
              <Question onClick={() => handleFaqToggle(i)}>
                <span>{val.question}</span>
                <span>
                  {faq?.[i] ? (
                    <Image src="/close.svg" alt="" height={20} width={20} />
                  ) : (
                    <Image src="/open.svg" alt="" height={20} width={20} />
                  )}
                </span>
              </Question>
              {faq?.[i] && <Answer>{val.answer}</Answer>}
            </Faq>
          ))}
        </FaqWrapper>
      </WrapperSix>
      <Footer />
      {loadingStatus && <Loader />}
    </Container>
  );
};

export default BusinessWaitlist;
