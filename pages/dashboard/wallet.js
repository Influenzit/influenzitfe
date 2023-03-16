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

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [step, setstep] = useState(1);
  const [campaignList, setCampaignList] = useState({
    data: [],
  });
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

  const { data, refetch } = useQuery(
    ["get-campaigns"],
    async () => {
      return await getCampaigns(getUrl);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        setCampaignList(res.data.data);
      },
      onError(res) {
        dispatch(setLoading(false));
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [getUrl]);
  return (
    <div className="py-28 px-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">Wallet</h1>

        <button
          onClick={() => {
            setNewCampaign(!newCamPaign);
          }}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white"
        >
          Fund wallet
        </button>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
          <div className="border-b">
            <div className="flex justify-between mb-6">
              <p className="text-xs text-gray-500">Earnings</p>
              <Image src={info} alt="info" />
            </div>
            <h1 className="text-2xl font-medium">₦200,000</h1>
          </div>
          <div className="mt-2">
            <div className="flex justify-between mb-6">
              <p className="text-xs text-gray-500">Deposit</p>
              <Image src={info} alt="info" />
            </div>
            <h1 className="text-2xl font-medium">₦120,000</h1>
          </div>
        </div>
        <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
          <div className="border-b">
            <div className="flex justify-between mb-6">
              <p className="text-xs text-gray-500">Expenses</p>
              <Image src={info} alt="info" />
            </div>
            <h1 className="text-2xl font-medium">₦140,000</h1>
          </div>
          <div className="mt-2">
            <div className="flex justify-between mb-6">
              <p className="text-xs text-gray-500">Escrow</p>
              <Image src={info} alt="info" />
            </div>
            <h1 className="text-2xl font-medium">₦60,000</h1>
          </div>
        </div>
        <div className="border border-[#EAEAEB] hover:transform translate-y-4 duration-200 ease-linear rounded-lg p-4">
          <div className="border-b">
            <div className="flex justify-between mb-6">
              <p className="text-xs text-gray-500">Available Funds</p>
              <Image src={info} alt="info" />
            </div>
            <h1 className="text-2xl font-medium">₦200,000</h1>
          </div>
          <div className="mt-2">
            <div className="flex justify-between mb-6">
              <p className="text-xs text-gray-500">
                Withdrawn to date: ₦140,000
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
          {dummyData.map((item, idx) => (
            <div className="grid grid-cols-12 gap-4 p-4 border-b" key={idx}>
              <div className="col-span-2 text-sm"> {item.date} </div>
              <div className="col-span-2 text-sm text-green-500">
                {item.amount}
              </div>
              <div className="col-span-2 text-sm flex-col">
                <p className="text-gray-400">Influencer</p>
                {item.Activity}
              </div>
              <div className="col-span-4 text-sm"> {item.Description} </div>

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
          ))}

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

      {newCamPaign && (
        <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
          <div className="bg-white w-[500px]  p-6 rounded-lg overflow-hidden">
            <div className="flex justify-between mb-6">
              <h1 className="text-xl">Create New Campaign</h1>

              <button
                onClick={() => {
                  setNewCampaign(!newCamPaign);
                }}
                className="outline-none"
              >
                <Image src={cancel} alt="cancel" className="h-2 w-2" />
              </button>
            </div>
            <div className="my-4 bg-[#D4D4D8] h-[2px] w-full rounded-lg mt-6">
              <div
                className={`bg-primary-100 w-${step}/3 h-full rounded-lg`}
              ></div>
            </div>

            {step == 1 && <Stage1 />}
            {step == 2 && <Stage2 />}
            {step == 3 && <Stage3 />}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (step <= 3) {
                    setstep(step + 1);
                  }
                }}
                className="bg-primary-100 py-2 px-4 rounded-lg text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
