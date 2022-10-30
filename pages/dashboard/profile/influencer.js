import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSkills, deleteSkill, getSkills, updateSkills } from '../../../api/influencer'
import { setError, setLoading, setSuccess } from '../../../app/reducers/status'
import { getUser } from '../../../app/reducers/user'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { BottomAdd,  Container, Content, DeleteBtn, FormContainer, Heading, InputContainer, InputFlex, List, ListContainer, Wrapper } from '../../../styles/profile.style'

const Information = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    // handles new skills input change
    const [newSkills, setNewSkills] = useState({
        name: "",
        rate: "",
    });
    const { data: skillsData, refetch: refetchSkillData } = useQuery(["get-skills"], async () => {
        return await getSkills(user.account.id);
    }, {
        enabled: false,
        staleTime: Infinity
    })
    const createSkillsMutation = useMutation( skillsData => {
        return createSkills(skillsData)
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchSkillData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                setNewSkills({
                    name: "",
                    rate: "",
                })
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Skill added successful"}));

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
    })
    const deleteSkillMutation = useMutation( skillId => {
        return deleteSkill(skillId);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchSkillData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Skill deleted successfully"}));
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
    })
    const updateSkillsMutation = useMutation( skillsData => {
        return createSkills(skillsData)
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchSkillData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                setNewSkills({
                    name: "",
                    rate: "",
                })
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Skill updated successful"}));

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

    // list of skills state
    const [skillsList, setSkillsList] = useState([]);

    // handles skills input change
    const handleSkillsChange = (val, field, index) => {
        setSkillsList((prevList) => {
            const copyOfList = JSON.parse(JSON.stringify(prevList));
            if((field === "rate" && Number(val) && Number(val) <= 100) || (field === "rate" && val === "") || (field === "name")) {
                copyOfList[index][field] = val;
            }
            return copyOfList;
        })
    }
    // handles skill delete
    const handleSkillDelete = (index) => {
       dispatch(setLoading(true));
       deleteSkillMutation.mutate(index);
    }

    const handleUpdateSkills = () => {
        dispatch(setLoading(true));
        updateSkillsMutation.mutate(skillsList);
    }
    
    // handles new skills change
    const handleNewSkillChange = (val, field) => {
        setNewSkills((prevVal) => {
            if((field === "rate" && Number(val) && Number(val) <= 100) || (field === "rate" && val === "") || (field === "name")) {
                return {...prevVal, [field]: val};
            } else {
                return prevVal;
            }
        })
    }

    // handles add skill
    const handleAddSkill = () => {
        dispatch(setLoading(true));
        if(newSkills.name && newSkills.rate) {
            console.log(skillsList)
            const formattedList = skillsList.map(val => (
                {
                    ...val,
                    rate: Number(val.rate)
                }
            ))
            createSkillsMutation.mutate([...formattedList, {...newSkills, rate: Number(newSkills.rate)}]);
        }
    }

    // updates the skills list 
    useEffect(() => {
      if(skillsData) {
        setSkillsList(skillsData.data.data)
        console.log(skillsData.data.data)
      }
    }, [skillsData])
    

    useEffect(() => {
    if(user) {
        if(user.account && user.account.is_businessowner) {
            router.push("/dashboard/profile/information");
        }
        refetchSkillData();
    }
    }, [user, router.pathname])
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Skills</h2>
                </Heading>
                <ListContainer>
                    {
                        skillsList.length > 0 ? (
                            skillsList.map((val, i) => (
                                <List>
                                    <InputFlex>
                                        <InputContainer>
                                            <label>Name</label>
                                            <input
                                            type="text"
                                            value={val.name}
                                            onChange={(e) => handleSkillsChange(e.target.value, "name", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <label>Rate (0 - 100%)</label>
                                            <input
                                            type="text"
                                            value={val.rate}
                                            onChange={(e) => handleSkillsChange(e.target.value, "rate", i)}
                                            />
                                        </InputContainer>
                                    </InputFlex>
                                    <DeleteBtn onClick={() => handleSkillDelete(val.id)}>x</DeleteBtn>
                                </List> 
                            )) 
                        ): <h4>No Skills</h4>
                    }
                    {
                        skillsList.length ? (
                            <BottomAdd>
                                <button onClick={() => handleUpdateSkills()}>Update Skill</button>
                            </BottomAdd>
                        ) : null
                    }
                </ListContainer>
                <FormContainer>
                    <InputFlex>
                        <InputContainer>
                            <label>Name</label>
                            <input
                            type="text"
                            value={newSkills.name}
                            onChange={(e) => handleNewSkillChange(e.target.value, "name")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label>Rate (0 - 100%)</label>
                            <input
                            type="text"
                            value={newSkills.rate}
                            onChange={(e) => handleNewSkillChange(e.target.value, "rate")}
                            />
                        </InputContainer>
                    </InputFlex>
                    <BottomAdd>
                        <button onClick={() => handleAddSkill()}>Add Skill</button>
                    </BottomAdd>
                </FormContainer>

                <Heading>
                    <h2>Experiences</h2>
                </Heading>
                <FormContainer>
                    <BottomAdd>
                        <button onClick={() => {}}>Add Experience</button>
                    </BottomAdd>
                </FormContainer>
                <Heading>
                    <h2>Certifications</h2>
                </Heading>
                <FormContainer>
                    <BottomAdd>
                        <button onClick={() => {}}>Add Certification</button>
                    </BottomAdd>
                </FormContainer>
                <Heading>
                    <h2>Services</h2>
                </Heading>
                <FormContainer>
                    <BottomAdd>
                        <button onClick={() => {}}>Add Service</button>
                    </BottomAdd>
                </FormContainer>
                <Heading>
                    <h2>Portfolios</h2>
                </Heading>
                <FormContainer>
                    <BottomAdd>
                        <button onClick={() => {}}>Add Portfolio</button>
                    </BottomAdd>
                </FormContainer>
            </Content>
        </Wrapper>
    </Container>
  )
}
Information.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Information