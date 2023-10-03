//=========================== TAILWIND STYLES APPLIED HERE =========================

import React, { useEffect, useState } from "react";

import Image from "next/image";
import email from "../../assets/profile/email.svg";
import at from "../../assets/profile/at.svg";
import { Country } from "country-state-city";

import { getAccount, getUserAccount, updateAccount } from "../../api/auth";
import { getBusinesses, updateBusiness } from '../../api/business'
import { getUser, updateUser } from "../../app/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import { getIndustries } from "api/influencer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserType } from "app/reducers/status";
import { Capsule, CapsuleWrapper, InputContainer } from "styles/auth.style";

function Stage1() {
  const dispatch = useDispatch();

  const [countries] = useState(Country.getAllCountries());
  const [getSelectedCountry, setcountry] = useState("");
  const [name, setName] = useState("");
  const [rc, setRc] = useState("");
  const [tin, setTin] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [loading, setLoading] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const currentAcctType = useSelector(getUserType);
  const [business, setBusiness] = useState(null);

  const { data: industryData, refetch: refetchIndustryData } = useQuery(["get-industries"], async () => {
      return await getIndustries();
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(data) {
          setIndustryList(data.data.data);
      }
  });
  const { data, refetch } = useQuery(["get-business"], async () => {
    return await getBusinesses();
}, {
    staleTime: false,
    enabled: false,
    retry: false,
    onSuccess(res) {
        setBusiness(res.data.data[0]);
    }
  });
  const getSocialMedia = (name) => {
    return JSON.parse(business?.social_handles ?? "[]")?.filter((val) => val.name === name)[0]?.value;
  }
  const updateBusinessMutation = useMutation((data) => {
    return updateBusiness(data, business?.id);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            setLoading(false);
            refetch();
            toast.success("Business updated successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
        },
        onError(error) {
            const res = error.response.data;
            setLoading(false);
            toast.error("An error occured", {
              position: toast.POSITION.TOP_RIGHT,
            });
        }
    });
  const handleBusinessUpdate = () => {
    if(loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("rc", rc);
    formData.append("tin", tin);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("phone", phone);
    formData.append("industry", industry);
    formData.append("social_handles", JSON.stringify([
      {
          name: "facebook",
          value: facebook,
          valuetype: "string",
      },
      {
        name: "twitter",
        value: twitter,
        valuetype: "string",
      },
      {
        name: "instagram",
        value: instagram,
        valuetype: "string",
      },
      {
        name: "tiktok",
        value: tiktok,
        valuetype: "string",
      },
      {
        name: "youtube",
        value: youtube,
        valuetype: "string",
      },
    ]))
    updateBusinessMutation.mutate(formData);
  };

  useEffect(() => {
    if (business) {
      setName(business.name ?? "");
      setDescription(business.description ?? "");
      setTin(business.tin ?? "");
      setRc(business.rc ?? "");
      setWebsite(business.website ?? "");
      setIndustry(business.industry ?? "");
      setPhone(business.phone ?? "");
      setEmail(business.email ?? "");
      setFacebook(getSocialMedia("facebook"));
      setInstagram(getSocialMedia("instagram"));
      setTiktok(getSocialMedia("tiktok"));
      setTwitter(getSocialMedia("twitter"));
      setYoutube(getSocialMedia("youtube"));
    }
  }, [business]);
  useEffect(() => {
    refetchIndustryData();
    refetch();
  }, [])
  
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <h1 className="text-lg">Business Information</h1>
            <p className="text-xs text-[#667085]">Update your business information here</p>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Business Name</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter business name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Website</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Business Website"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Business Email</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter business name"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">TIN Number</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter TIN Number"
              value={tin}
              onChange={(e) => {
                setTin(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Phone Number</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">RC Number</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter RC Number"
              value={rc}
              onChange={(e) => {
                setRc(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Industry</h1>
          </div>
          <div className="col-span-6">
            <InputContainer style={{ marginTop: "20px" }}>
                <label>Industry</label>
                
                <select style={{ fontSize: "14px" }} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    <option value="">Select Industry</option>
                    {
                        industryList.map((val, i) => (
                            <option key={i} value={val}>{val}</option>
                        ))
                    }
                </select>
            </InputContainer>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Business Description </h1>
          </div>
          <div className="col-span-6">
            <textarea
              name=""
              id=""
              rows="5"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="px-3 py-2 resize-none rounded-lg border  bg-transparent outline-none w-full"
              placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.
          "
            ></textarea>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 ">
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
                  <Image src={at} alt="handle" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                  value={instagram}
                  onChange={(e) => {
                    setInstagram(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Tiktok</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="handle" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                  value={tiktok}
                  onChange={(e) => {
                    setTiktok(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Facebook</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="handle" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                  value={facebook}
                  onChange={(e) => {
                    setFacebook(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Youtube</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="handle" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                  value={youtube}
                  onChange={(e) => {
                    setYoutube(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-[#344054]">Twitter</p>
              <div className=" flex space-x-3 px-3 rounded-lg border  bg-transparent outline-none w-full">
                <div className="border-r py-3 pr-3 grid place-content-center">
                  <Image src={at} alt="handle" />
                </div>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full flex-1"
                  placeholder="krystalbeauty"
                  value={twitter}
                  onChange={(e) => {
                    setTwitter(e.target.value);
                  }}
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
            <button
              onClick={() => handleBusinessUpdate()}
              className="px-3 py-2 rounded-lg bg-primary-100 text-white text-sm"
            >
              {loading ? <Loader /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage1;
