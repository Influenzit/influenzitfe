import { useState } from "react";
import Image from "next/image";
import email from "../../assets/profile/email.svg";
import { changePassword } from "../../api/auth";
import { toast } from "react-toastify";
import Loader from "../../components/UI/Loader";

function Stage4({ user }) {
  const [loading, setloading] = useState(false);

  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [new_password_confirmation, setnew_password_confirmation] =
    useState("");

  const handlePasswordChange = () => {
    if (!old_password || !new_password || !new_password_confirmation) {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (new_password.length <= 7) {
      toast.error("Password must be 8 character or above", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (new_password_confirmation !== new_password) {
      toast.error("Passwords not match", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setloading(true);
    const payload = {
      new_password,
      new_password_confirmation,
      old_password,
    };
    changePassword(payload)
      .then((res) => {
        toast.success("Password changed succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res);
        setloading(false);
        setold_password("")
        setnew_password("")
        setnew_password_confirmation("")

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setloading(false);

      });
  };
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            {" "}
            <h1 className="text-lg">Change Password </h1>
            <p className="text-xs text-[#667085]">
              Update your profile details here.
            </p>
          </div>
        </div>

        <div className="py-5 border-b md:grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Current password</h1>
          </div>
          <div className="col-span-6">
            <input
              type="password"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter your current password"
              onChange={(e) => {
                setold_password(e.target.value);
              }}
              value={old_password}
            />
          </div>
        </div>
        <div className="py-5 border-b md:grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">New password</h1>
          </div>
          <div className="col-span-6">
            <input
              type="password"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Enter your current password"
              onChange={(e) => {
                setnew_password(e.target.value);
              }}
              value={new_password}
            />
          </div>
        </div>
        <div className="py-5 border-b md:grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 py-5">
            <h1 className="text-[#344054]">Re-enter password</h1>
          </div>
          <div className="col-span-6">
            <input
              type="password"
              className="px-3 py-2 rounded-lg border  bg-transparent outline-none w-full"
              placeholder="Confirm new password"
              onChange={(e) => {
                setnew_password_confirmation(e.target.value);
              }}
              value={new_password_confirmation}
            />
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          className="px-3 mt-4  py-2 rounded-lg bg-primary-100 text-white text-sm"
        >
          {loading ? <Loader /> : " Change password"}
        </button>
      </div>
    </div>
  );
}

export default Stage4;
