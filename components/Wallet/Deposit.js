import React from "react";
import Loader from "../UI/Loader";
import Image from "next/image";
import cancel from "assets/close.svg";

function Deposit({
  setisOpen,
  isOpen,
  setAmount,
  amount,
  loading,
  handleContinue,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
      <div className="bg-white w-[500px]  p-6 rounded-lg overflow-hidden">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl">Fund your wallet</h1>

          <button
            onClick={() => {
              setisOpen(!isOpen);
            }}
            className="outline-none"
          >
            <Image src={cancel} alt="cancel" className="h-2 w-2" />
          </button>
        </div>
        <input
          type="number"
          placeholder="NGN 20,000"
          className="p-2 mt-4 border outline-none rounded-md w-full"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleContinue();
            }
          }}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              handleContinue();
            }}
            className="bg-primary-100 py-2 px-4 rounded-lg text-white flex items-center space-x-2 "
          >
            {loading ? <Loader /> : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
