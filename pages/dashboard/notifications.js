import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { getNotifications, markAllAsRead } from '../../api/notification';
import LandingLayout from '../../layouts/landing.layout'
import { SkillCard } from '../../styles/creator-profile.style'
import { Container, ImgWrapper, NotificationWrapper, Notify, NotifyContent, Wrapper, Bottom, Top } from '../../styles/notification.style'
import { AddSocialBtn } from '../../styles/profile.style';

const passwordIcon = "/password.svg";
const completeIcon = "/complete.svg";
const deviceIcon = "/device.svg";
const userIcon = "/userIcon.svg";

const Notifications = () => {
    const { data, refetch } = useQuery(["get-notifications"], async () => {
        return await getNotifications();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
    });
    const readNotificationMutation = useMutation(() => {
        return markAllAsRead();
    },{
        onSuccess(successRes) {
            const res = successRes.data;
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
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
  useEffect(() => {
    refetch();
    readNotificationMutation.mutate();
  }, [])
  
  return (
    <Container>
        <Wrapper>
            <h1>All Notifications</h1>
            <NotificationWrapper>
                <SkillCard>
                    {/* <Top>
                        <h2>Today</h2>
                    </Top> */}
                    <Bottom>
                        {
                            data?.data?.data?.map((val, i) => (
                                <Notify key={i}>
                                    <ImgWrapper>
                                        <Image src={userIcon} alt="" height={35} width={35}/>
                                    </ImgWrapper>
                                    <NotifyContent>
                                        <p>{val.data.text}</p>
                                        <p>{(new Date(val.created_at).toDateString())} {(new Date(val.created_at).toLocaleTimeString())}</p>
                                    </NotifyContent>
                                    {/* <button>
                                        <Image src="/cancel-b.svg" alt="" height={18} width={18} />
                                    </button> */}
                                </Notify>
                            ))
                        }
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