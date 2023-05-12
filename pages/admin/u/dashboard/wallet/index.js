import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../../layouts/admin.layout'
import { ActionBtn, Checkbox, Container, Table, TableContent, TableWrapper, TBody, Td, Th, THead, Tr, TrH, TabBtn, Tabs, TableFooter, Pagination, NavBtn, Pages, PageBtn } from '../../../../../styles/connect-pages.style'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../../app/reducers/status';
import info from "../../../../../assets/info.svg";
import { useQuery } from '@tanstack/react-query';
import { getSingleUser, getWalletSummary, getWalletTransactions, getWithdrawalRequests } from '../../../../../api/admin'
import { ChevronLeft, ChevronRight } from '../../../../../assets/svgIcons';
import { WelcomeHeading } from '../../../../../styles/dashboard';
import { useRouter } from 'next/router';
import Image from 'next/image';


const SingleWallet = () => {
  const [currentTab, setCurrentTab] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const router = useRouter();
  const [walletRq, setWalletRq] = useState({
    data: []
  })
    // const { data: walletData, refetch: refetchWallet } = useQuery(["get-single-wallet"], async () => {
    //     return await getWalletSummary(id);
    // }, {
    //     enabled: false,
    //     staleTime: Infinity,
    //     retry: false,
    //     onSuccess(res) {
    //         dispatch(setLoading(false));
    //         if(res.data.data) {
    //             setUser(res.data.data);
    //         }
    //     },
    //     onError() {
    //         dispatch(setLoading(false))
    //     }
    // }); 
    const { data: walletRqData, refetch: refetchWalletRq } = useQuery(["get-wallet-requests"], async () => {
        return await getWithdrawalRequests(pageUrl, currentTab);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            if(res.data.data) {
                setWalletRq(res.data.data);
            }
        },
        onError() {
            dispatch(setLoading(false))
        }
    }); 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    refetchWalletRq();
  }, [currentTab])
  
  
  return (
    <Container>
        <div>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="border border-[#EAEAEB] bg-white hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
                <div className="border-b">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Total Wallet Volume</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ 0
                    </h1>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Total Wallet Withdrawal</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ 0
                    </h1>
                </div>
                </div>
                <div className="border border-[#EAEAEB] bg-white hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
                <div className="border-b">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Total Wallet Deposits</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ 0
                    </h1>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Total Escrow Volume</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ 0
                    </h1>
                </div>
                </div>
                <div className="border border-[#EAEAEB] bg-white hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
                <div className="border-b">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Total Available Funds</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ 0
                    </h1>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">
                        Withdrawn to date: ₦ 0
                    </p>
                    <Image src={info} alt="info" />
                    </div> 
                </div>
                </div>
            </div>
            <WelcomeHeading style={{ marginTop: "40px", fontSize: "20px" }}>
                Withdrawal Requests
            </WelcomeHeading>
            <div style={{ marginTop: "5px" }}>
                <Tabs>
                    <TabBtn isActive={currentTab === ""} onClick={() => setCurrentTab("")}>All</TabBtn>
                    <TabBtn isActive={currentTab === "Approved"} onClick={() => setCurrentTab("Approved")}>Approved</TabBtn>
                    <TabBtn isActive={currentTab === "Pending"} onClick={() => setCurrentTab("Pending")}>Pending</TabBtn>
                    <TabBtn isActive={currentTab === "Cancelled"} onClick={() => setCurrentTab("Cancelled")}>Cancelled</TabBtn>
                    <TabBtn isActive={currentTab === "Completed"} onClick={() => setCurrentTab("Completed")}>Completed</TabBtn>
                </Tabs>
                    <TableWrapper style={{ marginTop: "20px" }}>
                        <TableContent>
                            <Table>
                                <THead>
                                    <TrH>
                                        <Th cellWidth="120px">
                                            Date
                                        </Th>
                                        <Th cellWidth="170px">Amount</Th>
                                        <Th cellWidth="150px">Reference</Th>
                                        <Th cellWidth="150px">Remark</Th>
                                        <Th cellWidth="100px">Status</Th>
                                        <Th cellWidth="150px">Action</Th>
                                    </TrH>
                                </THead>
                                <TBody>
                                    {
                                        walletRq?.data.length ? (
                                        walletRq?.data.map((val, i) => (
                                            <Tr key={i}>
                                                <Td cellWidth="120px">
                                                {(new Date(val.created_at)).toDateString()}
                                                </Td>
                                                <Td cellWidth="170px">{val.currency} {val.amount}</Td>
                                                <Td cellWidth="150px">{val.reference}</Td>
                                                <Td cellWidth="150px">{val.remark}</Td>
                                                <Td cellWidth="100px">{val.status}</Td>
                                                <Td cellWidth="150px">
                                                    {val.status === "Pending" ? <ActionBtn onClick={() => {}}>Approve</ActionBtn> : null }
                                                    <ActionBtn onClick={() => router.push(`/admin/u/dashboard/accounts/${val.user_id}`)}>View User</ActionBtn>
                                                </Td>
                                            </Tr>
                                        )))
                                        : <div className="grid place-content-center py-10">No Request</div>
                                    }
                                </TBody>
                            </Table>
                        </TableContent>
                        <TableFooter>
                            <p>Showing {((walletRq.current_page - 1) * walletRq.per_page) + walletRq.data.length} of {walletRq.total}</p>
                            <Pagination>
                                <NavBtn onClick={() => walletRq.current_page.prev_page_url && setPageUrl(walletRq.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                                    <ChevronLeft />
                                </NavBtn>
                                <Pages>
                                    <PageBtn activePage={true}>{walletRq.current_page}</PageBtn>
                                </Pages>
                                <NavBtn onClick={() => walletRq.current_page.next_page_url && setPageUrl(walletRq.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                                    <ChevronRight />
                                </NavBtn>
                            </Pagination>
                        </TableFooter>
                    </TableWrapper>
            </div>
        </div>
    </Container>
  )
}
SingleWallet.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default SingleWallet