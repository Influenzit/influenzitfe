import React from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";

function stage1() {
  return (
    <div>
      <div className="let swipeIn">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            {" "}
            <h1 className="text-lg">Change Password </h1>
            <p className="text-xs text-[#667085]">
              Update your profile details here.
            </p>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Current password</h1>
          </div>
          <div className="col-span-6">
            <input
              type="password"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter your current password"
            />
          </div>
        </div>
        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">New password</h1>
          </div>
          <div className="col-span-6">
            <input
              type="password"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter your current password"
            />
          </div>
        </div>
        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Re-enter password</h1>
          </div>
          <div className="col-span-6">
            <input
              type="password"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button className="px-3 mt-4  py-2 rounded-lg bg-primary-100 text-white text-sm">
          Change password
        </button>
      </div>
    </div>
  );
}

export default stage1;
