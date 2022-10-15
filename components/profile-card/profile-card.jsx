import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container, Controls, CreatorDetails, SocialHandle, TopImg } from './style'

const ProfileCard = ({imgSrc, name, sex, address, handle, profileLink}) => {
  return (
    <Container>
        <TopImg>
            <Image src={imgSrc} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
        </TopImg>
        <CreatorDetails>
            <h4>{name}</h4>
            <p>{sex} | {address}</p>
            <SocialHandle>
            <Link href="/" targer="_blank" passHref>
                <a><Image src="/twitter.svg" alt="" height={16} width={16}/><span>{handle} | 16k reach</span></a>
            </Link>
            </SocialHandle>
            <p>Laptop Lifestyle | Photography | Fashion</p>
            <Controls>
                <Link href={profileLink} passHref>
                    <a>View Profile</a>
                </Link>
                <button><Image src="/list.svg" alt="" height={24} width={24}/></button>
            </Controls>
        </CreatorDetails>
    </Container>
  )
}

export default ProfileCard;
