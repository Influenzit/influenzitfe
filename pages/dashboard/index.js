import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserType } from '../../app/reducers/status'
import { getUser } from '../../app/reducers/user'
import { BagIcon, ChevronLeft, ChevronRight, HashTagIcon, SettingsIcon, WalletIcon } from '../../assets/svgIcons'
import LandingLayout from '../../layouts/landing.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../styles/connect-pages.style'
import { Card, CardsWrapper, ChartContainer, WelcomeHeading } from '../../styles/dashboard'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const user = useSelector(getUser);
  const currentAcctType = useSelector(getUserType);
  const [userDetails, setUserDetails] = useState(null);
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
                            <h1>0</h1>
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
                            <h1>0</h1>
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
                                    <Th cellWidth="15px">
                                    </Th>
                                    <Th cellWidth="300px">Creator</Th>
                                    <Th cellWidth="200px">Project Type</Th>
                                    <Th cellWidth="150px">Start Date</Th>
                                    <Th cellWidth="150px">Duration</Th>
                                    <Th cellWidth="120px">Status</Th>
                                    <Th cellWidth="120px">Action</Th>
                                </TrH>
                            </THead>
                            <TBody>
                                <Tr>
                                    <Td cellWidth="15px">
                                    </Td>
                                    <Td cellWidth="300px">Ezekiel Alawode</Td>
                                    <Td cellWidth="200px">Instagram</Td>
                                    <Td cellWidth="150px">Sep 31, 2022</Td>
                                    <Td cellWidth="150px">2 Months</Td>
                                    <Td cellWidth="120px">Active</Td>
                                    <Td cellWidth="120px">
                                        <ActionBtn>View</ActionBtn>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td cellWidth="15px">
                                    </Td>
                                    <Td cellWidth="300px">Ezekiel Alawode</Td>
                                    <Td cellWidth="200px">Instagram</Td>
                                    <Td cellWidth="150px">Sep 31, 2022</Td>
                                    <Td cellWidth="150px">2 Months</Td>
                                    <Td cellWidth="120px">Active</Td>
                                    <Td cellWidth="120px">
                                        <ActionBtn>View</ActionBtn>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td cellWidth="15px">
                                    </Td>
                                    <Td cellWidth="300px">Ezekiel Alawode</Td>
                                    <Td cellWidth="200px">Instagram</Td>
                                    <Td cellWidth="150px">Sep 31, 2022</Td>
                                    <Td cellWidth="150px">2 Months</Td>
                                    <Td cellWidth="120px">Active</Td>
                                    <Td cellWidth="120px">
                                        <ActionBtn>View</ActionBtn>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td cellWidth="15px">
                                    </Td>
                                    <Td cellWidth="300px">Ezekiel Alawode</Td>
                                    <Td cellWidth="200px">Instagram</Td>
                                    <Td cellWidth="150px">Sep 31, 2022</Td>
                                    <Td cellWidth="150px">2 Months</Td>
                                    <Td cellWidth="120px">Active</Td>
                                    <Td cellWidth="120px">
                                        <ActionBtn>View</ActionBtn>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td cellWidth="15px">
                                    </Td>
                                    <Td cellWidth="300px">Ezekiel Alawode</Td>
                                    <Td cellWidth="200px">Instagram</Td>
                                    <Td cellWidth="150px">Sep 31, 2022</Td>
                                    <Td cellWidth="150px">2 Months</Td>
                                    <Td cellWidth="120px">Active</Td>
                                    <Td cellWidth="120px">
                                        <ActionBtn>View</ActionBtn>
                                    </Td>
                                </Tr>
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
                                        <Th cellWidth="15px">
                                        </Th>
                                        <Th cellWidth="300px">Influencer</Th>
                                        <Th cellWidth="200px">Channel</Th>
                                        <Th cellWidth="150px">Start Date</Th>
                                        <Th cellWidth="150px">Duration</Th>
                                        <Th cellWidth="120px">Status</Th>
                                        <Th cellWidth="120px">Action</Th>
                                    </TrH>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td cellWidth="15px">
                                        </Td>
                                        <Td cellWidth="300px">Ezekiel Alawode</Td>
                                        <Td cellWidth="200px">Instagram</Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="150px">2 Months</Td>
                                        <Td cellWidth="120px">Active</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="15px">
                                        </Td>
                                        <Td cellWidth="300px">Ezekiel Alawode</Td>
                                        <Td cellWidth="200px">Instagram</Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="150px">2 Months</Td>
                                        <Td cellWidth="120px">Active</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="15px">
                                        </Td>
                                        <Td cellWidth="300px">Ezekiel Alawode</Td>
                                        <Td cellWidth="200px">Instagram</Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="150px">2 Months</Td>
                                        <Td cellWidth="120px">Active</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="15px">
                                        </Td>
                                        <Td cellWidth="300px">Ezekiel Alawode</Td>
                                        <Td cellWidth="200px">Instagram</Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="150px">2 Months</Td>
                                        <Td cellWidth="120px">Active</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="15px">
                                        </Td>
                                        <Td cellWidth="300px">Ezekiel Alawode</Td>
                                        <Td cellWidth="200px">Instagram</Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="150px">2 Months</Td>
                                        <Td cellWidth="120px">Active</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn>View</ActionBtn>
                                        </Td>
                                    </Tr>
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