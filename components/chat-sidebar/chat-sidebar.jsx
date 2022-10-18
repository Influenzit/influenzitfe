import Image from 'next/image'
import React from 'react'
import { Bottom, ChatBottom, ChatDetails, ChatTop, Container, ProfilePicWrapper, SearchContainer, Top, UserCard, UserSect } from './style'

const ChatSidebar = ({setUserId}) => {
  return (
    <Container>
        <Top>
            <h2>All messages (20) <Image src="/down-chev-b.svg" height={12} width={20}/></h2>
            <SearchContainer>
                <input type="text" placeholder="Search by name"/>
                <button>
                    <Image src="/search-b.svg" alt="" height={22} width={22}/>
                </button>
            </SearchContainer>
        </Top>
        <Bottom>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well...</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
            <UserCard onClick={() => setUserId("123")}>
                <UserSect>
                    <ProfilePicWrapper>
                        <Image src="/profile-pic.png" alt="profile-picture" layout='fill' objectPosition="center" objectFit="cover" />
                    </ProfilePicWrapper>
                </UserSect>
                <ChatDetails>
                    <ChatTop>
                        <p>Ezekiel Alwode</p>
                        <span>45 minutes</span>
                    </ChatTop>
                    <ChatBottom>
                        <p>Hi, hope you are good and doing well</p>
                        <span>2</span>
                    </ChatBottom>
                </ChatDetails>
            </UserCard>
        </Bottom>
    </Container>
  )
}

export default ChatSidebar