import styled from "styled-components";
import { breakpoints, colors } from "./theme";

export const WelcomeHeading = styled.h2`
    font-weight: 600;
    font-size: 24px;
    padding-bottom: 10px;
    color: ${colors.textColor};
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

`;
export const EmptyList = styled.div`
`;
