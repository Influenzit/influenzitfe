import React from "react";
import LandingLayout from "../layouts/landing.layout";
import Image from "next/image";
import Link from "next/link";
import {
  Banner,
  Container,
  Faq,
  Faqs,
  Section,
  TopBanner,
  Wrapper,
} from "../styles/faq.style";

const FAQs = () => {
  const faqs = [
    {
      question: "How do I sign up for early access to Influenzit?",
      answer:
        "You can sign up for early access by providing your email address on our pre-launch landing page.",
    },
    {
      question: "What kind of collaborations are available on Influenzit?",
      answer:
        "Influenzit offers collaborations with a diverse range of business owners across a variety of industries. You can easily find and collaborate with brands that align with your interests and audience. Brands can also find and reach out to you from your profile",
    },
    {
      question: "How does Influenzit help me grow my following?",
      answer:
        "Influenzit offers a range of resources and support for new influencers to help them grow their following and succeed in the industry. Our platform also connects you with complementary businesses and creatives to cross-pollinate your audiences.",
    },
    {
      question: "How do I measure the success of my campaigns on Influenzit?",
      answer: `Influenzit offers data reporting that allows you to measure the success of your campaigns and make informed decisions about future collaborations. You can track metrics such as engagement, reach, and conversions.  
          Don't miss out on the opportunity to monetize your influence and connect with the right brands and campaigns. Sign up for early access to Influenzit today and be among the first to experience our unique platform.
          `,
    },
  ];
  return (
    <Container>
      <Section>
        <TopBanner>
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <h1>Help Center</h1>
          <p>
            Everything you need to know about the product and billing.
            Can&apos;t find the answer you&apos;re looking for. Please contact
            our support team
          </p>
        </TopBanner>
      </Section>
      <Wrapper>
        <h2>Business Owners</h2>
        <Faqs>
          {faqs.map((val, i) => (
            <Faq key={i}>
              <h3>{val.question}</h3>
              <p>{val.answer}</p>
            </Faq>
          ))}
        </Faqs>
        <h2>Inflencers / Creators</h2>
        <Faqs>
          {faqs.map((val, i) => (
            <Faq key={i}>
              <h3>{val.question}</h3>
              <p>{val.answer}</p>
            </Faq>
          ))}
        </Faqs>
        <Banner>
          <Image src="/banner-s.png" height={40} width={85} />
          <h3>Still have questions?</h3>
          <p>
            Can&apos;t find the answer you&apos;re looking for? Please chat to
            our friendly team.
          </p>
          <Link href="/contact" passHref>
            <a>Get in touch</a>
          </Link>
        </Banner>
      </Wrapper>
    </Container>
  );
};
FAQs.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default FAQs;
