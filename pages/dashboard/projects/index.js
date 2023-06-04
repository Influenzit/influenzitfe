//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "api/projects";
import { setLoading } from "app/reducers/status";
import { ChevronLeft, ChevronRight } from "assets/svgIcons";
import cat from "assets/project/cat.svg";
import Stage1 from "components/Campaign/Stage1";
import Stage2 from "components/Campaign/Stage2";
import Stage3 from "components/Campaign/Stage3";
import LandingLayout from "layouts/landing.layout";

import cancel from "assets/close.svg";
import instagram from "assets/instagram.svg";
import twitter from "assets/twitter.svg";
import tiktok from "assets/tiktok.svg";
import facebook from "assets/facebook.svg";
import youtube from "assets/youtube.svg";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import Loader from "components/UI/Loader";
import rightarrow from "assets/project/rightarrow.svg";
import emptyicon from "assets/project/emptyicon.svg";

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

  const [projectslist, setProjectList] = useState(null);

  const handleGetProjects = (campaign) => {
    getProjects()
      .then((res) => {
        console.log(res);
        setProjectList(res.data.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const usertype = localStorage.getItem("user-type");

  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];

  useEffect(() => {
    handleGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 md:px-12 px-4 b0">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl">My Projects </h1>
          <span className="mx-2 rounded-full py-1 px-2  h-auto bg-primary-100 text-[10px] text-white">
            Free User
          </span>
        </div>
      </div>

      <div className="my-5 space-y-4">
        {projectslist !== null ? (
          <div>
            {projectslist.length > 0 ? (
              projectslist.map((item, index) => (
                <Link
                  href={
                    usertype === "Creator"
                      ? `/dashboard/projects/owner/${item.id}`
                      : `/dashboard/projects/customer/${item.id}`
                  }
                  key={index}
                >
                  <div
                    className={`p-3 ${
                      item.status === "Not Started"
                        ? "bg-[#FCEDEF]"
                        : "bg-white"
                    }  rounded-2xl border border-[#EAEAEB]  w-full grid grid-cols-12 hover:bg-slate-100 cursor-pointer`}
                    key={index}
                  >
                    <div className="col-span-7 py-5 px-4 flex flex-col space-y-2 h-auto">
                      <div className="flex space-x-2 items-center">
                        <Image
                          src={cat}
                          alt={"avatar"}
                          className="object-contain"
                        />

                        <div>
                          {" "}
                          <h1 className="uppercase">{item.title} </h1>
                          <p className="text-gray-400 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 border-x pl-4 flex space-x-2 items-center">
                      <Image
                        src={require(`assets/campaign/avatar4.svg`)}
                        alt={"avatar"}
                        className="object-contain"
                      />
                      <div className="flex flex-col space-y-1">
                        <h1 className="font-medium">{item.provider.name} </h1>
                        <p className="text-gray-400 text-xs">Influencer</p>
                        <div className="col-span-3 flex space-x-3 items-center">
                          {platform.map((img) => (
                            <div key={img}>
                              <Image
                                src={require(`assets/${img}.svg`)}
                                alt={img}
                                className="h-5 w-5"
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
                    <div className="col-span-2 py-5 flex flex-col space-y-2 px-6">
                      <p className="text-xs font-medium">STATUS</p>
                      {item.status.toLowerCase() === "pending" && (
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
                      {item.status.toLowerCase() === "not started" && (
                        <div className="rounded-2xl py-1 pr-4 text-xs w-max flex space-x-2 items-center text-[#AF2A3D]">
                          <div className="bg-[#F04438] rounded-full w-[6px] h-[6px]"></div>
                          <p>{item.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
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
