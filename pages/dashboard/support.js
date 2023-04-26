import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { AttachmentIcon, BoldIcon, EmojiIcon, ItalicIcon, MarkupIcon, SendIcon, UnderlineIcon } from '../../assets/svgIcons';
import ChatSidebar from '../../components/support-sidebar';
import LandingLayout from '../../layouts/landing.layout';
import { ActionBtn, AttachBtn, ChatContainer, ChatControls, ChatHeader, CloseBtn, Container, ContextBtn, CreateTicketCont, CTop, Editor, EditorBtn, HLeft, ImageWrapper, InputContainer, InputWrap, LeftControls, MessageCard, MessageContent, MessageInput, MessagesCont, MessageSection, NonSelectedCont, PickerContainer, ProfilePicWrapper, RightControls, StatusC, SubmitSection, UserSect, Wrapper } from '../../styles/messages.style';
import { colors } from '../../styles/theme';
import dynamic from 'next/dynamic';
import { getConversationMessages, getConversations, sendConversationMessage } from '../../api/messaging';
import { useMutation, useQuery } from '@tanstack/react-query';
import HTMLReactParser from 'html-react-parser';
import { getSocketInstance } from '../../socket/instance';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../app/reducers/user';
import { getCurrentConversationId, setCurrentConversation, setError, setLoading } from '../../app/reducers/status';
import MobileChatbar from '../../components/mobile-chatbar';
import { createDispute, getMessages, getSupportConversations, postMessages, updateSupport } from '../../api/support';
import { toast } from 'react-toastify';
import { UpdateModal } from '../../styles/view.style';
const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

const Messages = () => {
  const [messageContent, setMessageContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);
  const messageBoxRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);
  const user = useSelector(getUser);
  const [socketSet, setSocketSet] = useState(false);
  const conversationId = useSelector(getCurrentConversationId);
  const [supportId, setSupportId] = useState("");
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const dispatch = useDispatch();
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
    return await getSupportConversations();
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(successRes) {
        setConversations(successRes.data.data)
    }
});
const { data: messagesData, refetch: refetchMessagesData } = useQuery(["get-messages"], async () => {
    return await getMessages(supportId);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(successRes) {
        console.log(successRes);
        setMessages(successRes.data.data);
    }
});
const sendMessageMutation = useMutation((data) => {
    return postMessages(supportId, data);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
        } else {
            setMessageContent("");
            messageBoxRef.current.innerHTML = "";
            refetchMessagesData();
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
const updateSupportMutation = useMutation((data) => {
    return updateSupport(supportId, data);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
        } else {
            refetchConversationData();
            dispatch(setLoading(false));
            toast.success("Ticket closed successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
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
const handleSetConversationId = (id) => {
    dispatch(setCurrentConversation(id));
} 
const getCurrentConversation = () => {
    if(supportId) {
        return conversations.filter((val) => val.id === supportId)[0]
    } 
    return null
}
const handleMessageSend = () => {
    sendMessageMutation.mutate({
        text:  messageBoxRef.current.innerHTML
    })
}
const handleConversation = (conversation) => {
    if(conversation){
        if(conversation.id === Number(sessionStorage.getItem("cid"))) {
            setMessages((oldMessages) => {
                const copyOldMessages = JSON.parse(JSON.stringify(oldMessages));
                copyOldMessages.push(conversation.recent_message);
                return copyOldMessages;
            })
        }
    }
}
const handleCloseTicket = () => {
    dispatch(setLoading(true));
    updateSupportMutation.mutate({
        status: "Closed",
    })
}
useEffect(() => {
    refetchConversationData();
}, [user])

useEffect(() => {
  if(supportId){
    refetchMessagesData();
  }
}, [supportId])
useEffect(() => {
    if(messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
}, [messages])

const createDisputeMutation = useMutation( disputeData => {
    return createDispute(disputeData);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
        } else { 
            dispatch(setLoading(false));
            toast.success("Dispute created successfully", {
              position: toast.POSITION.TOP_RIGHT
            });
            setShowCreateTicket(false);
            dispatch(setLoading(false));
            refetchConversationData();
        }
    },
    onError(error) {
        const res = error.response.data;
        if(res){
          dispatch(setLoading(false));
          dispatch(setError({error: true, message: res.message}));
          return;
        }
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: "An error occured"}));
    }
});
const handleCreateDispute = () => {
    if(!supportSubject && !supportMessage) {
      return;
    } else {
      dispatch(setLoading(true));
      createDisputeMutation.mutate({
        subject: supportSubject,
        message: supportMessage,
        account_id: user.account.id,
      })
    }
  }

  return (
    <Container>
        <MobileChatbar setConversationId={handleSetConversationId} conversations={conversations} setSupportId={setSupportId}/>
        <Wrapper>
            <ChatSidebar setConversationId={handleSetConversationId} conversations={conversations} setSupportId={setSupportId} supportId={supportId} setShowCreateTicket={setShowCreateTicket}/>
            <MessageSection>
                {
                    supportId ? 
                    (<ChatContainer>
                        <ChatHeader>
                            <HLeft>
                                <p><Image src={"/ticket.svg"} alt="rec" height={14} width={14}/> #{getCurrentConversation()?.id}</p>
                                <h2>{getCurrentConversation()?.subject}</h2>
                            </HLeft>
                            {getCurrentConversation()?.status === "Open" ? (
                                    <StatusC isActive>
                                        <span></span>
                                        <span>Ongoing</span>
                                    </StatusC>
                                ):(
                                    <StatusC>
                                        <span></span>
                                        <span>Resolved</span>
                                    </StatusC>
                                )
                            }
                            {/* {getCurrentConversation()?.status === "Open" ? (
                                    <CloseBtn onClick={handleCloseTicket}>
                                        Close Tickect
                                    </CloseBtn>
                                ):(
                                    <CloseBtn>
                                        Tickect Closed
                                    </CloseBtn>
                                )
                            } */}
                        </ChatHeader>
                        <MessagesCont ref={messagesRef}>
                            {
                               messages.map((val, i) => (
                                    <MessageCard key={i} isOwn={val.is_own}>
                                        <UserSect>
                                            <ProfilePicWrapper>
                                                <Image src={val.from_user.profile_pic} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                                            </ProfilePicWrapper>
                                        </UserSect>
                                        <MessageContent>
                                            <h2>{val.from_user?.firstname} {val.from_user?.lastname} <span>{val.created_at}</span></h2>
                                            <div>
                                                {HTMLReactParser(val.text)}
                                            </div>
                                        </MessageContent>

                                    </MessageCard>
                                ))
                            }
                        </MessagesCont>
                        {
                            getCurrentConversation()?.status === "Open" && (
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
                                     <div style={{ padding: "0 15px", height: "70%", maxHeight: "70%", borderBottom: "1px solid #EAEAEB" }}>
                                        <MessageInput data-placeholder="Write a message" contentEditable showPlaceholder={!!messageContent} onInput={handleInput} ref={messageBoxRef}>
                                        </MessageInput>
                                    </div>
                                    <ChatControls>
                                        <LeftControls>
                                           <EditorBtn onClick={handleBold}>
                                        <BoldIcon />
                                        </EditorBtn>
                                        <EditorBtn onClick={handleItalic}>
                                            <ItalicIcon />
                                        </EditorBtn>
                                        {/* <EditorBtn onClick={handleLineThrough}>
                                            <UnderlineIcon />
                                        </EditorBtn> */}
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
                            )
                        }
                    </ChatContainer>) : (
                        <NonSelectedCont>
                            <ImageWrapper>
                                <Image src="/work.svg" alt="" layout='fill' objectFit='contain' objectPosition="center"/>
                            </ImageWrapper>
                            <h2>Select a ticket</h2>
                            <p>Click on any ticket on the sidebar to start a chat</p>
                        </NonSelectedCont>
                    )
                }
            </MessageSection>
        </Wrapper>
        {showCreateTicket && (
            <UpdateModal>
                <CreateTicketCont>
                    <CTop><h2>Create New Ticket</h2><button onClick={() => setShowCreateTicket(false)}><Image src={"/cancel.svg"} height={17} width={17}/></button></CTop>
                    <InputWrap>
                        <InputContainer>
                            <label>Ticket Issues</label>
                            <select>
                                <option>Account Settings</option>
                            </select>
                        </InputContainer>
                        <InputContainer>
                            <label>Subject</label>
                            <input type="text" val={supportSubject} onChange={(e) => setSupportSubject(e.target.value)}/>
                        </InputContainer>
                    </InputWrap>
                    <InputContainer style={{ width: "100%" }}>
                        <label>Description</label>
                        <textarea val={supportMessage} onChange={(e) => setSupportMessage(e.target.value)}/>
                    </InputContainer>
                    <div>
                        <AttachBtn>
                            <Image src={"/attach.svg"} height={17} width={17}/>
                            <span>Attach Files</span>
                        </AttachBtn>
                    </div>
                    <SubmitSection>
                        <button onClick={handleCreateDispute}>Submit Ticket</button>
                    </SubmitSection>
                </CreateTicketCont>
            </UpdateModal>
        )}
    </Container>
  )
}
Messages.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Messages;