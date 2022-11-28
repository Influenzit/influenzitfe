import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCertifications, createServices, createSkills, deleteCertification, deleteService, deleteSkill, getCertifications, getService, getServices, getSkills, updateCertifications, updateServices, updateSkills } from '../../../../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../../../../app/reducers/status'
import { getUser } from '../../../../../../app/reducers/user'
import ProfileSidebar from '../../../../../../components/profile-sidebar';
import LandingLayout from '../../../../../../layouts/landing.layout';
import { AddSocialBtn, Bottom, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FaqCont, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, Wrapper } from '../../../../../../styles/profile.style'


const Services = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const { id } = router.query;
    const [fetched, setFetched] = useState(false);



    const currentAcctType = useSelector(getUserType);

    // faq list state
    const [faqList, setFaqList] = useState([{
        question: "",
        answer: ""
    }]);

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
    const handleAddFaq = () => {
        setFaqList((prev) => {
            const copyOfPrev = JSON.parse(JSON.stringify(prev));
            return [...copyOfPrev, { question: "", answer: "" }];
        })
    }
    const handleInputChange = (val, field, index) => {
        setFaqList((prev) => {
            const copyOfPrev = JSON.parse(JSON.stringify(prev));
            copyOfPrev[index][field] = val;
            return copyOfPrev;
        })
    }
    useEffect(() => {
        dispatch(setLoading(true));
        if(user) {
            if(currentAcctType === "Business Owner") {
                router.push("/dashboard/profile/information");
            }
            if(id && !fetched) { 
                refetchServiceData();
                setFetched(true);
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
                            <h2>Add Service FAQs</h2>
                        </Heading>
                        <FormContainer>
                            {
                                faqList.map((val, i) => (
                                    <FaqCont>
                                        <h3>Question {i + 1}</h3>
                                        <InputContainer>
                                            <input
                                                type="tel"
                                                value={val.question}
                                                placeholder="Ask your question"
                                                onChange={(e) => handleInputChange(e.target.value, "question", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <textarea 
                                              value={val.answer}
                                              placeholder="Type answer here"
                                              onChange={(e) => handleInputChange(e.target.value, "answer", i)}
                                            />
                                        </InputContainer>
                                    </FaqCont>
                                ))
                            }
                            <AddSocialBtn onClick={handleAddFaq}><Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add more</span></AddSocialBtn>
                        </FormContainer>
                        <Bottom>
                            <button>Continue to Media</button>
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