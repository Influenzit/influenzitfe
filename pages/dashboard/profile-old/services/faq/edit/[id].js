import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createCertifications, createFaqServices, createServices, createSkills, deleteCertification, deleteService, deleteSkill, getCertifications, getService, getServices, getSkills, updateCertifications, updateServiceFaq, updateServices, updateSkills } from '../../../../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../../../../app/reducers/status'
import { getUser } from '../../../../../../app/reducers/user'
import ProfileSidebar from '../../../../../../components/profile-sidebar';
import LandingLayout from '../../../../../../layouts/landing.layout';
import { AddSocialBtn, Bottom, BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FaqCont, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, Wrapper } from '../../../../../../styles/profile.style'


const Faq = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const { id } = router.query;
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
        onSuccess(res) {
            dispatch(setLoading(false));
            const serverFaq = res.data.data.faqs.map(val => ({
              question: val.question,
              answer: val.answer,
            }));
            if(serverFaq.length) {
              setFaqList(serverFaq);
            }
        },
        onError(res) {
            dispatch(setLoading(false));
            router.push("/dashboard/profile/services/create");
        } 
    });
    const updateFaqMutation = useMutation( faqData => {
        return updateServiceFaq(id, faqData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchServiceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
                toast.success("FAQ updated successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
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
    const handleUpdateFaq = () => {
        dispatch(setLoading(true));
        const filteredData = faqList.filter(val => val.question && val.answer)
        if(filteredData.length < 1) {
            dispatch(setLoading(false));
            dispatch(setError({message: "Enter atleast a faq", error: true}));
        } else{
            updateFaqMutation.mutate(filteredData);
        }
    }
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
    const handleFaqDel = (index) => {
        setFaqList((prev) => {
            const copyOfPrev = JSON.parse(JSON.stringify(prev));
            copyOfPrev.splice(index, 1);
            return copyOfPrev;
        })
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
            {
                serviceData && serviceData.data && (
                    <Content>
                        <Heading>
                            <h2>Add Service FAQs</h2>
                        </Heading>
                        <FormContainer>
                            {
                                faqList.map((val, i) => (
                                    <FaqCont key={i}>
                                        <h3>Question {i + 1} <button onClick={() => handleFaqDel(i)}><Image src="/delete.svg" alt="plus" height={22} width={22} /></button></h3>
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
                            <button onClick={handleUpdateFaq}>Update Faq</button>
                        </Bottom>
                    </Content>
                )
            }
        </Wrapper>
    </Container>
  )
}
Faq.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Faq;
