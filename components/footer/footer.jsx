import React from 'react'
import { Bottom, BottomLinks, Container, Logo, MainSection, Section, SocialLinks, Top, Wrapper } from './style'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <Container>
        <Wrapper>
            <Top>
                <MainSection>
                <Image src="/influenzit_logo.png" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
                <p>We&apos;d love to hear from you! Contact us via email, phone, or live chat for any questions, feedback, or inquiries.</p>
                    <ul>
                        <li><Link href="mailto:help@influenzit.com">help@influenzit.com</Link></li>
                        <li><Link href="tel:+2349098765432">+2349098765432</Link></li>
                    </ul>
                </MainSection>
                <Section>
                    <h3>Company</h3>
                    <ul>
                        {/* <li><Link href="/about">About</Link></li> */}
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </Section>
                <Section>
                    <h3>Discover</h3>
                    <ul>
                        <li><Link href="/explore/influencers">Find Influencers</Link></li>
                        <li><Link href="/explore/creators">Find Creators</Link></li>
                        <li><Link href="/explore/services">Buy Services</Link></li>
                    </ul>
                </Section>
                <Section>
                    <h3>Information</h3>
                    <ul>
                        {/* <li><Link href="/explore">How it Works</Link></li> */}
                        <li><Link href="/faqs">Frequently Asked Questions</Link></li>
                        <li><Link href="/helps">Helps</Link></li>
                        {/* <li><Link href="/resources">Resources</Link></li> */}
                    </ul>
                </Section>
            </Top>
            <Bottom>
                <p>&copy; 2023. Influenzit is owned and operated by ASCEND BRAND MANAGEMENT LIMITED. All rights reserved.</p>
                <BottomLinks>
                    <Link href="/terms">Terms &amp; Conditions</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                </BottomLinks>
                <BottomLinks>
                    <Link href="/">
                        <a>
                            <Image src="/facebook.svg" alt="" height={20} width={20} />
                        </a>
                    </Link>
                    <Link href="/">
                        <a>
                            <Image src="/twitter.svg" alt="" height={20} width={20} />
                        </a>
                    </Link>
                    <Link href="/">
                        <a>
                            <Image src="/instagram.svg" alt="" height={20} width={20} />
                        </a>
                    </Link>
                </BottomLinks>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Footer