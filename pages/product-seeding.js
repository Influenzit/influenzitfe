import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getExploreNiches } from "../api/influencer"
import LandingLayout from "../layouts/landing.layout"
import { Answer, Banner, BannerImg, CustomSelect, Faq, FaqWrapper, HeroSectionFive, HeroSectionFour, HeroSectionOne, HeroSectionSix, HeroSectionThree, HeroSectionTwo, ImageWrapper, ImgSlider, ImgW1, ImgWrapper, Info, Infos, InfoCard, InfoCardM, InfoCardMob, InfoDetails, InfoList, InfoSectOne, ListItem, NicheCard, NicheWrapper, Question, ReviewCard, ReviewWrapper, SlideBtn, SlideControl, UserCard, UserDetails, UserImage, WrapperFive, WrapperFour, WrapperOne, WrapperSix, WrapperThree, WrapperTwo, FormDivide, InfoCardD, InfoD } from "../styles/home.style"
import { useRouter } from "next/router"
import { ImgContainer } from "styles/waitlist.style"

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
          <h1>Influenzit&apos;s Product Seeding: A New Age of <span>Influencer Collaboration</span> for <span>Business Owners</span></h1>
          <p>Unlock the true potential of influencer marketing with Influenzit&apos;s unique Product Seeding function. Connect your products directly with the most relevant influencers and watch your brand grow</p>
          {/* <BannerImg>
          </BannerImg> */}
        </WrapperOne>
      </HeroSectionOne>
      <HeroSectionThree>
        <WrapperThree>
            <InfoCardD>
              <InfoD>
                <h1>What is Product Seeding?</h1>
                <p>Product Seeding is the art of placing your products into the hands of the right influencers.</p>
                <ul>
                  <li>Create a campaign</li>
                  <li>Attach a product</li>
                  <li>Define your desired influencer metrics,</li>
                  <li>And let Influenzit do the rest.</li>
                </ul>
                <p>Our AI matchmaking function connects your products with influencers who fit perfectly with your brand and audience, making authentic and effective promotion effortless.</p>
              </InfoD>
              <ImgContainer>
                <Image
                  src="/l-image-2.jpg"
                  alt="banner"
                  layout="fill"
                  loading="lazy"
                  objectFit="cover"
                  objectPosition="center"
                />
              </ImgContainer>
            </InfoCardD>
            <InfoCardD $reverseColumn>
              <ImgContainer>
                <Image
                  src="/l-image-1.jpg"
                  alt="banner"
                  layout="fill"
                  loading="lazy"
                  objectFit="cover"
                  objectPosition="center"
                />
              </ImgContainer>
              <InfoD leftP>
                <h1>Why Choose Influenzit&apos;s Product Seeding?</h1>
                <p>Product Seeding is the art of placing your products into the hands of the right influencers.</p>
                <ul style={{ listStyle: "number" }}>
                  <li><span>Targeted Influencer Collaboration</span></li>
                  <p>Find the perfect influencers who resonate with your brand. Define the metrics, and our algorithm will identify the best fits.</p>
                  <li><span>Seamless Campaign Creation</span></li>
                  <p>Attach your product, set the requirements, and launch. It&apos;s that easy to start a product seeding campaign with Influenzit.</p>
                  <li><span> Track &amp; Analyze Performance</span></li>
                  <p>Utilize our advanced analytics to measure the success of your campaign. Understand your reach, engagement, and ROI at a glance.</p>
                  <li><span> Secure &amp; Trustworthy</span></li>
                  <p>Payments are handled securely through our escrow system, ensuring a smooth transaction and fostering trust between you and the influencers.</p>
                </ul>
              </InfoD>
            </InfoCardD>
            <InfoCardD>
              <InfoD>
                <h1>How it works</h1>
                <ul style={{ listStyle: "none", marginLeft: "0" }}>
                  <li><span>Define Your Product &amp; Audience</span></li>
                  <p>Attach your product, set the desired influencer metrics, and define your target audience.</p>
                  <li><span>Launch Your Campaign</span></li>
                  <p>Create your campaign with a few clicks. Our platform will handle the rest.</p>
                  <li><span> Review &amp; Accept Applications</span></li>
                  <p>Influencers will apply to promote your product. Review their profiles and accept the ones that fit your brand.</p>
                  <li><span>Track &amp; Analyze Results</span></li>
                  <p>Watch your campaign in action and analyze its performance with our in-depth tracking tools.</p>
                </ul>
              </InfoD>
              <ImgContainer>
                <Image
                  src="/l-image-3.jpg"
                  alt="banner"
                  layout="fill"
                  loading="lazy"
                  objectFit="cover"
                  objectPosition="center"
                />
              </ImgContainer>
            </InfoCardD>
        </WrapperThree>
      </HeroSectionThree>
      <HeroSectionSix>
        <WrapperSix>
          <h1>Get Started Now!</h1>
          <p>Join Influenzit and take advantage of our unique Product Seeding function. Revolutionize the way you collaborate with influencers and elevate your brand to new heights.</p>
          <Banner>
            <div>
              <h2>Click the button below to start your<br /> first product seeding campaign today!</h2>
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
