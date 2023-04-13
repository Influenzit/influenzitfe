import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserType, setError, setLoading } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import { BagIcon, ChevronLeft, ChevronRight, HashTagIcon, SettingsIcon, WalletIcon } from '../../assets/svgIcons'
import LandingLayout from '../../layouts/landing.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, WelcomeModal, Wrapper } from '../../styles/connect-pages.style'
import { AEmptyCard, BizCard, CampaignCard, Card, CardsWrapper, ChartContainer, EmptyCard, List, ListingWrapper, ProjectCard, ProjectDetails, ReferralCode, Status, UserMiniCard, WelcomeHeading } from '../../styles/dashboard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query'
import { getCampaigns } from '../../api/campaigns'
import { getServices } from '../../api/influencer'
import { getProjects } from '../../api/projects'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UpdateModal } from '../../styles/view.style'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const user = useSelector(getUser);
  const currentAcctType = useSelector(getUserType);
  const [userDetails, setUserDetails] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const dispatch = useDispatch();
    useEffect(() => {
      if (user) {
        setUserDetails(user);
        if(currentAcctType === "Influencer" && !user?.account?.account_setup) {
            setShowPrompt(true);
        }
      }
    }, [user, currentAcctType]);
      const [campaignList, setCampaignList] = useState({
        data: [],
      });
      const router = useRouter();
      const [projectList, setProjectList] = useState({
        data: [],
      });
      const { data: projectData, refetch: projectRefetch } = useQuery(["get-projects"], async () => {
            return await getProjects("");
        }, {
            enabled: false,
            staleTime: Infinity,
            retry: false,
            onSuccess(res) {
                dispatch(setLoading(false));
                setProjectList(res.data.data);
            },
            onError(res) {
                dispatch(setLoading(false));
                // if((currentAcctType === "Business Owner") || (currentAcctType === "Creator")) {
                //     dispatch(setError({error: true, message: "An error occured"}));
                // }
            } 
        });
      const { data: campaignData, refetch } = useQuery(["get-campaigns"], async () => {
            return await getCampaigns("");
        }, {
            enabled: false,
            staleTime: Infinity,
            retry: false,
            onSuccess(res) {
                dispatch(setLoading(false));
                setCampaignList(res.data.data);
            },
            onError(res) {
                dispatch(setLoading(false));
                // if((currentAcctType === "Business Owner") || (currentAcctType === "Influencer")) {
                //     dispatch(setError({error: true, message: "An error occured"}));
                // }
            } 
        });
        const handleReferralCopy = () => {
            navigator.clipboard.writeText(`${location.host}/register?referral_code=${user?.referral_code?? ""}`);
            toast.success("Referral link copied to clipboard", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
        const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-services"], async () => {
            return await getServices();
        }, {
            enabled: false,
            staleTime: Infinity
        });
        useEffect(() => {
            refetch();
            refetchServiceData();
            projectRefetch();
        }, [])
    
  return (
    <Container>
        {
            showPrompt && (
                <UpdateModal>
                    <WelcomeModal>
                        <div>
                            <button onClick={() => setShowPrompt(false)}><Image src="/cancel.svg" alt="" height={14} width={14} /></button>
                        </div>
                        <Image src="/congrat.svg" alt="" height={110} width={110}/>
                        <h2>Welcome to Influenzit</h2>
                        <p>You need to complete your influencer profile in order to start using the platform.</p>
                        <div>
                            <button onClick={() => router.push("/dashboard/complete-profile")}>Complete Profile</button>
                        </div>
                    </WelcomeModal>
                </UpdateModal>
            )
        }
        <Wrapper>
            <WelcomeHeading>
                Hello {userDetails && userDetails.name}
            </WelcomeHeading>
            <ReferralCode>
                <p>Referral Code: <span>{user?.referral_code ?? ""}</span> </p>
                <button onClick={handleReferralCopy}>Copy Link</button>
            </ReferralCode>
            {
                (currentAcctType === "Business Owner") && (
                    <BizCard>
                        <h3>Complete your Business Profile</h3>
                        <p>Before you create your first campaign or project, you&apos;ll need to complete your business information.</p>
                        <Link href="/">Complete profile</Link>
                    </BizCard>
                )
            }
            {/* {
              (currentAcctType === "Business Owner" || (currentAcctType === "Creator")) && (

                <TableWrapper>
                    <TableHeader>
                        <h2>Projects</h2>
                    </TableHeader>
                    <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                    <Checkbox>
                                    </Checkbox>
                                </Th>
                                <Th cellWidth="500px">Creator</Th>
                                <Th cellWidth="150px">Start Date</Th>
                                <Th cellWidth="150px">Duration</Th>
                                <Th cellWidth="120px">Status</Th>
                                <Th cellWidth="120px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                projectList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="500px">{val.provider.firstname} {val.provider.lastname}</Td>
                                        <Td cellWidth="150px">{val.start_date ?? "Not specified"}</Td>
                                        <Td cellWidth="150px">{val.duration_count ?? "Not specified"}</Td>
                                        <Td cellWidth="120px">{val.status}</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn onClick={() => router.push(`/dashboard/projects/view/${val.id}`)}>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                    </TableContent>
                </TableWrapper>
              )  
            } */}
            {
              ((currentAcctType === "Influencer")) && (
                <ListingWrapper>
                    <h3 id="h3">Active Campaigns</h3>
                    {
                        campaignList.data.length ? (
                            <List>
                               { 
                                campaignList.data.map((val, i) => (
                                    <ProjectCard key={i}>
                                        <UserMiniCard>
                                            <div>
                                                <h4>{val.provider.name}</h4>
                                                <p>{val.provider.email}</p>
                                                <div id="social">
                                                    <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                                                </div>
                                                <div id="star">
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <span>5.0</span>
                                                </div>
                                            </div>
                                        </UserMiniCard>
                                        <ProjectDetails>
                                            <div id="img">
                                                <Image src="/dog.png" layout="fill" objectFit="cover" objectPosition="center"/>
                                            </div>
                                            <div>
                                                <h4>{val.title}</h4>
                                                <p>{val.description}</p>
                                            </div>
                                        </ProjectDetails>
                                        <Status inProgress={val.status !== "Completed"}>
                                            <h3>STATUS</h3>
                                            <div><span></span> {val.status}</div>
                                        </Status>
                                    </ProjectCard>
                                ))
                               }
                            </List>
                        ) : (
                            <AEmptyCard>
                                <div>
                                    <h2>Launch your first campaign</h2>
                                    <p>Find the right influencers with correct metrics, keep track of your campaign performance and complete payments seamlessly.</p>
                                    <Link href="/" passHref>
                                        <a>
                                            <span>Create Campaign</span> <Image src="/arrow-w.svg" alt="arrow" height={14} width={14}/>
                                        </a>
                                    </Link>
                                </div>
                                <Image src="/empty-p.png" alt="" height={150} width={250}/>
                            </AEmptyCard>
                        )
                    }
                </ListingWrapper>
              )  
            }
            {
              (currentAcctType === "Business Owner") && (
                <ListingWrapper>
                    <h3 id="h3">Active Campaigns</h3>
                    {
                        campaignList.data.length ? (
                            <List>
                               { 
                                campaignList.data.map((val, i) => (
                                    <ProjectCard key={i}>
                                        <UserMiniCard>
                                            <div>
                                                <h4>{val.provider.name}</h4>
                                                <p>{val.provider.email}</p>
                                                <div id="social">
                                                    <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                                                    <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                                                </div>
                                                <div id="star">
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                    <span>5.0</span>
                                                </div>
                                            </div>
                                        </UserMiniCard>
                                        <ProjectDetails>
                                            <div id="img">
                                                <Image src="/dog.png" layout="fill" objectFit="cover" objectPosition="center"/>
                                            </div>
                                            <div>
                                                <h4>{val.title}</h4>
                                                <p>{val.description}</p>
                                            </div>
                                        </ProjectDetails>
                                        <Status inProgress={val.status !== "Completed"}>
                                            <h3>STATUS</h3>
                                            <div><span></span> {val.status}</div>
                                        </Status>
                                    </ProjectCard>
                                ))
                               }
                            </List>
                        ) : (
                            <AEmptyCard>
                                <div>
                                    <h2>Launch your first Campaign</h2>
                                    <p>Find the right influencers with correct metrics, keep track of your campaign performance and complete payments seamlessly.</p>
                                    <Link href="/" passHref>
                                        <a>
                                            <span>Find Campaign</span> <Image src="/arrow-w.svg" alt="arrow" height={14} width={14}/>
                                        </a>
                                    </Link>
                                </div>
                                <Image src="/empty-p.png" alt="" height={190} width={290}/>
                            </AEmptyCard>
                        )
                    }
                </ListingWrapper>
              )  
            }
            {/* {
                (currentAcctType === "Business Owner" || currentAcctType === "Influencer") && (
                    <TableWrapper>
                        <TableHeader>
                            <h2>My Campaigns</h2>
                        </TableHeader>
                        <TableContent>
                        <Table>
                            <THead>
                                <TrH>
                                    <Th cellWidth="50px">
                                        <Checkbox>
                                        </Checkbox>
                                    </Th>
                                    <Th cellWidth="500px">Influencer</Th>
                                    <Th cellWidth="150px">Start Date</Th>
                                    <Th cellWidth="150px">Duration</Th>
                                    <Th cellWidth="120px">Status</Th>
                                    <Th cellWidth="120px">Action</Th>
                                </TrH>
                            </THead>
                            <TBody>
                                {
                                    campaignList.data.map((val, i) => (
                                        <Tr key={i}>
                                            <Td cellWidth="50px">
                                                <Checkbox>
                                                </Checkbox>
                                            </Td>
                                            <Td cellWidth="500px">{val.provider.firstname} {val.provider.lastname}</Td>
                                            <Td cellWidth="150px">{val.start_date ? (new Date(val.start_date)).toDateString() : "Not specified"}</Td>
                                            <Td cellWidth="150px">{val.duration_count ?? "Not specified"} {val.duration_type}</Td>
                                            <Td cellWidth="120px">{val.status}</Td>
                                            <Td cellWidth="120px">
                                                <ActionBtn onClick={() => router.push(`/dashboard/campaigns/view/${val.id}`)}>View</ActionBtn>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </TBody>
                        </Table>
                        </TableContent>
                    </TableWrapper>
                )
            } */}
             {
              (currentAcctType === "Business Owner" || (currentAcctType === "Creator")) && (
                <ListingWrapper>
                    <h3 id="h3">Active Projects</h3>
                    {
                        projectList.data.length ? (
                            <List>
                                {
                                    projectList.data.map((val, i) => (
                                        <ProjectCard key={i}>
                                            <ProjectDetails>
                                                <div id="img">
                                                    <Image src="/dog.png" layout="fill" objectFit="cover" objectPosition="center"/>
                                                </div>
                                                <div>
                                                    <h4>{val.title}</h4>
                                                    <p>{val.description}</p>
                                                </div>
                                            </ProjectDetails>
                                            <UserMiniCard>
                                                <div id="pic">
                                                    <Image src={val.provider.profile_pic} layout="fill" objectFit="cover" objectPosition="center"/>
                                                </div>
                                                <div>
                                                    <h4>{val.provider.name}</h4>
                                                    <p>{val.provider.email}</p>
                                                    <div id="social">
                                                        <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                                                        <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                                                        <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                                                        <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                                                        <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                                                    </div>
                                                    <div id="star">
                                                        <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                        <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                        <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                        <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                        <Image src="/star-p.svg" alt="" height={8} width={8}/>
                                                        <span>5.0</span>
                                                    </div>
                                                </div>
                                            </UserMiniCard>
                                            <Status inProgress={val.status !== "Completed"}>
                                                <h3>STATUS</h3>
                                                <div><span></span> {val.status}</div>
                                            </Status>
                                        </ProjectCard>
                                    ))
                                }
                            </List>
                        ) : (
                            <AEmptyCard>
                                <div>
                                    <h2>Launch your first project</h2>
                                    <p>Find the right influencers with correct metrics, keep track of your campaign performance and complete payments seamlessly.</p>
                                    <Link href="/" passHref>
                                        <a>
                                            <span>Find Creators</span> <Image src="/arrow-w.svg" alt="arrow" height={14} width={14}/>
                                        </a>
                                    </Link>
                                </div>
                                <Image src="/empty-p.png" alt="" height={190} width={290}/>
                            </AEmptyCard>
                        )
                    }
                </ListingWrapper>
              )  
            }
        </Wrapper>
    </Container>
  )
}

Dashboard.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Dashboard