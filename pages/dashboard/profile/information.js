import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBusiness, getBusinesses, updateBusiness } from '../../../api/business'
import { getBusinessesFromState, setBusinesses } from '../../../app/reducers/business'
import { setError, setLoading, setSuccess } from '../../../app/reducers/status'
import { getUser } from '../../../app/reducers/user'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { AddSocialBtn, Bottom, Container, Content, FormContainer, Heading, InputContainer, InputFlex, Wrapper } from '../../../styles/profile.style'

const Information = () => {
    const business = useSelector(getBusinessesFromState)[0]
    const [formVal, setFormVal] = useState({
        businessName: "",
        rc: "",
        tin: "",
        email: "",
        phone: "",
        website: "",
        file: null,
      })
      const handleInputChange = (val, field) => {
        setFormVal((prevVal) => {
          return {...prevVal, [field]: val};
        })
      }
      const dispatch = useDispatch();
      const mutation = useMutation(businessData => {
        return updateBusiness(businessData, business.id);
      }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else {
                dispatch(setSuccess({success: true, message: "Update successful"}))
                getBusinesses().then((bizRes) => {
                    if(bizRes.data && res) {
                    dispatch(setLoading(false));
                    dispatch(setBusinesses(bizRes.data.data));
                    dispatch(setError({error: false, message: "Update successful"}));
                    }
                }).catch( _ => {
                    dispatch(setError({error: true, message: "An error occured"}));
                })
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
            dispatch(setError({error: true, message: "Check your internet connection"}));
        }
      })
      const handleSubmit = () => {
        if( business.name !== formVal.businessName ||
            business.rc !== formVal.rc ||
            business.tin !== formVal.tin ||
            business.email !== formVal.email ||
            business.website !== formVal.website ||
            business.phone !== formVal.phone
            ) {
                dispatch(setLoading(true));
                mutation.mutate({
                    name: formVal.businessName,
                    rc: formVal.rc,
                    tin: formVal.tin,
                    email: formVal.email,
                    website: formVal.website,
                    phone: formVal.phone,
                });
            }
       
      }
      useEffect(() => {
        if (business){
            setFormVal({
                businessName: business.name,
                rc: business.rc,
                tin: business.tin,
                email: business.email,
                phone: business.phone,
                website: business.website,
                file: null,
            })
        }
      }, [business])
      
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Business Information</h2>
                </Heading>
                <FormContainer>
                    <InputFlex>
                        <InputContainer>
                            <label>Business Name</label>
                            <input
                             type="text"
                             value={formVal.businessName}
                             onChange={(e) => handleInputChange(e.target.value, "businessName")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Business Email</label>
                            <input
                              type="email"
                              value={formVal.email}
                              onChange={(e) => handleInputChange(e.target.value, "email")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>TIN Number</label>
                            <input
                             type="text"
                             value={formVal.tin}
                             onChange={(e) => handleInputChange(e.target.value, "tin")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>RC Number</label>
                            <input
                             type="text"
                             value={formVal.rc}
                             onChange={(e) => handleInputChange(e.target.value, "rc")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Phone Number</label>
                            <input
                             type="text"
                             value={formVal.phone}
                             onChange={(e) => handleInputChange(e.target.value, "phone")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Business Website</label>
                            <input
                             type="text"
                             value={formVal.website}
                             onChange={(e) => handleInputChange(e.target.value, "website")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <InputContainer>
                        <label>About the business</label>
                        <textarea />
                    </InputContainer>
                </FormContainer>
                <Heading>
                    <h2>Social Media Profiles</h2>
                </Heading>
                <FormContainer>
                    <InputFlex>
                        <InputContainer>
                            <label>Facebook</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Instagram</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Linkedin</label>
                            <input type="text" />
                        </InputContainer>
                        <InputContainer>
                            <label>Twitter</label>
                            <input type="text" />
                        </InputContainer>
                    </InputFlex>
                </FormContainer>
                <AddSocialBtn><Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add another social media profile</span></AddSocialBtn>
                <Bottom>
                    <button onClick={handleSubmit}>Save Changes</button>
                </Bottom>
            </Content>
        </Wrapper>
    </Container>
  )
}
Information.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Information