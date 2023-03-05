import React from "react";

function Stage1() {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <div>
          <p className="text-xs  text-primary-100">Step 1</p>
          <p className="text-xs ">Describe your Campaign</p>
        </div>
        <div>
          <p className="text-xs  text-primary-100">Step 2</p>
          <p className="text-xs ">Set Milestones</p>
        </div>
      </div>
      <div className="w-full">
        {[1, 2].map((item, idx) => (
          <div className="grid grid-cols-12 gap-4 w-full" key={idx}>
            <div className="col-span-6">
              <div className="my-6 flex flex-col space-y-2 ">
                <label htmlFor="b_id">Milestone name</label>
                <input
                  type="text"
                  id="b_id"
                  className="input p-3"
                  placeholder="Account Settings"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="my-6 flex flex-col space-y-2 ">
                <label htmlFor="b_id">Delivery Date</label>
                <input
                  type="text"
                  id="b_id"
                  className="input p-3"
                  placeholder="Rhye"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="my-6 flex flex-col space-y-2 ">
                <label htmlFor="b_id">Price</label>
                <input
                  type="text"
                  id="b_id"
                  className="input p-3"
                  placeholder="Rhye"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {}}
        className="bg-[#F9DADE] py-2 px-4 rounded-lg text-white"
      >
        Add milestone
      </button>
    </div>
  );
}

export default Stage1;
