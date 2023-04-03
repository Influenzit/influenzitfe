import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

const activeLabel = `
    label {
        position: absolute;
        left: 17px;
        top: -10px;
        transition: .3s ease;
        background: #fff;
        padding: 0 10px;
        font-size: 12px;
        color: ${colors.primaryColor};
        z-index: 10;
    }
`;
const inActiveLabel = `
    label {
        position: absolute;
        left: 17px;
        font: 14px;
        transition: .3s ease;
        color: #11111180;
        z-index: 0;
    }
`;

export const Container = styled.div`
    background: #fff;
    background-size: cover;
    background-position: center;
    padding-top: 50px;
    min-height: calc(100vh - 140px);
`;
export const Center = styled.div`
    padding: 15px 0;
    p {
        color: #333333;
    }
    #cancel {
        display: block;
        text-align: center;
        font-size: 16px;
        color: #333333;
        margin-bottom: 20px;
        font-weight: 500;
    }
    // ${breakpoints.md} {
    //     padding: 15px;
    // }
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    min-height: calc(100vh - 320px);
`;
export const FormWrapper = styled.div`
    background: #fff;
    border-radius: 5px;
    width: 100%;
    max-width: 450px;
    min-width: 320px;
    padding-bottom: 30px;
    ${breakpoints.lg}{
        margin: 0 auto;
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        padding: 10%;
        opacity: 0.95;
    }
    ${breakpoints.sm}{
        padding: 10% 15px;
    }
`;
export const BanReg = styled.div`
    display: flex;
    width: 40%;
`;
export const BannerReg = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    min-width: 40%;
    max-width: 40%;
    background: url("/banner-3.png");
    background-size: cover;
    background-position: right;
    background-repeat: no-repeat;
    display: flex;
    height: 800px;
    z-index: -10;
    ${breakpoints.lg}{
        min-width: 90%;
    }
`;
export const FormHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 60px;
    h2 {
        font-weight: 600;
        font-size: 28px;
        color: #101828;
    }
    p {
        color: #667085;
        margin-top: 10px;
    }
`;
export const FormFields = styled.form`
    display: block;
    width: 100%;
    padding:20px 0;
`;
export const FlexInput = styled.div`
    display: flex;
    column-gap: 10px;
`;
export const InputContainer = styled.div`
    position: relative;
    margin-bottom: 15px;
    min-width: calc(50% - 12px);
    label {
        display: inline-block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #344054;
        font-weight: 500;
    }
    select {
        height: 45px;
        width: 100%;
        outline: none;
        color: #101828;
        padding-left: 17px;
        z-index: 1;
        background: transparent;
        border: 1px solid #D0D5DD;
        border-radius: 8px;
    }
    input {
        color: #101828;
    }
    input::placeholder, textarea::placeholder {
        color: #667085;
    }
    textarea {
        box-shadow: 0px 1px 2px 0px #1018280D;
        border-radius: 8px;
        padding: 10px 14px;
        border: 1px solid #D0D5DD;
        resize: none;
        height: 180px;
        width: 100%;
        outline: none;
        font-size: 14px;
        color: #101828;
    }
    #country {
        font-size: 14px;
    }
    #error {
        font-weight: 500;
        font-size: 12px;
        color: ${colors.primaryColor};
    }
`;
export const SubmitButton = styled.button`
    padding: 12px 0;
    width: 100%;
    margin-top: 18px;
    color: #fff;
    background: ${colors.primaryColor};
    border-radius: 8px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    font-weight: 500;
`;
export const Input = styled.input`
    height: 45px;
    width: 100%;
    outline: none;
    color: #667085;
    padding-left: 17px;
    z-index: 1;
    background: transparent;
    border: 1px solid #D0D5DD;
    font-size: 16px;
    border-radius: 8px;
`;
export const Select = styled.select`
    height: 45px;
    width: 100%;
    outline: none;
    color: #667085;
    padding-left: 17px;
    z-index: 1;
    background: transparent;
    border: 1px solid #D0D5DD;
    font-size: 16px;
    border-radius: 8px;
`;
export const HelpSection = styled.div`
    display: flex;
    justify-content: space-between;
    a {
        color: ${colors.primaryColor};
        font-size: 14px;
    }
`;
export const RememberMe = styled.div`
    display: flex;
    font-size: 14px;
    button {
        background: transparent;
        position: relative;
        width: 24px;
        height: 24px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    span {
        padding-left: 8px;
    }
`;
export const FrameContainer = styled.div`
    position: absolute;
`;
export const CheckContainer = styled.div`
    position: absolute;
    top: -3px;
    left: 9px;
`;
export const OrContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    position: relative;
    height: 40px;
    margin: 10px 0;
    ::before {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: #D2D2D2;
    }
    p {
        display: inline-block;
        background: white;
        padding: 10px;
        z-index: 2;
        position: absolute;
    }
`;
export const SocialLogin = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
`;
export const FacebookBtn = styled.button`
    width: 100%;
    border: none;
    background: #fff;
    color: #344054;
    box-shadow: 0px 1px 2px 0px #1018280D;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    height: 45px;
    margin: 7px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    span {
        font-weight: 500;
        font-size: 16px;
    }
    ${breakpoints.md} {
        font-size: 14px;
    }
`;
export const SocialIcon = styled.div`
    margin-right: 15px;
`;
export const GoogleBtn = styled.button`
    width: 100%;
    border: none;
    background: #fff;
    color: #344054;
    box-shadow: 0px 1px 2px 0px #1018280D;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    height: 45px;
    margin: 7px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    span {
        font-weight: 500;
        font-size: 16px;
    }
    ${breakpoints.md} {
        font-size: 14px;
    }
`;
export const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #667085;
    a {
        color: ${colors.primaryColor};
    }
`;
export const BottomP = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 80px 0 10px 0;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #667085;
    ${breakpoints.md} {
        justify-content: center;
    }
`;
export const UploadContainer = styled.div`
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
    label {
        cursor: pointer;
        display: inline-flex;
        border: 5px;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        background: ${colors.primaryColor};
    }
`;
export const ImagePreview = styled.div`
    /* border: 3px dashed ${colors.primaryColor}; */
    background-color: white;
    border-radius: 10px;
    height: 150px;
    margin: 15px 0;
    padding: 10px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Femi's Version
export const AuthFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;