import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserType, setError, setLoading } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import { BagIcon, ChevronLeft, ChevronRight, HashTagIcon, SettingsIcon, WalletIcon } from '../../assets/svgIcons'
import LandingLayout from '../../layouts/landing.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../styles/connect-pages.style'
import { Card, CardsWrapper, ChartContainer, WelcomeHeading } from '../../styles/dashboard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query'
import { getCampaigns } from '../../api/campaigns'
import { getServices } from '../../api/influencer'
import { useRouter } from 'next/router'

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
    const data = [
        {
          name: 'Work A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Work B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Work C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Work D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Work E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Work F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Work G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      const [campaignList, setCampaignList] = useState({
        data: [],
      });
      const router = useRouter();
      const [projectList, setProjectList] = useState({
        data: [],
      });
      const { data: projectData, refetch: projectRefetch } = useQuery(["get-projects"], async () => {
            return await getProjects();
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
                dispatch(setError({error: true, message: "An error occured"}));
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
                dispatch(setError({error: true, message: "An error occured"}));
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
                Welcome <span>{userDetails && userDetails.firstname}</span>,
            </WelcomeHeading>
            <CardsWrapper>
                <Card>
                    <h3>Wallet Balance</h3>
                    <h1>₦ 0.00</h1>
                    <WalletIcon />
                </Card>
                {
                    (currentAcctType === "Business Owner" || (currentAcctType === "Influencer"))&& (
                        <Card>
                            <h3>No of Campaigns</h3>
                            <h1>{campaignData?.data?.data.total}</h1>
                            <HashTagIcon />
                        </Card>
                    )
                }
                {
                    ((currentAcctType === "Business Owner") || (currentAcctType === "Creator"))  && (
                        <Card>
                            <h3>No of Projects</h3>
                            <h1>0</h1>
                            <BagIcon />
                        </Card>
                    )
                }
                {
                   ((currentAcctType === "Creator") ||  (currentAcctType === "Influencer")) && (
                        <Card>
                            <h3>No of Services</h3>
                            <h1>{serviceData?.data?.data.length}</h1>
                            <SettingsIcon />
                        </Card>
                    )
                }
                
            </CardsWrapper>
            <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#12544D" fill="#12544D" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
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
                (currentAcctType === "Influencer") && (
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