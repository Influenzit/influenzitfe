import styled from "styled-components";
import { colors, sizes } from "./theme";

export const OuterContainer = styled.div`
    background: #F7FAFC;
    padding: 30px 0;
`;
export const Wrapper = styled.div`
    max-width: ${sizes.wrapperWidth};
    width: 98%;
    margin: 0 auto;
`;
export const Container = styled.div`
    background: #fff;
    border-radius: 5px;
`;
export const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid #D2D2D2;
    #drop-cont {
        position: relative;
    }
`;
export const TopBtn = styled.button`
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #111;
    font-weight: 500;
    span {
        padding-left: 10px;
    }
    cursor: pointer;
    #context-menu {
        border-radius: 50%;
        padding: 4px;
        background: #F6F6F6;
    }
`;
export const Bottom = styled.div`
    padding: 15px 20px;
`;
export const DetailsContainer = styled.div`
    display: flex;
    align-items: center;
`;
export const Details = styled.div`
    padding-left: 20px;
`;
export const ImageWrapper = styled.div`
    position: relative;
    height: 200px;
    width: 200px;
    min-width: 200px;
`;
export const SubDetails = styled.div`
    display: flex;
    padding: 8px 0;
    column-gap: 20px;
    div {
        display: flex;
        align-items: center;
        span {
            padding-left: 10px;
        }
    }
`;
export const CurrentPackage = styled.div`
    padding: 8px 0;
    font-weight: 600;
    p {
        color: #111;
        display: flex;
        align-items: center;
    }
    span {
        color: ${colors.primaryColor};
        font-size: 18px;
        padding: 0 10px;
        cursor: pointer;
    }
`;
export const Desc = styled.p`
    color: #333;
    font-size: 15px;
`;
export const Milestones = styled.div`
    padding: 20px 0;
    h2 {
        padding: 15px 0;
        font-weight: 600;
        font-size: 22px;
        border-bottom: 1px solid #d2d2d2;
    }
    button {
        margin: 20px auto;
    }
`;
export const MilestoneList = styled.div`
    border: 1px solid #D2D2D2;
    border-radius: 5px;
`;
export const MilestoneHeader = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #D2D2D2;
    font-weight: 600;
    padding: 0 10px;
`;
export const MDetails = styled.p`
    width: 100%;
    min-width: 100px;
    padding: 11px 5px;
`;
export const MStatus = styled.p`
    width: 100px;
    min-width: 100px;
    min-width: 100px;
    padding: 11px 5px;
`;
export const MDone = styled.p`
    width: 100px;
    min-width: 100px;
    padding: 11px 5px;
    button {
        border: none;
        background: transparent;
        display: flex;
        margin: 0 auto;
        cursor: pointer;
    }
`;
export const Milestone = styled.div`
    display: flex;
    padding: 0 10px;
    border-bottom: 1px solid #D2D2D2;
    :last-of-type {
        border-bottom: none;
    }
`;
export const ControlContainer = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        padding: 12px 20px;
        color: red;
        background: transparent;
        font-size: 15px;
        cursor: pointer;
        font-weight: 500;
        :last-of-type {
            background: ${colors.primaryColor};
            color: #fff;
            border-radius: 3px;
            span {
                padding-right: 10px;
            }
        }
    }
`;
export const UpdateModal = styled.div`
    height: 100%;
    width: 100%;
    z-index: 1000000;
    background: rgba(0,0,0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const FormContainer = styled.div`
    background: #fff;
    width: 50%;
    max-width: 420px;
    min-width: 300px;
    padding: 20px 25px;
    border-radius: 10px;
    max-height: 90vh;
    overflow-y: scroll;
    h3 {
        color: #111;
        text-align: center;
        padding-bottom: 20px;
    }
    button {
        border: none;
        padding: 12px 20px;
        color: red;
        background: transparent;
        font-size: 15px;
        cursor: pointer;
        font-weight: 500;
        background: ${colors.primaryColor};
        color: #fff;
        border-radius: 3px;
        display: block;
        margin: 0 auto;
        :first-of-type {
            color: ${colors.primaryColor};
            background: transparent;
        }
        span {
            padding-right: 10px;
        }
    }
`;
export const ShareContainer = styled.div`
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px;
    width: 90%;
    max-width: 600px;
    div:first-of-type {
        display: flex;
        justify-content: space-between;
        column-gap: 10px;
        h1 {
            color: #2A2939;
            font-weight: 600;
            font-size: 24px;
        }
    }
    p {
        font-size: 14px;
        color: #555461;
    }
    #link-container {
        border: 1px solid #D0D5DD;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        display: flex;
        padding: 10px 14px;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        input {
            background: transparent;
            height: 100%;
            border: none;
            outline: none;
            width: 100%;
        }
        button {
            outline: none;
            background: transparent;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            background: ${({lCopied}) => lCopied ? "rgba(39, 194, 129, 0.1)" : "#FCEDEF"};
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 400;
            color: ${colors.textColor};
        }
    }
`;
