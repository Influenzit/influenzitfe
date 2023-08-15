import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getExploreNiches } from "../api/influencer"
import LandingLayout from "../layouts/landing.layout"
import { Answer, Banner, BannerImg, CustomSelect, Faq, FaqWrapper, HeroSectionFive, HeroSectionFour, HeroSectionOne, HeroSectionSix, HeroSectionThree, HeroSectionTwo, ImageWrapper, ImgSlider, ImgW1, ImgWrapper, Info, Infos, InfoCard, InfoCardM, InfoCardMob, InfoDetails, InfoList, InfoSectOne, ListItem, NicheCard, NicheWrapper, Question, ReviewCard, ReviewWrapper, SlideBtn, SlideControl, UserCard, UserDetails, UserImage, WrapperFive, WrapperFour, WrapperOne, WrapperSix, WrapperThree, WrapperTwo, FormDivide } from "../styles/home.style"
import { useRouter } from "next/router"

const Home = () => {
  const [faq, setFaq] = useState({});
  const [nicheVal, setNicheVal] = useState("Influencer");
  const [searchString, setSearchString] = useState("");
  const [platform, setPlatform] = useState("");
  const router = useRouter();
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
      question: "How do I sign up for early access to Influenzit?",
      answer:
        "You can sign up for early access by providing your email address on our pre-launch landing page.",
    },
    {
      question: "What kind of collaborations are available on Influenzit?",
      answer:
        "Influenzit offers collaborations with a diverse range of business owners across a variety of industries. You can easily find and collaborate with brands that align with your interests and audience. Brands can also find and reach out to you from your profile",
    },
    {
      question: "How does Influenzit help me grow my following?",
      answer:
        "Influenzit offers a range of resources and support for new influencers to help them grow their following and succeed in the industry. Our platform also connects you with complementary businesses and creatives to cross-pollinate your audiences.",
    },
    {
      question: "How do I measure the success of my campaigns on Influenzit?",
      answer: `Influenzit offers data reporting that allows you to measure the success of your campaigns and make informed decisions about future collaborations. You can track metrics such as engagement, reach, and conversions.  Don't miss out on the opportunity to monetize your influence and connect with the right brands and campaigns. Sign up for early access to Influenzit today and be among the first to experience our unique platform.`,
    },
  ];
  const { data, refetch } = useQuery(["get-niche"], async () => {
      return await getExploreNiches();
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false
  });
  const getCategoryRoute = () => {
    return nicheVal === "Influencer" ? "influencers" : nicheVal === "Creator" ? "creators": "services"
  }
  useEffect(() => {
    refetch();
  }, [])
  
  return (
    <div>
      <HeroSectionOne>
        <WrapperOne>
          <h1>We Connect <span>Influencers</span>, <span>Business Owners</span> and <span>Creators</span></h1>
          <p>The number one Influencer marketing Platform For Business Owners, Influencers and Creators</p>
          <form>
            <FormDivide>
            <CustomSelect borderLeft>
              <label>Category</label>
              <select val={nicheVal} onChange={(e) => setNicheVal(e.target.value)}>
                <option value="Influencer">Influencer</option>
                <option value="Creator">Creator</option>
                <option value="Service">Service</option>
              </select>
            </CustomSelect>
            <CustomSelect borderLeft>
              <label>Platform</label>
              <select val={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="">All</option>
                <option value="tiktok">Tiktok</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">Youtube</option>
                <option value="twitter">Twitter</option>
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
              router.push(`/explore/${getCategoryRoute()}?search=${searchString}`);
            }}><span>Search</span> <Image src="/search.svg" height={15} width={15}/></button>
          </form>
          <BannerImg>
          </BannerImg>
        </WrapperOne>
      </HeroSectionOne>
      <HeroSectionTwo>
        <h1>Find Influencers, Connect with Businesses, <br />Generate <span>Massive Sales</span> and Revenue</h1>
        <p>Discover the top influencers for your product. Efficiently identify and engage with the most relevant key creators for your brand, then start driving revenue from their audiences. We are here to make collaborations between businesses and influencers seamless</p>
      </HeroSectionTwo>
      <HeroSectionThree>
        <WrapperThree>
          <InfoCardM>
              <Info>
                <span>Connect With Influencers</span>
                <h1>Find the perfect influencer for your marketing campaign</h1>
                <p>Unlock the power of influencer marketing, and take your brand to new heights. We have result-driven and perfect influencers to promote your products and services to drive actual results. </p>
                <Link href="/explore/influencers" passHref>
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
                <span>Advanced Analytics</span>
                <h1>Make informed decisions with our advanced analytics</h1>
                <p>Leverage the power of comprehensive data to make smarter choices for your influencer marketing campaigns. Influenzit provides in-depth analytics, allowing you to track the performance and impact of your collaborations.
 Gain valuable insights into engagement, reach, and ROI, ensuring that you&apos;re always making informed decisions for your brand&apos;s growth. </p>
                <Link href="/explore/influencers" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Info>
            </InfoCardM>
            <InfoCardM>
              <Info>
                <span>PROJECT MANAGEMENT</span>
                <h1>Manage campaigns and projects seamlessly</h1>
                <p>Streamline your influencer marketing campaigns with Influenzit&apos;s intuitive project management tools. Effortlessly plan, execute, and monitor your campaigns, keeping all your collaborations organized and on track. Our user-friendly interface allows you to manage multiple projects simultaneously, ensuring clear communication and timely progress.</p>
                <Link href="/explore/influencers" passHref>
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
                <h1>Safe , Secure & Seamless Payments</h1>
                <p>Simplify your influencer payment process with Influenzit&apos;s secure and efficient escrow system. Our platform enables you to manage payments effortlessly, ensuring timely compensation for the influencers you collaborate with. Funds are securely held in escrow until the campaign has been marked and accepted as completed by the business owner. This added layer of protection fosters trust between both parties and helps to prevent payment disputes.</p>
                <Link href="/explore/influencers" passHref>
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
                <span>Connect With Influencers</span>
                <h1>Find the perfect influencer for your marketing campaign</h1>
                <p>Unlock the power of influencer marketing, and take your brand to new heights. We have result-driven and perfect influencers to promote your products and services to drive actual results. </p>
                <Link href="/explore/influencers" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Infos>
            </InfoCardMob>
            <InfoCardMob>
              <ImageWrapper>
                <Image src="/hero2.png" alt='' layout='fill' objectFit='contain' objectPosition="center" />
              </ImageWrapper>
              <Infos>
              <span>Advanced Analytics</span>
                <h1>Make informed decisions with our advanced analytics</h1>
                <p>Leverage the power of comprehensive data to make smarter choices for your influencer marketing campaigns. Influenzit provides in-depth analytics, allowing you to track the performance and impact of your collaborations.
 Gain valuable insights into engagement, reach, and ROI, ensuring that you&apos;re always making informed decisions for your brand&apos;s growth. </p>
                <Link href="/explore/influencers" passHref>
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
                <p>Streamline your influencer marketing campaigns with Influenzit&apos;s intuitive project management tools. Effortlessly plan, execute, and monitor your campaigns, keeping all your collaborations organized and on track. Our user-friendly interface allows you to manage multiple projects simultaneously, ensuring clear communication and timely progress.</p>
                <Link href="/explore/influencers" passHref>
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
                <h1>Safe , Secure & Seamless Payments</h1>
                <p>Simplify your influencer payment process with Influenzit&apos;s secure and efficient escrow system. Our platform enables you to manage payments effortlessly, ensuring timely compensation for the influencers you collaborate with. Funds are securely held in escrow until the campaign has been marked and accepted as completed by the business owner. This added layer of protection fosters trust between both parties and helps to prevent payment disputes.</p>
                <Link href="/explore/influencers" passHref>
                  <a>Find Influencers</a>
                </Link>
              </Infos>
            </InfoCardMob>


        </WrapperThree>
      </HeroSectionThree>
      <HeroSectionFour>
        <WrapperFour>
          <h1>A whole world of <span>results-focused</span> influencers at your fingertips.</h1>
          {/* <p>When you choose Influenzit over other solutions, you&apos;ll grow 2.3x faster, and save hundreds of hours wasted on boring manual work.</p> */}
          <NicheWrapper>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=food`)}>
              <ImgW1 id="anim">
                <Image src="/niche1.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Food</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=fashion`)}>
              <ImgW1 id="anim">
                <Image src="/niche2.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Fashion</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=travel`)}>
              <ImgW1 id="anim">
                <Image src="/niche3.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Travel</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=lifestyle`)}>
              <ImgW1 id="anim">
                <Image src="/niche4.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Lifestyle</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=technology`)}>
              <ImgW1 id="anim">
                <Image src="/niche5.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Tech</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=family`)}>
              <ImgW1 id="anim">
                <Image src="/niche6.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Family &amp; Children</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=health`)}>
              <ImgW1 id="anim">
                <Image src="/niche7.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Health &amp; Fitness</span>
            </NicheCard>
            <NicheCard onClick={() => router.push(`/explore/influencers?industry=hair`)}>
              <ImgW1 id="anim">
                <Image src="/niche8.png" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <ImgW1>
                <Image src="/layer.svg" alt="" layout='fill' objectFit='cover' objectPosition="center"/>
              </ImgW1>
              <span>Hair</span>
            </NicheCard>
          </NicheWrapper>
          <Link href="/explore/influencers" passHref>
            <a>Explore all influencers</a>
          </Link>
        </WrapperFour>
      </HeroSectionFour>
      {/* <HeroSectionFive>
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
      </HeroSectionFive> */}
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
    <LandingLayout description={"Influenzit is the premier platform connecting Nigerian influencers with businesses. Our platform streamlines the influencer marketing process, making it easy for businesses to find and collaborate with the right influencers for their brand. Join our community today and take your influencer marketing to the next level"}>
      {page}
    </LandingLayout>
  )
}
export default Home;
