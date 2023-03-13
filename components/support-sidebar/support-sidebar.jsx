import Image from 'next/image'
import React from 'react'
import HTMLReactParser from 'html-react-parser';
import { Bottom, ChatBottom, ChatDetails, ChatTop, Container, OpenBtn, ProfilePicWrapper, SearchContainer, Top, UserCard, UserSect } from './style'

const ChatSidebar = ({ setConversationId, conversations, setSupportId, supportId, setShowCreateTicket }) => {
  return (
    <Container>
        <Top>
            <h2>Tickets ({conversations.length}) </h2>
            <OpenBtn onClick={() => setShowCreateTicket(true)}>Open Ticket</OpenBtn>
            {/* <SearchContainer>
                <input type="text" placeholder="Search by Ticket ID"/>
                <button>
                    <Image src="/search-b.svg" alt="" height={22} width={22}/>
                </button>
            </SearchContainer> */}
        </Top>
        <Bottom>
            {
                conversations.map((val, i) => (
                    <UserCard key={i} onClick={() => {
                            setConversationId(val.conversation_id);
                            setSupportId(val.id);
                        }}
                        isActive={val.id === supportId}
                        >
                        <ChatDetails>
                            <ChatTop>
                                <p>Issue</p>
                                <p>Created</p>
                            </ChatTop>
                            <ChatBottom>
                                <p>{val.subject}</p>
                                <span>{val.created_at}</span>
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