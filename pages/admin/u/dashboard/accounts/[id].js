import React, { useEffect, useState } from "react";
import info from "../../../../../assets/info.svg";
import action from "../../../../../assets/action.svg";
import AdminLayout from "../../../../../layouts/admin.layout";
import Image from "next/image";
import {
  ActionBtn,
  Checkbox,
  Container,
  Table,
  TableContent,
  TableWrapper,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrH,
  TabBtn,
  Tabs,
  TableFooter,
  Pagination,
  NavBtn,
  Pages,
  PageBtn,
  WelcomeModal,
  TableWrapped,
} from "../../../../../styles/connect-pages.style";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../app/reducers/status";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSingleUser,
  getWalletRequests,
  getWalletSummary,
  getWalletTransactions,
  sendMail,
  verifyUserAccount,
} from "../../../../../api/admin";
import { WelcomeHeading, ReferralCode } from "../../../../../styles/dashboard";
import { ChevronLeft, ChevronRight } from "../../../../../assets/svgIcons";
import { ActionBtnB } from "../../../../../styles/connect-pages.style";
import { toast } from "react-toastify";
import { UpdateModal } from "styles/view.style";
import { Input, InputContainer } from "styles/auth.style";

const SingleWallet = () => {
  const [currentTab, setCurrentTab] = useState("Transactions");
  const [account, setAccount] = useState(null);
  const [pageUrl, setPageUrl] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [walletTx, setWalletTx] = useState({
    data: [],
  });
  const [walletRq, setWalletRq] = useState({
    data: [],
  });
  const { data: userData, refetch: refetchUserData } = useQuery(
    ["get-single-account"],
    async () => {
      return await getSingleUser(id);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        if (res.data.data) {
          setAccount(res.data.data);
        }
      },
      onError() {
        dispatch(setLoading(false));
      },
    }
  );
  const { data: walletData, refetch: refetchWallet } = useQuery(
    ["get-single-wallet"],
    async () => {
      return await getWalletSummary(id);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        if (res.data.data) {
          setAccount(res.data.data);
        }
      },
      onError() {
        dispatch(setLoading(false));
      },
    }
  );
  const { data: walletTxData, refetch: refetchWalletTx } = useQuery(
    ["get-single-wallet-transactions"],
    async () => {
      return await getWalletTransactions(id, pageUrl);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        if (res.data.data) {
          setWalletTx(res.data.data);
        }
      },
      onError() {
        dispatch(setLoading(false));
      },
    }
  );
  const { data: walletRqData, refetch: refetchWalletRq } = useQuery(
    ["get-single-wallet-requests"],
    async () => {
      return await getWalletRequests(id, pageUrl);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        if (res.data.data) {
          setWalletRq(res.data.data);
        }
      },
      onError() {
        dispatch(setLoading(false));
      },
    }
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    dispatch(setLoading(true));
    if (id) {
      refetchUserData();
      refetchWallet();
      refetchWalletTx();
      refetchWalletRq();
    }
  }, [id, dispatch, refetchUserData, refetchWallet, refetchWalletTx, refetchWalletRq]);
  const updateAccountMutation = useMutation(
    (data) => {
      return verifyUserAccount(data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Account verified successfully", {
          position: toast.POSITION.TOP_RIGHT,
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
  const mailMutation = useMutation(
    (data) => {
      return sendMail(data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Mail sent successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMessage("");
        setSubject("");
        setShowPrompt(false);
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
  };
  const handleEmailSend = () => {
    dispatch(setLoading(true));
    mailMutation.mutate({
      subject,
      body: message,
      to_user: userData?.data.data.user?.email,
    });
  };

  return (
    <Container>
      {showPrompt && (
        <UpdateModal>
          <WelcomeModal>
            <div style={{ paddingBottom: "0" }}>
              <button onClick={() => setShowPrompt(false)}>
                <Image src="/cancel.svg" alt="" height={14} width={14} />
              </button>
            </div>
            <h2>Mail User</h2>
            <InputContainer
              style={{ flexDirection: "column", alignItems: "start" }}
            >
              <label>Subject</label>
              <Input
                type="text"
                value={subject}
                placeholder="Enter Subject"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer
              style={{ flexDirection: "column", alignItems: "start" }}
            >
              <label>Message</label>
              <textarea
                placeholder="Enter Message..."
                value={message}
                onInput={(e) => setMessage(e.target.value)}
              ></textarea>
            </InputContainer>
            <div>
              <button onClick={handleEmailSend}>Send Email</button>
            </div>
          </WelcomeModal>
        </UpdateModal>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="col-span-3 relative"
          style={{ height: "150px", width: "150px" }}
        >
          <Image
            src={userData?.data.data.user?.profile_pic}
            alt="avatar"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-full"
          />
        </div>
        <WelcomeHeading>{userData?.data.data.user?.name}</WelcomeHeading>
        <ReferralCode>
          <p>
            <span>{userData?.data.data.user?.email}</span>{" "}
          </p>
        </ReferralCode>
        <p className="text-xl mb-4 font-medium">
          <span>{userData?.data.data.phone1}</span>{" "}
        </p>
        <div>
          <ActionBtn onClick={() => verifyAcc(id)}>
            {userData?.data.data.influenzit_verified
              ? "Disapprove User"
              : "Approve User"}
          </ActionBtn>
          <ActionBtnB
            onClick={() =>
              router.push(`/admin/u/dashboard/accounts/view/${id}`)
            }
          >
            More Info
          </ActionBtnB>
          <ActionBtnB onClick={() => setShowPrompt(true)}>Mail User</ActionBtnB>
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
            <TabBtn
              isActive={currentTab === "Transactions"}
              onClick={() => setCurrentTab("Transactions")}
            >
              Transactions
            </TabBtn>
            <TabBtn
              isActive={currentTab === "Requests"}
              onClick={() => setCurrentTab("Requests")}
            >
              Pending Withdrawal Requests
            </TabBtn>
          </Tabs>

          {currentTab === "Transactions" ? (
            <TableWrapped style={{ marginTop: "20px" }}>
              <TableContent>
                <Table>
                  <THead style={{ borderTop: "none" }}>
                    <TrH>
                      <Th cellWidth="120px">Date</Th>
                      <Th cellWidth="300px">Amount</Th>
                      <Th cellWidth="150px">Activity</Th>
                      <Th cellWidth="250px">Desciption</Th>
                      <Th cellWidth="120px">Status</Th>
                    </TrH>
                  </THead>
                  <TBody>
                    {walletTx.data.length ? (
                      walletTx.data.map((val, i) => (
                        <Tr key={i}>
                          <Td cellWidth="120px">
                            {new Date(val.created_at).toDateString()}
                          </Td>
                          <Td cellWidth="300px"></Td>
                          <Td cellWidth="150px"></Td>
                          <Td cellWidth="150px"></Td>
                          <Td cellWidth="120px"></Td>
                          <Td cellWidth="120px">
                            <ActionBtn onClick={() => {}}></ActionBtn>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <div className="grid place-content-center py-10">
                        No Transactions
                      </div>
                    )}
                  </TBody>
                </Table>
              </TableContent>
              <TableFooter>
                <p>
                  Showing{" "}
                  {(walletTx.current_page - 1) * walletTx.per_page +
                    walletTx.data.length}{" "}
                  of {walletTx.total}
                </p>
                <Pagination>
                  <NavBtn
                    onClick={() =>
                      walletTx.current_page.prev_page_url &&
                      setPageUrl(
                        walletTx.current_page.prev_page_url.replace(
                          process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                          ""
                        )
                      )
                    }
                  >
                    <ChevronLeft />
                  </NavBtn>
                  <Pages>
                    <PageBtn activePage={true}>{walletTx.current_page}</PageBtn>
                  </Pages>
                  <NavBtn
                    onClick={() =>
                      walletTx.current_page.next_page_url &&
                      setPageUrl(
                        walletTx.current_page.next_page_url.replace(
                          process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                          ""
                        )
                      )
                    }
                  >
                    <ChevronRight />
                  </NavBtn>
                </Pagination>
              </TableFooter>
            </TableWrapped>
          ) : null}
          {currentTab === "Requests" ? (
            <TableWrapped style={{ marginTop: "20px" }}>
              <TableContent>
                <Table>
                  <THead style={{ borderTop: "none" }}>
                    <TrH>
                      <Th cellWidth="120px">Date</Th>
                      <Th cellWidth="170px">Amount</Th>
                      <Th cellWidth="150px">Reference</Th>
                      <Th cellWidth="150px">Remark</Th>
                      <Th cellWidth="100px">Status</Th>
                      <Th cellWidth="150px">Action</Th>
                    </TrH>
                  </THead>
                  <TBody>
                    {walletRq?.data.length ? (
                      walletRq?.data.map((val, i) => (
                        <Tr key={i}>
                          <Td cellWidth="120px">
                            {new Date(val.created_at).toDateString()}
                          </Td>
                          <Td cellWidth="170px">
                            {val.currency} {val.amount}
                          </Td>
                          <Td cellWidth="150px">{val.reference}</Td>
                          <Td cellWidth="150px">{val.remark}</Td>
                          <Td cellWidth="100px">{val.status}</Td>
                          <Td cellWidth="150px">
                            {val.status === "Pending" ? (
                              <ActionBtn onClick={() => {}}>Approve</ActionBtn>
                            ) : null}
                            <ActionBtn
                              onClick={() =>
                                router.push(
                                  `/admin/u/dashboard/accounts/${val.user_id}`
                                )
                              }
                            >
                              View User
                            </ActionBtn>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <div className="grid place-content-center py-10">
                        No Request
                      </div>
                    )}
                  </TBody>
                </Table>
              </TableContent>
              <TableFooter>
                <p>
                  Showing{" "}
                  {(walletRq.current_page - 1) * walletRq.per_page +
                    walletRq.data.length}{" "}
                  of {walletRq.total}
                </p>
                <Pagination>
                  <NavBtn
                    onClick={() =>
                      walletRq.current_page.prev_page_url &&
                      setPageUrl(
                        walletRq.current_page.prev_page_url.replace(
                          process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                          ""
                        )
                      )
                    }
                  >
                    <ChevronLeft />
                  </NavBtn>
                  <Pages>
                    <PageBtn activePage={true}>{walletRq.current_page}</PageBtn>
                  </Pages>
                  <NavBtn
                    onClick={() =>
                      walletRq.current_page.next_page_url &&
                      setPageUrl(
                        walletRq.current_page.next_page_url.replace(
                          process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                          ""
                        )
                      )
                    }
                  >
                    <ChevronRight />
                  </NavBtn>
                </Pagination>
              </TableFooter>
            </TableWrapped>
          ) : null}
        </div>
      </div>
    </Container>
  );
};
SingleWallet.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default SingleWallet;
