//=========================== TAILWIND STYLES APPLIED HERE =========================
import rightarrow from "../../assets/rightarrow.svg";

import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Loader from '../UI/Loader';

function Review({ handleDecrement, loading, handleServiceCreation }) {
  const handleSubmit = () => {
    handleServiceCreation();
  };
  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Review and Publish</h1>

      <div className="content my-6">
        <h1 className=" font-medium"> Copyright Notice</h1>
        <div className="flex space-x-4 items-center">
          <input type="checkbox" name="" id="" />
          <p className="text-tert-100 my-1">
            By submitting your project, you declare that you either own or have
            rights to the material posted and that posting these materials does
            not infringe on any third rights. You also acknowledge that you
            understand your project will be reviewed and evaluated by Upwork to
            ensure it meets requirements.
          </p>
        </div>
      </div>
      <div className="content mb-6">
        <h1 className=" font-medium"> Terms of Service</h1>
        <div className="flex space-x-4 items-center">
          <input type="checkbox" name="" id="" />
          <p className="text-tert-100 my-1">
            I understand and agree to the Upwork Terms of Service, including the
            User Agreement and Privacy Policy.
          </p>
        </div>
      </div>
      <div className="content mb-6">
        <h1 className=" font-medium">Terms of Service</h1>
        <div className="flex space-x-4 items-center">
          <input type="checkbox" name="" id="" />

          <p className="text-tert-100 my-1">
            By submitting this project and activating it, I understand that it
            will appear in Upwork search results visible to the general public
            and will show up in search engine results, even if my profile
            visibility is set to Private or Upwork Users Only
          </p>
        </div>
      </div>

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
          onClick={handleServiceCreation}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
        {loading ? <Loader /> : "Continue"}
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Review;
