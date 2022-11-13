import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const HeroSectionOne = styled.div`
    background: url("/hero-5.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 40vh;
    max-height: 400px;
    min-height: 150px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 45px;
    }
    ${breakpoints.md}{
        height: 25vh;
        h1 {
            font-size: 24px;
        }
    }
`;
export const HeroSectionTwo = styled.section`
    padding: 50px 0;
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


