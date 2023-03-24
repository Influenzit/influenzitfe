//=========================== TAILWIND STYLES APPLIED HERE =========================
import rightarrow from "../../assets/rightarrow.svg";

import React from "react";
import Image from "next/image";

function Faq({
  handleIncrement,
  handleDecrement,
  handleAddFaq,
  handleRemoveFaq,
  faqs,
  handleFaqinput,
  handleFaqCreation

}) {
  console.log(faqs);
  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Frequently Asked Questions</h1>
      <div className="content mb-6">
        <h1 className=" font-medium"> Collect information to get started</h1>
        <p className="text-tert-100 my-1">
          Add questions to help buyers provide you with exactly what you need to
          start working on their order.
        </p>
      </div>
      {faqs.length > 0 && (
        <div className="space-y-4">
          {faqs.map((x, id) => (
            <div key={id}>
              <div>
                <label htmlFor="title" className="text-[#344054] mb-1">
                  Question
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Who is Krystal Beauty"
                  className="p-2 border outline-none rounded-md w-full"
                  name="question"
                  onChange={(e) => {
                    handleFaqinput(e, id);
                  }}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="title" className="text-[#344054] mb-1">
                  Answer
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Krystal Beauty"
                  className="p-2 border outline-none rounded-md w-full"
                  name="answer"
                  onChange={(e) => {
                    handleFaqinput(e, id);
                  }}
                />
              </div>
              {id !== 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleRemoveFaq(id);
                    }}
                    className=" py-2 px-4 rounded-lg text-primary-100 flex items-center space-x-2 text-xs"
                  >
                    <span className="mr-2  text-red-500">- Remove FAQ</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddFaq}
        className=" py-2 px-4 rounded-lg text-primary-100 flex items-center space-x-2 "
      >
        <span className="mr-2  text-red-500">+ Add a FAQ</span>
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
          onClick={handleFaqCreation}
          className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
        >
          <span className="mr-2">Continue</span>
          <Image src={rightarrow} alt="rightarrow" className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Faq;
