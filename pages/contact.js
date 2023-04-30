//=========================== TAILWIND STYLES APPLIED HERE =========================

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LandingLayout from "../layouts/landing.layout";
import {
  Container,
  ContactFlex,
  BanImage,
  FormTop,
  FormContainer,
  InputContainer,
  InputSection,
  SocialLinks,
  TextAreaContainer,
  Wrapper,
} from "../styles/contact.style";
import ContactImage from "./../assets/contact.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { axiosInstance } from "./../api/axios";

import { Country } from "country-state-city";
import Loader from "../components/UI/Loader";

const Contact = () => {
  const [phoneCode, setPhoneCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [loading, setloading] = useState(false);
  const [country] = useState(Country.getAllCountries());

  const handleSendMessage = () => {
    if (!firstname || !email || !lastname || !message || !phone) {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setloading(true);
    const payload = {
      firstname: `${firstname}  ${lastname}`,
      email,
      message,
      phone: `${phoneCode}${phone}`,
    };
    axiosInstance()
      .post("/contact-us", payload)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res.data.data);
        setloading(false);
        setfirstname("");
        setlastname("");
        setmessage("");
        setemail("");
        setPhone("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setloading(false);
      });
  };

  return (
    <div >
      {/* <div className="bg-[#FDFAF5] ">
        <div className=" py-40 md:px-20 container mx-auto">
          <div className="grid grid-cols-2 items-center gap-[64px] w-full">
            <div>
              <h1 className="text-sec-100 font-bold text-4xl"> Get in touch</h1>
              <p>
                You can reach us anytime via{" "}
                <span className="text-primary-100">hi@influenzit.com</span>{" "}
              </p>
              <p>
                {" "}
                Call us at{" "}
                <span className="text-primary-100"> +2349098765432</span>
              </p>

              <div className="mt-12">
                <div className="grid grid-cols-2 items-center gap-8 my-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstname">First name</label>
                    <input
                      type="text"
                      id="firstname"
                      className="input mt-2 px-3 py-2"
                      value={firstname}
                      onChange={(e) => {
                        setfirstname(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastname">Last name</label>
                    <input
                      type="text"
                      id="lastname"
                      className="input mt-2 px-3 py-2"
                      value={lastname}
                      onChange={(e) => {
                        setlastname(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    id="lastname"
                    className="input mt-2 px-3 py-2"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="Email" className="">
                    Phone Number
                  </label>
                  <div className=" mt-1 input flex space-x-2 pl-2 py-2">
                    <select
                      name=""
                      id=""
                      onChange={(e) => {
                        setPhoneCode(e.target.value);
                      }}
                      Selected="Nigeria"
                      className="w-9 text-sm bg-transparent outline-none border-none"
                    >
                      {country.map((item, idx) => {
                        return (
                          <option
                            key={idx}
                            value={item.phonecode}
                            selected={item.name === "Nigeria"}
                          >
                            {item.flag} {item.phonecode}
                          </option>
                        );
                      })}
                    </select>
                    <input
                      type="text"
                      className="bg-transparent outline-none w-full flex-1"
                      placeholder="8012345678 "
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="Email">Message</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full input mt-2 px-3 py-2 resize-none"
                    onChange={(e) => {
                      setmessage(e.target.value);
                    }}
                    value={message}
                  ></textarea>
                </div>

                <button
                  onClick={handleSendMessage}
                  className="shadow-lg bg-primary-100 p-3 text-lg font-medium text-white mt-4 rounded-lg w-full"
                >
                  {loading ? <Loader /> : "Send message"}
                </button>
              </div>
            </div>
            <div>
              <Image src={ContactImage} alt="contact_image" />
            </div>
          </div>
        </div>
      </div> */}


      {/* Responsive Version */}

    <div className="mx-auto max-w-[1200px]">
      <Container>
        <ContactFlex>
          <FormContainer>
          <div >
            <FormTop>
              <h1> Get in touch</h1>
              <p>
                You can reach us anytime via{" "}
                <span className="text-primary-100">hi@influenzit.com</span>{" "}
              </p>
              <p>
                {" "}
                Call us at{" "}
                <span className="text-primary-100"> +2349098765432</span>
              </p>
              </FormTop>
              <div className="mt-12">
                <div className="grid grid-cols-2 items-center gap-8 my-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstname">First name</label>
                    <input
                      type="text"
                      id="firstname"
                      className="input mt-2 px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastname">Last name</label>
                    <input
                      type="text"
                      id="lastname"
                      className="input mt-2 px-3 py-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    id="lastname"
                    className="input mt-2 px-3 py-2"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="Email" className="">Phone Number</label>
                  <div className=" mt-1 input flex space-x-2 pl-2 py-2">
                    <select
                      name=""
                      id=""
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      Selected="Nigeria"
                      className="w-9 text-sm bg-transparent outline-none border-none"
                    >
                      {country.map((item, idx) => {
                        return (
                          <option
                            key={idx}
                            value={item.name}
                            selected={item.name === "Nigeria"}
                          >
                            {item.flag} {item.phonecode}
                          </option>
                        );
                      })}
                    </select>
                    <input
                      type="text"
                      className="bg-[#FFF] outline-none w-full flex-1"
                      placeholder="8012345678 "
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="Email">Message</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="w-full input mt-2 px-3 py-2 resize-none bg-[#FFF]"
                  ></textarea>
                </div>

                <button className="shadow-lg bg-primary-100 p-3 text-lg font-medium text-white mt-4 rounded-lg w-full">
                  Send message
                </button>
              </div>
            </div>
          </FormContainer>
            <BanImage>
              <Image src={ContactImage} alt="contact_image" />
            </BanImage>
        </ContactFlex>
      </Container>
      </div>
    </div>
  );
};
Contact.getLayout = (page) => {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Contact;
