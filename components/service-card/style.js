import styled from "styled-components";
import { breakpoints, colors } from "../../styles/theme";

export const Container = styled.div`
    height: auto;
    width: 250px;
    border: 1px solid #2A29391A;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    p {
        font-size: 14px;
        color:#555461;
    }
    cursor: pointer;
    button {
        border: none;
        outline: none;
        background: transparent;
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 999;
    }
    :hover {
        box-shadow: 0px 16px 24px 0px #2A29391A;
    }
    ${breakpoints.md} {
        margin: 0 auto;
    }
`;
export const SocialHandle = styled.div`
    font-size: 14px;
    padding: 5px 0;
    span {
        padding-left: 10px;
    }
    a {
        display: inline-flex;
        align-items: center;
    }
`;
export const Controls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    a {
        background: ${colors.primaryColor};
        color: #fff;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        padding: 5px 15px;
        margin-right: 10px;
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
    }
    button {
        background: #F6F6F6;
        border-radius: 2px;
        border: none;
        padding: 6px;
        cursor: pointer;
    }
`;
export const TopImg = styled.div`
    height: 50%; 
    min-height: 210px;
    width: 100%;
    position: relative;
`;
export const CreatorDetails = styled.div`
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    h4 {
        font-size: 14px;
        font-weight: 600;
        color: #2A2939;
        padding: 10px 0 4px 0;
    }
    p {
        color: #1F2024;
        font-size: 14px;
        padding-top: 5px;
    }
`;
export const Stats = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        display: flex;
        column-gap: 5px;
    }
    span {
        font-size: 14px;
        font-weight: 600;
        color: #2A2939;
    }
`;
export const UserSection = styled.div`
    display: flex;
    column-gap: 5px;
    padding: 5px 0;
    align-items: center;
    div {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
    }
    p {
        font-size: 12px;
        color: #2A293980;
    }
`;
