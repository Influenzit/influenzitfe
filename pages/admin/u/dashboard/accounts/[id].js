import React, { useEffect, useState } from 'react'
import info from "../../../../../assets/info.svg";
import action from "../../../../../assets/action.svg";
import AdminLayout from '../../../../../layouts/admin.layout'
import Image from 'next/image';
import { ActionBtn, Checkbox, Container, Table, TableContent, TableWrapper, TBody, Td, Th, THead, Tr, TrH, TabBtn, Tabs, TableFooter, Pagination, NavBtn, Pages, PageBtn } from '../../../../../styles/connect-pages.style'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../../app/reducers/status';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSingleUser, getWalletRequests, getWalletSummary, getWalletTransactions, verifyUserAccount } from '../../../../../api/admin'
import { WelcomeHeading, ReferralCode } from '../../../../../styles/dashboard';
import { ChevronLeft, ChevronRight } from '../../../../../assets/svgIcons';
import { ActionBtnB } from '../../../../../styles/connect-pages.style';
import { toast } from 'react-toastify'


const SingleWallet = () => {
  const [currentTab, setCurrentTab] = useState("Transactions");
  const [account, setAccount] = useState(null);
  const [pageUrl, setPageUrl] = useState("");
  const [walletTx, setWalletTx] = useState({
    data: []
  })
  const [walletRq, setWalletRq] = useState({
    data: []
  })
  const { data: userData, refetch: refetchUserData } = useQuery(["get-single-account"], async () => {
        return await getSingleUser(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            if(res.data.data) {
                setAccount(res.data.data);
            }
        },
        onError() {
            dispatch(setLoading(false))
        }
    });
    const { data: walletData, refetch: refetchWallet } = useQuery(["get-single-wallet"], async () => {
        return await getWalletSummary(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            if(res.data.data) {
                setAccount(res.data.data);
            }
        },
        onError() {
            dispatch(setLoading(false))
        }
    }); 
    const { data: walletTxData, refetch: refetchWalletTx } = useQuery(["get-single-wallet-transactions"], async () => {
        return await getWalletTransactions(id, pageUrl);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            if(res.data.data) {
                setWalletTx(res.data.data);
            }
        },
        onError() {
            dispatch(setLoading(false))
        }
    });
    const { data: walletRqData, refetch: refetchWalletRq } = useQuery(["get-single-wallet-requests"], async () => {
        return await getWalletRequests(id, pageUrl);
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
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    dispatch(setLoading(true));
    if(id) {
        refetchUserData();
        refetchWallet();
        refetchWalletTx();
        refetchWalletRq();
    }
  }, [id])
  const updateAccountMutation = useMutation(
    (data) => {
      return verifyUserAccount(data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Account verified successfully", {
            position: toast.POSITION.TOP_RIGHT
          });
        refetchUserData();
        dispatch(setLoading(false));
      },
      onError(error) {
        const res = error.response.data;
        dispatch(setLoading(false));
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const verifyAcc = (id) => {
    dispatch(setLoading(true));
    updateAccountMutation.mutate(id);
  }
  
  
  return (
    <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="col-span-3 relative" style={{ height: "150px", width: "150px" }}>
                <Image
                    src={userData?.data.data.user?.profile_pic}
                    alt="avatar"
                    layout='fill'
                    objectFit='cover'
                    objectPosition="center"
                    className="rounded-full"
                />
            </div>
            <WelcomeHeading>
                {userData?.data.data.user?.name}
            </WelcomeHeading>
            <ReferralCode>
                <p><span>{userData?.data.data.user?.email}</span> </p>
            </ReferralCode>
            <div>
                <ActionBtn onClick={() => verifyAcc(id)}>{userData?.data.data.influenzit_verified ? "Disapprove User" : "Approve User" }</ActionBtn>
                <ActionBtnB onClick={() =>router.push(`/admin/u/dashboard/accounts/view/${id}`)}>More Info</ActionBtnB>
            </div>
         </div>
        <div>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="border border-[#EAEAEB] bg-white hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
                <div className="border-b">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Earnings</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ {walletData?.data?.data.total_earnings.NGN}
                    </h1>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Deposit</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ {walletData?.data?.data.deposit_balance.NGN}
                    </h1>
                </div>
                </div>
                <div className="border border-[#EAEAEB] bg-white hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
                <div className="border-b">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Expenses</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ {walletData?.data?.data.total_expenses.NGN}
                    </h1>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Escrow</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ {walletData?.data?.data.incomming_escrow.NGN}
                    </h1>
                </div>
                </div>
                <div className="border border-[#EAEAEB] bg-white hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
                <div className="border-b">
                    <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">Available Funds</p>
                    <Image src={info} alt="info" />
                    </div>
                    <h1 className="text-2xl font-medium">
                    ₦ {walletData?.data?.data.available_balance.NGN}
                    </h1>
                </div>
                <div className="mt-2">
                    {/* <div className="flex justify-between mb-6">
                    <p className="text-xs text-gray-500">
                        Withdrawn to date: ₦ 0
                    </p>
                    <Image src={info} alt="info" />
                    </div> */}
                </div>
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <Tabs>
                    <TabBtn isActive={currentTab === "Transactions"} onClick={() => setCurrentTab("Transactions")}>Transactions</TabBtn>
                    <TabBtn isActive={currentTab === "Requests"} onClick={() => setCurrentTab("Requests")}>Pending Withdrawal Requests</TabBtn>
                </Tabs>

                {
                    currentTab === "Transactions" ? (
                        <TableWrapper style={{ marginTop: "20px" }}>
                            <TableContent>
                                <Table>
                                    <THead>
                                        <TrH>
                                            <Th cellWidth="120px">
                                                Date
                                            </Th>
                                            <Th cellWidth="300px">Amount</Th>
                                            <Th cellWidth="150px">Activity</Th>
                                            <Th cellWidth="250px">Desciption</Th>
                                            <Th cellWidth="120px">Status</Th>
                                        </TrH>
                                    </THead>
                                    <TBody>
                                        {
                                            walletTx.data.length ? (
                                            walletTx.data.map((val, i) => (
                                                <Tr key={i}>
                                                    <Td cellWidth="120px">
                                                    {(new Date(val.created_at)).toDateString()}
                                                    </Td>
                                                    <Td cellWidth="300px"></Td>
                                                    <Td cellWidth="150px"></Td>
                                                    <Td cellWidth="150px"></Td>
                                                    <Td cellWidth="120px"></Td>
                                                    <Td cellWidth="120px">
                                                        <ActionBtn onClick={() => {}}></ActionBtn>
                                                    </Td>
                                                </Tr>
                                            )))
                                            : <div className="grid place-content-center py-10">No Transactions</div>
                                        }
                                    </TBody>
                                </Table>
                            </TableContent>
                            <TableFooter>
                                <p>Showing {((walletTx.current_page - 1) * walletTx.per_page) + walletTx.data.length} of {walletTx.total}</p>
                                <Pagination>
                                    <NavBtn onClick={() => walletTx.current_page.prev_page_url && setPageUrl(walletTx.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                                        <ChevronLeft />
                                    </NavBtn>
                                    <Pages>
                                        <PageBtn activePage={true}>{walletTx.current_page}</PageBtn>
                                    </Pages>
                                    <NavBtn onClick={() => walletTx.current_page.next_page_url && setPageUrl(walletTx.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                                        <ChevronRight />
                                    </NavBtn>
                                </Pagination>
                            </TableFooter>
                        </TableWrapper>
                    ) : null
                }
                {
                    currentTab === "Requests" ? (
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
                    ) : null 
                }
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