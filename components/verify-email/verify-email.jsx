import React from 'react'
import { Container } from './style'
import { UpdateModal } from '../../styles/view.style'
import { WelcomeModal } from '../../styles/connect-pages.style'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { getVerifyStatus } from '../../app/reducers/status'
import { useRouter } from 'next/router'

const VerifyEmail = () => {
  const verifyStatus = useSelector(getVerifyStatus);
  const router = useRouter();
  return (
    <Container>
         <UpdateModal>
            <WelcomeModal>
                <div style={{ justifyContent: "left" }}>
                  <button onClick={() => router.push(`/`)}><Image src={"/arrow-left.svg"} alt="arrow_back" height={20} width={20} /></button>
                </div>
                <h2>{verifyStatus.campaignCount ? "Verify Email" : "Give your product the visibility it deserves!"}</h2>
                <p>{ verifyStatus.campaignCount ? "Please verify your email address to gain access to other pages on our website and unlock exciting features!"
                : "Create Your First Campaign Request and start receiving submissions from the right influencers." }
                </p>
                <div>
                    {
                      verifyStatus.campaignCount ? <button onClick={() => router.push("/")}>Go Home</button> : <button onClick={() => router.push("/dashboard/create-request")}>Create Campaign Request</button>
                    }
                </div>
            </WelcomeModal>
        </UpdateModal>
    </Container>
  )
}

export default VerifyEmail