import React from "react";
import { useState } from "react";
import openfaq from "../../assets/openfaq.svg";
import closefaq from "../../assets/closefaq.svg";
import Image from "next/image";

function Accordion({ question, answer }) {
  const [isOpen, setisOpen] = useState();
  return (
    <div className="grid grid-cols-12 gap-4 item-strech border-b py-4">
      <div className="col-span-11">
        <h1> {question} </h1>

        {isOpen && <p className=" text-[#667085] text-xs "> {answer} </p>}
      </div>
      <div className="col-span-1">
        {isOpen ? (
          <button
            onClick={() => {
              setisOpen(!isOpen);
            }}
          >
            <Image src={closefaq} alt={"closefaq"} />
          </button>
        ) : (
          <button
            onClick={() => {
              setisOpen(!isOpen);
            }}
          >
            <Image src={openfaq} alt={"openfaq"} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Accordion;
