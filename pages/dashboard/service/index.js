import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Overview from "../../../components/service/overview";
import LandingLayout from "../../../layouts/landing.layout";

import close from "../../../assets/closeservice.svg";
import serviceimage from "../../../assets/serviceimage.svg";
import addservice from "../../../assets/addservice.svg";
import moment from "moment";
import Pricing from "../../../components/service/pricing";
import Gallery from "../../../components/service/gallery";
import Faq from "../../../components/service/faq";
import Review from "../../../components/service/review";

const Services = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isServiceModalOpen, setisServiceModalOpen] = useState(false);
  const [step, setstep] = useState(1);
  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];

  const [currentPackagesIndex, setcurrentPackagesIndex] = useState(0);
  const [faqs, setfaqs] = useState([{ question: "", answer: "" }]);
  const [review, setreview] = useState({ name: "", comment: "" });
  const [packages, setpackages] = useState([
    {
      description: "",
      amount: 0,
      currency: "NGN",
      name: "",
      features: [
        {
          name: "",
          quantity: "",
        },
      ],
    },
    {
      description: "",
      amount: 0,
      currency: "NGN",
      name: "",
      features: [
        {
          name: "",
          quantity: "",
        },
      ],
    },
    {
      description: "",
      amount: 0,
      currency: "NGN",
      name: "",
      features: [
        {
          name: "",
          quantity: "",
        },
      ],
    },
  ]);

  const handleAddFaq = () => {
    setfaqs((prevState) => {
      const newState = [...prevState, { question: "", answer: "" }];

      console.log(newState);
      return newState;
    });
  };
  

  const handleAddFeature = () => {
    setpackages((prevState) => {
      const newState = [...prevState];
      const newFeatures = [
        ...newState[currentPackagesIndex].features,
        {
          name: "",
          quantity: "",
        },
      ];
      newState[currentPackagesIndex] = {
        ...newState[currentPackagesIndex],
        features: newFeatures,
      };
      return newState;
    });
  };
  const handleRemoveFaq = (id) => {
    setfaqs((prevState) => {
      const newState = [...prevState];
      newState.splice(id, 1);

      return newState;
    });
  };
  const handleRemove = (id) => {
    setpackages((prevState) => {
      const newState = [...prevState];
      const newFeatures = [...newState[currentPackagesIndex].features];
      newFeatures.splice(id, 1);
      newState[currentPackagesIndex] = {
        ...newState[currentPackagesIndex],
        features: newFeatures,
      };
      console.log(newState);
      return newState;
    });
    console.log(id);
  };

  const handleGetCampaign = (campaign) => {
    // getCampaigns()
    //   .then((res) => {
    //     console.log(res);
    //     setCampaignList(res.data.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };
  const handleIncrement = () => {
    if (step >= 1 && step < 5) {
      setstep(step + 1);
    }
  };
  const handleDecrement = () => {
    if (step > 1 && step <= 5) {
      setstep(step - 1);
    }
  };

  useEffect(() => {
    // handleGetCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 px-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">My Services</h1>
      </div>

      <div className="mt-7">
        <div className="grid grid-cols-4 gap-6 items-stretch">
          {[1, 2, 3].map((x, idx) => (
            <div
              key={idx}
              className="service-card hover:shadow-xl duration-300"
            >
              <Image
                src={serviceimage}
                alt="title_image"
                className="h-full w-full object-cover"
              />

              <div className="space-y-4 p-4">
                <div className=" flex space-x-2 items-center">
                  {platform.map((img) => (
                    <div key={img}>
                      <Image
                        src={require(`../../../assets/${img}.svg`)}
                        alt={img}
                        className="h-5 w-5 rounded-lg mx-2"
                      />
                    </div>
                  ))}
                </div>
                <p>Instagram campaign to boost brand/product visibility</p>

                <p>From ₦50,000</p>
              </div>
            </div>
          ))}
          <div className="service-card-add grid place-content-center">
            <button
              onClick={() => {
                setisServiceModalOpen(!isServiceModalOpen);
              }}
            >
              <Image
                src={addservice}
                alt="add_service"
                className="h-full w-full"
              />
              <p>Add a service</p>
            </button>
          </div>
        </div>
      </div>

      {isServiceModalOpen && (
        <div className="bg-white fixed overflow-y-auto inset-0 px-[100px] py-10  z-[999999]">
          <div className="flex justify-end mb-5">
            <button
              onClick={() => {
                setisServiceModalOpen(!isServiceModalOpen);
              }}
            >
              <Image src={close} alt="close" />
            </button>
          </div>
          <div className="w-[80%] mx-auto">
            <div className="grid grid-cols-5 gap-4 text-[#94949C] text-sm mb-2">
              <div className="">Overview</div>
              <div className="">Pricing</div>
              <div className="">Gallery</div>
              <div className="">FAQ</div>
              <div className="">Review</div>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div
                className={` ${
                  step > 0 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
              <div
                className={` ${
                  step > 1 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
              <div
                className={` ${
                  step > 2 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>

              <div
                className={` ${
                  step > 3 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
              <div
                className={` ${
                  step > 4 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
            </div>

            <section className="mt-4">
              {step === 1 && (
                <Overview
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              )}
              {step === 2 && (
                <Pricing
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  packages={packages}
                  setpackages={setpackages}
                  handleAddFeature={handleAddFeature}
                  handleRemove={handleRemove}
                  currentPackagesIndex={currentPackagesIndex}
                  setcurrentPackagesIndex={setcurrentPackagesIndex}
                />
              )}
              {step === 3 && (
                <Gallery
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              )}

              {step === 4 && (
                <Faq
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleAddFaq={handleAddFaq}
                  handleRemoveFaq={handleRemoveFaq}
                  faqs={faqs}
                />
              )}
              {step === 5 && (
                <Review
                  review={review}
                  setreview={setreview}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

Services.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Services;
