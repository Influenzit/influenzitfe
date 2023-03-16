//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../../api/campaigns";
import { setLoading } from "../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../assets/svgIcons";
import bold from "../../../assets/campaign/bold.svg";
import italics from "../../../assets/campaign/italics.svg";
import link from "../../../assets/campaign/link.svg";
import listdot from "../../../assets/campaign/listdot.svg";
import listnumeral from "../../../assets/campaign/listnumeral.svg";
import send from "../../../assets/campaign/send.svg";
import lock from "../../../assets/campaign/lock.svg";
import checkmark from "../../../assets/campaign/checkmark.svg";
import reject from "../../../assets/campaign/cancel.svg";

import RejectModal from "../../../components/Campaign/rejectModal";
import LandingLayout from "../../../layouts/landing.layout";

import cancel from "./../../../assets/close.svg";
import chatlady from "./../../../assets/campaign/chatlady.svg";

import ReactStars from "react-rating-stars-component";
import Review from "../../../components/Campaign/Review";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [activetab, setactivetab] = useState("milestone");
  const [isRejected, setisRejected] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);
  const [currentValue, setcurrentValue] = useState(4);
  const [campaignList, setCampaignList] = useState({
    data: [],
  });
  const { id } = router.query;
  console.log(id);
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

  const handleClose = () => {
    setisRejected(false);
  };
  const handleCloseReview = () => {
    setisAccepted(false);
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
    <div className="flex bg-gray-50">
      <div className="w-full md:mr-[500px] pt-28 px-10 min-h-screen">
        <h1 className="text-xl font-bold">
          1 Instagram post and 1 story for Krystal beauty
        </h1>
        <div className="my-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="pr-10 border-r py-1 flex space-x-2">
              <Image src={chatlady} alt={"img"} className="h-4 w-4" />
              <div>
                <p className="text-xs text-gray-500">Influencer</p>
                <h1 className="font-medium">Seth the Dog</h1>
              </div>
            </div>
            <div className="pr-10 border-r py-1 flex space-x-2">
              <div>
                <p className="text-xs text-gray-500">Delivery Date</p>
                <h1 className="font-medium">Jan 8, 1:09 PM</h1>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <h1 className="font-medium">₦120,000</h1>
            </div>
          </div>
        </div>
        <div className="mb-4">
          Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui
          officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu
          omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu
          ipsa quae ab illoion inventore veritatisetm quasitea architecto
          beataea dictaed quia couuntur magni.
        </div>

        <div className="flex space-x-4 w-full border-b mb-4">
          <button
            onClick={() => {
              setactivetab("milestone");
            }}
            className={`${
              activetab == "milestone" &&
              "text-primary-100 border-b border-primary-100"
            } pb-4`}
          >
            Milestones
          </button>
          <button
            onClick={() => {
              setactivetab("requirement");
            }}
            className={`${
              activetab == "requirement" &&
              "text-primary-100 border-b border-primary-100"
            } pb-4`}
          >
            Requirements
          </button>
        </div>
        {activetab == "milestone" && (
          <div className="let swipeIn">
            <h1 className="text-xl font-semibold my-6">Milestone</h1>

            <div className="realtive">
              {
                //============================= Tracker==========================
              }
              <div className="absolute h-[400px] z-[-1] w-[2px] bg-gray-300 left-8"></div>
              <div className="bg-white border border-gray-200 px-4 py-5 rounded-lg mb-4">
                <div className="py-1 flex space-x-3">
                  <Image src={checkmark} alt={"img"} className="h-4 w-4" />
                  <div>
                    <h1 className="">Prep images for posting</h1>
                    <p className="text-sm font-semibold text-tert-100">
                      ₦40,000
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 px-4 py-5 rounded-lg mb-4">
                <div className="py-1 flex space-x-3">
                  <Image src={checkmark} alt={"img"} className="h-4 w-4" />
                  <div>
                    <h1 className="">Prep images for posting</h1>
                    <p className="text-sm font-semibold text-tert-100">
                      ₦40,000
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 px-4 py-5 rounded-lg mb-4">
                <div className="-1 flex justify-between">
                  <div className="flex space-x-3 ">
                    <Image src={reject} alt={"img"} className="h-4 w-4" />
                    <div>
                      <h1 className="">Prep images for posting</h1>
                      <p className="text-sm font-semibold text-tert-100">
                        ₦40,000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white">
                      Accept
                    </button>
                    <button className="mx-2 rounded-lg py-1 px-2  h-auto bg-primary-100 text-[10px] text-white">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 px-4 py-5 rounded-lg mb-4">
                <div className="-1 flex justify-between">
                  <div className="flex space-x-3 ">
                    <Image src={lock} alt={"img"} className="h-4 w-4" />
                    <div>
                      <h1 className="">Prep images for posting</h1>
                      <p className="text-sm font-semibold text-tert-100">
                        ₦40,000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white">
                      Accept
                    </button>
                    <button className="mx-2 rounded-lg py-1 px-2  h-auto bg-primary-100 text-[10px] text-white">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 px-4 py-5 rounded-lg mb-4">
                <div className="-1 flex justify-between">
                  <div className="flex space-x-3 ">
                    <Image src={lock} alt={"img"} className="h-4 w-4" />
                    <div>
                      <h1 className="">Prep images for posting</h1>
                      <p className="text-sm font-semibold text-tert-100">
                        ₦40,000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setisAccepted(!isAccepted);
                      }}
                      className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setisRejected(!isRejected);
                      }}
                      className="mx-2 rounded-lg py-1 px-2  h-auto bg-primary-100 text-[10px] text-white"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activetab == "requirement" && (
          <div className="let swipeIn">Requirement </div>
        )}

        <div className="flex justify-end my-12">
          <button className="text-primary-100">Cancel Campaign</button>
        </div>
      </div>

      {
        // ====================================ChatBox==================================
      }

      <div className="w-[480px] fixed right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto pt-28 pb-4 px-4">
        <div className="flex flex-col gap-5 h-full relative pb-[140px]">
          <div className="h-full overflow-y-auto">
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map(
              (x, i) => (
                <div
                  className="mb-6 pr-10 py-1 flex space-x-2 items-start"
                  key={i}
                >
                  <Image src={chatlady} alt={"img"} className="h-4 w-4" />
                  <div>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium mr-2 text-black">You</span>
                      <span className="text-[10px] ">2:35 pm</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Hey bayowaruwa, can you help me with IG template designs?
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="h-[120px] absolute bottom-0  w-full ">
            <div className="border rounded-lg h-full flex flex-col">
              <div className="h-[63%]">
                <textarea
                  name="chatbox"
                  id="chatbox"
                  rows="2"
                  className="resize-none text-sm w-full h-full rounded-lg  outline-none bg-transparent p-2"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <div className="h-[37%] border-t flex justify-between p-2">
                <div className="flex items-center space-x-2">
                  <Image src={bold} alt={"img"} className="h-4 w-4" />
                  <Image src={italics} alt={"img"} className="h-4 w-4" />
                  <Image src={link} alt={"img"} className="h-4 w-4" />
                  <Image src={listdot} alt={"img"} className="h-4 w-4" />
                  <Image src={listnumeral} alt={"img"} className="h-4 w-4" />
                </div>
                <div>
                  <button className="flex items-center space-x-1">
                    <Image src={send} alt={"img"} className="h-4 w-4" />{" "}
                    <span className="text-primary-100  text-sm">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isRejected && <RejectModal handleClose={handleClose} />}
      {isAccepted && <Review handleClose={handleCloseReview} />}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
// py-28 px-12
