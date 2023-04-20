import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch } from 'react-redux'
import { loginUser, socialLogin } from '../api/auth'
import { getBusinesses } from '../api/business'
import { setBusinesses } from '../app/reducers/business'
import { setError, setLoading, setUserType } from '../app/reducers/status'
import { updateUser } from '../app/reducers/user'
import LandingLayout from '../layouts/landing.layout'
import { Bottom, Center, CheckContainer, Container, FacebookBtn, FormFields, FormHeader, FormWrapper, FrameContainer, GoogleBtn, HelpSection, Input, InputContainer, OrContainer, RememberMe, SocialIcon, SocialLogin, SubmitButton, Wrapper } from '../styles/auth.style'




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const mutation = useMutation(userData => {
    return loginUser(userData);
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
  });
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    mutation.mutate({
        email,
        password,
    })
  }


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
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  const handleFailure = () => {
    dispatch(setLoading(false));
  }
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Login to your account</h2>
            <p>Welcome back! Please enter your details.</p>
          </FormHeader>
          <Center>
            <FormFields onSubmit={handleSubmit}>
              <InputContainer hasContent={email}>
                <label>Email</label>
                <Input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleEmailChange}
                required
                />
              </InputContainer>
              <InputContainer hasContent={password}>
                <label>Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  style={{ color: "#667085" }}
                  required
                />
              </InputContainer>
              <HelpSection>
                <RememberMe>
                </RememberMe>
                <Link href="/reset-password">
                  <a>Forgot Password</a>
                </Link>
              </HelpSection>
              <SubmitButton type="submit">Sign in</SubmitButton>
            </FormFields>
            <OrContainer>
              <p>OR</p>
            </OrContainer>
            <SocialLogin>
              <GoogleBtn onClick={googleLogin}>
                <SocialIcon>
                  <Image src="/google-r.svg" alt="" height={22} width={22} />
                </SocialIcon>
                <span>Sign in with Google</span>
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
                    <span>Sign in with Facebook</span>
                  </FacebookBtn>
                )}
              />
            </SocialLogin>
          </Center>
          <Bottom>
            <p>Don&apos;t have an account? <Link href="/register"><a>Sign up</a></Link></p>
          </Bottom>
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