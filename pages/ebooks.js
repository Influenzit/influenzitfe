import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LandingLayout from '../layouts/Landing.layout'
import { EbookCard, EbookWrapper, HeroSectionTwo, ImgSect, Wrapper } from '../styles/ebooks.style'
import { HeroSectionOne } from '../styles/pricing.style'

const Ebooks = () => {
  return (
    <div>
        <HeroSectionOne>
            <h1>Ebooks</h1>
        </HeroSectionOne>
        <HeroSectionTwo>
            <Wrapper>
                <h3>All ebooks</h3>
                <EbookWrapper>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Lorem ipsum dolor sit amet, sit lorem are consectetuer adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros.</p>
                        <Link href="/">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Lorem ipsum dolor sit amet, sit lorem are consectetuer adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros.</p>
                        <Link href="/">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Lorem ipsum dolor sit amet, sit lorem are consectetuer adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros.</p>
                        <Link href="/">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Lorem ipsum dolor sit amet, sit lorem are consectetuer adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros.</p>
                        <Link href="/">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Lorem ipsum dolor sit amet, sit lorem are consectetuer adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros.</p>
                        <Link href="/">
                            <a>View</a>
                        </Link>
                    </EbookCard>
                    <EbookCard>
                        <ImgSect>
                            <Image src="/hero-6.png" alt="blog image" layout="fill" objectPosition="center" objectFit='cover' />
                        </ImgSect>
                        <h4>Lorem ipsum dolor sit amet, sit lorem are consectetuer adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer et ipsu adipiscing elit. Donec odio. Quisque lore volutpat mattis eros.</p>
                        <Link href="/">
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