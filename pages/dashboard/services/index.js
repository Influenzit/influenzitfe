import Image from 'next/image'
import React, { useState } from 'react'
import LandingLayout from '../../../layouts/landing.layout'
import { Container, DetailTab, LeftControl, RightControl, TopTabContainer, Wrapper, ContainerB, Left, Section, CurrentPosition, ImageSlides, CtrlBtn, Images, Header, Desc, SectionM, ProfileCard, ImageWrapper, ProfileDetails, Stars, FaqWrapper, FaqCont, FaqQuest, FaqAns, ReviewWrapper, Review, ReviewL, ReviewImg, ReviewR, ReviewMsg, Right, PackageCard, PackageTabs, PackageTab, Package, PHead, PDetails, PFeatures, Feature, ContinueBtn, WrapperT, AboutWrapper, Bio, RCountry } from '../../../styles/service.style'
import heartIcon from '../../../assets/heart.svg';
import shareIcon from '../../../assets/share.svg';
import chevLeftIcon from '../../../assets/chev-left.svg';
import chevRightIcon from '../../../assets/chev-right.svg';
import chevDownIcon from '../../../assets/chev-down.svg';
import chevUpIcon from '../../../assets/chev-up.svg';
import starIcon from '../../../assets/star.svg';
import fillStarIcon from '../../../assets/fill-star.svg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useEffect } from 'react';

const ServiceView = () => {
  const [packageType, setPackageType] = useState("basic");
  const [showFaq, setShowFaq] = useState(null);
  const Faqs = [
    {
        question: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa?",
        answer: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa?",
        answer: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa?",
        answer: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa?",
        answer: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa?",
        answer: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem."
    },
  ]
  const handleToggle = (i) => {
    if(showFaq[i]){
        setShowFaq((prev) => {
            const copyOf = {...prev};
            copyOf[i] = false;
            return copyOf;
        });
    } else {
        setShowFaq((prev) => {
            const copyOf = {...prev};
            copyOf[i] = true;
            return copyOf;
        });
    }
  }
  useEffect(() => {
    let sFaq = {};
    Faqs.forEach((_, i) => {
        sFaq = {...sFaq, [i]: false};
    })
    setShowFaq(sFaq);
  }, [])
  
  return (
    <Container>
        <TopTabContainer>
            <WrapperT>
                <LeftControl>
                    <DetailTab>Overview</DetailTab>
                    <DetailTab>About Influencer</DetailTab>
                    <DetailTab>FAQs</DetailTab>
                    <DetailTab>Reviews</DetailTab>
                </LeftControl>
                <RightControl>
                    <button>
                        <Image src={heartIcon} height={21} width={21} />
                    </button>
                    <button>
                        <Image src={shareIcon} height={21} width={21} />
                    </button>
                </RightControl>
            </WrapperT>
        </TopTabContainer>
        <Wrapper>
            <ContainerB>
                <Left>
                    <Section>
                        <CurrentPosition>
                            <p>Category &gt; Sub-category &gt; Tag</p>
                        </CurrentPosition>
                        <h2>I will make a post about your product on Instagram</h2>
                        <ImageSlides>
                            <Slide 
                                prevArrow={
                                    <CtrlBtn leftS={true}>
                                        <Image src={chevLeftIcon} alt="chev-left" height={20} width={15} />
                                    </CtrlBtn>
                                }
                                nextArrow={
                                    <CtrlBtn>
                                        <Image src={chevRightIcon} alt="chev-left" height={20} width={15} />
                                    </CtrlBtn>
                                }
                            > 
                                <Images>
                                    <Image src="/wp.png" layout='fill' objectFit='cover' objectPosition='center' quality={100} />
                                </Images>
                                <Images>
                                    <Image src="/wp.png" layout='fill' objectFit='cover' objectPosition='center' quality={100}/>
                                </Images>
                            </Slide>
                        </ImageSlides>
                        <Header style={{ paddingLeft: "0" }}>
                            <h3>Description</h3>
                        </Header>
                        <Desc>
                            Excepteur sint occaecat cupidatat non proident, saeunt 
                            in culpa qui officia deserunt mollit anim laborum. Seden 
                            utem perspiciatis undesieu omnis voluptatem alert of 
                            the accusantium doque laudantium, totam rem aiam eaqueiu 
                            ipsa quae ab illoion fabric inventore veritatisetm 
                            quasitea architecto beataea dictaed quia couuntur magni 
                            lorem dolores eos aquist ratione vtatem seque nesnt. 
                            Neque porro quamest quioremas ete ipsum quiatem dolor 
                            sitem ameteism conctetur adipisci velit sedate quianon.
                        </Desc>
                    </Section>
                    <SectionM>
                        <Header>
                            <h3>About the Influencer</h3>
                        </Header>
                        <AboutWrapper>
                            <ProfileCard>
                                <ImageWrapper>
                                    <Image src="/profile-2.png" layout='fill' objectFit="cover" objectPosition="center" />
                                </ImageWrapper>
                                <ProfileDetails>
                                    <h3>Ezekiel Alawode</h3>
                                    <Stars>
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={starIcon} height={15} width={15} />
                                    </Stars>
                                    <div><Image src="/flag.svg" height={25} width={25}/><p>Lagos, Nigeria</p></div>
                                    <p>Member since Feb 09, 2021.</p>
                                </ProfileDetails>
                            </ProfileCard>
                            <Bio>Excepteur sint occaecat cupidatat non proident, saeunt 
                                in culpa qui officia deserunt mollit anim laborum. Seden 
                                utem perspiciatis undesieu omnis voluptatem accusantium doque 
                                laudantium, totam rem aiam eaqueiu ipsa laudantium, totam 
                                rem aiam eaqueiu ipsa
                            </Bio>
                        </AboutWrapper>
                    </SectionM>
                    <SectionM>
                        <Header>
                            <h3>Frequently Asked Questions</h3>
                        </Header>
                        <FaqWrapper>
                            {
                                Faqs.map((val, i) => (
                                    <FaqCont key={i}>
                                        <FaqQuest onClick={() => handleToggle(i)} isActive={showFaq?.[i]}>
                                            <h4>{val.question}</h4>
                                            <button><Image src={(showFaq?.[i]) ? chevUpIcon : chevDownIcon} alt="" height={10} width={17}/></button>
                                        </FaqQuest>
                                        {
                                            showFaq?.[i] && <FaqAns>{val.answer}</FaqAns>
                                        }
                                    </FaqCont>
                                ))
                            }
                        </FaqWrapper>
                    </SectionM>
                    <SectionM>
                        <Header>
                            <h3>Reviews</h3>
                        </Header>
                        <ReviewWrapper>
                            <Review>
                                <ReviewL>
                                    <ReviewImg>
                                        <Image src="/p-2.svg" alt="" height={60} width={60} quality={100}/>
                                    </ReviewImg>
                                </ReviewL>
                                <ReviewR>
                                    <h4>Megayard</h4>
                                    <RCountry><Image src="/flag.svg" height={25} width={25}/><p>Lagos, Nigeria</p></RCountry>
                                    <Stars>
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={starIcon} height={15} width={15} />
                                    </Stars>
                                    <ReviewMsg>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem.</ReviewMsg>
                                </ReviewR>
                            </Review>
                            <Review>
                                <ReviewL>
                                    <ReviewImg>
                                        <Image src="/p-2.svg" alt="" height={60} width={60} quality={100}/>
                                    </ReviewImg>
                                </ReviewL>
                                <ReviewR>
                                    <h4>Megayard</h4>
                                    <RCountry><Image src="/flag.svg" height={25} width={25}/><p>Lagos, Nigeria</p></RCountry>
                                    <Stars>
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={starIcon} height={15} width={15} />
                                    </Stars>
                                    <ReviewMsg>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem.</ReviewMsg>
                                </ReviewR>
                            </Review>
                            <Review>
                                <ReviewL>
                                    <ReviewImg>
                                        <Image src="/p-2.svg" alt="" height={60} width={60} quality={100}/>
                                    </ReviewImg>
                                </ReviewL>
                                <ReviewR>
                                    <h4>Megayard</h4>
                                    <RCountry><Image src="/flag.svg" height={25} width={25}/><p>Lagos, Nigeria</p></RCountry>
                                    <Stars>
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={starIcon} height={15} width={15} />
                                    </Stars>
                                    <ReviewMsg>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem lorem.</ReviewMsg>
                                </ReviewR>
                            </Review>
                        </ReviewWrapper>
                    </SectionM>
                </Left>
                <Right>
                    <PackageCard>
                        <PackageTabs>
                            <PackageTab isActive={packageType === "basic"} onClick={() => setPackageType("basic")}>Basic</PackageTab>
                            <PackageTab isActive={packageType === "standard"} onClick={() => setPackageType("standard")}>Standard</PackageTab>
                            <PackageTab isActive={packageType === "premium"} onClick={() => setPackageType("premium")}>Premium</PackageTab>
                        </PackageTabs>
                        <Package>
                            <PHead>
                                <p>{packageType === "basic" ? "BASIC" : packageType === "standard" ?  "STANDARD" : "PREMIUM" }</p>
                                <p>#50,000</p>
                            </PHead>
                            <PDetails>
                                Excepteur sint occaecat cupidatat non dolor lorem proident, saeunt in culpa qui officia is deserunt mollit anim laborum.
                            </PDetails>
                            <PFeatures>
                                <Feature>
                                    <Image src="/check-square.svg" alt="" width={25} height={25}/>
                                    <p>Package Benefit One</p>
                                </Feature>
                                <Feature>
                                    <Image src="/check-square.svg" alt="" width={25} height={25}/>
                                    <p>Package Benefit One</p>
                                </Feature>
                                <Feature>
                                    <Image src="/check-square.svg" alt="" width={25} height={25}/>
                                    <p>Package Benefit One</p>
                                </Feature>
                                <Feature>
                                    <Image src="/check-square.svg" alt="" width={25} height={25}/>
                                    <p>Package Benefit One</p>
                                </Feature>
                                <Feature>
                                    <Image src="/check-square.svg" alt="" width={25} height={25}/>
                                    <p>Package Benefit One</p>
                                </Feature>
                            </PFeatures>
                            <ContinueBtn>Continue with Basic (#50,000)</ContinueBtn>
                        </Package>
                    </PackageCard>
                </Right>
            </ContainerB>
        </Wrapper>
    </Container>
  )
}
ServiceView.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default ServiceView