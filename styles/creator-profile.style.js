import styled from "styled-components";
import { colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
`;
export const BackImage = styled.div`
    position: relative;
    height: 60vh;
    min-height: 400px;
    display: flex;
    justify-content: center;
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
`;
export const ProfileStats = styled.div`
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
        color: #333;
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
`;
export const Stats = styled.div`
    width: 320px;
    min-width: 320px;
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
`;
export const StatCard = styled.div`
    width: 160px;
    padding: 25px 15px;
    text-align: center;
    color: ${(prop) => prop.textColor};
    background: ${(prop) => prop.bgColor};
    h3 {
        font-size: 22px;
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
    width: 200px;
    flex-direction: column;
    border: 1px solid #D2D2D2;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0px 4px 12px 0px #0000001A;
    z-index: 99;
    a {
        padding: 10px;
        text-align: left;
        color: #111;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font: 15px;
        span {
            margin-right: 10px;
        }
        :hover {
            background: ${colors.primaryColor}33;
        }
        :last-child {
            color: red;
        }
    }
`;
export const Container = styled.div`
    background: #eee;
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    padding-top: 300px;
    padding-bottom: 30px;
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
    column-gap: 20px;
    padding: 15px 20px;
    row-gap: 15px;
`;
export const Skill = styled.span`
    padding: 10px 35px;
    display: inline-block;
    border-radius: 9999px;
    background: #f1f1f1;
`;
export const ImageCard = styled.div`
    height: 250px;
    width: 250px;
    position: relative;
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
`;

