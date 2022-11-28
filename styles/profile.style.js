import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    background: #F7FAFC;
    padding: 20px 0;
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
    }
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
    padding: 20px 30px;
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
    padding: 15px 30px;
    ${breakpoints.md}{
        padding: 0px 10px;
    }
`;
export const FormContainerM = styled.div`
    padding: 20px 30px;
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
    padding: 20px 30px;
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
    max-width: calc(100% - 310px);
    ${breakpoints.lg}{
        max-width: calc(100% - 100px);
    }
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
    h3 {
        font-size: 16px;
        color: #111;
        padding-bottom: 10px;
    }
`;
