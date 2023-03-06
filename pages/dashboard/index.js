import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserType, setError, setLoading } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import { BagIcon, ChevronLeft, ChevronRight, HashTagIcon, SettingsIcon, WalletIcon } from '../../assets/svgIcons'
import LandingLayout from '../../layouts/landing.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../styles/connect-pages.style'
import { BizCard, Card, CardsWrapper, ChartContainer, ListingWrapper, WelcomeHeading } from '../../styles/dashboard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query'
import { getCampaigns } from '../../api/campaigns'
import { getServices } from '../../api/influencer'
import { getProjects } from '../../api/projects'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Dashboard = () => {
  const user = useSelector(getUser);
  const currentAcctType = useSelector(getUserType);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
    useEffect(() => {
      if (user) {
        setUserDetails(user);
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
        <Wrapper>
            <WelcomeHeading>
                Hello {userDetails && userDetails.name}
            </WelcomeHeading>
            {
                (currentAcctType === "Business Owner") && (
                    <BizCard>
                        <h3>Complete your Business Profile</h3>
                        <p>Before you create your first campaign or project, you&apos;ll need to complete your business information.</p>
                        <Link href="/">Complete profile</Link>
                    </BizCard>
                )
            }
            {
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
            }
             {
              (currentAcctType === "Business Owner" || (currentAcctType === "Influencer")) && (
                <ListingWrapper>
                    <h3>Active Campaigns</h3>

                </ListingWrapper>
              )  
            }
            {
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
            }
             {
              (currentAcctType === "Business Owner" || (currentAcctType === "Creator")) && (
                <ListingWrapper>
                    <h3>Active Projects</h3>
                    
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