//=========================== TAILWIND STYLES APPLIED HERE =========================

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  getProject,
  getSingleProjectRequirement,
  submitRequirement,
} from "api/projects";
import { setLoading } from "app/reducers/status";
import { ChevronLeft, ChevronRight } from "assets/svgIcons";
import bold from "assets/campaign/bold.svg";
import italics from "assets/campaign/italics.svg";
import link from "assets/campaign/link.svg";
import listdot from "assets/campaign/listdot.svg";
import listnumeral from "assets/campaign/listnumeral.svg";
import send from "assets/campaign/send.svg";
import lock from "assets/campaign/lock.svg";
import checkmark from "assets/campaign/checkmark.svg";
import Loader from "components/UI/Loader";
import reject from "assets/campaign/cancel.svg";

import RejectModal from "components/Campaign/rejectModal";
import LandingLayout from "layouts/landing.layout";

import cancel from "assets/close.svg";
import chatlady from "assets/campaign/chatlady.svg";
import { toast } from "react-toastify";
import { getUser } from "app/reducers/user";
import { useSelector } from "react-redux";

import ReactStars from "react-rating-stars-component";
import Review from "components/Campaign/Review";
import Chat from "components/Chat";
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
  const [singleproject, setSingleproject] = useState(null);
  const [singleprojectReq, setSingleprojectReq] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setanswer] = useState(null);
  const [selectedFormat, setselectedFormat] = useState(null);
  const [makePayment, setmakePayment] = useState(false);
  const [triggerPayment, settriggerPayment] = useState(false);
  const [amount, setamount] = useState(0);
  const [conversationId, setconversationId] = useState(null);

  const { id } = router.query;
  const user = useSelector(getUser);

  const handleAnswer = (format, e) => {
    if (format === "text") {
      setanswer(e.target.value);
    } else {
      setanswer(e.target.files[0]);
    }
  };

  const handleGetSingleproject = () => {
    getProject(id)
      .then((res) => {
        console.log(res);
        setSingleproject(res.data.data);
        setconversationId(res.data.data?.conversation.id || null);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleGetSingleprojectReq = () => {
    getSingleProjectRequirement(id)
      .then((res) => {
        console.log(res);
        setSingleprojectReq(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const submitSingleprojectReq = (format, reqId) => {
    setselectedFormat(format);
    const formData = new FormData();
    format === "text"
      ? formData.append("content", answer ?? null)
      : formData.append("attachment", answer ?? null);
    if (!answer) {
      toast.error("Please provide an answer");
      return;
    }
    setLoading(true);
    submitRequirement(id, reqId, formData)
      .then((res) => {
        console.log(res);
        toast.success("Submission successfull");

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
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

  useEffect(() => {
    handleGetSingleproject();
    handleGetSingleprojectReq();
    // handleGetSingleprojectMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex bg-gray-50">
      {singleproject !== null ? (
        <div className="w-full md:pr-[500px] pt-28 px-10 min-h-screen">
          {/*   <div className="flex space-x-4 w-full border-b mb-4">
            <button
              onClick={() => {
                setactivetab("milestone");
              }}
              className={`${
                activetab == "milestone" &&
                "text-primary-100 border-b border-primary-100"
              } pb-4`}
            >
              Campaign Details
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
              Chat
            </button>
          </div> */}
          <h1 className="text-xl font-bold">{singleproject.title}</h1>
          <div className="my-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:pr-10 border-r py-1 flex space-x-2">
                <Image
                  src={singleproject.provider.profile_pic}
                  alt={"img"}
                  className="h-4 w-4 rounded-full"
                  height="60"
                  width="60"
                />
                <div>
                  <p className="text-xs text-gray-500">Influencer</p>
                  <h1 className="font-medium">
                    {" "}
                    {singleproject.provider.name}{" "}
                  </h1>
                </div>
              </div>
              <div className="md:pr-10  py-1 flex space-x-2">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <h1 className="font-medium">
                    {" "}
                    {moment(singleproject.created_at).format("LL")}{" "}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">{singleproject.description}</div>

          <div className="flex space-x-4 w-full border-b mb-4">
            <h2 className="font-medium text-xl">Requirements Submission</h2>
          </div>
          {singleprojectReq.map((item, idx) => (
            <div className="flex flex-col space-y-2 mb-6" key={idx}>
              <div className="bg-white border border-gray-200 px-4 py-5 rounded-lg ">
                <h2 className="font-medium">Title</h2>
                <p> {item.title} </p>
              </div>

              <div className="bg-white border w-full flex space-x-2 item-center border-gray-200 px-4 py-5 rounded-lg ">
                {item.format === "text" ? (
                  <div>
                    {item.submissions.map((x, id) => (
                      <div key={id}>
                        {id + 1}. {x.content}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {item.submissions.map((x, id) => (
                      <div key={id}>
                        {x.media.map((v, idx) => (
                          <div
                            key={idx}
                            className="p-2 border outline-none flex-1 rounded-md w-full"
                          >
                            <div>{v.url}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {
        // ====================================ChatBox==================================
      }

      <div className=" md:w-[480px] md:fixed right-0 bg-white border-l border-[#EAEAEB] h-screen overflow-y-auto  pb-4 px-4">
        <Chat
          serviceId={id}
          service="projects"
          conversationId={conversationId}
        />
      </div>

      {isRejected && <RejectModal handleClose={handleClose} />}
      {isAccepted && <Review handleClose={handleCloseReview} />}
    </div>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
// py-28 md:px-12 px-4
