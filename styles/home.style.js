import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const HeroSectionOne = styled.section`
    background: linear-gradient(180deg, #FDF8F1 2.17%, #F0C3C9 165.86%);
    min-height: 80vh;
    width: 100%;
    padding-top: 120px;
`;
export const FormDivide = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    
`;
export const WrapperOne = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
        font-size: 46px;
        width: 80%;
        min-width:350px;
        text-align: center;
        line-height: 64px;
        font-weight: 800;
        color: ${colors.textColor};
        span {
            color: ${colors.primaryColor};
        }
    }
    p {
        margin-top: 15px;
        font-size: 20px;
        width: 60%;
        color: ${colors.textColor};
        text-align: center;
    }
    form {
        // height: 60px;
        width: 80%;
        display: flex;
        align-items: center;
        background: #fff;
        margin-top: 50px;
        border-radius: 40px;
        overflow: hidden;
        font-size: 16px;
        padding: 10px;
        label {
            font-weight: 500;
        }
        input {
            border: none;
            outline: none;
            width: auto;
            height: 100%;
            padding: 0 15px;
            font-size: 14px;
            color: ${colors.textColor}B2;
        }
        select {
            border: none;
            outline: none;
            height: 100%;
            background: transparent;
            width: calc(100% - 30px);
            padding: 0 15px;
            font-size: 14px;
            color: ${colors.textColor}B2;
        }
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            // font-weight: 700;
            gap: 1rem;
            width: 50px;
            height: 50px;
            min-height: 50px;
            min-width: 50px;
            border-radius: 50%;
            margin: 0;
            border: none;
            background: ${colors.primaryColor};
            cursor: pointer;
        }
        button > span{
            display: none;
            color: #FFF;
        }
    }
    ${breakpoints.md} {
        height: auto;
        h1 {
            font-size: 38px;
            line-height: 52px;
            width: 90%;
            min-width:100%;
        }
        p {
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            width: 90%;
        }
        form {
            padding: 1rem;
            gap: .2rem;
            flex-direction: column;
            width: 90%;
            margin-top: 20px;
            font-size: 14px;
            box-shadow: 5px 5px 5px 5px #EFEFEFAB;
            label{
                padding-bottom: 5px;
            }
            input {
                width: 100%;
                height: 40px;
                border-radius: 4px;
                padding: 5px !important;
                border: 1px solid grey;
                font-size: 12px;
                background: #FFF;
            }
            select {
                width: 100%;
                height: 40px;
                border-radius: 4px;
                padding: 5px;
                border: 1px solid grey !important;
                font-size: 12px;
                background: #FFF;
            }
            button > span{
                display: inline-block;
            }
            button {
                width: 98%;
                border-radius: 5px;
                margin: 10px 5px;
                box-sizing: border-box;
                border: none;
                background: ${colors.primaryColor};
                cursor: pointer;
            }
        }
    }
    ${breakpoints.sm}{
        h1{
            line-height: 48px;
        }
    }
`;
export const CustomSelect = styled.div`
    ${(props) => props.borderLeft ? "width: 50%;" : "width: 100%;" }
    padding: 5px;
    padding-left: 15px;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    color: black;
    justify-content: space-between;
    ${(props) => props.borderLeft ? "border-right: 1px solid #2A293933;" : "" }
    span {
        padding-left: 15px;
        color: #848484;
    }
    select {
        padding: 0 !important;
        cursor: pointer;
        width: 100% !important;
        border: 1px solid #FFF !important;
        outline: none !important;
    }
    input {
        padding: 0 !important;
    }
    ${breakpoints.md} {
        ${(props) => props.borderLeft ? "width: 100%;" : "width: 100%;" }
        ${(props) => props.borderLeft ? "border-right: 0px solid #2A293933;" : "" }
        padding-left: 5px;
        span {
            padding-left: 5px;
            color: #848484;
        }
        select{
            margin-left: 0px;
        }
    }
`;
export const BannerImg = styled.div`
    width: 98%;
    height: 500px;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    background: url("/banner-1.png");
    background-size: contain;
    background-position: bottom;
    background-repeat: no-repeat;
    ${breakpoints.md} {
        margin-top: 1rem;
        height: 200px;
        opacity: 0.8;
    }
`;
export const HeroSectionTwo = styled.section`
    background: white;
    text-align: center;
    padding: 80px 0 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-weight: 700;
        color: ${colors.textColor};
        font-size: 40px;
        line-height: 48px;
        span {
            color: ${colors.primaryColor};
        }
    }
    p {
        width: 50%;
        max-width: 600px;
        line-height: 25px;
        font-size: 17px;
        color: ${colors.textColor};
        margin-top: 20px;
    }
    ${breakpoints.md} {
        padding: 40px 15px 15px 15px;
        h1{
            font-size: 28px;
            line-height: 38px;
        }
        p{
            width: 98%;
        }
    }
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
    background: #fff;
    padding: 45px 0;
    overflow: hidden;
    ${breakpoints.md} {
        padding: 0;
    }
`;
export const WrapperThree = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
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
export const InfoCardM = styled.div`
    display: flex;
    align-items: center;
    padding: 60px 0;
    overflow: hidden;
    ${breakpoints.lg}{
        padding: 30px 15px; 
    }
    ${breakpoints.md} {
        display: none;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
    }
`;
export const InfoCardD = styled.div`
    display: flex;
    align-items: center;
    padding: 60px 0;
    overflow: hidden;
    ${breakpoints.lg}{
        padding: 30px 15px; 
    }
    ${breakpoints.md} {
        flex-direction: ${({$reverseColumn}) => $reverseColumn ? "column" : "column-reverse"};
        align-items: center;
        padding: 30px 0;
    }
`;
export const InfoCardMob = styled.div`
    display: none;
    align-items: center;
    padding: 60px 0;
    overflow: hidden;
    ${breakpoints.md} {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 15px;
        padding-top: 0;
    }
`;
export const Info = styled.div`
    width: 50%;
    max-width: 50%;
    ${props => props.leftP ? "padding-left: 50px;" : " padding-right: 50px;"}
    span {
        color: ${colors.primaryColor};
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
    }
    h1 {
        font-size: 40px;
        font-weight: 700;
        line-height: 48px;
        margin-top: 15px;
        color: ${colors.textColor};
    }
    p {
        margin-top: 15px;
        color: ${colors.textColor};
    }
    a {
        margin-top: 25px;
        display: inline-block;
        padding: 14px 30px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 600;
    }
    ul {
        list-style: disc;
        margin-left: 20px;
        p {
            margin-top: 0;
            margin-bottom: 10px;
        }
        li {
            span {
                font-weight: 600;
            }
        }
    }
    ${breakpoints.md} {
        display: none;
        text-align: left;
        width: 100%;
        max-width: 98%;
        padding: 10px;
        ${props => props.leftP ? "text-align: center;" : ""}
        h1 {
            font-size: 32px;
            margin-top: 15px;
        }
    }
`;
export const InfoD = styled.div`
    width: 50%;
    max-width: 50%;
    ${props => props.leftP ? "padding-left: 50px;" : " padding-right: 50px;"}
    span {
        color: ${colors.primaryColor};
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
    }
    h1 {
        font-size: 40px;
        font-weight: 700;
        line-height: 48px;
        margin-top: 15px;
        color: ${colors.textColor};
    }
    p {
        margin-top: 15px;
        color: ${colors.textColor};
    }
    a {
        margin-top: 25px;
        display: inline-block;
        padding: 14px 30px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 600;
    }
    ul {
        list-style: disc;
        margin-left: 20px;
        p {
            margin-top: 0;
            margin-bottom: 10px;
        }
        li {
            span {
                font-weight: 600;
            }
        }
    }
    ${breakpoints.md} {
        text-align: left;
        width: 100%;
        max-width: 98%;
        padding: 10px;
        h1 {
            font-size: 32px;
            margin-top: 15px;
        }
    }
`;
export const Infos = styled.div`
    width: 100%;
    max-width: 100%;
    span {
        color: ${colors.primaryColor};
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
    }
    h1 {
        font-size: 40px;
        font-weight: 700;
        line-height: 48px;
        margin-top: 15px;
        color: ${colors.textColor};
    }
    p {
        margin-top: 15px;
        color: ${colors.textColor};
    }
    a {
        margin-top: 25px;
        display: inline-block;
        padding: 14px 30px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 600;
    }
    ${breakpoints.md} {
        text-align: left;
        width: 100%;
        max-width: 98%;
        padding: 10px 0;
        ${props => props.leftP ? "text-align: center;" : ""}
        h1 {
            font-size: 28px;
            margin-top: 15px;
            line-height: 38px;
        }
    }
`;
export const ImageWrapper = styled.div`
    width: 50%;
    position: relative;
    height: 400px;
    ${breakpoints.md} {
        width: 100%;
    }
`;
export const NicheCard = styled.div`
    background: white;
    padding: 15px;
    overflow: hidden;
    height: 300px;
    width: 100%;
    min-width: 245px;
    max-width: 255px;
    position: relative;
    border-radius: 32px;
    position: relative;
    cursor: pointer;
    span {
        position: absolute;
        bottom: 20px;
        left: 20px;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
    }
    :hover{
        #anim {
            transform: scale(1.04);
        }
    }
    ${breakpoints.sm}{
        min-width: 145px;
        width: 90%;
        height: 200px;
    }
`;
export const ImgW1 = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition: .7s linear;
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
    ${breakpoints.lg}{
        padding: 40px 15px;
    }
`;
export const WrapperFour = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    text-align: center;
    h1 {
        font-weight: 700;
        font-size: 40px;
        span {
            color: ${colors.primaryColor};
        }
    }
    p {
        font-size: 16px;
        color: ${colors.textColor};
        width: 50%;
        // min-width: 100%;
        margin: 15px auto;
    }
    a {
        margin-top: 45px;
        display: inline-block;
        padding: 10px 30px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 600;
    }
    ${breakpoints.md}{
        h1{
            font-size: 28px;
            line-height: 42px;
        }
        p{
            width: 98%;
        }
    }
`;
export const WrapperFourD = styled.div`
    width: 100%;
    max-width: ${sizes.wrapperWidth};
    margin: 60px auto;
    text-align: center;
    h1 {
        font-weight: 700;
        font-size: 40px;
        span {
            color: ${colors.primaryColor};
        }
    }
    ${breakpoints.md}{
        display: ${(props) => props.$top ? "none" : "block"};
        h1{
            font-size: 28px;
            line-height: 42px;
        }
        p{
            width: 98%;
        }
    }
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
    background: ${(props) => props.isActive ? colors.primaryColor : "#fff"};
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
    background: #FDFAF5;
    ${breakpoints.md}{
        padding: 20px 0 30px 0;
    }
`;
export const WrapperFive = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    position: relative;
    margin: 0 auto;
    padding: 50px 0;
    #heading {
        text-transform: uppercase;
        color: ${colors.primaryColor};
        font-weight: 700;
        font-size: 14px;
    }
    h1 {
        font-size: 40px;
        font-weight: 700;
        width: 60%;
        min-width: 100%;
        color: ${colors.textColor};
    }
    ${breakpoints.lg} {
        padding: 30px 15px 20px 15px;
        h1 {
            font-size: 28px;
            min-width: 100%;
        }
    }
    ${breakpoints.md} {
        text-align: center;
        padding: 30px 15px 20px 15px;
        h1 {
            font-size: 28px;
            min-width: 100%;
        }
    }
    
`;
export const ReviewWrapper = styled.div`
    display: flex;
    overflow-y: scroll;
    column-gap: 100px;
    padding-top: 30px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;
export const ReviewCard = styled.div`
    width: calc(50% - 50px);
    min-width: calc(50% - 50px);
    border: 1px solid #EAEAEB;
    box-shadow: 0px 5px 14px 0px #080F340A;
    color: #333333;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    border-radius: 20px;
    background: #fff;
    h3 {
       font-size: 20px;
       font-weight: 600;
       color: ${colors.textColor};
    }
    p {
        font-size: 18px;
        color: #555461;
        margin-top: 10px;
    }
    ${breakpoints.md} {
        width: 100%;
        min-width: 100%;
    }
`;export const HeroSectionSix = styled.section`
    background: white;
    ${breakpoints.md}{
        padding: 20px 0 0px 0;
    }
`;
export const WrapperSix = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    h1 {
        font-size: 40px;
        font-weight: 700;
        width: 60%;
        min-width: 350px;
        color: ${colors.textColor};
        text-align: center;
    }
    p {
        font-size: 18px;
        width: 60%;
        min-width: 350px;
        color: #667085;
        text-align: center;
    }
    ${breakpoints.lg}{
        padding: 50px 15px; 
        h1{
            line-height: 48px;
        }
    }
    ${breakpoints.md} {
        padding: 20px 15px;
        h1 {
            font-size: 28px;
            width: 100% !important;
            line-height: 32px;
        }
         p {
            font-size: 16px;
            width: 80%;
            min-width: 100%;
            color: #667085;
            text-align: center;
        }
    }
    
`;
export const UserCard = styled.div`
    display: flex;
    padding-top: 20px;
    align-items: center;
    column-gap: 10px;
     p {
        font-size: 15px;
        color: #555461;
        margin-top: 0;
    }
`;
export const UserImage = styled.div`
    height: 64px;
    width: 64px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
`;
export const UserDetails = styled.div`
   h4 {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #170F49;
   }
   p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #6A6974;
   }
`;
export const FaqWrapper = styled.div`
    width: 60%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
     a {
        margin: 25px auto 0 auto;
        display: inline-block;
        padding: 14px 30px;
        text-align: center;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        font-weight: 600;
    }
    ${breakpoints.md} {
        width: 95%;
    }
`;
export const Faq = styled.div`
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #EAECF0;
    :last-of-type {
        border-bottom: none;
    }
`;
export const Question = styled.div`
    cursor: pointer;
    color: #101828;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 22px;
    margin-top: 15px;
    span:first-of-type {
        max-width: calc(100% - 25px);
    }
`;
export const Answer = styled.div`
    color: #667085;
    font-size: 15px;
`;
export const Banner = styled.div`
    position: relative;
    height: 270px;
    border-radius: 32px;
    overflow: hidden;
    width: 100%;
    margin: 25px 0;
    background: #2A2939;
    ::before {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-image: url("/banner-2.png");
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
    }
    div {
        z-index: 2;
        background: linear-gradient(89.77deg, #2A2939 35.86%, rgba(42, 41, 57, 0.5) 66.67%, rgba(42, 41, 57, 0) 99.8%);
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 40px;
        h2 {
            color: #fff;
            font-size: 38px;
            width: 40%;
            min-width: 100%;
        }
         a {
            margin-top: 25px;
            display: inline-block;
            padding: 14px 30px;
            width: 160px;
            text-align: center;
            border-radius: 8px;
            background: ${colors.primaryColor};
            color: #fff;
            font-weight: 600;
        }
    }
    ${breakpoints.md}{
        div{
            padding: 0;
            text-align: center;
            align-items: center;
            h2{
                text-align: center;
                font-size: 18px;
                width: 100%;
            }
            a{

            }
        }
    }
        
`;
