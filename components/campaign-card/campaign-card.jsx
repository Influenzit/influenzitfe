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
    <Container>
        {/* <StatusCapsule toShow={status}>{status}</StatusCapsule> */}
        {
            showPopup ? (
                <Popup ref={popupRef}>
                    <Link href={`/dashboard/campaigns/request-preview/${reqId}`} passHref><a target='_blank'>Preview</a></Link>
                    <button onClick={() => router.push(`/dashboard/campaigns/request-submissions/${reqId}`)}>View Submission</button>
                    <button onClick={() => router.push(`/dashboard/create-request?id=${reqId}`)}>Edit</button>
                    {/* <button onClick={handlePause}>Pause</button> */}
                    <button onClick={handleDelete}>Delete</button>
                </Popup>
            ):null
        }
        <TopImg>
            <Image src={imgSrc} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
        </TopImg>
        <CreatorDetails>
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
                <button onClick={() => setShowPopup(!showPopup)} ref={controlRef}>
                    <Image src="/3-dots.svg" alt="" height={24} width={24}/>
                </button>
            </Stats>
            <div>
                <p>Followers: {followers}</p>
            </div>
            <div>
                <p>Engagement: {engagements}</p>
            </div>
            {/* <p>{(content ?? "").slice(0, 31)}{content.length > 31 && "..."}</p> */}
            <PriceSection>Payment: {price}</PriceSection>
        </CreatorDetails>
    </Container>
  )
}

export default CampaignCard;
