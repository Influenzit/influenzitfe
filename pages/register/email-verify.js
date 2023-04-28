import React from 'react'
import NotifyCard from '../../components/notify-card'
import LandingLayout from '../../layouts/landing.layout'
import { Container, Wrapper } from '../../styles/notify.style'

const EmailVerify = () => {
  return (
    <Container>
        <Wrapper>
            <NotifyCard 
                imgSrc="/message-verify.svg"
                header="Email Verified"
                link="/login"
                linkDisplay="Login Here"
                body={<p>Your email has been verified successfully. Kindly login with your username and password to continue.</p>}
            />
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