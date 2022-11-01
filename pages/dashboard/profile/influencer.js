import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createExperiences, createSkills, deleteSkill, getCertifications, getExperiences, getSkills, updateExperiences, updateSkills } from '../../../api/influencer'
import { isLoading, setError, setLoading, setSuccess } from '../../../app/reducers/status'
import { getUser } from '../../../app/reducers/user'
import { CancelIcon, DeleteIcon } from '../../../assets/svgIcons'
import ProfileSidebar from '../../../components/profile-sidebar';
import LandingLayout from '../../../layouts/landing.layout';
import { CheckContainer, FrameContainer } from '../../../styles/auth.style'
import { BottomAdd,  Container, Content, Control, ControlFlex, CurrentToggle, DeleteBtn, FormContainer, Heading, InputContainer, InputFlex, List, ListB, ListContainer, Wrapper } from '../../../styles/profile.style'

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
        return await getSkills();
    }, {
        enabled: false,
        staleTime: Infinity
    });
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
                dispatch(setSuccess({success: true, message: "Skill created"}));

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

    // handles update skills
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
        if(newSkills.name && newSkills.rate) {
            dispatch(setLoading(true));
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
        setSkillsList(skillsData.data.data);
      }
    }, [skillsData]);

    // experience list state
    const [experienceList, setExperienceList] = useState([]);

    // new experience state
    const [newExperience, setNewExperience] = useState({
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        isPresent: true,
    })

    // gets experiences
    const { data: experienceData, refetch: refetchExperienceData } = useQuery(["get-experiences"], async () => {
        return await getExperiences();
    }, {
        enabled: false,
        staleTime: Infinity
    });

    // updates experience list
    useEffect(() => {
        if(experienceData) {
            setExperienceList(experienceData.data.data);
        }
    }, [experienceData]);
    
    const createExperienceMutation = useMutation( experienceData => {
        return createExperiences(experienceData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchExperienceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                setNewExperience({
                    position: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    isPresent: true,
                })
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Experience created"}));

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
    const deleteExperienceMutation = useMutation( experienceId => {
        return deleteSkill(experienceId);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetchExperienceData();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
                dispatch(setSuccess({success: true, message: "Experience deleted successfully"}));
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
    const updateExperienceMutation = useMutation((experience) => {
        return updateExperiences(experience.data, experience.id);
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
    });

    // handles create experience
    const handleCreateExperience = () => {
        if(newExperience.company && newExperience.position && newExperience.startDate && newExperience.endDate) {
            dispatch(setLoading(true));
            createExperienceMutation.mutate({
                position: newExperience.position,
                company: newExperience.company,
                start_date: newExperience.startDate,
                end_date: newExperience.endDate,
                is_present: newExperience.isPresent,
            });
        }
    }
    // handles delete experience
    const handleDeleteExperience = (experienceId) => {
        dispatch(setLoading(true));
        deleteExperienceMutation.mutate(experienceId);
    }

    // handles update experience
    const handleUpdateExperience = (index) => {

    } 

    // handles experience input change
    const handleExperienceChange = (val, field, index) => {
        setExperienceList((prevList) => {
            const copyOfList = JSON.parse(JSON.stringify(prevList));
            copyOfList[index][field] = val;
            return copyOfList;
        })
    }

    // handles new experience change
    const handleNewExperienceChange = (val, field) => {
        setNewExperience((prevVal) => {
            return {...prevVal, [field]: val};
        })
    }
    useEffect(() => {
    if(user) {
        if(user.account && user.account.is_businessowner) {
            router.push("/dashboard/profile/information");
        }
        refetchSkillData();
        refetchExperienceData();
    }
    }, [user, router.pathname]);

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
                                <List key={i}>
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
                                    <DeleteBtn onClick={() => handleSkillDelete(val.id)}><DeleteIcon /></DeleteBtn>
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
                <ListContainer>
                    {
                        experienceList.length > 0 ? (
                            experienceList.map((val, i) => (
                                <ListB key={i}>
                                    <InputFlex>
                                        <InputContainer>
                                            <label>Position</label>
                                            <input
                                            type="text"
                                            value={val.position}
                                            onChange={(e) => handleExperienceChange(e.target.value, "position", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <label>Company</label>
                                            <input
                                            type="text"
                                            value={val.company}
                                            onChange={(e) => handleExperienceChange(e.target.value, "company", i)}
                                            />
                                        </InputContainer>
                                    </InputFlex>
                                    <InputFlex>
                                        <InputContainer>
                                            <label>Start Date</label>
                                            <input
                                            type="date"
                                            value={val.start_date}
                                            onChange={(e) => handleExperienceChange(e.target.value, "start_date", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <label>End Date</label>
                                            <input
                                            type="date"
                                            value={val.end_date}
                                            onChange={(e) => handleExperienceChange(e.target.value, "end_date", i)}
                                            />
                                        </InputContainer>
                                    </InputFlex>
                                    <ControlFlex>
                                        <CurrentToggle>
                                            <button onClick={() => handleExperienceChange(!experienceList[i].is_present, "is_present", i)}>
                                            <FrameContainer>
                                                <Image src="/check-frame.svg" alt="" height={18} width={18} />
                                            </FrameContainer>
                                            {
                                                experienceList[i].is_present && <CheckContainer>
                                                <Image src="/check-b.svg" alt="" height={10} width={13} />
                                                </CheckContainer>
                                            }
                                            </button>
                                            <span>Present</span>
                                        </CurrentToggle>
                                        <Control>
                                            <button onClick={() => handleDeleteExperience(val.id)}><DeleteIcon /></button>
                                            <BottomAdd>
                                                <button onClick={() => handleUpdateExperience(val.id)}>Update Experience</button>
                                            </BottomAdd>
                                        </Control>
                                    </ControlFlex>
                                </ListB> 
                            ))
                        ) : <h4>No Experience</h4>
                    }
                </ListContainer>
                <FormContainer>
                <InputFlex>
                    <InputContainer>
                        <label>Position</label>
                        <input
                        type="text"
                        value={newExperience.position}
                        onChange={(e) => handleNewExperienceChange(e.target.value, "position")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Company</label>
                        <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => handleNewExperienceChange(e.target.value, "company")}
                        />
                    </InputContainer>
                </InputFlex>
                <InputFlex>
                    <InputContainer>
                        <label>Start Date</label>
                        <input
                        type="date"
                        value={newExperience.startDate}
                        onChange={(e) => handleNewExperienceChange(e.target.value, "startDate")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>End Date</label>
                        <input
                        type="date"
                        value={newExperience.endDate}
                        onChange={(e) => handleNewExperienceChange(e.target.value, "endDate")}
                        />
                    </InputContainer>
                </InputFlex>
                <ControlFlex>
                    <CurrentToggle>
                        <button onClick={() => handleNewExperienceChange(!newExperience.isPresent, "isPresent")}>
                        <FrameContainer>
                            <Image src="/check-frame.svg" alt="" height={18} width={18} />
                        </FrameContainer>
                        {
                            newExperience.isPresent && <CheckContainer>
                            <Image src="/check-b.svg" alt="" height={10} width={13} />
                            </CheckContainer>
                        }
                        </button>
                        <span>Present</span>
                    </CurrentToggle>
                    <Control>
                        <button onClick={() => handleCreateExperience()}>Create Experience</button>
                    </Control>
                </ControlFlex>
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