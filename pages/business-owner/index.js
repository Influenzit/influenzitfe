import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LandingLayout from '../../layouts/Landing.layout'
import { HeroSectionOne, HeroSectionTwo, ImageWrapper, Info, InfoCard, LastInfo, WrapperTwo } from '../../styles/creator.style'

const BusinessOwner = () => {
  return (
    <div>
      <HeroSectionOne>
        <h1>A community of <span>Business Owners</span></h1>
        <p>Work with the <b><i>best brands</i></b> that match your audience, passion, and purpose.</p>
        <Link href="/register" passHref>
          <a>Get Started</a>
        </Link>
      </HeroSectionOne>
      <HeroSectionTwo>
        <WrapperTwo>
          <InfoCard>
            <Info>
              <span>STEP 1</span>
              <h3>Register as a Business Owner</h3>
              <p>Excepteur sint occaecat cupidatat non proident, 
                saeunt in culpa qui officia deserunt mollit anim 
                laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, 
                totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia 
                couuntur magni dolores eos aquist ratione vtatem seque nesnt.
              </p>
            </Info>
            <ImageWrapper>
              <Image src="/info-1.png" alt='' layout='fill' objectFit='cover' objectPosition="center" />
            </ImageWrapper>
          </InfoCard>
          <InfoCard>
            <ImageWrapper>
              <Image src="/info-4.png" alt='' layout='fill' objectFit='cover' objectPosition="center" />
            </ImageWrapper>
            <Info>
              <span>STEP 2</span>
              <h3>Update your business profile</h3>
              <p>Excepteur sint occaecat cupidatat non proident, 
                saeunt in culpa qui officia deserunt mollit anim 
                laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, 
                totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia 
                couuntur magni dolores eos aquist ratione vtatem seque nesnt.
              </p>
            </Info>
          </InfoCard>
          <InfoCard>
            <Info>
              <span>STEP 3</span>
              <h3>Connect your social media handles</h3>
              <p>Excepteur sint occaecat cupidatat non proident, 
                saeunt in culpa qui officia deserunt mollit anim 
                laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, 
                totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia 
                couuntur magni dolores eos aquist ratione vtatem seque nesnt.
              </p>
            </Info>
            <ImageWrapper>
              <Image src="/info-2.png" alt='' layout='fill' objectFit='cover' objectPosition="center" />
            </ImageWrapper>
          </InfoCard>
          <InfoCard>
            <ImageWrapper>
              <Image src="/info-3.png" alt='' layout='fill' objectFit='cover' objectPosition="center" />
            </ImageWrapper>
            <Info>
              <span>STEP 4</span>
              <h3>Connect with brands from anywhere.</h3>
              <p>Excepteur sint occaecat cupidatat non proident, 
                saeunt in culpa qui officia deserunt mollit anim 
                laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, 
                totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia 
                couuntur magni dolores eos aquist ratione vtatem seque nesnt.
              </p>
            </Info>
          </InfoCard>
          <LastInfo>
            <h1>Don&apos;t settle. More <span>Collaboration</span>. More <span>Deals</span>. More <span>Money</span>.</h1>
            <p>Seal More Deals from our unlimited pool of quality brands to collaborate with!</p>
            <Link href="/register" passHref>
              <a>Become an Influencer</a>
            </Link>
          </LastInfo>
        </WrapperTwo>
      </HeroSectionTwo>
    </div>
  )
}
BusinessOwner.getLayout = (page) => {
    return (
      <LandingLayout>
        {page}
      </LandingLayout>
    )
  }

export default BusinessOwner