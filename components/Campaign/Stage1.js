import React from "react";

function Stage1() {
  return (
    <div>
      <p className="text-xs  text-primary-100">Step 1</p>
      <p className="text-xs ">Describe your Campaign</p>
      <div className="my-6 flex flex-col space-y-2 ">
        <label htmlFor="b_id">Business ID</label>
        <input
          type="text"
          id="b_id"
          className="input p-3"
          placeholder="K12R567"
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="Campaign_name">Campaign Name</label>
        <input
          type="text"
          id="Campaign_name"
          className="input p-3"
          placeholder="Account Settings"
        />
      </div>
      <div className="mb-6 flex flex-col space-y-2">
        <label htmlFor="desc">Description</label>
        <textarea
          name="dex"
          id="desc"
          cols="30"
          rows="2"
          className="input resize-none"
          placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.
      "
        >
          {" "}
        </textarea>
      </div>
    </div>
  );
}

export default Stage1;
