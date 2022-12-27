import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCampaignMilestone, getCampaign, updateCampaign, updateCampaignMilestone } from '../../../../api/campaigns'
import { setError, setLoading } from '../../../../app/reducers/status'
import { getUser } from '../../../../app/reducers/user'
import { AlertTriangleIcon, CheckCircleIcon, CheckIcon, WalletIcon, XSquareIcon } from '../../../../assets/svgIcons'
import { UserDropdown } from '../../../../components/nav/style'
import LandingLayout from '../../../../layouts/landing.layout'
import { getUserType } from '../../../../app/reducers/status'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, FormContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, TopBtn, UpdateModal, Wrapper } from '../../../../styles/view.style'
import { AddSocialBtn, InputContainer } from '../../../../styles/profile.style'

const CampaignView = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const accountType = useSelector(getUserType);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [campaign, setCampaign] = useState({
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
  const handleCampaignInputChange = (val, field) => {
    if((field === "duration_count") && (!Number(val) && (val !== ""))) return;
    setCampaign((prev) => {
      return {...prev, [field]: val};
    })
  }
  const handleMilestoneInputChange = (val, field) => {
    if((field === "duration_count") && (!Number(val) && (val !== ""))) return;
    setMilestone((prev) => {
      return {...prev, [field]: val};
    })
  }

  const { data, refetch } = useQuery(["get-service"], async () => {
      return await getCampaign(id);
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
          dispatch(setLoading(false));
          setCampaignDetails(res.data.data);

      },
      onError(res) {
          dispatch(setLoading(false));
      } 
  });
  const createMilestone = useMutation( milestoneData => {
      return createCampaignMilestone(id, milestoneData);
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
    return updateCampaignMilestone(id, milestoneData.data, milestoneData.id);
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
  const updateCampaignMutation = useMutation( campaignData => {
      return updateCampaign(id, campaignData);
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
  const handleCampaignUpdate = () => {
    if(campaign.duration_count && campaign.start_date && campaign.end_date && campaign.duration_type){
      dispatch(setLoading(true));
      updateCampaignMutation.mutate(campaign)
    } else {
      dispatch(setError({error: true, message: "Enter required fields"}));
    }
  }
  const handleCampaignCompleted = () => {
    dispatch(setLoading(true));
    setCompleted(true);
    updateCampaignMutation.mutate({status: "completed"});
  }
  useEffect(() => {
    if(id){
      refetch(id);
    }
  }, [id])
  
  return (
    <OuterContainer>
      <Wrapper>
        <Container>
        <Top>
            <TopBtn onClick={() => router.push("/dashboard/campaigns")}>
              <Image src="/arrow-left.svg" height={24} width={24}/>
              <span>My Campaigns</span>
            </TopBtn>
            <div id="drop-cont" onClick={() => setShow(!show) }>
              <TopBtn id>
               <Image src="/more-vertical.svg" height={24} width={24}/>
              </TopBtn>
              {
                show && (
                  <UserDropdown style={{ right: "0", width: "200px" }}>
                    <button onClick={() => router.push("/dashboard/campaigns/completed")}><CheckCircleIcon /><span>Mark as Completed</span></button>
                    <button onClick={() => router.push("/dashboard/campaigns/cancel")}><XSquareIcon /><span>Cancel Campaign</span></button>
                    <button onClick={() => {}}><AlertTriangleIcon /><span>Report Account</span></button>
                  </UserDropdown>
                )
              }
            </div>
          </Top>
          <Bottom>
            <DetailsContainer>
              <ImageWrapper>
                <Image src={campaignDetails?.media?.url ?? "/web-services.jpg"} layout='fill'  objectFit='cover' objectPosition='center'/>
              </ImageWrapper>
              <Details>
                <h2>{campaignDetails?.title}</h2>
                <SubDetails>
                  <div>
                    <Image src="/user-c.svg" height={24} width={24}/>
                    <span>{campaignDetails?.provider?.firstname} {campaignDetails?.provider?.lastname}</span>
                  </div>
                  <div>
                    <Image src="/calendar.svg" height={24} width={24}/>
                    <span>{campaignDetails?.duration_count ?? "Not specified"} {campaignDetails?.duration_type}</span>
                  </div>
                  <div>
                    <Image src="/clock.svg" height={24} width={24}/>
                    <span>{campaignDetails?.start_date ? (new Date(campaignDetails?.start_date)).toDateString() : "Not specified"}</span>
                  </div>
                </SubDetails>
                <CurrentPackage>
                  <p>Active Package: <span>{campaignDetails?.package?.name}</span> <Image src="/repeat.svg" height={24} width={24}/></p>
                </CurrentPackage>
                <Desc>
                  {campaignDetails?.description}
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
                  campaignDetails?.milestones?.map((val, i) => (
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
              <button>Report Account</button>
              {
                (campaignDetails?.provider?.id && user?.id && (user?.id === campaignDetails?.provider?.id) && accountType && (accountType === "Influencer")) ?
                <button onClick={setShowUpdate} >Update</button>: (campaignDetails?.provider?.id && user?.id && (user?.id !== campaignDetails?.provider?.id)) ? (
                  <button onClick={handleCampaignCompleted}><span><CheckIcon /></span> Mark As Completed</button>
                ) : (<button></button>)
              }
            </ControlContainer>
          </Bottom>
        </Container>
      </Wrapper>
      {showUpdate &&(
        <UpdateModal>
          <FormContainer>
            <h3>Update Campaign</h3>
            <InputContainer>
              <label>Duration Count</label>
              <input type="text"
               value={campaign.duration_count}
               onChange={(e) => handleCampaignInputChange(e.target.value, "duration_count")}
              />
            </InputContainer>
            <InputContainer>
              <label>Duration Type</label>
              <select
               value={campaign.duration_type}
               onChange={(e) => handleCampaignInputChange(e.target.value, "duration_type")}
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
               value={campaign.start_date}
               onChange={(e) => handleCampaignInputChange(e.target.value, "start_date")}
              />
            </InputContainer>
            <InputContainer>
              <label>End Date</label>
              <input
               type="date"
               value={campaign.end_date}
               onChange={(e) => handleCampaignInputChange(e.target.value, "end_date")}
              />
            </InputContainer>
            <button onClick={() => setShowUpdate(false)}>Go back</button>
            <button onClick={handleCampaignUpdate}>Update</button>
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
CampaignView.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CampaignView