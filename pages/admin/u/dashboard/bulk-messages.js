import AdminLayout from "../../../../layouts/admin.layout";
import { Container } from "../../../../styles/connect-pages.style";
import {
  FormFields,
  FormWrapper,
  Wrapper,
  FormHeader,
  Center,
  InputContainer,
  Input,
} from "../../../../styles/auth.style";
import Image from "next/image";
import { useState } from "react";
import { UsersList } from "../../../../components/bulk-message/UsersList";
const BulkMessage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [imgSrc, setImgSrc] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [imgMessage, setImgMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectedUsers = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      setSelectedUsers((prev) => {
        return prev.filter((item) => item !== id);
      });
    }
  };
  const handleUsers = (users) => {
    setUsers(users);
  };
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user.user.email));
    } else {
      setSelectedUsers([]);
    }
  };
  const handleClose = () => {
    setModal(!modal);
  };
  const handleSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleSend = () => {
    console.log(subject, message);
  };
  const handleSetFiles = (file) => {
    if (file.size < 5000000) {
      setFileSelected(file);
      setImgSrc((prev) => [...prev, URL.createObjectURL(file)]);
      setImgError(false);
      setImgMessage("");
    } else {
      setImgError(true);
      setImgMessage("Image too large (Image must be less than 5MB)");
    }
  };
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    handleSetFiles(e.target.files[0]);
  };
  const handleImageRemove = (i) => {
    setCoverImages((prev) => {
      let newList = [...prev];
      newList.splice(i, 1);
      return newList;
    });
  };
  return (
    <>
      {modal && (
        <UsersList
          handleClose={handleClose}
          handleSelectedUser={handleSelectedUsers}
          handleUsers={handleUsers}
          users={users}
          selectAll={selectAll}
          selectAllHandler={handleSelectAll}
          selectedUsers={selectedUsers}
        />
      )}

      <Container>
        <Center className="flex justify-center items-center w-full">
          <FormWrapper>
            <h2 className="text-2xl font-bold">Send Bulk Messages</h2>
            <FormFields>
              <InputContainer hasContent={subject}>
                <label>Subject</label>
                <Input
                  type="text"
                  value={subject}
                  onChange={handleSubject}
                  required
                />
              </InputContainer>
              <InputContainer className="flex-col items-start">
                <label>Message</label>
                <div className="relative w-full ">
                  <textarea
                    placeholder="Enter Message..."
                    value={message}
                    className="h-[100px]"
                    onInput={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <label htmlFor="file" className="!mb-0 relative right-0">
                    <input
                      type="file"
                      name="file"
                      multiple
                      className="hidden"
                      id="file"
                      onChange={handleFileChange}
                    />
                    <span className="absolute bottom-0 right-0 mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
                      </svg>
                    </span>
                  </label>
                  <div className=" relative mb-6 ">
                    {imgSrc &&
                      (imgError ? (
                        <p>{imgMessage}</p>
                      ) : (
                        <div className="flex flex-wrap gap-4">
                          {imgSrc.map((img, i) => (
                            <Image
                              src={img}
                              key={i}
                              alt="Message image"
                              width={120}
                              height={120}
                              className="w-[120px] h-[120px] object-contain border-2 !border-[#e5e7eb] !border-solid shadow rounded-lg"
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
              </InputContainer>
              <button
                type="submit"
                className="float-right bg-primary-100 rounded-lg px-4 py-2 text-white font-semibold"
              >
                Next
              </button>
              <button
                type="button"
                className="text-lg font-semibold"
                onClick={handleClose}
              >
                Select recipients
              </button>
            </FormFields>
          </FormWrapper>
        </Center>{" "}
      </Container>
    </>
  );
};
BulkMessage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default BulkMessage;
