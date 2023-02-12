import Link from 'next/link'
import React, { useState } from 'react'
import LandingLayout from '../../layouts/landing.layout';
import { useMutation } from "@tanstack/react-query"
import { BannerReg, Bottom, Center, Container, FacebookBtn, FlexInput, FormFields, FormHeader, FormWrapper, GoogleBtn, Input, InputContainer, SocialIcon, SocialLogin, SubmitButton, Wrapper } from '../../styles/auth.style'
import { createAccount, socialLogin } from '../../api/auth';
import { setError, setLoading, setUserType } from '../../app/reducers/status';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { setBusinesses } from '../../app/reducers/business';
import { updateUser } from '../../app/reducers/user';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

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
  const socialMutation = useMutation(userData => {
    return socialLogin(userData);
  }, {
    onSuccess(successRes) {
      const res = successRes.data.data
      if(res.errors || res.status === "error") {
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
      } else {
        localStorage.setItem("token", res.token);
        const { is_influencer, is_creator, is_businessowner } = res.user.account;
        if (is_businessowner) {
          dispatch(setUserType("Business Owner"));
          getBusinesses(res.token).then((bizRes) => {
            if (bizRes.data && res) {
              dispatch(setLoading(false));
              dispatch(setBusinesses(bizRes.data.data))
              dispatch(updateUser(res.user));
              dispatch(setError({error: false, message: ""}));
              localStorage.setItem("user-id", res.user.id);
              router.push("/dashboard");
            }
          }).catch( _ => {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: "An error occured"}))
          })
        } else {
          dispatch(setLoading(false));
          dispatch(updateUser(res.user));
          dispatch(setError({error: false, message: ""}));
          localStorage.setItem("token", res.token);
          localStorage.setItem("user-id", res.user.id);
          
          if (is_influencer || is_creator) {
            is_influencer ? dispatch(setUserType("Influencer")) : (is_creator && dispatch(setUserType("Creator")))
            router.push("/dashboard");
          } else {
            router.push("/dashboard/account-type");
          }
        }
      }
    },
    onError(error) {
      const res = error.response.data;
      if(res){
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
        return;
      }
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: "An error occured"}));
    }
  })

  const handleFacebookLogin = (res) => {
    dispatch(setLoading(true));
    socialMutation.mutate({
     code: res.accessToken,
     provider: 'facebook'
    })
   }
   const handleGoogleLogin = (token) => {
     dispatch(setLoading(true));
     socialMutation.mutate({
       code: token,
       provider: 'google'
     })
   }
   const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleLogin(tokenResponse.access_token),
  });
  const handleFailure = () => {
    dispatch(setLoading(false));
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
    <Container style={{ paddingTop: "20px"}}>
      <Wrapper style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <FormWrapper>
          <FormHeader style={{ alignItems: "flex-start" }}>
            <h2>Sign up</h2>
          </FormHeader>
          <Center>
            <FormFields onSubmit={handleSubmit}>
              <FlexInput>
                <InputContainer hasContent={formVal.firstname}>
                  <label>First Name</label>
                  <Input
                  type="text"
                  value={formVal.firstname}
                  onChange={(e) => handleInputChange(e.target.value, "firstname")}
                  placeholder="Enter your firstname"
                  required
                  />
                </InputContainer>
                <InputContainer hasContent={formVal.lastname}>
                  <label>Last Name</label>
                  <Input
                  type="text"
                  value={formVal.lastname}
                  placeholder="Enter your lastname"
                  onChange={(e) => handleInputChange(e.target.value, "lastname")}
                  required
                  />
                </InputContainer>
              </FlexInput>
              <InputContainer hasContent={formVal.email}>
                <label>Email</label>
                <Input
                type="email"
                value={formVal.email}
                placeholder="Enter your email"
                onChange={(e) => handleInputChange(e.target.value, "email")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.password}>
                <label>Password</label>
                <Input
                type="password"
                value={formVal.password}
                placeholder="Enter your password"
                onChange={(e) => handleInputChange(e.target.value, "password")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.password_confirmation}>
                <label>Confirm Password</label>
                <Input
                type="password"
                value={formVal.password_confirmation}
                placeholder="Confirm your password"
                onChange={(e) => handleInputChange(e.target.value, "password_confirmation")}
                required
                />
              </InputContainer>
              <SubmitButton type="submit">Register</SubmitButton>
              <SocialLogin>
                <GoogleBtn onClick={googleLogin}>
                  <SocialIcon>
                    <Image src="/google-r.svg" alt="" height={22} width={22} />
                  </SocialIcon>
                  <span>Sign up with Google</span>
                </GoogleBtn>
                <FacebookLogin
                  appId="3349779741932998"
                  callback={handleFacebookLogin}
                  onFailure={handleFailure}
                  render={(renderProps) => (
                    <FacebookBtn  onClick={renderProps.onClick}>
                      <SocialIcon>
                        <Image src="/facebook-r.svg" alt="" height={22} width={22} />
                      </SocialIcon>
                      <span>Sign up with Facebook</span>
                    </FacebookBtn>
                  )}
                />
              </SocialLogin>
            </FormFields>
          </Center>
          <Bottom>
            <p>Already have an account? <Link href="/login"><a>Login Here</a></Link></p>
          </Bottom>
        </FormWrapper>
        <BannerReg>

        </BannerReg>
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