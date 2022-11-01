import Link from 'next/link'
import React, { useState } from 'react'
import LandingLayout from '../../layouts/landing.layout';
import { useMutation } from "@tanstack/react-query"
import { Bottom, Center, Container, FormFields, FormHeader, FormWrapper, Input, InputContainer, SubmitButton, Wrapper } from '../../styles/auth.style'
import { createAccount } from '../../api/auth';
import { setError, setLoading } from '../../app/reducers/status';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const BusinessOwner = () => {
  const router = useRouter();
  const [formVal, setFormVal] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: ""
  })
  const dispatch = useDispatch();
  const mutation = useMutation(userData => {
    return createAccount(userData);
  }, {
    onSuccess(successRes) {
      const res = successRes.data;
      if(res.errors) {
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
      } else {
        dispatch(setLoading(false));
        router.push(`/register/email-sent?email=${formVal.email}&time=${Date.now()}`);
      }
    },
    onError(error) {
      const res = error.response.data;
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: res.message}));
    }
  })
  const handleInputChange = (val, field) => {
    setFormVal((prevVal) => {
      return {...prevVal, [field]: val};
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
        firstname: formVal.firstname,
        lastname: formVal.lastname,
        email: formVal.email,
        password: formVal.password,
        password_confirmation: formVal.password_confirmation,
    })
  }
  if (mutation.isLoading) dispatch(setLoading(true));
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Create an Account</h2>
          </FormHeader>
          <Center>
            <FormFields onSubmit={handleSubmit}>
              <InputContainer hasContent={formVal.firstname}>
                <label>Firstname</label>
                <Input
                type="text"
                value={formVal.firstname}
                onChange={(e) => handleInputChange(e.target.value, "firstname")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.lastname}>
                <label>Lastname</label>
                <Input
                type="text"
                value={formVal.lastname}
                onChange={(e) => handleInputChange(e.target.value, "lastname")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.email}>
                <label>Email</label>
                <Input
                type="email"
                value={formVal.email}
                onChange={(e) => handleInputChange(e.target.value, "email")}
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
              <InputContainer hasContent={formVal.password_confirmation}>
                <label>Confirm Password</label>
                <Input
                type="password"
                value={formVal.passwordpassword_confirmation}
                onChange={(e) => handleInputChange(e.target.value, "password_confirmation")}
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