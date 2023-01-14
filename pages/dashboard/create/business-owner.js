import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../../api/auth';
import { createBusiness, getBusinesses } from '../../../api/business';
import { setBusinesses } from '../../../app/reducers/business';
import { setError, setLoading, setUserType } from '../../../app/reducers/status';
import { getUser, updateUser } from '../../../app/reducers/user';
import LandingLayout from '../../../layouts/landing.layout';
import { Center, Container, FormFields, FormHeader, FormWrapper, ImagePreview, Input, InputContainer, SubmitButton, Wrapper } from '../../../styles/auth.style'
import { UploadContainer, UploadHeader, UploadInfo } from '../../../styles/profile.style';

const BusinessOwner = () => {
  const user = useSelector(getUser);
  const router = useRouter();
  const [fileSelected, setFileSelected] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [dataEnter, setDataEnter] = useState(false);
  const [formVal, setFormVal] = useState({
    businessName: "",
    rc: "",
    tin: "",
    email: "",
    tel: "",
    website: "",
  })
  const handleInputChange = (val, field) => {
    setFormVal((prevVal) => {
      return {...prevVal, [field]: val};
    })
  }
  const dispatch = useDispatch();
  const mutation = useMutation(businessData => {
    return createBusiness(businessData);
  }, {
    onSuccess(successRes) {
      const res = successRes.data;
      if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
        dispatch(setLoading(false));
        dispatch(setError({error: true, message: res.message}));
      } else {
        getUserAccount(res.data.user_id).then((userRes) => {
          if(userRes.data.data) {
            dispatch(updateUser(userRes.data.data));
            dispatch(setUserType("Business Owner"));
          }
        }).then(() => {
          getBusinesses().then((bizRes) => {
            if(bizRes.data && res) {
              dispatch(setLoading(false));
              dispatch(setBusinesses(bizRes.data.data));
              dispatch(setError({error: false, message: ""}));
              router.push("/dashboard");
            }
          }).catch(err => {
            dispatch(setError({error: true, message: "An error occured"}));
          })
        }).catch(err => {
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
  })
  const handleSubmit = (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", formVal.businessName);
    formdata.append("rc", formVal.rc);
    formdata.append("tin", formVal.tin);
    formdata.append("email", formVal.email);
    formdata.append("website", formVal.website);
    formdata.append("is_registered", 1);
    formdata.append("thumbnail", fileSelected);
    formdata.append("phone", formVal.tel);
    mutation.mutate(formdata);
  }
  const handleSetFiles = (file) => {
      if(file.size < 5000000){
          setFileSelected(file);
          setImgSrc(URL.createObjectURL(file));
      }
  }
  const handleFileChange = (e) => {
      handleSetFiles(e.target.files[0]);
  }
  const handleDrop = (e) => {
      e.preventDefault();
      handleSetFiles(e.dataTransfer.files[0]);
  }
  const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDataEnter(true);
  }
  const handleDragLeave = (e) => {
      e.preventDefault();
      setDataEnter(false);
  }
 
  useEffect(() => {
    if (user && user.account.is_businessowner) {
      router.push("/dashboard");
      return;
    }
  }, [user])
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Create Business</h2>
          </FormHeader>
          <Center>
            <FormFields onSubmit={handleSubmit}>
              <InputContainer hasContent={formVal.businessName}>
                <label>Business Name</label>
                <Input
                type="text"
                value={formVal.businessName}
                onChange={(e) => handleInputChange(e.target.value, "businessName")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.rc}>
                <label>RC Number</label>
                <Input
                type="text"
                value={formVal.rc}
                onChange={(e) => handleInputChange(e.target.value, "rc")}
                />
              </InputContainer>
              <InputContainer hasContent={formVal.tin}>
                <label>TIN Number</label>
                  <Input
                  type="text"
                  value={formVal.tin}
                  onChange={(e) => handleInputChange(e.target.value, "tin")}
                  />
              </InputContainer>
              <InputContainer hasContent={formVal.email}>
                <label>Business Email</label>
                <Input
                type="email"
                value={formVal.email}
                onChange={(e) => handleInputChange(e.target.value, "email")}
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.website}>
                <label>Business Website</label>
                <Input
                type="text"
                value={formVal.website}
                onChange={(e) => handleInputChange(e.target.value, "website")}
                />
              </InputContainer>
              <InputContainer hasContent={formVal.tel}>
                <label>Phone Number</label>
                <Input
                type="tel"
                value={formVal.tel}
                onChange={(e) => handleInputChange(e.target.value, "tel")}
                required
                />
              </InputContainer>
              <UploadContainer onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver} style={{ marginBottom: "20px" }}>
                  <UploadHeader >
                      <label htmlFor="upload-input">Click to upload</label>
                      <span> or drag and drop here.</span>
                  </UploadHeader>
                  <UploadInfo>
                      Maximum file size 5MB
                  </UploadInfo>
                  <input type="file" hidden id="upload-input" accept="image/*" onChange={handleFileChange}/>
              </UploadContainer>
              {
                fileSelected && <ImagePreview>
                  <Image src={imgSrc} height={120} width={300}/>
                </ImagePreview>
              }
              <SubmitButton type="submit">Create</SubmitButton>
            </FormFields>
          </Center>
        </FormWrapper>
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