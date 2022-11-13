import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
    background: url('/hero-4.png');
    background-position: center;
    background-size: cover;
    height: 40vh;
    min-height: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    h1 {
        font-size: 45px;
        font-weight: 400;
        span {
            font-weight: 600;
        }
    }
    p {
        font-size: 20px;
        width: 40%;
        min-width: 350px;
        margin-top: 10px;
    }
    a {
        padding: 15px 30px;
        background: #fff;
        color: ${colors.primaryColor};
        font-weight: 600;
        margin-top: 20px;
    }
    ${breakpoints.md}{
        height: 30vh;
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 16px;
            width: 90%;
        }
        a {
            padding: 10px 20px;
            background: #fff;
            font-size: 15px;
            margin-top: 20px;
        }
    }
`;
export const HeroSectionTwo = styled.section`
    background: white;
    padding: 50px 0;
`;
export const InfoCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 0;
    ${breakpoints.md}{
        flex-direction: ${(props) => props.reverse ? "column-reverse" : "column"};
    }
`;
export const ImageWrapper = styled.div`
    overflow: hidden;
    width: 45%;
    min-width: 45%;
    position: relative;
    ${breakpoints.md}{
        width: 100%;
        height: 250px;
        margin-top: 10px;
    }
`;
export const WrapperTwo = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
`;
export const Info = styled.div`
    width: 45%;
    min-width: 45%;
    h3 {
        margin: 20px 0;
        font-size: 35px;
    }
    ${breakpoints.md}{
        width: 100%;
        h3 {
            font-size: 22px;
        }
        p {
            font-size: 14px;
        }
    }
`;
export const LastInfo = styled.div`
    padding: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 38px;
        width: 60%;
        font-weight: 400;
        span {
            font-weight: 600;
        }
    }
    p {
        font-size: 20px;
        width: 40%;
        min-width: 350px;
        margin-top: 10px;
        color: #333;
    }
    a {
        padding: 15px 30px;
        color: #fff;
        background: ${colors.primaryColor};
        font-weight: 600;
        margin-top: 25px;
    }
    ${breakpoints.md}{
        padding: 0;
        h1 {
            font-size: 22px;
            width: 90%;
        }
        p {
            font-size: 15px;
            width: 90%;
        }
        a {
            padding: 10px 20px;
        }
    }
`;
