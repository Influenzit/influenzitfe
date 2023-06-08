//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCampaign,
  getCampaignMilestones,
  handleCreateCampaign,
  updateCampaign,
  updateCampaignMilestone,
} from "../../../../api/campaigns";
import { setLoading } from "../../../../app/reducers/status";
import bold from "../../../../assets/campaign/bold.svg";
import italics from "../../../../assets/campaign/italics.svg";
import link from "../../../../assets/campaign/link.svg";
import listdot from "../../../../assets/campaign/listdot.svg";
import listnumeral from "../../../../assets/campaign/listnumeral.svg";
import send from "../../../../assets/campaign/send.svg";
import lock from "../../../../assets/campaign/lock.svg";
import checkmark from "../../../../assets/campaign/checkmark.svg";
import reject from "../../../../assets/campaign/cancel.svg";

import RejectModal from "../../../../components/Campaign/rejectModal";
import LandingLayout from "../../../../layouts/landing.layout";

import cancel from "./../../../../assets/close.svg";
import chatlady from "./../../../../assets/campaign/chatlady.svg";
import Chat from "../../../../components/Chat";

import ReactStars from "react-rating-stars-component";
import Review from "../../../../components/Campaign/Review";
import moment from "moment";
import { toast } from "react-toastify";
import { SubmitButton } from "styles/auth.style";
const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [conversationId, setconversationId] = useState(null);
  const [newCamPaign, setNewCampaign] = useState(false);
  const [activetab, setactivetab] = useState("milestone");
  const [activeScreen, setactiveScreen] = useState("detail");
  const [isRejected, setisRejected] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentValue, setcurrentValue] = useState(4);
  const [clickedkMileStone, setclickedkMileStone] = useState(null);
  const [singlecampaign, setSingleCampaign] = useState(null);
  const [singlecampaignMilestones, setSingleCampaignMilestones] =
    useState(null);
  const { id } = router.query;

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleClose = () => {
    setisRejected(false);
  };
  const handleCloseReview = () => {
    setisAccepted(false);
  };

  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];
  const handleMilestoneStatus = (status) => {
    if (status.toLowerCase() === "completed") {
      return checkmark;
    }
    if (status.toLowerCase() === "disputed") {
      return reject;
    } else {
      return lock;
    }
  };
  const handleGetSingleCampaign = () => {
    getCampaign(id)
      .then((res) => {
        console.log(res);
        setSingleCampaign(res.data.data);
        setconversationId(res.data.data.conversation.id);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleCompleteCampaign = () => {
    dispatch(setLoading(true));
    updateCampaign(id, {
      status: "Completed",
      end_date: singlecampaign.end_date,
      start_date: singlecampaign.start_date,
    }).then((res) => {
      toast.success("Campaign updated", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setisAccepted(true);
      handleGetSingleCampaign();
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.response);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  const updateCampaignMilsestone = (status, campaignId) => {
    setclickedkMileStone(campaignId);
    const payload = {
      status: status,
    };
    setIsUpdating(true);
    updateCampaignMilestone(id, payload, campaignId)
      .then((res) => {
        console.log(res);
        toast.success("Milestone updated succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsUpdating(false);
        handleGetSingleCampaign();
      })
      .catch((err) => {
        setIsUpdating(false);
        console.log(err.response);
      });
  };

  useEffect(() => {
    handleGetSingleCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 md:hidden  px-4 pt-20 space-x-4 w-full border-b mb-4">
        <button
          onClick={() => {
            setactiveScreen("detail");
          }}
          className={`${
            activeScreen == "detail" &&
            "text-primary-100 border-b border-primary-100"
          } pb-4`}
        >
          Campaign Details
        </button>
        <button
          onClick={() => {
            setactiveScreen("chat");
          }}
          className={`${
            activeScreen == "chat" &&
            "text-primary-100 border-b border-primary-100"
          } pb-4`}
        >
          Chat
        </button>
      </div>
      {activeScreen === "detail" ? (
        <div>
          {singlecampaign !== null ? (
            <div className="w-full md:pr-[500px]  md:pt-28 pt-4 md:px-10 px-4 ">
              <div>
                <h1 className="text-xl font-bold">{singlecampaign.title}</h1>
                <div className="my-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="pr-10 md:border-r py-1 flex space-x-2">
                      <Image
                        src={singlecampaign.user.profile_pic}
                        alt={"img"}
                        className="h-4 w-4 rounded-full"
                        height="60"
                        width="60"
                      />
                      <div>
                        <p className="text-xs text-gray-500">Influencer</p>
                        <h1 className="font-medium">
                          {" "}
                          {singlecampaign.user.name}{" "}
                        </h1>
                      </div>
                    </div>
                    <div className="pr-10 md:border-r py-1 flex space-x-2">
                      <div>
                        <p className="text-xs text-gray-500">Delivery Date</p>
                        <h1 className="font-medium">
                          {" "}
                          {moment(singlecampaign.end_date).format("LL")}{" "}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <h1 className="font-medium">
                        ₦{singlecampaign.amount || "20,000"}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="mb-4">{singlecampaign.description}</div>
                {
                  singlecampaign?.status !== "Completed" ? (<SubmitButton style={{ width: "150px", fontSize: "14px", margin: "10px 0" }} onClick={handleCompleteCampaign}>Complete Campaign</SubmitButton>): null
                }
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
                  <div className="">
                    <h1 className="text-xl font-semibold my-6">Milestone</h1>

                    <div className="realtive">
                      {
                        //============================= Tracker==========================
                      }
                      <div className="absolute h-[70%] z-[-1]  w-[2px] bg-gray-300 left-8"></div>
                      {singlecampaign.milestones.length > 0 &&
                        singlecampaign.milestones.map((item, idx) => (
                          <div
                            className="bg-white border border-gray-200 px-4 py-5 rounded-lg mb-4"
                            key={idx}
                          >
                            <div className="-1 flex justify-between">
                              <div className="flex space-x-3 ">
                                <Image
                                  src={handleMilestoneStatus(item.status)}
                                  alt={"img"}
                                  className="h-4 w-4"
                                />{" "}
                                <div>
                                  <h1 className="">{item.title}</h1>
                                  <p className="text-sm font-semibold text-tert-100">
                                    ₦{item.amount}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {item.status === "Reviewing" && (
                                  <button
                                    className="mx-2 rounded-lg py-1 px-2  h-auto bg-yellow-600 text-[10px] text-white"
                                    disable
                                  >
                                    Pending review
                                  </button>
                                )}{" "}
                                {item.status === "Ongoing" && (
                                  <button
                                    onClick={() => {
                                      updateCampaignMilsestone(
                                        "Reviewing",
                                        item.id
                                      );
                                    }}
                                    className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white"
                                  >
                                    {isUpdating && item.id === clickedkMileStone
                                      ? "Updating"
                                      : "Submit"}
                                  </button>
                                )}
                                {item.status === "Disputed" && (
                                  <button
                                    onClick={() => {
                                      updateCampaignMilsestone(
                                        "Reviewing",
                                        item.id
                                      );
                                    }}
                                    className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white"
                                  >
                                    {isUpdating && item.id === clickedkMileStone
                                      ? "Updating"
                                      : "Re-Submit"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {activetab == "requirement" && (
                  <div className="">Requirement </div>
                )}

                {/*    <div className="flex justify-end my-12">
            <button className="text-primary-100">Cancel Campaign</button>
          </div> */}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div className=" md:w-[480px] w-full  right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto  pb-4 px-4">
          <Chat
            serviceId={id}
            service="campaigns"
            conversationId={conversationId}
          />
        </div>
      )}

      {
        // ====================================ChatBox==================================
      }

      <div className=" md:w-[480px] fixed md:block hidden right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto  pb-4 px-4">
        <Chat
          serviceId={id}
          service="campaigns"
          conversationId={conversationId}
        />
      </div>
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
// py-28 md:px-12 px-4
