import Image from "next/image";
import styled from "styled-components";
import { breakpoints, colors, sizes } from "../../styles/theme";

export const Container = styled.footer`
    background: #fff;
`;
export const Wrapper = styled.div`
    width: 95%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    padding-top: 25px;
    background: #fff;
    color: ${colors.textColor};
    ${breakpoints.lg}{
        width: 100%;
        padding: 25px;
    }
    ${breakpoints.sm}{
        width: 100%;
        padding: 25px 20px;
    }
    ${breakpoints.sm}{
        font-size: 14px !important;
    }
`;
export const MainSection = styled.div`
    width: 40%;
    padding-right: 25px;
    p {
        margin-top: 10px;
        color: #555461;
    }
    ul {
        list-style: none;
        margin-top: 10px;
    }
    a {
        text-decoration: none;
        color: #1E2833;
        font-size: 16px;
        font-weight: 500;
        margin: 7px 0;
        display: inline-block;
        :hover {
            color: ${colors.primaryColor};
        }
    }
    ${breakpoints.lg}{
        width: 100%;
        padding-bottom: 20px;
    }
`;
export const Section = styled.div`
    width: 20%;
    ul {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: ${colors.textColor};
        font-size: 14px;
        margin: 7px 0;
        display: inline-block;
        :hover {
            color: ${colors.primaryColor};
        }
    }
    h3 {
        margin-bottom: 10px;
        font-weight: 500;
        color: ${colors.primaryColor};
        font-size: 15px;
    }
    ${breakpoints.sm}{
        width: 100%;
        margin-top: 15px;
    }
`;
export const Top = styled.div`
    display: flex;
    ${breakpoints.lg}{
        flex-direction: column;
    }
`;
export const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: ${colors.textColor};
    font-size: 14px;
    margin-top: 20px;
    p {
        color: #1E2833;
        opacity: 0.5;
    }
    ${breakpoints.md}{
        flex-direction: column;
        height: auto;
        text-align: center;
        padding: 10px 0;
        row-gap: 10px;
    }
`;
export const BottomLinks = styled.div`
    display: flex;
    column-gap: 20px;
    a {
        color: ${colors.textColor};
        text-decoration: none;
        display: inline-block;
    }
`;
export const Logo = styled(Image)`
    height: 25px;
    margin-bottom: 25px;
`;
export const SocialLinks = styled.div`
    width: 80%;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
`;
