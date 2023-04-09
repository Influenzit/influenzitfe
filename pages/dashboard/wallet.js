//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../api/campaigns";
import { setLoading } from "../../app/reducers/status";
import info from "../../assets/info.svg";
import Stage1 from "../../components/Campaign/Stage1";
import Stage2 from "../../components/Campaign/Stage2";
import Stage3 from "../../components/Campaign/Stage3";
import LandingLayout from "../../layouts/landing.layout";
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

import cancel from "./../../assets/close.svg";
import at from "../../assets/profile/at.svg";
import search from "../../assets/search.svg";
import action from "../../assets/action.svg";
import { getWallet, getWalletTransactions } from "../../api/wallet";
import Loader from "../../components/UI/Loader";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [step, setstep] = useState(1);
  const [walledData, setwalledData] = useState(null);
  const [trxn, settrxn] = useState(null);
  const dummyData = [
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    {
      date: "Jan 13, 2022",
      amount: "+₦30,020",
      Activity: "Deposit",
      Description: "Deposit to Wallet",
      status: "Processing",
    },
    ,
  ];

  const handleGetCampaign = (campaign) => {
    getWallet()
      .then((res) => {
        console.log(res);
        setwalledData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleGetTransaction = (campaign) => {
    getWalletTransactions()
      .then((res) => {
        console.log(res);
        settrxn(res.data.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    handleGetCampaign();
    handleGetTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 px-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">Wallet</h1>

        <button className="bg-primary-100 py-2 px-4 rounded-lg text-white">
          Fund wallet
        </button>
      </div>

      {walledData !== null ? (
        <div>
          <div className="grid grid-cols-3 gap-10">
            <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
              <div className="border-b">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Earnings</p>
                  <Image src={info} alt="info" />
                </div>
                <h1 className="text-2xl font-medium">
                  ₦ {walledData?.total_earnings.NGN || "0"}{" "}
                </h1>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Deposit</p>
                  <Image src={info} alt="info" />
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
                  <Image src={info} alt="info" />
                </div>
                <h1 className="text-2xl font-medium">
                  ₦{walledData?.outgoing_escrow.NGN || "0"}
                </h1>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">Escrow</p>
                  <Image src={info} alt="info" />
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
                  <Image src={info} alt="info" />
                </div>
                <h1 className="text-2xl font-medium">
                  ₦ {walledData?.available_balance.NGN || "0"}{" "}
                </h1>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-6">
                  <p className="text-xs text-gray-500">
                    Withdrawn to date: ₦ 0
                  </p>
                  <Image src={info} alt="info" />
                </div>
                <button
                  onClick={() => {
                    setNewCampaign(!newCamPaign);
                  }}
                  className="bg-primary-100 py-2 px-4 rounded-lg text-white"
                >
                  Withdraw Balance
                </button>
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-2 mt-10  py-4 bg-white  ">
            <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
              <div className=" py-3  grid place-content-center">
                <Image src={search} alt="search" />
              </div>
              <input
                type="text"
                className="bg-transparent outline-none w-full flex-1"
                placeholder="krystalbeauty"
              />
            </div>
            <div className="flex justify-end">
              <h1></h1>
            </div>
          </div>

          <div>
            <div className="flex justify-between mt-5  p-4 bg-white border rounded-t-lg">
              <h1>All Transactions</h1>
              <h1>
                {" "}
                <Image src={action} alt="search" />
              </h1>
            </div>
            <div className="table -mt-1  border border-[#EAEAEB] w-full text-[#667085]">
              <div className="grid grid-cols-12 gap-4 bg-[#F9FAFB] p-4 rounded-t-lg border-b">
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
                    <div className="col-span-2 text-sm"> {item.date} </div>
                    <div className="col-span-2 text-sm text-green-500">
                      {item.amount}
                    </div>
                    <div className="col-span-2 text-sm flex-col">
                      <p className="text-gray-400">Influencer</p>
                      {item.Activity}
                    </div>
                    <div className="col-span-4 text-sm">
                      {" "}
                      {item.Description}{" "}
                    </div>

                    <div className="col-span-2">
                      {item.status.toLowerCase() === "processing" && (
                        <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#F2F4F7] text-xs w-max flex space-x-2 items-center text-[#344054]">
                          <div className="bg-[#667085] rounded-full w-[6px] h-[6px]"></div>
                          <p>{item.status}</p>
                        </div>
                      )}
                      {item.status.toLowerCase() === "success" && (
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;