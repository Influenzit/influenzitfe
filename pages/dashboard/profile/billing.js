import React from 'react'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import plusCircleIcon from '../../../assets/plus-circle.svg'
import { CAmount, Container, Content, CustomContent, FundBtn, Heading, WalletCard, WalletCardWrapper, Wrapper } from '../../../styles/profile.style'
import Image from 'next/image'
import { FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableWrapper, TBody, Td, Th, THead, Tr, TrH } from '../../../styles/connect-pages.style'
import { ChevronLeft, ChevronRight } from '../../../assets/svgIcons'

const Billing = () => {
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <CustomContent>
                <Content>
                    <Heading>
                        <h2>Business Wallet</h2>
                    </Heading>
                    <WalletCardWrapper>
                        <WalletCard>
                            <p>Wallet Balance</p>
                            <h3>₦300,000.00</h3>
                        </WalletCard>
                        <WalletCard>
                            <p>Total Spent</p>
                            <h3>₦300,000.00</h3>
                        </WalletCard>
                        <WalletCard>
                            <p>Escrow Balance</p>
                            <h3>₦300,000.00</h3>
                        </WalletCard>
                        <FundBtn>
                            <Image src={plusCircleIcon} alt="plus-circle" height={26} width={26}/>
                            <p>Fund Wallet</p>
                        </FundBtn>
                    </WalletCardWrapper>
                </Content>
                <Content>
                    <Heading>
                        <h2>Wallet Transactions</h2>
                    </Heading>
                    <TableWrapper>
                        <TableControls>
                            <SearchContainer>
                                <input type="text" placeholder="Search by influencer"/>
                                <button>
                                    <Image src="/search-b.svg" alt="" height={22} width={22}/>
                                </button>
                            </SearchContainer>
                            <FilterContainer>
                                <button><Image src="/filter.svg" alt="" height={20} width={20} /><span>Filter</span></button>
                                <button><Image src="/upload.svg" alt="" height={20} width={20} /><span>Export</span></button>
                                <button>Find Influencers</button>
                            </FilterContainer>
                        </TableControls>
                        <TableContent>
                            <Table>
                                <THead>
                                    <TrH>
                                        <Th cellWidth="20px">
                                        </Th>
                                        <Th cellWidth="150px">Date</Th>
                                        <Th cellWidth="300px">Description</Th>
                                        <Th cellWidth="200px">Trasaction ID</Th>
                                        <Th cellWidth="110px">Status</Th>
                                        <Th cellWidth="150px">Amount</Th>
                                    </TrH>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td cellWidth="20px">
                                        </Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="300px">Paid for campaign</Td>
                                        <Td cellWidth="200px">31DB61B3D651E3C</Td>
                                        <Td cellWidth="110px">Success</Td>
                                        <Td cellWidth="150px"><CAmount status="success">₦70,000</CAmount></Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="20px">
                                        </Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="300px">Paid for campaign</Td>
                                        <Td cellWidth="200px">31DB61B3D651E3C</Td>
                                        <Td cellWidth="110px">Failed</Td>
                                        <Td cellWidth="150px"><CAmount status="failed">₦70,000</CAmount></Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="20px">
                                        </Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="300px">Paid for campaign</Td>
                                        <Td cellWidth="200px">31DB61B3D651E3C</Td>
                                        <Td cellWidth="110px">Pending</Td>
                                        <Td cellWidth="150px"><CAmount status="pending">₦70,000</CAmount></Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="20px">
                                        </Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="300px">Paid for campaign</Td>
                                        <Td cellWidth="200px">31DB61B3D651E3C</Td>
                                        <Td cellWidth="110px">Success</Td>
                                        <Td cellWidth="150px"><CAmount status="success">₦70,000</CAmount></Td>
                                    </Tr>
                                    <Tr>
                                        <Td cellWidth="20px">
                                        </Td>
                                        <Td cellWidth="150px">Sep 31, 2022</Td>
                                        <Td cellWidth="300px">Paid for campaign</Td>
                                        <Td cellWidth="200px">31DB61B3D651E3C</Td>
                                        <Td cellWidth="110px">Success</Td>
                                        <Td cellWidth="150px"><CAmount status="success">₦70,000</CAmount></Td>
                                    </Tr>
                                </TBody>
                            </Table>
                        </TableContent>
                        <TableFooter>
                            <p>Showing 10 of 500</p>
                            <Pagination>
                                <NavBtn>
                                    <ChevronLeft />
                                </NavBtn>
                                <Pages>
                                    <PageBtn activePage={true}>1</PageBtn>
                                    <PageBtn>2</PageBtn>
                                    <PageBtn>3</PageBtn>
                                    <PageBtn>4</PageBtn>
                                    -
                                    <PageBtn>50</PageBtn>
                                </Pages>
                                <NavBtn>
                                    <ChevronRight />
                                </NavBtn>
                            </Pagination>
                        </TableFooter>
                    </TableWrapper>
                </Content>
            </CustomContent>
        </Wrapper>
    </Container>
  )
}
Billing.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Billing