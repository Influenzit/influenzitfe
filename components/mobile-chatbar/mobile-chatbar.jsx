import Image from 'next/image'
import React from 'react'
import { ChatTitle } from './style'
import { ChatCount, Container, ProfilePicWrapper, UserCard } from './style'

const MobileChatbar = ({ setConversationId, conversations }) => {
  return (
    <Container>
            {
                conversations.map((val, i) => (
                    <UserCard key={i} onClick={() => {
                            setConversationId(val.id);
                        }}>
                        <ProfilePicWrapper>
                            <Image src={val.heading?.image} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                        </ProfilePicWrapper>
                        {
                            !!val.unread_count ? (
                                <ChatCount>{val.unread_count}</ChatCount>
                            ) : null
                        } 
                        <ChatTitle>{val.heading?.title}</ChatTitle>
                    </UserCard>
                ))
            }
    </Container>
  )
}

export default MobileChatbar;
