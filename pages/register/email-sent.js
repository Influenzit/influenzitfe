import { useRouter } from 'next/router'
import React from 'react'
import NotifyCard from '../../components/notify-card'
import LandingLayout from '../../layouts/landing.layout'
import { Container, Wrapper } from '../../styles/notify.style'

const EmailSent = () => {
  const router = useRouter();
  const { email } = router.query
  return (
    <Container>
        <Wrapper>
            <NotifyCard 
                imgSrc="/mail-icon.svg"
                header="Email sent!"
                link="mailto:"
                linkDisplay="Open your Email"
                body={<p>
                    We&apos;ve sent an email containing the verification link to <span>{email}</span>. If you can&apos;t find it in inbox kindly check spam and other folder.
                </p>}
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
