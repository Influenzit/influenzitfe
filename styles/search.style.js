import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 150px);
    background: #faf9fb;
    padding: 25px 0;
    // padding-top: 100px;
`;
export const Section = styled.div`
    background: linear-gradient(179.76deg, #FDF8F1 3.31%, #F0C3C9 237.13%);
`;
export const TopBanner = styled.div`
    width: 98%;
    padding: 120px 0 70px 0;
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
        font-weight: 800;
        margin-bottom: -20px;
        line-height: 58px;
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
    ${breakpoints.lg} {
        max-width: 98%;
    }
    ${breakpoints.md} {
        height: auto;
        h1 {
            font-size: 38px;
            min-width: 100%;
            line-height: 42px;
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
            margin-top: 30px;
            font-size: 14px;
            // box-shadow: 0px 5px 10px 5px #FFF;
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
        h1 {
            font-size: 28px;
            min-width: 95%;
            line-height: 38px;
        }
    }
`;
export const Wrapper = styled.div`
    max-width: ${sizes.wrapperWidth};
    width: 98%;
    margin: 0 auto;
`;
export const Content = styled.div`
    border-radius: 5px;
`;
export const Top = styled.div`
    padding: 15px 20px;
    border-bottom: 1px solid #D2D2D2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${breakpoints.md} {
        flex-direction: column;
        row-gap: 15px;
    }
    h2 {
        color: #555;
        font-size: 18px;
    }
`;
export const Tabs = styled.div`
`;
export const Tab = styled.button`
    padding: 12px 30px;
    border-radius: 3px;
    font-size: 15px;
    font-weight: 500;
    color: ${(prop) => prop.isActive ? colors.primaryColor : "#111"};
    border: 1px solid ${(prop) => prop.isActive ? colors.primaryColor : "#D2D2D2"};
    background: ${(prop) => prop.isActive ? "#f6f6f6" : "#fff"};
    margin-left: 15px;
    cursor: pointer;
`;
export const Bottom = styled.div`
    padding: 20px 0;
`;
export const Filter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    p {
        color: #111;
        font-size: 15px;
        font-weight: 600;

    }
    p#explore_pagenumber {
       font-weight: 500;
       font-size: 18px;
       color: #555461;
    }
    div {
        display: flex;
        align-items: center;
        select {
            padding: 10px;
            border: 1px solid #D2D2D2;
            border-radius: 3px;
            margin-left: 10px;
            background: #fff;
        }
    }
    button {
        background: transparent;
        border: 2px solid ${colors.textColor};
        color: ${colors.textColor};
        font-size: 14px;
        padding: 7px 10px;
        border-radius: 99px;
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
            padding-left: 10px;
        }
    }
`;
export const ListWrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    column-gap: 29.25px;
    row-gap: 20px;
    flex-wrap: wrap;
`;
export const Pages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
`;
export const PageBtn = styled.button`
    height: 36px;
    width: 36px;
    border-radius: 3px;
    border: 1px solid #D2D2D2;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    cursor: pointer;
    margin: 0 4px;
    transition: .3s ease;
    :hover {
        background: #F6F6F6;
    }
`;
export const ViewMoreBtn = styled.button`
    border: none;
    background: transparent;
    color: ${colors.primaryColor};
    font-size: 16px;
    cursor: pointer;
    padding: 8px 15px;
    border: 5px;
    background: ${colors.primaryColor}11;
`;
export const CategoryWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
    row-gap: 10px;
    margin-top: 30px;
    ${breakpoints.lg}{
        align-items: center;
        justify-content: center;
    }
`;
export const Category = styled.button`
    border-radius: 999px;
    border: 2px solid ${colors.textColor};
    padding: 10px 20px;
    background: transparent;
    color: ${colors.textColor};
    transition: .3s ease-in-out;
    cursor: pointer;
    :hover {
        background: ${colors.textColor};
        color: #fff;
    }
    ${breakpoints.md}{
        padding: 5px 10px;
    }
`;
export const ViewMore = styled.div`
    height: 300px;
    background: url("/view-more.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: linear-gradient(180deg, #F9FAFB 0%, rgba(249, 250, 251, 0.795955) 23.74%, #F9FAFB 49.4%);
        height: 100%;
        width: 100%;
        h1 {
            font-weight: 700;
            color: ${colors.textColor};
            font-size: 35px;
        }
        p {
            font-size: 17px;
            color: ${colors.textColor};
        }
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
    ${breakpoints.md}{
        div{
            text-align: center;
            padding: 20px 20px;
            h1{
                font-size: 28px;
                line-height: 38px;
            }
        }
    }
`;
