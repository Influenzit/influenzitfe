import React from "react";

function Stage3() {
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
        <div>
          <p className="text-xs  text-primary-100">Step 3</p>
          <p className="text-xs ">Request Requirements</p>
        </div>
      </div>
      <div className="my-8 flex flex-col space-y-2 ">
        <label htmlFor="b_id">Request requirements</label>
        <input
          type="text"
          id="b_id"
          className="input p-3"
          placeholder="Account Settings"
        />
      </div>
    </div>
  );
}

export default Stage3;
