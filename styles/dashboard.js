import styled from "styled-components";
import { colors } from "./theme";

export const WelcomeHeading = styled.h2`
    font-size: 26px;
    padding-bottom: 10px;
    color: #333;
    text-transform: capitalize;
    span {
        color: ${colors.primaryColor}
    }
`;
export const CardsWrapper = styled.div`
    display: flex;
    column-gap: 15px;
    padding: 15px 0;
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
