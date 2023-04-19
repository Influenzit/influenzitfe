import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";
import Link from "next/link";

export const Container = styled.div`
    background: #F7FAFC;
    padding: 20px 0;
    padding-right: 3vw;
    min-height: calc(100vh - 140px);
    position: relative;
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    display: flex;
    ${breakpoints.md}{
        margin-top: 35px;
    }
`;
export const Content =  styled.div`
    margin-left: 20px;
    width: 100%;
    height: auto;
    background: #fff;
    border: 1px solid #D2D2D2;
    border-radius: 5px;
    padding-bottom: 20px;
    ${breakpoints.md}{
        margin-left: 0;
        max-width: 100%;
    }
`;
export const CContent =  styled.div`
    width: 100%;
    height: auto;
    background: #fff;
    border: 1px solid #D2D2D2;
    border-radius: 5px;
    padding-bottom: 20px;
`;
export const AvailableSwitch = styled.div`
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    p {
        font-weight: 600;
        color: #B3B3B3;
        :last-of-type {
            color: ${colors.primaryColor};
        }
    }
    button {
        height: 17px;
        border-radius: 12px;
        cursor: pointer;
        width: 30px;
        border: none;
        background: ${(props) => props.isAvailable ? colors.primaryColor : "#B3B3B3"} ;
        display: flex;
        align-items: center;
        justify-content: ${(props) => props.isAvailable ? "right" : "left"};
        padding: 2px;
        ::after{
            content: "";
            display: block;
            height: 13px;
            width: 13px;
            background: #fff;
            border-radius: 50%;
        }
    }
`;
export const Heading = styled.div`
    padding: 20px 80px;
    display: flex;
    justify-content: space-between;
    h2 {
        font-size: 18px;
        color: #111;
    }
    border-bottom: 1px solid #D2D2D2;
    ${breakpoints.lg}{
        padding: 10px 5px;
        h2 {
            font-size: 15px;
            color: #111;
        }
    }
`;
export const FormContainer = styled.div`
    padding: 15px 80px;
    width: 100%;
    max-width: 100%;
    ${breakpoints.md}{
        padding: 0px 10px;
    }
`;
export const FormContainerM = styled.div`
    padding: 20px 80px;
    ${breakpoints.md}{
        padding: 0px 10px;
    }
`;
export const List = styled.div`
    display: flex;
    align-items: center;
`;
export const ListB = styled.div`
`;
export const InputFlex = styled.div`
    display: flex;
    column-gap: 15px;
    width: 100%;
    ${breakpoints.lg}{
        flex-direction: column;
    }
`;
export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 15px;
    input, select {
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
        font-size: 15px;
    }
    label {
        font-size: 14px;
        padding-bottom: 10px;
        color: #111;
    }
    ${breakpoints.lg}{
        label {
            font-size: 13px;
        }
    }
`;
export const Bottom = styled.div`
    padding: 20px 80px;
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
    ${breakpoints.md}{
        button {  
            font-size: 13px;
            padding: 10px;
        }
    }
`;
export const BottomAdd = styled.div`
    padding: 3px 0px;
    display: flex;
    justify-content: right;
    button {
        color: ${colors.primaryColor};
        background: #F5F8FA;
        border: 2px solid #F5F8FA;
        padding: 10px 25px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 3px;
    }
    ${breakpoints.md}{
        button {  
            font-size: 13px;
            padding: 10px;
        }
    }
`;
export const CreateContainer = styled.div`
    padding: 20px 30px;
    ${breakpoints.md}{
        padding: 20px 10px;
    }
`;
export const ListContainer = styled.div`
    padding: 20px 80px;
    h4 {
        color: #444;
        text-align: center;
    }
    ${breakpoints.md}{
        padding: 20px 10px;
    }
`;
export const DeleteBtn = styled.button`
    padding: 10px;
    background: white;
    border: none;
    padding-top: 14px;
    font-size: 24px;
    color: #dc143ca3;
    font-weight: 500;
    cursor: pointer;
    height: 40px;
    display: inline-flex;
    margin: 10px 0;
`;
export const CurrentToggle = styled.div`
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
    ${breakpoints.md}{
        font-size: 13px;
    }
`;

export const ControlFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px;
`;
export const Control = styled.div`
     display: flex;
     column-gap: 10px;
     button {
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 10px 18px;
     }
     button:last-child {
        color: ${colors.primaryColor};
        background: #F5F8FA;
        border: 2px solid #F5F8FA;
        padding: 10px 25px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 3px;
    }
    ${breakpoints.md}{
        button {  
            font-size: 13px;
            padding: 10px 5px;
        }
        button:last-child {  
            font-size: 13px;
            padding: 10px 5px;
        }
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
    ${breakpoints.lg}{
        flex-direction: column;
    }
`;
export const Left = styled.div`
    width: 50%;
    max-width: 50%;
    ${breakpoints.lg}{
        width: 100%;
        max-width: 100%;
    }
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
    ${breakpoints.lg}{
        width: 100%;
        max-width: 100%;
        p {
            font-size: 13px;
        }
    }
`;
export const CustomContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    margin-left: 20px;
    ${breakpoints.md}{
        max-width: 100%;
    }
`;
export const WalletCardWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    padding: 20px;
    ${breakpoints.lg}{
        flex-direction: column;
        row-gap: 10px;
    }
`;
export const WalletCard = styled.div`
    width: 26%;
    padding: 15px 20px;
    border: 1px solid #D2D2D2;
    border-radius: 3px;
    text-align: center;
    p {
        color: ${colors.primaryColor};
    }
    h3 {
        font-size: 20px;
        color: #111;
        font-weight: 600;
    }
    ${breakpoints.lg}{
        width: 100%;
    }
`;
export const FundBtn = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    row-gap: 5px;
    width: calc(22% - 30px);
    border: none;
    background: ${colors.primaryColor};
    color: white;
    border-radius: 3px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    ${breakpoints.lg}{
        width: 100%;
    }
`;
export const CAmount = styled.span`
    color: ${(props) => props.status === "pending"? "#edb000" : props.status === "failed"? "red" : "#14a800"};
`;
export const ServiceList = styled.div`
    padding: 20px 30px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 5px;
    row-gap: 15px;
    justify-content: space-between;
    margin: 0 auto;
`;
export const AddServiceBtn = styled.button`
    width: 100%;
    max-width: 285px;
    min-width: 240px;
    display: flex;
    background: ${colors.primaryColor};
    color: white;
    border: none;
    border-radius: 3px;
    align-items: center;
    min-height: 300px;
    justify-content: center;
    flex-direction: column;
    row-gap: 15px;
    cursor: pointer;
    span {
        font-size: 16px;
        font-weight: 700;
        :first-of-type {
            display: flex;
            background: white;
            color: ${colors.primaryColor};
            padding: 20px;
            border-radius: 50%;
            svg {
                height: 50px;
                width: 50px;
            }
        }
    }
    ${breakpoints.md}{
        margin: 0 auto;
    }
`;
export const FaqCont = styled.div`
    button {
        background: transparent;
        border: none;
    }
    h3 {
        font-size: 16px;
        color: #111;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        column-gap: 15px;
    }
`;
export const SmallHeader = styled.p`
    font-weight: 600;
    font-size: 14px;
    color: #111;
`;
export const UploadContainer = styled.div`
    border: 2px dashed #E1E7EC;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 15px;
    button {
        padding: 10px 25px;
        background: ${colors.primaryColor};
        color: #fff;
        border: none;
        margin: 10px 0;
        border-radius: 8px;
        cursor: pointer;
    }
`;
export const UploadHeader = styled.div`
    label {
        cursor: pointer;
        color: ${colors.primaryColor};
        text-decoration: underline;
    }
`;
export const UploadInfo = styled.div`
    font-size: 12px;
    color: #111;
    margin-top: 10px;
`;
export const FileContainer = styled.div`
`;
export const FilePreview = styled.div`
    background: #FCFCFC;
    height: 80px;
    align-items: center;
    margin-top: 10px;
    display: flex;
    border: 1px solid #E1E7EC;
    border-radius: 3px;
    position: relative;
    button {
        position: absolute;
        right: 10px;
        top: 5px;
        background: transparent;
        cursor: pointer;
        border: none;
    }
`;
export const ImgPreview = styled.div`
    margin: 0 15px;
`;
export const PreviewDetails = styled.div`
    p {
        font-weight: 600;
        font-size: 14px;
        color: #111;
    }
    span {
        font-size: 12px;
        color: #111;
    }
`;
export const ProfileImageCont = styled.div`
    margin-bottom: 20px;
    height: 200px;
    width: 200px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
`;
export const ProfilePicWrapper = styled.div`
    width: 200px;
    margin: 20px;
    position: relative;
    button {
        position: absolute;
        right: 22px;
        bottom: 22px;
        background: #fff;
        border: 1px solid #E1E7EC;
        border-radius: 10px;
        padding: 5px 15px;
        cursor: pointer;
    }
`;
export const TopFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;
// export const ConnectButton = styled.div`
//     display: flex;
//     column-gap: 10px;
//     justify-content: center;
//     padding: 7px 0 30px 0;
//     a {
//         font-size: 14px;
//         display: inline-flex;
//         align-items: center;
//         column-gap: 10px;
//         padding: 7px 15px;
//         border-radius: 5px;
//         background: ${colors.primaryColor}11;
//     }
// `;
export const EditLinks = styled.div`
    display: flex;
    column-gap: 15px;
    justify-content: center;
    a {
        color: ${colors.primaryColor};
    }
`;
export const ConnectFlex = styled.div`
    display: flex;
    column-gap: 20px;
    row-gap: 20px;
    margin-top: 30px;
     a , div {
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        column-gap: 10px;
        padding: 7px 15px;
        border-radius: 5px;
        background: #FCEDEF;
    }
    div {
        background: rgba(39, 194, 129, 0.1);
    }
`;
export const SocialMediaContainer = styled.div`
    margin: 30px 0;
    h1 {
        font-size: 22px;
        font-weight: 600;
    }
     a {
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        column-gap: 10px;
        padding: 7px 15px;
        border-radius: 5px;
        background: #FCEDEF;
    }
`;
export const SocialCard = styled.div`
    background: #FFFFFF;
    padding: 20px;
    border: 1px solid #EAEAEB;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    div {
        button {
            outline: none;
            background: transparent;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
        }
        button:first-of-type {
            color: ${colors.textColor};
            background: #FCEDEF;
        }
        button:last-of-type {
            color: #fff;
            background: ${colors.textColor};
            margin-left: 10px;
        }
    }
`;
export const SocialCardList = styled.div`
    margin: 20px 0;
    display: flex;
    row-gap: 10px;
    flex-direction: column;
`;
