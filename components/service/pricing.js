import React from "react";
import { useState } from "react";
import Image from "next/image";
import remove from "../../assets/remove.svg";
import rightarrow from "../../assets/rightarrow.svg";
import Loader from "../UI/Loader";
import { toast } from "react-toastify";

function Pricing({
  handleDecrement,
  handleIncrement,
  packages,
  setpackages,
  handleAddFeature,
  handleRemove,
  currentPackagesIndex,
  setcurrentPackagesIndex,
  handleFormInput,
  handleFormFeatureInput,
  handleServiceCreation,
  loading,
}) {
  // function validateArray(array) {
  //   for (let i = 0; i < array.length; i++) {
  //     const item = array[i];
  //     if (item.name) {
  //       if (
  //         item.description === "" ||
  //         item.amount === "" ||
  //         item.name === "" ||
  //         item.features.some((f) => f.name === "" || f.quantity === "")
  //       ) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

 


  const handleContinue = () => {
    let activePackages = [];
  for (let i = 0; i < packages.length; i++) {
    // push complete packages into activePackages
    const item = packages[i];
    if (item.name) {
      if (
        item.description !== "" ||
        item.amount !== "" ||
        item.name !== "" ||
        item.features.some((f) => f.name !== "" || f.quantity !== "")
      ) {
        activePackages.push(item);

      }
    }
  }
  if (activePackages.length === 0) {
    // if no active packages
    toast.error("Atleast one package is required", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  console.log(activePackages);
  setpackages(activePackages)
  handleIncrement();
  };

  return (
    <div className="">
      <h1 className="text-xl font-medium mb-8">Pricing</h1>

      <div className="content mb-6 grid md:grid-cols-2  items-center">
        <div>
          <h1 className=" font-medium"> Create Packages</h1>
          <p className="text-tert-100 ">
            How many packages do you want to offer?
          </p>
        </div>
        <div className="flex md:justify-end space-x-3">
          <button
            onClick={() => {
              setcurrentPackagesIndex(0);
            }}
            className={`${
              currentPackagesIndex == 0
                ? "bg-primary-100 text-white"
                : "bg-tert-100 text-[#94949C]"
            } py-2 md:px-4 px-2 rounded-lg text-white flex items-center space-x-2 `}
          >
            <span className="mr-2 text-xs md:text-base"> Package 1</span>
          </button>
          <button
            onClick={() => {
              setcurrentPackagesIndex(1);
            }}
            className={`${
              currentPackagesIndex == 1
                ? "bg-primary-100 text-white"
                : "bg-tert-100 text-[#94949C]"
            } py-2 md:px-4 px-2 rounded-lg text-white flex items-center space-x-2 `}
          >
            <span className="mr-2 text-xs md:text-base"> Package 2</span>
          </button>
          <button
            onClick={() => {
              setcurrentPackagesIndex(2);
            }}
            className={`${
              currentPackagesIndex == 2
                ? "bg-primary-100 text-white"
                : "bg-tert-100 text-[#94949C]"
            } py-2 md:px-4 px-2 rounded-lg text-white flex items-center space-x-2 `}
          >
            <span className="mr-2 text-xs md:text-base"> Package 3</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between my-4">
        <label htmlFor="title" className="text-[#344054]">
          Title
        </label>
        <div>
          <input
            type="text"
            placeholder="Basic"
            className="p-2 border outline-none rounded-md w-full"
            name="name"
            value={packages[currentPackagesIndex].name}
            onChange={(e) => {
              handleFormInput(e);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between my-4">
        <label htmlFor="title" className="text-[#344054]">
          Price
        </label>
        <div>
          <input
            type="number"
            placeholder="#20, 000.00"
            className="p-2 border outline-none rounded-md w-full"
            name="amount"
            value={packages[currentPackagesIndex].amount}
            onChange={(e) => {
              handleFormInput(e);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between my-4">
        <label htmlFor="title" className="text-[#344054]">
          Description
        </label>
        <div>
          <textarea
            id=""
            cols="30"
            rows="5"
            name="description"
            value={packages[currentPackagesIndex].description}
            onChange={(e) => {
              handleFormInput(e);
            }}
            className="input mt-2 px-3 py-2 resize-none md:w-[400px] w-full"
          ></textarea>
        </div>
      </div>

      <div className="border-t py-6 mt-6 space-y-3">
        {packages[currentPackagesIndex].features.map((x, idx) => (
          <div key={idx} className="flex justify-between space-x-2">
            <input
              type="text"
              placeholder="Delivery Days"
              className="p-2 border outline-none rounded-md md:w-1/5 "
              name="name"
              value={packages[currentPackagesIndex].features[idx].name}
              onChange={(e) => {
                handleFormFeatureInput(e, idx);
              }}
            />
            <div className="flex space-x-3 md:w-[300px]">
              <input
                type="number"
                placeholder="3"
                className="p-2 border outline-none rounded-md w-full"
                name="quantity"
                value={packages[currentPackagesIndex].features[idx].quantity}
                onChange={(e) => {
                  handleFormFeatureInput(e, idx);
                }}
              />
              {idx !== 0 && (
                <button
                  onClick={() => {
                    handleRemove(idx);
                  }}
                >
                  <Image
                    src={remove}
                    alt="rightarrow"
                    className="transform rotate-180 ml-2 w-4 h-4"
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddFeature}
        className=" py-2 px-4 rounded-lg text-primary-100 flex items-center space-x-2 "
      >
        <span className="mr-2  text-red-500">+ Add custom feature</span>
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
          onClick={() => {
            handleContinue();
          }}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          {loading ? <Loader /> : "Continue"}

          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Pricing;
