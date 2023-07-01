import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { AttachmentIcon, BoldIcon, DeleteIcon, EmojiIcon, ItalicIcon, MarkupIcon, SendIcon, UnderlineIcon } from '../../assets/svgIcons';
import ChatSidebar from '../../components/chat-sidebar';
import LandingLayout from '../../layouts/landing.layout';
import { ActionBtn, BContainer, ChatContainer, ChatControls, ChatHeader, Container, ContextBtn, Editor, EditorBtn, FileContainer, FilesList, HLeft, ImageWrapper, Label, LeftControls, MessageCard, MessageContent, MessageInput, MessagesContB, MessageSection, NonSelectedCont, PickerContainer, PImageContainer, ProfilePicWrapper, RightControls, UserSect, Wrapper } from '../../styles/messages.style';
import { colors } from '../../styles/theme';
import dynamic from 'next/dynamic';
import { getConversationMessages, getConversations, sendConversationMessage } from '../../api/messaging';
import { useMutation, useQuery } from '@tanstack/react-query';
import HTMLReactParser from 'html-react-parser';
import { getSocketInstance } from '../../socket/instance';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../app/reducers/user';
import { getCurrentConversationId, setCurrentConversation } from '../../app/reducers/status';
import MobileChatbar from '../../components/mobile-chatbar';
import { UpdateModal } from 'styles/view.style';
import { WelcomeModal } from 'styles/connect-pages.style';
import { InputContainer } from 'styles/auth.style';
import Link from 'next/link'
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
  const [filesToSend, setFilesToSend] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleInput = (e) => {
    if(e.currentTarget.innerHTML === "<br>") {
        setMessageContent("");
        e.currentTarget.innerHTML = "";
        return; 
    }
    setMessageContent(e.currentTarget.innerHTML)
  }
  const download = (fileUrl, filename) => {
    let anchor = document.createElement('a');
	anchor.href = fileUrl;
	anchor.download = filename;
    anchor.target = "_blank";
	document.body.appendChild(anchor);
	anchor.click();
    anchor.remove();
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
    newEmoji.height = "18";
    newEmoji.width = "18";
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
        setMessages(successRes.data.data.data.reverse());
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
            setMessageContent("");
            messageBoxRef.current.innerHTML = "";
            setShowPopup(false);
            setComment("");
            setFilesToSend([]);
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
const handleSendMessageWithMedia = () => {
    const formData = new FormData();
    formData.append("text", comment);
    filesToSend.forEach((val, i) => {
        formData.append(`img-${i + 1}`, val.file);
    })
    sendMessageMutation.mutate(formData);
} 
const handleFileChangeDrop = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFilesToSend((prev) => {
        let newList = [...prev];
        newList.push({
            url: file.type.includes("image") ? URL.createObjectURL(file) : "",
            file: file,
        })
        return newList;
    })
    setShowPopup(true);
}
const handleImageRemove = (i) => {
    if(filesToSend.length === 1) {
        setFilesToSend([])
        setShowPopup(false);
    } else {
        setFilesToSend((prev) => {
            let newList = [...prev];
            newList.splice(i,1);
            return newList;
        })
    }
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
        setConversations((oldConversations) => {
            let copyOldConversations = JSON.parse(JSON.stringify(oldConversations));
            let cantFindOne = true;
            copyOldConversations = copyOldConversations.map((val) => {
                if(conversation.id === val.id) {
                    cantFindOne = false;
                    return conversation;
                } 
                return val;
            })
            if(cantFindOne) {
                copyOldConversations.push(conversation);
            }
            return copyOldConversations;
        })
    }
}
useEffect(() => {
    refetchConversationData();
    const socketInstance = getSocketInstance();
    if(!!user && !socketSet) {
        socketInstance.channel(user.email).listen(".Conversation", (e) => {
            handleConversation(e.data);
        })
        setSocketSet(true);
    }
    return () => {
        if(!!user) {
            socketInstance.channel(user.email).stopListening(".Conversation", (e) => {
                handleConversation(e.data);
            })
        }
    }
}, [user])

useEffect(() => {
  if(conversationId){
    refetchMessagesData();
  }
}, [conversationId]);
useEffect(() => {
    if(messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
}, [messages])



  return (
    <Container>
         {
            showPopup && (
                <UpdateModal>
                    <WelcomeModal style={{ width: "400px", padding: "10px 30px" }}>
                        <div style={{ paddingBottom: "0" }}>
                            <button onClick={() => setShowPopup(false)}><Image src="/cancel.svg" alt="" height={14} width={14} /></button>
                        </div>
                        <h2 style={{ fontSize: "18px" }}>{filesToSend.length} file(s) selected</h2>
                        <FilesList>
                            {
                                filesToSend.map((val, i) => {
                                    return val.url ? (
                                        <PImageContainer>
                                            <Image src={val.url} alt="file" layout="fill" objectPosition="center" objectFit='contain'/>
                                            <button id="delete" onClick={() => handleImageRemove(i)}>
                                                <Image src="/delete.svg" alt="del" height={20} width={20} />
                                            </button>
                                        </PImageContainer>
                                    ) : (
                                        <FileContainer>
                                            <div id="icon">
                                                <Image src="/file.svg" alt="file_icon" height={25} width={25} />
                                            </div>
                                            <div id="details">
                                                <p>{val.file.name}</p>
                                                <span>{(val.file.size / 1000).toFixed(1)} KB</span>
                                            </div>
                                            <button id="delete" onClick={() => handleImageRemove(i)}>
                                                <Image src="/delete.svg" alt="del" height={20} width={20} />
                                            </button>
                                        </FileContainer>
                                    )
                                })
                            }
                        </FilesList>
                        <InputContainer style={{ flexDirection: "column", alignItems: "start" }}>
                            <label>Comment</label>
                            <textarea 
                                placeholder='Enter Comment'
                                value={comment}
                                onInput={(e) => setComment(e.target.value)}
                                style={{ height: "100px" }}
                            >

                            </textarea>
                        </InputContainer>
                        <BContainer>
                            <label htmlFor='attachment'>Add</label>
                            <button onClick={handleSendMessageWithMedia}>Send Message</button>
                        </BContainer>
                    </WelcomeModal>
                </UpdateModal>
            )
        }
        <MobileChatbar setConversationId={handleSetConversationId} conversations={conversations}/>
        <Wrapper>
            <ChatSidebar setConversationId={handleSetConversationId} conversations={conversations} conversationId={conversationId}/>
            <MessageSection>
                {
                    conversationId ? 
                    (<ChatContainer>
                        <MessagesContB ref={messagesRef}>
                            {
                               messages.map((val, i) => {
                                
                                        return (<React.Fragment key={i}>
                                            {val.media.map((med, j) => (
                                                 <MessageCard key={j} isOwn={val.is_own}>
                                                    {
                                                         j === 0 && (
                                                             <UserSect>
                                                                 <ProfilePicWrapper>
                                                                     <Image src={val.from_user.profile_pic} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                                                                 </ProfilePicWrapper>
                                                             </UserSect>
                                                         )
                                                     }
                                                 <MessageContent>
                                                    {
                                                         j === 0 && (
                                                            <h2>{val.from_user?.firstname} {val.from_user?.lastname} <span>{val.created_at}</span></h2>
                                                         )
                                                     }
                                                     <div>
                                                         {med.mime.includes("image") ? (
                                                             <PImageContainer>
                                                                 <Image src={med.url} alt="file" layout="fill" objectPosition="center" objectFit='contain'/>
                                                                 <button id="delete" onClick={() => download(med.url, med.filename)}>
                                                                    <Image src="/download.png" alt="del" height={20} width={20} />
                                                                 </button>
                                                             </PImageContainer>
                                                         ) : (
                                                             <FileContainer>
                                                                 <div id="icon">
                                                                     <Image src="/file.svg" alt="file_icon" height={25} width={25} />
                                                                 </div>
                                                                 <div id="details">
                                                                     <p>{med.filename}</p>
                                                                     <span>{(Number(med.size) / 1000).toFixed(1)} KB</span>
                                                                 </div>
                                                                 <button id="delete" onClick={() => download(med.url, med.filename)}>
                                                                    <Image src="/download.png" alt="del" height={20} width={20} />
                                                                 </button>
                                                             </FileContainer>
                                                         )}
                                                     </div>
                                                 </MessageContent>
                                             </MessageCard>)
                                            )}
                                            {
                                                val.text && (
                                                    <MessageCard key={i} isOwn={val.is_own} style={{ margin: val.media.length ? "0 20px" : "10px 20px", padding: val.media.length ? "0 10px 12px 10px" : "12px 10px" }}>
                                                        {
                                                            val.media.length ? null : (
                                                                <UserSect>
                                                                    <ProfilePicWrapper>
                                                                        <Image src={val.from_user.profile_pic} alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                                                                    </ProfilePicWrapper>
                                                                </UserSect>)
                                                        }
                                                        <MessageContent>
                                                            {
                                                                val.media.length ? null : (
                                                                    <h2>{val.from_user?.firstname} {val.from_user?.lastname} <span>{val.created_at}</span></h2>
                                                                )
                                                            }
                                                            <div>
                                                                {HTMLReactParser(val.text)}
                                                            </div>
                                                        </MessageContent>
                                                    </MessageCard>
                                                )
                                            }
                                        </React.Fragment>)
                                    })
                            }
                        </MessagesContB>
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
                                <MessageInput data-placeholder="Write a message" contentEditable showPlaceholder={!!messageContent} onDrop={(e) => e.preventDefault()} onInput={handleInput} ref={messageBoxRef}>
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
                                    <input type="file" hidden id="attachment" onChange={handleFileChangeDrop}/>
                                    <Label htmlFor='attachment'>
                                        <AttachmentIcon />
                                    </Label>
                                    <EditorBtn onClick={() => setShowEmoji(!showEmoji)}>
                                        <EmojiIcon />
                                    </EditorBtn>
                                </LeftControls>
                                <RightControls>
                                    <ActionBtn style={{ color: colors.primaryColor }} onClick={handleMessageSend}>
                                        <SendIcon />
                                        <span>Send</span>
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
                            <p>Click on any name on the chatbar to start a chat</p>
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