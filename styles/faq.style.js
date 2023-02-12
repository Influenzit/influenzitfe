import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 150px);
    background: #fff;
    padding: 25px 0;
`;
export const Section = styled.div`
    background: linear-gradient(179.76deg, #FDF8F1 3.31%, #F0C3C9 237.13%);
`;
export const TopBanner = styled.div`
    width: 98%;
    padding: 120px 0 70px 0;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    p {
        width: 45%;
        min-width: 300px;
        color: ${colors.textColor};
    }
    span {
        color: ${colors.primaryColor};
        font-weight: 700;
        letter-spacing:  0.03em;
        padding-bottom: 10px;
        display: inline-block;
        font-size: 14px;
    }
    h1 {
        font-weight: 800;
        color: ${colors.textColor};
        font-size: 35px;
        padding-bottom: 15px;
    }
`;
export const Wrapper = styled.div`
    width: 98%;
    padding: 20px 0;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    h2 {
        font-size: 30px;
        color: ${colors.textColor};
        margin: 30px 0;
    }
`;
export const Faqs = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 55px;
    row-gap: 20px;
    margin-bottom: 60px;
`;
export const Faq = styled.div`
    width: 30%;
    min-width: auto;
    h3 {
        font-size: 18px;
        font-weight: 500;
        color: #101828;
        padding-bottom: 10px;
    }
    p {
        font-size: 15px;
        color: #667085;
    }
`;
export const Banner = styled.div`
    background: rgba(252, 245, 235, 0.5);
    border-radius: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 300px;
    justify-content: center;
    margin: 15px 0;
    h3 {
        font-size: 19px;
        color: #101828;
        font-weight: 600;
        margin-top: 15px;
    }
    p {
        font-size: 17px;
        color: #667085;
        margin-top: 5px;
    }
    a {
        margin-top: 15px;
        display: inline-block;
        padding: 14px 30px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 600;
    }
`;
