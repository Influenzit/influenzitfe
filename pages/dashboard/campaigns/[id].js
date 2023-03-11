import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../../api/campaigns";
import { setLoading } from "../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../assets/svgIcons";
import avatar1 from "../../../assets/campaign/avatar1.svg";
import Stage1 from "../../../components/Campaign/Stage1";
import Stage2 from "../../../components/Campaign/Stage2";
import Stage3 from "../../../components/Campaign/Stage3";
import LandingLayout from "../../../layouts/landing.layout";

import cancel from "./../../../assets/close.svg";
import chatlady from "./../../../assets/campaign/chatlady.svg";

import ReactStars from "react-rating-stars-component";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [activetab, setactivetab] = useState("milestone");
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
      <div className="w-[55%] pt-28 px-10 min-h-screen">
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
            </div>{" "}
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
          <div className="let swipeIn">Milestone</div>
        )}
        {activetab == "requirement" && (
          <div className="let swipeIn">Requirement </div>
        )}
      </div>
      <div className="w-[480px] fixed right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto pt-28 pb-4 px-4">
        {[1, 2, 3, 4, 5].map((x, i) => (
          <div
            className="mb-6 pr-10 border-r py-1 flex space-x-2 items-start"
            key={i}
          >
            <Image src={chatlady} alt={"img"} className="h-4 w-4" />
            <div>
              <p className="text-xs text-gray-500">
                {" "}
                <span className="font-medium mr-2 text-black">You</span>{" "}
                <span className="text-[10px] ">2:35 pm</span>
              </p>
              <p className="text-gray-500 text-sm">
                Hey bayowaruwa, can you help me with IG template designs?
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
// py-28 px-12
