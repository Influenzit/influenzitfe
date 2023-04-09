//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../../api/campaigns";
import { setLoading } from "../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../assets/svgIcons";
import rightarrow from "../../../assets/project/rightarrow.svg";
import emptyicon from "../../../assets/project/emptyicon.svg";
import Stage1 from "../../../components/Campaign/Stage1";
import Stage2 from "../../../components/Campaign/Stage2";
import Stage3 from "../../../components/Campaign/Stage3";
import LandingLayout from "../../../layouts/landing.layout";

import cancel from "./../../../assets/close.svg";
import instagram from "./../../../assets/instagram.svg";
import twitter from "./../../../assets/twitter.svg";
import tiktok from "./../../../assets/tiktok.svg";
import facebook from "./../../../assets/facebook.svg";
import youtube from "./../../../assets/youtube.svg";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [step, setstep] = useState(1);
  const [currentValue, setcurrentValue] = useState(4);
  const [campaignList, setCampaignList] = useState({
    data: [],
  });
  const dummyData = [
    {
      image: "avatar",
      status: "Ongoing",
    },
    {
      image: "avatar1",
      status: "Not Started",
    },
    {
      image: "avatar2",
      status: "Ongoing",
    },
    {
      image: "avatar3",
      status: "Ongoing",
    },
    {
      image: "avatar4",
      status: "Completed",
    },
    {
      image: "avatar3",
      status: "Ongoing",
    },
    {
      image: "avatar1",
      status: "Completed",
    },
  ];
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

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
  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];

  useEffect(() => {
    refetch();
  }, [getUrl]);
  return (
    <div className="py-28 px-12 b0">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl">My Projects </h1>
          <span className="mx-2 rounded-full py-1 px-2  h-auto bg-primary-100 text-[10px] text-white">
            Free User
          </span>
        </div>
      </div>

      <div className="empty">
        <div className="grid grid-cols-12">
          <div className="p-6 col-span-8">
            <h1 className="text-3xl font-semibold">
              Start your first project{" "}
            </h1>
            <p className="text-[#555461] font-light mt-4">
              Find the right influencers with correct metrics, keep track of
              your campaign performance and complete payments seamlessly.
            </p>

            <button className="bg-primary-100 py-2 px-4 rounded-lg text-white mt-8 flex space-x-4 items-center">
              <span className="mr-2">Find Creators</span>
              <Image src={rightarrow} alt={"leftarrow"} />
            </button>
          </div>
          <div className="col-span-4 -mb-2">
            <Image src={emptyicon} alt={"emptyicon"} className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
