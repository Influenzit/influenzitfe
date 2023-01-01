import Image from 'next/image'
import React from 'react'
import HTMLReactParser from 'html-react-parser';
import { Bottom, ChatBottom, ChatDetails, ChatTop, Container, ProfilePicWrapper, SearchContainer, Top, UserCard, UserSect } from './style'

const ChatSidebar = ({ setConversationId, conversations }) => {
  return (
    <Container>
        <Top>
            <h2>All messages ({conversations.length}) <Image src="/down-chev-b.svg" height={12} width={20}/></h2>
            <SearchContainer>
                <input type="text" placeholder="Search by name"/>
                <button>
                    <Image src="/search-b.svg" alt="" height={22} width={22}/>
                </button>
            </SearchContainer>
        </Top>
        <Bottom>
            {
                conversations.map((val, i) => (
                    <UserCard key={i} onClick={() => setConversationId(val.id)}>
                        <UserSect>
                            <ProfilePicWrapper>
                                <Image src={val.recent_message.from_user.profile_picture} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                        </UserSect>
                        <ChatDetails>
                            <ChatTop>
                                <p>{val.recent_message.from_user.firstname} {val.recent_message.from_user.lastname}</p>
                                <span>45 minutes</span>
                            </ChatTop>
                            <ChatBottom isUnread={!!val.unread_count}>
                                <p>{HTMLReactParser(val.recent_message.text)}</p>
                                <span>{val.unread_count}</span>
                            </ChatBottom>
                        </ChatDetails>
                    </UserCard>
                ))
            }
        </Bottom>
    </Container>
  )
}

export default ChatSidebar