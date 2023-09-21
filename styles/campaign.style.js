import styled from "styled-components";
import { breakpoints, colors } from "./theme";

export const Container = styled.div`
    background: #fff;
    padding: 110px 20px 30px 20px;
    min-height: 100vh;
`;
export const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    h2 {
        color: ${colors.textColor};
        font-size: 24px;
        font-weight: 600; 
    }
    button {
        outline: none;
        border: none;
        display: flex;
        column-gap: 12px;
        align-items: center;
        padding: 10px 16px;
        background: #fff;
        border-radius: 8px;
        border: 1px solid #D0D5DD;
        select {
            width: 100px;
            outline: none;
            border: none;
            background: transparent;
        }
    }
    ${breakpoints.md} {
        h2 {
            font-size: 18px;
        }
    }
`;
export const CampaignList = styled.div`
    padding: 10px 0px;
    display: flex;
    column-gap: 25px;
    row-gap: 30px;
    flex-wrap: wrap;
`;
export const RequestCard = styled.div`
    cursor: pointer;
    height: auto;
    min-height: 335px;
    width: 250px;
    border: 1px dashed #2A29391A;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    :hover {
        box-shadow: 0px 16px 24px 0px #2A29391A;
    }
    p {
        color: #000;
        font-size: 16px;
        font-weight: 500;
        margin-top: 10px;
    }
    ${breakpoints.md} {
        margin: 0 auto;
    }
`;
