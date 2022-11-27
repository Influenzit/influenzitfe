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
    background: url("/bg.png");
    background-size: cover;
    background-position: center;
`;
export const Center = styled.div`
    padding: 15px 45px;
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
    ${breakpoints.md} {
        padding: 15px;
    }
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
    max-width: 500px;
    min-width: 320px;
    ${breakpoints.lg}{
        width: 80%;
    }
`;
export const FormHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #D2D2D2;
    height: 60px;
    h2 {
        font-weight: 500;
        font-size: 22px;
        color: #111;
    }
`;
export const FormFields = styled.form`
    display: block;
    width: 100%;
    padding:20px 0;
    
`;
export const InputContainer = styled.div`
    position: relative;
    height: 45px;
    border: 1px solid #D2D2D2;
    border-radius: 3px;
    margin-bottom: 15px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    ${(props) => props.hasContent ? activeLabel: inActiveLabel}
    :focus-within {
        ${activeLabel}
    }
    select {
        border: none;
        height: 100%;
        width: 100%;
        outline: none;
        padding-left: 17px;
        z-index: 1;
        background: transparent;
    }
`;
export const SubmitButton = styled.button`
    padding: 12px 0;
    width: 100%;
    color: #fff;
    background: ${colors.primaryColor};
    border-radius: 3px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    font-weight: 500;
`;
export const Input = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    outline: none;
    padding-left: 17px;
    z-index: 1;
    background: transparent;
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
    margin: 20px 0;
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
    background: #3B5998;
    color: white;
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
    position: absolute;
    left: 35px;
    ${breakpoints.md} {
        left: 15px;
    }
`;
export const GoogleBtn = styled.button`
    width: 100%;
    border: none;
    background: #fff;
    color: #111;
    box-shadow: 0px 0px 15px 0px #0000001A;
    border: 1px solid #D2D2D2;
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
    border-top: 1px solid #D2D2D2;
    height: 60px;
    a {
        color: ${colors.primaryColor}
    }
    ${breakpoints.md} {
        font-size: 14px;
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
    border: 3px dashed ${colors.primaryColor};
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
