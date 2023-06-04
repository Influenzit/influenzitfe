import React, { useState } from "react";
import Image from "next/image";
import rightarrow from "../../assets/rightarrow.svg";
import { Milestone } from "styles/influencer-profile";

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
        {
          milestone.map((item, id) => (
            <Milestone key={id}>
              <div className="top">
                <div>
                  <label htmlFor="title">Milestone name<span style={{ color:"red" }}>*</span></label>
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
                <div>
                  <label htmlFor="end_date">Delivery Date<span style={{ color:"red" }}>*</span></label>
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
              <div className="bottom">
                  <div className="ip">
                    <label htmlFor={`check-${id}`}> { item.include_price && <span></span> }</label> <p>Include Amount</p>
                    <input type="checkbox" id={`check-${id}`} defaultValue={milestone[id].include_price} name="include_price" hidden onChange={(e) => {
                        handleMilestoneinput(e, id);
                      }}/>
                  </div>
                  <div>
                    {" "}
                    <button
                      onClick={() => {
                        handleRemoveMilestone(id);
                      }}
                        className="outline-none text-[10px] text-red-500 mt-5"
                      >
                      <Image src="/delete.svg" alt="del" height={20} width={20} />
                    </button>
                  </div>
              </div>
              {

                milestone[id].include_price && (<div className="">
                <div className="mb-2 flex flex-col space-y-2 ">
                  <label htmlFor="amount">Price (₦)<span style={{ color:"red" }}>*</span></label>
                  <input
                    type="text"
                    name="amount"
                    className="input p-3"
                    placeholder="Enter amount"
                    value={milestone[id].amount}
                    onChange={(e) => {
                      if(e.target.value === "" || Number(e.target.value)) {
                        handleMilestoneinput(e, id);
                      }
                    }}
                  />
                </div>
              </div>)
              }
            </Milestone>
          ))
        }
      </div>
      <button
        onClick={() => {
          handleAddMilestone();
        }}
        className="bg-primary-100 py-2 px-4 rounded-lg text-white hover:bg-primary-100"
      >
        Add milestone
      </button>

      <div className="flex justify-between milestone[id]s-center mt-6 ">
        <button
          onClick={handleDecrement}
          className="bg-tert-100 py-2 px-4 rounded-lg text-white flex milestone[id]s-center space-x-2 "
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
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex milestone[id]s-center space-x-2 "
        >
          Next
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Stage2;
