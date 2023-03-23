import React from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import avatar from "../../assets/profile/avatar.svg";
import upload from "../../assets/coverimage.svg";
import rightarrow from "../../assets/rightarrow.svg";

function Gallery({ handleIncrement, handleDecrement }) {
  return (
    <div>
      <h1 className="text-xl mb-6">Gallery</h1>

      <div className="">
        <h1 className=" font-medium"> Cover Image</h1>
        <p className="text-tert-100 my-1">
          Add a stunning cover image to showcase your work
        </p>
        <div className="text-[#667085] text-sm bg-transparent w-1/2 border border-dashed bg-white py-4 px-12 rounded-lg flex-1 flex justify-center items-center flex-col space-y-3">
          <Image src={upload} alt="avatar" />
          <div className="">
            <input type="file" hidden id="upload" />
            <span>Drop your image or </span>
            <label
              htmlFor="upload"
              className="cursor-pointer text-primary-100 font-bold text-base mr-1"
            >
              Upload
            </label>
          </div>
          <p>JPG or PNG, no larger than 10MB</p>
        </div>
      </div>
      <div className="content my-6 border-t py-6 ">
        <h1 className=" font-medium"> Project Gallery</h1>
        <p className="text-tert-100 my-1">
          Add up to 4 images to showcase your work{" "}
        </p>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((x, id) => (
            <div
              key={id}
              className="text-[#667085] bg-transparent w-full border border-dashed bg-white py-12 px-12 rounded-lg flex-1 flex justify-center items-center flex-col space-y-3 text-center text-xs"
            >
              <div className="">
                <input type="file" hidden id="upload" />
                <span>Drop your image or </span>
                <label
                  htmlFor="upload"
                  className="cursor-pointer text-primary-100 font-bold text-base mr-1"
                >
                  Upload
                </label>
              </div>
            </div>
          ))}
        </div>
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

export default Gallery;
