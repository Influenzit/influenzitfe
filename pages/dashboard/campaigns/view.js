import Image from 'next/image'
import React from 'react'
import { CheckIcon } from '../../../assets/svgIcons'
import LandingLayout from '../../../layouts/landing.layout'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, Wrapper } from '../../../styles/view.style'

const CampaignView = () => {
  return (
    <OuterContainer>
      <Wrapper>
        <Container>
          <Top>
            <button>
              <Image src="/arrow-left.svg" height={24} width={24}/>
              <span>My Campaigns</span>
            </button>
            <button>
              <Image src="/more-vertical.svg" height={24} width={24}/>
            </button>
          </Top>
          <Bottom>
            <DetailsContainer>
              <ImageWrapper>
                <Image src="/p-image.png" layout='fill'  objectFit='cover' objectPosition='center'/>
              </ImageWrapper>
              <Details>
                <h2>Instagram campaign for Product X</h2>
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
              <button><span><CheckIcon /></span> Mark As Completed</button>
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