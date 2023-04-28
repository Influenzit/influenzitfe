import Image from 'next/image'
import React from 'react'
import { ChatTitle } from './style'
import { ChatCount, Container, ProfilePicWrapper, UserCard } from './style'

const MobileChatbar = ({ setConversationId, conversations, setSupportId }) => {
  return (
    <Container>
            {
                conversations.map((val, i) => (
                    <UserCard key={i} onClick={() => {
                            if(setSupportId) {
                                setSupportId(val.id);
                                setConversationId(val.conversation_id);
                            } else {
                                setConversationId(val.id);
                            }
                        }}>
                        <ProfilePicWrapper>
                            <Image src={val.heading?.image ?? "/ticket.svg"} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                        </ProfilePicWrapper>
                        {
                            !!val.unread_count ? (
                                <ChatCount>{val.unread_count}</ChatCount>
                            ) : null
                        } 
                        <ChatTitle>{val.heading?.title ?? val.subject}</ChatTitle>
                    </UserCard>
                ))
            }
    </Container>
  )
}

export default MobileChatbar;
