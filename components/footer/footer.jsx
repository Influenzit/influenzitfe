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
                    <Image src="/influenzit-w.svg" alt="" height={25} width={120} />
                    <p>Join our newsletter</p>
                    <form>
                        <input type="email" placeholder="Email address" />
                        <button>
                            <Image src="/send.svg" alt="" height={30} width={30}/>
                        </button>
                    </form>
                </MainSection>
                <Section>
                    <h3>Company</h3>
                    <ul>
                        <li><Link href="/about">About us</Link></li>
                        <li><Link href="/how-it-works">How it works</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/faqs">FAQs</Link></li>
                    </ul>
                </Section>
                <Section>
                    <h3>Get engaged</h3>
                    <ul>
                        <li><Link href="/search">Search by niche</Link></li>
                        <li><Link href="/creator-signup">Become a creator</Link></li>
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/ebooks">Ebooks</Link></li>
                    </ul>
                </Section>
                <Section>
                    <h3>Company</h3>
                    <ul>
                        <li><Link href="mailto:help@influenzit.com">help@influenzit.com</Link></li>
                        <li><Link href="tel:+2349098765432">+2349098765432</Link></li>
                    </ul>
                    <SocialLinks>
                        <Link href="https://" target="_blank">
                            <Image src="/facebook.svg" height={25} width={25}/>
                        </Link>
                        <Link href="https://" target="_blank">
                            <Image src="/twitter.svg" height={25} width={25}/>
                        </Link>
                        <Link href="https://" target="_blank">
                            <Image src="/instagram.svg" height={25} width={25}/>
                        </Link>
                        <Link href="https://" target="_blank">
                            <Image src="/linkedin.svg" height={25} width={25}/>
                        </Link>
                        <Link href="https://" target="_blank">
                            <Image src="/pintrest.svg" height={25} width={25}/>
                        </Link>
                    </SocialLinks>
                </Section>
            </Top>
            <Bottom>
                <p>Copyright &copy; 2022 Influnzeit, All Right Reserved Websitechic.</p>
                <BottomLinks>
                    <Link href="/terms">Terms of Use</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                </BottomLinks>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Footer