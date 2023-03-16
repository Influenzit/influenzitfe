import React, { useState } from 'react'
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import { Country } from "country-state-city";

function Stage1() {
    const [phone, setPhoneCode] = useState(null);
    const [country] = useState(Country.getAllCountries());
    return (
        <div>
        <div className="let swipeIn">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            {" "}
            <h1 className="text-lg">Profile Details </h1>
            <p className="text-xs text-[#667085]">
              Update your profile details here.
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

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Name</h1>
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
                placeholder="Oliva"
              />
              <input
                type="text"
                className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
                placeholder="Rhye"
              />
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Email address</h1>
          </div>
          <div className="col-span-6">
            <div className="col-span-6">
              <div className=" flex space-x-3 px-3 py-2 rounded-lg border  bg-transparent outline-none w-full">
                <Image src={email} alt="email" />
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="olivia@untitledui.com"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Phone Number</h1>
          </div>
          <div className="col-span-6">
            <div className=" flex space-x-3 rounded-lg border  bg-transparent outline-none w-full">
              <div className="border-r py-2 px-2">
              <select
              name=""
              id=""
              onChange={(e) => {
                setPhoneCode(e.target.value);
              }}
              Selected="Nigeria"
              className="w-12 text-sm bg-transparent outline-none border-none"
            >
              {country.map((item, idx) => {
                return (
                  <option
                    key={idx}
                    value={item.name}
                    selected={item.name === "Nigeria"}
                  >
                    {item.phonecode}
                  </option>
                );
              })}
            </select>
              </div>
              <input
                type="text"
                className="bg-transparent outline-none w-full flex-1"
                placeholder="8012345678 "
              />
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Stage1
