import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../api/auth'
import { setError, setLoading } from '../app/reducers/status'
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
  if (mutation.isLoading) dispatch(setLoading(true));
  if (mutation.isSuccess) {
    const res = mutation.data.data;
    if(res.errors || res.status === "error") {
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: res.message}));
    } else {
      dispatch(setLoading(false));
      dispatch(updateUser(res.user));
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      router.push("/dashboard/projects");
    }
  }
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Login to Influenzit</h2>
          </FormHeader>
          <Center>
            <FormFields onSubmit={handleSubmit}>
              <InputContainer hasContent={email}>
                <label>Email</label>
                <Input
                type="email"
                value={email}
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
                required
                />
              </InputContainer>
              <SubmitButton type="submit">Login</SubmitButton>
            </FormFields>
            <HelpSection>
              <RememberMe>
                <button onClick={() => setRemember(!remember)}>
                  <FrameContainer>
                    <Image src="/check-frame.svg" alt="" height={18} width={18} />
                  </FrameContainer>
                  {
                    remember && <CheckContainer>
                      <Image src="/check-b.svg" alt="" height={10} width={13} />
                    </CheckContainer>
                  }
                </button>
                <span>Remember Me</span>
              </RememberMe>
              <Link href="/reset-password">
                <a>Forgot Password</a>
              </Link>
            </HelpSection>
            <OrContainer>
              <p>OR</p>
            </OrContainer>
            <SocialLogin>
              <FacebookBtn>
                <SocialIcon>
                  <Image src="/facebook-r.svg" alt="" height={22} width={22} />
                </SocialIcon>
                <span>Continue With Facebook</span>
              </FacebookBtn>
              <GoogleBtn>
                <SocialIcon>
                  <Image src="/google-r.svg" alt="" height={22} width={22} />
                </SocialIcon>
                <span>Continue With Google</span>
              </GoogleBtn>
            </SocialLogin>
          </Center>
          <Bottom>
            <p>Don&apos;t have an account? <Link href="/register/account-type"><a>Register Here</a></Link></p>
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