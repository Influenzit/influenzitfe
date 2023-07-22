import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LandingLayout from '../../layouts/landing.layout'
import { EbookCard, EbookWrapper, HeroSectionTwo, ImgSect, Wrapper } from '../../styles/ebooks.style'

const Ebooks = () => {
  return (
    <div>
        <HeroSectionTwo>
            <Wrapper>
                <h3>Guides</h3>
                <EbookWrapper>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Finding and Collaborating with Influencers</h4>
                        <p>Creation Date: July 19, 2023</p>
                        <Link href="/guides/1">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Influencer Registration and Profile Setup for Influenzit App</h4>
                        <p>Creation Date: July 18, 2023</p>
                        <Link href="/guides/2">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Navigating the Home Page</h4>
                        <p>Creation Date: July 18, 2023</p>
                        <Link href="/guides/3">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Step-by-Step Instructions for Creating a Campaign</h4>
                        <p>Creation Date: July 18, 2023</p>
                        <Link href="/guides/4">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Step-by-Step Process for Depositing Funds into Wallet and Making a Payment</h4>
                        <p>Creation Date: July 19, 2023</p>
                        <Link href="/guides/5">
                            <a>View</a>
                        </Link>
                    </EbookCard>

                </EbookWrapper>
            </Wrapper>
        </HeroSectionTwo>
    </div>
  )
}
Ebooks.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Ebooks
