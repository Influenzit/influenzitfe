import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCertifications, createServices, createSkills, deleteCertification, deleteService, deleteSkill, getCertifications, getServices, getSkills, updateCertifications, updateServices, updateSkills } from '../../../../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../../../../app/reducers/status'
import { getUser } from '../../../../../../app/reducers/user'
import { CancelIcon, DeleteIcon } from '../../../../../../assets/svgIcons'
import ProfileSidebar from '../../../../../../components/profile-sidebar';
import LandingLayout from '../../../../../../layouts/landing.layout';
import { CheckContainer, FrameContainer } from '../../../../../../styles/auth.style'
import { Bottom, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, Wrapper } from '../../../../../../styles/profile.style'

const Services = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const {id} = router.query;

    const currentAcctType = useSelector(getUserType);
       
    useEffect(() => {
    if(user) {
        if(currentAcctType === "Business Owner") {
            router.push("/dashboard/profile/information");
        }
    }
    }, [user, router.pathname, currentAcctType]);

  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Add new service</h2>
                </Heading>
                
                <FormContainer>
                    
                </FormContainer>
                <Bottom>
                    <button>Proceed to Faq</button>
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