//=========================== TAILWIND STYLES APPLIED HERE =========================

import React, { useEffect, useState } from "react";
import LandingLayout from "../../../layouts/landing.layout";
import Image from "next/image";
import Preview_image from "../../../assets/previewImage.png";
import Accordion from "../../../components/service/accordion";
import { useRouter } from "next/router";
import { getService } from "../../../api/influencer";

function Preview() {
  const router = useRouter();

  const [singleService, setSingleService] = useState(null);
  const [packageBody, setpackageBody] = useState(
    singleService !== null ? singleService.packages[0] : null
  );
  const [state, setstate] = useState(0);
  const { id } = router.query;

  const handleGetSingleService = () => {
    getService(parseInt(id)) //
      .then((res) => {
        console.log(res);
        setSingleService(res.data.data);
        setpackageBody(res.data.data.packages[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    console.log(id);
    handleGetSingleService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LandingLayout>
      {singleService !== null ? (
        <div className="py-28 px-12 w-full">
          <div className="grid md:grid-cols-12 w-full gap-4">
            <div className="col-span-8">
              <Image
                src={singleService.media[0]?.url || ""}
                alt="title_image"
                className="h-full w-full object-cover rounded-lg"
                width="100%"
                height="50%"
                layout="responsive"
              />

              <h1 className="text-3xl my-10  font-medium ">
                {singleService.name}
              </h1>

              <p className="my-4 text-[#555461]">{singleService.description}</p>


 {/*  Mobile view only */}
 <div className="md:hidden flex w-full">
 <div className="border rounded-lg">
   <div className="w-full flex">
     <button
       onClick={() => {
         setstate(0);
         setpackageBody(singleService.packages[0]);
       }}
       className={`${
         state === 0
           ? "bg-[#2A2939] text-white"
           : "bg-[#EAEAEB] text-[#2A2939]"
       } p-3 w-full rounded-tl-lg`}
     >
       {singleService.packages[0].name}
     </button>
     <button
       onClick={() => {
         setstate(1);
         setpackageBody(singleService?.packages[1]);
       }}
       className={`${
         state === 1
           ? "bg-[#2A2939] text-white"
           : "bg-[#EAEAEB] text-[#2A2939]"
       } p-3 w-full`}
     >
       {singleService?.packages[1]?.name}{" "}
     </button>
     <button
       onClick={() => {
         setstate(2);
         setpackageBody(singleService?.packages[2]);
       }}
       className={`${
         state === 2
           ? "bg-[#2A2939] text-white"
           : "bg-[#EAEAEB] text-[#2A2939]"
       } p-3 w-full rounded-tr-lg`}
     >
       {singleService?.packages[2]?.name}{" "}
     </button>
   </div>

   <div className="p-4 ">
     <div className="flex justify-between items-center">
       <h1 className="uppercase text-xl font-semibold">
         {packageBody?.name || ""}
       </h1>
       <h1 className="uppercase text-xl font-semibold text-primary-100">
         ₦{packageBody?.amount || ""}
       </h1>
     </div>

     <p className="text-[#555461] py-5">
       {packageBody?.description || ""}
     </p>

     {packageBody.features.map((item, id) => (
       <div
         key={id}
         className="my-4 flex justify-between items-center"
       >
         <h1 className="uppercase  "> {item.name} </h1>
         <h1 className="uppercase  ">{item.quantity}</h1>
       </div>
     ))}
   </div>
 </div>
</div>


              <div className="py-10 grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <Image
                    src={singleService.user.profile_pic}
                    alt="preview_image"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    className="h-20 w-12 rounded-xl"
                  />
                </div>

              
                <div className="col-span-10 flex justify-between items-start">
                  <div className="space-y-2">
                    <h1 className="font-medium"> {singleService.user.name} </h1>
                    <p>Nigeria</p>
                  </div>
                  <button className="px-4 py-3 bg-[#2A2939] text-white rounded-lg">
                    View profile
                  </button>
                </div>
              </div>

              <h1 className="text-xl my-5 font-medium">FAQ’s </h1>
              {singleService.faqs.length > 0 &&
                singleService.faqs.map((qa, id) => (
                  <Accordion
                    key={id}
                    question={qa.question}
                    answer={qa.answer}
                  />
                ))}
            </div>
            <div className="md:flex hidden col-span-4">
              <div className="border rounded-lg">
                <div className="w-full flex">
                  <button
                    onClick={() => {
                      setstate(0);
                      setpackageBody(singleService.packages[0]);
                    }}
                    className={`${
                      state === 0
                        ? "bg-[#2A2939] text-white"
                        : "bg-[#EAEAEB] text-[#2A2939]"
                    } p-3 w-full rounded-tl-lg`}
                  >
                    {singleService.packages[0].name}
                  </button>
                  <button
                    onClick={() => {
                      setstate(1);
                      setpackageBody(singleService?.packages[1]);
                    }}
                    className={`${
                      state === 1
                        ? "bg-[#2A2939] text-white"
                        : "bg-[#EAEAEB] text-[#2A2939]"
                    } p-3 w-full`}
                  >
                    {singleService?.packages[1]?.name}{" "}
                  </button>
                  <button
                    onClick={() => {
                      setstate(2);
                      setpackageBody(singleService?.packages[2]);
                    }}
                    className={`${
                      state === 2
                        ? "bg-[#2A2939] text-white"
                        : "bg-[#EAEAEB] text-[#2A2939]"
                    } p-3 w-full rounded-tr-lg`}
                  >
                    {singleService?.packages[2]?.name}{" "}
                  </button>
                </div>

                <div className="p-4 ">
                  <div className="flex justify-between items-center">
                    <h1 className="uppercase text-xl font-semibold">
                      {packageBody?.name || ""}
                    </h1>
                    <h1 className="uppercase text-xl font-semibold text-primary-100">
                      ₦{packageBody?.amount || ""}
                    </h1>
                  </div>

                  <p className="text-[#555461] py-5">
                    {packageBody?.description || ""}
                  </p>

                  {packageBody.features.map((item, id) => (
                    <div
                      key={id}
                      className="my-4 flex justify-between items-center"
                    >
                      <h1 className="uppercase  "> {item.name} </h1>
                      <h1 className="uppercase  ">{item.quantity}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-xl my-5 font-medium">Gallery </h1>
            <div className="grid md:grid-cols-3 gap-4">
              {singleService.media.length > 0 &&
                singleService.media.map((item, id) => (
                  <div key={id} className="h-[]">
                    <Image
                      src={item.url}
                      alt="preview_image"
                      className="h-[140px] rounded-xl"
                      width="100%"
                      height="100%"
                      layout="responsive"
                    />
                  </div>
                ))}
            </div>
          </div>
          <h1 className="text-xl my-5 font-medium">Reviews </h1>
          {/*  <div className="my-5">
            <div className="grid grid-cols-3 gap-6">
              <div className="review-card p-6">
                <div>
                  Ut enim ad minim veniam, quis nostrudexercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat aute irure
                  sint amet occaecat cupidatat non proident”
                </div>
                <div className="flex space-x-4 my-4">
                  <div className="w-2/6">
                    {" "}
                    <Image
                      src={Preview_image}
                      alt="preview_image"
                      className="w-32 h-32 rounded-xl"
                    />
                  </div>
                  <div className="w-full">
                    <h6 className="font-bold">Mike Warren</h6>
                    <p className="text-[#6F6C90] text-xs">
                      Developer at BRIX Templates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </LandingLayout>
  );
}

export default Preview;
