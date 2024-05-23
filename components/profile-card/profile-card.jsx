import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, Controls, CreatorDetails, SocialHandle, Stats, TopImg } from './style'
import ReactStars from "react-rating-stars-component";

const ProfileCard = ({imgSrc, name, sex, address, handle, profileLink, skills, rating, platforms}) => {
    const router = useRouter();
    console.log(platforms)
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
                    { platforms?.analytics?.facebook && <Image src="/facebook-icon.svg" alt="" height={12} width={12}/> }
                    { platforms?.analytics?.instagram && <Image src="/instagram-icon.svg" alt="" height={12} width={12}/> }
                    { platforms?.twitter && <Image src="/twitter-icon.svg" alt="" height={12} width={12}/> }
                    { platforms?.tiktok && <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/> }
                    { platforms?.youtube && <Image src="/youtube-icon.svg" alt="" height={12} width={12}/> }
                </div>
                <div>
                    <ReactStars
                        isHalf={true}
                        count={5}
                        value={Number(rating) ?? 0}
                        size={16}
                        edit={false}
                        activeColor="#DF475C"
                    />
                </div>
            </Stats>
            <h4>{name}</h4>
            <p>{skills ? skills : "No industry"}</p>
        </CreatorDetails>
    </Container>
  )
}

export default ProfileCard;
