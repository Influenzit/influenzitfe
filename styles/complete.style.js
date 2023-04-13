import { colors } from "./theme";

const { default: styled } = require("styled-components");

export const Container = styled.div`
    position: fixed;
    z-index: 999998;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    overflow-y: scroll;
    background: #fff;
`;
export const ProfileForm = styled.div`
    width: 95%;
    margin: 30px auto;
    max-width: 550px;
    h2 {
        font-weight: 600;
        font-size: 24px;
        color: ${colors.textColor};
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h3 {
        font-size: 18px;
        font-weight: 500;
        color: #101828;
    }
    h4 {
        font-size: 14px;
        color: #344054;
        font-weight: 500;
    }
    p {
        font-size: 14px;
        color: #667085;
    }
`;
export const StepContainer = styled.div`
    height: 4px;
    width: 100%;
    column-gap: 8px;
    display: flex;
    margin: 30px 0;
`;
export const Step = styled.div`
    height: 100%;
    width: calc((100% - 16px)/3);
    border-radius: 10px;
    background: ${({isActive}) => isActive ? colors.primaryColor : "#EAEAEB"};
`
export const ToggleCont = styled.div`
    display: flex;
    column-gap: 20px;
`;
export const ToggleBtn = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    border: 1px solid  ${({isActive}) => isActive ? colors.primaryColor : "#D0D5DD"};
    background: ${({isActive}) => isActive ? "#FCEDEF" : "#FFF"};
    width: 160px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    span {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid  ${({isActive}) => isActive ? colors.primaryColor : "#D0D5DD"};
        display: inline-flex;
        align-items: center;
        justify-content: center;
        ::after {
            content: "";
            display: ${({isActive}) => isActive ? "block" : "none"};
            height: 8px;
            width: 8px;
            background: ${colors.primaryColor};
            border-radius: 50%;

        }
    }
`;
export const StepControl = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        column-gap: 10px;
    }
    #right {
        background: ${colors.primaryColor};
        color: #fff;
    }
    #left {
        background: #EAEAEB;
        color: #555461;
    }
`;
export const CustomInput = styled.div`
    height: 45px;
    min-height: 45px;
    background: #fff;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    div {
        height: 100%;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #D0D5DD;
        font-size: 14px;
        color: #667085;
    }
    input {
        outline: none;
        border: none;
        background: transparent;
        height: 100%;
        width: 100%;
        padding-left: 15px;
        color: #101828;
    }
`;
export const HandleError = styled.div`
    padding: 15px 32px;
    background: #FCEDEF;
    margin-bottom: 20px;
    border: 1px solid ${colors.primaryColor};
    font-weight: 500;
    font-size: 14px;
    color: ${colors.primaryColor};
    border-radius: 8px;
`;
export const ProfileUploadCont = styled.div`
    padding: 20px 0;
    display: flex;
    align-items: flex-end;
    label {
        padding: 12px 20px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        font-weight: 500;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
    }
    div {
        p {
            font-weight: 500;
            font-size: 14px;
            color: ${colors.textColor};
            padding-bottom: 10px;
        }
        div {
            border: 1px dashed #D4D4D7;
            border-radius: 8px;
            position: relative;
            height: 100px;
            width: 100px;
            overflow: hidden;
        }
    }
`;
export const CoverImageContainer = styled.div`
    #head{
        font-weight: 500;
        font-size: 14px;
        padding-bottom: 10px;
        color: ${colors.textColor};
    }
`;
export const UploadContainer = styled.div`
    border: 1px dashed #DF475C;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
`;
export const UploadHeader = styled.p`
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: #555461;
    label {
        color: ${colors.primaryColor};
        cursor: pointer;
    }
`;
export const UploadInfo = styled.p`
    font-weight: 400;
    font-size: 12px !important;
    color: #555461;
`;
export const ImagePreview = styled.div`
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 20px;
    div {
        position: relative;
        height: 250px;
        width: 250px;
        min-width: 250px;
        min-height: 250px;
        border-radius: 8px;
        overflow: hidden;
    }
    button {
        position: absolute;
        top: 5px;
        right: 10px;
        padding: 5px 10px;
        cursor: pointer;
        background: red;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        z-index: 9;
        border-radius: 8px;
    }
`;
