//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  acceptCampaignMilestone,
  rejectCampaignMilestone,
  getCampaign,
  getCampaignInvoice,
} from "../../../../api/campaigns";
import { setLoading } from "../../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../../assets/svgIcons";
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
import { toast } from "react-toastify";
import { getUser } from "app/reducers/user";
import { useSelector } from "react-redux";

import ReactStars from "react-rating-stars-component";
import Review from "../../../../components/Campaign/Review";
import Chat from "../../../../components/Chat";
import moment from "moment";
import { usePaystackPayment } from "react-paystack";
import { calculateTotalPrice } from "paystack-transaction-charges-to-cus";
import { createPaymentLog, processPayment } from "api/payment";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [newCamPaign, setNewCampaign] = useState(false);
  const [activetab, setactivetab] = useState("milestone");
  const [isRejected, setisRejected] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);
  const [currentValue, setcurrentValue] = useState(4);
  const [singlecampaign, setSingleCampaign] = useState(null);
  const [singlecampaignInvoice, setSingleCampaignInvoice] = useState([]);
  const [paystackConfig, setPaystackConfig] = useState({});
  const [activeScreen, setactiveScreen] = useState("detail");

  const [makePayment, setmakePayment] = useState(false);
  const [triggerPayment, settriggerPayment] = useState(false);
  const [amount, setamount] = useState(0);

  const { id } = router.query;
  const user = useSelector(getUser);
  console.log(user);

  const handleMilestoneStatus = (status) => {
    if (
      status.toLowerCase() === "ongoing" ||
      status.toLowerCase() === "unpaid"
    ) {
      return lock;
    }
    if (
      status.toLowerCase() === "completed" ||
      status.toLowerCase() === "paid"
    ) {
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
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleGetSingleCampaignInvoice = () => {
    getCampaignInvoice(id)
      .then((res) => {
        console.log(res.data.data);
        setSingleCampaignInvoice(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const updateCampaignMilsestone = (status, campaignId) => {
    const payload = {
      status: status,
    };
    if (status === "accept") {
      acceptCampaignMilestone(id, campaignId)
        .then((res) => {
          console.log(res);
          toast.success("Milestone updated succesfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleGetSingleCampaign();
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      rejectCampaignMilestone(id, campaignId)
        .then((res) => {
          console.log(res);
          toast.success("Milestone updated succesfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleGetSingleCampaign();
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleClose = () => {
    setisRejected(false);
  };
  const handleCloseReview = () => {
    setisAccepted(false);
  };

  // const user = useSelector(getUser);

  let paymentReference = "";
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    handleProcessTransaction(reference);
    window.location.reload();
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handleCreateTransaction = async (invoiceId, amt) => {
    setLoading(true);
    const payload = {
      channel: "paystack",
      amount: +amt,
      currency: "NGN",
      invoice_id: invoiceId,
      payment_type: "invoice_payment",
    };
    await createPaymentLog(payload)
      .then((res) => {
        console.log(res);
        console.log(res.data.data.payment_reference);
        paymentReference = res.data.data.payment_reference.toString();
        setPaystackConfig({
          currency: "NGN",
          reference: paymentReference,
          email: user.email,
          amount: calculateTotalPrice(Number(amt * 100)), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
          publicKey: "pk_test_9d97cf0be86b0758ece444694d57a8db41a4be59",
        });
        setmakePayment(true);
        settriggerPayment(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleProcessTransaction = async (data) => {
    const payload = {
      channel: "paystack",
      payment_reference: data.reference,
    };
    await processPayment(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const PayInvoice = (invoiceId, amt) => {
    console.log(amt);
    handleCreateTransaction(invoiceId, amt);
    setamount(amt);
  };
  useEffect(() => {
    if (makePayment) {
      initializePayment(onSuccess, onClose);
    }
  }, [triggerPayment]);
  useEffect(() => {
    handleGetSingleCampaign();
    handleGetSingleCampaignInvoice();
    // handleGetSingleCampaignMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className=" flex flex-col bg-gray-50 min-h-screen">
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
            <div className="w-full md:mr-[500px] md:pt-28 pt-4 md:px-10 px-4 ">
              <h1 className="text-xl font-bold">{singlecampaign.title}</h1>
              <div className="my-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:pr-10 md:border-r py-1 flex space-x-2">
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
                  <div className="md:pr-10 md:border-r py-1 flex space-x-2">
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
                    setactivetab("invoice");
                  }}
                  className={`${
                    activetab == "invoice" &&
                    "text-primary-100 border-b border-primary-100"
                  } pb-4`}
                >
                  Invoice
                </button>
              </div>
              {activetab == "milestone" && (
                <div className="let swipeIn">
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
                            {item.status === "Reviewing" && (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    updateCampaignMilsestone("accept", item.id);
                                  }}
                                  className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => {
                                    updateCampaignMilsestone(
                                      "dispute",
                                      item.id
                                    );
                                  }}
                                  className="mx-2 rounded-lg py-1 px-2  h-auto bg-primary-100 text-[10px] text-white"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {activetab == "invoice" && (
                <div className="let swipeIn">
                  <div className="">
                    {
                      //============================= Tracker==========================
                    }
                    {singlecampaignInvoice.length > 0 &&
                      singlecampaignInvoice.map((item, idx) => (
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
                                <h1 className="">{item.description}</h1>
                                <p className="text-sm font-semibold text-tert-100">
                                  ₦{item.amount}
                                </p>
                              </div>
                            </div>
                            {
                              <div className="flex items-center space-x-2">
                                {item.status === "Unpaid" ? (
                                  <button
                                    onClick={() => {
                                      PayInvoice(item.id, item.amount);
                                    }}
                                    className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-sm  text-white"
                                  >
                                    Pay
                                  </button>
                                ) : (
                                  <h2 className="text-[#27C281] text-base font-bold">
                                    {" "}
                                    Paid
                                  </h2>
                                )}
                              </div>
                            }
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/*    <div className="flex justify-end my-12">
            <button className="text-primary-100">Cancel Campaign</button>
          </div> */}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div className=" md:w-[480px] w-full  right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto  pb-4 px-4">
          <Chat serviceId={id} service="campaign" />
        </div>
      )}

      {
        // ====================================ChatBox==================================
      }

      <div className=" md:w-[480px] fixed md:block hidden right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto  pb-4 px-4">
        <Chat serviceId={id} service="campaign" />
      </div>

      {isRejected && <RejectModal handleClose={handleClose} />}
      {isAccepted && <Review handleClose={handleCloseReview} />}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
// py-28 px-12
