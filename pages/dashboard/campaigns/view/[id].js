import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCampaign } from '../../../../api/campaigns'
import { setLoading } from '../../../../app/reducers/status'
import { AlertTriangleIcon, CheckCircleIcon, CheckIcon, WalletIcon, XSquareIcon } from '../../../../assets/svgIcons'
import { UserDropdown } from '../../../../components/nav/style'
import LandingLayout from '../../../../layouts/landing.layout'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, TopBtn, Wrapper } from '../../../../styles/view.style'

const CampaignView = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [campaignDetails, setCampaignDetails] = useState({})

  const { data, refetch } = useQuery(["get-service"], async () => {
      return await getCampaign(id);
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
          dispatch(setLoading(false));
          setCampaignDetails(res.data.data)
      },
      onError(res) {
          dispatch(setLoading(false));
          router.push("/search");
      } 
  });
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
                <Image src="/p-image.png" layout='fill'  objectFit='cover' objectPosition='center'/>
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
                    <span>{campaignDetails?.duration_count ?? "Not specified"}</span>
                  </div>
                  <div>
                    <Image src="/clock.svg" height={24} width={24}/>
                    <span>{campaignDetails?.start_date ?? "Not specified"}</span>
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
                      <MDetails>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia</MDetails>
                      <MStatus>Delivered</MStatus>
                      <MDone>
                        <button>
                          <Image src="/check-square.svg" height={24} width={24}/>
                        </button>
                      </MDone>
                    </Milestone>
                  ))
                }
              </MilestoneList>
            </Milestones>
            <ControlContainer>
              <button>Report Account</button>
              <button onClick={() => router.push("/dashboard/campaigns/completed")}><span><CheckIcon /></span> Mark As Completed</button>
            </ControlContainer>
          </Bottom>
        </Container>
      </Wrapper>
    </OuterContainer>
  )
}
CampaignView.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CampaignView