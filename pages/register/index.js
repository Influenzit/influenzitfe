import Link from 'next/link'
import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { BannerReg, BanReg, Bottom, BottomP, Center, Container, FacebookBtn, FlexInput, FormFields, FormHeader, FormWrapper, GoogleBtn, Input, InputContainer, SocialIcon, SocialLogin, SubmitButton, Wrapper, AuthFlex, ErrorMessageCont } from '../../styles/auth.style'
import { createAccount, socialLogin } from '../../api/auth';
import { isLoading, setError, setLoading, setUserType } from '../../app/reducers/status';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { setBusinesses } from '../../app/reducers/business';
import { updateUser } from '../../app/reducers/user';
import { useGoogleLogin } from '@react-oauth/google';
import { Logo } from '../../components/nav/style';
import Image from 'next/image';
import { useEffect } from 'react';
import Loader from '../../components/loading'
import Head from 'next/head';

const Register = () => {
  const router = useRouter();
  const loadingStatus = useSelector(isLoading);
  const [formVal, setFormVal] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    account_type: "Business",
    business_name: "",
    referral_code: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const {referral_code} = router.query;
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
        const { is_influencer, is_creator, is_Register } = res.user.account;
        if (is_Register) {
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
    setIsError(false);
    if (formVal.password.length < 8) {
      setIsError(true);
      setErrorMessage("Password must be greater than 8");
      return
    } else if (formVal.password !== formVal.password_confirmation) {
      setIsError(true);
      setErrorMessage("Password must be equal");
      return
    } else {
      dispatch(setLoading(true));
      mutation.mutate({
          firstname: formVal.firstname,
          lastname: formVal.lastname,
          email: formVal.email,
          password: formVal.password,
          password_confirmation: formVal.password_confirmation,
          account_type: formVal.account_type,
          referral_code: formVal.referral_code
      })
    }
  }
  if (mutation.isLoading) dispatch(setLoading(true));
  useEffect(() => {
    if(referral_code) {
      handleInputChange(referral_code, "referral_code");
    }
  }, [referral_code])
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("user-id");
    console.log(token, id)
    if(token && id) {
      router.push("/dashboard")
    }
  }, [router.pathname])
  
  
  return (
    // <Container style={{ paddingTop: "0"}}>
    //   <Wrapper style={{ flexDirection: "row", justifyContent: "space-between", padding: "0" }}>
    //     <FormWrapper>
    //       <div style={{ margin: "20px 0 40px 0"}}>
    //         <Logo href="/">
    //             <Image src="/influenzit.svg" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
    //         </Logo>
    //       </div>
    //       <FormHeader style={{ alignItems: "flex-start" }}>
    //         <h2>Sign up</h2>
    //       </FormHeader>
    //       <Center>
    //         <FormFields onSubmit={handleSubmit}>
    //           <FlexInput>
    //             <InputContainer hasContent={formVal.firstname}>
    //               <label>First Name</label>
    //               <Input
    //               type="text"
    //               value={formVal.firstname}
    //               onChange={(e) => handleInputChange(e.target.value, "firstname")}
    //               placeholder="Enter your firstname"
    //               required
    //               />
    //             </InputContainer>
    //             <InputContainer hasContent={formVal.lastname}>
    //               <label>Last Name</label>
    //               <Input
    //               type="text"
    //               value={formVal.lastname}
    //               placeholder="Enter your lastname"
    //               onChange={(e) => handleInputChange(e.target.value, "lastname")}
    //               required
    //               />
    //             </InputContainer>
    //           </FlexInput>
    //           <InputContainer hasContent={formVal.email}>
    //             <label>Email</label>
    //             <Input
    //             type="email"
    //             value={formVal.email}
    //             placeholder="Enter your email"
    //             onChange={(e) => handleInputChange(e.target.value, "email")}
    //             required
    //             />
    //           </InputContainer>
    //           <InputContainer hasContent={formVal.password}>
    //             <label>Password</label>
    //             <Input
    //             type="password"
    //             value={formVal.password}
    //             placeholder="Enter your password"
    //             onChange={(e) => handleInputChange(e.target.value, "password")}
    //             required
    //             />
    //           </InputContainer>
    //           <InputContainer hasContent={formVal.password_confirmation}>
    //             <label>Confirm Password</label>
    //             <Input
    //             type="password"
    //             value={formVal.password_confirmation}
    //             placeholder="Confirm your password"
    //             onChange={(e) => handleInputChange(e.target.value, "password_confirmation")}
    //             required
    //             />
    //           </InputContainer>
    //           <SubmitButton type="submit">Register</SubmitButton>
    //           <SocialLogin>
    //             <GoogleBtn onClick={googleLogin}>
    //               <SocialIcon>
    //                 <Image src="/google-r.svg" alt="" height={22} width={22} />
    //               </SocialIcon>
    //               <span>Sign up with Google</span>
    //             </GoogleBtn>
    //             <FacebookLogin
    //               appId="3349779741932998"
    //               callback={handleFacebookLogin}
    //               onFailure={handleFailure}
    //               render={(renderProps) => (
    //                 <FacebookBtn  onClick={renderProps.onClick}>
    //                   <SocialIcon>
    //                     <Image src="/facebook-r.svg" alt="" height={22} width={22} />
    //                   </SocialIcon>
    //                   <span>Sign up with Facebook</span>
    //                 </FacebookBtn>
    //               )}
    //             />
    //           </SocialLogin>
    //         </FormFields>
    //       </Center>
    //       <Bottom>
    //         <p>Already have an account? <Link href="/login"><a>Login Here</a></Link></p>
    //       </Bottom>
    //     </FormWrapper>
    //     <BannerReg>

    //     </BannerReg>
    //   </Wrapper>
    // </Container>

    // Femi's Version

    <>
    <AuthFlex>
    <Head>
          <title>{"Influenzit Registration Page"}</title>
          <meta name="description" content="INFLUENZIT  discovering the top influencers for your product. Efficiently identifying and engaging with the most relevant key creators for your brand, then start driving revenue from their audiences." />
    </Head>
    <FormWrapper>
          <div style={{ margin: "20px 0 40px 0"}}>
            <Logo href="/">
                <Image src="/influenzit_logo.png" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            </Logo>
          </div>
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
              <FlexInput>
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
                <InputContainer>
                  <label>Category</label>
                  <select value={formVal.account_type} onChange={(e) => handleInputChange(e.target.value, "account_type")}>
                    <option value="Business">Business Owner</option>
                    <option value="Influencer">Influencer</option>
                    <option value="Creator">Creator</option>
                  </select>
                </InputContainer>
              </FlexInput>
              {
                formVal.account_type === "Business" && (
                  <InputContainer hasContent={formVal.email}>
                      <label>Business Name</label>
                      <Input
                      type="text"
                      value={formVal.business_name}
                      placeholder="Enter business name"
                      onChange={(e) => handleInputChange(e.target.value, "business_name")}
                      required
                      />
                  </InputContainer> 
                )
              }
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
              <InputContainer hasContent={formVal.email}>
                  <label>Referral Code (optional)</label>
                  <Input
                  type="text"
                  value={formVal.referral_code}
                  placeholder="Enter referral code"
                  onChange={(e) => handleInputChange(e.target.value, "referral_code")}
                  />
              </InputContainer> 
              {
                isError && <ErrorMessageCont>{errorMessage}</ErrorMessageCont>
              }
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
          <BottomP>
            <p>© 2023. Influenzit. All rights reserved.</p>
          </BottomP>
        </FormWrapper>
        <BanReg>

        </BanReg>
        <BannerReg>

        </BannerReg>
    </AuthFlex>
    {loadingStatus && <Loader />}
    </>
  )
}

export default Register;