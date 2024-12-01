//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCampaign,
  getCampaignMilestones,
  getCampaignReview,
  handleCreateCampaign,
  updateCampaign,
  updateCampaignMilestone,
  updateCampaignReview,
  getCampaignPosts,
} from "../../../../api/campaigns";
import { axiosInstance } from "../../../../api/axios";
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
import { ReviewCard } from "styles/dashboard";
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
  const [review, setReview] = useState(null);
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

  const [existingPosts, setExistingPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([{ platform: "", link: "" }]);

  useEffect(() => {
    if (activetab === "posts" && id) {
      // Ensure id is available
      getCampaignPosts(id)
        .then((response) => {
          // Use id from router.query
          setExistingPosts(response.data.posts);
        })
        .catch((error) => {
          console.error("Error fetching campaign posts:", error);
        });
    }
  }, [activetab, id]); // Add id as a dependency

  const handlePlatformChange = (index, value) => {
    const updatedPosts = [...newPosts];
    updatedPosts[index].platform = value;
    setNewPosts(updatedPosts);
  };

  const handleLinkChange = (index, value) => {
    const updatedPosts = [...newPosts];
    updatedPosts[index].link = value;
    setNewPosts(updatedPosts);
  };

  const addNewPost = () => {
    setNewPosts([...newPosts, { platform: "", link: "" }]);
  };

  const removePost = (index) => {
    const updatedPosts = newPosts.filter((_, i) => i !== index);
    setNewPosts(updatedPosts);
  };

  // const handleAddPost = () => {
  //   e.preventDefault();
  //   // Submit new posts to the backend
  //   axiosInstance()
  //     .post(`/campaigns/${ id }/posts`, { posts: newPosts })
  //     .then(() => {
  //       alert("Posts submitted successfully!");
  //       setNewPosts([{ platform: "", link: "" }]); // Reset form
  //     });
  // }; 
  const handleAddPost = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    try {
      // Send each post individually
      for (const post of newPosts) {
        await axiosInstance().post(`/campaigns/${id}/posts`, post);
      }
  
      // Success feedback
      toast.success("Posts submitted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      // Reset form after success
      setNewPosts([{ platform: "", link: "" }]);
    } catch (error) {
      console.error("Error submitting posts:", error);
  
      // Error feedback
      toast.error(
        `Error: ${error.response?.data?.message || "Failed to submit posts."}`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
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
    })
      .then((res) => {
        toast.success("Campaign submitted", {
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
  };
  const handleStartCampaign = () => {
    dispatch(setLoading(true));
    updateCampaign(id, {
      status: "Ongoing",
      end_date: singlecampaign.end_date,
      start_date: singlecampaign.start_date,
    })
      .then((res) => {
        toast.success("Campaign started", {
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
  };
  const handleGetCampaignReview = () => {
    getCampaignReview(id)
      .then((res) => {
        if (res.data.data.length) {
          setReview(res.data.data[0]);
          setcomment(res.data.data[0].comment);
          setrating(res.data.data[0].rating);
        }
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
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
        if (err) {
          console.log(err.response);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const updateCampaignMilsestone = (status, campaignId) => {
    if (singlecampaign.status === "Pending") {
      toast.success("Start campaign before updating the milestone", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
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
        if (err) {
          console.log(err.response);
        }
      });
  };

  useEffect(() => {
    handleGetSingleCampaign();
    handleGetCampaignReview();
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
                {singlecampaign?.status === "Pending" ? (
                  <SubmitButton
                    style={{
                      width: "150px",
                      fontSize: "14px",
                      margin: "10px 0",
                    }}
                    onClick={handleStartCampaign}
                  >
                    Start Campaign
                  </SubmitButton>
                ) : null}
                {singlecampaign?.status !== "Completed" &&
                singlecampaign?.status !== "Pending" ? (
                  <SubmitButton
                    style={{
                      width: "150px",
                      fontSize: "14px",
                      margin: "10px 0",
                    }}
                    onClick={handleCompleteCampaign}
                  >
                    Complete Campaign
                  </SubmitButton>
                ) : null}
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
                {activetab === "review" && (
                  <div>
                    {review ? (
                      <ReviewCard>
                        <h2 style={{ display: "flex", columnGap: "7px" }}>
                          <ReactStars
                            isHalf={true}
                            count={5}
                            value={Number(review.rating) ?? 0}
                            size={20}
                            edit={false}
                            activeColor="#DF475C"
                          />
                        </h2>
                        <p>{review.comment}</p>
                      </ReviewCard>
                    ) : (
                      <ReviewCard>
                        <h2>No review</h2>
                      </ReviewCard>
                    )}
                  </div>
                )}
                {activetab == "requirement" && (
                  <div className="">Requirement </div>
                )}
                {activetab === "posts" && (
                  <div>
                    {/* Style block */}
                    <style jsx>{`
                      .tab-container {
                        background-color: #fff;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        padding: 16px;
                        margin-top: 16px;
                      }

                      .tab-header {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: #192cd1;
                        margin-bottom: 1rem;
                      }

                      .existing-post {
                        margin-bottom: 1rem;
                        padding: 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        background-color: #f9fafb;
                      }

                      .existing-post strong {
                        color: #4b5563;
                      }

                      .existing-post p a {
                        color: #2563eb;
                        text-decoration: underline;
                      }

                      .post-entry {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 1rem;
                      }

                      .post-entry select,
                      .post-entry input {
                        padding: 8px;
                        border: 1px solid #d1d5db;
                        border-radius: 4px;
                        font-size: 0.9rem;
                      }

                      .post-entry button {
                        padding: 6px 12px;
                        background-color: #dc2626;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                      }

                      .post-entry button:hover {
                        background-color: #b91c1c;
                      }

                      .button-group {
                        display: flex;
                        justify-content: flex-end;
                        gap: 10px;
                      }

                      .button-group button {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 4px;
                        font-size: 0.9rem;
                        cursor: pointer;
                      }

                      .button-group button:first-child {
                        background-color: #2563eb;
                        color: #fff;
                      }

                      .button-group button:first-child:hover {
                        background-color: #1d4ed8;
                      }

                      .button-group button:last-child {
                        background-color: #10b981;
                        color: #fff;
                      }

                      .button-group button:last-child:hover {
                        background-color: #059669;
                      }
                    `}</style>

                    {/* Main content */}
                    <div className="tab-container">
                      <h3 className="tab-header">Social Media Posts</h3>
                      
                      <h2 className="tab-header">Already Existing Social Media Post Links</h2>

                      {/* Display Existing Submissions */}
                      {existingPosts?.map((post, index) => (
                        <div key={index} className="existing-post">
                          <strong>{post.platform}:</strong>
                          {Array.isArray(post.links) ? (
                            post.links.map((link, i) => (
                              <p key={i}>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                  {link}
                                </a>
                              </p>
                            ))
                          ) : (
                            <p>
                              <a href={post.link} target="_blank" rel="noopener noreferrer">
                                {post.link}
                              </a>
                            </p>
                          )}
                      </div>                      
                      ))}

                      
                      <h2 className="tab-header">Add New Social Media Post Links</h2>

                      {/* Form to Add New Links */}
                      <form onSubmit={handleAddPost}>
                        {newPosts.map((post, index) => (
                          <div key={index} className="post-entry">
                            <select
                              value={post.platform}
                              onChange={(e) =>
                                handlePlatformChange(index, e.target.value)
                              }
                            >
                              <option value="">Select Platform</option>
                              <option value="Instagram">Instagram</option>
                              <option value="Facebook">Facebook</option>
                              <option value="Twitter">Twitter</option>
                              <option value="TikTok">TikTok</option>
                              <option value="Youtube">Youtube</option>
                            </select>
                            <input
                              type="url"
                              placeholder="Enter Link"
                              value={post.link}
                              onChange={(e) =>
                                handleLinkChange(index, e.target.value)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => removePost(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}

                        <div className="button-group">
                          <button type="button" onClick={addNewPost}>
                            Add Another Link
                          </button>
                          <button type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
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
