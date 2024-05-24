import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import {Container, Controls, CreatorDetails, SocialHandle, Stats, TopImg} from './style'
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
                        {platforms?.facebook &&
                            <a href={`https://facebook.com/${platforms.facebook}`} rel="noreferrer"
                               target="_blank"><Image src="/facebook-icon.svg" alt="" height={12} width={12}/></a>}
                        {platforms?.instagram &&
                            <a href={`https://twitter.com/${platforms.instagram}`} rel="noreferrer" target='_blank'><Image src="/instagram-icon.svg" alt=""
                                                                                        height={12} width={12}/></a>}
                        {platforms?.twitter && <a href={`https://twitter.com/${platforms.twitter}`} rel="noreferrer" target='_blank'><Image
                            src="/twitter-icon.svg" alt="" height={12} width={12}/></a>}
                        {platforms?.tiktok && <a href={`https://tiktok.com/@${platforms?.tiktok}`} rel="noreferrer" target='_blank'><Image
                            src="/tiktok-icon.svg" alt="" height={12} width={12}/></a>}
                        {platforms?.youtube && <a href={`https://youtube.com/@${platforms.youtube}`} rel="noreferrer" target='_blank'><Image
                            src="/youtube-icon.svg" alt="" height={12} width={12}/></a>}
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
