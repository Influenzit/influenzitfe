import React, { useEffect, useState } from 'react'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import plusCircleIcon from '../../../assets/plus-circle.svg'
import { CAmount, CContent, Container, Content, CustomContent, FundBtn, Heading, WalletCard, WalletCardWrapper, Wrapper } from '../../../styles/profile.style'
import Image from 'next/image'
import { ActionBtn, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableWrapper, TBody, Td, Th, THead, Tr, TrH } from '../../../styles/connect-pages.style'
import { ChevronLeft, ChevronRight } from '../../../assets/svgIcons'
import { getWallet, getWalletTransactions } from '../../../api/wallet'
import { useQuery } from '@tanstack/react-query'
import { moneyStandard } from '../../../helpers/helper'
import { useRouter } from 'next/router'

const Billing = () => {
    const [wallet, setWallet] = useState({});
    const [walletList, setWalletList] = useState([]);
    const router = useRouter();
    const { data: walletData, refetch: refetchWalletData } = useQuery(["get-wallet"], async () => {
        return await getWallet();
    }
    );
    const { data: walletTransData, refetch: refetchWalletTransData } = useQuery(["get-wallet-trans"], async () => {
        return await getWalletTransactions();
    });
    
    useEffect(() => {
        if(walletData){
            setWallet(walletData.data.data);
        }
    }, [walletData])
    useEffect(() => {
        if(walletTransData){
            setWalletList(walletTransData.data.data)
            console.log(walletTransData.data.data);
        }
    }, [walletTransData])
    
  return (
    <Container>
        <Wrapper>
            <CustomContent>
                <CContent>
                    <Heading>
                        <h2>Business Wallet</h2>
                    </Heading>
                    <WalletCardWrapper>
                        <WalletCard>
                            <p>Wallet Balance</p>
                            <h3>₦ {wallet && moneyStandard(wallet?.wallet_balance?.NGN ?? 0)}</h3>
                        </WalletCard>
                        <WalletCard>
                            <p>Total Spent</p>
                            <h3>₦ {wallet && moneyStandard(wallet?.total_spent?.NGN ?? 0)}</h3>
                        </WalletCard>
                        <WalletCard>
                            <p>Escrow Balance</p>
                            <h3>₦ {wallet && moneyStandard(wallet?.escrow_balance?.NGN ?? 0)}</h3>
                        </WalletCard>
                        <FundBtn>
                            <Image src={plusCircleIcon} alt="plus-circle" height={26} width={26}/>
                            <p>Fund Wallet</p>
                        </FundBtn>
                    </WalletCardWrapper>
                </CContent>
                <CContent>
                    <Heading>
                        <h2>Wallet Transactions</h2>
                    </Heading>
                    <TableWrapper>
                        <TableControls>
                            <SearchContainer>
                                <input type="text" placeholder="Search by Transaction ID"/>
                                <button>
                                    <Image src="/search-b.svg" alt="" height={22} width={22}/>
                                </button>
                            </SearchContainer>
                            <FilterContainer>
                                <button><Image src="/filter.svg" alt="" height={20} width={20} /><span>Filter</span></button>
                                <button><Image src="/upload.svg" alt="" height={20} width={20} /><span>Export</span></button>
                                <button style={{ display: "none" }}></button>
                            </FilterContainer>
                        </TableControls>
                        <TableContent>
                            <Table>
                                <THead>
                                    <TrH>
                                        <Th cellWidth="20px">
                                        </Th>
                                        <Th cellWidth="150px">Date</Th>
                                        <Th cellWidth="200px">Description</Th>
                                        <Th cellWidth="150px">Trasaction ID</Th>
                                        <Th cellWidth="110px">Status</Th>
                                        <Th cellWidth="100px">Type</Th>
                                        <Th cellWidth="150px">Amount</Th>
                                        <Th cellWidth="100px">
                                            Action
                                        </Th>
                                    </TrH>
                                </THead>
                                <TBody>
                                    {
                                        walletList?.data?.map((trans, i) => (

                                            <Tr key={i}>
                                                <Td cellWidth="20px">
                                                </Td>
                                                <Td cellWidth="150px">{(new Date(trans.created_at)).toDateString()}</Td>
                                                <Td cellWidth="200px">{trans.remark}</Td>
                                                <Td cellWidth="150px">{trans.txnref}</Td>
                                                <Td cellWidth="110px">{trans.status}</Td>
                                                <Td cellWidth="100px">{trans.txntype}</Td>
                                                <Td cellWidth="150px"><CAmount status={trans.status === "Pending" ? "pending" : trans.status === "Completed" ? "success" : "failed"}>{trans.currency} {moneyStandard(trans.amount)}</CAmount></Td>
                                                <Td cellWidth="100px">
                                                    <ActionBtn onClick={() => router.push(`/dashboard/transaction/${trans.id}`)}>View</ActionBtn>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </TBody>
                            </Table>
                        </TableContent>
                        <TableFooter>
                            <p>Showing {((walletList?.current_page - 1) * walletList?.per_page) + walletList?.data?.length} of {walletList?.total}</p>
                            <Pagination>
                                <NavBtn onClick={() => walletList?.current_page.prev_page_url && setGetUrl(walletList?.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                                    <ChevronLeft />
                                </NavBtn>
                                <Pages>
                                    <PageBtn activePage={true}>{walletList?.current_page}</PageBtn>
                                </Pages>
                                <NavBtn onClick={() => walletList?.current_page.next_page_url && setGetUrl(walletList?.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                                    <ChevronRight />
                                </NavBtn>
                            </Pagination>
                        </TableFooter>
                    </TableWrapper>
                </CContent>
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