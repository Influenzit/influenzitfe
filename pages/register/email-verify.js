import React, { useEffect } from 'react'
import NotifyCard from '../../components/notify-card'
import LandingLayout from '../../layouts/landing.layout'
import { Container, Wrapper } from '../../styles/notify.style'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { verifyEmail } from 'api/auth'
import { setSuccess } from 'app/reducers/status'
import { toast } from 'react-toastify'

const EmailVerify = () => {
  const router = useRouter();
  const {id, expires, hash, signature, email } = router.query;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { data, refetch: verifyEmailReq } = useQuery(["verify-email"], async () => {
    return await verifyEmail(`/${id}?expires=${expires}&hash=${hash}&signature=${signature}`);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess() {
        setLoading(false);
        setSuccess(true);
    },
    onError(res) {
       setLoading(false);
       toast.error("An error occured", {
        position: toast.POSITION.TOP_RIGHT
       });
    }
});

  useEffect(() => {
    if(expires) {
        const expiringTime = Number(expires);
        const currentTime = Math.floor(Date.now() / 1000);
        if((expiringTime - currentTime) > 60) {
            verifyEmailReq();
        } else {
            router.push(`/register/email-expired?email=${email}`);
        } 
    }
  }, [router.query])
  
  return (
    <Container>
        <Wrapper>
            {
                loading && <p>Verifing Email...</p>
            }
            {
                success && (
                    <NotifyCard 
                        imgSrc="/message-verify.svg"
                        header="Email Verified"
                        link="/login"
                        linkDisplay="Login Here"
                        body={<p>Your email has been verified successfully. Kindly login with your username and password to continue.</p>}
                    />
                )
            }
        </Wrapper>
    </Container>
  )
}

EmailVerify.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default EmailVerify