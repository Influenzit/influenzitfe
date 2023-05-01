import React, { useState } from "react";
import Image from "next/image";
import rightarrow from "../../assets/rightarrow.svg";

function Stage2({
  handleIncrement,
  handleDecrement,
  handleMilestoneinput,
  setmilestone,
  milestone,
  handleRemoveMilestone,
  handleAddMilestone,
}) {
  const mileStoneCopy = [5];
  const handleIncrements = () => {
    mileStoneCopy.push(5);
    setmileStone(mileStoneCopy);
  };
  const handlederements = () => {
    mileStoneCopy.pop;
    setmileStone(mileStoneCopy);
  };
  return (
    <div className="let swipeIn">
      <div className="grid grid-cols-3 gap-4 mb-4">
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
        {milestone.map((item, id) => (
          <div
            className="grid grid-cols-12 gap-4 w-full items-center"
            key={id}
          >
            <div className="col-span-5">
              <div className="my-6 flex flex-col space-y-2 ">
                <label htmlFor="title">Milestone name</label>
                <input
                  type="text"
                  name="title"
                  className="input p-3"
                  placeholder="Account Settings"
                  defaultValue={milestone[id].title}
                  onChange={(e) => {
                    handleMilestoneinput(e, id);
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="my-6 flex flex-col space-y-2 ">
                <label htmlFor="end_date">Delivery Date</label>
                <input
                  type="date"
                  name="end_date"
                  className="input p-3"
                  placeholder="Rhye"
                  defaultValue={milestone[id].end_date}
                  onChange={(e) => {
                    handleMilestoneinput(e, id);
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="my-6 flex flex-col space-y-2 ">
                <label htmlFor="amount">Price</label>
                <input
                  type="number"
                  name="amount"
                  className="input p-3"
                  placeholder="#20, 000"
                  defaultValue={milestone[id].amount}
                  onChange={(e) => {
                    handleMilestoneinput(e, id);
                  }}
                />
              </div>
            </div>
            <div>
              {" "}
              <button
                onClick={() => {
                  handleRemoveMilestone(id);
                }}
                className="outline-none text-[10px] text-red-500 mt-5"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          handleAddMilestone();
        }}
        className="bg-[#F9DADE] py-2 px-4 rounded-lg text-white hover:bg-primary-100"
      >
        Add milestone
      </button>

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
          onClick={handleIncrement}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          Next
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Stage2;
