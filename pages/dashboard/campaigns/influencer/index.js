import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns, handleCreateCampaign } from "../../../../api/campaigns";
import { setLoading } from "../../../../app/reducers/status";
import Stage1 from "../../../../components/Campaign/Stage1";
import Stage2 from "../../../../components/Campaign/Stage2";
import Stage3 from "../../../../components/Campaign/Stage3";
import LandingLayout from "../../../../layouts/landing.layout";

import cancel from "./../../../../assets/close.svg";
import moment from "moment";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [step, setstep] = useState(1);
  const [campaignList, setCampaignList] = useState(null);
  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];
// Ongoing
// Pending
// Completed
// Defaulted
// Disputed



  const payload = {
    title: "Create and run  Tiktok Campaign for 1 month",
    amount: 1000,
    currency: "NGN",
    description: "Create and run  Tiktok Campaign for 1 month",
    status: "Pending",
    start_date: "2022-11-20",
    end_date: "2023-01-20",
    duration_type: "Month",
    duration_count: "1",
    client_business_id: "1102",
    service_package_id: "10",
    client_email: "businessowner@influenzit.com",
    milestones: [
      {
        title: "Create Design ",
        description: "produce social media standard designs and fliers",
        status: "Pending",
        amount: 2000,
        currency: "NGN",
        start_date: "2023-01-20",
        end_date: "2023-02-20",
      },
      {
        title: "Create Copy ",
        description: "Write copy for ads",
        status: "Pending",
        amount: 2000,
        currency: "NGN",
        start_date: "2023-03-20",
        end_date: "2023-04-20",
      },
    ],
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

  useEffect(() => {
    // handleCreateCampaign(payload);
    handleGetCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 px-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">My Campaigns</h1>

        <button
          onClick={() => {
            setNewCampaign(!newCamPaign);
          }}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white"
        >
          New campaign
        </button>
      </div>

      {campaignList !== null ? (
        <div className="table mt-10 campaign_table w-full text-[#667085]">
          <div className="grid grid-cols-12 gap-4 bg-[#F9FAFB] p-4 rounded-t-lg border-b">
            <div className="col-span-5">Business</div>
            <div className="col-span-3">Channel</div>
            <div className="col-span-2">Delivery date</div>
            <div className="col-span-2">Status</div>
          </div>
          {campaignList.map((item, idx) => (
            <div className="grid grid-cols-12 gap-4 p-4 border-b" key={idx}>
              <div className="col-span-5 text-sm truncate">
                {" "}
                <Link href={`/dashboard/campaigns/influencer/${item.id}`}>
                  {item.title}
                </Link>{" "}
              </div>
              <div className="col-span-3 flex space-x-2 items-center">
                {platform.map((img) => (
                  <div key={`img${idx}`}>
                    <Image
                      src={require(`./../../../../assets/${img}.svg`)}
                      alt={img}
                      className="h-4 w-4"
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-2 text-sm">{ moment(item.end_date).format('LL') }</div>
              <div className="col-span-2">
                {item.status.toLowerCase() === "ongoing" && (
                  <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#F2F4F7] text-xs w-max flex space-x-2 items-center text-[#344054]">
                    <div className="bg-[#667085] rounded-full w-[6px] h-[6px]"></div>
                    <p>{item.status}</p>
                  </div>
                )}
                {item.status.toLowerCase() === "completed" && (
                  <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#ECFDF3] text-xs w-max flex space-x-2 items-center text-[#027A48]">
                    <div className="bg-[#12B76A] rounded-full w-[6px] h-[6px]"></div>
                    <p>{item.status}</p>
                  </div>
                )}
                {item.status.toLowerCase() === "cancelled" && (
                  <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#FEF3F2] text-xs w-max flex space-x-2 items-center text-[#B42318]">
                    <div className="bg-[#F04438] rounded-full w-[6px] h-[6px]"></div>
                    <p>{item.status}</p>
                  </div>
                )}
                {item.status.toLowerCase() === "pending" && (
                  <div className="rounded-2xl py-1 pl-2 pr-4 bg-[#FEF3F2] text-xs w-max flex space-x-2 items-center text-[#B42318]">
                    <div className="bg-gray-500 rounded-full w-[6px] h-[6px]"></div>
                    <p>{item.status}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex p-4 justify-between text-sm">
            <div>
              <p>Page 1 0f 10</p>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="border shadow-sm px-2 py-[6px] rounded-md ">
                Previous
              </div>
              <div className="border shadow-sm px-2 py-[6px] rounded-md ">
                Next
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {newCamPaign && (
        <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
          <div className="bg-white w-[500px]  p-6 rounded-lg overflow-hidden">
            <div className="flex justify-between mb-6">
              <h1 className="text-xl">Create New Campaign</h1>

              <button
                onClick={() => {
                  setNewCampaign(!newCamPaign);
                }}
                className="outline-none"
              >
                <Image src={cancel} alt="cancel" className="h-2 w-2" />
              </button>
            </div>
            <div className="my-4 bg-[#D4D4D8] h-[2px] w-full rounded-lg mt-6">
              <div
                className={`bg-primary-100 w-${step}/3 h-full rounded-lg`}
              ></div>
            </div>

            {step == 1 && <Stage1 />}
            {step == 2 && <Stage2 />}
            {step == 3 && <Stage3 />}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (step <= 3) {
                    setstep(step + 1);
                  }
                }}
                className="bg-primary-100 py-2 px-4 rounded-lg text-white"
              >
                Next{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
