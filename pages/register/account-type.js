import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LandingLayout from '../../layouts/Landing.layout'
import { Container, FirstIcon, IconContainer, Option, OptionWrapper, SecondIcon, Wrapper } from '../../styles/choose-profile'

const ChooseProfile = () => {
  return (
    <Container>
      <Wrapper>
        <h1>Choose an account type</h1>
        <OptionWrapper>
          <Option>
            <IconContainer>
              <FirstIcon>
                <Image src="/shop-g.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </FirstIcon>
              <SecondIcon>
                <Image src="/subtract.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </SecondIcon>
            </IconContainer>
            <h2>Business Owners</h2>
            <p>Business looking to work with influencers and creators</p>
            <Link href="/register/business-owner">
              <a>Get Started</a>
            </Link>
          </Option>
          <Option>
            <IconContainer>
              <FirstIcon>
                <Image src="/speaker.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </FirstIcon>
              <SecondIcon>
                <Image src="/subtract.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </SecondIcon>
            </IconContainer>
            <h2>influencers</h2>
            <p>Social media personalities with huge audience</p>
            <Link href="/register/influencer">
              <a>Get Started</a>
            </Link>
          </Option>
          <Option>
            <IconContainer>
              <FirstIcon>
                <Image src="/employer.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </FirstIcon>
              <SecondIcon>
                <Image src="/subtract.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </SecondIcon>
            </IconContainer>
            <h2>Creators</h2>
            <p>Graphic designers, copywriters, video editors, web designers etc.</p>
            <Link href="/register/creator">
              <a>Get Started</a>
            </Link>
          </Option>
        </OptionWrapper>
      </Wrapper>
    </Container>
  )
}
ChooseProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default ChooseProfile