import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountTypeUpdate, getUserAccount } from '../../api/auth'
import { setError, setLoading } from '../../app/reducers/status'
import { getUser, updateUser } from '../../app/reducers/user'
import { hasAValidAccount } from '../../helpers/helper'
import LandingLayout from '../../layouts/landing.layout'
import { Container, FirstIcon, IconContainer, Option, OptionWrapper, SecondIcon, Wrapper } from '../../styles/choose-profile'

const ChooseProfile = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const mutation = useMutation(profileData => {
    return accountTypeUpdate(profileData);
  }, {
    onSuccess(successRes) {
      const res = successRes.data;
      if(res.errors || res.status === "error") {
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
      } else {
        getUserAccount(res.data.user_id).then((userRes) => {
          if(userRes.data.data) {
            dispatch(setLoading(false));
            dispatch(updateUser(userRes.data.data));
            localStorage.setItem("user", JSON.stringify(userRes.data.data));
            router.push("/dashboard");
          }
        }).catch(_ => {
          dispatch(setError({error: true, message: "An error occured"}));
        })
      }},
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
  }
  )
  const registerAs = (type) => {
    dispatch(setLoading(true));
    mutation.mutate({
      type
    })
  }
  return (
    <Container>
      <Wrapper>
        <h1>Choose an account type</h1>
        <OptionWrapper>
          <Option>
            <IconContainer>
              <FirstIcon>
                <Image src="/shop-g.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </FirstIcon>
              <SecondIcon>
                <Image src="/subtract.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </SecondIcon>
            </IconContainer>
            <h2>Business Owners</h2>
            <p>Business looking to work with influencers and creators</p>
            <Link href="/dashboard/create/business-owner">
              <a>Get Started</a>
            </Link>
          </Option>
          <Option>
            <IconContainer>
              <FirstIcon>
                <Image src="/speaker.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </FirstIcon>
              <SecondIcon>
                <Image src="/subtract.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </SecondIcon>
            </IconContainer>
            <h2>Influencers</h2>
            <p>Social media personalities with huge adience</p>
            <button onClick={() => registerAs("influencer")}>
              Get Started
            </button>
          </Option>
          <Option>
            <IconContainer>
              <FirstIcon>
                <Image src="/employer.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </FirstIcon>
              <SecondIcon>
                <Image src="/subtract.svg" alt="" layout="fill" objectFit="cover" objectPosition="center" />
              </SecondIcon>
            </IconContainer>
            <h2>Creators</h2>
            <p>Graphic designers, copywriters, video editors, web designers etc.</p>
            <button onClick={() => registerAs("creator")}>
              Get Started
            </button>
          </Option>
        </OptionWrapper>
      </Wrapper>
    </Container>
  )
}
ChooseProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default ChooseProfile