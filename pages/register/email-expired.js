import React from 'react'
import NotifyCard from '../../components/notify-card'
import LandingLayout from '../../layouts/landing.layout'
import { Container, Wrapper } from '../../styles/notify.style'
import EmailExpired from '../../components/email-expired'

const EmailVerify = () => {
  return (
    <Container>
        <Wrapper>
            <EmailExpired />
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
