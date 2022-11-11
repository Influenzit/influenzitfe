import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
    background: url("/hero-1.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 80vh;
    max-height: 800px;
    min-height: 400px;
    width: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
        font-size: 46px;
        width: 64vw;
        min-width:350px;
        text-align: center;
        font-weight: 300;
        span {
            font-weight: 600;
        }
    }
    p {
        margin-top: 15px;
        font-size: 20px;
    }
    form {
        height: 60px;
        width: 60vw;
        display: flex;
        background: #fff;
        margin-top: 50px;
        border-radius: 3px;
        overflow: hidden;
        font-size: 16px;
        input {
            border: none;
            outline: none;
            width: calc((100% - 60px)/2);
            height: 100%;
            padding: 0 25px 0 15px;
            font-size: 16px;
        }
        select {
            border: none;
            outline: none;
            height: 100%;
            background: transparent;
            width: calc(100% - 30px);
            padding: 0 15px;
            font-size: 16px;
        }
        button {
            width: 60px;
            border: none;
            background: ${colors.primaryColor};
            cursor: pointer;
        }
    }
    ${breakpoints.md} {
        background: white;
        color: ${colors.primaryColor};
        height: auto;
        h1 {
            font-size: 28px;
            width: 90%;
            min-width:350px;
        }
        p {
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            width: 90%;
        }
        form {
            height: 50px;
            width: 90%;
            margin-top: 20px;
            font-size: 14px;
            border: 1px solid ${colors.primaryColor};
            input {
                width: calc((100% - 50px)/2);
                padding: 0 5px 0 5px;
                font-size: 12px;
            }
            select {
                padding: 0 5px 0 0;
                font-size: 12px;
            }
            button {
                width: 60px;
            }
        }
    }
`;
export const CustomSelect = styled.div`
    width: calc((100% - 60px)/2);
    height: 100%;
    display: flex;
    align-items: center;
    border-left: 1px solid black;
    color: black;
    justify-content: space-between;
    span {
        padding-left: 15px;
        color: #848484;
    }
    ${breakpoints.md} {
        span {
            padding-left: 5px;
            color: #848484;
        }
    }
`;
export const HeroSectionTwo = styled.section`
    background: white;
`
export const WrapperTwo = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    justify-content: space-between;
    ${breakpoints.sm} {
        flex-direction: column;
    }
`;
export const InfoCard = styled.div`
    padding: 35px 50px;
    border-radius: 3px;
    margin: 50px 0;
    color: white;
    background: ${(prop) => prop.primary ? colors.primaryColor : "#333"};
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h3 {
        font-size: 28px;
        margin-bottom: 15px;
    }
    p {
        font-size: 18px;
    }
    a {
        border: 2px solid white;
        padding: 10px 20px;
        margin-top: 20px;
    }
    ${breakpoints.lg} {
        width: 48%;
        padding: 20px 15px;
    }
    ${breakpoints.sm} {
        width: 100%;
        padding: 20px 15px;
        margin: 10px 0;
        h3 {
        font-size: 18px;
        margin-bottom: 15px;
        }
        p {
            font-size: 15px;
        }
    }
`
export const HeroSectionThree = styled.div`
    background: #111;
    padding: 45px 0;
`;
export const WrapperThree = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    color: white;
    margin: 0 auto;
    text-align: center;
    h1 {
        font-size: 40px;
        margin-bottom: 10px;
        font-weight: 400;
    }
    h1 + p {
        font-size: 18px;
    }
    #search-by {
        padding: 15px 30px;
        background: ${colors.primaryColor};
        color: white;
        margin-top: 40px;
        display: inline-block;
        border-radius: 3px;
    } 
    ${breakpoints.lg} {
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 400;
        }
        h1 + p {
            font-size: 15px;
        }
    }
`;
export const NicheCard = styled.div`
    background: white;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
    text-align: center;
    overflow: hidden;
    height: 250px;
    width: 100%;
    min-width: 280px;
    max-width: 285px;
    position: relative;
    border-radius: 3px;
    a {
        color: ${colors.primaryColor};
        margin: 10px;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -300px;
        opacity: 0;
        transition: .5s linear;
        background: white;
    }
    h4 {
        margin: 20px 0;
        font-size: 17px;
    }
    p {
        font-size: 15px;
    }
    :hover {
        #niche-icon {
            display: none !important;

        }
        div {
            position: relative;
            bottom: 0;
            opacity: 1;
        } 
    }
`;
export const NicheWrapper = styled.div`
    display: flex;
    margin-top: 50px;
    column-gap: 20px;
    flex-wrap: wrap;
    row-gap: 30px;
    justify-content: space-between;
    overflow-y: hidden;
    ${breakpoints.lg} {
        justify-content: center;
    }
`;
export const HeroSectionFour = styled.section`
    background: white;
    padding: 40px 0;
`;
export const WrapperFour = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
`;
export const InfoSectOne = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 60px 0;
    ${breakpoints.md} {
        flex-direction: column;
        padding-top: 20px;
        :last-of-type {
            flex-direction: column-reverse;
        }
    }
`;
export const ImgSlider = styled.div`
    width: 45%;
    position: relative;
    ${breakpoints.md} {
        width: 100%;
        height: 350px;
    }
`;
export const ImgWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: ${(props) => props.showImg ? "1" : "0"};
    z-index: ${(props) => props.showImg ? "20" : "0"};
    left: 0;
    top: 0;
    transition: 1s ease-in-out;
`;
export const SlideControl = styled.div`
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    z-index: 9999;
    width: 100%;
`;
export const SlideBtn = styled.button`
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: white;
    margin-right: 10px;
    border: none;
    cursor: pointer;
`;
export const InfoDetails = styled.div`
    width: 50%;
    max-width: 50%;
    padding-left: 15px;
    h3 { 
        font-size: 40px;
        font-weight: 400;
        span {
            font-weight: 600;
        }
    }
    h3 + p {
        font-size: 22px;
        margin-top: 10px;
    }
    a {
        background: ${colors.primaryColor};
        color: #fff;
        padding: 15px 30px;
        margin-top: 20px;
        display: inline-block;
    }
    ${breakpoints.lg} {
        width: 100%;
        padding: 20px 15px;
        h3 { 
            font-size: 22px;
            font-weight: 400;
            span {
                font-weight: 600;
            }
        }
        h3 + p {
            font-size: 15px;
            margin-top: 10px;
        }
    }
    ${breakpoints.md} {
        max-width: 100%;
    }
`;
export const InfoList = styled.div`
    margin-top: 20px;
`;
export const ListItem = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 8px 0;
    span {
        margin-left: 10px;
        line-height: 25px;
        width: calc(100% - 30px);
    }
    ${breakpoints.lg} {
        font-size: 12px;
    }
`;
export const HeroSectionFive = styled.section`
    background: white;
`;
export const WrapperFive = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    position: relative;
    border-top: 1px solid #D2D2D2;
    margin: 0 auto;
    padding: 50px 0;
    h1 {
        font-size: 40px;
        font-weight: 400;
        margin: 0 auto;
        span {
            font-weight: 600;
        }
        text-align: center;
        width: 60%;
        min-width: 350px;
    }
    ${breakpoints.md} {
        padding: 20px 0;
        h1 {
            font-size: 28px;
            width: 90%;
        }
    }
    
`;
export const ReviewWrapper = styled.div`
    display: flex;
    overflow-y: scroll;
    column-gap: 100px;
    padding-top: 30px;
    scroll-snap-type: x mandatory;
`;
export const ReviewCard = styled.div`
    width: calc(50% - 50px);
    min-width: calc(50% - 50px);
    border: 1px solid #333333;
    color: #333333;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    p:first-child {
        font-style: italic;
        text-align: center;
        line-height: 160%;
        font-size: 20px;
    }
    ${breakpoints.md} {
        width: 100%;
        min-width: 100%;
    }
`;
export const UserCard = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
    align-items: center;
`;
export const UserImage = styled.div`
    height: 50px;
    width: 50px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
`;
export const UserDetails = styled.div`
    padding-left: 15px;
`;

