import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCertifications, createExperiences, createSkills, deleteCertification, deleteExperience, deleteSkill, getCertifications, getExperiences, getSkills, updateCertifications, updateExperiences, updateSkills } from '../../../api/influencer'
import { getUserType, isLoading, setError, setLoading, setSuccess } from '../../../app/reducers/status'
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

    const currentAcctType = useSelector(getUserType);
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
    const formatDate = (date) => {
        return date.split(" ")[0]
    }

    // updates experience list
    useEffect(() => {
        if(experienceData) {
            const formattedExperienceList = experienceData.data.data.map((val) => {
                if (val.start_date && val.end_date) {
                    return {...val, start_date: formatDate(val.start_date), end_date: formatDate(val.end_date)};
                } else {
                    return {...val, start_date: formatDate(val.start_date), end_date: ""};
                }
            })
            setExperienceList(formattedExperienceList);
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
        return deleteExperience(experienceId);
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
                dispatch(setSuccess({success: true, message: "Experience updated successful"}));

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
        if(newExperience.company && newExperience.position && newExperience.startDate && (newExperience.endDate || newExperience.isPresent)) {
            dispatch(setLoading(true));
            createExperienceMutation.mutate({
                position: newExperience.position,
                company: newExperience.company,
                start_date: newExperience.startDate,
                end_date: newExperience.endDate,
                is_present: newExperience.isPresent,
            });
        } else {
            dispatch(setError({message: "Enter required fields", error: true}));
        }
    }
    // handles delete experience
    const handleDeleteExperience = (experienceId) => {
        dispatch(setLoading(true));
        deleteExperienceMutation.mutate(experienceId);
    }

    // handles update experience
    const handleUpdateExperience = (index) => {
        if(experienceList[index].company && experienceList[index] && experienceList[index].start_date && (experienceList[index].end_date || experienceList[index].is_present)) {
            dispatch(setLoading(true));
            updateExperienceMutation.mutate({ data: experienceList[index], id: experienceList[index].id } );
        } else {
            dispatch(setError({message: "Enter required fields", error: true}));
        }
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


        // certification list state
        const [certificationList, setCertificationList] = useState([]);

        // new certification state
        const [newCertification, setNewCertification] = useState({
            name: "",
            issuer: "",
            date: "",
            reference: "",
            link: "",
        })
    
        // gets certifications
        const { data: certificationData, refetch: refetchCertificationData } = useQuery(["get-certifications"], async () => {
            return await getCertifications();
        }, {
            enabled: false,
            staleTime: Infinity
        });
    
        // updates certification list
        useEffect(() => {
            if(certificationData) {
                const formattedCertificationList = certificationData.data.data.map((val) => {
                    return {...val, date: formatDate(val.date)};
                })
                setCertificationList(formattedCertificationList);
            }
        }, [certificationData]);
        
        const createCertificationMutation = useMutation( certificationData => {
            return createCertifications(certificationData);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                refetchCertificationData();
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    setNewCertification({
                        name: "",
                        issuer: "",
                        date: "",
                        reference: "",
                        link: "",
                    })
                    dispatch(setLoading(false));
                    dispatch(setSuccess({success: true, message: "Certification created"}));
    
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
        const deleteCertificationMutation = useMutation( certificationId => {
            return deleteCertification(certificationId);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                refetchCertificationData();
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    dispatch(setLoading(false));
                    dispatch(setSuccess({success: true, message: "Certification deleted successfully"}));
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
        const updateCertificationMutation = useMutation((certification) => {
            return updateCertifications(certification.data, certification.id);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                refetchCertificationData();
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    setNewSkills({
                        name: "",
                        rate: "",
                    })
                    dispatch(setLoading(false));
                    dispatch(setSuccess({success: true, message: "Certification updated successful"}));
    
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
    
        // handles create certification
        const handleCreateCertification = () => {
            if(newCertification.name && newCertification.issuer && newCertification.date && newCertification.reference && newCertification.link ) {
                dispatch(setLoading(true));
                createCertificationMutation.mutate({
                    name: newCertification.name,
                    issuer: newCertification.issuer,
                    date: newCertification.date,
                    reference: newCertification.reference,
                    link: newCertification.link,
                });
            } else {
                dispatch(setError({message: "Enter required fields", error: true}));
            }
        }
        // handles delete certification
        const handleDeleteCertification = (certificationId) => {
            dispatch(setLoading(true));
            deleteCertificationMutation.mutate(certificationId);
        }
    
        // handles update certification
        const handleUpdateCertification = (index) => {
            if(certificationList[index].name && certificationList[index].issuer && certificationList[index].date && certificationList[index].reference && certificationList[index].link ) {
                dispatch(setLoading(true));
                updateCertificationMutation.mutate({ data: certificationList[index], id: certificationList[index].id } );
            } else {
                dispatch(setError({message: "Enter required fields", error: true}));
            }
        } 
    
        // handles certification input change
        const handleCertificationChange = (val, field, index) => {
            setCertificationList((prevList) => {
                const copyOfList = JSON.parse(JSON.stringify(prevList));
                copyOfList[index][field] = val;
                return copyOfList;
            })
        }
    
        // handles new certification change
        const handleNewCertificationChange = (val, field) => {
            setNewCertification((prevVal) => {
                return {...prevVal, [field]: val};
            })
        }




    useEffect(() => {
    if(user) {
        if(currentAcctType === "Business Owner") {
            router.push("/dashboard/profile/information");
        }
        refetchCertificationData();
        refetchSkillData();
        refetchExperienceData();
    }
    }, [user, router.pathname, currentAcctType]);

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
                                            {!experienceList[i].is_present && <>
                                                <label>End Date</label>
                                                <input
                                                type="date"
                                                value={val.end_date}
                                                onChange={(e) => handleExperienceChange(e.target.value, "end_date", i)}
                                                />
                                            </>
                                            }
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
                                                <button onClick={() => handleUpdateExperience(i)}>Update Experience</button>
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
                    { !newExperience.isPresent && <>
                        <label>End Date</label>
                        <input
                        type="date"
                        value={newExperience.endDate}
                        onChange={(e) => handleNewExperienceChange(e.target.value, "endDate")}
                        />
                    </>
                    }

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
                <ListContainer>
                    {
                        certificationList.length > 0 ? (
                            certificationList.map((val, i) => (
                                <ListB key={i}>
                                    <InputFlex>
                                        <InputContainer>
                                            <label>Name</label>
                                            <input
                                            type="text"
                                            value={val.name}
                                            onChange={(e) => handleCertificationChange(e.target.value, "name", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <label>Issuer</label>
                                            <input
                                            type="text"
                                            value={val.issuer}
                                            onChange={(e) => handleCertificationChange(e.target.value, "issuer", i)}
                                            />
                                        </InputContainer>
                                    </InputFlex>
                                    <InputFlex>
                                        <InputContainer>
                                            <label>Date</label>
                                            <input
                                            type="date"
                                            value={val.date}
                                            onChange={(e) => handleCertificationChange(e.target.value, "date", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <label>Link</label>
                                            <input
                                            type="text"
                                            value={val.link}
                                            onChange={(e) => handleCertificationChange(e.target.value, "link", i)}
                                            />
                                        </InputContainer>
                                    </InputFlex>
                                    <InputFlex>
                                        <InputContainer>
                                            <label>Reference</label>
                                            <input
                                            type="reference"
                                            value={val.reference}
                                            onChange={(e) => handleCertificationChange(e.target.value, "reference", i)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                        </InputContainer>
                                    </InputFlex>
                                    <ControlFlex>
                                        <CurrentToggle>
                                        </CurrentToggle>
                                        <Control>
                                            <button onClick={() => handleDeleteCertification(val.id)}><DeleteIcon /></button>
                                            <BottomAdd>
                                                <button onClick={() => handleUpdateCertification(i)}>Update Certification</button>
                                            </BottomAdd>
                                        </Control>
                                    </ControlFlex>
                                </ListB> 
                            ))
                        ) : <h4>No Certifications</h4>
                    }
                </ListContainer>
                <FormContainer>
                <InputFlex>
                    <InputContainer>
                        <label>Name</label>
                        <input
                        type="text"
                        value={newCertification.name}
                        onChange={(e) => handleNewCertificationChange(e.target.value, "name")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Issuer</label>
                        <input
                        type="text"
                        value={newCertification.issuer}
                        onChange={(e) => handleNewCertificationChange(e.target.value, "issuer")}
                        />
                    </InputContainer>
                </InputFlex>
                <InputFlex>
                    <InputContainer>
                        <label>Date</label>
                        <input
                        type="date"
                        value={newCertification.date}
                        onChange={(e) => handleNewCertificationChange(e.target.value, "date")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Link</label>
                        <input
                        type="text"
                        value={newCertification.link}
                        onChange={(e) => handleNewCertificationChange(e.target.value, "link")}
                        />
                    </InputContainer>
                </InputFlex>
                <InputFlex>
                    <InputContainer>
                        <label>Reference</label>
                        <input
                        type="reference"
                        value={newCertification.reference}
                        onChange={(e) => handleNewCertificationChange(e.target.value, "reference")}
                        />
                    </InputContainer>
                    <InputContainer>
                    </InputContainer>
                </InputFlex>
                <ControlFlex>
                    <CurrentToggle>
                    </CurrentToggle>
                    <Control>
                        <button onClick={() => handleCreateCertification()}>Create Certification</button>
                    </Control>
                </ControlFlex>
                </FormContainer>
                {/* <Heading>
                    <h2>Portfolios</h2>
                </Heading>
                <FormContainer>
                    <BottomAdd>
                        <button onClick={() => {}}>Add Portfolio</button>
                    </BottomAdd>
                </FormContainer> */}
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