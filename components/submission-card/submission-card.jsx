import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, Controls, CreatorDetails, SocialHandle, Stats, TopImg } from './style'
import ReactStars from "react-rating-stars-component";
import { useMutation } from '@tanstack/react-query'
import { startConversation } from '../../api/messaging'

const SubmissionCard = ({imgSrc, name, id, profileLink, skills, rating, platforms}) => {
    const router = useRouter();
    const startConversationMutation = useMutation((data) => {
        return startConversation(data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if (res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({ error: true, message: res.message }));
            } else {
                router.push("/dashboard/messages");
            }
        },
        onError(error) {
            const res = error.response.data;
            if (res) {
                dispatch(setError({ error: true, message: res.message }));
                return;
            }
            dispatch(setError({ error: true, message: "An error occured" }));
        }
    });
    const handleStartConversation = () => {
        startConversationMutation.mutate({
            to_user_id: id,
            text: "The campaign with id: " + id + " was accepted",
        })
    }
    return (
    <Container>
        <button onClick={() => handleStartConversation()}>
            Accept
        </button>
        <TopImg onClick={() => router.push(profileLink)}>
            <Image src={imgSrc} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
        </TopImg>
        <CreatorDetails onClick={() => router.push(profileLink)}>
            <Stats>
                <div>
                    { platforms.facebook_verified && <Image src="/facebook-icon.svg" alt="" height={12} width={12}/> }
                    { platforms.instagram_verified && <Image src="/instagram-icon.svg" alt="" height={12} width={12}/> }
                    { platforms.twitter_verified && <Image src="/twitter-icon.svg" alt="" height={12} width={12}/> }
                    { platforms.tiktok_verified && <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/> }
                    { platforms.youtube_verified && <Image src="/youtube-icon.svg" alt="" height={12} width={12}/> }
                </div>
                <div>
                    <ReactStars
                        isHalf={true}
                        count={5}
                        value={Number(rating) ?? 0}
                        size={16}
                        edit={false}
                        activeColor="#DF475C"
                    />
                </div>
            </Stats>
            <h4>{name}</h4>
            <p>{skills ? skills : "No industry"}</p>
        </CreatorDetails>
    </Container>
  )
}

export default SubmissionCard;
