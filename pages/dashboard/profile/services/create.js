import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCertifications, createServices, createSkills, deleteCertification, deleteService, deleteSkill, getCertifications, getServices, getSkills, updateCertifications, updateServices, updateSkills } from '../../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../../app/reducers/status'
import { getUser } from '../../../../app/reducers/user'
import { CancelIcon, DeleteIcon } from '../../../../assets/svgIcons'
import ProfileSidebar from '../../../../components/profile-sidebar';
import LandingLayout from '../../../../layouts/landing.layout';
import { CheckContainer, FrameContainer } from '../../../../styles/auth.style'
import { Bottom, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, Wrapper } from '../../../../styles/profile.style'

const Services = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const currentAcctType = useSelector(getUserType);

    // Service list state
    const [serviceList, setServiceList] = useState([]);

    // new Service state
    const [newService, setNewService] = useState({
        name: "",
        description: "",
        isNegotiable: false,
        link: ""
    })

    // gets Services
    const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-services"], async () => {
        return await getServices();
    }, {
        enabled: false,
        staleTime: Infinity
    });

    // updates Service list
    useEffect(() => {
        if(serviceData) {
            console.log(serviceData.data.data)
            setServiceList(serviceData.data.data);
        }
    }, [serviceData]);
    
    const createServiceMutation = useMutation( serviceData => {
        return createServices(serviceData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchServiceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                setNewService({
                    name: "",
                    description: "",
                    is_negotiable: false,
                    link: ""
                })
                dispatch(setLoading(false));
                router.push(`/dashboard/profile/services/pricing/create/${successRes.data.data.id}`)
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
    const deleteServiceMutation = useMutation( serviceId => {
        return deleteService(serviceId);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchServiceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Service deleted successfully"}));
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
    });
    const updateServiceMutation = useMutation((service) => {
        return updateServices(service.data, service.id);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchServiceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                setNewService({
                    name: "",
                    description: "",
                    is_negotiable: false,
                    link: ""
                })
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Service updated successful"}));
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

    // handles create Service
    const handleCreateService = () => {
        if(newService.name && newService.description && newService.link) {
            dispatch(setLoading(true));
            createServiceMutation.mutate({
                name: newService.name,
                description: newService.description,
                is_negotiable: newService.isNegotiable,
                link: newService.link,
                type: currentAcctType === "Creator" ? "project" : "campaign"
            });
        } else {
            dispatch(setError({message: "Enter required fields", error: true}));
        }
    }
    // handles delete Service
    const handleDeleteService = (serviceId) => {
        dispatch(setLoading(true));
        deleteServiceMutation.mutate(serviceId);
    }

    // handles update Service
    const handleUpdateService = (index) => {
        if(serviceList[index].name && serviceList[index].description && serviceList[index].price && serviceList[index].link) {
            dispatch(setLoading(true));
            const formattedData = {...serviceList[index], price: Number(serviceList[index].price)}
            updateServiceMutation.mutate({ data: formattedData, id: serviceList[index].id } );
        } else {
            dispatch(setError({message: "Enter required fields", error: true}));
        }
    } 

    // handles Service input change
    const handleServiceChange = (val, field) => {
        setServiceList((prevList) => {
            const copyOfList = JSON.parse(JSON.stringify(prevList));
            if((field === "price" && Number(val)) || (field === "price" && val === "") || (field !== "price")) {
                copyOfList[index][field] = val;
            }
            return copyOfList;
        })
    }

    // handles new Service change
    const handleNewServiceChange = (val, field) => {
        setNewService((prevVal) => {
            if((field === "price" && Number(val)) || (field === "price" && val === "") || (field !== "price")) {
                return {...prevVal, [field]: val};
            } else {
                return prevVal;
            }
        })
    }
       
    useEffect(() => {
    if(user) {
        if(currentAcctType === "Business Owner") {
            router.push("/dashboard/profile/information");
        }
        refetchServiceData();
    }
    }, [user, router.pathname, currentAcctType]);

  return (
    <Container>
        <Wrapper>
            <Content>
                <Heading>
                    <h2>Add new service</h2>
                </Heading>
                
                <FormContainer>
                    <InputContainer>
                        <label>Name this service</label>
                        <input
                        type="text"
                        value={newService.name}
                        onChange={(e) => handleNewServiceChange(e.target.value, "name")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Description</label>
                        <textarea
                        value={newService.description}
                        onChange={(e) => handleNewServiceChange(e.target.value, "description")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Link</label>
                        <input
                        type="text"
                        value={newService.link}
                        onChange={(e) => handleNewServiceChange(e.target.value, "link")}
                        />
                    </InputContainer>
                    <CurrentToggle>
                        <button onClick={() => handleNewServiceChange(!newService.isNegotiable, "isNegotiable")}>
                        <FrameContainer>
                            <Image src="/check-frame.svg" alt="" height={18} width={18} />
                        </FrameContainer>
                        {
                            newService.isNegotiable && <CheckContainer>
                            <Image src="/check-b.svg" alt="" height={10} width={13} />
                            </CheckContainer>
                        }
                        </button>
                        <span>Negotiable</span>
                    </CurrentToggle>
                </FormContainer>
                <Bottom>
                    <button onClick={handleCreateService}>Proceed to Pricing</button>
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