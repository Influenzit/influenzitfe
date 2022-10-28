import { useMutation } from '@tanstack/react-query';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../api/auth';
import LandingLayout from '../../layouts/landing.layout';
import { setLoading, setError } from '../../app/reducers/status'
import { Center, Container, FormFields, FormHeader, FormWrapper, Input, InputContainer, SubmitButton, Wrapper } from '../../styles/auth.style'

const Update = () => {
  const [formVal, setFormVal] = useState({
    password: "",
    cpassword: ""
  })
  const handleInputChange = (val, field) => {
    setFormVal((prevVal) => {
      return {...prevVal, [field]: val};
    })
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const mutation = useMutation(pData => {
    return resetPassword(pData);
  }, {
    onSuccess(successRes) {
        const res = successRes.data
        if(res.errors || res.status === "error") {
          dispatch(setLoading(false));
          dispatch(setError({error: true, message: res.message}));
        } else {
            router.push("/login")
        }
    },
    onError() {
      const res = error.response.data;
      if(res){
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
        return;
      }
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: "Check your internet connection"}));
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mutation.mutate({
        email: "",
        password: formVal.password,
        password_confirmation: formVal.cpassword,
        token: "",
    })
  }
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Update Password</h2>
          </FormHeader>
          <Center>
            <p>Update your password</p>
            <FormFields onSubmit={handleSubmit}>
              <InputContainer hasContent={formVal.password}>
                <label>Password</label>
                <Input
                type="password"
                value={formVal.password}
                onChange={(e) => handleInputChange(e.target.value, "password")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.cpassword}>
                <label>Confirm Password</label>
                <Input
                type="password"
                value={formVal.cpassword}
                onChange={(e) => handleInputChange(e.target.value, "cpassword")}
                required
                />
              </InputContainer>
              <SubmitButton type="submit">Update</SubmitButton>
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
Update.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default Update