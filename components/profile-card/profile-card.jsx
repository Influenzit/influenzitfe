import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, Controls, CreatorDetails, SocialHandle, Stats, TopImg } from './style'

const ProfileCard = ({imgSrc, name, sex, address, handle, profileLink, skills, rating}) => {
    const router = useRouter();
    return (
    <Container>
        <button onClick={(e) => e.preventDefault()}>
            <Image src="/bookmark.svg" alt="" height={20} width={20}/>
        </button>
        <TopImg onClick={() => router.push(profileLink)}>
            <Image src={imgSrc} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
        </TopImg>
        <CreatorDetails onClick={() => router.push(profileLink)}>
            <Stats>
                <div>
                    <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                    <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                </div>
                <div>
                    <Image src="/star-p.svg" alt="" height={15} width={15}/>
                    <span>{rating}</span>
                </div>
            </Stats>
            <h4>{name}</h4>
            <p>{skills ? skills : "No skills"}</p>
        </CreatorDetails>
    </Container>
  )
}

export default ProfileCard;
