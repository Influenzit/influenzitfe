import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import LandingLayout from '../../layouts/landing.layout'
import { BackImage, Bottom, Controls, CreatorDetails, CreatorsCard, CreatorsWrapper, DataSection, HeroSectionOne, ProfileDetails, ProfileImgCont, SocialCard, SocialHandle, SocialWrapper, Top, TopImg, UserCard, Wrapper } from '../../styles/business-owner.style'
import { Container } from '../../styles/creator-profile.style'
import { TabBtn, Tabs } from '../../styles/influencer-profile'

const BusinessProfile = () => {
   const router = useRouter()
   const {id} = router.query
  return (
    <Container>
      <HeroSectionOne>
        <BackImage>
          <Image src="/profile.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
          <UserCard>
            <ProfileImgCont>
              <Image src="/profile-2.png" alt="" layout='fill' objectPosition="center" objectFit="cover"/>
            </ProfileImgCont>
            <ProfileDetails>
              <h2>Business Name</h2>
              <p><span>Category:</span> fashion &amp; lifestyle</p>
              <p><span>Location:</span> Lagos, Nigeria</p>
              <p><span>Website:</span> https://influenzit.com</p>
              <p>
              Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt.
              </p>
            </ProfileDetails>
          </UserCard>
        </BackImage>
        <Wrapper>
          {/* <h3>Social Profiles</h3>
          <SocialWrapper>
            <SocialCard>
              <Top>
                <Image src="/instagram.svg" alt="" height={25} width={25}/>
                <p>Instagram</p>
              </Top>
              <Bottom>
                <Link href="/" targer="_blank" passHref>
                  <a>itzphoenixgold (774 followers)</a>
                </Link>
              </Bottom>
            </SocialCard>
            <SocialCard>
              <Top>
                <Image src="/twitter.svg" alt="" height={25} width={25}/>
                <p>Twitter</p>
              </Top>
              <Bottom>
                <Link href="/" targer="_blank" passHref>
                  <a>itzphoenixgold (774 followers)</a>
                </Link>
              </Bottom>
            </SocialCard>
            <SocialCard>
              <Top>
                <Image src="/facebook.svg" alt="" height={25} width={25}/>
                <p>Facebook</p>
              </Top>
              <Bottom>
                <Link href="/" targer="_blank" passHref>
                  <a>itzphoenixgold (774 followers)</a>
                </Link>
              </Bottom>
            </SocialCard>
            <SocialCard>
              <Top>
                <Image src="/tiktok.svg" alt="" height={25} width={25}/>
                <p>TikTok</p>
              </Top>
              <Bottom>
                <Link href="/" targer="_blank" passHref>
                  <a>itzphoenixgold (774 followers)</a>
                </Link>
              </Bottom>
            </SocialCard>
          </SocialWrapper> */}
          <DataSection>
            <Tabs>
                <TabBtn>Influencer</TabBtn>
                <TabBtn>Creator</TabBtn>
                <TabBtn>Collaboration</TabBtn>
            </Tabs>
            <CreatorsWrapper>
              <CreatorsCard>
                <TopImg>
                  <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                </TopImg>
                <CreatorDetails>
                  <h4>Ezekiel Phoenixgold</h4>
                  <p>Male | Lagos, Nigeria</p>
                  <SocialHandle>
                    <Link href="/" targer="_blank" passHref>
                      <a><Image src="/twitter.svg" alt="" height={30} width={30}/><span>itzphoenixgold | 16k reach</span></a>
                    </Link>
                  </SocialHandle>
                  <p>Laptop Lifestyle | Photography | Fashion</p>
                  <Controls>
                    <Link href="/" passHref>
                      <a>Engage</a>
                    </Link>
                    <button><Image src="/list.svg" alt="" height={24} width={24}/></button>
                  </Controls>
                </CreatorDetails>
              </CreatorsCard>
              <CreatorsCard>
                <TopImg>
                  <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                </TopImg>
                <CreatorDetails>
                  <h4>Ezekiel Phoenixgold</h4>
                  <p>Male | Lagos, Nigeria</p>
                  <SocialHandle>
                    <Link href="/" targer="_blank" passHref>
                      <a><Image src="/twitter.svg" alt="" height={30} width={30}/><span>itzphoenixgold | 16k reach</span></a>
                    </Link>
                  </SocialHandle>
                  <p>Laptop Lifestyle | Photography | Fashion</p>
                  <Controls>
                    <Link href="/" passHref>
                      <a>Engage</a>
                    </Link>
                    <button><Image src="/list.svg" alt="" height={24} width={24}/></button>
                  </Controls>
                </CreatorDetails>
              </CreatorsCard>
              <CreatorsCard>
                <TopImg>
                  <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                </TopImg>
                <CreatorDetails>
                  <h4>Ezekiel Phoenixgold</h4>
                  <p>Male | Lagos, Nigeria</p>
                  <SocialHandle>
                    <Link href="/" targer="_blank" passHref>
                      <a><Image src="/twitter.svg" alt="" height={30} width={30}/><span>itzphoenixgold | 16k reach</span></a>
                    </Link>
                  </SocialHandle>
                  <p>Laptop Lifestyle | Photography | Fashion</p>
                  <Controls>
                    <Link href="/" passHref>
                      <a>Engage</a>
                    </Link>
                    <button><Image src="/list.svg" alt="" height={24} width={24}/></button>
                  </Controls>
                </CreatorDetails>
              </CreatorsCard>
              <CreatorsCard>
                <TopImg>
                  <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center"/>
                </TopImg>
                <CreatorDetails>
                  <h4>Ezekiel Phoenixgold</h4>
                  <p>Male | Lagos, Nigeria</p>
                  <SocialHandle>
                    <Link href="/" targer="_blank" passHref>
                      <a><Image src="/twitter.svg" alt="" height={30} width={30}/><span>itzphoenixgold | 16k reach</span></a>
                    </Link>
                  </SocialHandle>
                  <p>Laptop Lifestyle | Photography | Fashion</p>
                  <Controls>
                    <Link href="/" passHref>
                      <a>Engage</a>
                    </Link>
                    <button><Image src="/list.svg" alt="" height={24} width={24}/></button>
                  </Controls>
                </CreatorDetails>
              </CreatorsCard>
            </CreatorsWrapper>
          </DataSection>
          
        </Wrapper>
      </HeroSectionOne>
      
    </Container>
  )
}
BusinessProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default BusinessProfile