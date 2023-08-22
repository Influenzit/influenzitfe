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
    :hover {
        box-shadow: 0px 16px 24px 0px #2A29391A;
    }
    ${breakpoints.md} {
        margin: 0 auto;
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
        text-align: left;
    }
`;
export const Stats = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        display: flex;
        column-gap: 5px;
    }
    button {
        background: transparent;
        outline: none;
        border: none;
        cursor: pointer;
    }
`;
export const PriceSection = styled.p`
   font-size: 14px;
   color: ${colors.textColor};
   font-weight: 600; 
`;
export const StatusCapsule = styled.span`
    display: flex;
    padding: 8px 20px;
    color: #fff;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 99;
    border-radius: 8px; 
    font-size: 14px;
    font-weight: 500;
    ${({ toShow }) => toShow === "Completed" ? "background: #27C281;" : ""}
    ${({ toShow }) => toShow === "Ongoing" ? "background: #F79009;" : ""}
    ${({ toShow }) => toShow === "Pending" ? "background: #F79009;" : ""}
    ${({ toShow }) => toShow === "Open" ? "background: #DF475C;" : ""}
    ${({ toShow }) => toShow === "Paused" ? "background: #94949C;" : ""}
`;
export const Popup = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 200px; 
    border-radius: 8px;
    overflow: hidden;
    z-index: 9999;
    button {
        padding: 10px 16px;
        background: transparent;
        cursor: pointer;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 500;
        color: ${colors.textColor};
        &:hover {
            background: #2A29390D;
            color: ${colors.primaryColor};
        }
    }
`;
