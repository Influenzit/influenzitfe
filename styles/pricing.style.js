import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Outlilnes = styled.div`
    display: flex;
    column-gap: 50px;
    margin: 20px 0;
`;
export const Outline = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    span {
        font-weight: 600;
        font-size: 17px;
        color: ${colors.textColor};
    }
`;
export const BillRate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    width: 300px;
    margin: 20px 0;
    p {
        font-weight: 500;
        font-size: 14px;
        color: #000;
        margin-top: 0;
    }
    button {
        width: 57px;
        padding: 6px;
        min-width: 60px;
        border-radius: 60px;
        background: #fff;
        border: none;
        outline: none;
        height: 30px;
        min-height: 30px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: ${({isYearly}) => isYearly ? "flex-start" : "flex-end"};
        span {
            height: 17px;
            width: 17px;
            border-radius: 50%;
            background: rgba(42, 41, 57, 0.2);
        }
    }
`;
export const HeroSectionTwo = styled.section`
    background: #F9FAFB;
    padding: 50px 0;
`;
export const BillContainer = styled.div`
    background: #fff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    min-width: 1000px;
    border-radius: 32px;
    position: relative;
    margin-top: 90px;
`;
export const BillCard = styled.div`
    background: ${({isOdd}) => isOdd ? colors.textColor : "#fff"};
    color: ${({isOdd}) => isOdd ? "#fff" : colors.textColor};
    border-radius: 32px;
    ${({isOdd}) => isOdd && "position: absolute;"}
    top: -70px;
    left:  calc(100% / 3);
    width: calc(100% / 3);
    min-width: calc(1000px / 3);
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
    p {
        color: ${({isOdd}) => isOdd ? "rgba(255, 255, 255, 0.7)" : "rgba(42, 41, 57, 0.7)"};
        font-weight: 700;
        font-size: 18px;
        text-transform: uppercase;
        text-align: center;
        margin-top: 0;
        width: 100%;
    }
    h3 {
        width: 160px;
        height: 33px;
        padding: 8px 24px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 40px;
        font-size: 14px;
        color: #FDF6EF;
        font-weight: 700;
        margin: 0 auto 15px auto;
    }
    h1 {
        width: 100%;
        min-width: unset;
        color: ${({isOdd}) => isOdd ? "#fff" : colors.textColor};
        font-size: 45px;
        font-weight: 700;
    }
    h1 + span {
        font-weight: 500;
        font-size: 16px;
        color: ${({isOdd}) => isOdd ? "#fff" : "#000"};
    }
    div {
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
            margin: 8px 0;
        }
        margin-top: 15px;
        border-top: 1px solid ${({isOdd}) => isOdd ? "#ffffff33" : "#2A293933"};
    }
`;
export const Wrapper = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    h3 {
        text-align: center;
        font-size: 35px;
        font-weight: 400;
        span {
            font-weight: 600;
        }
    }
    ${breakpoints.md}{
        h3 {
            font-size: 20px;
        }
    }
`;
export const PricingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;
    ${breakpoints.md}{
       flex-direction: column;
    }
`;
export const PricingContainer = styled.div`
    box-shadow: 0 0 10px #aaaaaa40;
    width: 31%;
    max-width: 31%;
    ${breakpoints.md}{
        width: 95%;
        max-width: 95%;
    }
`;
export const Top = styled.div`
    height: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Bottom = styled.div`
    height: 40px;
    min-height: 40px;
`;
export const PricingType = styled.div`
    text-align: center;
    color: #fff;
    background: ${colors.primaryColor};
    padding: 10px 0;
    h3 {
        font-size: 25px;
    }
`;
export const SocialLinks = styled.div`
    width: 70%;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    margin: 15px auto;
`;
export const PricingListCont = styled.div`
    padding: 13px;
`;
export const PricingItem= styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #00000080;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
        color: ${colors.primaryColor};
        text-align: center;
        width: 24px;
    }
    ${breakpoints.md}{
       font-size: 14px;
    }
`;
export const PricingContent = styled.div`
    a {
        padding: 12px 30px;
        color: #fff;
        background: ${colors.primaryColor};
        display: flex;
        margin: 20px auto;
        width: fit-content;
        border-radius: 5px;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
    }
`;


