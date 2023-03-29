import React from "react";
import Image from "next/image";
import rightarrow from "../../assets/rightarrow.svg";
import Loader from "../UI/Loader";
function Stage3({
  loading,
  handleIncrement,
  handleDecrement,
  serviceid,
  setserviceId,
  clientEmail,
  setclientEmail,
  endDate,
  setendDate,
  amount,
  setAmount,
  handleCreateCampaign,
}) {
  return (
    <div className="let swipeIn">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs  text-primary-100">Step 1</p>
          <p className="text-xs ">Describe your Campaign</p>
        </div>
        <div>
          <p className="text-xs  text-primary-100">Step 2</p>
          <p className="text-xs ">Set Milestones</p>
        </div>
        <div>
          <p className="text-xs  text-primary-100">Step 3</p>
          <p className="text-xs ">Request Requirements</p>
        </div>
      </div>
      <div className="my-6 flex flex-col space-y-2 ">
        <label htmlFor="b_id">Client Email</label>
        <input
          type="text"
          id="b_id"
          className="p-2 border outline-none rounded-md w-full"
          placeholder="influenzitbiz@influenzit.com"
          value={clientEmail}
          onChange={(e) => {
            setclientEmail(e.target.value);
          }}
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="Campaign_name">Service ID</label>
        <input
          type="text"
          id="Campaign_name"
          className="p-2 border outline-none rounded-md w-full"
          placeholder="Package Id"
          value={serviceid}
          onChange={(e) => {
            setserviceId(e.target.value);
          }}
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="desc">Delivery Date</label>
        <input
          type="date"
          id="Campaign_name"
          className="p-2 border outline-none rounded-md w-full"
          placeholder="Delivery Date"
          value={endDate}
          onChange={(e) => {
            setendDate(e.target.value);
          }}
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="desc">Amount</label>
        <input
          type="number"
          id="Campaign Amount"
          className="p-2 border outline-none rounded-md w-full"
          placeholder="#20, 000"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-6 ">
        <button
          onClick={handleDecrement}
          className="bg-tert-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          <Image
            src={rightarrow}
            alt="rightarrow"
            className="transform rotate-180 ml-2 w-4 h-4"
          />
          <span className="mr-2">Back</span>
        </button>
        <button
          onClick={handleCreateCampaign}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          {loading ? <Loader /> : "Submit"}

          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Stage3;
