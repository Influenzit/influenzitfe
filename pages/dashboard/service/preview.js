//=========================== TAILWIND STYLES APPLIED HERE =========================

import React, { useEffect, useState } from "react";
import LandingLayout from "../../../layouts/landing.layout";
import Image from "next/image";
import Preview_image from "../../../assets/previewImage.png";
import Accordion from "../../../components/service/accordion";

function Preview() {
  const faqs = [
    {
      q: "Is there a free trial available?",
      a: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      q: "Can I change my plan later?",
      a: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      q: "What is your cancellation policy?",
      a: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      q: "Can other info be added to an invoice?",
      a: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ];

  const [state, setstate] = useState("standard");

  return (
    <LandingLayout>
      <div className="py-28 px-12 b0">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Image
              src={Preview_image}
              alt="preview_image"
              className="w-full h-full rounded-xl"
            />

            <h1 className="text-3xl my-10  font-medium ">
              I will create content for your featuring my dog Seth
            </h1>

            <p className="my-4 text-[#555461]">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur.
            </p>

            <div className="py-10 grid grid-cols-12 gap-4">
              <div className="col-span-2">
                <Image
                  src={Preview_image}
                  alt="preview_image"
                  className="h-20 w-12 rounded-xl"
                />
              </div>

              <div className="col-span-10 flex justify-between items-start">
                <div className="space-y-2">
                  <h1 className="font-medium">Seth the Dog</h1>
                  <p>Nigeria</p>
                </div>
                <button className="px-4 py-3 bg-[#2A2939] text-white rounded-lg">
                  View profile
                </button>
              </div>
            </div>

            <h1 className="text-xl my-5 font-medium">FAQ’s </h1>
            {faqs.map((qa, id) => (
              <Accordion key={id} question={qa.q} answer={qa.a} />
            ))}

          
          </div>
          <div className="col-span-4">
            <div className="border rounded-lg">
              <div className="w-full flex">
                <button
                  onClick={() => {
                    setstate("standard");
                  }}
                  className={`${
                    state === "standard"
                      ? "bg-[#2A2939] text-white"
                      : "bg-[#EAEAEB] text-[#2A2939]"
                  } p-3 w-full rounded-tl-lg`}
                >
                  Standard
                </button>
                <button
                  onClick={() => {
                    setstate("advance");
                  }}
                  className={`${
                    state === "advance"
                      ? "bg-[#2A2939] text-white"
                      : "bg-[#EAEAEB] text-[#2A2939]"
                  } p-3 w-full`}
                >
                  Advanced
                </button>
                <button
                  onClick={() => {
                    setstate("premium");
                  }}
                  className={`${
                    state === "premium"
                      ? "bg-[#2A2939] text-white"
                      : "bg-[#EAEAEB] text-[#2A2939]"
                  } p-3 w-full rounded-tr-lg`}
                >
                  Premium
                </button>
              </div>

              <div className="p-4 ">
                <div className="flex justify-between items-center">
                  <h1 className="uppercase text-xl font-semibold"> {state} </h1>
                  <h1 className="uppercase text-xl font-semibold text-primary-100">
                    ₦300,000
                  </h1>
                </div>

                <p className="text-[#555461] py-5">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className="my-4 flex justify-between items-center">
                  <h1 className="uppercase  ">Delivery Time</h1>
                  <h1 className="uppercase  ">3 days</h1>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="uppercase  ">Delivery Time</h1>
                  <h1 className="uppercase  ">3 days</h1>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="uppercase  ">Delivery Time</h1>
                  <h1 className="uppercase  ">3 days</h1>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="uppercase  ">Delivery Time</h1>
                  <h1 className="uppercase  ">3 days</h1>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="uppercase  ">Delivery Time</h1>
                  <h1 className="uppercase  ">3 days</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5">
        <h1 className="text-xl my-5 font-medium">Gallery </h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Image
              src={Preview_image}
              alt="preview_image"
              className="w-[340px] h-[240px] rounded-xl"
            />
          </div>
          <div>
            <Image
              src={Preview_image}
              alt="preview_image"
              className="w-[340px] h-[240px] rounded-xl"
            />
          </div>
          <div>
            <Image
              src={Preview_image}
              alt="preview_image"
              className="w-[340px] h-[240px] rounded-xl"
            />
          </div>
        </div>
      </div>
        <h1 className="text-xl my-5 font-medium">Reviews </h1>
        <div className="my-5">
          <div className="grid grid-cols-3 gap-6">
            <div className="review-card p-6">
              <div>
                Ut enim ad minim veniam, quis nostrudexercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat aute irure sint
                amet occaecat cupidatat non proident”
              </div>
              <div className="flex space-x-4 my-4">
                <div className="w-2/6">
                  {" "}
                  <Image
                    src={Preview_image}
                    alt="preview_image"
                    className="w-32 h-32 rounded-xl"
                  />
                </div>
                <div className="w-full">
                  <h6 className="font-bold">Mike Warren</h6>
                  <p className="text-[#6F6C90] text-xs">
                    Developer at BRIX Templates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

export default Preview;
