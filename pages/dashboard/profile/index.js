 //=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../../api/campaigns";
import { setLoading } from "../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../assets/svgIcons";
import Stage1 from "../../../components/profile/stage1";
import Stage2 from "../../../components/profile/stage2";
import Stage3 from "../../../components/profile/stage3";
import Stage4 from "../../../components/profile/stage4";
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

  const [activetab, setactivetab] = useState("profile_details");

  useEffect(() => {
    refetch();
  }, [getUrl]);
  return (
    <div className="py-28 px-12 b0">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl">Account Settings </h1>
        </div>
      </div>
      <div className="flex space-x-4 w-full border-b mb-4">
        <button
          onClick={() => {
            setactivetab("profile_details");
          }}
          className={`${
            activetab == "profile_details" &&
            "text-primary-100 border-b border-primary-100"
          } pb-4`}
        >
          Profile details
        </button>
        <button
          onClick={() => {
            setactivetab("influencer_details");
          }}
          className={`${
            activetab == "influencer_details" &&
            "text-primary-100 border-b border-primary-100"
          } pb-4`}
        >
          Influencer Details
        </button>
        <button
          onClick={() => {
            setactivetab("images");
          }}
          className={`${
            activetab == "images" &&
            "text-primary-100 border-b border-primary-100"
          } pb-4`}
        >
          Images
        </button>
        <button
          onClick={() => {
            setactivetab("change_password");
          }}
          className={`${
            activetab == "change_password" &&
            "text-primary-100 border-b border-primary-100"
          } pb-4`}
        >
          Change Password
        </button>
      </div>

      {activetab === "profile_details" && <Stage1 />}
      {activetab === "influencer_details" && <Stage2 />}
      {activetab === "images" && <Stage3 />}
      {activetab === "change_password" && <Stage4 />}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
