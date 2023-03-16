import React from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import avatar from "../../assets/profile/avatar.svg";
import upload from "../../assets/profile/upload.svg";

function stage1() {
  return (
    <div>
      <div className="let swipeIn">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            {" "}
            <h1 className="text-lg">Business Information </h1>
            <p className="text-xs text-[#667085]">
              Update your business innformation here
            </p>
          </div>

          <div className="flex justify-between items-center space-x-3">
            <button className="px-3 py-2 rounded-lg border text-gray-800 bg-white text-sm">
              Cancel
            </button>
            <button className="px-3 py-2 rounded-lg bg-primary-100 text-white text-sm">
              Save
            </button>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-stretch">
          <div className="col-span-3 py-5">
            <h1 className="text-lg">Your photo </h1>
            <p className="text-xs text-[#667085]">
              This will be displayed on your profile.{" "}
            </p>{" "}
          </div>
          <div className="col-span-9 flex space-x-3">
            <div className="flex space-x-2 gap-4">
              <Image src={avatar} alt="avatar" />
              <div className="text-[#667085] text-sm bg-transparent w-full border bg-white py-4 px-12 rounded-lg flex-1 flex justify-center items-center flex-col space-y-3">
                <Image src={upload} alt="avatar" />
                <div className="">
                  <input type="file" hidden id="upload" />
                  <label
                    htmlFor="upload"
                    className="cursor-pointer text-primary-100 font-bold text-base mr-1"
                  > 
                    Click to upload
                  </label>
                  <span>or drag and drop</span>
                </div>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
}

export default stage1;
