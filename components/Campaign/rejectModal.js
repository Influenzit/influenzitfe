import React, { useState } from "react";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import cancel from "./../../assets/close.svg";
import attachment from "./../../assets/campaign/attachment.svg";
import Image from "next/image";

function RejectModal({ handleClose, file, setFile, message, setMessage  }) {

  return (
    <div>
      <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
        <div className="bg-white w-[500px]  p-6 rounded-lg overflow-hidden">
          <div className="flex justify-between mb-6">
            <h1 className="text-xl">Reason for rejection</h1>

            <button onClick={handleClose} className="outline-none">
              <Image src={cancel} alt="cancel" height={20} />
            </button>
          </div>

          <div className="border rounded-lg my-5">
            <textarea
              name="chatbox"
              id="chatbox"
              rows="5"
              value={message}
              className="resize-none text-sm w-full h-full rounded-lg  outline-none bg-transparent p-2"
              placeholder="Write your message"
              onInput={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <input
            type="file"
            id="file"
            onChange={(e) => {
                console.log(e.target.files);
              setFile(e.target.files[0]);
            }}
            hidden
            accept=".jpg, .png, .jpeg"
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-[#EAEAEB] py-2 px-4 rounded-lg text-black mt-4 flex w-max items-center text-sm space-x-2"
          >
            <Image src={attachment} alt="attachment" className="" />
            <span className="">Attach Files</span>
          </label>

          {file && (
            <div className="bg-[#F9FAFB] border rounded-lg border-dashed p-4 my-4">
              <div className="flex justify-between ">
                <h1> {file?.name} </h1>
                <button
                  onClick={() => {
                    setFile(null);
                  }}
                  className="outline-none"
                >
                  <Image src={cancel} alt="cancel" height={20} />
                </button>
              </div>
            </div>
          )}

          <div onClick={handleClose} className="flex justify-end">
            <button className="bg-primary-100 py-2 px-4 rounded-lg text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RejectModal;
