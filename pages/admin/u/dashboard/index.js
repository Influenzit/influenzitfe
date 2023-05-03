import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserType, setError, setLoading, setSuccess } from '../../../../app/reducers/status'
import { getUser } from '../../../../app/reducers/user'
import { BagIcon, ChevronLeft, ChevronRight, HashTagIcon, SettingsIcon, UserIcon, WalletIcon } from '../../../../assets/svgIcons'
import AdminLayout from '../../../../layouts/admin.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../../styles/connect-pages.style'
import { Card, CardsWrapper, ChartContainer, WelcomeHeading } from '../../../../styles/dashboard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCampaigns } from '../../../../api/campaigns'
import { getServices } from '../../../../api/influencer'
import { useRouter } from 'next/router'
import { createNiche, deleteNiche, fetchDashboardStats, getAllCampaigns, getAllNiches, getAllUsers } from '../../../../api/admin'
import { AddSocialBtn, InputContainer } from '../../../../styles/profile.style'
import { FormContainer, UpdateModal } from '../../../../styles/view.style'

const Dashboard = () => {
  const user = useSelector(getUser);
  const currentAcctType = useSelector(getUserType);
  const [userDetails, setUserDetails] = useState(null);
  const [nicheName, setNicheName] = useState("");
  const [nicheDescription, setNicheDescription] = useState("");
  const [showAddNiche, setShowAddNiche] = useState(false);
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
      const [userList, setUserList] = useState({
        data: [],
      });
      const [nicheList, setNicheList] = useState({
        data: [],
      })
      const router = useRouter();
      const [projectList, setProjectList] = useState({
        data: [],
      });
      const { data: dashboardData, refetch } = useQuery(["get-admin-stats"], async () => {
            return await fetchDashboardStats();
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
      const { data: campaignData, refetch: refetchCampaignData } = useQuery(["get-admin-campaigns"], async () => {
            return await getAllCampaigns();
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
            } 
        });
        const { data: usersData, refetch: refetchUsersData } = useQuery(["get-users"], async () => {
            return await getAllUsers();
        }, {
            enabled: false,
            staleTime: Infinity,
            retry: false,
            onSuccess(res) {
                dispatch(setLoading(false));
                setUserList(res.data.data);
            },
            onError(res) {
                dispatch(setLoading(false));
            } 
        });
        const { data: nicheData, refetch: refetchNicheData } = useQuery(["get-admin-Niches"], async () => {
            return await getAllNiches();
        }, {
            enabled: false,
            staleTime: Infinity,
            retry: false,
            onSuccess(res) {
                dispatch(setLoading(false));
                setNicheList(res.data);
            },
            onError(res) {
                dispatch(setLoading(false));
            } 
        });
        const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-services"], async () => {
            return await getServices();
        }, {
            enabled: false,
            staleTime: Infinity
        });
        const createNicheMutation = useMutation( nicheData => {
            return createNiche(nicheData);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                refetch();
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    dispatch(setLoading(false));
                    setShowAddNiche(false);
                    setNicheDescription("");
                    setNicheName("");
                    dispatch(setSuccess({success: true,  message: res.message}));
                    refetchNicheData();
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
        const deleteNicheMutation = useMutation( nicheData => {
            return deleteNiche(nicheData.id);
        }, {
            onSuccess(successRes) {
                const res = successRes.data;
                refetch();
                if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                    dispatch(setLoading(false));
                    dispatch(setError({error: true, message: res.message}));
                } else { 
                    dispatch(setLoading(false));
                    setShowAddNiche(false);
                    setNicheDescription("");
                    setNicheName("");
                    dispatch(setSuccess({success: true,  message: res.message}));
                    refetchNicheData();
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
        useEffect(() => {
            refetch();
            refetchCampaignData();
            refetchUsersData();
            refetchNicheData();
        }, [])
        const handleNicheDelete = (id) => {
            dispatch(setLoading(true));
            deleteNicheMutation.mutate({
                id,
            })
        }
        const handleNicheAdd = () => {
            if(nicheName && nicheDescription){
                dispatch(setLoading(true));
                createNicheMutation.mutate({
                    name: nicheName,
                    description: nicheDescription,
                })
            } else {
                dispatch(setError({error: true, message: "Enter required fields"}));
            }
        }
    
  return (
    <Container>
        <Wrapper>
            <WelcomeHeading>
                Welcome <span>{userDetails && userDetails.firstname}</span>,
            </WelcomeHeading>
            <CardsWrapper>
                <Card>
                    <h3>Numbers of Users</h3>
                    <h1>{dashboardData?.data?.data.total_users}</h1>
                    <UserIcon />
                </Card>
                <Card>
                    <h3>No of Campaigns</h3>
                    <h1>{dashboardData?.data?.data.total_campaigns}</h1>
                    <HashTagIcon />
                </Card>
                <Card>
                    <h3>No of Projects</h3>
                    <h1>{dashboardData?.data?.data.total_projects}</h1>
                    <BagIcon />
                </Card>
            </CardsWrapper>
            <CardsWrapper>
                <Card>
                    <h3>No of Services</h3>
                    <h1>{dashboardData?.data?.data.services_count}</h1>
                    <SettingsIcon />
                </Card>
                <Card>
                    <h3>Transactions</h3>
                    <h1>{dashboardData?.data?.data.transactions_count}</h1>
                    <SettingsIcon />
                </Card>
                <Card>
                    <h3>Wallet Volume</h3>
                    <h1>{dashboardData?.data?.data.wallet_volume}</h1>
                    <SettingsIcon />
                </Card>
            </CardsWrapper>
            <TableWrapper style={{ marginBottom: "15px" }}>
                    <TableHeader>
                        <h2>Niches</h2>
                    </TableHeader>
                    <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                    <Checkbox>
                                    </Checkbox>
                                </Th>
                                <Th cellWidth="300px">Name</Th>
                                <Th cellWidth="470px">Description</Th>
                                <Th cellWidth="150px">Created</Th>
                                <Th cellWidth="120px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                nicheList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="300px">{val.name}</Td>
                                        <Td cellWidth="470px">{val.description}</Td>
                                        <Td cellWidth="150px">{val.created_at ? (new Date(val.created_at)).toDateString() : "Not specified"}</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn onClick={() => handleNicheDelete(val.id)}>Delete</ActionBtn>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                    <AddSocialBtn style={{ margin: "10px auto" }} onClick={() => setShowAddNiche(true)}><Image src="/plus.svg" alt="plus" height={22} width={22} /><span>Add Niche</span></AddSocialBtn>
                    </TableContent>
                </TableWrapper>
                 <TableWrapper style={{ marginBottom: "15px" }}>
                    <TableHeader>
                        <h2>New Users</h2>
                    </TableHeader>
                    <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                    <Checkbox>
                                    </Checkbox>
                                </Th>
                                <Th cellWidth="400px">Fullname</Th>
                                <Th cellWidth="150px">Join Date</Th>
                                <Th cellWidth="250px">Email</Th>
                                <Th cellWidth="120px">Status</Th>
                                <Th cellWidth="120px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                userList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="400px">{val.firstname} {val.lastname}</Td>
                                        <Td cellWidth="150px">{val.created_at ? (new Date(val.created_at)).toDateString() : "Not specified"}</Td>
                                        <Td cellWidth="250px">{val.email}</Td>
                                        <Td cellWidth="120px">{val.email_verified_at ? "Verified" : "Not Verified"}</Td>
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
                {/* <TableWrapper>
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
                </TableWrapper> */}
                <TableWrapper>
                    <TableHeader>
                        <h2>Campaigns</h2>
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
                                            <ActionBtn onClick={() => router.push(`/admin/u/dashboard/campaigns/view/${val.id}`)}>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                    </TableContent>
                </TableWrapper>
        </Wrapper>
        {showAddNiche &&(
        <UpdateModal>
          <FormContainer>
            <h3>Add Niche</h3>
            <InputContainer>
              <label>Name</label>
              <input
               type="text"
               value={nicheName}
               onChange={(e) => setNicheName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label>Description</label>
              <input
               type="text"
               value={nicheDescription}
               onChange={(e) => setNicheDescription(e.target.value)}
              />
            </InputContainer>
            <button onClick={() => setShowAddNiche(false)}>Go back</button>
            <button onClick={handleNicheAdd}>Add</button>
          </FormContainer>
        </UpdateModal>
      )}
    </Container>
  )
}

Dashboard.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default Dashboard