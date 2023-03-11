import React, { useState } from "react";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import cancel from "./../../assets/close.svg";
import Image from "next/image";

function RejectModal({ handleClose }) {
  const [step, setstep] = useState(1);
  return (
    <div>
      <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
        <div className="bg-white w-[500px]  p-6 rounded-lg overflow-hidden">
          <div className="flex justify-between mb-6">
            <h1 className="text-xl">Reason for rejection</h1>

            <button
              onClick={() => {
                handleClose;
              }}
              className="outline-none"
            >
              <Image src={cancel} alt="cancel" height={20}  />
            </button>
          </div>

          <div className="border rounded-lg my-5">
            <textarea
              name="chatbox"
              id="chatbox"
              rows="5"
              className="resize-none text-sm w-full h-full rounded-lg  outline-none bg-transparent p-2"
              placeholder="Write your message"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="bg-primary-100 py-2 px-4 rounded-lg text-white">
              Next{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RejectModal;
