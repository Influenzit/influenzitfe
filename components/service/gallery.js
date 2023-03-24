import React from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import avatar from "../../assets/profile/avatar.svg";
import upload from "../../assets/coverimage.svg";
import rightarrow from "../../assets/rightarrow.svg";
import Loader from '../UI/Loader';

function Gallery({
  handleIncrement,
  handleDecrement,
  coverImageViewer,
  image1Viewer,
  image2Viewer,
  image3Viewer,
  image4Viewer,
  handleImage,
  handleGalleryCreation,
  loading
}) {



  const handleDrop = (store, e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (files && files.length) {
      handleImage(files[0]);
      if (store === "cover") {
        handleImage("cover", files[0]);
      }
      if (store === "image1") {
        handleImage("image1", files[0]);
      }
      if (store === "image2") {
        handleImage("image2", files[0]);
      }
      if (store === "image3") {
        handleImage("image3", files[0]);
      }
      if (store === "image4") {
        handleImage("image4", files[0]);
      }
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="text-xl mb-6">Gallery</h1>

      <div className="">
        <h1 className=" font-medium"> Cover Image</h1>
        <p className="text-tert-100 my-1">
          Add a stunning cover image to showcase your work
        </p>
        <div
          className={` ${
            !coverImageViewer ? "p-12" : "p-0"
          } text-[#667085] text-sm bg-transparent w-1/2 border border-dashed bg-white  rounded-lg flex-1  `}
        >
          {!coverImageViewer && (
            <div
              onDrop={(e) => {
                handleDrop("cover", e);
              }}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              className="flex justify-center items-center flex-col space-y-3"
            >
              <Image src={upload} alt="avatar" />
              <div className="">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleImage("cover", e.target.files[0]);
                  }}
                  id="upload"
                />
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
          )}
          {coverImageViewer && (
            <Image
              src={coverImageViewer}
              width="100%"
              height="100%"
              layout="responsive"
              alt="avatar"
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </div>
      <div className="content my-6 border-t py-6 ">
        <h1 className=" font-medium"> Project Gallery</h1>
        <p className="text-tert-100 my-1">
          Add up to 4 images to showcase your work{" "}
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div
            onDrop={(e) => {
              handleDrop("image1", e);
            }}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={` ${
              !image1Viewer ? "p-5" : "p-0"
            } text-[#667085] text-sm text-center  item-center bg-transparent w-full border border-dashed bg-white  rounded-lg flex-1  `}
          >
            {" "}
            {!image1Viewer && (
              <div className="">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleImage("image1", e.target.files[0]);
                  }}
                  id="upload"
                />
                <span>Drop your image or </span>
                <label
                  htmlFor="upload"
                  className="cursor-pointer text-primary-100 font-bold text-base mr-1"
                >
                  Upload
                </label>
              </div>
            )}
            {image1Viewer && (
              <Image
                src={image1Viewer}
                width="100%"
                height="100%"
                layout="responsive"
                alt="avatar"
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <div
            onDrop={(e) => {
              handleDrop("image2", e);
            }}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={` ${
              !image2Viewer ? "p-5" : "p-0"
            } text-[#667085] text-sm text-center  item-center bg-transparent w-full border border-dashed bg-white  rounded-lg flex-1  `}
          >
            {" "}
            {!image2Viewer && (
              <div className="">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleImage("image2", e.target.files[0]);
                  }}
                  id="upload"
                />
                <span>Drop your image or </span>
                <label
                  htmlFor="upload"
                  className="cursor-pointer text-primary-100 font-bold text-base mr-1"
                >
                  Upload
                </label>
              </div>
            )}
            {image2Viewer && (
              <Image
                src={image2Viewer}
                width="100%"
                height="100%"
                layout="responsive"
                alt="avatar"
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <div
            onDrop={(e) => {
              handleDrop("image3", e);
            }}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={` ${
              !image3Viewer ? "p-5" : "p-0"
            } text-[#667085] text-sm text-center  item-center bg-transparent w-full border border-dashed bg-white  rounded-lg flex-1  `}
          >
            {" "}
            {!image3Viewer && (
              <div className="">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleImage("image3", e.target.files[0]);
                  }}
                  id="upload"
                />
                <span>Drop your image or </span>
                <label
                  htmlFor="upload"
                  className="cursor-pointer text-primary-100 font-bold text-base mr-1"
                >
                  Upload
                </label>
              </div>
            )}
            {image3Viewer && (
              <Image
                src={image3Viewer}
                width="100%"
                height="100%"
                layout="responsive"
                alt="avatar"
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <div
            onDrop={(e) => {
              handleDrop("image4", e);
            }}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={` ${
              !image4Viewer ? "p-5" : "p-0"
            } text-[#667085] text-sm text-center  item-center bg-transparent w-full border border-dashed bg-white  rounded-lg flex-1  `}
          >
            {" "}
            {!image4Viewer && (
              <div className="">
                <input
                  type="file"
                  onChange={(e) => {
                    handleImage("image4", e.target.files[0]);
                  }}
                  hidden
                  accept="image/*"
                  id="upload"
                />
                <span>Drop your image or </span>
                <label
                  htmlFor="upload"
                  className="cursor-pointer text-primary-100 font-bold text-base mr-1"
                >
                  Upload
                </label>
              </div>
            )}
            {image4Viewer && (
              <Image
                src={image4Viewer}
                width="100%"
                height="100%"
                layout="responsive"
                alt="avatar"
                className="object-cover rounded-lg"
              />
            )}
          </div>
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
          onClick={handleGalleryCreation}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
        {loading ? <Loader /> : "Continue"}
        <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Gallery;
