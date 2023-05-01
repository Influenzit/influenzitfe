//=========================== TAILWIND STYLES APPLIED HERE =========================
import rightarrow from "../../assets/rightarrow.svg";

import React from "react";
import Image from "next/image";
import Loader from "../UI/Loader";
import { toast } from "react-toastify";

function Requirement({
  handleIncrement,
  handleDecrement,
  handleAddReq,
  handleRemoveReq,
  requirements,
  handleReqinput,
  handleReqCreation,
  loading,
}) {
  function validateArray(array) {
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (item.title === "" || item.description === "" || item.format === "") {
        return false;
      }
    }
    return true;
  }

  const isValid = validateArray(requirements);
  const handleContinue = () => {
    if (!isValid) {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    handleIncrement();
  };
  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Requirements</h1>
      <div className="content mb-6">
        <h1 className=" font-medium"> Collect information to get started</h1>
        <p className="text-tert-100 my-1">
          Add questions to help buyers provide you with exactly what you need to
          start working on their order.
        </p>
      </div>
      {requirements.length > 0 && (
        <div className="space-y-4">
          {requirements.map((x, id) => (
            <div key={id}>
              <div>
                <label htmlFor="title" className="text-[#344054] mb-1">
                  Title
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Requirement Name"
                  className="p-2 border outline-none rounded-md w-full"
                  name="title"
                  value={requirements[id].title}
                  onChange={(e) => {
                    handleReqinput(e, id);
                  }}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="text-[#344054] mb-1">
                  Description{" "}
                </label>
              </div>
              <div>
                <textarea
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="More description ......."
                  className="p-2 border outline-none rounded-md w-full"
                  name="description"
                  value={requirements[id].description}
                  onChange={(e) => {
                    handleReqinput(e, id);
                  }}
                ></textarea>
              </div>
              <div className="mt-4">
                <label htmlFor="title" className="text-[#344054] mb-1">
                  Format
                </label>
              </div>
              <div className="p-2 border outline-none rounded-md w-full">
                <select
                  name="format"
                  id="format"
                  className="border-none outline-none w-full h-full"
                  onChange={(e) => {
                    handleReqinput(e, id);
                  }}
                >
                  <option value="">-- Select --</option>
                  <option
                    value="text"
                    selected={requirements[id].format === "text"}
                  >
                    Text{" "}
                  </option>
                  <option
                    value="media"
                    selected={requirements[id].format === "media"}
                  >
                    Media{" "}
                  </option>
                </select>
              </div>
              {id !== 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleRemoveReq(id);
                    }}
                    className=" py-2 px-4 rounded-lg text-primary-100 flex items-center space-x-2 text-xs"
                  >
                    <span className="mr-2  text-red-500">- Remove Requirement</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddReq}
        className=" py-2 px-4 rounded-lg text-primary-100 flex items-center space-x-2 "
      >
        <span className="mr-2  text-red-500">+ Add a Requirement</span>
      </button>

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
          onClick={handleContinue}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          {loading ? <Loader /> : "Continue"}
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Requirement;
