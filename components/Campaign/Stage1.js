import React from "react";
import Image from "next/image";
import rightarrow from "../../assets/rightarrow.svg";
import { toast } from "react-toastify";

function Stage1({
  handleIncrement,
  handleDecrement,
  setCampaignName,
  campaignName,
  bId,
  setbId,
  description,
  setdescription,
}) {
  return (
    <div>
      <p className="text-xs  text-primary-100">Step 1</p>
      <p className="text-xs ">Describe your Campaign</p>
      <div className="my-6 flex flex-col space-y-2 ">
        <label htmlFor="b_id">Business ID<span style={{ color:"red" }}>*</span></label>
        <input
          type="number"
          id="b_id"
          className="p-2 border outline-none rounded-md w-full"
          placeholder="K12R567"
          value={bId}
          onChange={(e) => {
            setbId(e.target.value);
          }}
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="Campaign_name">Campaign Name<span style={{ color:"red" }}>*</span></label>
        <input
          type="text"
          id="Campaign_name"
          className="p-2 border outline-none rounded-md w-full"
          placeholder="Account Settings"
          value={campaignName}
          onChange={(e) => {
            setCampaignName(e.target.value);
          }}
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="desc">Description<span style={{ color:"red" }}>*</span></label>
        <textarea
          name="dex"
          id="desc"
          cols="30"
          rows="4"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          className="p-2 border outline-none rounded-md w-full resize-none"
          placeholder=""
        ></textarea>
      </div>
      <div className="flex justify-end items-center mt-6 ">
        <button
          onClick={handleIncrement}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          Next
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Stage1;
