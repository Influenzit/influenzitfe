//=========================== TAILWIND STYLES APPLIED HERE =========================

import React, { useEffect, useState } from "react";

import Image from "next/image";
import email from "../../assets/profile/email.svg";
import at from "../../assets/profile/at.svg";
import { Country } from "country-state-city";

import { getAccount, getUserAccount, updateAccount } from "../../api/auth";
import { getUser, updateUser } from "../../app/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import { getIndustries } from "api/influencer";
import { useQuery } from "@tanstack/react-query";
import { getUserType } from "app/reducers/status";
import { Capsule, CapsuleWrapper, InputContainer } from "styles/auth.style";

function Stage1() {
  const dispatch = useDispatch();

  const [countries] = useState(Country.getAllCountries());
  const [getSelectedCountry, setcountry] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [headline, setHeadline] = useState("");
  const [biography, setBiography] = useState("");
  const [industry, setIndustry] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [loading, setLoading] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const currentAcctType = useSelector(getUserType);
  const [industrySelected, setIndustrySelected] = useState([]);
  const [user, setUser] = useState(null)

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
  const { data, refetch } = useQuery(["get-account"], async () => {
    return await getAccount();
}, {
    staleTime: false,
    enabled: false,
    retry: false,
    onSuccess(res) {
        setUser(res.data.data);
    }
});
const handleAddIndustry = (val) => {
  setIndustrySelected((prev) => {
    const copy = [...prev];
    if(copy.indexOf(val) === -1) {
        copy.push(val);
    }
    return copy;
  })
}
const handleRemoveIndustry = (val) => {
setIndustrySelected((prev) => {
      let copy = [...prev];
      copy = copy.filter((curr) => curr !== val);
      return copy;
  })
}
  const handleAccountUpdate = () => {
    setLoading(true);
    const payload = {
      gender,
      country,
      headline,
      biography,
      instagram,
      tiktok,
      facebook,
      twitter,
      youtube,
      niches: industrySelected,
    };

    for (let i in payload) {
      if (payload[i] === "") {
        delete payload[i];
      }
    }
    console.log(payload);
    updateAccount(user.id, payload)
      .then((res) => {
        toast.success("Account updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        getUserAccount()
            .then((userRes) => {
              if (userRes.data.data) {
                dispatch(updateUser(userRes.data.data));
                setLoading(false);
              }
            })
            .catch((err) => {
              setLoading(false);
            });
       })
      .catch((err) => {
        toast.error("An error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      let list = [];
      setGender(user.gender ?? "");
      setCountry(user.country ?? "");
      setHeadline(user.headline ?? "");
      setBiography(user.biography ?? "");
      setFacebook(user.facebook ?? "");
      setInstagram(user.instagram ?? "");
      setTwitter(user.twitter ?? "");
      setTiktok(user.tiktok ?? "");
      setYoutube(user.youtube ?? "");
      user.niches.forEach((val) => {
        list.push(val.name);
      })
        setIndustrySelected(list);
      }
  }, [user]);
  useEffect(() => {
    refetchIndustryData();
    refetch();
  }, [])
  
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <h1 className="text-lg">
              {
                ((currentAcctType === "Influencer")) && ("Influencer Information")
              }
              {
                ((currentAcctType === "Creator")) && ("Creator Information")
              }
              {
                ((currentAcctType === "Business Owner")) && ("Business Information")
              }
            </h1>
            <p className="text-xs text-[#667085]">
              Update your  {
                ((currentAcctType === "Influencer")) && ("influencer")
              }
              {
                ((currentAcctType === "Business Owner")) && ("business")
              }
              {
                ((currentAcctType === "Creator")) && ("creator")
              } {" "}
               information here
            </p>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Industry</h1>
          </div>
          <div className="col-span-6">
            <InputContainer style={{ marginTop: "20px" }}>
                <label>Niche/Interest</label>
                
                <select style={{ fontSize: "14px" }} value={industry} onChange={(e) => handleAddIndustry(e.target.value)}>
                    <option value="">Select Niche/Interest</option>
                    {
                        industryList.map((val, i) => (
                            <option key={i} value={val}>{val}</option>
                        ))
                    }
                </select>
            </InputContainer>
            <CapsuleWrapper>
                {
                  industrySelected.map((ind, i) => (
                    <Capsule key={i}>
                        {ind}
                        <button onClick={() => handleRemoveIndustry(ind)}><Image src="/delete.svg" alt="del" height={18} width={18} /></button>
                    </Capsule>
                  ))  
                }
            </CapsuleWrapper>
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
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
                    setCountry(e.target.value);
                  }}
                  Selected="Nigeria"
                  className="w-full bg-transparent outline-none"
                >
                  {countries.map((item, idx) => {
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

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
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

        <div className="py-5 border-b grid md:grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Influencer summary</h1>
          </div>
          <div className="col-span-6">
            <input
              type="text"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Lifestyle Creator and Food Enthusiast"
              value={headline}
              onChange={(e) => {
                setHeadline(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b grid md:grid-cols-12 gap-4">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Influencer Description </h1>
          </div>
          <div className="col-span-6">
            <textarea
              name=""
              id=""
              rows="5"
              value={biography}
              onChange={(e) => {
                setBiography(e.target.value);
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
              onClick={() => handleAccountUpdate()}
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
