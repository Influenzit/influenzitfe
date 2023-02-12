import React from 'react';
import LandingLayout from '../layouts/landing.layout';
import Image from 'next/image';
import Link from 'next/link';
import { Banner, Container, Faq, Faqs, Section, TopBanner, Wrapper } from '../styles/faq.style';

const FAQs = () => {
    const faqs = [
        {
          question: "Is there a free trial available?",
          answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        },
        {
          question: "Can I change my plan later?",
          answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        },
        {
          question: "Can I change my plan later?",
          answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        },
        {
          question: "Can I change my plan later?",
          answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        }
      ]
    return (
        <Container>
            <Section>
                <TopBanner>
                    <span>FREQUENTLY ASKED QUESTIONS</span>
                    <h1>Help Center</h1>
                    <p>Everything you need to know about the product and billing. Can't find the answer you're looking for. Please contact our support team</p>
                </TopBanner>
            </Section>
            <Wrapper>
                <h2>Business Owners</h2>
                <Faqs>
                    {faqs.map((val, i) => (
                        <Faq>
                            <h3>{val.question}</h3>
                            <p>{val.answer}</p>
                        </Faq>
                    ))}
                </Faqs>
                <h2>Inflencers / Creators</h2>
                <Faqs>
                    {faqs.map((val, i) => (
                        <Faq>
                            <h3>{val.question}</h3>
                            <p>{val.answer}</p>
                        </Faq>
                    ))}
                </Faqs>
                <Banner>
                    <Image src="/banner-s.png" height={40} width={85}/>
                    <h3>Still have questions?</h3>
                    <p>Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    <Link href="/contact" passHref>
                        <a>Get in touch</a>
                    </Link>
                </Banner>
            </Wrapper>
        </Container>
    )
}
FAQs.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default FAQs