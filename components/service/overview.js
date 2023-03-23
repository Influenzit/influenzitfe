//=========================== TAILWIND STYLES APPLIED HERE =========================
import rightarrow from "../../assets/rightarrow.svg";

import React from "react";
import Image from "next/image";

function Overview({ handleIncrement, handleDecrement }) {
  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Service Overview</h1>
      <div className="content mb-6">
        <h1 className=" font-medium"> Title</h1>
        <p className="text-tert-100 my-1">
          Tell you client what you will do for them.
        </p>
        <input
          type="text"
          placeholder="Lifestyle Creator and Food Enthusiast"
          className="p-2 border outline-none rounded-md w-full"
        />
      </div>
      <div className="content mb-6">
        <h1 className=" font-medium"> Description</h1>
        <p className="text-tert-100">Write a short introduction. </p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-full input mt-2 px-3 py-2 resize-none"
        ></textarea>
      </div>
      <div className="content mb-6  border-t py-5">
        <h1 className=" font-medium"> Category</h1>
        <p className="text-tert-100 my-1">
          Select a category to make it easy for clients to find your service.
        </p>

        <div className="p-2 border outline-none rounded-md w-1/2">
          <select
            name=""
            id=""
            onChange={(e) => {}}
            className="w-full text-sm bg-transparent outline-none border-none"
          >
            <option value="">--Select--</option>
            <option value="">Influencer</option>
            <option value="">Creators</option>
          </select>
        </div>
      </div>
      <div className="content mb-6 border-t py-5">
        <h1 className=" font-medium"> Add Tags</h1>
        <p className="text-tert-100 my-1">
          Add keywords that buyers will use when searching for your service. You
          can add up to 5 tags.{" "}
        </p>
        <div className="p-2 border outline-none rounded-md w-1/2">
          <select
            name=""
            id=""
            onChange={(e) => {}}
            className="w-full text-sm bg-transparent outline-none border-none"
          >
            <option value="">--Select--</option>
            <option value="">Influencer</option>
            <option value="">Creators</option>
          </select>
        </div>
      </div>

      {/*  <div className="flex justify-end">
        <button
          onClick={handleIncrement}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          <span className="mr-2">Continue</span>
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div> */}

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
          onClick={handleIncrement}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          <span className="mr-2">Continue</span>
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Overview;
