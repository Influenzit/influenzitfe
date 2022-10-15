import React from 'react'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { Container, Content, Heading, Wrapper } from '../../../styles/profile.style'

const Password = () => {
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Password & Security</h2>
                </Heading>
            </Content>
        </Wrapper>
    </Container>
  )
}
Password.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Password