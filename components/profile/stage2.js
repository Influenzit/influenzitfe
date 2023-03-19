//=========================== TAILWIND STYLES APPLIED HERE =========================

import React, { useState } from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import at from "../../assets/profile/at.svg";
import { Country } from "country-state-city";

function Stage1() {
  const [country] = useState(Country.getAllCountries());
  const [getSelectedCountry, setcountry] = useState("");
  const [gender, setGender] = useState("");
  console.log(country);
  return (
    <div>
      <div className="let swipeIn">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <h1 className="text-lg">Business Information </h1>
            <p className="text-xs text-[#667085]">
              Update your business innformation here{" "}
            </p>
          </div>

          
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Industry</h1>
          </div>
          <div className="col-span-6">
            <div className=" flex space-x-3 px-3 py-2 rounded-lg border  bg-transparent outline-none w-full">
              <select
                className="w-full bg-transparent outline-none"
                name=""
                id=""
              >
                <option value="">Interior Design</option>
                <option value="">Interior Design</option>
                <option value="">Interior Design</option>
                <option value="">Interior Design</option>
              </select>
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Country</h1>
          </div>
          <div className="col-span-6">
            <div className="col-span-6">
              <div className=" flex space-x-3 px-3 py-2 rounded-lg border  bg-transparent outline-none w-full">
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setcountry(e.target.value);
                  }}
                  Selected="Nigeria"
                  className="w-full bg-transparent outline-none"
                >
                  {country.map((item, idx) => {
                    return (
                      <option
                        key={idx}
                        value={item.name}
                        selected={item.name === "Nigeria"}
                      >
                        {item.flag} {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Gender</h1>
          </div>
          <div className="col-span-6">
            <div className="col-span-6">
              <div className="grid grid-cols-12 gap-4">
                <div
                  className={`${
                    gender == "female" && "bg-[#FCEDEF] border border-[#DF475C]"
                  }  col-span-5 px-3 py-2  flex justify-between items-center rounded-lg border  outline-none w-full`}
                >
                  <label
                    htmlFor="female"
                    onClick={() => {
                      setGender("female");
                    }}
                  >
                    {" "}
                    Female{" "}
                  </label>

                  <div
                    className={`${
                      gender == "female" && " border-[#DF475C]"
                    } border rounded-full w-5 h-5 grid place-content-center`}
                    onClick={() => {
                      setGender("female");
                    }}
                  >
                    {gender === "female" && (
                      <div className="border rounded-full bg-primary-100 w-3 h-3"></div>
                    )}
                  </div>
                </div>
                <div
                  className={`${
                    gender == "male" && "bg-[#FCEDEF] border border-[#DF475C]"
                  }  col-span-5 px-3 py-2  flex justify-between rounded-lg border  outline-none w-full`}
                >
                  {" "}
                  <label
                    htmlFor="male"
                    onClick={() => {
                      setGender("male");
                    }}
                  >
                    {" "}
                    Male{" "}
                  </label>
                  <div
                    className={`${
                      gender == "male" && " border-[#DF475C]"
                    } border rounded-full w-5 h-5 grid place-content-center`}
                    onClick={() => {
                      setGender("male");
                    }}
                  >
                    {gender === "male" && (
                      <div className="border rounded-full bg-primary-100 w-3 h-3"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Influencer summary</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Lifestyle Creator and Food Enthusiast"
            />
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Influencer Description </h1>
          </div>
          <div className="col-span-6">
            <textarea
              name=""
              id=""
              rows="5"
              className="px-3 py-2 resize-none rounded-lg border  bg-transparent outline-none w-full"
              placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.
          "
            ></textarea>
          </div>
        </div>

        <div className="py-5 border-b grid grid-cols-12 gap-4 ">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">
              Social media handles{" "}
              <span className="text-[#94949C]">(Optional)</span>{" "}
            </h1>
          </div>
          <div className="col-span-6">
            <div>
              <p className="text-sm text-[#344054]">Instagram</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="email" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Tiktok</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="email" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Facebook</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="email" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Youtube</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="email" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Twitter</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="email" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end py-5">
          <div className="flex justify-between items-center space-x-3">
            <button className="px-3 py-2 rounded-lg border text-gray-800 bg-white text-sm">
              Cancel
            </button>
            <button className="px-3 py-2 rounded-lg bg-primary-100 text-white text-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage1;
