import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LandingLayout from '../layouts/Landing.layout'
import { Container, FormContainer, InputContainer, InputSection, SocialLinks, TextAreaContainer, Wrapper } from '../styles/contact.style'

const Contact = () => {
  return (
    <Container>
        <Wrapper>
            <h1>Get in touch</h1>
            <p>Give us some information on what you are looking for and our team will reach out to you as soon as possible.</p>
            <Link href="mailto:help@influenzit.com">
                <a>help@influenzit.com</a>
            </Link>
            <Link href="tel:+2349098765432">
                <a>+234 909 876 5432</a>
            </Link>
            <SocialLinks>
                <Link href="https://" target="_blank">
                    <Image alt="" src="/facebook.svg" height={25} width={25}/>
                </Link>
                <Link href="https://" target="_blank">
                    <Image alt="" src="/twitter.svg" height={25} width={25}/>
                </Link>
                <Link href="https://" target="_blank">
                    <Image alt="" src="/instagram.svg" height={25} width={25}/>
                </Link>
                <Link href="https://" target="_blank">
                    <Image alt="" src="/linkedin.svg" height={25} width={25}/>
                </Link>
                <Link href="https://" target="_blank">
                    <Image alt="" src="/pintrest.svg" height={25} width={25}/>
                </Link>
            </SocialLinks>
            <h3>Send a message</h3>
            <FormContainer>
                <InputSection>
                    <InputContainer>
                        <label>First Name</label>
                        <input type="text" />
                    </InputContainer>
                    <InputContainer>
                        <label>Last Name</label>
                        <input type="text" />
                    </InputContainer>
                </InputSection>
                <InputSection>
                    <InputContainer>
                        <label>Company Name</label>
                        <input type="text" />
                    </InputContainer>
                    <InputContainer>
                        <label>Business Email</label>
                        <input type="text" />
                    </InputContainer>
                </InputSection>
                <InputSection>
                    <InputContainer>
                        <label>Contact Number</label>
                        <input type="text" />
                    </InputContainer>
                    <InputContainer>
                        <label>Business Location</label>
                        <input type="text" />
                    </InputContainer>
                </InputSection>
                <TextAreaContainer>
                    <label>Your Message</label>
                    <textarea />
                </TextAreaContainer>
                <button>Send Message</button>
            </FormContainer>
        </Wrapper>
    </Container>
  )
}
Contact.getLayout = (page) => {
    return (
      <LandingLayout>
        {page}
      </LandingLayout>
    )
  }

export default Contact