import Image from 'next/image';
import React, { useState } from 'react'
import { AttachmentIcon, BoldIcon, EmojiIcon, ItalicIcon, MarkupIcon, SendIcon, UnderlineIcon } from '../../assets/svgIcons';
import ChatSidebar from '../../components/chat-sidebar';
import LandingLayout from '../../layouts/landing.layout';
import { ActionBtn, ChatContainer, ChatControls, ChatHeader, Container, ContextBtn, Editor, EditorBtn, HLeft, ImageWrapper, LeftControls, MessageInput, MessagesCont, MessageSection, NonSelectedCont, RightControls, Wrapper } from '../../styles/messages.style';

const Messages = () => {
  const [userId, setUserId] = useState("");
  const [messageContent, setMessageContent] = useState("")
  const handleInput = (e) => {
    if(e.currentTarget.innerHTML === "<br>") {
        setMessageContent("");
        return;
    }
    setMessageContent(e.currentTarget.innerHTML)
  }
  return (
    <Container>
        <Wrapper>
            <ChatSidebar setUserId={setUserId}/>
            <MessageSection>
                {
                    userId ? 
                    (<ChatContainer>
                        <ChatHeader>
                            <HLeft>
                                <h2>Ezekiel Alawode</h2>
                                <p>Last seen: 3 hours ago </p>
                            </HLeft>
                            <ContextBtn>
                                <Image src="/more-vertical.svg" height={24} width={24}/>
                            </ContextBtn>
                        </ChatHeader>
                        <MessagesCont>

                        </MessagesCont>
                        <Editor>
                            <MessageInput data-placeholder="Write a message" contentEditable showPlaceholder={!!messageContent} onInput={handleInput} >

                            </MessageInput>
                            <ChatControls>
                                <LeftControls>
                                    <EditorBtn>
                                        <BoldIcon />
                                    </EditorBtn>
                                    <EditorBtn>
                                        <ItalicIcon />
                                    </EditorBtn>
                                    <EditorBtn>
                                        <UnderlineIcon />
                                    </EditorBtn>
                                    <EditorBtn>
                                        <MarkupIcon />
                                    </EditorBtn>
                                </LeftControls>
                                <RightControls>
                                    <ActionBtn>
                                        <AttachmentIcon />
                                    </ActionBtn>
                                    <ActionBtn>
                                        <EmojiIcon />
                                    </ActionBtn>
                                    <ActionBtn>
                                        <SendIcon />
                                    </ActionBtn>
                                </RightControls>
                            </ChatControls>
                        </Editor>
                    </ChatContainer>) : (
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