import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProjectMilestone, getProject, updateProject, updateProjectMilestone } from '../../../../api/projects'
import { getUserType, setError, setLoading } from '../../../../app/reducers/status'
import { getUser } from '../../../../app/reducers/user'
import { AlertTriangleIcon, CheckCircleIcon, CheckIcon, XSquareIcon } from '../../../../assets/svgIcons'
import { UserDropdown } from '../../../../components/nav/style'
import LandingLayout from '../../../../layouts/landing.layout'
import { AddSocialBtn, InputContainer } from '../../../../styles/profile.style'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, FormContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, TopBtn, UpdateModal, Wrapper } from '../../../../styles/view.style'
import { toast } from 'react-toastify';
import { createDispute } from '../../../../api/support'

const ProjectView = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [projectDetails, setProjectDetails] = useState({});
  const user = useSelector(getUser);
  const accountType = useSelector(getUserType);
  const [showUpdate, setShowUpdate] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeSubject, setDisputeSubject] = useState("");
  const [disputeMessage, setDisputeMessage] = useState("");

  const { data, refetch } = useQuery(["get-project"], async () => {
        return await getProject(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            setProjectDetails(res.data.data)
        },
        onError(res) {
            dispatch(setLoading(false));
        } 
    });
    const [project, setProject] = useState({
      duration_count: "",
      duration_type: "Day",
      start_date: "",
      end_date: "",
      status: "Ongoing"
    })
    const [milestone, setMilestone] = useState({
      title: "",
      description: "",
      duration_count: "",
      duration_type: "Day",
      start_date: "",
      end_date: "",
    })
    const [showMilestone, setShowMilestone] = useState(false);
    const handleProjectInputChange = (val, field) => {
      if((field === "duration_count") && (!Number(val) && (val !== ""))) return;
      setProject((prev) => {
        return {...prev, [field]: val};
      })
    }
    const handleMilestoneInputChange = (val, field) => {
      if((field === "duration_count") && (!Number(val) && (val !== ""))) return;
      setMilestone((prev) => {
        return {...prev, [field]: val};
      })
    }
    const createMilestone = useMutation( milestoneData => {
        return createProjectMilestone(id, milestoneData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetch();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
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
    const updateMilestone = useMutation( milestoneData => {
      return updateProjectMilestone(id, milestoneData.data, milestoneData.id);
  }, {
      onSuccess(successRes) {
          const res = successRes.data;
          refetch();
          if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
              dispatch(setLoading(false));
              dispatch(setError({error: true, message: res.message}));
          } else { 
              dispatch(setLoading(false));
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
    const updateProjectMutation = useMutation( projectData => {
        return updateProject(id, projectData);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            refetch();
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else { 
                dispatch(setLoading(false));
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
    const createDisputeMutation = useMutation( disputeData => {
      return createDispute(disputeData);
  }, {
      onSuccess(successRes) {
          const res = successRes.data;
          if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
              dispatch(setLoading(false));
              dispatch(setError({error: true, message: res.message}));
          } else { 
              dispatch(setLoading(false));
              toast.success("Dispute created successfully", {
                position: toast.POSITION.TOP_RIGHT
              });
              setShowDispute(false);
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
    const handleMilestoneAdd = () => {
      if(milestone.title && milestone.description && milestone.duration_count && milestone.start_date && milestone.end_date && milestone.duration_type){
        dispatch(setLoading(true));
        createMilestone.mutate(milestone)
      } else {
        dispatch(setError({error: true, message: "Enter required fields"}));
      }
    }
    const handleMilestoneToggle = (val, mId) => {
        dispatch(setLoading(true));
        updateMilestone.mutate({
          data: {
          status: val === "Completed" ? "Pending" : "Completed",
          },
          id: mId,
      })
    }
    const handleProjectUpdate = () => {
      if(project.duration_count && project.start_date && project.end_date && project.duration_type){
        dispatch(setLoading(true));
        updateProjectMutation.mutate(project)
      } else {
        dispatch(setError({error: true, message: "Enter required fields"}));
      }
    }
    const handleProjectCompleted = () => {
      dispatch(setLoading(true));
      setCompleted(true);
      updateProjectMutation.mutate({status: "completed"});
    }
    const handleCreateDispute = () => {
      if(!disputeSubject && !disputeSubject) {
        return;
      } else {
        dispatch(setLoading(true));
        createDisputeMutation.mutate({
          subject: disputeSubject,
          message: disputeMessage,
          project_id: id,
        })
      }
    }
    useEffect(() => {
      if(id){
        refetch();
      }
    }, [id])
  return (
    <OuterContainer>
      <Wrapper>
        <Container>
        <Top>
            <TopBtn onClick={() => router.push("/dashboard/projects")}>
              <Image src="/arrow-left.svg" height={24} width={24}/>
              <span>My Projects</span>
            </TopBtn>
            <div id="drop-cont" onClick={() => setShow(!show)}>
              <TopBtn>
               <Image src="/more-vertical.svg" height={24} width={24}/>
              </TopBtn>
              {
                show && (
                  <UserDropdown style={{ right: "0", width: "200px" }}>
                    <button onClick={() => router.push("/dashboard/projects/completed")}><CheckCircleIcon /><span>Mark as Completed</span></button>
                    <button onClick={() => router.push("/dashboard/projects/cancel")}><XSquareIcon /><span>Cancel Project</span></button>
                    <button onClick={() => {}}><AlertTriangleIcon /><span>Report Account</span></button>
                  </UserDropdown>
                )
              }
            </div>
          </Top>
          <Bottom>
            <DetailsContainer>
              <ImageWrapper>
                <Image src={projectDetails?.media?.url ?? "/web-services.jpg"} layout='fill'  objectFit='cover' objectPosition='center'/>
              </ImageWrapper>
              <Details>
                <h2>{projectDetails?.title}</h2>
                <SubDetails>
                  <div>
                    <Image src="/user-c.svg" height={24} width={24}/>
                    <span>{projectDetails?.provider?.firstname} {projectDetails?.provider?.lastname}</span>
                  </div>
                  <div>
                    <Image src="/calendar.svg" height={24} width={24}/>
                    <span>{projectDetails?.duration_count ?? "Not specified"}</span>
                  </div>
                  <div>
                    <Image src="/clock.svg" height={24} width={24}/>
                    <span>{projectDetails?.start_date ?? "Not specified"}</span>
                  </div>
                </SubDetails>
                <CurrentPackage>
                  <p>Active Package: <span>Basic</span> <Image src="/repeat.svg" height={24} width={24}/></p>
                </CurrentPackage>
                <Desc>
                {projectDetails.description}
                </Desc>
              </Details>
            </DetailsContainer>
            <Milestones>
              <h2>Milestones/Deliverables</h2>
              <MilestoneList>
                <MilestoneHeader>
                  <MDetails>Milestone</MDetails>
                  <MStatus>Status</MStatus>
                  <MDone>Mark Done</MDone>
                </MilestoneHeader>
                {
                  projectDetails?.milestones?.map((val, i) => (
                    <Milestone key={i}>
                      <MDetails>{val.description}</MDetails>
                      <MStatus>{val.status}</MStatus>
                      <MDone>
                        <button onClick={() => handleMilestoneToggle(val.status, val.id)}>
                          <Image src={val.status === "Completed" ? "/check-square.svg" : "/check-frame.svg"} height={24} width={24}/>
                        </button>
                      </MDone>
                    </Milestone>
                  ))
                }
              </MilestoneList>
              <AddSocialBtn onClick={() => setShowMilestone(true)}><Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add Milestone</span></AddSocialBtn>
            </Milestones>
            <ControlContainer>
              <button onClick={() => setShowDispute(true) }>Create Dispute</button>
              {
                (projectDetails?.provider?.id && user?.id && (user?.id === projectDetails?.provider?.id) && accountType && (accountType === "Creator")) ?
                <button onClick={setShowUpdate} >Update</button>: (projectDetails?.provider?.id && user?.id && (user?.id !== projectDetails?.provider?.id)) ? (
                  <button onClick={handleProjectCompleted}><span><CheckIcon /></span> Mark As Completed</button>
                ) : (<button></button>)
              }
            </ControlContainer>
          </Bottom>
        </Container>
      </Wrapper>
      {showUpdate &&(
        <UpdateModal>
          <FormContainer>
            <h3>Update Project</h3>
            <InputContainer>
              <label>Duration Count</label>
              <input type="text"
               value={project.duration_count}
               onChange={(e) => handleProjectInputChange(e.target.value, "duration_count")}
              />
            </InputContainer>
            <InputContainer>
              <label>Duration Type</label>
              <select
               value={project.duration_type}
               onChange={(e) => handleProjectInputChange(e.target.value, "duration_type")}
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </InputContainer>
            <InputContainer>
              <label>Start Date</label>
              <input
               type="date"
               value={project.start_date}
               onChange={(e) => handleProjectInputChange(e.target.value, "start_date")}
              />
            </InputContainer>
            <InputContainer>
              <label>End Date</label>
              <input
               type="date"
               value={project.end_date}
               onChange={(e) => handleProjectInputChange(e.target.value, "end_date")}
              />
            </InputContainer>
            <button onClick={() => setShowUpdate(false)}>Go back</button>
            <button onClick={handleProjectUpdate}>Update</button>
          </FormContainer>
        </UpdateModal>
      )}
       {showDispute &&(
        <UpdateModal>
          <FormContainer>
            <h3>Create Dispute</h3>
            <InputContainer>
              <label>Subject</label>
              <input type="text"
               value={disputeSubject}
               onChange={(e) => setDisputeSubject(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label>Message</label>
              <textarea
               value={disputeMessage}
               onChange={(e) => setDisputeMessage(e.target.value)}
              >
              </textarea>
            </InputContainer>
            <button onClick={() => setShowDispute(false)}>Go back</button>
            <button onClick={handleCreateDispute}>Create Dispute</button>
          </FormContainer>
        </UpdateModal>
      )}
      {showMilestone &&(
        <UpdateModal>
          <FormContainer>
            <h3>Add Milestone</h3>
            <InputContainer>
              <label>Title</label>
              <input
               type="text"
               value={milestone.title}
               onChange={(e) => handleMilestoneInputChange(e.target.value, "title")}
              />
            </InputContainer>
            <InputContainer>
              <label>Description</label>
              <input
               type="text"
               value={milestone.description}
               onChange={(e) => handleMilestoneInputChange(e.target.value, "description")}
              />
            </InputContainer>
            <InputContainer>
              <label>Duration Count</label>
              <input
               type="text"
               value={milestone.duration_count}
               onChange={(e) => handleMilestoneInputChange(e.target.value, "duration_count")}
              />
            </InputContainer>
            <InputContainer>
              <label>Duration Type</label>
              <select
               value={milestone.duration_type}
               onChange={(e) => handleMilestoneInputChange(e.target.value, "duration_type")}
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
                <option value="Decade">Decade</option>
              </select>
            </InputContainer>
            <InputContainer>
              <label>Start Date</label>
              <input
               type="date"
               value={milestone.start_date}
               onChange={(e) => handleMilestoneInputChange(e.target.value, "start_date")}
              />
            </InputContainer>
            <InputContainer>
              <label>End Date</label>
              <input
               type="date"
               value={milestone.end_date}
               onChange={(e) => handleMilestoneInputChange(e.target.value, "end_date")}
              />
            </InputContainer>
            <button onClick={() => setShowMilestone(false)}>Go back</button>
            <button onClick={handleMilestoneAdd}>Add</button>
          </FormContainer>
        </UpdateModal>
      )}
    </OuterContainer>
  )
}
ProjectView.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default ProjectView