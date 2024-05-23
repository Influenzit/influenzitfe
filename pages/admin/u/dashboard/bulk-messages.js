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
import { useMutation } from "@tanstack/react-query";
import { sendBulkMessages } from "../../../../api/admin";
import CustomTextEditor from "../../../../components/bulk-message/Editor";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useCustomEditor from "../../../../hooks/custom-editor";
const BulkMessage = () => {
  const editor = useCustomEditor();
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
  const [messageStatus,setMessageStatus]=useState("");
  const [statusModal,setStatusModal]=useState(false);
  const statusModalHandler=()=>setStatusModal(!statusModal);
  const { mutate, isLoading, isSuccess, isError, error,status } = useMutation(
    (data) => {
      sendBulkMessages(data);
    },
      {
onSuccess(e){
  setMessageStatus(e)
}
      }

  );
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
  const submitHandler = (e) => {
    e.preventDefault();
    if (subject && editor && selectedUsers.length > 0) {

      mutate({
        subject,
        message: editor.getHTML(),
        emails: selectedUsers,
      },{
        onSuccess(e){
          console.log(e)
          setMessageStatus("Email sent successfully");
          console.log('successfully fired')
        }
      });
      console.log(messageStatus)
      console.log(status);
      statusModalHandler();
    }
    // setModal(!modal);
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
          submitHandler={submitHandler}
          loading={isLoading}
          success={isSuccess}
          err={isError}
          errorMessage={error}
          messageStatus={messageStatus}
          statusModal={statusModal}
          handleModalStatus={statusModalHandler}
        />
      )}

      <Container>
        <Center className="flex justify-center items-center w-full">
          <FormWrapper>
            <h2 className="text-2xl font-bold">Send Bulk Messages</h2>
            <FormFields onSubmit={submitHandler}>
              <InputContainer hasContent={subject}>
                <label>Subject</label>
                <Input
                  type="text"
                  value={subject}
                  onChange={handleSubject}
                  required
                />
              </InputContainer>
              {/* <InputContainer className="flex-col items-start">
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
              </InputContainer> */}
              <label className="mb-4 font-semibold">Message</label>
              <CustomTextEditor editor={editor} />

              <div
                role="button"
                onClick={handleClose}
                className="float-right mt-2 bg-primary-100 cursor-pointer rounded-lg px-4 py-2 text-white font-semibold"
              >
                Select recipients
              </div>

              {/* <button
                type="button"
                className="text-lg font-semibold"
                onClick={handleClose}
              >
                Select recipients
              </button> */}
            </FormFields>
          </FormWrapper>
        </Center>{" "}
      </Container>
    </>
  );
};
BulkMessage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default BulkMessage;
