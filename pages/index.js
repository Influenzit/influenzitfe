import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getExploreNiches } from "../api/influencer"
import LandingLayout from "../layouts/landing.layout"
import { Answer, Banner, BannerImg, CustomSelect, Faq, FaqWrapper, HeroSectionFive, HeroSectionFour, HeroSectionOne, HeroSectionSix, HeroSectionThree, HeroSectionTwo, ImageWrapper, ImgSlider, ImgW1, ImgWrapper, Info, Infos, InfoCard, InfoCardM, InfoCardMob, InfoDetails, InfoList, InfoSectOne, ListItem, NicheCard, NicheWrapper, Question, ReviewCard, ReviewWrapper, SlideBtn, SlideControl, UserCard, UserDetails, UserImage, WrapperFive, WrapperFour, WrapperOne, WrapperSix, WrapperThree, WrapperTwo, FormDivide } from "../styles/home.style"

const Home = () => {
  const [faq, setFaq] = useState({});
  const [nicheVal, setNicheVal] = useState("");
  const [searchString, setSearchString] = useState("");
  const handleFaqToggle = (index) => {
    console.log(index)
    setFaq((prev) => {
      let copyOfPrev = {...prev};
      if(!!copyOfPrev?.[index]) {
        copyOfPrev = {...copyOfPrev, [index]: false}
      } else {
        copyOfPrev = {...copyOfPrev, [index]: true}
      }
      console.log(copyOfPrev);
      return copyOfPrev;
    })
  }
  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    }
  ]
  const { data, refetch } = useQuery(["get-niche"], async () => {
      return await getExploreNiches();
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false
  });
  useEffect(() => {
    refetch();
  }, [])
  
  return (
    <div>
      <HeroSectionOne>
        <WrapperOne>
          <h1>Find the Perfect <span>Influencer</span> for your Business with just a Few Clicks</h1>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <form>
            <FormDivide>
            <CustomSelect borderLeft>
              <label>Category</label>
              <select val={nicheVal} onChange={(e) => setNicheVal(e.target.value)}>
                <option value="Influencer">Influencer</option>
                <option value="Creator">Creator</option>
                <option value="Creator">Business Owner</option>
              </select>
            </CustomSelect>
            <CustomSelect borderLeft>
              <label>Platform</label>
              <select val={nicheVal} onChange={(e) => setNicheVal(e.target.value)}>
                <option value="">Choose a platform</option>
                {
                  data?.data?.data?.map((val, i) => (
                    <option key={i} value={val.name}>{val.name}</option>
                  ))
                }
              </select>
            </CustomSelect>
            </FormDivide>
            <CustomSelect>
              <label>Search</label>
              <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Enter keyword, niche or category" />
            </CustomSelect>
            <button onClick={(e) => {
              e.preventDefault();
              router.push(`/explore?search=${searchString}&niche=${nicheVal.toLocaleLowerCase()}`);
            }}><span>Search</span> <Image src="/search.svg" height={15} width={15}/></button>
          </form>
          <BannerImg>
          </BannerImg>
        </WrapperOne>
      </HeroSectionOne>
      <HeroSectionTwo>
        <h1>Access Data . Run Campaigns <br /><span>Drive Sales</span></h1>
        <p>Discover the top influencers for your product. Efficiently identify and engage with the most relevant key creators for your brand, then start driving revenue from their audiences.</p>
      </HeroSectionTwo>
      <HeroSectionThree>
        <WrapperThree>
          <InfoCardM>
              <Info>
                <span>SEARCH INFLUENCERS</span>
                <h1>Find the right influencer for your business needs</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Info>
              <ImageWrapper>
                <Image src="/hero1.png" alt='' layout='fill' objectFit='contain' objectPosition="right" />
              </ImageWrapper>
            </InfoCardM>
            <InfoCardM>
              <ImageWrapper>
                <Image src="/hero2.png" alt='' layout='fill' objectFit='contain' objectPosition="left" />
              </ImageWrapper>
              <Info leftP>
                <span>INFLUENCER INSIGHTS</span>
                <h1>Make better decisions with detailed analytics</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Info>
            </InfoCardM>
            <InfoCardM>
              <Info>
                <span>PROJECT MANAGEMENT</span>
                <h1>Manage campaigns and projects seamlessly</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Info>
              <ImageWrapper>
                <Image src="/hero4.png" alt='' layout='fill' objectFit='contain' objectPosition="right" />
              </ImageWrapper>
            </InfoCardM>
            <InfoCardM>
              <ImageWrapper>
                <Image src="/hero3.png" alt='' layout='fill' objectFit='contain' objectPosition="left" />
              </ImageWrapper>
              <Info leftP>
                <span>SECURE PAYMENTS</span>
                <h1>Handle influencer payments easily</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Info>
            </InfoCardM>

            {/* Mobile Version */}

            <InfoCardMob>
              <ImageWrapper>
                <Image src="/hero1.png" alt='' layout='fill' objectFit='contain' objectPosition="center" />
              </ImageWrapper>
              <Infos>
                <span>SEARCH INFLUENCERS</span>
                <h1>Find the right influencer for your business needs</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Infos>
            </InfoCardMob>
            <InfoCardMob>
              <ImageWrapper>
                <Image src="/hero2.png" alt='' layout='fill' objectFit='contain' objectPosition="center" />
              </ImageWrapper>
              <Infos>
                <span>INFLUENCER INSIGHTS</span>
                <h1>Make better decisions with detailed analytics</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Infos>
            </InfoCardMob>
            <InfoCardMob>
              <ImageWrapper>
                <Image src="/hero4.png" alt='' layout='fill' objectFit='contain' objectPosition="center" />
              </ImageWrapper>
              <Infos>
                <span>PROJECT MANAGEMENT</span>
                <h1>Manage campaigns and projects seamlessly</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Infos>
            </InfoCardMob>
            <InfoCardMob>
              <ImageWrapper>
                <Image src="/hero3.png" alt='' layout='fill' objectFit='contain' objectPosition="center" />
              </ImageWrapper>
              <Infos>
                <span>SECURE PAYMENTS</span>
                <h1>Handle influencer payments easily</h1>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <Link href="/explore" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Infos>
            </InfoCardMob>


        </WrapperThree>
      </HeroSectionThree>
      <HeroSectionFour>
        <WrapperFour>
          <h1>Over <span>500 Influencers</span> Available</h1>
          <p>When you choose Influenzit over other solutions, you&apos;ll grow 2.3x faster, and save hundreds of hours wasted on boring manual work.</p>
          <NicheWrapper>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche1.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Food</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche2.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Fashion</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche3.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Travel</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche4.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Lifestyle</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche5.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Tech</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche6.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Family &amp; Children</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche7.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Health &amp; Fitness</span>
            </NicheCard>
            <NicheCard>
              <ImgW1 id="anim">
                <Image src="/niche8.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Hair</span>
            </NicheCard>
          </NicheWrapper>
          <Link href="/explore" passHref>
            <a>Explore all influencers</a>
          </Link>
        </WrapperFour>
      </HeroSectionFour>
      <HeroSectionFive>
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
      </HeroSectionFive>
      <HeroSectionSix>
        <WrapperSix>
          <h1>Frequently asked questions</h1>
          <p>Everything you need to know about the product and billing.</p>
          <FaqWrapper>
            {
              faqs.map((val, i) => (
                <Faq key={i}>
                  <Question onClick={() => handleFaqToggle(i)}>
                    <span>{val.question}</span>
                    <span>{faq?.[i] ? (<Image src="/close.svg" alt="" height={20} width={20} />) : (<Image src="/open.svg" alt="" height={20} width={20} />)}</span>
                  </Question>
                  {
                    faq?.[i] && (
                      <Answer>
                        {val.answer}
                      </Answer>
                    )
                  }
                </Faq>
              ))
            }
            <Link href="/faqs" passHref>
              <a>View all FAQs</a>
            </Link>
          </FaqWrapper>
          <Banner>
            <div>
              <h2>Take your sales to the next level with Influenzit</h2>
              <Link href="/register" passHref>
                <a>Get Started</a>
              </Link>
            </div>
          </Banner>
        </WrapperSix>
      </HeroSectionSix>
    </div>
  )
}
Home.getLayout = (page) => {
  return (
    <LandingLayout>
      {page}
    </LandingLayout>
  )
}
export default Home;
