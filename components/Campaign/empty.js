import React from "react";
import { Image } from "next/image";
import rightarrow from "assets/project/rightarrow.svg";
import emptyicon from "assets/project/emptyicon.svg";

function Index() {
  return (
    <div className="empty">
      <div className="grid grid-cols-12">
        <div className="p-6 col-span-8">
          <h1 className="text-3xl font-semibold">Start your first project </h1>
          <p className="text-[#555461] font-light mt-4">
            Find the right influencers with correct metrics, keep track of your
            campaign performance and complete payments seamlessly.
          </p>

          <button className="bg-primary-100 py-2 px-4 rounded-lg text-white mt-8 flex space-x-4 items-center">
            <span className="mr-2">Find Creators</span>
            <Image src={rightarrow} alt={"leftarrow"} />
          </button>
        </div>
        <div className="col-span-4 -mb-2">
          <Image src={emptyicon} alt={"emptyicon"} className="" />
        </div>
      </div>
    </div>
  );
}

export default Index;
