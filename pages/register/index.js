import Link from 'next/link'
import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { BannerReg, BanReg, Bottom, BottomP, Center, Container, FacebookBtn, FlexInput, FormFields, FormHeader, FormWrapper, GoogleBtn, Input, InputContainer, SocialIcon, SocialLogin, SubmitButton, Wrapper, AuthFlex, ErrorMessageCont, Terms } from '../../styles/auth.style'
import { createAccount, socialLogin } from '../../api/auth';
import { isLoading, setError, isError as errorSelector, setLoading, setUserType, getMessage } from '../../app/reducers/status';
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
import ErrorPopup from 'components/error-popup/error-popup';
import PasswordStrengthBar from 'react-password-strength-bar';
import { colors } from 'styles/theme';
import { CancelIcon, CheckIcon } from '../../assets/svgIcons';

const Register = () => {
  const router = useRouter();
  const loadingStatus = useSelector(isLoading);
  const errorStatus = useSelector(errorSelector);
  const message = useSelector(getMessage);
  const [oneLC, setOneLC] = useState(false);
  const [oneUC, setOneUC] = useState(false);
  const [oneNum, setOneNum] = useState(false);
  const [oneSpecial, setOneSpecial] = useState(false);
  const [isMinLen, setIsMinLen] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [formVal, setFormVal] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    account_type: "Business",
    business_name: "",
    referral_code: "",
    display_name: "",
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
      if(res){
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
        return;
      }
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: "An error occured"}));
    }
  })
   
  const handlePasswordValidation = (type, value) => {
    if (type === "password") {
        if(!value) {
            setIsMinLen(false);
            setOneLC(false);
            setOneUC(false);
            setOneNum(false);
            setPasswordMatch(false);
            setOneSpecial(false);
            return;
        }
        const asciiList = value.split("").map(val => val.charCodeAt());
        if (value.length >= 8 && value.length <= 60) {
            setIsMinLen(true);
        } else {
            setIsMinLen(false);
        }
        // lowercase ascii 97 to 122
        asciiList.every((val, i) => {
            if (val >= 97 && val <= 122) {
                setOneLC(true);
                return false;
            } else {
                if (i === asciiList.length - 1) {
                    setOneLC(false)
                }
                return true;
            }
        })
        // uppercase ascii 65 to 90
        asciiList.every((val, i) => {
            if(val >= 65 && val <= 90) {
                setOneUC(true);
                return false;
            } else {
                if (i === asciiList.length - 1) {
                    setOneUC(false)
                }
                return true
            }
        })
        // number ascii 48 to 57
        asciiList.every((val, i) => {
            if(val >= 48 && val <= 57) {
                setOneNum(true);
                return false;
            } else {
                if (i === asciiList.length - 1) {
                    setOneNum(false)
                }
                return true;
            }
        })
        // special characters 33 to 47 | 58 to 64 | 91 to 96 | 123 to 126
        asciiList.every((val, i) => {
          if((val >= 33 && val <= 47) || (val >= 58 && val <= 64) || (val >= 91 && val <= 96) || (val >= 123 && val <= 126)){
              setOneSpecial(true);
              return false;
          } else {
              if (i === asciiList.length - 1) {
                  setOneSpecial(false)
              }
              return true;
          }
      })
        if (value === formVal.password_confirmation) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    } else {
        if(!value) {
            setPasswordMatch(false);
            return;
        }
        if (value === formVal.password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }
}
  const handleInputChange = (val, field) => {
    if((field === "password") || (field === "password_confirmation")) {
      handlePasswordValidation(field, val);
    }
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
    if (!(oneLC && oneNum && oneUC && isMinLen)) {
      setIsError(true);
      setErrorMessage("Enter a valid password");
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
          business_name: formVal.business_name,
          referral_code: formVal.referral_code,
          display_name: formVal.display_name
      })
    }
  }
  useEffect(() => {
    if(referral_code) {
      handleInputChange(referral_code, "referral_code");
    }
  }, [referral_code])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
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
    //               <label>First Name<span style={{ color:"red" }}>*</span></label>
    //               <Input
    //               type="text"
    //               value={formVal.firstname}
    //               onChange={(e) => handleInputChange(e.target.value, "firstname")}
    //               placeholder="Enter your firstname"
    //               required
    //               />
    //             </InputContainer>
    //             <InputContainer hasContent={formVal.lastname}>
    //               <label>Last Name<span style={{ color:"red" }}>*</span></label>
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
    //             <label>Email<span style={{ color:"red" }}>*</span></label>
    //             <Input
    //             type="email"
    //             value={formVal.email}
    //             placeholder="Enter your email"
    //             onChange={(e) => handleInputChange(e.target.value, "email")}
    //             required
    //             />
    //           </InputContainer>
    //           <InputContainer hasContent={formVal.password}>
    //             <label>Password<span style={{ color:"red" }}>*</span></label>
    //             <Input
    //             type="password"
    //             value={formVal.password}
    //             placeholder="Enter your password"
    //             onChange={(e) => handleInputChange(e.target.value, "password")}
    //             required
    //             />
    //           </InputContainer>
    //           <InputContainer hasContent={formVal.password_confirmation}>
    //             <label>Confirm Password<span style={{ color:"red" }}>*</span></label>
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
              <label>First Name<span style={{ color:"red" }}>*</span></label>
              <Input
              type="text"
              value={formVal.firstname}
              onChange={(e) => handleInputChange(e.target.value, "firstname")}
              placeholder="Enter your firstname"
              required
              />
            </InputContainer>
            <InputContainer hasContent={formVal.lastname}>
              <label>Last Name<span style={{ color:"red" }}>*</span></label>
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
              <label>Email<span style={{ color:"red" }}>*</span></label>
              <Input
              type="email"
              value={formVal.email}
              placeholder="Enter your email"
              onChange={(e) => handleInputChange(e.target.value, "email")}
              required
              />
            </InputContainer> 
            <InputContainer>
              <label>Category<span style={{ color:"red" }}>*</span></label>
              <select value={formVal.account_type} onChange={(e) => handleInputChange(e.target.value, "account_type")}>
                <option value="Business">Business Owner</option>
                <option value="Influencer">Influencer</option>
                <option value="Creator">Creator</option>
              </select>
            </InputContainer>
          </FlexInput>
          <InputContainer hasContent={formVal.display_name}>
              <label>Brand Name<span style={{ color:"red" }}>*</span></label>
              <Input
              type="text"
              value={formVal.display_name}
              placeholder="Enter your brand name"
              onChange={(e) => handleInputChange(e.target.value, "display_name")}
              required
              />
            </InputContainer>
          {
            formVal.account_type === "Business" && (
              <InputContainer hasContent={formVal.email}>
                  <label>Business Name<span style={{ color:"red" }}>*</span></label>
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
            <label>Password<span style={{ color:"red" }}>*</span></label>
            <Input
            type="password"
            value={formVal.password}
            placeholder="Enter your password"
            onChange={(e) => handleInputChange(e.target.value, "password")}
            required
            />
          </InputContainer>
          {
            formVal.password ? (
              <PasswordStrengthBar
              password={formVal.password}
              barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
              scoreWords={ ['', '', '', '', '']}
              shortScoreWord={<p></p>}
              minLength={8}
              />
            ): null
          }
          <InputContainer hasContent={formVal.password_confirmation}>
            <label>Confirm Password<span style={{ color:"red" }}>*</span></label>
            <Input
            type="password"
            value={formVal.password_confirmation}
            placeholder="Confirm your password"
            onChange={(e) => handleInputChange(e.target.value, "password_confirmation")}
            required
            />
          </InputContainer>
          {
            formVal.password ? (
            <div>
              <p className={`text-sm flex items-center gap-x-2 ${isMinLen ? `text-green-900` : "text-red-900"}`}><span className="inline-flex h-[24px] w-[24px] items-center justify-center">{isMinLen ? <CheckIcon /> : <CancelIcon />}</span> <span>Length between 8 and 60 characters</span></p>
              <p className={`text-sm flex items-center gap-x-2 ${oneLC ? `text-green-900` : "text-red-900"}`}><span className="inline-flex h-[24px] w-[24px] items-center justify-center">{oneLC ? <CheckIcon /> : <CancelIcon />} </span><span>At least one lowercase character</span></p>
              <p className={`text-sm flex items-center gap-x-2 ${oneUC ? `text-green-900` : "text-red-900"}`}><span className="inline-flex h-[24px] w-[24px] items-center justify-center">{oneUC ? <CheckIcon /> : <CancelIcon />}</span> <span>At least one uppercase character</span></p>
              <p className={`text-sm flex items-center gap-x-2 ${oneSpecial ? `text-green-900` : "text-red-900"}`}><span className="inline-flex h-[24px] w-[24px] items-center justify-center">{oneSpecial ? <CheckIcon /> : <CancelIcon />}</span> <span>At least one special character</span></p>
              <p className={`text-sm flex items-center gap-x-2 ${oneNum ? `text-green-900` : "text-red-900"}`}><span className="inline-flex h-[24px] w-[24px] items-center justify-center">{oneNum ? <CheckIcon /> : <CancelIcon />} </span><span>At least one number</span></p>
              <p className={`text-sm flex items-center gap-x-2 ${passwordMatch ? `text-green-900` : "text-red-900"}`}><span className="inline-flex h-[24px] w-[24px] items-center justify-center">{passwordMatch ? <CheckIcon /> : <CancelIcon />}</span> <span>Password must match</span></p>
            </div>) : null
          }
          <InputContainer hasContent={formVal.email}>
              <label>Referral Code</label>
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
          <Terms>
            <button onClick={(e) => {e.preventDefault(); setIsEnabled(!isEnabled);}}> {isEnabled && <span></span>}</button>
            <p>Agree to <Link href="/terms" passHref><a target='_blank'>Terms &amp; Conditions</a></Link> and <Link href="/privacy" passHref><a target='_blank'>Privacy Policy</a></Link></p>
          </Terms>
          {
            isEnabled ? (
              <SubmitButton type="submit">Register</SubmitButton>
            ) : (
              <SubmitButton onClick={(e) => e.preventDefault()} style={{ opacity: "0.7", cursor: "not-allowed" }}>Register</SubmitButton>
            )
          }
          <SocialLogin>
            <GoogleBtn onClick={!isEnabled ? ((e) => e.preventDefault()) : googleLogin} style={isEnabled ? {} : { opacity: "0.7", cursor: "not-allowed" }}>
              <SocialIcon>
                <Image src="/google-r.svg" alt="" height={22} width={22} />
              </SocialIcon>
              <span>Sign up with Google</span>
            </GoogleBtn>
            {/* <FacebookLogin
              appId="3349779741932998"
              callback={handleFacebookLogin}
              onFailure={handleFailure}
              render={(renderProps) => (
                <FacebookBtn style={isEnabled ? {} : { opacity: "0.7", cursor: "not-allowed" }} onClick={!isEnabled ? ((e) => e.preventDefault()) : renderProps.onClick}>
                  <SocialIcon>
                    <Image src="/facebook-r.svg" alt="" height={22} width={22} />
                  </SocialIcon>
                  <span>Sign up with Facebook</span>
                </FacebookBtn>
              )}
            /> */}
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
    {errorStatus && <ErrorPopup message={message} />}
    </>
  )
}

export default Register;