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
import { getService } from '../../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../app/reducers/status';
import { moneyStandard } from '../../../helpers/helper';

const ServiceView = () => {
  const [packageType, setPackageType] = useState("");
  const [inData, setInData] = useState(null);
  const [packages, setPackages] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-service"], async () => {
    return await getService(id);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess() {
        dispatch(setLoading(false));
    },
    onError(res) {
        dispatch(setLoading(false));
        router.push("/search");
    } 
});
  const { id } = router.query;
  const [showFaq, setShowFaq] = useState(null);
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
  const getCurrentPackage = () => inData?.packages.filter(val => val.name === packageType)[0];
  useEffect(() => {
    if (id) {
        refetchServiceData();
    }
  }, [id]);
  useEffect(() => {
    if(serviceData?.data?.data){
        setInData(serviceData?.data?.data);
        const packagesGotten = [];
        let sFaq = {};
        serviceData?.data?.data.faqs.forEach((_, i) => {
            sFaq = {...sFaq, [i]: false};
        })
        serviceData?.data?.data.packages.forEach((val) => {
            if (val.name === "Basic" && !packagesGotten[0]) {
                packagesGotten[0] = "Basic"
            }
            if(val.name === "Standard") {
                packagesGotten[1] = "Standard"
            }
            if(val.name === "Premium") {
                packagesGotten[2] = "Premium"
            }
        })
        const formattedPackages = packagesGotten.filter((val) => !!val);
        setShowFaq(sFaq);
        setPackages(formattedPackages);
        setPackageType(formattedPackages[0]);
    }
  }, [serviceData])
  
  
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
                            <p>Dashboard &gt; Services &gt; {id}</p>
                        </CurrentPosition>
                        <h2>{inData?.name}</h2>
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
                           {inData?.description}
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
                                    <h3>{inData?.user?.firstname} {inData?.user?.lastname}</h3>
                                    <Stars>
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={fillStarIcon} height={15} width={15} />
                                        <Image src={starIcon} height={15} width={15} />
                                    </Stars>
                                    <div><Image src="/flag.svg" height={25} width={25}/><p>{inData?.user.account.address}</p></div>
                                    <p>Member since {(new Date(inData?.user?.created_at).toDateString())}.</p>
                                </ProfileDetails>
                            </ProfileCard>
                            <Bio>
                                {inData?.user?.biography}
                            </Bio>
                        </AboutWrapper>
                    </SectionM>
                    <SectionM>
                        <Header>
                            <h3>Frequently Asked Questions</h3>
                        </Header>
                        <FaqWrapper>
                            {
                                inData?.faqs.map((val, i) => (
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
                            {
                                packages.map((val, i) => (
                                    <PackageTab key={i} isActive={packageType === val} onClick={() => setPackageType(val)}>{val}</PackageTab>
                                ))
                            }
                        </PackageTabs>
                        <Package>
                            <PHead>
                                <p style={{ textTransform: "uppercase" }}>{getCurrentPackage()?.name}</p>
                                <p>{getCurrentPackage()?.currency} {moneyStandard(getCurrentPackage()?.amount ?? 0)}</p>
                            </PHead>
                            <PDetails>
                                {getCurrentPackage()?.description}
                            </PDetails>
                            <PFeatures>
                                {
                                    getCurrentPackage()?.features.map((feature, i) => (
                                        <Feature key={i}>
                                            <Image src="/check-square.svg" alt="" width={25} height={25}/>
                                            <p>{feature.name}</p>
                                        </Feature>
                                    ))
                                }
                            </PFeatures>
                            <ContinueBtn>Continue with {getCurrentPackage()?.name} ({getCurrentPackage()?.currency} {moneyStandard(getCurrentPackage()?.amount ?? 0)})</ContinueBtn>
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