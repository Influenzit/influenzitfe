import React, { useState } from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import avatar from "../../assets/profile/avatar.svg";
import upload from "../../assets/profile/upload.svg";

function Stage3({ user }) {
  const drop = React.forwardRef(null);

  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (file) => {
    setImage(file);
    setImgSrc(URL.createObjectURL(file));
  };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { files } = e.dataTransfer;

  //   if (files && files.length) {
  //     handleImage(files[0]);
  //   }
  // };

  const handleDrop = (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (files && files.length) {
      handleImage(files[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  console.log(user);
  return (
    <div>
      <div className="let swipeIn">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
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
              This will be displayed on your profile.
            </p>
          </div>
          <div className="col-span-9 flex space-x-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Image
                  src={user.profile_pic}
                  alt="avatar"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  className="rounded-full"
                />
              </div>

              <div
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                className={` ${
                  !imgSrc ? "p-12" : "p-0"
                } text-[#667085] text-sm bg-transparent w-full col-span-9 border border-dashed bg-white  rounded-lg flex-1  `}
              >
                {!imgSrc && (
                  <div className="flex justify-center items-center flex-col space-y-3">
                    <Image src={upload} alt="avatar" />
                    <div className="">
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          handleImage(e.target.files[0]);
                        }}
                        id="upload"
                      />
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
                )}
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    width={200}
                    height={200}
                    layout="responsive"
                    alt="avatar"
                    className="object-cover rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage3;
