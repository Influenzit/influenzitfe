import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createBusiness } from '../../../api/auth';
import { setError, setLoading } from '../../../app/reducers/status';
import LandingLayout from '../../../layouts/landing.layout';
import { Center, Container, FormFields, FormHeader, FormWrapper, ImagePreview, Input, InputContainer, SubmitButton, UploadContainer, Wrapper } from '../../../styles/auth.style'

const BusinessOwner = () => {
  const router = useRouter();
  const [formVal, setFormVal] = useState({
    businessName: "",
    rc: "",
    tin: "",
    email: "",
    tel: "",
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
    return createBusiness(businessData);
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", formVal.businessName);
    formdata.append("rc", formVal.rc);
    formdata.append("tin", formVal.tin);
    formdata.append("email", formVal.email);
    formdata.append("website", formVal.website);
    formdata.append("is_registered", 1);
    formdata.append("thumbnail", formVal.file);
    formdata.append("phone", formVal.tel);
    mutation.mutate(formdata);
  }
  if (mutation.isLoading) dispatch(setLoading(true));
  if (mutation.isSuccess) {
    const res = mutation.data.data;
    if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
      dispatch(setLoading(false));
      dispatch(setError({error: true, message: res.message}));
    } else {
      dispatch(setLoading(false));
      router.push("/dashboard/projects");
    }
  }

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
                required
                />
              </InputContainer>
              <InputContainer hasContent={formVal.tin}>
                <label>TIN Number</label>
                  <Input
                  type="text"
                  value={formVal.tin}
                  onChange={(e) => handleInputChange(e.target.value, "tin")}
                  required
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
                required
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
              <UploadContainer>
                <p>{formVal.file && formVal.file.name}</p>
                <label htmlFor='file-input-id'>Upload Thumbnail</label>
                <Input
                type="file"
                accept='image/*'
                id="file-input-id"
                onChange={(e) => handleInputChange(e.target.files[0], "file")}
                required
                hidden
                />
              </UploadContainer>
              {
                formVal.file && <ImagePreview>
                  <Image src={URL.createObjectURL(formVal.file)} height={120} width={300}/>
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