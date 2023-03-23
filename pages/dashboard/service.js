import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Overview from "../../components/service/overview";
import LandingLayout from "../../layouts/landing.layout";

// import cancel from "./../../../../assets/close.svg";
import serviceimage from "../../assets/serviceimage.svg";
import addservice from "../../assets/addservice.svg";
import moment from "moment";

const Services = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isServiceModalOpen, setisServiceModalOpen] = useState(false);
  const [step, setstep] = useState(1);
  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];

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
    if (step >= 1 && step < 6) {
      setstep(step + 1);
    }
  };
  const handleDecrement = () => {
    if (step > 1 && step <= 6) {
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
                clasName="h-full w-full"
              />

              <div className="space-y-4 p-4">
                <div className=" flex space-x-2 items-center">
                  {platform.map((img) => (
                    <div key={img}>
                      <Image
                        src={require(`../../assets/${img}.svg`)}
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
                clasName="h-full w-full"
              />
              <p>Add a service</p>
            </button>
          </div>
        </div>
      </div>

      {isServiceModalOpen && (
        <div clasName="bg-white fixed inset-0 px-[100px] py-10 ">
          <div className="flex justify-end mb-5">
            <button>
              <Image src={close} alt="close" />
            </button>
          </div>
          <div clasName="w-[80%] mx-auto">
            <div className="flex space-x-2">
              <div clasName="">Overview</div>
              <div clasName="">Pricing</div>
              <div clasName="">Gallery</div>
              <div clasName="">Requirements</div>
              <div clasName="">FAQ</div>
              <div clasName="">Review</div>
            </div>
            <div className="flex space-x-2">
              <div
                clasName={` ${
                  step > 0 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-2 rouned-full`}
              ></div>
              <div
                clasName={` ${
                  step > 1 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-2 rouned-full`}
              ></div>
              <div
                clasName={` ${
                  step > 2 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-2 rouned-full`}
              ></div>
              <div
                clasName={` ${
                  step > 3 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-2 rouned-full`}
              ></div>
              <div
                clasName={` ${
                  step > 4 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-2 rouned-full`}
              ></div>
              <div
                clasName={` ${
                  step > 5 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-2 rouned-full`}
              ></div>
            </div>

            {step === 1 && <Overview />}
          </div>
        </div>
      )}
    </div>
  );
};

Services.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Services;
