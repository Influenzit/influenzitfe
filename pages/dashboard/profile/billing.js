import React from 'react'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { Container, Content, Heading, Wrapper } from '../../../styles/profile.style'

const Billing = () => {
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Billing & Payments</h2>
                </Heading>
            </Content>
        </Wrapper>
    </Container>
  )
}
Billing.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Billing