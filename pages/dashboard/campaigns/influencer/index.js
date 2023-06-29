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
import { Milestone } from "../../../../styles/view.style";
import { toast } from "react-toastify";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [step, setstep] = useState(1);
  const [campaignList, setCampaignList] = useState(null);

  const [campaignName, setCampaignName] = useState("");
  const [bId, setbId] = useState("");
  const [description, setdescription] = useState("");

  const [endDate, setendDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [milestone, setmilestone] = useState([
    {
      title: "",
      description: "No description",
      status: "Ongoing",
      amount: 0,
      currency: "NGN",
      start_date: "2022/11/20",
      end_date: "",
      include_price: false
    },
  ]);

  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];
  // Ongoing
  // Pending
  // Completed
  // Defaulted
  // Disputed
  const handleAddMilestone = () => {
    setmilestone((prevState) => {
      const newState = [
        ...prevState,
        {
          title: "",
          description: "No description",
          status: "Ongoing",
          amount: 0,
          currency: "NGN",
          start_date: "2022/11/20",
          end_date: "",
          include_price: false,
        },
      ];

      return newState;
    });
  };
  const handleRemoveMilestone = (id) => {
    setmilestone((prevState) => {
      const newState = [...prevState];
      newState.splice(id, 1);

      return newState;
    });
  };
  const handleIncrement = () => {
    if (step >= 1 && step < 3) {
      setstep(step + 1);
    }
  };
  const handleDecrement = () => {
    if (step > 1 && step <= 3) {
      setstep(step - 1);
    }
  };

  const handleMilestoneinput = (e, mid) => {
    const { name, value, checked } = e.target;

    setmilestone((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[mid][name] = name === "include_price" ? checked : value;
      console.log(newState);
      return newState;
    });
  };
  const filterMilestone = (milestoneI) => {
    const newMilestone = milestoneI.map((m) => {
      const nm = {...m, amount: m.include_price ? Number(m.amount) : 0}
      delete nm["include_price"]
      return nm;
    })
    console.log(newMilestone);
    return newMilestone;
  }

  const payload = {
    title: campaignName,
    amount: 0,
    currency: "NGN",
    description: description,
    status: "Pending",
    start_date: "2022-11-20",
    end_date: endDate,
    duration_type: "Month",
    duration_count: "1",
    client_business_id: +bId,
    milestones: filterMilestone(milestone),
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

  const CreateCampaign = () => {
    console.log(payload);
    setLoading(true);
    handleCreateCampaign(payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Campaign created Succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleGetCampaign();
        setNewCampaign(false);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 md:px-12 px-4">
      <div className="flex justify-between mb-6">
        <h1 className="md:text-xl">My Campaigns</h1>

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
        <div className="w-full overflow-x-auto">
          <div className="table mt-10 campaign_table md:w-full min-w-[1000px] text-[#667085] ">
            <div className="grid grid-cols-12 gap-4 bg-[#F9FAFB] p-4 rounded-t-lg border-b">
              <div className="col-span-5">Campaign Name</div>
              <div className="col-span-3">Channel</div>
              <div className="col-span-2">Delivery date</div>
              <div className="col-span-2">Status</div>
            </div>
            {campaignList.map((item, idx) => (
              <div className="grid grid-cols-12 gap-4 p-4 border-b cursor-pointer" key={idx} onClick={() => router.push(`/dashboard/campaigns/influencer/${item.id}`)}>
                <div className="col-span-5 text-sm truncate">
                  {" "}
                  <p>
                    {item.title}
                  </p>{" "}
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
                <div className="col-span-2 text-sm">
                  {moment(item.end_date).format("LL")}
                </div>
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
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {newCamPaign && (
        <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
          <div className="bg-white w-[500px] max-h-screen overflow-y-scroll p-6 rounded-lg overflow-hidden">
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
            <div className="grid grid-cols-3 gap-4 mb-4">
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
            </div>

            {step == 1 && (
              <Stage1
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                campaignName={campaignName}
                setCampaignName={setCampaignName}
                bId={bId}
                setbId={setbId}
                description={description}
                setdescription={setdescription}
              />
            )}
            {step == 2 && (
              <Stage2
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                setmilestone={setmilestone}
                milestone={milestone}
                handleMilestoneinput={handleMilestoneinput}
                handleAddMilestone={handleAddMilestone}
                handleRemoveMilestone={handleRemoveMilestone}
              />
            )}
            {step == 3 && (
              <Stage3
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                endDate={endDate}
                setendDate={setendDate}
                amount={amount}
                setAmount={setAmount}
                handleCreateCampaign={CreateCampaign}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
