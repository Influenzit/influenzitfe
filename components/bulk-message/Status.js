import {WelcomeModal} from "../../styles/connect-pages.style";
import Image from "next/image";
import cancel from "../../assets/close.svg";

export const Status = ({handleClose, message,err,errorMesage}) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black/30 z-[9999999] flex justify-center items-center">
                <div className="bg-white  h-[300px] w-[450px] relative p-4 rounded-lg overflow-hidden">
                    {/*<button*/}
                    {/*    onClick={handleClose}*/}
                    {/*    className="outline-none absolute right-0 top-2"*/}
                    {/*>*/}
                    {/*    <Image src={cancel} alt="cancel" height={20}/>*/}
                    {/*</button>*/}
                    <div className={"h-full flex justify-center flex-col items-center"}>
                        {!err&&<h2 className="text-center font-semibold text-2xl text-primary-100 ">{message}</h2>}
                        {err && <h2 className="text-center font-semibold text-2xl text-primary-100 ">{errorMessage}</h2>}
                        <button onClick={handleClose} className="bg-primary-100 px-2 py-2 mt-10 rounded-lg text-white"> close modal</button>

                    </div>

                </div>

            </div>

        </div>
    )
}