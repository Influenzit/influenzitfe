import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Container, CreatorDetails, Stats, TopImg, PriceSection, StatusCapsule, Popup } from './style'
import { useRef } from 'react'
import { deleteCampaignRequest } from 'api/campaigns'
import { useMutation } from '@tanstack/react-query'

const CampaignCard = ({ imgSrc, price, content, status, reqId, reqPlatform, refetch, followers, engagements }) => {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const controlRef = useRef(null);
    const popupRef = useRef(null);

    const deleteMutation = useMutation( _ => {
        return deleteCampaignRequest(reqId);
    }, {
        onSuccess(successRes) {
            refetch();
        },
    });

    const handleClosing = (e) => {
        if (popupRef.current && controlRef.current && !popupRef.current.innerHTML.includes(e.target.innerHTML) && !controlRef.current.innerHTML.includes(e.target.innerHTML)) {
            setShowPopup(false);
        }
    }
    const handleDelete = () => {
        setShowPopup(false);
        deleteMutation.mutate();
    }
    const handlePause = () => {

    }
    useEffect(() => {
      addEventListener("click", handleClosing);
      return () => {
        removeEventListener("click", handleClosing);
      }
    }, [])
    
    return (
    <Container  onClick={() => router.push(`/campaign-requests/${reqId}`)}>
        <TopImg>
            <Image src={imgSrc} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
        </TopImg>
        <CreatorDetails>
            <p>Title: {(content ?? "").slice(0, 31)}{content.length > 31 && "..."}</p>
            <Stats>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ paddingTop: "0" }}>Platforms: </p>
                    {
                        reqPlatform.map((val) => {
                            switch (val) {
                            case "Facebook":
                                return <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                            case "Instagram":
                                return <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                            case "Twitter":
                                return <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                            case "TikTok":
                                return <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                            case "Youtube":
                                return <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                            default:
                                break;
                            }
                        })}
                </div>
            </Stats>
            <div>
                <p>Followers: {followers}</p>
            </div>
            <div>
                <p>Engagement: {engagements}</p>
            </div>
            <PriceSection>Budget: {price}</PriceSection>
        </CreatorDetails>
    </Container>
  )
}

export default CampaignCard;
