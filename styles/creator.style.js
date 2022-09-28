import styled from "styled-components";
import { colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
    background: url('/hero-4.png');
    background-attachment: fixed;
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
`;
export const HeroSectionTwo = styled.section`
    background: white;
    padding: 50px 0;
`;
export const InfoCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 0;
`;
export const ImageWrapper = styled.div`
    overflow: hidden;
    width: 45%;
    min-width: 45%;
    position: relative;
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
`;
