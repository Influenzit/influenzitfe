import React from 'react'
import NotifyCard from '../../components/notify-card'
import LandingLayout from '../../layouts/landing.layout'
import { Container, Wrapper } from '../../styles/notify.style'

const EmailSent = () => {
  return (
    <Container>
        <Wrapper>
            <NotifyCard 
                imgSrc="/message-sent.svg"
                header="Email sent!"
                link="/"
                linkDisplay="Resend Email"
                body={<p>We&apos;ve sent an email to your email address. Follow the steps provided in the email to update your password.</p>}
            />
        </Wrapper>
    </Container>
  )
}

EmailSent.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default EmailSent