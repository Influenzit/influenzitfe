import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCertifications, createServicePackage, createServices, createSkills, deleteCertification, deleteService, deleteSkill, getCertifications, getService, getServices, getSkills, updateCertifications, updateServices, updateSkills } from '../../../../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../../../../app/reducers/status'
import { getUser } from '../../../../../../app/reducers/user'
import { CancelIcon, DeleteIcon } from '../../../../../../assets/svgIcons'
import { AddFeatureBtn, FeatureCell, HeadingCell, InputCell, PackageColumn, PricingContainer, SubHeadingCell, TitleColumn } from '../../../../../../components/nav/style'
import ProfileSidebar from '../../../../../../components/profile-sidebar';
import LandingLayout from '../../../../../../layouts/landing.layout';
import { CheckContainer, FrameContainer } from '../../../../../../styles/auth.style'
import { Bottom, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, Wrapper } from '../../../../../../styles/profile.style'

const Services = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const { id } = router.query;
    const currentAcctType = useSelector(getUserType);
    const [basic, setBasic] = useState({
        name: "Basic",
        description: "",
        amount: "",
        currency: "",
        features: [{name: ""}],
    });
    const [premium, setPremium] = useState({
        name: "Premium",
        description: "",
        amount: "",
        currency: "",
        features: [{name: ""}],
    });
    const [standard, setStandard] = useState({
        name: "Standard",
        description: "",
        amount: "",
        currency: "",
        features: [{name: ""}],
    });
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

    const createPackagesMutation = useMutation( packageData => {
        return createServicePackage(packageData.id, packageData.data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchServiceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
                router.push(`/dashboard/profile/services/faq/create/${id}`)
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
    const handleCreatePackage = () => {
        dispatch(setLoading(true));
        const req = [basic, standard, premium];
        const filteredData = req.filter(val => val.description && val.amount && val.features.length)
        if(filteredData.length < 1) {
            dispatch(setLoading(false));
            dispatch(setError({message: "Enter atleast a complete package", error: true}));
        } else{
            createPackagesMutation.mutate({
                id,
                data: filteredData,
            });
        }
    }
    const handleInputChange = (val, field, type) => {
        if(field === "amount") {
            if (Number(val) || val === "") {
                switch (type) {
                    case "basic":
                        setBasic((oldVal) => {
                            return {...oldVal, [field]: val};
                        })
                        break;
                    case "standard":
                        setStandard((oldVal) => {
                            return {...oldVal, [field]: val};
                        })
                        break;
                    case "premium":
                        setPremium((oldVal) => {
                            return {...oldVal, [field]: val};
                        })
                        break;
                }
            }
        } else {
            switch (type) {
                case "basic":
                    setBasic((oldVal) => {
                        return {...oldVal, [field]: val};
                    })
                    break;
                case "standard":
                    setStandard((oldVal) => {
                        return {...oldVal, [field]: val};
                    })
                    break;
                case "premium":
                    setPremium((oldVal) => {
                        return {...oldVal, [field]: val};
                    })
                    break;
            }
        }
    }
    const handleAddFeatureB = () => {
        setBasic((old) => {
            const copyOld = JSON.parse(JSON.stringify(old));
            copyOld.features.push({name: ""});
            return copyOld;
        })
    }
    const handleAddFeatureP = () => {
        setPremium((old) => {
            const copyOld = JSON.parse(JSON.stringify(old));
            copyOld.features.push({name: ""});
            return copyOld;
        })
    }
    const handleAddFeatureS = () => {
        setStandard((old) => {
            const copyOld = JSON.parse(JSON.stringify(old));
            copyOld.features.push({name: ""});
            return copyOld;
        })
    }
    useEffect(() => {
        dispatch(setLoading(true));
        if(user) {
            if(currentAcctType === "Business Owner") {
                dispatch(setLoading(false));
                router.push("/dashboard/profile");
            }
            if(id) { 
                refetchServiceData();
            }
        }
    }, [user, router.pathname, currentAcctType, id]);
    useEffect(() => {
        if(serviceData?.data && !basic.currency) {
            console.log(serviceData.data.data.currency)
            setBasic({ 
                name: "Basic",
                description: "",
                amount: "",
                currency: serviceData?.data.data.currency,
                features: [{name: ""}],
            });
            setStandard({ 
                name: "Standard",
                description: "",
                amount: "",
                currency: serviceData?.data.data.currency,
                features: [{name: ""}],
            });
            setPremium({ 
                name: "Premium",
                description: "",
                amount: "",
                currency: serviceData?.data.data.currency,
                features: [{name: ""}],
            });
        }
    }, [serviceData])
    
    const handleFeatureInput = (val, type, index) => {
       
        switch (type) {
            case "basic":
                setBasic((oldVal) => {
                    const copyOld = JSON.parse(JSON.stringify(oldVal));
                    copyOld.features[index].name = val;
                    return copyOld;
                })
                break;
            case "standard":
                setStandard((oldVal) => {
                    const copyOld = JSON.parse(JSON.stringify(oldVal));
                    copyOld.features[index].name = val;
                    return copyOld;
                })
                break;
            case "premium":
                setPremium((oldVal) => {
                    const copyOld = JSON.parse(JSON.stringify(oldVal));
                    copyOld.features[index].name = val;
                    return copyOld;
                })
                break;
        }
    }
    const handleFeatureDel = (type, index) => {
       
        switch (type) {
            case "basic":
                setBasic((oldVal) => {
                    const copyOld = JSON.parse(JSON.stringify(oldVal));
                    if (copyOld.features.length > 1) {
                        copyOld.features.splice(index, 1);
                    }
                    return copyOld;
                })
                break;
            case "standard":
                setStandard((oldVal) => {
                    const copyOld = JSON.parse(JSON.stringify(oldVal));
                    if (copyOld.features.length > 1) {
                        copyOld.features.splice(index, 1);
                    }
                    return copyOld;
                })
                break;
            case "premium":
                setPremium((oldVal) => {
                    const copyOld = JSON.parse(JSON.stringify(oldVal));
                    if (copyOld.features.length > 1) {
                        copyOld.features.splice(index, 1);
                    }
                    return copyOld;
                })
                break;
        }
    }

  return (
    <Container>
        <Wrapper>
            <Content>
                <Heading>
                    <h2>Service Pricing</h2>
                </Heading>
                <FormContainer>
                    <PricingContainer>
                        <TitleColumn>
                            <HeadingCell></HeadingCell>
                            <HeadingCell id="heading-cell"><span>Description</span></HeadingCell>
                            <HeadingCell><span>Price ({serviceData?.data.data.currency})</span></HeadingCell>
                        </TitleColumn>
                        <PackageColumn>
                            <HeadingCell><span>Basic</span></HeadingCell>
                            <InputCell>
                                <textarea placeholder='Description' value={basic.description} onChange={(e) => handleInputChange(e.target.value, "description", "basic")}></textarea> 
                            </InputCell>
                            <InputCell>
                                <input type="text" placeholder='Price' value={basic.amount} onChange={(e) => handleInputChange(e.target.value, "amount", "basic")}/>
                            </InputCell>
                            <SubHeadingCell>
                                <span>Features</span>
                            </SubHeadingCell>
                            {
                                basic.features.map((val, i) => (
                                    <FeatureCell key={i}>
                                        <input type="text" placeholder='Feature' value={val.name} onChange={(e) => handleFeatureInput(e.target.value, "basic", i)}/>
                                        <button onClick={() => handleFeatureDel("basic", i)}><Image src="/delete.svg" alt="plus" height={22} width={22} /></button>
                                    </FeatureCell>
                                ))
                            }
                            <AddFeatureBtn onClick={handleAddFeatureB}>
                                <Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add feature</span>
                            </AddFeatureBtn>
                        </PackageColumn>
                        <PackageColumn>
                            <HeadingCell><span>Standard</span></HeadingCell>
                            <InputCell>
                                <textarea placeholder='Description' value={standard.description} onChange={(e) => handleInputChange(e.target.value, "description", "standard")}></textarea> 
                            </InputCell>
                            <InputCell>
                                <input type="text" placeholder='Price' value={standard.amount} onChange={(e) => handleInputChange(e.target.value, "amount", "standard")}/>
                            </InputCell>
                            <SubHeadingCell>
                                <span>Features</span>
                            </SubHeadingCell>
                            {
                                standard.features.map((val, i) => (
                                    <FeatureCell key={i}>
                                        <input type="text" value={val.name} onChange={(e) => handleFeatureInput(e.target.value, "standard", i)} placeholder='Feature'/>
                                        <button onClick={() => handleFeatureDel("standard", i)}><Image src="/delete.svg" alt="plus" height={22} width={22} /></button>
                                    </FeatureCell>
                                ))
                            }
                            <AddFeatureBtn onClick={handleAddFeatureS}>
                                <Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add feature</span>
                            </AddFeatureBtn>
                        </PackageColumn>
                        <PackageColumn>
                            <HeadingCell><span>Premium</span></HeadingCell>
                            <InputCell>
                                <textarea placeholder='Description' value={premium.description} onChange={(e) => handleInputChange(e.target.value, "description", "premium")}></textarea> 
                            </InputCell>
                            <InputCell>
                                <input type="text" placeholder='Price' value={premium.amount} onChange={(e) => handleInputChange(e.target.value, "amount", "premium")}/>
                            </InputCell>
                            <SubHeadingCell>
                                <span>Features</span>
                            </SubHeadingCell>
                            {
                                premium.features.map((val, i) => (
                                    <FeatureCell key={i}>
                                        <input type="text" value={val.name} onChange={(e) => handleFeatureInput(e.target.value, "premium", i)} placeholder='Feature'/>
                                        <button onClick={() => handleFeatureDel("premium", i)}><Image src="/delete.svg" alt="plus" height={22} width={22} /></button>
                                    </FeatureCell>
                                ))
                            }
                            <AddFeatureBtn onClick={handleAddFeatureP}>
                                <Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add feature</span>
                            </AddFeatureBtn>
                        </PackageColumn>
                    </PricingContainer>
                </FormContainer>
                <Bottom>
                    <button onClick={handleCreatePackage}>Proceed to Faq</button>
                </Bottom>
            </Content>
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