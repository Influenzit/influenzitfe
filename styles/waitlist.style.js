import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    padding-top: 8px;
`;
export const Banner = styled.div`
    background: linear-gradient(89.75deg, rgba(31, 32, 36, 0.5) -0.33%, rgba(31, 32, 36, 0) 82.92%), url("/w-banner-1.png");
    background-size: cover;
    background-repeat: no-repeat;
    width: calc(100% - 18px);
    margin: 0 auto;
    height: 96vh;
    min-height: 500px;
    max-height: 900px;
    border-radius: 32px;
    padding: 60px 80px;
    color: #fff;
    h1 {
        font-weight: 800;
        font-size: 52px;
        margin-top: 8%;
    }
    p {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        margin-top: 15px;
    }
    a {
        display: inline-block;
        font-weight: 600;
        font-size: 18px;
        background: #DF475C;
        border-radius: 8px;
        padding: 14px 32px;
        margin-top: 25px;
    }
    ${breakpoints.md} {
        padding: 20px;
        height: 50vh;
        h1 {
            font-size: 30px;
        }
    }
`;
export const Wrapper = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    padding: 70px 0;
    #h1 {
        text-align: center;
    }
    #p {
        text-align: center;
        width: 60%;
        min-width: 350px;
        margin: 0 auto;
    }
    h1 {
        font-weight: 700;
        font-size: 40px;
        color: ${colors.textColor};
    }
    p {
        font-weight: 500;
        font-size: 18px;
        color: #555461;
        padding-top: 15px;
    }
     ${breakpoints.md}{
        #p {
            text-align: center;
            width: 100%;
        }
        h1 {
            font-size: 28px;
        }
        p {
            font-size: 16px;
        }
     }
`;
export const Info = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    :first-of-type {
        margin-top: 60px;
    }
    ${breakpoints.md} {
        ${({isInverse}) => isInverse ? "flex-direction: column-reverse;" : "flex-direction: column;"}
        row-gap: 15px;
    }
`;
export const  Details = styled.div`
    width: 50%;
    min-width: 50%;
    ${({isInverse}) => isInverse ? "padding-left: 100px;" : "padding-right: 100px;"}
    ${breakpoints.md} {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
`;
export const ImgContainer = styled.div`
    width: 50%;
    min-width: 50%;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    height: 400px;
    ${breakpoints.md} {
        width: 100%;
    }
`;
export const AccessCard = styled.div`
    margin: 40px 0;
    background: url("/squid.svg"), ${colors.primaryColor};
    padding: 50px;
    border-radius: 24px;
    display: flex;
    column-gap: 20px;
    align-items: center;
    div {
        width: 50%;
        min-width: 50%;
        h2 {
            font-weight: 600;
            font-size: 32px;
            color: #fff;
        }
        p {
            color: #fff;
            font-weight: 500;
            font-size: 18px;
        }
        form {
            width: 100%;
            height: 60px;
            border-radius: 99px;
            background: #fff;
            display: flex;
            padding: 8px;
            input {
                outline: none;
                border: none;
                background: transparent;
                width: 100%;
                color: #6A6974;
                font-size: 14px;
                padding-left: 24px;
            }
            button {
                background: #2A2939;
                border-radius: 100px;
                color: #fff;
                font-size: 14px;
                border: none;
                outline: none;
                width: 105px;
                cursor: pointer;
            }
        }
    }
    ${breakpoints.md}{
        flex-direction: column;
        padding: 20px;
        row-gap: 15px;
        div {
            width: 100%;
        }
         h2 {
            font-weight: 600;
            font-size: 25px;
            color: #fff;
        }
        p {
            color: #fff;
            font-weight: 500;
            font-size: 16px;
        }
    }
`;
