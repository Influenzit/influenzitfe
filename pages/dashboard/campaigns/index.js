import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../../api/campaigns";
import { setLoading } from "../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../assets/svgIcons";
import Stage1 from "../../../components/Campaign/Stage1";
import Stage2 from "../../../components/Campaign/Stage2";
import LandingLayout from "../../../layouts/landing.layout";
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
} from "../../../styles/connect-pages.style";

import cancel from "./../../../assets/close.svg";

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
      name: "Tesla, Inc.",
      platform: ["instagram", "twitter", "tiktok", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
    {
      name: "Datadog Inc",
      platform: ["instagram", "twitter", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Success",
    },
    {
      name: "MicroStrategy Inc.",
      platform: ["instagram", "tiktok", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
    {
      name: "MicroStrategy Inc.",
      platform: ["instagram", "twitter", "tiktok", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Declined",
    },
    {
      name: "ARK Genomic Revolution ETF",
      platform: ["instagram", "twitter", "tiktok", "youtube"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
    {
      name: "Tesla, Inc.",
      platform: ["instagram", "twitter", "tiktok", "facebook"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
    {
      name: "Tesla, Inc.",
      platform: ["instagram", "youtube"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
    {
      name: "MicroStrategy Inc.",
      platform: ["instagram", "twitter", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Declined",
    },
    {
      name: "Tesla, Inc.",
      platform: ["instagram", "twitter", "tiktok", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
    {
      name: "Tesla, Inc.",
      platform: ["instagram", "facebook", "youtube"],
      date: "Jan 13, 2022",
      status: "Processing",
    },
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
        <h1 className="text-xl">My Campaigns</h1>

        <button
          onClick={() => {
            setNewCampaign(!newCamPaign);
          }}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white"
        >
          New campaign
        </button>
      </div>

      <div className="table mt-10 campaign_table w-full text-[#667085]">
        <div className="grid grid-cols-12 gap-4 bg-[#F9FAFB] p-4 rounded-t-lg border-b">
          <div className="col-span-5">Business</div>
          <div className="col-span-3">Channel</div>
          <div className="col-span-2">Delivery date</div>
          <div className="col-span-2">Status</div>
        </div>
        {dummyData.map((item, idx) => (
          <div className="grid grid-cols-12 gap-4 p-4 border-b" key={idx}>
            <div className="col-span-5 text-sm"> {item.name} </div>
            <div className="col-span-3 flex space-x-2 items-center">
              {item.platform.map((img) => (
                <div key={`img${idx}`}>
                  <Image
                    src={require(`./../../../assets/${img}.svg`)}
                    alt={img}
                    className="h-4 w-4"
                  />
                </div>
              ))}
            </div>
            <div className="col-span-2 text-sm">{item.date}</div>
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

      {newCamPaign && (
        <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
          <div className="bg-white w-[500px]  p-6 rounded-lg">
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
              <div className="bg-primary-100 w-1/3 h-full rounded-lg"></div>
            </div>

            {step==1 && <Stage1 />}
            {step==2 && <Stage2 />}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setstep(step + 1);
                }}
                className="bg-primary-100 py-2 px-4 rounded-lg text-white"
              >
                Next{" "}
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
