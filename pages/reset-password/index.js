import Link from 'next/link'
import React, { useState } from 'react'
import LandingLayout from '../../layouts/landing.layout';
import { Center, Container, FormFields, FormHeader, FormWrapper, Input, InputContainer, SubmitButton, Wrapper } from '../../styles/auth.style'

const Login = () => {
  const [formVal, setFormVal] = useState({})
  const handleInputChange = (val, field) => {
    setFormVal((prevVal) => {
      return {...prevVal, [field]: val};
    })
  }

  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Reset Password</h2>
          </FormHeader>
          <Center>
            <p>Enter your username or email address and select Send Email.</p>
            <FormFields>
              <InputContainer hasContent={formVal.businessEmail}>
                <label>Email / Username</label>
                <Input
                type="email"
                value={formVal.businessEmail}
                onChange={(e) => handleInputChange(e.target.value, "businessEmail")}
                required
                />
              </InputContainer>
              <SubmitButton type="submit">Send Email</SubmitButton>
            </FormFields>
            <Link href="/login">
                <a id="cancel">Cancel &amp; Login</a>
            </Link>
          </Center>
        </FormWrapper>
      </Wrapper>
    </Container>
  )
}
Login.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default Login