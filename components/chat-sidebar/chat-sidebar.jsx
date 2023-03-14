import Image from 'next/image'
import React from 'react'
import HTMLReactParser from 'html-react-parser';
import { Bottom, ChatBottom, ChatDetails, ChatTop, Container, ProfilePicWrapper, SearchContainer, Top, UserCard, UserSect } from './style'

const ChatSidebar = ({ setConversationId, conversations, conversationId }) => {
  return (
    <Container>
        <Top>
            <h2>All messages ({conversations.length})</h2>
            <SearchContainer>
                <button>
                    <Image src="/f-search.svg" alt="" height={22} width={22}/>
                </button>
                <input type="text" placeholder="Search people or message"/>
            </SearchContainer>
        </Top>
        <Bottom>
            {
                conversations.map((val, i) => (
                    <UserCard key={i} onClick={() => {
                            setConversationId(val.id);
                        }} isActive={ val.id === conversationId }>
                        <UserSect>
                            <ProfilePicWrapper>
                                <Image src={val.heading?.image ?? ""} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                        </UserSect>
                        <ChatDetails>
                            <ChatTop>
                                <p>{val.heading?.title}</p>
                                <span>{val.recent_message.created_at}</span>
                            </ChatTop>
                            <ChatBottom isUnread={!!val.unread_count}>
                                <p>{HTMLReactParser(val.recent_message.text)}</p>
                                {/* <span id="unread-count">{val.unread_count}</span>s */}
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