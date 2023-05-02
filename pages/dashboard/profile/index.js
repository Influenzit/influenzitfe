//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../assets/svgIcons";
import Stage1 from "../../../components/profile/stage1";
import Stage2 from "../../../components/profile/stage2";
import Stage3 from "../../../components/profile/stage3";
import Stage4 from "../../../components/profile/stage4";
import Stage5 from "../../../components/profile/stage5";
import LandingLayout from "../../../layouts/landing.layout";

import cancel from "./../../../assets/close.svg";
import instagram from "./../../../assets/instagram.svg";
import twitter from "./../../../assets/twitter.svg";
import tiktok from "./../../../assets/tiktok.svg";
import facebook from "./../../../assets/facebook.svg";
import youtube from "./../../../assets/youtube.svg";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { getUser, updateUser } from "../../../app/reducers/user";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const router = useRouter();
  const [step, setstep] = useState(1);
  const [currentValue, setcurrentValue] = useState(4);
  // dispatch(updateUser(userRes.data.data));
  //

  const [activetab, setactivetab] = useState("profile_details");

  return (
    <div className="py-28 md:px-12 px-4 ">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl">Account Settings </h1>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex space-x-4 w-full border-b mb-4 md:w-full min-w-[1200px]">
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
          <button
            onClick={() => {
              setactivetab("social");
            }}
            className={`${
              activetab === "social" &&
              "text-primary-100 border-b border-primary-100"
            } pb-4`}
          >
            Connect Social Media
          </button>
        </div>
      </div>

      {activetab === "profile_details" && <Stage1 user={user} />}
      {activetab === "influencer_details" && <Stage2 user={user} />}
      {activetab === "images" && <Stage3 user={user} />}
      {activetab === "change_password" && <Stage4 user={user} />}
      {activetab === "social" && <Stage5 user={user} />}
    </div>
  );
};

Profile.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Profile;
