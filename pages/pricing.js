import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CancelIcon, CheckIcon } from '../assets/svgIcons'
import LandingLayout from '../layouts/landing.layout'
import { Bottom, HeroSectionOne, HeroSectionTwo, PricingContainer, PricingContent, PricingItem, PricingListCont, PricingType, PricingWrapper, SocialLinks, Top, Wrapper } from '../styles/pricing.style'

const Pricing = () => {
  return (
    <div>
        <HeroSectionOne>
            <h1>Pricing</h1>
        </HeroSectionOne>
        <HeroSectionTwo>
            <Wrapper>
                <h3>Join the league of <span>business brands and agencies</span> already on the <span>Business plan</span></h3>
                <PricingWrapper>
                    <PricingContainer>
                        <PricingContent>
                            <PricingType>
                                <h3>Starter</h3>
                                <p>For small campaigns.</p>
                            </PricingType>
                            <SocialLinks>
                                <span>
                                    <Image src="/facebook.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/twitter.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/instagram.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/youtube.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/tiktok.svg" height={25} width={25}/>
                                </span>
                            </SocialLinks>
                            <PricingListCont>
                                <p>Included features:</p>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <Link href="/" passHref>
                                    <a>Contact Us</a>
                                </Link>
                            </PricingListCont>
                        </PricingContent>
                    </PricingContainer>
                    <PricingContainer>
                        <Top>
                            <Image src="/fire.svg" alt="fire" height={30} width={40}/>
                            <span>The Most Popular</span>
                        </Top>
                        <PricingContent>
                            <PricingType>
                                <h3>Business</h3>
                                <p>For advance needs.</p>
                            </PricingType>
                            <SocialLinks>
                                <span>
                                    <Image src="/facebook.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/twitter.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/instagram.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/youtube.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/tiktok.svg" height={25} width={25}/>
                                </span>
                            </SocialLinks>

                            <PricingListCont>
                                <p>Included features:</p>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CancelIcon />
                                </PricingItem>
                                <Link href="/" passHref>
                                    <a>Contact Us</a>
                                </Link>
                            </PricingListCont>
                        </PricingContent>
                        <Bottom></Bottom>
                    </PricingContainer>
                    <PricingContainer>
                        <PricingContent>
                            <PricingType>
                                <h3>Gold</h3>
                                <p>For large campaigns.</p>
                            </PricingType>
                            <SocialLinks>
                            <span>
                                    <Image src="/facebook.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/twitter.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/instagram.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/youtube.svg" height={25} width={25}/>
                                </span>
                                <span>
                                    <Image src="/tiktok.svg" height={25} width={25}/>
                                </span>
                            </SocialLinks>
                            <PricingListCont>
                                <p>Included features:</p>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <PricingItem>
                                    <span>Access to 500 influencers</span>
                                    <CheckIcon />
                                </PricingItem>
                                <Link href="/" passHref>
                                    <a>Contact Us</a>
                                </Link>
                            </PricingListCont>
                        </PricingContent>
                    </PricingContainer>
                </PricingWrapper>
            </Wrapper>
        </HeroSectionTwo>
    </div>
  )
}
Pricing.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Pricing