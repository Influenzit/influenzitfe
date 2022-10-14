import Image from 'next/image';
import React from 'react'
import LandingLayout from '../../layouts/landing.layout'
import { SkillCard } from '../../styles/creator-profile.style'
import { Container, ImgWrapper, NotificationWrapper, Notify, NotifyContent, Wrapper, Bottom, Top } from '../../styles/notification.style'

const passwordIcon = "/password.svg";
const completeIcon = "/complete.svg";
const deviceIcon = "/device.svg";
const userIcon = "/userIcon.svg";

const Notifications = () => {
  return (
    <Container>
        <Wrapper>
            <h1>All Notifications</h1>
            <NotificationWrapper>
                <SkillCard>
                    <Top>
                        <h2>Today</h2>
                    </Top>
                    <Bottom>
                        <Notify>
                            <ImgWrapper>
                                <Image src={passwordIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>You changed your password.</p>
                                <p>12:13 pm</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                        <Notify>
                            <ImgWrapper>
                                <Image src={deviceIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>A recent sign-in to your Influenzit account (websitechic) from an unknown device or browser.</p>
                                <p>8:15 am</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                    </Bottom>
                </SkillCard>
                <SkillCard>
                    <Top>
                        <h2>Yesterday</h2>
                    </Top>
                    <Bottom>
                        <Notify>
                            <ImgWrapper>
                                <Image src={userIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>Ezekiel Alawode (Influencer) checked your business profile</p>
                                <p>September 26</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                        <Notify>
                            <ImgWrapper>
                                <Image src={deviceIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>A recent sign-in to your Influenzit account (websitechic) from an unknown device or browser.</p>
                                <p>September 26</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                        <Notify>
                            <ImgWrapper>
                                <Image src={completeIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>Ezekiel Alawode (Graphic Designer) marked your project as completed.</p>
                                <p>September 26</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                    </Bottom>
                </SkillCard>
                <SkillCard>
                    <Top>
                        <h2>September 24</h2>
                    </Top>
                    <Bottom>
                        <Notify>
                            <ImgWrapper>
                                <Image src={userIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>Ezekiel Alawode (Influencer) checked your business profile</p>
                                <p>8:20am</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                        <Notify>
                            <ImgWrapper>
                                <Image src={deviceIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>A recent sign-in to your Influenzit account (websitechic) from an unknown device or browser.</p>
                                <p>8:20am</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                        <Notify>
                            <ImgWrapper>
                                <Image src={completeIcon} alt="" height={35} width={35}/>
                            </ImgWrapper>
                            <NotifyContent>
                                <p>Ezekiel Alawode (Graphic Designer) marked your project as completed.</p>
                                <p>8:20am</p>
                            </NotifyContent>
                            <button>
                                <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                            </button>
                        </Notify>
                    </Bottom>
                </SkillCard>
            </NotificationWrapper>
        </Wrapper>
    </Container>
  )
}

Notifications.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Notifications