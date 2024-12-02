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
  updateCampaignReview,
  updateCampaign,
  getCampaignReview,
  getCampaignPosts,
  getCampaignPostsMetrics,
} from "../../../../api/campaigns";
import axios from "axios";
import { axiosInstance } from "../../../../api/axios";
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
// import { calculateTotalPrice } from "paystack-transaction-charges-to-cus";
import { createPaymentLog, processPayment } from "api/payment";
import { SubmitButton } from "styles/auth.style";
import { UpdateModal } from "styles/view.style";
import { WelcomeModal } from "styles/connect-pages.style";
import { ReviewCard } from "styles/dashboard";
import { getAccessToken } from "./utils"; // Import your utility function

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
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState("");
  const [loading, setloading] = useState(false);
  const [conversationId, setconversationId] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [review, setReview] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const [makePayment, setmakePayment] = useState(false);
  const [triggerPayment, settriggerPayment] = useState(false);
  const [amount, setamount] = useState(0);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateIdx, setUpdateIdx] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");

  const { id } = router.query;
  const user = useSelector(getUser);
  // console.log(user);

  const [existingPosts, setExistingPosts] = useState([]);

// Fetch campaign posts with metrics
useEffect(() => {
  if (activetab === "posts" && id) {
    // Ensure id is available
    getCampaignPostsMetrics(id)
      .then((response) => {
        // Use id from router.query
        setExistingPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching campaign posts:", error);
      });
  }
}, [activetab, id]);

// Dynamically load the Twitter embed script
useEffect(() => {
  const script = document.createElement('script');
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  script.charset = "utf-8";
  document.body.appendChild(script);

  // Cleanup script when component unmounts
  return () => {
    document.body.removeChild(script);
  };
}, []); // Empty dependency array ensures this runs only once when the component is mounted

// Helper function to render embed based on platform
const renderEmbed = (platform, link) => {
  if (platform === 'Facebook') {
    // Extract the post ID and embed it
    const postId = link.split('/')[5]; // Assuming link is like https://www.facebook.com/{username}/posts/{post-id}
    return (
      <iframe 
        src={`https://www.facebook.com/plugins/post.php?href=${link}&show_text=true&width=500`} 
        width="500" 
        height="300" 
        style={{ border: 'none', overflow: 'hidden' }} 
        scrolling="no" 
        frameBorder="0" 
        allowFullScreen="true" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
      </iframe>
    );
  } else if (platform === 'Instagram') {
    const postId = link.split('/')[4]; // Instagram post ID comes from the URL
    return (
      <iframe 
        src={`https://www.instagram.com/p/${postId}/embed`} 
        width="500" 
        height="600" 
        style={{ border: 'none', overflow: 'hidden' }} 
        scrolling="no" 
        frameBorder="0" 
        allowFullScreen="true">
      </iframe>
    );
  } else if (platform === 'Twitter') {
    return (
      <blockquote className="twitter-tweet">
        <a href={link}></a>
      </blockquote>
    );
  } else if (platform === 'TikTok') {
    const videoId = link.split('/')[5]; // Extract video ID
    return (
      <iframe 
        src={`https://www.tiktok.com/embed/${videoId}`} 
        width="500" 
        height="600" 
        style={{ border: 'none', overflow: 'hidden' }} 
        frameBorder="0" 
        allowFullScreen>
      </iframe>
    );
  } else if (platform === 'YouTube') {
    const videoId = link.split('v=')[1].split('&')[0]; // Extract YouTube video ID
    return (
      <iframe 
        width="500" 
        height="300" 
        src={`https://www.youtube.com/embed/${videoId}`} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    );
  } else {
    return <p>Platform not supported for embed.</p>;
  }
};



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
        setconversationId(res.data.data.conversation.id);
        setRequesting(false);
      })
      .catch((err) => {
        setRequesting(false);
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
  const handleGetCampaignReview = () => {
    getCampaignReview(id)
      .then((res) => {
        if(res.data.data.length) {
          setReview(res.data.data[0])
          setcomment(res.data.data[0].comment)
          setrating(res.data.data[0].rating)
        }
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const updateCampaignMilsestone = (status, campaignId) => {
    setRequesting(true);
    const formData = new FormData();
    formData.append("comment", message);
    formData.append("attachment", file);
    console.log(status, campaignId);
    if ((status === "accept") && campaignId ) {
      acceptCampaignMilestone(id, campaignId)
        .then((res) => {
          toast.success("Milestone accepted", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleGetSingleCampaign();
        })
        .catch((err) => {
          setRequesting(false);
          console.log(err.response);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else if (status === "dispute") {
      rejectCampaignMilestone(id, campaignId, formData)
        .then((res) => {
          console.log(res);
          setFile(null);
          setMessage("");
          toast.success("Milestone rejected", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleGetSingleCampaign();
        })
        .catch((err) => {
          console.log(err.response);
          setRequesting(false);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };
  const triggerUpdateMilsestone = (status, campaignId, idx) => {
    setUpdateStatus(status);
    setUpdateId(campaignId);
    if(status === "dispute") {
      setisRejected(true);
      return;
    }
    updateCampaignMilsestone(status, campaignId);
  }
  const handleUpdateCampaignReview = () => {
    if (!comment || !rating) {
      toast.error("Comment is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const payload = {
      comment,
      rating,
    };
    setloading(true);
    updateCampaignReview(id, payload)
      .then((res) => {
        console.log(res);
        toast.success("Rating updated succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        handleCloseReview();
        handleGetCampaignReview();
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleClose = () => {
    setisRejected(false);
    updateCampaignMilsestone(updateStatus, updateId);
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
    handleProcessTransaction(reference.reference, "paystack");
    // window.location.reload();
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handleCreateTransaction = async (invoiceId, amt, channel) => {
    setLoading(true);
    dispatch(setLoading(true));
    const payload = {
      channel,
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
        dispatch(setLoading(false));
        if(channel === "paystack") {
          setPaystackConfig({
            currency: "NGN",
            reference: paymentReference,
            email: user.email,
            amount: Number(amt * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
            publicKey: "pk_test_9d97cf0be86b0758ece444694d57a8db41a4be59",
          });
          setmakePayment(true);
          settriggerPayment(true);
        }
       
      })
      .catch((err) => {
        dispatch(setLoading(false));
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleAcceptCampaign = () => {
    setShowPrompt(false);
    dispatch(setLoading(true));
    updateCampaign(id, {
      is_user_accept: true,
    }).then((res) => {
      toast.success("Campaign Accepted", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setLoading(false));
      setisAccepted(true);
      handleGetSingleCampaign();
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.response);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }
  const handleProcessTransaction = async (data, channel) => {
    const payload = {
      channel,
      payment_reference: data,
    };
    dispatch(setLoading(true));
    await processPayment(payload)
      .then((res) => {
        handleGetSingleCampaignInvoice();
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const PayInvoice = (invoiceId, amt, channel) => {
    setShowPayment(false);
    handleCreateTransaction(invoiceId, amt, channel);
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
    handleGetCampaignReview();
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
            <div className="w-full md:pr-[500px] md:pt-28 pt-4 md:px-10 px-4 ">
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
              {
                (!singlecampaign?.is_user_accept && (singlecampaign?.status === "Completed")) ? (<SubmitButton style={{ width: "150px", fontSize: "14px", margin: "10px 0" }} onClick={() => setShowPrompt(true)}>Accept Campaign</SubmitButton>): null
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
                    setactivetab("invoice");
                  }}
                  className={`${
                    activetab == "invoice" &&
                    "text-primary-100 border-b border-primary-100"
                  } pb-4`}
                >
                  Invoice
                </button>
                <button
                  onClick={() => {
                    setactivetab("review");
                  }}
                  className={`${
                    activetab == "review" &&
                    "text-primary-100 border-b border-primary-100"
                  } pb-4`}
                >
                  Review
                </button>
                <button
                  onClick={() => {
                    setactivetab("posts");
                  }}
                  className={`${
                    activetab == "posts" &&
                    "text-primary-100 border-b border-primary-100"
                  } pb-4`}
                >
                  Posts
                </button>
              </div>
              {activetab == "milestone" && (
                <div className="">
                  <h1 className="text-xl font-semibold my-6">Milestone</h1>

                  <div className="relative">
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
                                  onClick={() => { !requesting &&
                                    triggerUpdateMilsestone(
                                      "accept",
                                      item.id
                                    );
                                  }}
                                  className="mx-2 rounded-lg py-1 px-2  h-auto bg-[#27C281] text-[10px] text-white"
                                >
                                  {requesting ? "Submitting..." : "Accept"}
                                </button>
                                <button
                                  onClick={() => {
                                    !requesting && triggerUpdateMilsestone(
                                      "dispute",
                                      item.id
                                    );
                                  }}
                                  className="mx-2 rounded-lg py-1 px-2  h-auto bg-primary-100 text-[10px] text-white"
                                >
                                  {requesting ? "Submitting..." : "Reject"}
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
                <div className="">
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
                                      setShowPayment(true);
                                      setInvoiceId(item.id);
                                      setInvoiceAmount(item.amount);
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
              {
                activetab === "review" && (
                  <div>
                    {review ? (
                      <ReviewCard>
                        <h2 style={{ display: "flex",  columnGap: "7px" }}>
                        <ReactStars
                            isHalf={true}
                            count={5}
                            value={Number(rating) ?? 0}
                            size={20}
                            edit={false}
                            activeColor="#DF475C"
                        />
                        </h2>
                        <p>{review.comment}</p>
                        <SubmitButton style={{ width: "130px", fontSize: "14px", padding: "6px" }} onClick={() => setisAccepted(true)}>Update</SubmitButton>
                      </ReviewCard>
                    ): (
                      <ReviewCard>
                        <h2>No review</h2>
                      </ReviewCard>
                    )}
                  </div>
                )
              }
              {activetab === "posts" && (
    <div className="tab-container">
      <style jsx>{`
        .tab-container {
          background-color: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        .tab-header {
          font-size: 1.5rem;
          font-weight: 600;
          color: #192cd1;
          margin-bottom: 1.5rem;
        }
        .post-card {
          margin-bottom: 1.5rem;
          padding: 15px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background-color: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .post-card h4 {
          font-size: 1.25rem;
          color: #333;
        }
        .metrics {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #4b5563;
          display: flex;
          gap: 10px;
        }
        .metrics div {
          padding: 5px 10px;
          background-color: #e5e7eb;
          border-radius: 5px;
        }
        .metrics strong {
          color: #192cd1;
        }
        .embed-container {
          margin-top: 10px;
          display: flex;
          justify-content: center;
        }
      `}</style>
      <h3 className="tab-header">Social Media Posts</h3>
      {existingPosts.length > 0 ? (
        existingPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.platform}</h4>
            <div className="embed-container">{renderEmbed(post.platform, post.link)}</div>
            <div className="metrics">
              <div>
                <strong>Likes:</strong> {post.metrics.likes}
              </div>
              {post.metrics.shares && (
                <div>
                  <strong>Shares:</strong> {post.metrics.shares}
                </div>
              )}
              {post.metrics.comments && (
                <div>
                  <strong>Comments:</strong> {post.metrics.comments}
                </div>
              )}
              {post.metrics.retweets && (
                <div>
                  <strong>Retweets:</strong> {post.metrics.retweets}
                </div>
              )}
              {post.metrics.replies && (
                <div>
                  <strong>Replies:</strong> {post.metrics.replies}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No posts available for this campaign.</p>
      )}
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

      {isRejected && 
        <RejectModal
          handleClose={handleClose}
          file={file}
          setFile={setFile}
          message={message}
          setMessage={setMessage}
        />}
      {isAccepted && (
        <Review
          handleClose={handleCloseReview}
          handleUpdateCampaignReview={handleUpdateCampaignReview}
          setrating={setrating}
          comment={comment}
          setcomment={setcomment}
          rating={rating}
          loading={loading}
        />
      )}
       {
            showPrompt && (
                <UpdateModal>
                    <WelcomeModal>
                        <div>
                            <button onClick={() => setShowPrompt(false)}><Image src="/cancel.svg" alt="" height={14} width={14} /></button>
                        </div>
                        <p>If this campaign is accepted fund in the escrow will be released to the influencer</p>
                        <div>
                            <button onClick={handleAcceptCampaign}>Accept</button>
                        </div>
                    </WelcomeModal>
                </UpdateModal>
            )
        }
         {
            showPayment && (
                <UpdateModal>
                    <WelcomeModal>
                        <div>
                            <button onClick={() => setShowPayment(false)}><Image src="/cancel.svg" alt="" height={14} width={14} /></button>
                        </div>
                        <p>Select Payment Channel</p>
                        <div style={{ display: "flex", justifyContent: "center", columnGap: "20px" }}>
                            <button onClick={() => PayInvoice(invoiceId, invoiceAmount, "wallet")}>Wallet</button>
                            <button onClick={() => PayInvoice(invoiceId, invoiceAmount, "paystack")}>Paystack</button>
                        </div>
                    </WelcomeModal>
                </UpdateModal>
            )
        }
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
// py-28 md:px-12 px-4
