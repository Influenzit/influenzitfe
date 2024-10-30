import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createWaitlist } from '../api/waitlist'
import { isLoading, setError, setLoading } from '../app/reducers/status'
import Loader from '../components/loading'
import Footer from '../components/waitlist-footer'
import { Answer, Faq, FaqWrapper, Question, WrapperSix } from '../styles/home.style'
import { AccessCard, AccessCardT, Banner, CardLayer, Container, Details, ImgContainer, Info, Wrapper, IframeWrapper, IframeWrapperT } from '../styles/waitlist.style'

const ThankYouPage = () => {
  const [faq, setFaq] = useState({});
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const loadingStatus = useSelector(isLoading);
  const mutation = useMutation(waitlistData => {
    return createWaitlist(waitlistData);
  }, {
    onSuccess(successRes) {
        const res = successRes.data;
        console.log(successRes);
        toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        setEmail("");
        dispatch(setLoading(false));
    },
    onError(error) {
        const res = error.response.data;
        if(res){
          dispatch(setLoading(false));
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          setEmail("");
          return;
        }
        dispatch(setLoading(false));
        toast.error("An error occured", {
            position: toast.POSITION.TOP_RIGHT
        });
        setEmail("");
      }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mutation.mutate({
        email,
        account_type: "Influencer",
    })
  }

  return (
    <Container>
        <Banner>
            <Image src="/influenzit_logo.png" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            <h1>Thank you for registering for this webinar.</h1>
            <p>We look forward to your presence on Friday for the webinar. Please set a reminder so you don&apos;t miss it.</p>
            <p>In the meantime, please go ahead and create an account on 
                <a href="https://influenzit.com/register" target="_blank" rel="noopener noreferrer" 
                   >
                    influenzit.com
                </a>
            </p>          
        </Banner>
        <Footer />
        {loadingStatus && <Loader />}
    </Container>
  )
}

export default ThankYouPage
