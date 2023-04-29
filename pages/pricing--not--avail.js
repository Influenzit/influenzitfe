import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { CancelIcon, CheckIcon } from '../assets/svgIcons'
import LandingLayout from '../layouts/landing.layout'
import { ReviewCard, ReviewWrapper, UserCard, UserDetails, UserImage, WrapperFive } from '../styles/home.style'
import { BillCard, TopBillCard, BillContainer, BillRate, Bottom, HeroSectionOne, HeroSectionTwo, Outlilnes, Outline, PricingContainer, PricingContent, PricingItem, PricingListCont, PricingType, PricingWrapper, SocialLinks, Top, Wrapper } from '../styles/pricing.style'
import { Section, TopBanner } from '../styles/search.style'

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  return (
    <>
        <Section>
            <TopBanner>
                <h1>Drive sales from your most influential customers with Influenzit</h1>
                <Outlilnes>
                    <Outline>
                        <Image src="/check.svg" height={25} width={25}/>
                        <span>Analyze Influencers</span>
                    </Outline>
                    <Outline>
                        <Image src="/check.svg" height={25} width={25}/>
                        <span>Secure Transactions</span>
                    </Outline>
                    <Outline>
                        <Image src="/check.svg" height={25} width={25}/>
                        <span>Cancel Anytime</span>
                    </Outline>
                </Outlilnes>
                <BillRate isYearly={isYearly}>
                    <p>Billed Yearly</p>
                    <button onClick={() => setIsYearly(!isYearly)}>
                        <span></span>
                    </button>
                    <p>Billed Monthly</p>
                </BillRate>
                <BillContainer>
                    <BillCard>
                        <TopBillCard>
                            <p>Starter</p>
                            <h1>Free</h1>
                            <span>{isYearly ? "per year" : "per month"}</span>
                            <a>Get Started</a>
                        </TopBillCard>
                        <div>
                            <span>Access to 100 influencers</span>
                            <span>Influencer Statistics Summary</span>
                            <span>10% Transaction fee</span>
                            <span>Access to all social networks</span>
                            <span>Access to 100 influencers</span>
                            <span>Influencer Statistics Summary</span>
                            <span>10% Transaction fee</span>
                            <span>Access to all social networks</span>
                        </div>
                    </BillCard>
                    <BillCard isOdd>
                        <h3>MOST POPULAR</h3>
                        <TopBillCard>
                            <p style={{color: "#FFF"}}>Business</p>
                            <h1 style={{color: "#FFF"}}>{isYearly ? "₦20,000" : "₦2,000"}</h1>
                            <span>{isYearly ? "per year" : "per month"}</span>
                            <a>Get Started</a>
                        </TopBillCard>
                        <div>
                            <span>Access to 100 influencers</span>
                            <span>Influencer Statistics Summary</span>
                            <span>10% Transaction fee</span>
                            <span>Access to all social networks</span>
                            <span>Access to 100 influencers</span>
                            <span>Influencer Statistics Summary</span>
                            <span>10% Transaction fee</span>
                            <span>Access to all social networks</span>
                        </div>
                    </BillCard>
                    <BillCard>
                        <TopBillCard>
                            <p>GOLD</p>
                            <h1>{isYearly ? "₦50,000" : "₦5,000"}</h1>
                            <span>{isYearly ? "per year" : "per month"}</span>
                            <a>Get Started</a>
                        </TopBillCard>
                        <div>
                            <span>Access to 100 influencers</span>
                            <span>Influencer Statistics Summary</span>
                            <span>10% Transaction fee</span>
                            <span>Access to all social networks</span>
                            <span>Access to 100 influencers</span>
                            <span>Influencer Statistics Summary</span>
                            <span>10% Transaction fee</span>
                            <span>Access to all social networks</span>
                        </div>
                    </BillCard>
                </BillContainer>
            </TopBanner>
        </Section>
        <HeroSectionTwo>
            <WrapperFive>
                <p id="heading">Testimonials</p>
                <h1>Don&apos;t take our word for it</h1>
                <ReviewWrapper>
                    <ReviewCard>
                    <h3>Testimonial Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget leo rutrum, ullamcorper dolor eu, faucibus massa.</p>
                    <UserCard>
                        <UserImage>
                            <Image src="/review.png" alt="review-img" layout="fill" objectFit="cover" objectPosition="center"/>
                        </UserImage>
                        <UserDetails>
                            <h4>Samuel Bezoz</h4>
                            <p>CEO at Krystal Shoe Palace</p>
                        </UserDetails>
                    </UserCard>
                    </ReviewCard>
                    <ReviewCard>
                    <h3>Testimonial Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget leo rutrum, ullamcorper dolor eu, faucibus massa.</p>
                    <UserCard>
                        <UserImage>
                            <Image src="/review.png" alt="review-img" layout="fill" objectFit="cover" objectPosition="center"/>
                        </UserImage>
                        <UserDetails>
                        <h4>Aaron Musk</h4>
                        <p>CEO at Krystal Bag Palace</p>
                        </UserDetails>
                    </UserCard>
                    </ReviewCard>
                    <ReviewCard>
                    <h3>Testimonial Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget leo rutrum, ullamcorper dolor eu, faucibus massa.</p>
                    <UserCard>
                        <UserImage>
                        <Image src="/review.png" alt="review-img" layout="fill" objectFit="cover" objectPosition="center"/>
                        </UserImage>
                        <UserDetails>
                        <h4>Ezekiel Alwode</h4>
                        <p>Developer</p>
                        </UserDetails>
                    </UserCard>
                    </ReviewCard>
                </ReviewWrapper>
            </WrapperFive>
        </HeroSectionTwo>
    </>
  )
}
Pricing.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Pricing