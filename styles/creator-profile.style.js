import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
`;
export const BackImage = styled.div`
    position: relative;
    height: 60vh;
    min-height: 400px;
    display: flex;
    justify-content: center;
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
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    padding: 20px;
    bottom: -250px;
    border-radius: 3px;
    display: flex;
    ${breakpoints.lg}{
       position: relative;
       bottom: 0;
       flex-direction: column;
    }
`;
export const UserDetails = styled.div`
   h2 {
    font-size: 45px;
    font-weight: 700;
    color: #2A2939;
   }
   div {
    display: flex;
    align-items: center;
    column-gap: 10px;
    row-gap: 5px;
    margin-top: 10px;
   }
   p {
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: #555461;
    font-size: 14px;
   }
`;
export const ProfileStats = styled.div`
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
        color: #333;
        font-size: 15px;
        span {
            color: ${colors.primaryColor};
        }
    }
    button {
        color: #D51045;
        border: none;
        display: inline-flex;
        margin: 0 auto;
        padding: 15px;
        background: transparent;
        font-size: 16px;
        cursor: pointer;
        font-weight: 500;
    }
    ${breakpoints.lg}{
        margin-right: 0;
    }
`;
export const ProfileImgCont = styled.div`
    position: relative;
    height: 250px;
    position: relative;
    width: 250px;
    min-width: 250px;
    margin: 0 auto;
`;
export const ProfileData = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
    div {
        padding: 0 15px;
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    div:first-child {
        border-right: 1px solid #333;
    }
`;
export const ProfileDetails = styled.div`
    margin-right: 20px;
    width: 100%;
    h2 {
        display: flex;
        align-items: center;
        ::after {
            content: "";
            display: block;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            background: #14A800;
            margin-left: 15px;
        }
    }
    p {
        color: #333;
        font-size: 15px;
    }
    ${breakpoints.lg}{
        margin-right: 0;
        p {
            font-size: 14px;
        }
    }
`;
export const ProfileCategory = styled.div`
    display: flex;
    margin: 25px 0;
    div {
        display: flex;
        margin-right: 25px;
        align-items: center;
        p {
            margin-left: 10px;
        }
        p + span {
            padding: 2px 4px;
            border-radius: 99px;
            color: #fff;
            background: #666;
            font-size: 10px;
            margin-left: 10px;
        }
    }
    ${breakpoints.md}{
        flex-direction: column;
        div{
            padding-top: 7px;
            p {
                font-size: 13px;
            }
        }
    }
`;
export const Stats = styled.div`
    width: 100%;
    min-width: 320px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
    }
    button {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        color: #fff;
        background: ${colors.primaryColor};
        margin-top: 20px;
        position: relative;
        border: none;
        font-size: 16px;
        font-weight: 500;
        border-radius: 3px;
        cursor: pointer;
        span {
            margin-right: 10px;
        }
    }
`;
export const StatWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    min-width: 320px;
    width: 100%;
`;
export const StatCard = styled.div`
    width: 50%;
    padding: 25px 15px;
    text-align: center;
    color: ${(prop) => prop.textColor};
    background: ${(prop) => prop.bgColor};
    h3 {
        font-size: 22px;
    }
    ${breakpoints.md}{
       h3 {
        font-size: 20px;
       }
       p {
        font-size: 13px;
       }
    }
`;
export const SeeMoreCont = styled.div`
    display: flex;
    justify-content: right;
    padding: 20px 0;
    button {
        background: transparent;
        border: none;
        color: ${colors.primaryColor};
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }
`;
export const Popup = styled.div`
    display: ${(prop) => prop.show ? "flex" : "none" };
    position: absolute;
    left: 0;
    top: 43px;
    width: 100%;
    flex-direction: column;
    border: 1px solid #D2D2D2;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0px 4px 12px 0px #0000001A;
    z-index: 99;
    button {
        padding: 10px;
        text-align: left;
        color: #111;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font: 15px;
        background: transparent;
        margin-top: 0;
        span {
            margin-right: 10px;
        }
        :hover {
            background: ${colors.primaryColor}33;
        }
        :last-of-type {

            color: red;
        }
    }
`;
export const Container = styled.div`
    background: #FAFBFC;
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    padding-top: 90px;
    padding-bottom: 30px;
    ${breakpoints.lg}{
        padding-top: 20px;
    }
`;
export const SkillCard = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    margin-bottom: 20px;
`;
export const Top = styled.div`
    padding: 15px 20px;
    border-bottom: 1px solid #D2D2D2;
    color: #333;
    h3 {
        font-weight: 400;
    }
`;
export const Bottom = styled.div`
    display: flex; 
    flex-wrap: wrap;
    column-gap: 36px;
    padding: 15px 0;
    row-gap: 15px;
    ${breakpoints.md}{
        column-gap: 10px;
    }
`;
export const Skill = styled.span`
    padding: 10px 35px;
    display: inline-block;
    border-radius: 9999px;
    background: #f1f1f1;
    ${breakpoints.md}{
        font-size: 13px;
        padding: 10px 15px;
    }
`;
export const ImageCard = styled.div`
    height: 250px;
    width: 250px;
    position: relative;
    ${breakpoints.md}{
        margin: 0 auto;
    }
`;
export const WorkCard = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #D2D2D2;
    :last-child {
        border-bottom: none;
    }
    h3 {
        color: #333;
        padding-bottom: 15px;
    }
    div {
        display: flex;
        margin-bottom: 20px;
        p {
            display: inline-flex;
            align-items: center;
            color: #333;
            margin-right: 25px;
            span  {
                display: inline-block;
                margin-left: 15px;
            }
        }
    }
    p {
        font-size: 15px;
        color: #666666
    }
    ${breakpoints.md}{
        h3 {
            font-size: 18px;
        }
        div {
            p {
                font-size: 13px;
                margin-right: 10px;
            }
        }
       
    }
`;
export const ImageContainer = styled.div`
    height: 450px;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    #img {
        position: relative;
        height: 100%;
        width: 100%;
    }
`;
export const ImageContainerTwo = styled.div`
    height: 450px;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    display: flex;
    column-gap: 5px;
    .wrap {
        width: 50%;
        max-width: 50%;
        min-width: 50%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }
    .wrap-top {
        height: 60%;
        max-height: 60%;
        position: relative;
    }
    .wrap-bottom {
        height: 40%;
        max-height: 40%;
        display: flex;
        column-gap: 5px;
        position: relative;
        div {
            position: relative;
            width: 50%;
            max-width: 50%;
            min-width: 50%;
        }
    }
`;
export const BottomSection = styled.div`
    display: flex;
    margin-top: 35px;
    column-gap: 20px;
`;
export const LeftSection = styled.div`
    width: calc(100% - 380px);
    min-width: calc(100% - 380px);
`;
export const UserCardSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const UserImage = styled.div`
    height: 80px;
    width: 80px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
`;
export const Info = styled.div`
`;
export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    padding: 20px 0;
    row-gap: 15px;
`;
export const Tag = styled.span`
    padding: 8px 20px;
    background: rgba(42, 41, 57, 0.08);
    border-radius: 99px;
`;
export const RightSection = styled.div`
    width: 360px;
    h3 {
        color: #2A2939;
        font-size: 18px;
        margin-bottom: 10px;
    }
`;
export const SocialWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    width: 100%;
    margin: 10px 0;
`;
export const Social = styled.div`
    background: #FFFFFF;
    border: 1px solid rgba(42, 41, 57, 0.1);
    border-radius: 8px;
    display: flex;
    column-gap: 10px;
    padding: 15px;
    width: 50%;
    min-width: calc(50% - 5px);
    div {
        h4 {
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 600;
            color: rgba(42, 41, 57, 0.5);
        }
        p {
            font-size: 14px;
        }
    }
`;
export const CollaborateBtn = styled.button`
    background: ${colors.primaryColor};
    color: #fff;
    width: 100%;
    padding: 8px 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    font-size: 17px;
    border-radius: 8px;
    column-gap: 10px;
    margin-bottom: 15px;
`;
export const Campaign = styled.div`
    margin: 10px 0;
    background: #FFFFFF;
    border: 1px solid rgba(42, 41, 57, 0.1);
    border-radius: 16px;
    display: flex;
    .cont {
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        :first-of-type {
            border-right: 1px solid rgba(42, 41, 57, 0.1);
        }
        h1 {
            font-weight: 700;
            font-size: 40px;
            color: #2A2939;
        }
        p {
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: rgba(42, 41, 57, 0.5);
            font-weight: 600;
            font-size: 12px;
        }
        div {
            display: flex;
            column-gap: 3px;
        }
    }
`;
export const Listing = styled.div`
    h3 {
        font-size: 24px;
        color: #2A2939;
    }
`;
