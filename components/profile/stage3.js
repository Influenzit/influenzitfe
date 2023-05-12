import React, { useState } from "react";
import Image from "next/image";
import email from "assets/profile/email.svg";
import avatar from "assets/profile/avatar.svg";
import upload from "assets/profile/upload.svg";
import {
  Container,
  CoverImageContainer,
  CustomInput,
  HandleError,
  ImagePreview,
  ProfileForm,
  ProfileUploadCont,
  Step,
  StepContainer,
  StepControl,
  ToggleBtn,
  ToggleCont,
  UploadContainer,
  UploadHeader,
  UploadInfo,
} from "styles/complete.style";
import { setError, setLoading } from "app/reducers/status";
import { toast } from 'react-toastify';
import { getUser, updateUser } from 'app/reducers/user';

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { accountMedia, getUserAccount, updateAccount } from "api/auth";
function Stage3({ user }) {
  const drop = React.forwardRef(null);
  const dispatch = useDispatch();

  const [handleError, setHandleError] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [coverImages, setCoverImages] = useState([]);

  const uploadMutation = useMutation(
    (mediaData) => {
      return accountMedia(mediaData);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        if (
          res.errors ||
          res.status === "error" ||
          res.message === "Unauthenticated."
        ) {
          dispatch(setLoading(false));
          dispatch(setError({ error: true, message: res.message }));
        } else {
          getUserAccount()
            .then((userRes) => {
              console.log(userRes);
              if (userRes.data.data) {
                dispatch(updateUser(userRes.data.data));
                dispatch(setLoading(false));
                toast.success("Image uploaded successfully", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            })
            .catch((err) => {
              dispatch(setLoading(false));
              dispatch(setError({ error: true, message: "An error occured" }));
            });
        }
      },
      onError(error) {
        const res = error.response.data;
        if (res) {
          dispatch(setLoading(false));
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setLoading(false));
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
 const  handleUpload = () => {
    if (fileSelected) {
      dispatch(setLoading(true));
      const formdata = new FormData();
      formdata.append("profile_pic", fileSelected);
      coverImages.forEach((val, i) => {
        formdata.append("cover_img_" + (i + 1), val.image);
      });
      uploadMutation.mutate(formdata);
    } else {
      toast.error("Choose a profile image");
    }
  };

  const handleSetFiles = (file) => {
    if (file.size < 5000000) {
      setFileSelected(file);
      setImgSrc(URL.createObjectURL(file));
    }
  };
  const handleSingleProfilePicDrop = (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (files && files.length) {
      handleSetFiles(files[0]);
    }
  };
  const handleFileChange = (e) => {
    handleSetFiles(e.target.files[0]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (coverImages.length < 4) {
      const file = e.dataTransfer.files[0];
      if (file.size < 5000000) {
        setCoverImages((prev) => {
          let newList = [...prev];
          newList.push({
            url: URL.createObjectURL(file),
            image: file,
          });
          return newList;
        });
      }
    }
  };
  const handleFileChangeDrop = (e) => {
    e.preventDefault();
    console.log(coverImages);
    if (coverImages.length < 4) {
      const file = e.target.files[0];
      if (file.size < 5000000) {
        setCoverImages((prev) => {
          let newList = [...prev];
          newList.push({
            url: URL.createObjectURL(file),
            image: file,
          });
          return newList;
        });
      }
    }
  };
  const handleImageRemove = (i) => {
    setCoverImages((prev) => {
      let newList = [...prev];
      newList.splice(i, 1);
      return newList;
    });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  // const handleDrop = (e) => {
  //   e.preventDefault();

  //   const { files } = e.dataTransfer;

  //   if (files && files.length) {
  //     handleImage(files[0]);
  //   }
  // };
  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };
  // const handleDragLeave = (e) => {
  //   e.preventDefault();
  // };

  console.log(user);
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <h1 className="text-lg">Influencer Information </h1>
            <p className="text-xs text-[#667085]">
              Update your Influencer innformation here
            </p>
          </div>

          <div className="flex justify-between items-center space-x-3">
            <button className="px-3 py-2 rounded-lg border text-gray-800 bg-white text-sm">
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-3 py-2 rounded-lg bg-primary-100 text-white text-sm"
            >
              Save
            </button>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-stretch">
          <div className="md:col-span-3 py-5">
            <h1 className="text-lg">Your photo </h1>
            <p className="text-xs text-[#667085]">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="md:col-span-9 flex space-x-3">
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
                onDrop={handleSingleProfilePicDrop}
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
                          handleSetFiles(e.target.files[0]);
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

        <div className="max-w-3xl mx-auto">
          <CoverImageContainer>
            <p id="head" className="my-2 ">
              Add cover images
            </p>
            <UploadContainer
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              style={{ marginBottom: "20px" }}
            >
              <Image src="/image-p.svg" alt="" height={45} width={45} />
              <UploadHeader>
                <span>Drop your image or </span>
                <label htmlFor="upload-cover">Upload</label>
              </UploadHeader>
              <UploadInfo>JPG or PNG, no larger than 10MB</UploadInfo>
              <input
                type="file"
                accept="image/*"
                hidden
                id="upload-cover"
                onChange={handleFileChangeDrop}
              />
            </UploadContainer>
            <ImagePreview>
              {coverImages.map((val, i) => (
                <div key={i}>
                  <button onClick={() => handleImageRemove(i)}>Remove</button>
                  <Image
                    src={val.url}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              ))}
            </ImagePreview>
          </CoverImageContainer>
          {/* <StepControl>
            <button id="left" onClick={handlePrev}><Image src="/arrow-left.svg" alt="" height={15} width={15} /> <span>Back</span></button>
            <button id="right" onClick={handleNext}><span>Save</span></button>
        </StepControl> */}
        </div>
      </div>
    </div>
  );
}

export default Stage3;
