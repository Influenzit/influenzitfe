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
import { ImageWrap, ServiceCard, ServiceDetails, ServRate, ServStats, ServUserCard, TopImg } from '../../../../styles/influencer-profile'
import { AddServiceBtn, AvailableSwitch, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, ServiceList, Wrapper } from '../../../../styles/profile.style'
import { BoxIcon } from '../../../../assets/svgIcons'
import { moneyStandard } from '../../../../helpers/helper'

const Services = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-services"], async () => {
        return await getServices();
    }, {
        enabled: false,
        staleTime: Infinity
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
    const handleDeleteService = (serviceId) => {
        dispatch(setLoading(true));
        deleteServiceMutation.mutate(serviceId);
    }
  const [serviceList, setServiceList] = useState([]);
    useEffect(() => {
        if(serviceData) {
            setServiceList(serviceData.data.data);
        }
    }, [serviceData]);
    useEffect(() => {
      refetchServiceData();
    }, [])
    
  return (
    <Container>
        <Wrapper>
            <Content>
                <Heading>
                    <h2>My Services</h2>
                    <AvailableSwitch isAvailable={isAvailable}>
                        <p>Unavailable</p>
                        <button onClick={() => setIsAvailable(!isAvailable)}>
                            <span></span>
                        </button>
                        <p>Available</p>
                    </AvailableSwitch>
                </Heading>
                <ServiceList>
                    {
                        serviceList.map((val, i) => (
                            <ServiceCard key={i}>
                                <TopImg>
                                    <Image src={val.media[0]?.url ?? "/web-services.jpg"} alt="" layout="fill" objectPosition="center" objectFit='cover' />
                                </TopImg>
                                <ServiceDetails>
                                    <ServUserCard>
                                        <ImageWrap>
                                            <Image src="/profile-2.png" alt="" layout="fill" objectPosition="center" objectFit='cover'/>
                                        </ImageWrap>
                                        <p>{val.name}</p>
                                    </ServUserCard>
                                    <ServRate>
                                        starting from <span>{val.currency} {moneyStandard(val.starting_from)}</span>
                                    </ServRate>
                                </ServiceDetails>
                                <ServStats>
                                    <div>
                                        <button onClick={() => handleDeleteService(val.id)} id="del">Delete</button>
                                    </div>
                                    <div>
                                        <button onClick={() => router.push(`/dashboard/profile/services/edit/${val.id}`)}>Edit</button>
                                    </div>
                                </ServStats>
                            </ServiceCard>
                        ))
                    }
                    <AddServiceBtn onClick={() => router.push("/dashboard/profile/services/create")}>
                        <span>
                            <BoxIcon/>
                        </span>
                        <span>Add a service</span>
                    </AddServiceBtn>
                </ServiceList>
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