import React from 'react'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { Container, Content, Heading, Wrapper } from '../../../styles/profile.style'

const Notifications = () => {
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Notifications</h2>
                </Heading>
            </Content>
        </Wrapper>
    </Container>
  )
}
Notifications.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Notifications