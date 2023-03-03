//=========================== TAILWIND STYLES APPLIED HERE =========================

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LandingLayout from "../layouts/landing.layout";
import {
  Container,
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

const Contact = () => {
  const [phone, setPhone] = useState(null);

  return (
    <div>
      {/*  <Container>
      <Wrapper> */}
      <div className="bg-[#FDFAF5] ">
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
                <div className="flex flex-col mt-4">
                  <label htmlFor="Phonenumber">Phone number</label>
                  <PhoneInput
                    country={"ng"}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="Email">Message</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full input mt-2 px-3 py-2"
                  ></textarea>
                </div>

                <button className="shadow-lg bg-primary-100 p-3 text-lg font-medium text-white mt-4 rounded-lg w-full">
                  Send message
                </button>
              </div>
            </div>
            <div>
              <Image src={ContactImage}  alt="contact_image"/>
            </div>
          </div>
        </div>
      </div>
      {/*  </Wrapper>
    </Container> */}
    </div>
  );
};
Contact.getLayout = (page) => {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Contact;
