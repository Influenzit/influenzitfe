import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
`;
export const BackImage = styled.div`
    position: relative;
    height: 60vh;
    min-height: 400px;
    ${breakpoints.lg}{
        height: auto;
        min-height: auto;
        #back-img {
            display: none !important;
        }
    }
`;
export const UserCard = styled.div`
    background: #fff;
    position: absolute;
    z-index: 99;
    width: 99vw;
    max-width: calc(((100vw - ${sizes.wrapperWidth})/2) + ${sizes.wrapperWidth});
    padding: 20px 20px 20px calc((100vw - ${sizes.wrapperWidth})/2);
    bottom: -100px;
    border-radius: 3px;
    display: flex;
    P {
        color: #666666;
        span {
            font-weight: 600;
            color: #111;
        }
    }
    p:last-child {
        color: #333;
        margin-top: 10px;
    }
    ${breakpoints.lg}{
       position: relative;
       bottom: 0;
       align-items: center;
       flex-direction: column;
       padding: 20px;
    }
`;
export const ProfileImgCont = styled.div`
    height: 250px;
    position: relative;
    width: 250px;
    min-width: 250px;
    margin-right: 20px;
    ${breakpoints.lg}{
        margin-right: 0;
    }
`;
export const ProfileDetails = styled.div`
    ${breakpoints.md}{
       font-size: 14px;
       text-align: center;
    }
`;
export const Wrapper = styled.div`
    padding-top: 130px;
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    h3 {
        color: #333;
        padding: 10px 0;
        border-bottom: 1px solid #333;
    }
    ${breakpoints.lg}{
       padding-top: 20px;
    }
`;
export const SocialWrapper = styled.div`
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
export const SocialCard = styled.div`
    border: 1px solid #d2d2d2;
    width: 48%;
    max-width: 48%;
    min-width: 320px;
    border-radius: 3px;
    margin: 10px 0;
`;
export const Top = styled.div`
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #d2d2d2;
    p {
        padding-left: 10px;
    }
`;
export const Bottom = styled.div`
    padding: 10px;
`;
export const CreatorsWrapper = styled.div`
    padding: 20px 15px;
    margin-top: 10px;
    display: flex;
    column-gap: 15px;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #fff;
    row-gap: 10px;
`;
export const CreatorsCard = styled.div`
    height: auto;
    width: 285px;
    border: 1px solid #D2D2D2;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
        font-size: 14px;
        color: #999;
    }
    ${breakpoints.md}{
        margin: 0 auto;
    }
`;
export const TopImg = styled.div`
    height: 50%; 
    min-height: 210px;
    width: 100%;
    position: relative;
`;
export const CreatorDetails = styled.div`
    padding: 5px;
`;
export const SocialHandle = styled.div`
    font-size: 14px;
    padding: 5px 0;
    span {
        padding-left: 10px;
    }
    a {
        display: inline-flex;
        align-items: center;
    }
`;
export const Controls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    a {
        background: ${colors.primaryColor};
        color: #fff;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        padding: 5px 15px;
        margin-right: 10px;
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
    }
    button {
        background: transparent;
        border: none;
    }
`;
export const DataSection = styled.div`
    padding-bottom: 20px;
`;
