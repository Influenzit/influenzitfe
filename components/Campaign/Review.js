import React, { useState } from "react";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import cancel from "./../../assets/close.svg";
import attachment from "./../../assets/campaign/attachment.svg";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import Loader from "components/UI/Loader";

function Review({loading, handleClose, handleUpdateCampaignReview, setrating, setcomment }) {
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setrating(newRating)

  };
  return (
    <div>
      <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
        <div className="bg-white w-[500px]  p-6 rounded-lg overflow-hidden">
          <div className="flex justify-between mb-6">
            <h1 className="text-xl">Leave a Review</h1>

            <button onClick={handleClose} className="outline-none">
              <Image src={cancel} alt="cancel" height={20} />
            </button>
          </div>

          <p className="text-xs my-5">
            Thanks for confirming the completion of this campaign. Kindly give a
            review on the campaign to help others decide better.
          </p>
          <p className="text-xs ">How satisfied were you with your delivery?</p>
          <ReactStars
            isHalf={true}
            count={5}
            value={1}
            onChange={ratingChanged}
            size={14}
            activeColor="#DF475C"
          />

          <div className="border rounded-lg my-5">
            <textarea
              name="chatbox"
              id="chatbox"
              rows="5"
              className="resize-none text-sm w-full h-full rounded-lg  outline-none bg-transparent p-2"
              placeholder="Write your message"
              onChange={(e)=> {setcomment(e.target.value)}}
            ></textarea>
          </div>

          <div onClick={handleUpdateCampaignReview} className="flex justify-end">
            <button className="bg-primary-100 py-2 px-4 rounded-lg text-white">
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
