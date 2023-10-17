import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import LandingLayout from '../../layouts/landing.layout'
import { Capsule, CapsuleWrapper, ErrorMessageCont, Input, InputContainer, Terms } from '../../styles/auth.style';
import { Container, CoverImageContainer, CustomInput, HandleError, Header, ImagePreview, MStepContainer, ProfileForm, ProfileUploadCont, RangeSlider, Step, StepB, StepContainer, StepControl, StepWrapper, Thumb, ToggleBtn, ToggleCont, Track, UploadContainer, UploadHeader, UploadInfo } from '../../styles/complete.style'
import { InputWrap } from '../../styles/messages.style';
import "react-phone-input-2/lib/style.css";
import Image from 'next/image';
import { updateUser } from '../../app/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { accountMedia, getAccount, getUserAccount, updateAccount } from '../../api/auth';
import { useRouter } from 'next/router';
import { getUserType, setError, setLoading, updateVerifyStatus } from '../../app/reducers/status';
import { colors } from '../../styles/theme';
import { toast } from 'react-toastify';
import { getIndustries } from 'api/influencer';
import { Country } from 'country-state-city';
import Link from 'next/link';
import { createCampaignRequest, updateCampaignRequest, getUserStatus, getSingleCampaignRequest } from 'api/campaigns';
import { formatDate } from 'helpers/helper';
import { Editor } from '@tinymce/tinymce-react';
import { getBusinessesFromState } from '../../app/reducers/business';

const CreateRequest = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [coverImages, setCoverImages] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [imgMessage, setImgMessage] = useState("");
  const [lowFollow, setLowFollow] = useState(0);
  const [highFollow, setHighFollow] = useState(500000);
  const [lowEngagement, setLowEngagement] = useState(0);
  const [highEngagement, setHighEngagement] = useState(4);
  const [isEnabledO, setIsEnabledO] = useState(false);
  const [isEnabledT, setIsEnabledT ] = useState(false);
  const [countries] = useState(Country.getAllCountries());
  const currentAccountType = useSelector(getUserType);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadImage, setUploadImage] = useState(true);
  const [previewCoverImages, setPreviewCoverImages] = useState([]);
  const { id, preview } = router.query;
  const [deliverables, setDeliverables] = useState([""]);
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef(null);
  const businesses = useSelector(getBusinessesFromState);

  const createRequestMutation = useMutation((data) => {
    return createCampaignRequest(data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            setIsSaving(false);
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                setRequestId(res.data.id);
                setStep(5);
            }
        },
        onError(error) {
            const res = error.response.data;
            setIsSaving(false);
            if(res){
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
                return;
            }
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: "An error occured"}));
        }
    });
    const updateCRequestMutation = useMutation((data) => {
        return updateCampaignRequest(data, requestId);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                setIsSaving(false);
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    setStep(5);
                }
            },
            onError(error) {
                const res = error.response.data;
                setIsSaving(false);
                if(res){
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                    return;
                }
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: "An error occured"}));
            }
        });
    const updateRequestMutation = useMutation((data) => {
        return updateCampaignRequest(data, requestId);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                setIsSaving(false);
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                   getUserStatus().then((statusRes) => {
                    dispatch(updateVerifyStatus({
                        campaignCount: statusRes.data.data.campaignRequestCounts,
                        emailVerified: statusRes.data.data.email_is_verified,
                    }))
                    router.push("/dashboard/campaigns/requests");
                   }).catch(e => {
                        console.log(e);
                   }); 
                }
            },
            onError(error) {
                const res = error.response.data;
                setIsSaving(false);
                if(res){
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                    return;
                }
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: "An error occured"}));
            }
        });

    const { data: industryData, refetch: refetchIndustryData } = useQuery(["get-industries"], async () => {
        return await getIndustries();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            setIndustryList(res.data.data);
        }
    });
    const getRequirement = (requirements, name) => {
        return JSON.parse(requirements.filter((val) => val.name === name)[0]?.value ?? "[]");
    }
    const handleDeliverableChange = (i, val) => {
        setDeliverables((prev) => {
            const copyOfPrev = [...prev];
            copyOfPrev[i] = val;
            return copyOfPrev;
        })
    }
    const handleAddDeliverable = () => {
        setDeliverables((prev) => {
            const copyOfPrev = [...prev];
            copyOfPrev.push("");
            return copyOfPrev;
        })
    }
    const handleRemoveDeliverale = (i) => {
        setDeliverables((prev) => {
            const copyOfPrev = [...prev];
            copyOfPrev.splice(i, 1);
            return copyOfPrev;
        })
    }
    const { data: requestData, refetch: refetchRequestData } = useQuery(["get-request"], async () => {
        return await getSingleCampaignRequest(id);
      }, {
          enabled: false,
          staleTime: Infinity,
          retry: false,
          onSuccess(res) {
            const requestResponse = res.data.data;
            setTitle(requestResponse.title);
            setDescription(requestResponse.description);
            setIndustry(requestResponse.industry);
            setStartPrice(requestResponse.amount_start);
            setEndPrice(requestResponse.amount_end);
            setStartDate(requestResponse.start_date);
            setEndDate(requestResponse.end_date);
            setHighEngagement(getRequirement(requestResponse.requirements, "engagement_rate")[1]);
            setLowEngagement(getRequirement(requestResponse.requirements, "engagement_rate")[0]);
            setSelectedPlatform(getRequirement(requestResponse.requirements, "platforms"));
            setSelectedAge(getRequirement(requestResponse.requirements, "age"));
            setSelectedCountry(getRequirement(requestResponse.requirements, "country"));
            setHighFollow(getRequirement(requestResponse.requirements, "followers")[1]);
            setLowFollow(getRequirement(requestResponse.requirements, "followers")[0]);
            setPreviewCoverImages(requestResponse.media);
            setDeliverables(requestResponse.deliverables?.split("|") ?? []);
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
    const handlePublish = () => {
        if(isSaving) return;
        setIsSaving(true);
        if(!(isEnabledO && isEnabledT)) return;
        updateRequestMutation.mutate({
            accept_terms: 1
        })
    }
    const handleAddPlatform = (val) => {
        if(!val) return;
        setSelectedPlatform((prev) => {
            if(val === "All") {
                return ["Instagram", "Facebook", "Twitter", "TikTok", "Youtube"]
            }
            const copy = [...prev];
            if(copy.indexOf(val) === -1) {
                copy.push(val);
            }
            return copy;
        })
    }
    const handleRemovePlatform = (val) => {
        setSelectedPlatform((prev) => {
            let copy = [...prev];
            copy = copy.filter((curr) => curr !== val);
            return copy;
        })
    }
    const handleAddAge = (val) => {
        if(!val) return;
        setSelectedAge((prev) => {
            const copy = [...prev];
            if(copy.indexOf(val) === -1) {
                copy.push(val);
            }
            return copy;
        })
    }
    const handleRemoveAge = (val) => {
        setSelectedAge((prev) => {
            let copy = [...prev];
            copy = copy.filter((curr) => curr !== val);
            return copy;
        })
    }
    const handleAddCountry = (val) => {
        setSelectedCountry((prev) => {
            const copy = [...prev];
            if(copy.indexOf(val) === -1) {
                copy.push(val);
            }
            return copy;
        })
    }
    const handleRemoveCountry = (val) => {
        setSelectedCountry((prev) => {
            let copy = [...prev];
            copy = copy.filter((curr) => curr !== val);
            return copy;
        })
    }
    const handleCreateRequest = () => {
        if(isSaving) return;
        setIsSaving(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("currency", "NGN");
        formData.append("amount_start", Number(startPrice))
        formData.append("amount_end", endPrice);
        formData.append("start_date", formatDate(startDate));
        formData.append("end_date", formatDate(endDate));
        formData.append("accept_terms", 0);
        formData.append("status", "Pending");
        formData.append("industry", industry);
        formData.append("deliverables", deliverables.filter((val) => val !== "").join("|"));
        formData.append("business_id", Number(businesses[0].id));
        formData.append("requirements", JSON.stringify([
            {
                name: "platforms",
                value: selectedPlatform,
                valuetype: "list",
            },
            {
                name: "followers",
                value: [lowFollow, highFollow],
                valuetype: "range"
            },
            {
                name: "engagement_rate",
                value: [lowEngagement, highEngagement],
                valuetype: "range"
            },
            {
                name: "age",
                value: selectedAge,
                valuetype: "list"
            },
            {
                name: "country",
                value: selectedCountry,
                valuetype: "list"
            }
        ]))
        coverImages.forEach((val,i) => {
            formData.append("campaign_img_" +(i + 1), val.image); 
        })
        createRequestMutation.mutate(formData);
    }
    const handleUpdateRequest = () => {
        if(isSaving) return;
        setIsSaving(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("currency", "NGN");
        formData.append("amount_start", Number(startPrice))
        formData.append("amount_end", endPrice);
        formData.append("start_date", formatDate(startDate));
        formData.append("end_date", formatDate(endDate));
        formData.append("accept_terms", 0);
        formData.append("status", "Pending");
        formData.append("industry", industry);
        formData.append("deliverables", deliverables.filter((val) => val !== "").join("|"));
        formData.append("requirements", JSON.stringify([
            {
                name: "platforms",
                value: selectedPlatform,
                valuetype: "list",
            },
            {
                name: "followers",
                value: [lowFollow, highFollow],
                valuetype: "range"
            },
            {
                name: "engagement_rate",
                value: [lowEngagement, highEngagement],
                valuetype: "range"
            },
            {
                name: "age",
                value: selectedAge,
                valuetype: "list"
            },
            {
                name: "country",
                value: selectedCountry,
                valuetype: "list"
            }
        ]))
        if(uploadImage) {
            coverImages.forEach((val,i) => {
                formData.append("campaign_img_" +(i + 1), val.image); 
            })
        }
        updateCRequestMutation.mutate(formData);
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
    if(currentAccountType) {
        if (currentAccountType !== "Business Owner") {
            router.push("/dashboard");
        }
    }
  }, [currentAccountType])
  useEffect(() => {
    setShowEditor(true);
    refetchIndustryData();
    refetch();
  }, [])
  useEffect(() => {
    if(id && preview) {
        setRequestId(id);
        refetchRequestData();
        setUploadImage(false);
        setStep(5);
    } else if (id) {
        setRequestId(id);
        setUploadImage(false);
        refetchRequestData();
    }
  }, [id, preview, router.pathname])

  if (currentAccountType !== "Business Owner") return null;
  
  return (
    <Container>
        <ProfileForm style={{ maxWidth: "1000px" }}>
            <h2><span></span><button onClick={() => router.push("/dashboard/campaigns/requests")}><Image src="/cancel.svg" alt="" height={20} width={20} /></button></h2>
            <StepContainer style={{ marginBottom: "50px" }}>
                <StepWrapper isActive={step >= 1}>
                    <span>Description</span>
                    <StepB style={{ width: "100%" }} isActive={step >= 1}></StepB>
                </StepWrapper>
                <StepWrapper isActive={step >= 2}>
                    <span>Deliverables &amp; Pricing </span>
                    <StepB style={{ width: "100%" }} isActive={step >= 2}></StepB>
                </StepWrapper>
                <StepWrapper isActive={step >= 3}>
                    <span>Requirements</span>
                    <StepB style={{ width: "100%" }} isActive={step >= 3}></StepB>
                </StepWrapper>
                <StepWrapper isActive={step >= 4}>
                    <span>Gallery</span>
                    <StepB style={{ width: "100%" }} isActive={step >= 4}></StepB>
                </StepWrapper>
                <StepWrapper isActive={step === 5}>
                    <span>Publish</span>
                    <StepB style={{ width: "100%" }} isActive={step === 5}></StepB>
                </StepWrapper>
            </StepContainer>
            <MStepContainer style={{ marginBottom: "50px" }}>
                {(step >= 1) && <StepWrapper isActive={step >= 1}>
                    <span>Description</span>
                    <StepB style={{ width: "100%" }} isActive={step >= 1}></StepB>
                </StepWrapper>
                }
                {(step >= 2) && <StepWrapper isActive={step >= 2}>
                    <span>Deliverables &amp; Pricing </span>
                    <StepB style={{ width: "100%" }} isActive={step >= 2}></StepB>
                </StepWrapper>
                }
                {(step >= 3) && <StepWrapper isActive={step >= 3}>
                    <span>Requirements</span>
                    <StepB style={{ width: "100%" }} isActive={step >= 3}></StepB>
                </StepWrapper>
                }
               {(step >= 4) && <StepWrapper isActive={step >= 4}>
                    <span>Gallery</span>
                    <StepB style={{ width: "100%" }} isActive={step >= 4}></StepB>
                </StepWrapper>
                }
                {(step === 5) && <StepWrapper isActive={step === 5}>
                    <span>Publish</span>
                    <StepB style={{ width: "100%" }} isActive={step === 5}></StepB>
                </StepWrapper>
                }
            </MStepContainer>
            {
                step === 1 && (
                    <>
                        <h4>Campaign Title</h4>
                        <p>Give your campaign a title</p>
                        <InputContainer style={{ marginTop: "10px" }}>
                            <Input style={{ fontSize: "14px", borderColor: titleError ? colors.primaryColor : "#D0D5DD" }} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Campaign Title' />
                        </InputContainer>
                        <h4>Description</h4>
                        <p style={{ marginBottom: "15px" }}>Write a detailed description of what you need</p>
                        {showEditor && <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={description}
                            apiKey='uxnau7otzh0wddqctwllaa833wa4bmzw0cn6hu84u7mx5uiv'
                            init={{
                                selector: 'textarea#basic-example',
                                height: 500,
                                plugins: [
                                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family: "Figtree",sans-serif; font-size:14px, z-index: "999999999" }'
                            }}
                        />
                        }
                        {/* <InputContainer style={{ marginTop: "10px" }}>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ borderColor: bioError ? colors.primaryColor : "#D0D5DD" }}/>
                        </InputContainer> */}
                        <InputWrap style={{ marginTop: "15px" }}>
                            <div style={{ display: "flex", flexDirection: "column", minWidth: "calc(50% - 10px)" }}>
                                <h4>Category</h4>
                                <p>Select the category of your campaign</p>
                                <InputContainer style={{ marginTop: "20px" }}>   
                                    <select style={{ fontSize: "14px" }} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {
                                            industryList.map((val, i) => (
                                                <option key={i} value={val}>{val}</option>
                                            ))
                                        }
                                    </select>
                                </InputContainer>
                            </div>
                        </InputWrap>
                       
                        {/* <h4>Add Tags</h4>
                        <p>Add keywords that buyers will use when searching for your service. You can add up to 5 tags.</p>
                        <InputContainer style={{ marginTop: "10px" }}>
                            <Input style={{ fontSize: "14px", borderColor: headlineError ? colors.primaryColor : "#D0D5DD" }} value={headline} onChange={(e) => setHeadline(e.target.value)} type="text" placeholder='Start typing to select and view options.' />
                        </InputContainer> */}
                        <StepControl style={{ justifyContent: "right" }}>
                            <button id="right" onClick={() => {
                                setDescription(editorRef.current.getContent())
                                setStep(2)
                            }}><span>Continue</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                step === 2 && (
                    <>
                        <h3>Campaign Deliverables</h3>
                        {/* <h4>Description</h4>
                        <p>Write a detailed description of what you want delivered</p>
                        <InputContainer style={{ marginTop: "10px" }}>
                            <textarea value={biography} placeholder='E.g I need ...' onChange={(e) => setBiography(e.target.value)} style={{ borderColor: bioError ? colors.primaryColor : "#D0D5DD" }}/>
                            {
                                bioError && <span id='error'>Enter your introduction</span>
                            }
                        </InputContainer> */}
                        <h4>What are your deliverables</h4>
                        <p>Let us know your deliverables</p>
                        {
                            deliverables?.map((_, i) => (
                                <InputContainer style={{ marginTop: "10px", display: "flex", flexDirection: "row", columnGap: "15px" }} key={i}>
                                    <Input style={{ fontSize: "14px", borderColor: "#D0D5DD" }} value={deliverables[i]} onChange={(e) => handleDeliverableChange(i, e.target.value)} type="text" placeholder='Deliverable' />
                                    <button onClick={() => handleRemoveDeliverale(i)}><Image src="/delete.svg" alt="del" height={28} width={28} /></button>
                                </InputContainer>
                            ))
                        }
                        <StepControl style={{ margin: "10px 0" }}>
                            <button id="right" onClick={handleAddDeliverable}><span>Add Deliverable</span></button>
                        </StepControl>
                        <h4>When do you need the project?</h4>
                        <p>Let us know if your have deadlines</p>
                        <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                            <InputContainer style={{ marginTop: "20px" }}>
                                <Input style={{ fontSize: "14px" }} value={startDate} onChange={(e) => setStartDate(e.target.value) } type="date" placeholder='Date' />
                            </InputContainer>
                            <span>-</span>
                            <InputContainer style={{ marginTop: "20px" }}>
                                <Input style={{ fontSize: "14px" }} value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" placeholder='Date' />
                            </InputContainer>
                        </div>
                        <h4>What is your budget ?</h4>
                        <p>Let us know if your budget for this campaign</p>
                        <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                            <InputContainer style={{ marginTop: "20px" }}>
                                <Input style={{ fontSize: "14px" }} value={startPrice} onChange={(e) => !isNaN(e.target.value) && setStartPrice(e.target.value)} type="text" placeholder='₦ 10,000' />
                            </InputContainer>
                            <span>-</span>
                            <InputContainer style={{ marginTop: "20px" }}>
                                <Input style={{ fontSize: "14px" }} value={endPrice} onChange={(e) => !isNaN(e.target.value) && setEndPrice(e.target.value)} type="text" placeholder='₦ 10,000' />
                            </InputContainer>
                        </div>
                        <StepControl>
                            <button id="left" onClick={() => setStep(1)}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
                            <button id="right" onClick={() => setStep(3)}><span>Continue</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                step === 3 && (
                    <>
                        <h3>Influencer Requirements</h3>
                        <h4>Platform</h4>
                        <InputContainer style={{ marginTop: "20px" }}>
                            <select style={{ fontSize: "14px" }} onChange={(e) => handleAddPlatform(e.target.value)}>
                                <option value="">Select Platform</option>
                                <option value="All">All</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Twitter">Twitter</option>
                                <option value="TikTok">TikTok</option>
                                <option value="Youtube">Youtube</option>
                            </select>
                        </InputContainer>
                        <CapsuleWrapper>
                            {
                                selectedPlatform.map((val, i) => (
                                    <Capsule key={i}>
                                        {val}
                                        <button onClick={() => handleRemovePlatform(val)}><Image src="/delete.svg" alt="del" height={18} width={18} /></button>
                                    </Capsule>
                                ))  
                            }
                        </CapsuleWrapper>
                        <InputWrap>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <h4>Followers</h4>
                                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                                    <InputContainer style={{ marginTop: "20px" }}>
                                        <Input style={{ fontSize: "14px" }} value={lowFollow} onChange={(e) => !isNaN(Number(e.target.value)) && setLowFollow(Number(e.target.value))} type="text" placeholder='0' />
                                    </InputContainer>
                                    <span>-</span>
                                    <InputContainer style={{ marginTop: "20px" }}>
                                        <Input style={{ fontSize: "14px" }} value={highFollow} onChange={(e) => !isNaN(Number(e.target.value)) && setHighFollow(Number(e.target.value))} type="text" placeholder='10,000' />
                                    </InputContainer>
                                </div>
                                <div>
                                    <RangeSlider
                                     value={[lowFollow,highFollow]}
                                     max={1000000}
                                     step={1000}
                                     onChange={(val) => { 
                                        setLowFollow(val[0]);
                                        setHighFollow(val[1]);
                                     }}
                                     renderTrack={Track}
                                     renderThumb={Thumb}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", minWidth: "calc(50% - 10px)" }}>
                                <h4>Engagement rate</h4>
                                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                                    <InputContainer style={{ marginTop: "20px" }}>
                                        <Input style={{ fontSize: "14px" }} value={lowEngagement} onChange={(e) => !isNaN(Number(e.target.value)) && setLowEngagement(Number(e.target.value))} type="text" placeholder='0' />
                                    </InputContainer>
                                    <span>-</span>
                                    <InputContainer style={{ marginTop: "20px" }}>
                                        <Input style={{ fontSize: "14px" }} value={highEngagement} onChange={(e) => !isNaN(Number(e.target.value)) && setHighEngagement(Number(e.target.value))} type="text" placeholder='20' />
                                    </InputContainer>
                                </div>
                                <div>
                                    <RangeSlider
                                     value={[lowEngagement,highEngagement]}
                                     max={20}
                                     onChange={(val) => { 
                                        setLowEngagement(val[0]);
                                        setHighEngagement(val[1]);
                                     }}
                                     renderTrack={Track}
                                     renderThumb={Thumb}
                                    />
                                </div>
                            </div>
                        </InputWrap>
                        <InputWrap>
                            <div style={{ display: "flex", flexDirection: "column", minWidth: "calc(50% - 10px)" }}>
                                <h4>Age</h4>
                                <InputContainer style={{ marginTop: "20px" }}>
                                    <select style={{ fontSize: "14px" }} onChange={(e) => handleAddAge(e.target.value)}>
                                        <option value="">Select Age Range</option>
                                        <option value="10-20">10-20</option>
                                        <option value="20-30">20-30</option>
                                        <option value="30-40">30-40</option>
                                        <option value="40-50">40-50</option>
                                        <option value="50-60+">50-60+</option>
                                    </select>
                                </InputContainer>
                                <CapsuleWrapper>
                                    {
                                        selectedAge.map((val, i) => (
                                            <Capsule key={i}>
                                                {val}
                                                <button onClick={() => handleRemoveAge(val)}><Image src="/delete.svg" alt="del" height={18} width={18} /></button>
                                            </Capsule>
                                        ))  
                                    }
                                </CapsuleWrapper>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", minWidth: "calc(50% - 10px)" }}>
                                <h4>Countries</h4>
                                <InputContainer style={{ marginTop: "20px" }}>
                                    <select style={{ fontSize: "14px" }} onChange={(e) => handleAddCountry(e.target.value)}>
                                        {
                                            countries.map((country, i) => {
                                                return (<option value={country.name} key={i}>{country.name}</option>)
                                            })
                                        }
                                    </select>
                                </InputContainer>
                                <CapsuleWrapper>
                                    {
                                        selectedCountry.map((val, i) => (
                                            <Capsule key={i}>
                                                {val}
                                                <button onClick={() => handleRemoveCountry(val)}><Image src="/delete.svg" alt="del" height={18} width={18} /></button>
                                            </Capsule>
                                        ))  
                                    }
                                </CapsuleWrapper>
                            </div>
                        </InputWrap>
                        <StepControl>
                            <button id="left" onClick={() => setStep(2)}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
                            <button id="right" onClick={() => setStep(4)}><span>Continue</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                (step === 4) && uploadImage && (
                    <>
                        <h3>Gallery</h3>
                        <h4>Cover Images</h4>
                        {
                            imgError && <ErrorMessageCont>{imgMessage}</ErrorMessageCont>
                        }
                        <CoverImageContainer>
                            <p id="head">Add a stunning cover image to showcase your work</p>
                            <UploadContainer onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver} style={{ marginBottom: "20px" }}>
                                <Image src="/image-p.svg" alt="" height={45} width={45} />
                                <UploadHeader>
                                    <span>Drop your image or </span>
                                    <label htmlFor="upload-cover">Upload</label>
                                </UploadHeader>
                                <UploadInfo>JPG or PNG, no larger than 5MB</UploadInfo>
                                <input type="file" hidden id="upload-cover" accept='image/*' onChange={handleFileChangeDrop}/>
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
                            <button id="left" onClick={() => setStep(3)}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
                            <button id="right" onClick={() => requestId ? handleUpdateRequest() : handleCreateRequest()}><span>{isSaving ? "Saving..." : "Continue"}</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                (step === 4) && !uploadImage && (
                    <>
                        <h3>Gallery</h3>
                        <h4>Cover Images</h4>
                        {
                            imgError && <ErrorMessageCont>{imgMessage}</ErrorMessageCont>
                        }
                         <StepControl style={{ marginTop: "20px" }}>
                            <button id="left" onClick={() => setUploadImage(true)}><span>Replace Images</span></button>
                        </StepControl>
                        <CoverImageContainer>
                            <ImagePreview>
                                {
                                    previewCoverImages.map((val, i) => (
                                        <div key={i}>
                                            <Image src={val.url} alt="" layout='fill' objectFit='cover' objectPosition="center" />
                                        </div>
                                    ))
                                }
                            </ImagePreview>
                        </CoverImageContainer>
                        <StepControl>
                            <button id="left" onClick={() => setStep(3)}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
                            <button id="right" onClick={() => requestId ? handleUpdateRequest() : handleCreateRequest()}><span>{isSaving ? "Saving..." : "Continue"}</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
            {
                step === 5 && (
                    <>
                        <Header>
                            <h3>Review and Publish</h3>
                            <button onClick={() => router.push(`/dashboard/campaigns/request-preview/${requestId}`)}><Image src="/eye.svg" alt="" height={16} width={16} /><span>Preview campaign</span></button>
                        </Header>
                        <h4>Copyright Notice</h4>
                        <p>By submitting your project, you declare that you either own or have rights to the material posted and that posting these materials does not infringe on any third party&apos;s rights. You also acknowledge that you understand your project will be reviewed and evaluated by Influenzit to ensure it meets Influenzit&apos;s requirements.</p>
                        <h4 style={{ marginTop: "20px" }}>Terms of Service</h4>
                        <Terms style={{ marginTop: "15px" }}>
                            <button onClick={(e) => {e.preventDefault(); setIsEnabledO(!isEnabledO);}}> {isEnabledO && <span></span>}</button>
                            <p>I agree to the Influenzit <Link href="/terms" passHref><a target='_blank'>Terms &amp; Conditions</a></Link> and <Link href="/privacy" passHref><a target='_blank'>Privacy Policy</a></Link></p>
                        </Terms>
                        <Terms style={{ margin: "15px 0" }}>
                            <button onClick={(e) => {e.preventDefault(); setIsEnabledT(!isEnabledT);}}> {isEnabledT && <span></span>}</button>
                            <p>By submitting this project and activating it, I understand that it will appear in Influenzit search results visible to the general public and will show up in search engine results, even if my profile visibility is set to Private or Influenzit Users Only.</p>
                        </Terms>
                        <StepControl>
                            <button id="right" onClick={handlePublish}><span>Publish</span><Image src="/arrow-w.svg" alt="" height={12} width={12} /> </button>
                        </StepControl>
                    </>
                )
            }
        </ProfileForm>
    </Container>
  )
}
CreateRequest.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default CreateRequest