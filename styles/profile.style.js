import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    background: #F7FAFC;
    padding: 20px 0;
    min-height: calc(100vh - 140px);
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    display: flex;
`;
export const Content =  styled.div`
    margin-left: 20px;
    width: 100%;
    background: #fff;
    border: 1px solid #D2D2D2;
    border-radius: 5px;
`;
export const Heading = styled.div`
    padding: 20px 30px;
    h2 {
        font-size: 18px;
        color: #111;
    }
    border-bottom: 1px solid #D2D2D2;
`;
export const FormContainer = styled.div`
    padding: 20px 30px;
`;
export const InputFlex = styled.div`
    display: flex;
    column-gap: 15px;
`;
export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 15px;
    input {
        background: #FCFCFC;
        border: 1px solid #E1E7EC;
        border-radius: 3px;
        padding: 0 15px;
        outline: none;
        font-size: 15px;
        height: 40px;
    }
    textarea {
        resize: none;
        background: #FCFCFC;
        border: 1px solid #E1E7EC;
        border-radius: 3px;
        height: 140px;
        padding: 15px;
        outline: none;
    }
    label {
        font-size: 14px;
        padding-bottom: 10px;
        color: #111;
    }
`;
export const Bottom = styled.div`
    padding: 20px 30px;
    border-top: 1px solid #D2D2D2;
    display: flex;
    justify-content: right;
    button {
        background: ${colors.primaryColor};
        color: white;
        padding: 12px 25px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        border-radius: 3px;
    }
`;
export const AddSocialBtn = styled.button`
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    margin: 0 0px 20px 30px;
    align-items: center;
    font-size: 15px;
    span {
        padding-left: 10px;
        color: ${colors.primaryColor};
    }
`;
export const PasswordContainer = styled.div`
    display: flex;
    column-gap: 30px;
    padding: 15px 0;
`;
export const Left = styled.div`
    width: 50%;
    max-width: 50%;
`;
export const Right = styled.div`
    width: 50%;
    max-width: 50%;
    padding: 15px;
    background: #F7FAFC;
    border-radius: 5px;
    h3 {
        font-size: 15px;
        font-weight: 500;
        color: #333;
    }
    .pri {
        svg {
            color: ${colors.primaryColor};
        }
    }
    .red {
        svg {
            color: red;
        }
    }
    p {
        font-size: 14px;
        color: #333;
        padding: 5px 0;
        display: flex;
        align-items: center;
        svg {
            width: 20px;
        }
        span {
            padding-left: 10px;
        }
    }
`;
