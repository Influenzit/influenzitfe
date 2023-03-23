import React from "react";
import { useState } from "react";
import Image from "next/image";
import remove from "../../assets/remove.svg";
import rightarrow from "../../assets/rightarrow.svg";

function Pricing({
  handleIncrement,
  handleDecrement,
  packages,
  setpackages,
  handleAddFeature,
  handleRemove,
  currentPackagesIndex,
  setcurrentPackagesIndex,
}) {
  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Pricing</h1>

      <div className="content mb-6 grid grid-cols-2 n items-center">
        <div>
          <h1 className=" font-medium"> Create Packages</h1>
          <p className="text-tert-100">
            How many packages do you want to offer?
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              setcurrentPackagesIndex(0);
            }}
            className={`${
              currentPackagesIndex == 0
                ? "bg-primary-100 text-white"
                : "bg-tert-100 text-[#94949C]"
            } py-2 px-4 rounded-lg text-white flex items-center space-x-2 `}
          >
            <span className="mr-2"> Package 1</span>
          </button>
          <button
            onClick={() => {
              setcurrentPackagesIndex(1);
            }}
            className={`${
              currentPackagesIndex == 1
                ? "bg-primary-100 text-white"
                : "bg-tert-100 text-[#94949C]"
            } py-2 px-4 rounded-lg text-white flex items-center space-x-2 `}
          >
            <span className="mr-2"> Package 2</span>
          </button>
          <button
            onClick={() => {
              setcurrentPackagesIndex(2);
            }}
            className={`${
              currentPackagesIndex == 2
                ? "bg-primary-100 text-white"
                : "bg-tert-100 text-[#94949C]"
            } py-2 px-4 rounded-lg text-white flex items-center space-x-2 `}
          >
            <span className="mr-2"> Package 3</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <label htmlFor="title" className="text-[#344054]">
          Title
        </label>
        <div>
          <input
            type="text"
            placeholder="Krystal Beauty"
            className="p-2 border outline-none rounded-md w-full"
          />
        </div>
      </div>
      <div className="flex justify-between my-4">
        <label htmlFor="title" className="text-[#344054]">
          Price
        </label>
        <div>
          <input
            type="number"
            placeholder="#20, 000.00"
            className="p-2 border outline-none rounded-md w-full"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <label htmlFor="title" className="text-[#344054]">
          Description
        </label>
        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            className="input mt-2 px-3 py-2 resize-none w-[400px]"
          ></textarea>
        </div>
      </div>

      <div className="border-t py-6 mt-6 space-y-3">
        {packages[currentPackagesIndex].features.map((x, idx) => (
          <div key={idx} className="flex justify-between">
            <input
              type="text"
              placeholder="Title of feature"
              className="p-2 border outline-none rounded-md w-1/5"
            />
            <div className="flex space-x-3 w-[300px]">
              <input
                type="text"
                placeholder="Krystal Beauty"
                className="p-2 border outline-none rounded-md w-full"
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

export default Pricing;
