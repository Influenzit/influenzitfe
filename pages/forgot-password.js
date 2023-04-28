import { useMutation } from '@tanstack/react-query';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../api/auth';
import LandingLayout from '../layouts/landing.layout';
import { setLoading, setError } from '../app/reducers/status'
import { Center, Container, FormFields, FormHeader, FormWrapper, Input, InputContainer, SubmitButton, Wrapper } from '../styles/auth.style'

const Login = () => {
  const [formVal, setFormVal] = useState({})
  const handleInputChange = (val, field) => {
    setFormVal((prevVal) => {
      return {...prevVal, [field]: val};
    })
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const mutation = useMutation(emailData => {
    return forgotPassword(emailData);
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mutation.mutate({
        email: formVal.email
    })
  }
  if (mutation.isLoading) dispatch(setLoading(true));
  if (mutation.isSuccess) {
    const res = mutation.data.data;
    if(res.message === "Email could not be sent to this email address") {
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: res.message}));
    } else {
      dispatch(setLoading(false));
      router.push("/reset-password/email-sent");
    }
  }
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Forgot Password</h2>
          </FormHeader>
          <Center>
            <p>Enter your username or email address and click the Send Email button.</p>
            <FormFields onSubmit={handleSubmit}>
              <InputContainer hasContent={formVal.email}>
                <label>Email</label>
                <Input
                type="email"
                value={formVal.email}
                onChange={(e) => handleInputChange(e.target.value, "email")}
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