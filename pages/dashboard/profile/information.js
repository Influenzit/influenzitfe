import Image from 'next/image'
import React from 'react'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { AddSocialBtn, Bottom, Container, Content, FormContainer, Heading, InputContainer, InputFlex, Wrapper } from '../../../styles/profile.style'

const Information = () => {
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Business Information</h2>
                </Heading>
                <FormContainer>
                    <InputFlex>
                        <InputContainer>
                            <label>Business Name</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Username</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Email Address</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Phone Number</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Industry</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Location</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                    <InputContainer>
                        <label>About the business</label>
                        <textarea />
                    </InputContainer>
                </FormContainer>
                <Heading>
                    <h2>Social Media Profiles</h2>
                </Heading>
                <FormContainer>
                    <InputFlex>
                        <InputContainer>
                            <label>Facebook</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Instagram</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Linkedin</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Twitter</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                </FormContainer>
                <AddSocialBtn><Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add another social media profile</span></AddSocialBtn>
                <Bottom>
                    <button>Save Changes</button>
                </Bottom>
            </Content>
        </Wrapper>
    </Container>
  )
}
Information.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Information