import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.section`
`;
export const Wrapper = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    h1 {
        font-size: 40px;
    }
    p {
        width: 80%;
        max-width: 600px;
        min-width: 300px;
        font-size: 18px;
        padding: 15px 0;
        text-align: center;
    }
    a {
        padding: 5px 0;
        color: ${colors.primaryColor};
    }
    h3 {
        font-size: 25px;
        color: #333;
        margin-bottom: 20px;
        margin-top: 40px;
    }
`;
export const SocialLinks = styled.div`
    width: 80%;
    max-width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    img {
        cursor: pointer;
    }
`;
export const FormContainer = styled.form`
    padding: 40px;
    width: 100%;
    max-width: 600px;
    border: 1px solid #444;
    button {
        padding: 12px 30px;
        color: #fff;
        background: ${colors.primaryColor};
        display: inline-flex;
        margin: 20px 0;
        width: fit-content;
        border-radius: 5px;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
        cursor: pointer;
    }
`;
export const InputSection = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
`;
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    label {
        font-size: 14px;
        padding-bottom: 7px;
        color: #333;
    }
    input {
        height: 45px;
        width: 100%;
        background: white;
        border: 1px solid #333;
        outline: none;
        padding: 0 10px;
    }
`;
export const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-size: 14px;
        padding-bottom: 7px;
        color: #333;
    }
    textarea {
        width: 100%;
        height: 200px;
        resize: none;
        outline: none;
        padding: 10px;
        border: 1px solid #333;
    }
`;
