import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCertifications, createFaqServices, createServices, createSkills, deleteCertification, deleteService, deleteSkill, getCertifications, getService, getServices, getSkills, updateCertifications, updateServices, updateSkills, uploadServiceMedia } from '../../../../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../../../../app/reducers/status'
import { getUser } from '../../../../../../app/reducers/user'
import ProfileSidebar from '../../../../../../components/profile-sidebar';
import LandingLayout from '../../../../../../layouts/landing.layout';
import { AddSocialBtn, Bottom, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FaqCont, FileContainer, FilePreview, FormContainer, Heading, ImgPreview, InputContainer, InputFlex, List, ListB, ListContainer, PreviewDetails, SmallHeader, UploadContainer, UploadHeader, UploadInfo, Wrapper } from '../../../../../../styles/profile.style';
import imageIcon from "../../../../../../assets/image.svg";


const Services = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const { id } = router.query;
    const currentAcctType = useSelector(getUserType);
    const [dataEnter, setDataEnter] = useState(false);

    // file list state
    const [fileList, setFileList] = useState([]);
    const [fileSelected, setFileSelected] = useState(null);

    // gets Services
    const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-service"], async () => {
        return await getService(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess() {
            dispatch(setLoading(false));
        },
        onError(res) {
            dispatch(setLoading(false));
            router.push("/dashboard/profile/services/create");
        } 
    });
    const uploadMutation = useMutation( mediaData => {
        return uploadServiceMedia(mediaData.id, mediaData.data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchServiceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
                router.push(`/dashboard/profile/services`)
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
        dispatch(setLoading(true));
        if(fileList.length < 1) {
            dispatch(setLoading(false));
            dispatch(setError({message: "Upload atleast a file", error: true}));
        } else{
            const formdata = new FormData();
            fileList.forEach((val, i) => {
                formdata.append(`service_media_${i + 1}`, val);
            })
            uploadMutation.mutate({
                id,
                data: formdata,
            });
        }
    }
    const handleAddFaq = () => {
        setFaqList((prev) => {
            const copyOfPrev = JSON.parse(JSON.stringify(prev));
            return [...copyOfPrev, { question: "", answer: "" }];
        })
    }
    const handleSetFiles = (file) => {
        if(file.size < 5000000){
            setFileList((old) => {
                let copyOld = [...old];
                if(file.type.includes("image/") && !(copyOld.includes(file))){
                    copyOld = [...copyOld, file];
                }
                return copyOld;
            })
        }
    }
    const handleFileChange = (e) => {
        [...e.target.files].forEach((val) => {
            handleSetFiles(val);
        })
    }
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 1) {
            [...e.dataTransfer.files].forEach(val => {
                handleSetFiles(val);
            })
        } else if(e.dataTransfer.files.length === 1) {
            handleSetFiles(e.dataTransfer.files[0]);
        }
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
        dispatch(setLoading(true));
        if(user) {
            if(currentAcctType === "Business Owner") {
                router.push("/dashboard/profile");
                dispatch(setLoading(false));
            }
            if(id) { 
                refetchServiceData();
            }
        }
        if(serviceData?.data) {
            dispatch(setLoading(false));
        }
    }, [user, router.pathname, currentAcctType, id]);

  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            {
                serviceData && serviceData.data && (
                    <Content>
                        <Heading>
                            <h2>Media &amp; Consent</h2>
                        </Heading>
                        <FormContainer>
                            <SmallHeader>Upload and attach files</SmallHeader>
                            <UploadContainer onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver}>
                                <UploadHeader >
                                    <label htmlFor="upload-input">Click to upload</label>
                                    <span> or drag and drop here.</span>
                                </UploadHeader>
                                <UploadInfo>
                                    Maximum file size 5MB
                                </UploadInfo>
                                <input type="file" value={fileSelected} hidden id="upload-input" onChange={handleFileChange} multiple/>
                            </UploadContainer>
                            <FileContainer>
                                {
                                    fileList.map((val, i) => {
                                        return (
                                            <FilePreview key={i}>
                                                <ImgPreview>
                                                    <Image src={URL.createObjectURL(val)} alt="" height={60} width={60} />
                                                </ImgPreview>
                                                <PreviewDetails>
                                                    <p>{val.name}</p>
                                                    <span>{(val.size / 1000000).toFixed(2)} MB</span>
                                                </PreviewDetails>
                                            </FilePreview>
                                        )
                                    })
                                }
                            </FileContainer>
                        </FormContainer>
                        <Bottom>
                            <button onClick={handleUpload}>Finish</button>
                        </Bottom>
                    </Content>
                )
            }
        </Wrapper>
    </Container>
  )
}
Services.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Services