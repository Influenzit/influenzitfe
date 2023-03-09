import Image from "next/image";
import styled from "styled-components";
import { breakpoints, colors, sizes } from "../../styles/theme";

export const Container = styled.footer`
    background: #fff;
    padding: 15px 0px;
    border-top: 1px solid rgba(30, 40, 51, 0.0671438);
`;
export const Wrapper = styled.div`
    width: 95%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    background: #fff;
    color: ${colors.textColor};
    ${breakpoints.sm}{
        font-size: 14px !important;
    }
`;
export const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: ${colors.textColor};
    font-size: 14px;
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
