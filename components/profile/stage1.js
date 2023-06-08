import React, { useEffect, useState } from "react";

import Image from "next/image";
import emailIcon from "../../assets/profile/email.svg";
import { Country } from "country-state-city";
import { accountMedia, getUserAccount, updateAccount } from "../../api/auth";
import { getUser, updateUser } from "../../app/reducers/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";

function Stage1({ user }) {
  const dispatch = useDispatch();

  console.log(user);
  const [country] = useState(Country.getAllCountries());
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);
  const [phoneCode, setPhoneCode] = useState(+234);
  const [loading, setloading] = useState(null);

  const handleAccountUpdate = () => {
    if (!firstname || !email || !lastname || !phone) {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setloading(true);
    const payload = {
      firstname,
      lastname,
      phone1: phone,
      email,
    };

    updateAccount(user.id, payload)
      .then((res) => {
        toast.success("Account updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getUserAccount()
            .then((userRes) => {
              if (userRes.data.data) {
                dispatch(updateUser(userRes.data.data));
                setloading(false);
              }
            })
            .catch((err) => {
              setloading(false);
            });
      })
      .catch((err) => {
        toast.error("An error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    if (user) {
      setphone(user?.account?.phone1 ?? "");
      setemail(user?.email ?? "");
      setfirstname(user?.firstname ?? "");
      setlastname(user?.lastname ?? "");
    }
  }, [user]);
  return (
    <div>
      <div className="">
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
            <button
              onClick={handleAccountUpdate}
              className="px-3 py-2 rounded-lg bg-primary-100 text-white text-sm"
            >
              {loading ? <Loader /> : "Save"}
            </button>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Name</h1>
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
                placeholder="Oliva"
                value={firstname}
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
              />
              <input
                type="text"
                className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
                placeholder="Rhye"
                value={lastname}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Email address</h1>
          </div>
          <div className="col-span-6">
            <div className="col-span-6">
              <div className=" flex space-x-3 px-3 py-2 rounded-lg border  bg-transparent outline-none w-full">
                <Image src={emailIcon} alt="email" />
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="olivia@untitledui.com"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
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
                        value={item.phonecode}
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
                value={phone}
                onChange={(e) => {
                  setphone(`${e.target.value}`);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage1;
