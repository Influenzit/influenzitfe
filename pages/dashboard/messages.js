import Image from 'next/image';
import React, { useState } from 'react'
import ChatSidebar from '../../components/chat-sidebar';
import LandingLayout from '../../layouts/landing.layout';
import { Container, ImageWrapper, MessageSection, NonSelectedCont, Wrapper } from '../../styles/messages.style';

const Messages = () => {
  const [userId, setUserId] = useState("")
  return (
    <Container>
        <Wrapper>
            <ChatSidebar />
            <MessageSection>
                {
                    userId ? 
                    (<></>) : (
                        <NonSelectedCont>
                            <ImageWrapper>
                                <Image src="/work.svg" alt="" layout='fill' objectFit='contain' objectPosition="center"/>
                            </ImageWrapper>
                            <h2>Select a conversation</h2>
                            <p>Click on any name on the left sidebar to start a chat</p>
                        </NonSelectedCont>
                    )
                }
            </MessageSection>
        </Wrapper>
    </Container>
  )
}
Messages.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Messages;