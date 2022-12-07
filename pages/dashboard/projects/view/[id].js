import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProject } from '../../../../api/projects'
import { AlertTriangleIcon, CheckCircleIcon, CheckIcon, XSquareIcon } from '../../../../assets/svgIcons'
import { UserDropdown } from '../../../../components/nav/style'
import LandingLayout from '../../../../layouts/landing.layout'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, TopBtn, Wrapper } from '../../../../styles/view.style'

const ProjectView = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [projectDetails, setProjectDetails] = useState({})

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
                    <button onClick={() => router.push("/dashboard/projects/cancel")}><XSquareIcon /><span>Cancel Campaign</span></button>
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
                <Milestone>
                  <MDetails>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia</MDetails>
                  <MStatus>Delivered</MStatus>
                  <MDone>
                    <button>
                      <Image src="/check-square.svg" height={24} width={24}/>
                    </button>
                  </MDone>
                </Milestone>
                <Milestone>
                  <MDetails>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia</MDetails>
                  <MStatus>Delivered</MStatus>
                  <MDone>
                    <button>
                      <Image src="/check-square.svg" height={24} width={24}/>
                    </button>
                  </MDone>
                </Milestone>
                <Milestone>
                  <MDetails>Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia</MDetails>
                  <MStatus>Delivered</MStatus>
                  <MDone>
                    <button>
                      <Image src="/check-square.svg" height={24} width={24}/>
                    </button>
                  </MDone>
                </Milestone>
              </MilestoneList>
            </Milestones>
            <ControlContainer>
              <button>Report Account</button>
              <button onClick={() => router.push("/dashboard/projects/completed")}><span><CheckIcon /></span> Mark As Completed</button>
            </ControlContainer>
          </Bottom>
        </Container>
      </Wrapper>
    </OuterContainer>
  )
}
ProjectView.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default ProjectView