//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaign, getCampaigns } from "../../../../api/campaigns";
import { setLoading } from "../../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../../assets/svgIcons";
import avatar1 from "../../../../assets/campaign/avatar1.svg";
import Stage1 from "../../../../components/Campaign/Stage1";
import Stage2 from "../../../../components/Campaign/Stage2";
import Stage3 from "../../../../components/Campaign/Stage3";
import LandingLayout from "../../../../layouts/landing.layout";

import rightarrow from "../../../../assets/project/rightarrow.svg";
import emptyicon from "../../../../assets/project/emptyicon.svg";

import cancel from "./../../../../assets/close.svg";
import instagram from "./../../../../assets/instagram.svg";
import twitter from "./../../../../assets/twitter.svg";
import tiktok from "./../../../../assets/tiktok.svg";
import facebook from "./../../../../assets/facebook.svg";
import youtube from "./../../../../assets/youtube.svg";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { axiosInstance } from "../../../../api/axios";
import Loader from "../../../../components/UI/Loader";
import Empty from "../../../../components/Campaign/empty";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [step, setstep] = useState(1);
  const [currentValue, setcurrentValue] = useState(4);
  const [campaignList, setCampaignList] = useState(null);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleGetCampaign = (campaign) => {
    getCampaigns()
      .then((res) => {
        console.log(res);
        setCampaignList(res.data.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];

  useEffect(() => {
    handleGetCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 px-12 b0">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl">My Campaigns </h1>
          <span className="mx-2 rounded-full py-1 px-2  h-auto bg-primary-100 text-[10px] text-white">
            Free User
          </span>
        </div>

        {/*  <button
          onClick={() => {
            setNewCampaign(!newCamPaign);
          }}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white"
        >
          New campaign
        </button> */}
      </div>

      <div className="my-5 space-y-4">
        {campaignList !== null ? (
          <div>
            {campaignList.length > 0 ? (
              campaignList.map((item, index) => (
                <div
                  className={`p-3 bg-white"  rounded-2xl border border-[#EAEAEB]  w-full grid grid-cols-12 hover:bg-slate-100 cursor-pointer mb-4`}
                  key={index}
                >
                  <div className="col-span-3 flex space-x-2 items-center">
                    <Image
                      src={item.provider.profile_pic}
                      alt={"avatar"}
                      className="object-contain rounded-xl"
                      height="80"
                      width="80"
                    />
                    <div className="flex flex-col space-y-1">
                      <h1 className="font-medium"> {item.provider.name} </h1>
                      <p className="text-gray-400 text-xs"> Influencer</p>
                      <div className="col-span-3 flex space-x-3 items-center">
                        {platform.map((img) => (
                          <div key={img}>
                            <Image
                              src={require(`./../../../../assets/${img}.svg`)}
                              alt={img}
                              className="h-5 w-5 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1">
                        <ReactStars
                          isHalf={true}
                          count={5}
                          value={currentValue}
                          onChange={ratingChanged}
                          size={8}
                          activeColor="#DF475C"
                        />
                        <p className="text-[10px]">4.0 </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7 py-5 border-x px-10 flex flex-col space-y-2 h-auto">
                    <Link href={`/dashboard/campaigns/business/${item.id}`}>
                      <h1> {item.title} </h1>
                    </Link>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  <div className="col-span-2 py-5 flex flex-col space-y-2 px-6">
                    <p className="text-xs font-medium">STATUS</p>
                    {item.status.toLowerCase() === "ongoing" && (
                      <div className="rounded-2xl py-1 pr-4  text-xs w-max flex space-x-2 items-center text-[#93370D]">
                        <div className="bg-[#F79009] rounded-full w-[6px] h-[6px]"></div>
                        <p>{item.status}</p>
                      </div>
                    )}
                    {item.status.toLowerCase() === "completed" && (
                      <div className="rounded-2xl py-1 pr-4  text-xs w-max flex space-x-2 items-center text-[#027244]">
                        <div className="bg-[#12544D] rounded-full w-[6px] h-[6px]"></div>
                        <p>{item.status}</p>
                      </div>
                    )}
                    {item.status.toLowerCase() === "pending" && (
                      <div className="rounded-2xl py-1 pr-4 text-xs w-max flex space-x-2 items-center text-[#AF2A3D]">
                        <div className="bg-[#F04438] rounded-full w-[6px] h-[6px]"></div>
                        <p>{item.status}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">
                <div className="grid grid-cols-12">
                  <div className="p-6 col-span-8">
                    <h1 className="text-3xl font-semibold">
                      Launch your first campaign{" "}
                    </h1>
                    <p className="text-[#555461] font-light mt-4">
                      Find the right influencers with correct metrics, keep
                      track of your campaign performance and complete payments
                      seamlessly.
                    </p>

                    <div className="bg-primary-100 w-max py-2 px-4 rounded-lg text-white mt-8 flex items-center">
                      <Link href="#">Find Influencers</Link>
                      <div className="mt-2 ml-2">
                        <Image src={rightarrow} alt="leftarrow" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 -mb-2">
                    <Image src={emptyicon} alt={"emptyicon"} className="" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
