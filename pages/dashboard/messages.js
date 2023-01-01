import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { AttachmentIcon, BoldIcon, EmojiIcon, ItalicIcon, MarkupIcon, SendIcon, UnderlineIcon } from '../../assets/svgIcons';
import ChatSidebar from '../../components/chat-sidebar';
import LandingLayout from '../../layouts/landing.layout';
import { ActionBtn, ChatContainer, ChatControls, ChatHeader, Container, ContextBtn, Editor, EditorBtn, HLeft, ImageWrapper, LeftControls, MessageCard, MessageContent, MessageInput, MessagesCont, MessageSection, NonSelectedCont, PickerContainer, ProfilePicWrapper, RightControls, UserSect, Wrapper } from '../../styles/messages.style';
import { colors } from '../../styles/theme';
import dynamic from 'next/dynamic';
import { getConversationMessages, getConversations, sendConversationMessage } from '../../api/messaging';
import { useMutation, useQuery } from '@tanstack/react-query';
import HTMLReactParser from 'html-react-parser';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

const Messages = () => {
  const [conversationId, setConversationId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);
  const messageBoxRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const handleInput = (e) => {
    if(e.currentTarget.innerHTML === "<br>") {
        setMessageContent("");
        e.currentTarget.innerHTML = "";
        return;
    }
    setMessageContent(e.currentTarget.innerHTML)
  }
  const handleBold = () => {
    const selection = window.getSelection();
    if(!selection.anchorNode) return;
    const parent = selection.anchorNode.parentElement;
    const grandParent = parent.parentElement;
    const greatGrandParent = grandParent.parentElement;
    const selectionText = selection.toString();
    
    if(parent.nodeName === "STRONG") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(parent.innerHTML));
        grandParent.normalize();
        selection.removeAllRanges();
        return;
    }
    if(grandParent.nodeName === "STRONG") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(grandParent.innerHTML));
        greatGrandParent.normalize();
        selection.removeAllRanges();
        return;
    }
    if(greatGrandParent.nodeName === "STRONG") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(greatGrandParent.innerHTML));
        greatGrandParent.parentElement.normalize();
        selection.removeAllRanges();
        return;
    }
    const selectionRange = selection.getRangeAt(0)
    const boldElem = document.createElement("strong");
    selectionRange.surroundContents(boldElem);
    selection.removeAllRanges();
  }
  const handleItalic = () => {
    const selection = window.getSelection();
    if(!selection.anchorNode) return;
    const parent = selection.anchorNode.parentElement;
    const grandParent = parent.parentElement;
    const greatGrandParent = grandParent.parentElement;
    const selectionText = selection.toString();
    
    if(parent.nodeName === "EM") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(parent.innerHTML));
        grandParent.normalize();
        selection.removeAllRanges();
        return;
    }
    if(grandParent.nodeName === "EM") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(grandParent.innerHTML));
        greatGrandParent.normalize();
        selection.removeAllRanges();
        return;
    }
    if(greatGrandParent.nodeName === "EM") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(greatGrandParent.innerHTML));
        greatGrandParent.parentElement.normalize();
        selection.removeAllRanges();
        return;
    }
    const selectionRange = selection.getRangeAt(0)
    const italicElem = document.createElement("em");
    selectionRange.surroundContents(italicElem);
    selection.removeAllRanges();
  }
  const handleLineThrough = () => {
    const selection = window.getSelection();
    if(!selection.anchorNode) return;
    const parent = selection.anchorNode.parentElement;
    const grandParent = parent.parentElement;
    const greatGrandParent = grandParent.parentElement;
    const selectionText = selection.toString();
    
    if(parent.nodeName === "S") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(parent.innerHTML));
        grandParent.normalize();
        selection.removeAllRanges();
        return;
    }
    if(grandParent.nodeName === "S") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(grandParent.innerHTML));
        greatGrandParent.normalize();
        selection.removeAllRanges();
        return;
    }
    if(greatGrandParent.nodeName === "S") {
        if (selectionText !== parent.textContent) return;
        parent.replaceWith(document.createTextNode(greatGrandParent.innerHTML));
        greatGrandParent.parentElement.normalize();
        selection.removeAllRanges();
        return;
    }
    const selectionRange = selection.getRangeAt(0);
    const linethroughElem = document.createElement("s");
    selectionRange.surroundContents(linethroughElem);
    selection.removeAllRanges();
  }
  const handleEmojiClick = (emojiData, event) => {
    let newEmoji = document.createElement("img");
    newEmoji.src = emojiData.getImageUrl("facebook");
    newEmoji.alt = emojiData.emoji;
    newEmoji.height = "22";
    newEmoji.width = "22";
    setShowEmoji(false);

    if (messageBoxRef.current.lastChild && messageBoxRef.current.lastChild.nodeName === "BR") {
        messageBoxRef.current.lastChild.remove();
    }
    if (messageBoxRef.current.lastChild && messageBoxRef.current.lastChild.nodeName === "DIV") {
        if (messageBoxRef.current.lastChild.lastChild && messageBoxRef.current.lastChild.lastChild.nodeName === "BR") {
            messageBoxRef.current.lastChild.lastChild.remove();
        }
        messageBoxRef.current.lastChild.appendChild(newEmoji);
        setMessageContent(messageBoxRef.current.innerHTML);
        return;
    }
    messageBoxRef.current.appendChild(newEmoji);
    setMessageContent(messageBoxRef.current.innerHTML);
  }
const { data: conversationData, refetch: refetchConversationData } = useQuery(["get-conversation"], async () => {
    return await getConversations();
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(successRes) {
        setConversations(successRes.data.data)
    }
});
const { data: messagesData, refetch: refetchMessagesData } = useQuery(["get-messages"], async () => {
    return await getConversationMessages(conversationId);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(successRes) {
        setMessages(successRes.data.data.data)
    }
});
const sendMessageMutation = useMutation((data) => {
    return sendConversationMessage(conversationId, data);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
        } else {
            refetchMessagesData();
            setMessageContent("");
            messageBoxRef.current.innerHTML = "";
        }
    },
    onError(error) {
        const res = error.response.data;
        if(res){
        dispatch(setError({error: true, message: res.message}));
        return;
        }
        dispatch(setError({error: true, message: "An error occured"}));
    }
});
const getCurrentConversation = () => {
    if(conversationId) {
        return conversations.filter((val) => val.id === conversationId)[0]
    } 
    return null
}
const handleMessageSend = () => {
    sendMessageMutation.mutate({
        text:  messageBoxRef.current.innerHTML
    })
}
useEffect(() => {
    refetchConversationData();
}, [])
useEffect(() => {
  if(conversationId){
    refetchMessagesData();
  }
}, [conversationId])


  return (
    <Container>
        <Wrapper>
            <ChatSidebar setConversationId={setConversationId} conversations={conversations}/>
            <MessageSection>
                {
                    conversationId ? 
                    (<ChatContainer>
                        <ChatHeader>
                            <HLeft>
                                <h2>{getCurrentConversation()?.recent_message?.from_user?.firstname} {getCurrentConversation()?.recent_message?.from_user?.lastname}</h2>
                                {/* <p>Last seen: 3 hours ago </p> */}
                            </HLeft>
                            <ContextBtn>
                                <Image src="/more-vertical.svg" height={24} width={24}/>
                            </ContextBtn>
                        </ChatHeader>
                        <MessagesCont>
                            {
                                messages.map((val, i) => (
                                    <MessageCard key={i} isOwn={val.is_own}>
                                        <UserSect>
                                            <ProfilePicWrapper>
                                                <Image src={val.from_user.profile_picture} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                                            </ProfilePicWrapper>
                                        </UserSect>
                                        <MessageContent>
                                            <h2>{val.from_user?.firstname} {val.from_user?.lastname} <span>{(new Date(val.created_at).toDateString())} {(new Date(val.created_at).toLocaleTimeString())}</span></h2>
                                            <div>
                                                {HTMLReactParser(val.text)}
                                            </div>
                                        </MessageContent>

                                    </MessageCard>
                                ))
                            }
                        </MessagesCont>
                        <Editor>
                            {
                                showEmoji && 
                                <PickerContainer ref={emojiRef}>
                                    <Picker 
                                        height="350px"
                                        emojiStyle="facebook"
                                        previewConfig={{
                                            showPreview: false,
                                        }}
                                        onEmojiClick={handleEmojiClick}
                                    />
                                </PickerContainer>
                            }
                            <MessageInput data-placeholder="Write a message" contentEditable showPlaceholder={!!messageContent} onInput={handleInput} ref={messageBoxRef}>

                            </MessageInput>
                            <ChatControls>
                                <LeftControls>
                                    <EditorBtn onClick={handleBold}>
                                        <BoldIcon />
                                    </EditorBtn>
                                    <EditorBtn onClick={handleItalic}>
                                        <ItalicIcon />
                                    </EditorBtn>
                                    <EditorBtn onClick={handleLineThrough}>
                                        <UnderlineIcon />
                                    </EditorBtn>
                                    {/* <EditorBtn>
                                        <MarkupIcon />
                                    </EditorBtn> */}
                                    <EditorBtn>
                                        <AttachmentIcon />
                                    </EditorBtn>
                                    <EditorBtn onClick={() => setShowEmoji(!showEmoji)}>
                                        <EmojiIcon />
                                    </EditorBtn>
                                </LeftControls>
                                <RightControls>
                                    <ActionBtn style={{ color: colors.primaryColor }} onClick={handleMessageSend}>
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