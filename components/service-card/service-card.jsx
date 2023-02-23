import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, Controls, CreatorDetails, SocialHandle, Stats, TopImg, UserSection } from './style'

const ServiceCard = ({ imgSrc, serviceLink, price, profileImg, userName, title }) => {
    const router = useRouter();
    return (
    <Container>
        <button onClick={(e) => e.preventDefault()}>
            <Image src="/bookmark.svg" alt="" height={20} width={20}/>
        </button>
        <TopImg onClick={() => router.push(serviceLink)}>
            <Image src={imgSrc} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
        </TopImg>
        <CreatorDetails onClick={() => router.push(serviceLink)}>
            <Stats>
                <div>
                    <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                </div>
                <div>
                    <span>{price}</span>
                </div>
            </Stats>
            <p>{title}</p>
            <UserSection>
                <div>
                    <Image src={profileImg} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
                </div>
                <p>{userName}</p>
            </UserSection>
        </CreatorDetails>
    </Container>
  )
}

export default ServiceCard;
