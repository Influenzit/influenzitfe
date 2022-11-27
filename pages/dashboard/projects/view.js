import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AlertTriangleIcon, CheckCircleIcon, CheckIcon, XSquareIcon } from '../../../assets/svgIcons'
import { UserDropdown } from '../../../components/nav/style'
import LandingLayout from '../../../layouts/landing.layout'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, TopBtn, Wrapper } from '../../../styles/view.style'

const ProjectView = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
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
                <h2>General Branding for Product X</h2>
                <SubDetails>
                  <div>
                    <Image src="/user-c.svg" height={24} width={24}/>
                    <span>Ezekiel Alawode</span>
                  </div>
                  <div>
                    <Image src="/calendar.svg" height={24} width={24}/>
                    <span>2 Months</span>
                  </div>
                  <div>
                    <Image src="/clock.svg" height={24} width={24}/>
                    <span>Sep. 31, 2022</span>
                  </div>
                </SubDetails>
                <CurrentPackage>
                  <p>Active Package: <span>Basic</span> <Image src="/repeat.svg" height={24} width={24}/></p>
                </CurrentPackage>
                <Desc>
                Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum.
                Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam 
                eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt
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