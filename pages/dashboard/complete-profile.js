import React, { useEffect } from 'react'
import { useState } from 'react';
import LandingLayout from '../../layouts/landing.layout'
import { ErrorMessageCont, Input, InputContainer } from '../../styles/auth.style';
import { Container, CoverImageContainer, CustomInput, HandleError, ImagePreview, ProfileForm, ProfileUploadCont, Step, StepContainer, StepControl, ToggleBtn, ToggleCont, UploadContainer, UploadHeader, UploadInfo } from '../../styles/complete.style'
import { InputWrap } from '../../styles/messages.style';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CountryDropdown } from 'react-country-region-selector';
import { TextAreaContainer } from '../../styles/contact.style';
import Image from 'next/image';
import { updateUser } from '../../app/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { accountMedia, getAccount, getUserAccount, updateAccount } from '../../api/auth';
import { useRouter } from 'next/router';
import { setError, setLoading } from '../../app/reducers/status';
import { colors } from '../../styles/theme';
import { toast } from 'react-toastify';
import { getIndustries } from 'api/influencer';

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [headline, setHeadline] = useState("");
  const [biography, setBiography] = useState("");
  const [industry, setIndustry] = useState("");
  const [headlineError, setHeadlineError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [handleError, setHandleError] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [coverImages, setCoverImages] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [imgMessage, setImgMessage] = useState("");

  // Update account mutation
const { data: industryData, refetch: refetchIndustryData } = useQuery(["get-industries"], async () => {
    return await getIndustries();
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(data) {
        setIndustryList(data.data.data);
    }
});
const { data, refetch } = useQuery(["get-account"], async () => {
    return await getAccount();
}, {
    staleTime: false,
    enabled: false,
    retry: false,
    onSuccess(res) {
        setUser(res.data.data);
    }
});
  const updateAccountMutation = useMutation((data) => {
        return updateAccount(user.id, data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                getUserAccount().then((userRes) => {
                    if(userRes.data.data) {
                    dispatch(updateUser(userRes.data.data));
                    dispatch(setLoading(false));
                    // toast.success("Account updated successfully", {
                    //         position: toast.POSITION.TOP_RIGHT
                    //     });
                    // }
                    if(step < 3) {
                        setStep(step + 1);
                    } else {
                        router.push("/dashboard?status=success");
                    }
                }
                }).catch(err => {
                    dispatch(setLoading(false));
                    toast.error("An error occured", {
                        position: toast.POSITION.TOP_RIGHT
                    });
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
    const uploadMutation = useMutation( mediaData => {
        return accountMedia(mediaData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                getUserAccount().then((userRes) => {
                    console.log(userRes);
                    if(userRes.data.data) {
                        dispatch(updateUser(userRes.data.data));
                        dispatch(setLoading(false));
                        toast.success("Image uploaded successfully", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        router.push("/dashboard?status=success");
                    }
                }).catch(err => {
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
    const handleUpload = () => {
        if(fileSelected) {
            dispatch(setLoading(true));
            const formdata = new FormData();
            formdata.append("profile_pic", fileSelected);
            coverImages.forEach((val,i) => {
                formdata.append("cover_img_" +(i + 1), val.image); 
            })
            uploadMutation.mutate(formdata);
        }
    }
  const handleNext = () => {
    if(step === 1) {
        setBioError(false);
        setPhoneError(false);
        setHeadlineError(false);
        if((phone.length < 10) || !gender || !country || !headline || !biography || !industry) {
            if(phone.length < 10) {
                setPhoneError(true);
            }
            if(!headline) {
                setHeadlineError(true);
            }
            if(!biography) {
                setBioError(true);
            }
        } else {
            dispatch(setLoading(true));
            updateAccountMutation.mutate({
                phone1: phone,
                gender,
                headline,
                biography,
                country,
                industry
            });
        }
    }
    if (step === 2) {
        setHeadlineError(false);
        if(facebook || twitter || instagram || youtube || tiktok) {
            dispatch(setLoading(true));
            let reqObj = {
                tiktok,
                facebook,
                instagram,
                twitter,
                youtube
            }
            if(!tiktok) {
                delete reqObj.tiktok
            }
            if(!facebook) {
                delete reqObj.facebook
            }
            if(!instagram) {
                delete reqObj.instagram
            }
            if(!twitter) {
                delete reqObj.twitter
            }
            if(!youtube) {
                delete reqObj.youtube
            }
            updateAccountMutation.mutate(reqObj);
        } else {
            setHandleError(true);
        }
    }
    if(step === 3) {
        handleUpload();
    }
  }
  const handlePrev = () => {
    setStep(step - 1);
  }
  const handleSetFiles = (file) => {
        if(file.size < 5000000){
            setFileSelected(file);
            setImgSrc(URL.createObjectURL(file));
            setImgError(false)
            setImgMessage("")
        } else {
            setImgError(true)
            setImgMessage("Image too large (Image must be less than 5MB)")
        }
    }
  const handleFileChange = (e) => {
     handleSetFiles(e.target.files[0]);
  }
  const handleDrop = (e) => {
        e.preventDefault();
        if(coverImages.length < 4) {
            const file = e.dataTransfer.files[0];
            if(file.size < 5000000) {
                setCoverImages((prev) => {
                    let newList = [...prev];
                    newList.push({
                        url: URL.createObjectURL(file),
                        image: file
                    })
                    return newList;
                })
                setImgError(false)
                setImgMessage("")
            }  else {
                setImgError(true)
                setImgMessage("Image too large (Image must be less than 5MB)")
            }
        }
    }
    const handleFileChangeDrop = (e) => {
        e.preventDefault();
        console.log(coverImages);
        if(coverImages.length < 4) {
            const file = e.target.files[0];
            if(file.size < 5000000) {
                setCoverImages((prev) => {
                    let newList = [...prev];
                    newList.push({
                        url: URL.createObjectURL(file),
                        image: file
                    })
                    return newList;
                })
                setImgError(false)
                setImgMessage("")
            } else {
                setImgError(true)
                setImgMessage("Image too large (Image must be less than 5MB)")
            }
        }
    }
    const handleImageRemove = (i) => {
        setCoverImages((prev) => {
            let newList = [...prev];
            newList.splice(i,1);
            return newList;
        })
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const handleDragLeave = (e) => {
        e.preventDefault();
    }
  useEffect(() => {
    if(user) {
        setPhone(user.phone1 ?? "");
        setGender(user.gender ?? "");
        setCountry(user.country ?? "");
        setHeadline(user.headline ?? "");
        setBiography(user.biography ?? "");
        setFacebook(user.facebook ?? "");
        setInstagram(user.instagram ?? "");
        setTwitter(user.twitter ?? "");
        setTiktok(user.tiktok ?? "");
        setYoutube(user.youtube ?? "");
        setIndustry(user.industry ?? "");
    }
  }, [user])
  useEffect(() => {
    refetchIndustryData();
    refetch();
  }, [])
  
  
  return (
    <Container>
        <ProfileForm>
            <h2>Complete your Profile <button onClick={() => router.push("/dashboard")}><Image src="/cancel.svg" alt="" height={20} width={20} /></button></h2>
            <StepContainer>
                <Step isActive={step >= 1}></Step>
                <Step isActive={step >= 2}></Step>
                <Step isActive={step === 3}></Step>
            </StepContainer>
             {
                step === 1 && (
                    <>
                        <h3>Influencer Information</h3>
                        <p>Update your profile</p>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <label>Industry</label>
                            <select style={{ fontSize: "14px" }} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                                {
                                    industryList.map((val, i) => (
                                        <option key={i} value={val}>{val}</option>
                                    ))
                                }
                            </select>
                        </InputContainer>
                        <InputWrap>
                            <InputContainer>
                                <label>Country</label>
                                <CountryDropdown 
                                    labelType='full'
                                    valueType='full'
                                    value={country}
                                    onChange={(val) => setCountry(val)}
                                    id="country"
                                />
                            </InputContainer>
                            <InputContainer>
                                <label>Phone Number</label>
                                <PhoneInput
                                    country={"ng"}
                                    value={phone}
                                    countryCodeEditable={false}
                                    onChange={(phone) => setPhone(phone)}
                                    containerStyle={{height: "45px", width: "100%", borderRadius: "8px", fontSize: "14px" }}
                                    inputStyle={{ height: "45px", width: "100%", color: "#101828", fontSize: "14px !important", borderColor: phoneError ? colors.primaryColor : "#D0D5DD" }}
                                    buttonStyle={{ background: "#fff",  fontSize: "14px", borderColor: phoneError ? colors.primaryColor : "#D0D5DD"}}
                                />
                                {
                                    phoneError && <span id='error'>Enter a valid phone number</span>
                                }
                            </InputContainer>
                        </InputWrap>
                        <InputContainer>
                            <label>Gender</label>
                            <ToggleCont>
                                <ToggleBtn isActive={gender === "female"} onClick={() => setGender("female")}>
                                    Female
                                    <span></span>
                                </ToggleBtn>
                                <ToggleBtn isActive={gender === "male"} onClick={() => setGender("male")}>
                                    Male
                                    <span></span>
                                </ToggleBtn>
                            </ToggleCont>
                        </InputContainer>
                        <h4>Profile Summary</h4>
                        <p>This is shown on your profile</p>
                        <InputContainer style={{ marginTop: "10px" }}>
                            <Input style={{ fontSize: "14px", borderColor: headlineError ? colors.primaryColor : "#D0D5DD" }} value={headline} onChange={(e) => setHeadline(e.target.value)} type="text" placeholder='e.g Lifestyle Creator and Food Enthusiast' />
                            {
                                headlineError && <span id='error'>Enter a profile summary</span>
                            }
                        </InputContainer>
                        <h4>Description</h4>
                        <p>Write a short introduction.</p>
                        <InputContainer style={{ marginTop: "10px" }}>
                            <textarea value={biography} onChange={(e) => setBiography(e.target.value)} style={{ borderColor: bioError ? colors.primaryColor : "#D0D5DD" }}/>
                            {
                                bioError && <span id='error'>Enter your introduction</span>
                            }
                        </InputContainer>
                        <StepControl style={{ justifyContent: "right" }}>
                            <button id="right" onClick={handleNext}><span>Continue</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                step === 2 && (
                    <>
                        <h3>Social Media Handles</h3>
                        <p>Add links to the social media profiles you have.</p>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <label>Instagram</label>
                            <CustomInput>
                                <div>
                                    @
                                </div>
                                <input value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
                            </CustomInput>
                        </InputContainer>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <label>Tiktok</label>
                            <CustomInput>
                                <div>
                                    @
                                </div>
                                <input value={tiktok} onChange={(e) => setTiktok(e.target.value)}/>
                            </CustomInput>
                        </InputContainer>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <label>Facebook</label>
                            <CustomInput>
                                <div>
                                    @
                                </div>
                                <input value={facebook} onChange={(e) => setFacebook(e.target.value)}/>
                            </CustomInput>
                        </InputContainer>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <label>Youtube</label>
                            <CustomInput>
                                <div>
                                    @
                                </div>
                                <input value={youtube} onChange={(e) => setYoutube(e.target.value)}/>
                            </CustomInput>
                        </InputContainer>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <label>Twitter</label>
                            <CustomInput>
                                <div>
                                    @
                                </div>
                                <input value={twitter} onChange={(e) => setTwitter(e.target.value)}/>
                            </CustomInput>
                        </InputContainer>
                        {handleError && <HandleError>Enter at least one social media profile</HandleError>}
                        <StepControl>
                            <button id="left" onClick={handlePrev}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
                            <button id="right" onClick={handleNext}><span>Continue</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                step === 3 && (
                    <>
                        <h3>Upload Images</h3>
                        <p>Update your profile information here</p>
                        {
                            imgError && <ErrorMessageCont>{imgMessage}</ErrorMessageCont>
                        }
                        <ProfileUploadCont>
                            <div>
                                <p>Add profile image</p>
                                <div>
                                    <Image src={imgSrc ? imgSrc : "/placeholder.png"} alt="" layout='fill' objectFit='cover' objectPosition="center" />
                                </div>
                            </div>
                            <input type="file" hidden id="upload-input" onChange={handleFileChange}/>
                            <label htmlFor='upload-input'>Upload Image</label>
                        </ProfileUploadCont>
                        <CoverImageContainer>
                            <p id="head">Add cover images</p>
                            <UploadContainer onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver} style={{ marginBottom: "20px" }}>
                                <Image src="/image-p.svg" alt="" height={45} width={45} />
                                <UploadHeader>
                                    <span>Drop your image or </span>
                                    <label htmlFor="upload-cover">Upload</label>
                                </UploadHeader>
                                <UploadInfo>JPG or PNG, no larger than 5MB</UploadInfo>
                                <input type="file" hidden id="upload-cover" onChange={handleFileChangeDrop}/>
                            </UploadContainer>
                            <ImagePreview>
                                {
                                    coverImages.map((val, i) => (
                                        <div key={i}>
                                            <button onClick={() => handleImageRemove(i)}>Remove</button>
                                            <Image src={val.url} alt="" layout='fill' objectFit='cover' objectPosition="center" />
                                        </div>
                                    ))
                                }
                            </ImagePreview>
                        </CoverImageContainer>
                        <StepControl>
                            <button id="left" onClick={handlePrev}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
                            <button id="right" onClick={handleNext}><span>Save</span></button>
                        </StepControl>
                    </>
                )
            }
        </ProfileForm>
    </Container>
  )
}
CompleteProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default CompleteProfile