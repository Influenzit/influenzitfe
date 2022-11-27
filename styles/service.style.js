import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
     background: #F7FAFC;
`;
export const TopTabContainer = styled.div`
    width: 100%;
    height: 60px;
    position: fixed;
    top: 70px;
    left: 0;
    background: #fff;
    z-index: 999;
    border: 1px solid #D2D2D2;
`;
export const WrapperT = styled.div`
    max-width: ${sizes.wrapperWidth};
    width: 98%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const LeftControl = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 24px;
`;
export const DetailTab = styled.button`
    background: transparent;
    border: none;
    height: 100%;
    padding: 0 3px;
    font-size: 16px;
    cursor: pointer;
    transition: .3s linear;
    border-bottom: 5px solid transparent;
    :hover {
        border-bottom: 5px solid ${colors.primaryColor};
    }
`;
export const RightControl = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    button {
        border: none;
        background: transparent;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0px 10px;
        height: 100%;
    }
`;
export const Wrapper = styled.div`
    max-width: ${sizes.wrapperWidth};
    width: 98%;
    height: 100%;
    margin: 0 auto;
    padding-top: 80px;
`;
export const ContainerB = styled.div`
    display: flex;
    column-gap: 30px;
    padding-bottom: 30px;
`;
export const Left = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    max-width: calc(100% - 380px);
`;
export const Section = styled.div`
    background: #fff;
    padding: 30px;
`;
export const CurrentPosition = styled.div`
    font-size: 14px;
    color: ${colors.primaryColor};
    padding-bottom: 10px;
`;
export const ImageSlides = styled.div`
    width: 100%;
    margin: 20px 0;
`;
export const CtrlBtn = styled.button`
    border: none;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: center;
    position: absolute;
    ${(props) => props.leftS ? "left: -20px !important" : "right: -20px !important" };
    box-shadow: 0px 0px 10px 0px #00000026;
`;
export const Images = styled.div`
    position: relative;
    height: 430px;
`;
export const Header = styled.div`
    color: #333;
    font-size: 17px;
    padding: 13px 30px;
    border-bottom: 1px solid #D2D2D2;
    h3 {
        font-weight: 500;
    }
`;
export const Desc = styled.p`
    color: #666666;
    padding-top: 15px;
`;
export const SectionM = styled.div`
    background: #fff;
`;
export const AboutWrapper = styled.div`
    padding: 15px 30px;
`;
export const ProfileCard = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
`;
export const Bio = styled.p`
    font-size: 16px;
    margin-top: 15px;
    color: #666666;
`;
export const ImageWrapper = styled.div`
    position: relative;
    height: 150px;
    width: 150px;
`;
export const ProfileDetails = styled.div`
    h3 {
        margin-bottom: 10px;
    }
    p {
        font-size: 14px;
        font-weight: 600;
        color: #666666;
    }
    div {
        display: flex;
        align-items: center;
        margin: 5px 0;
        p {
            padding-left: 15px;
        }
    }
`;
export const FaqWrapper = styled.div`
     padding: 15px 30px;
`;
export const FaqCont = styled.div`
`;
export const FaqQuest = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    cursor: pointer;
    button {
        border: none;
        background: transparent;
        cursor: pointer;
    }
    h4 {
        font-weight: 400;
        font-size: 16px;
        color: ${(props) => props.isActive ? colors.primaryColor : "#111"};
    }
`;
export const FaqAns = styled.div`
    color: #666666;
`;
export const ReviewWrapper = styled.div`
    padding: 15px 30px;
`;
export const Review = styled.div`
    display: flex;
    column-gap: 25px;
`;
export const ReviewL = styled.div`

`;
export const ReviewImg = styled.div`
`;
export const ReviewR = styled.div`
    max-width: calc(100% - 95px);
`;
export const RCountry = styled.div`
    column-gap: 15px;
    padding: 5px 0;
    display: flex;
`;
export const ReviewMsg = styled.p`
    color: #666666;
    padding: 20px 0;
`;
export const Right = styled.div`
    width: 350px;
    min-width: 350px;
`;
export const PackageCard = styled.div`
    position: sticky;
    top: 150px;
`;
export const PackageTabs = styled.div`
    display: flex;
    column-gap: 5px;
`;
export const PackageTab = styled.button`
    background: ${(props) => props.isActive ? "#fff" : "#FAFAFA"};
    border: none;
    font-size: 16px;
    padding: 13px 0;
    width: calc((100% - 10px)/3);
    cursor: pointer;
    border-bottom: 3px solid ${(props) => props.isActive ? colors.primaryColor : "transparent"};
`;
export const Package = styled.div`
    background: #fff;
    padding: 0 20px 20px 20px;
`;
export const PHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    p {
        color: ${colors.primaryColor};
        font-weight: 500;
        font-size: 16px;
        :last-of-type {
            font-weight: 400;
            font-size: 20px;
            color: #333;
        }
    }

`;
export const PDetails = styled.p`
    padding-bottom: 15px;
    font-size: 15px;
    color: #111;
`;
export const PFeatures = styled.div`
    padding-bottom: 15px;
`;
export const Feature = styled.div`
    display: flex;
    align-items: center;
    column-gap: 7px;
    margin-bottom: 8px;
    p {
        max-width: calc(100% - 32px);
        font-size: 15px;
        color: ${colors.primaryColor};
    }
`;
export const Stars = styled.div`
    display: flex;
    column-gap: 6px;
`;
export const ContinueBtn = styled.button`
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 0;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    border-radius: 3px;
    cursor: pointer;
`;
