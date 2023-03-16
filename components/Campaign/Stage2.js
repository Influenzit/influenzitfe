import React, { useState } from "react";

function Stage2() {
  const [mileStone, setmileStone] = useState([5]);

  const mileStoneCopy = [5];
  const handleIncrement = () => {
    mileStoneCopy.push(5);
    setmileStone(mileStoneCopy);
  };
  const handlederement = () => {
    mileStoneCopy.pop;
    setmileStone(mileStoneCopy);
  };
  return (
    <div className="let swipeIn">
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
        {mileStone.map((item, idx) => (
          <div
            className="grid grid-cols-12 gap-4 w-full items-center"
            key={idx}
          >
            <div className="col-span-5">
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
            <div>
              {" "}
              <button
                onClick={() => {
                  handlederement();
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
          handleIncrement();
        }}
        className="bg-[#F9DADE] py-2 px-4 rounded-lg text-white hover:bg-primary-100"
      >
        Add milestone
      </button>
    </div>
  );
}

export default Stage2;
