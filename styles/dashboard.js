import styled from "styled-components";
import { breakpoints, colors } from "./theme";

export const WelcomeHeading = styled.h2`
    font-weight: 600;
    font-size: 24px;
    padding-bottom: 3px;
    color: ${colors.textColor};
`;
export const ReferralCode = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
    font-size: 15px;
    color: ${colors.textColor};
    margin-bottom: 20px;
    span {
        font-weight: 600;
        color: ${colors.primaryColor};
    }
    button {
        outline: none;
        background: transparent;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        background: #FCEDEF;
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 600;
        color: ${colors.textColor};
    }
`;
export const BizCard = styled.div`
    background: #FFFFFF;
    padding: 24px;
    border: 1px solid #EAEAEB;
    border-radius: 16px;
    h3 {
        font-weight: 600;
        font-size: 18px;
        color: ${colors.textColor};
    }
    p {
        color: #555461;
        font-size: 14px;
        margin: 20px 0;
    }
    a {
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        padding: 12px 20px;
        cursor: pointer;
        display: inline-block;
    }
`;
export const CardsWrapper = styled.div`
    display: flex;
    column-gap: 15px;
    padding: 15px 0;
    ${breakpoints.lg}{
        flex-direction: column;
        row-gap: 10px;
    }
`;
export const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
    padding: 15px 0;
`;
export const Card = styled.div`
    height: 130px;
    border-radius: 8px;
    box-shadow:  0 0 3px #eee;
    flex: 1;
    background: white;
    color: #555;
    padding: 18px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    svg {
        position: absolute;
        top: 18px;
        right: 18px;
        color: ${colors.primaryColor};
    }
    h1 {
        color: ${colors.primaryColor};
    }
`;
export const ListingWrapper = styled.div`
    padding: 24px 0;
    #h3 {
        padding-bottom: 20px;
        font-weight: 600;
        font-size: 20px;
        color: #000;
    }
`;
export const EmptyList = styled.div`
`;
export const EmptyCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    padding: 24px;
    border: 1px solid #EAEAEB;
    border-radius: 16px;
    row-gap: 15px;
    h3 {
        font-weight: 600;
        font-size: 18px;
        color: ${colors.textColor};
    }
    a {
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        padding: 12px 20px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        column-gap: 5px;
    }
`;
export const AEmptyCard = styled.div`
    display: flex;
    align-items: center;
    background:linear-gradient(125.93deg, #F0C3C9 0%, #FDF8F1 90.11%);
    padding: 24px;
    border: 1px solid #EAEAEB;
    justify-content: space-between;
    border-radius: 16px;
    row-gap: 15px;
    h2 {
        font-weight: 600;
        font-size: 30px;
        color: ${colors.textColor};
    }
    p {
        color: #555461;
        line-height: 24px;
        margin-bottom: 30px;
        max-width: 500px;
    }
    a {
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        padding: 12px 20px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        column-gap: 5px;
    }
`;
export const List = styled.div`
`;
export const ProjectCard = styled.div`
    background: #FFFFFF;
    padding: 20px;
    border: 1px solid #EAEAEB;
    border-radius: 16px;
    display: flex;
    margin-bottom: 10px;
`;
export const  ProjectDetails = styled.div`
    display: flex;
    column-gap: 15px;
    border-right: 1px solid rgba(42, 41, 57, 0.1);
    width: 100%;
    align-items: center;
    #img {
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 8px;
        overflow: hidden;
    }
    h4 {
        color: ${colors.textColor};
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.03em;
        line-height: 120%;
        padding-bottom: 8px;
    }
    p {
        color: #555461;
        font-size: 14px;
        line-height: 150%;
    }
`;
export const UserMiniCard = styled.div`
    display: flex;
    min-width: 280px;
    padding: 0 20px;
    align-items: center;
    column-gap: 15px;
    border-right: 1px solid rgba(42, 41, 57, 0.1);
    #pic {
        position: relative;
        overflow: hidden;
        width: 70px;
        height: 70px;
        border-radius: 8px;
    }
    #social {
        padding: 5px 0;
        display: flex;
        column-gap: 5px;
    }
    #star {
        padding:2px 0;
        display: flex;
        column-gap: 2px;
        font-size: 9px;
        color: ${colors.textColor};
    }
    h4 {
        color: ${colors.textColor};
        font-weight: 600;
        font-size: 16px;
    }
    h4 + p {
        font-size: 10px;
        color: rgba(31, 32, 36, 0.5);
        font-weight: 500;
    }
`;
export const Status = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    h3 {
        font-weight: 600;
        font-size: 12px;
        line-height: 120%;
        letter-spacing: 0.03em;
    }
    div {
        display: flex;
        column-gap: 7px;
        align-items: center;
        font-size: 14px;
        color: ${({inProgress}) => inProgress ? "#93370D": "green"};
        span {
            width: 6px;
            height: 6px;
            background: ${({inProgress}) => inProgress ? "#F79009": "green"};
            border-radius: 50%;
        }
    }
`;
