import Image from "next/image";
import styled from "styled-components";
import { breakpoints, colors, sizes } from "../../styles/theme";

export const Container = styled.footer`
    background: #111;
`;
export const Wrapper = styled.div`
    width: 95%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    padding-top: 25px;
    background: #111;
    color: white;
    ${breakpoints.sm}{
        font-size: 14px !important;
    }
`;
export const MainSection = styled.div`
    width: 40%;
    p {
        margin-top: 30px;
    }
    form {
        display: flex;
        border: none;
        width: 100%;
        background: white;
        margin-top: 10px;
        border-radius: 8px;
        height: 45px;
        overflow: hidden;
        max-width: 290px;
        input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: transparent;
            padding: 0 10px;
        }
        button {
            border: none;
            background: ${colors.primaryColor};
            padding: 0 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
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
        color: #FFFFFFB2;
        font-size: 14px;
        margin: 7px 0;
        display: inline-block;
        :hover {
            color: ${colors.primaryColor};
        }
    }
    h3 {
        margin-bottom: 10px;
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
    border-top: 1px solid #FFFFFF80;
    color: #FFFFFFB2;
    font-size: 14px;
    margin-top: 20px;
    ${breakpoints.md}{
        flex-direction: column;
        height: auto;
        text-align: center;
        padding: 10px 0;
    }
`;
export const BottomLinks = styled.div`
    a {
        color: #FFFFFFB2;
        text-decoration: none;
        display: inline-block;
        :first-child {
            margin-right: 20px;
            position: relative;
            ::before {
                content: "";
                display: block;
                width: 1px;
                height: 100%;
                position: absolute;
                right: -10px;
                top: 0;
                background: #FFFFFF80;
            }
        }
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
