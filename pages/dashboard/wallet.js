//=========================== TAILWIND STYLES APPLIED HERE =========================

import { usePaystackPayment } from "react-paystack";
import { calculateTotalPrice } from "paystack-transaction-charges-to-cus";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../api/campaigns";
// import { setLoading } from "../../app/reducers/status";
import info from "../../assets/info.svg";

import Deposit from "components/Wallet/Deposit";
import Withdrawal from "components/Wallet/Withdrawal";
import LandingLayout from "../../layouts/landing.layout";
import Tooltip from "../../components/tooltip"
import {
  ActionBtn,
  Checkbox,
  Container,
  FilterContainer,
  NavBtn,
  PageBtn,
  Pages,
  Pagination,
  SearchContainer,
  Table,
  TableContent,
  TableControls,
  TableFooter,
  TableHeader,
  TableWrapper,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrH,
  Wrapper,
} from "../../styles/connect-pages.style";
import { useSelector } from "react-redux";

import cancel from "./../../assets/close.svg";
import at from "../../assets/profile/at.svg";
import search from "../../assets/search.svg";
import action from "../../assets/action.svg";
import {
  createDepositTransaction,
  createWithdrawalTransactions,
  getWallet,
  getWalletTransactions,
  processDepositTransaction,
} from "../../api/wallet";
import Loader from "../../components/UI/Loader";
import { getUser } from "../../app/reducers/user";
import { toast } from "react-toastify";
import moment from "moment";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState("");
  const [step, setstep] = useState(1);
  const [walledData, setwalledData] = useState(null);
  const [trxn, settrxn] = useState(null);
  const [trxnData, settrxnData] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [isWithdrawalOpen, setisWithdrawalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paystackConfig, setPaystackConfig] = useState({});
  const [triggerPayment, settriggerPayment] = useState(false);
  const [makePayment, setmakePayment] = useState(false);
  const [earningsRef, setEarningsRef] = useState(undefined);
  const [depositRef, setDepositRef] = useState(undefined);
  const [expensesRef, setExpensesRef] = useState(undefined);
  const [escrowRef, setEscrowRef] = useState(undefined);
  const [fundsRef, setFundsRef] = useState(undefined);
  const [withdrawnRef, setWithdrawnRef] = useState(undefined);

  const user = useSelector(getUser);

  let paymentReference = "";
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    handleProcessTransaction(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handleGetWalletData = (campaign) => {
    getWallet()
      .then((res) => {
        console.log(res.data.data);
        setwalledData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleGetTransaction = (campaign) => {
    getWalletTransactions()
      .then((res) => {
        console.log(res.data.data);
        settrxn(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleCreateTransaction = async () => {
    if (!amount) {
      toast.error("Amount field can't be empty");
      return;
    }
    if (amount === 0) {
      toast.error("Amount field can't be 0");
      return;
    }

    const getWalletDepositAddress = user.wallets.find(
      (wallet) => wallet.type.toLowerCase() === "deposit"
    );
    setLoading(true);
    const payload = {
      channel: "paystack",
      amount: +amount,
      currency: "NGN",
      meta: {},
      flags: "",
      wallet_address: getWalletDepositAddress.address,
      payment_type: "deposit_payment",
      deposit_payment: "wallet_address",
    };
    await createDepositTransaction(payload)
      .then((res) => {
        console.log(res);
        settrxnData(res.data.data);
        console.log(res.data.data.payment_reference);
        paymentReference = res.data.data.payment_reference.toString();
        setPaystackConfig({
          currency: "NGN",
          reference: paymentReference,
          email: user.email,
          amount: calculateTotalPrice(Number(amount * 100)), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
          publicKey: "pk_live_c7f6b5fb6f96205ccae427d88bc6fcab83644ad3",
        });
        setLoading(false);

        settriggerPayment(true);
        setmakePayment(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  };
  const handleProcessTransaction = async (data) => {
    if (!amount) {
      toast.error("Amount field cant be empty");
      return;
    }

    const payload = {
      channel: "paystack",
      payment_reference: data.reference,
    };
    await processDepositTransaction(payload)
      .then((res) => {
        console.log(res);
        setisOpen(false);
        handleGetTransaction();
        handleGetWalletData();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleCreateWithdrawal = async () => {
    if (!amount || !walletAddress) {
      toast.error("All field are required");
      return;
    }
    const getWalletDepositAddress = user.wallets.find(
      (wallet) => wallet.type === walletAddress
    );
    const payload = {
      amount: amount,
      currency: "NGN",
      remark: "",
      meta: "",
      flags: "",
      wallet_address: getWalletDepositAddress.address,
      type: "Withdrawal",
    };
    setLoading(true);
    await createWithdrawalTransactions(payload)
      .then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
        setisWithdrawalOpen(false);
        setLoading(false);
        setWalletAddress("");
        setAmount("");
        handleGetTransaction();
      })
      .catch((err) => {
        setLoading(false);
        setWalletAddress("");
        setAmount("");
      });
  };

  const handleContinue = async () => {
    await handleCreateTransaction();
  };
  const handleContinueWithdrawal = async () => {
    await handleCreateWithdrawal();
  };

  useEffect(() => {
    if (makePayment) {
      initializePayment(onSuccess, onClose);
    }
  }, [triggerPayment]);
  useEffect(() => {
    handleGetWalletData();
    handleGetTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 md:px-12 px-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">Wallet</h1>

        <button
          onClick={() => {
            setisOpen(true);
          }}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white"
        >
          Fund wallet
        </button>
      </div>

      {walledData !== null ? (
        <div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
              <div className="border-b">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Earnings</p>
                  <button className="bg-transparent outline-none" ref={setEarningsRef}>
                    <Image src={info} alt="info"/>
                  </button>
                </div>
                <h1 className="text-2xl font-medium">
                  ₦ {walledData?.total_earnings.NGN || "0"}
                </h1>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Deposit</p>
                  <button className="bg-transparent outline-none" ref={setDepositRef}>
                    <Image src={info} alt="info"/>
                  </button>
                </div>
                <h1 className="text-2xl font-medium">
                  ₦{walledData?.deposit_balance.NGN || "0"}
                </h1>
              </div>
            </div>
            <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
              <div className="border-b">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Expenses</p>
                  <button className="bg-transparent outline-none" ref={setExpensesRef}>
                    <Image src={info} alt="info"/>
                  </button>
                </div>
                <h1 className="text-2xl font-medium">
                  ₦{walledData?.outgoing_escrow.NGN || "0"}
                </h1>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Escrow</p>
                  <button className="bg-transparent outline-none" ref={setEscrowRef}>
                    <Image src={info} alt="info"/>
                  </button>
                </div>
                <h1 className="text-2xl font-medium">
                  ₦{walledData?.incomming_escrow.NGN || "0"}
                </h1>
              </div>
            </div>
            <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
              <div className="border-b">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Available Funds</p>
                  <button className="bg-transparent outline-none" ref={setFundsRef}>
                    <Image src={info} alt="info"/>
                  </button>
                </div>
                <h1 className="text-2xl font-medium">
                  ₦ {walledData?.available_balance.NGN || "0"}
                </h1>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">
                    Withdrawn to date: ₦ 0
                  </p>
                  <button className="bg-transparent outline-none" ref={setWithdrawnRef}>
                    <Image src={info} alt="info"/>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setisWithdrawalOpen(true);
                  }}
                  className="bg-primary-100 py-2 px-4 rounded-lg text-white"
                >
                  Withdraw Balance
                </button>
              </div>
            </div>
          </div>

          <div className=" grid md:grid-cols-2 mt-10  py-4 bg-white  ">
            {/*  <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
              <div className=" py-3  grid place-content-center">
                <Image src={search} alt="search" />
              </div>
              <input
                type="text"
                className="bg-transparent outline-none w-full flex-1"
                placeholder="Search.."
              />
            </div> */}
            <div className="flex justify-end">
              <h1></h1>
            </div>
          </div>

          <div>
            <div className="flex justify-between mt-5  p-4 bg-white border rounded-t-lg">
              <h1>All Transactions</h1>
              <h1>
                <Image src={action} alt="search" />
              </h1>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="table -mt-1  border  border-[#EAEAEB] md:w-full min-w-[1000px] text-[#667085]">
                <div className="grid grid-cols-12 gap-4 bg-[#F9FAFB] p-4 rounded-t-lg border-b w-full">
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Activity</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2">Status</div>
                </div>
                {trxn && trxn.length > 0 ? (
                  trxn.map((item, idx) => (
                    <div
                      className="grid grid-cols-12 gap-4 p-4 border-b"
                      key={idx}
                    >
                      <div className="col-span-2 text-sm">
                        {moment(item.createdAt).format("L")}
                      </div>
                      <div className="col-span-2 text-sm text-green-500">
                        {item.amount}
                      </div>
                      <div className="col-span-2 text-sm flex-col">
                        <p className="text-gray-400">Influencer</p>
                        {item.Activity}
                      </div>
                      <div className="col-span-4 text-sm">
                        {item.remark || item.type}
                      </div>

                      <div className="col-span-2">
                        {item.status.toLowerCase() === "pending" && (
                          <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#F2F4F7] text-xs w-max flex space-x-2 items-center text-[#344054]">
                            <div className="bg-[#667085] rounded-full w-[6px] h-[6px]"></div>
                            <p>{item.status}</p>
                          </div>
                        )}
                        {item.status.toLowerCase() === "completed" && (
                          <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#ECFDF3] text-xs w-max flex space-x-2 items-center text-[#027A48]">
                            <div className="bg-[#12B76A] rounded-full w-[6px] h-[6px]"></div>
                            <p>{item.status}</p>
                          </div>
                        )}
                        {item.status.toLowerCase() === "declined" && (
                          <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#FEF3F2] text-xs w-max flex space-x-2 items-center text-[#B42318]">
                            <div className="bg-[#F04438] rounded-full w-[6px] h-[6px]"></div>
                            <p>{item.status}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid place-content-center py-10">
                    No Result Found
                  </div>
                )}

                <div className="flex p-4 justify-between text-sm">
                  <div>
                    <p>Page 1 0f 10</p>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="border shadow-sm px-2 py-[6px] rounded-md ">
                      Previous
                    </div>
                    <div className="border shadow-sm px-2 py-[6px] rounded-md ">
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {isOpen && (
        <Deposit
          setAmount={setAmount}
          amount={amount}
          setisOpen={setisOpen}
          loading={loading}
          isOpen={isOpen}
          handleContinue={handleContinue}
        />
      )}
      {isWithdrawalOpen && user && (
        <Withdrawal
          handleContinueWithdrawal={handleContinueWithdrawal}
          setWalletAddress={setWalletAddress}
          setisWithdrawalOpen={setisWithdrawalOpen}
          loading={loading}
          user={user}
          amount={amount}
          setAmount={setAmount}
        />
      )}
      {
        walledData ? (
          <>
            <Tooltip position="left" elementRef={earningsRef} gap={5} contents="This represents the total amount you have earned from all the completed campaigns on Influenzit. It includes all payments received from business owners for your influencer services." />
            <Tooltip position="left" elementRef={escrowRef} gap={5} contents="This represents the total amount of money currently held in escrow. These are funds that have been deposited for a specific campaign but have not yet been released because the campaign is still ongoing or the completion of the campaign has not yet been confirmed by the business owner." />
            <Tooltip position="left" elementRef={depositRef} gap={5} contents="This represents the total amount of money you have deposited into your Influenzit account. Deposits can come from various sources including bank transfers, credit/debit card payments, or from completed campaigns." />
            <Tooltip position="left" elementRef={fundsRef} gap={5} contents="This represents the total amount of money currently available in your Influenzit account. It's the balance that you can use to fund campaigns or withdraw to your bank account." />
            <Tooltip position="left" elementRef={withdrawnRef} gap={5} contents="This represents the total amount of money you have withdrawn from your Influenzit account to date. This includes all successful withdrawals to your linked bank account" />
            <Tooltip position="left" elementRef={expensesRef} gap={5} contents="This represents the total amount you have spent on Influenzit. It includes any fees or charges incurred while using the platform for your campaigns." />
          </>
        ) : null
      }
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
