import Image from 'next/image'
import React from 'react'
import HTMLReactParser from 'html-react-parser';
import { Bottom, ChatBottom, ChatDetails, ChatTop, Container, ProfilePicWrapper, SearchContainer, Top, UserCard, UserSect } from './style'

const ChatSidebar = ({ setConversationId, conversations, setSupportId }) => {
  return (
    <Container>
        <Top>
            <h2>All Tickets ({conversations.length}) <Image src="/down-chev-b.svg" height={12} width={20}/></h2>
            <SearchContainer>
                <input type="text" placeholder="Search by Ticket ID"/>
                <button>
                    <Image src="/search-b.svg" alt="" height={22} width={22}/>
                </button>
            </SearchContainer>
        </Top>
        <Bottom>
            {
                conversations.map((val, i) => (
                    <UserCard key={i} onClick={() => {
                            setConversationId(val.conversation_id);
                            setSupportId(val.id);
                            console.log(val.conversation_id, "ww")
                        }}>
                        <UserSect>
                            <ProfilePicWrapper style={{ borderRadius: "0" }}>
                                <Image src="/receipt.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                            </ProfilePicWrapper>
                        </UserSect>
                        <ChatDetails>
                            <ChatTop>
                                <p>{val.subject}</p>
                                <span>{val.created_at}</span>
                            </ChatTop>
                            <ChatBottom isUnread={!!val.unread_count}>
                                <p>{HTMLReactParser(val.message)}</p>
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