import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import LandingLayout from '../../layouts/Landing.layout'
import { BackImage, Container, HeroSectionOne, Popup, ProfileCategory, ProfileData, ProfileDetails, ProfileImgCont, ProfileStats, SeeMoreCont, StatCard, Stats, StatWrapper, UserCard } from '../../styles/creator-profile.style'

const CreatorProfile = () => {
  const [showEngagePopup, setShowEngagePopup] = useState(false);
  return (
    <Container>
        <HeroSectionOne>
            <BackImage>
            <Image src="/profile.png" alt="" layout="fill" objectPosition="center" objectFit="cover"/>
            <UserCard>
                <ProfileStats>
                    <ProfileImgCont>
                        <Image src="/profile-2.png" alt="" layout='fill' objectPosition="center" objectFit="cover"/>
                    </ProfileImgCont>
                    <ProfileData>
                        <div>
                            <Image src="/users.svg" height={20} width={20} />
                            <span>Male</span>
                        </div>
                        <div>
                            <Image src="/verified.svg" height={20} width={20} />
                            <span>Verified</span>
                        </div>
                    </ProfileData>
                    <p>0/5 (<span>0 Feedbacks</span>)</p>
                    <p>Member since Feb 09, 2021.</p>
                    <button>Share Profile</button>
                </ProfileStats>
                <ProfileDetails>
                    <h2>Ezekiel Alawode</h2>
                    <ProfileCategory>
                        <div><Image src="/niche.svg" height={25} width={25}/><p>Influencer&apos;s Niche</p></div>
                        <div><Image src="/flag.svg" height={25} width={25}/><p>Nigeria</p></div>
                        <div><Image src="/instagram.svg" height={25} width={25}/><p>itzphoenixgold</p> <span>744</span></div>
                    </ProfileCategory>
                    <p>Excepteur sint occaecat cupidatat non proident,
                         saeunt in culpa qui officia deserunt mollit anim laborum. 
                         Seden utem perspiciatis undesieu omnis voluptatem accusantium doque 
                         laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm 
                         quasitea architecto beataea dictaed quia couuntur magni dolores 
                         eos aquist ratione vtatem seque nesnt. Excepteur sint occaecat cupidatat non proident, 
                         saeunt in culpa qui officia deserunt mollit anim laborum with excepteur 
                         sint occaecat cupidatat non proident.
                    </p>
                    <SeeMoreCont>
                        <button>Click to see more</button>
                    </SeeMoreCont>
                    
                </ProfileDetails>
                <Stats>
                    <StatWrapper>
                        <StatCard textColor='#2B368C' bgColor="#F9F9FC">
                            <h3>5</h3>
                            <p>Ongoing Engagements</p>
                        </StatCard>
                        <StatCard textColor='#019B2C' bgColor="#F7FCF9">
                            <h3>5</h3>
                            <p>Completed Campaigns</p>
                        </StatCard>
                        <StatCard textColor='#FF0000' bgColor="#FFF7F7">
                            <h3>5</h3>
                            <p>Cancelled Engagements</p>
                        </StatCard>
                        <StatCard textColor='#000' bgColor="#F8F8F8">
                            <h3>75%</h3>
                            <p>Total Engagement</p>
                        </StatCard> 
                    </StatWrapper>
                    <p>Send Offer to this creator by clicking on the button.</p>
                    <button onClick={() => setShowEngagePopup(!showEngagePopup)}>
                        <span>Engage Influencer</span> <Image src="/down-chev.svg" height={10} width={10} />
                        <Popup show={showEngagePopup}>
                            <Link href="/">
                                <a><span>Send a message</span><Image src="/arr-r.svg" height={10} width={10} /></a>
                            </Link>
                            <Link href="/">
                                <a><span>Start a Project</span><Image src="/arr-r.svg" height={10} width={10} /></a>
                            </Link>
                            <Link href="/">
                                <a><span>Report Account</span><Image src="/arr-r.svg" height={10} width={10} /></a>
                            </Link>
                        </Popup>
                    </button>
                </Stats>
            </UserCard>
            </BackImage>
        </HeroSectionOne>
    </Container>
  )
}
CreatorProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CreatorProfile