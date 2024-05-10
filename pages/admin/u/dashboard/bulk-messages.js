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
import { useState } from "react";
const BulkMessage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleSend = () => {
    console.log(subject, message);
  };
  return (
    <Container>
      <Wrapper>
        <FormWrapper>
          <FormHeader>
            <h2>Send Bulk Messages</h2>
          </FormHeader>
          <Center>
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
              <InputContainer
                style={{ flexDirection: "column", alignItems: "start" }}
              >
                <label>Message</label>
                <textarea
                  placeholder="Enter Message..."
                  value={message}
                  onInput={(e) => setMessage(e.target.value)}
                ></textarea>
              </InputContainer>
            </FormFields>
          </Center>
        </FormWrapper>
      </Wrapper>
    </Container>
  );
};
BulkMessage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default BulkMessage;
