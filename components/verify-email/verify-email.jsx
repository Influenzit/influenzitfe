import React from 'react'
import { Container } from './style'
import { UpdateModal } from '../../styles/view.style'
import { WelcomeModal } from '../../styles/connect-pages.style'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getVerifyStatus, setLoading } from '../../app/reducers/status'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { resendEmail } from 'api/auth'
import { toast } from 'react-toastify'
import { getUser } from 'app/reducers/user'

const VerifyEmail = () => {
  const verifyStatus = useSelector(getVerifyStatus);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const mailMutation = useMutation(
    (data) => {
      return resendEmail(data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Verification mail sent successfully. Check your inbox.", {
            position: toast.POSITION.TOP_RIGHT
        });
        dispatch(setLoading(false));
      },
      onError(error) {
        const res = error.response.data;
        dispatch(setLoading(false));
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const handleResendEmail = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mailMutation.mutate({
        email: user.email,
    })
  }

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
                      verifyStatus.campaignCount ? <button onClick={handleResendEmail}>Resend Email</button> : <button onClick={() => router.push("/dashboard/create-request")}>Create Campaign Request</button>
                    }
                </div>
            </WelcomeModal>
        </UpdateModal>
    </Container>
  )
}

export default VerifyEmail