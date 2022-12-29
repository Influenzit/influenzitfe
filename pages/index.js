import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getExploreNiches } from "../api/influencer"
import LandingLayout from "../layouts/landing.layout"
import { CustomSelect, HeroSectionFive, HeroSectionFour, HeroSectionOne, HeroSectionThree, HeroSectionTwo, ImgSlider, ImgWrapper, InfoCard, InfoDetails, InfoList, InfoSectOne, ListItem, NicheCard, NicheWrapper, ReviewCard, ReviewWrapper, SlideBtn, SlideControl, UserCard, UserDetails, UserImage, WrapperFive, WrapperFour, WrapperThree, WrapperTwo } from "../styles/home.style"

const Home = () => {
  const [currSlideOne, setCurrSlideOne] = useState(1);
  const [currSlideTwo, setCurrSlideTwo] = useState(1);
  const router = useRouter();
  let slideOneCtrl = [];
  let slideTwoCtrl = [];

  const slideOneCount = 2;
  const slideTwoCount = 2;
  for (let i = 0; i < slideOneCount; i++) {
    slideOneCtrl.push(i)
  }
  for (let i = 0; i < slideTwoCount; i++) {
    slideTwoCtrl.push(i)
  }
  let intervalId;
  const [nicheVal, setNicheVal] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    intervalId = setInterval(() => {
      if (currSlideOne < slideOneCount) {
        setCurrSlideOne((prev) => prev + 1)
      } else {
        setCurrSlideOne(1)
      }
      if (currSlideTwo < slideTwoCount) {
        setCurrSlideTwo((prev) => prev + 1)
      } else {
        setCurrSlideTwo(1)
      }
      
    }, 7000)
  
    return () => {
      clearInterval(intervalId);
    }
  }, [currSlideOne, currSlideTwo])
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
        <h1>We Connect <span>Brands</span> With The Perfect <span>Influencers</span> To <span>Multiply</span> Their <span>Sales.</span></h1>
        <p>Find results-focused influencers in just a few clicks.</p>
        <form>
          <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search by keyword or niche" />
          <CustomSelect>
            <span>in:</span>
            <select val={nicheVal} onChange={(e) => setNicheVal(e.target.value)}>
              <option value="">Select a niche</option>
              {
                data?.data?.data?.map((val, i) => (
                  <option key={i} value={val.name}>{val.name}</option>
                ))
              }
            </select>
          </CustomSelect>
          <button onClick={(e) => {
            e.preventDefault();
            router.push(`/explore?search=${searchString}&niche=${nicheVal.toLocaleLowerCase()}`);
          }}><Image src="/search.svg" height={30} width={30}/></button>
        </form>
      </HeroSectionOne>
      <HeroSectionTwo>
        <WrapperTwo>
          <InfoCard primary={false}>
            <h3>Are you a business owner?</h3>
            <p>Find The <b><i>Perfect Influencer</i></b> To Ignite Your Business Sales!</p>
            <Link href="" passHref>
              <a>Find Influencer</a>
            </Link>
          </InfoCard>
          <InfoCard primary={true}>
            <h3>Are you an influencer?</h3>
            <p>Work with the <b><i>best brands</i></b> that match your audience, passion, and purpose.</p>
            <Link href="" passHref>
              <a>Find Brands</a>
            </Link>
          </InfoCard>
        </WrapperTwo>
      </HeroSectionTwo>
      <HeroSectionThree>
        <WrapperThree>
          <h1>Explore Niches</h1>
          <p>Find the best influencer to grow your business.</p>
          <NicheWrapper>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/shop.svg" alt="" height={55} width={55} />
              </span>
              <h4>Fashion</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=fashion" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/shop.svg" alt="" height={55} width={55} />
              </span>
              <h4>Beauty</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=beauty" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/plane.svg" alt="" height={55} width={55} />
              </span>
              <h4>Travel &amp; Tourism</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=tourism" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/computer.svg" alt="" height={55} width={55} />
              </span>
              <h4>Tech and Gadgets</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=tech" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/media.svg" alt="" height={55} width={55} />
              </span>
              <h4>Entertainment</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=entertainment" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/ball.svg" alt="" height={55} width={55} />
              </span>
              <h4>Sports</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=sports" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/health.svg" alt="" height={55} width={55} />
              </span>
              <h4>Health</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=health" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
            <NicheCard>
              <span id="niche-icon">
                <Image src="/bag.svg" alt="" height={55} width={55} />
              </span>
              <h4>Business</h4>
              <div>
                <p>Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.</p>
                <Link href="/explore?niche=business" passHref>
                  <a>Explore <Image src="/arrow-b.svg" width={30} height={10}/></a>
                </Link>
              </div>
            </NicheCard>
          </NicheWrapper>
          <Link href="/">
            <a id="search-by">Search by niche</a>
          </Link>
        
        </WrapperThree>
      </HeroSectionThree>
      <HeroSectionFour>
        <WrapperFour>
          <InfoSectOne>
            <ImgSlider>
              <ImgWrapper showImg={currSlideOne === 1}>
                <Image src="/hero-2.png" alt="info" layout="fill" objectFit="cover" objectPosition="center" quality={100}/>
              </ImgWrapper>
              <ImgWrapper showImg={currSlideOne === 2}>
                <Image src="/hero-3.png" alt="info" layout="fill" objectFit="cover" objectPosition="center" quality={100}/>
              </ImgWrapper>
              <SlideControl>
                {
                  slideOneCtrl.map((val) => (
                    <SlideBtn key={val} onClick={() => setCurrSlideOne(val + 1)} isActive={currSlideOne === val + 1}></SlideBtn>
                  ))
                }
              </SlideControl>
            </ImgSlider>
            <InfoDetails>
              <h3>A whole world of results <span>focused influencers</span> at your fingertips.</h3>
              <p>Run Your First Successful Influencing Campaign With INFLUENZIT.</p>
              <InfoList>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Free trial</span>
                </ListItem>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Easy set-up</span>
                </ListItem>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Powerful algorithm that produces excellent influencer matches in seconds</span>
                </ListItem>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Cancel anytime</span>
                </ListItem>
              </InfoList>
              <Link href="/contact">
                <a>Let us help you!</a>
              </Link>
            </InfoDetails>
          </InfoSectOne>
          <InfoSectOne>
            <InfoDetails>
              <h3><span>Don&apos;t settle.</span><br /> More Collaboration.<br /> More Deals. More Money.</h3>
              <p>Seal More Deals from our unlimited pool of quality brands to collaborate with!</p>
              <InfoList>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Sign up for free</span>
                </ListItem>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Easy account set-up</span>
                </ListItem>
                <ListItem>
                  <Image src="/check-square.svg" alt="check square" height={25} width={25} />
                  <span>Powerful algorithm that produces excellent brand matches in seconds.</span>
                </ListItem>
              </InfoList>
              <Link href="/register">
                <a>Become a creator</a>
              </Link>
            </InfoDetails>
            <ImgSlider>
              <ImgWrapper showImg={currSlideOne === 1}>
                <Image src="/hero-3.png" alt="info" layout="fill" objectFit="cover" objectPosition="center" quality={100}/>
              </ImgWrapper>
              <ImgWrapper showImg={currSlideOne === 2}>
                <Image src="/hero-2.png" alt="info" layout="fill" objectFit="cover" objectPosition="center" quality={100}/>
              </ImgWrapper>
              <SlideControl>
                {
                  slideOneCtrl.map((val) => (
                    <SlideBtn key={val} onClick={() => setCurrSlideOne(val + 1)} isActive={currSlideTwo === val + 1}></SlideBtn>
                  ))
                }
              </SlideControl>
            </ImgSlider>
          </InfoSectOne>
        </WrapperFour>
      </HeroSectionFour>
      <HeroSectionFive>
        <WrapperFive>
          <h1>Join the league of <span>business</span> enjoying <span>influencer marketing</span>.</h1>
          <ReviewWrapper>
            <ReviewCard>
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
            <ReviewCard>
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
            <ReviewCard>
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
