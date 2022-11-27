import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccount, updateAccount } from '../../../api/auth'
import { getUserType, setError, setLoading, setSuccess } from '../../../app/reducers/status'
import { getUser, updateUser } from '../../../app/reducers/user'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { AddSocialBtn, AvailableSwitch, Bottom, Container, Content, FormContainerM, Heading, InputContainer, InputFlex, Wrapper } from '../../../styles/profile.style'

const Information = () => {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(false);
    const user = useSelector(getUser);
    const [formVal, setFormVal] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        address: "",
        biography: "",
        phones: [
            {
                phone: "",
                phone_country: ""
            }
        ],
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        tiktok: "",
        youtube: ""
      })
      const updateAccountMutation = useMutation((data) => {
            return updateAccount(user.id, data);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    getUserAccount(user.id).then((userRes) => {
                        if(userRes.data.data) {
                          dispatch(updateUser(userRes.data.data));
                          dispatch(setLoading(false));
                          dispatch(setSuccess({success: true, message: "Account updated successful"}));
                          localStorage.setItem("user", JSON.stringify(userRes.data.data));
                        }
                      }).catch(err => {
                        console.log(err);
                          dispatch(setLoading(false));
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
                dispatch(setError({error: true, message: "An error occured"}));
            }
        });
      const handleInputChange = (val, field) => {
        setFormVal((prevVal) => {
          return {...prevVal, [field]: val};
        })
      }
      const dispatch = useDispatch();
      const handleSubmit = () => {
        dispatch(setLoading(true));
        if(!formVal.firstname || !formVal.lastname) return;
        const copyOfForm = JSON.parse(JSON.stringify(formVal))
        Object.keys(copyOfForm).forEach(val => {
            if(!copyOfForm[val]){
                delete copyOfForm[val]
            }
            if((val === "phones") && copyOfForm["phones"]){
                copyOfForm.phones.forEach((val,i) => {
                    if(!val.phone){
                        !copyOfForm.phones.splice(i, 1)
;                    }
                })
            }
        })
        if(copyOfForm.phones.length === 0) {
            delete copyOfForm["phones"]
        }
        updateAccountMutation.mutate(copyOfForm)
      }
      const handleInputChangeP = (val, field, index) => {
        setFormVal((prevVal) => {
            const copyVal = JSON.parse(JSON.stringify(prevVal));
            copyVal.phones[index] = {...copyVal.phones[index], [field]: val}
            return copyVal;
        })
      }
      const handleAddPhone = () => {
        setFormVal((prevVal) => {
            const copyVal = JSON.parse(JSON.stringify(prevVal));
            copyVal.phones = [...copyVal.phones, { phone: "",phone_country: "" }]
            return copyVal;
        })
      }
      useEffect(() => {
        if (user) {
            setFormVal({
                firstname: user.firstname,
                lastname: user.lastname,
                gender: user.account.gender ?? "",
                address: user.account.address ?? "",
                biography: user.account.biography?? "",
                phones:[
                    {
                        phone: "",
                        phone_country: ""
                    }
                ],
                facebook: user.account.facebook ?? "",
                instagram: user.account.instagram ?? "",
                linkedin: user.account.linkedin ?? "",
                twitter: user.account.twitter ?? "",
                tiktok: user.account.tiktok ?? "",
                youtube: user.account.youtube ?? "",
            })
        }
      }, [user])
      
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Account</h2>
                    <AvailableSwitch isAvailable={isAvailable}>
                        <p>Unavailable</p>
                        <button onClick={() => setIsAvailable(!isAvailable)}>
                            <span></span>
                        </button>
                        <p>Available</p>
                    </AvailableSwitch>
                </Heading>
                <FormContainerM>
                    <InputFlex>
                        <InputContainer>
                            <label>Firstname</label>
                            <input
                             type="text"
                             value={formVal.firstname}
                             onChange={(e) => handleInputChange(e.target.value, "firstname")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Lastname</label>
                            <input
                              type="text"
                              value={formVal.lastname}
                              onChange={(e) => handleInputChange(e.target.value, "lastname")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Address</label>
                            <input
                             type="text"
                             value={formVal.address}
                             onChange={(e) => handleInputChange(e.target.value, "address")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Gender</label>
                            <select value={formVal.gender} onChange={(e) => handleInputChange(e.target.value, "gender")}>
                                <option value="">Select a gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="not-provided">Rather not say</option>
                            </select>
                        </InputContainer>
                    </InputFlex>
                    <InputContainer>
                        <label>Bio</label>
                        <textarea value={formVal.biography} onChange={(e) => handleInputChange(e.target.value, "biography")}/>
                    </InputContainer>
                        {
                            formVal.phones.map((val, i) => (

                                <InputFlex key={i}>
                                    <InputContainer>
                                        <label>Country Code {i + 1}</label>
                                        <CountryDropdown 
                                            labelType='full'
                                            valueType='short'
                                            value={val.phone_country}
                                            onChange={(val) => handleInputChangeP(val, "phone_country", i)}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <label>Phone {i + 1}</label>
                                        <input
                                        type="tel"
                                        value={val.phone}
                                        onChange={(e) => handleInputChangeP(e.target.value, "phone", i)}
                                        />
                                    </InputContainer>
                                </InputFlex>
                            ))
                        }
                        <AddSocialBtn onClick={handleAddPhone}><Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add phone</span></AddSocialBtn>
                </FormContainerM>
                <Heading>
                    <h2>Social Media Profiles</h2>
                </Heading>
                <FormContainerM>
                    <InputFlex>
                        <InputContainer>
                            <label>Facebook</label>
                            <input
                             type="text"
                             value={formVal.facebook}
                             onChange={(e) => handleInputChange(e.target.value, "facebook")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Instagram</label>
                            <input
                             type="text"
                             value={formVal.instagram}
                             onChange={(e) => handleInputChange(e.target.value, "instagram")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>Linkedin</label>
                            <input
                             type="text"
                             value={formVal.linkedin}
                             onChange={(e) => handleInputChange(e.target.value, "linkedin")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Twitter</label>
                            <input
                             type="text"
                             value={formVal.twitter}
                             onChange={(e) => handleInputChange(e.target.value, "twitter")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <InputFlex>
                        <InputContainer>
                            <label>TikTok</label>
                            <input
                             type="text"
                             value={formVal.tiktok}
                             onChange={(e) => handleInputChange(e.target.value, "tiktok")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Youtube</label>
                            <input
                             type="text"
                             value={formVal.youtube}
                             onChange={(e) => handleInputChange(e.target.value, "youtube")}
                            />
                        </InputContainer>
                    </InputFlex>
                </FormContainerM>
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