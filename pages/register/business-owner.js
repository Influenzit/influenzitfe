import Link from 'next/link'
import React, { useState } from 'react'
import LandingLayout from '../../layouts/Landing.layout';
import { Bottom, Center, Container, FormFields, FormHeader, FormWrapper, Input, InputContainer, SubmitButton, Wrapper } from '../../styles/auth.style'

const BusinessOwner = () => {
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
            <h2>Create an Account</h2>
          </FormHeader>
          <Center>
            <FormFields>
              <InputContainer hasContent={formVal.businessName}>
                <label>Business Name</label>
                <Input
                type="text"
                value={formVal.businessName}
                onChange={(e) => handleInputChange(e.target.value, "businessName")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.username}>
                <label>Username</label>
                <Input
                type="text"
                value={formVal.username}
                onChange={(e) => handleInputChange(e.target.value, "username")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.industry}>
                <label>Choose an industry</label>
                <select
                  value={formVal.industry}
                  onChange={(e) => handleInputChange(e.target.value, "industry")}
                  required
                >
                  <option></option>
                  <option value="ind1">Industry 1</option>
                  <option value="ind2">Industry 2</option>
                </select>
              </InputContainer>
              <InputContainer hasContent={formVal.businessEmail}>
                <label>Business Email</label>
                <Input
                type="email"
                value={formVal.businessEmail}
                onChange={(e) => handleInputChange(e.target.value, "businessEmail")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.address}>
                <label>Address</label>
                <Input
                type="text"
                value={formVal.address}
                onChange={(e) => handleInputChange(e.target.value, "address")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.password}>
                <label>Password</label>
                <Input
                type="password"
                value={formVal.password}
                onChange={(e) => handleInputChange(e.target.value, "password")}
                required
                />
              </InputContainer>
              <SubmitButton type="submit">Register</SubmitButton>
            </FormFields>
          </Center>
          <Bottom>
            <p>Already have an account? <Link href="/login"><a>Login Here</a></Link></p>
          </Bottom>
        </FormWrapper>
      </Wrapper>
    </Container>
  )
}
BusinessOwner.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default BusinessOwner;