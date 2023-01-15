import Link from "next/link";
import styled from "styled-components";
import { breakpoints, colors, sizes } from "../../styles/theme";

export const Container = styled.nav`
    height: 70px;
    background: white;
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    z-index: 9999;
    box-shadow: 0 0 8px #ddd;
`;
export const Wrapper = styled.div`
    width: 98%;
    height: 100%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;
export const Logo = styled(Link)`
    img {
        cursor: pointer;
    }
`;
export const Right = styled.div`
    display: flex;
    align-items: center;
`;
export const NavLinks = styled.div`
    padding: 0 15px;
    display: ${(props) => props.show ? "none" : "flex"};
    a {
        text-decoration: none;
        padding-right: 15px;
        color: #111;
        :hover {
            color: ${colors.primaryColor};
        }
    }
    ${breakpoints.lg} {
        display: ${(props) => props.show ? "flex" : "none"};
        flex-direction: column;
        a {
            padding: 10px;
            display: flex;
            align-items: center;
        }
        span {
            margin-left: 10px;
        }
    }
`;
export const Controls = styled.div`
    display: flex;
    align-items: center;
`;
export const SearchBtn = styled.button`
    padding: 7px 15px;
    margin-right: 15px;
    background: transparent;
    border: none;
    ${breakpoints.lg} {
        padding: 7px 5px;
        margin-right: 5px;
    }
`;
export const LoginBtn = styled.a`
    color: ${colors.primaryColor};
    border: 2px solid ${colors.primaryColor};
    border-radius: 4px;
    background: white;
    text-decoration: none;
    padding: 10px 20px;
    transition: .5s ease;
    :hover {
        background: ${colors.primaryColor};
        color: white;
    }
    ${breakpoints.lg} {
        font-size: 14px;
        padding: 7px 14px;
    }
    ${breakpoints.sm} {
        font-size: 12px;
        padding: 7px 8px;
    }
`;
export const GetStartedBtn = styled.a`
    color: white;
    border: 2px solid ${colors.primaryColor};
    border-radius: 4px;
    background: ${colors.primaryColor};
    text-decoration: none;
    padding: 10px 20px;
    margin-left: 20px;
    transition: .5s ease;
    :hover {
        background: white;
        color: ${colors.primaryColor};
    }
    ${breakpoints.lg} {
        font-size: 14px;
        padding: 7px 14px;
        margin-left: 10px;
    }
    ${breakpoints.sm} {
        font-size: 12px;
        padding: 7px 8px;
        margin-left: 8px;
    }
`;
export const SearchContainer = styled.div`
    border: 1px solid #D2D2D2;
    background: #fafafa;
    width: 100%;
    max-width: 600px;
    height: 44px;
    display: flex;
    align-items: center;
    input {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        height: 100%;
        font-size: 15px;
        padding-left: 10px;
    }
    button {
        background: transparent;
        cursor: pointer;
        border: none;
        font-size: 15px;
    }
    ${breakpoints.lg} {
        position: absolute;
        display: ${(props) => props.showSearch ? "flex" : "none"};
        top: 70px;
        width: 100vw;
        max-width: 100vw;
        left: -1%;
    }
`;
export const SearchBtnResponsive = styled.button`
    background: transparent;
    cursor: pointer;
    border: none;
    font-size: 15px;
    display: none;
    margin: 0 10px;
    ${breakpoints.lg} {
        display: block;
    }
`;
export const SearchByBtn = styled.div`
    padding: 0 10px;
    width: 160px;
    min-width: 140px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid #D2D2D2 !important;
    position: relative;
    cursor: pointer;
`;
export const SearchByOption = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    top: 45px;
    background: #fff;
    display: flex;
    flex-direction: column;
    color: #111;
    box-shadow: 0px 4px 12px 0px #0000001A;
    border: 1px solid #D2D2D2;
    border-radius: 2px;
    button {
        height: 40px;
        :hover {
            background: #fafafa;
        }
    }
`;
export const SearchBtnC = styled.button`
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
`;
export const ConnectDropdown = styled.div`
    border: none;
    background: #fff;
    padding: 0 10px;
    width: 100px;
    min-width: 100px;
    display: flex;
    height: 40px;
    align-items: center;
    position: relative;
    margin-left: 15px;
    font-size: 15px;
    cursor: pointer;
    span {
        padding-right: 10px;
    }
    
    ${breakpoints.sm} {
        width: 50px;
        font-size: 12px;
        min-width: 50px;
        margin-left: 0;
    }
    ${breakpoints.lg} {
        display: ${(props) => props.show ? "flex" : "none"};
    }
    ${breakpoints.sm} {
        #span-current:first-of-type {
            display: none;
        }
    }
`;
export const ConnectDropdownCont = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    min-width: 160px;
    top: 45px;
    background: #fff;
    display: flex;
    flex-direction: column;
    color: #111;
    box-shadow: 0px 4px 12px 0px #0000001A;
    border: 1px solid #D2D2D2;
    border-radius: 2px;
    button {
        background: transparent;
        border: none;
        cursor: pointer;
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        span {
            display: inline-block;
            padding-left: 10px;
        }
        :hover {
            color: ${colors.primaryColor};
        }
        ${breakpoints.sm} {
            font-size: 12px;
        }
    }
    a {
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        span {
            display: inline-block;
            padding-left: 10px;
        }
        :hover {
            color: ${colors.primaryColor};
        }
        ${breakpoints.sm} {
            font-size: 12px;
        }
    }
    ::after {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        transform: rotate(-45deg);
        position: absolute;
        top: -6px;
        right: 72px;
        background: #fff;
        border-top: 1px solid #D2D2D2;
        border-right: 1px solid #D2D2D2;
    }
`;
export const SwitchDropdownCont = styled.div`
    position: absolute;
    right: 0;
    width: 200px;
    min-width: 160px;
    top: 40px;
    background: #fff;
    display: flex;
    flex-direction: column;
    color: #111;
    box-shadow: 0px 4px 12px 0px #0000001A;
    border: 1px solid #D2D2D2;
    border-radius: 2px;
    button {
        background: transparent;
        border: none;
        cursor: pointer;
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        span {
            display: inline-block;
            padding-left: 10px;
        }
        :hover {
            color: ${colors.primaryColor};
        }
        ${breakpoints.sm} {
            font-size: 12px;
        }
    }
    a {
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        span {
            display: inline-block;
            padding-left: 10px;
        }
        :hover {
            color: ${colors.primaryColor};
        }
        ${breakpoints.sm} {
            font-size: 12px;
        }
    }
    ::after {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        transform: rotate(-45deg);
        position: absolute;
        top: -6px;
        right: 10px;
        background: #fff;
        border-top: 1px solid #D2D2D2;
        border-right: 1px solid #D2D2D2;
    }
`;
export const ControlsA = styled.div`
    display: flex;
    align-items: center;
    a {
        padding: 0 10px;
        position: relative;
        display: flex;
        align-items: center;
        ::after {
            content: "";
            display: block;
            height: 6px;
            width: 6px;
            background: red;
            border-radius: 50%;
            position: absolute;
            top: -4px;
            right: 3px;
        }
        ${breakpoints.sm} {
            padding: 0 5px;
            svg {
                height: 22px;
            }
        }
    }
    #bell-icon {
        ::after {
            display: ${(props) => props.showNotify ? "block" : "none"};
        }
    }
    #mail-icon {
        ::after {
            display: ${(props) => props.showMessage ? "block" : "none"};
        }
    }
`;
export const UserBtn = styled.div`
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0 0 15px;
    ::after {
        height: 11px;
        width: 11px;
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        right: 0px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #14A800;
        ${breakpoints.sm} {
            height: 8px;
            width: 8px;
            right: 3px;
            bottom: 1px;
        }
    }
    ${breakpoints.sm} {
        padding: 5px;
    }
`;
export const ProfilePicWrapper = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    ${breakpoints.sm} {
        height: 30px;
        width: 30px;
    }
`;
export const UserDropdown = styled.div`
    position: absolute;
    right: 0px;
    width: 100%;
    top: 50px;
    width: 150px;
    background: #fff;
    display: flex;
    flex-direction: column;
    color: #111;
    box-shadow: 0px 4px 12px 0px #0000001A;
    border: 1px solid #D2D2D2;
    border-radius: 2px;
    button {
        border: none;
        background: #fff;
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        span {
            display: inline-block;
            padding-left: 10px;
        }
        :hover {
            color: ${colors.primaryColor};
        }
        :last-child {
            color: red;
            :hover{
                color: red;
            }
        }
        ${breakpoints.sm} {
            font-size: 12px;
        }
    }
    ::after {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        transform: rotate(-45deg);
        position: absolute;
        top: -6px;
        right: 10px;
        background: #fff;
        border-top: 1px solid #D2D2D2;
        border-right: 1px solid #D2D2D2;
    }
    ${breakpoints.md}{
        right: 0;
    }
`;
export const SidebarBtn = styled.button`
    background: transparent;
    border: none;
    display: none;
    cursor: pointer;
    margin: 0 15px 0 2px;
    ${breakpoints.sm} {
        display: block;
        height: 29px;
        width: 29px;
    }
`;
export const ResponsiveNav = styled.div`
    position: absolute;
    top: 70px;
    max-height: calc(100vh - 70px);
    width: 100%;
    background: #fff;
    max-width: 300px;
    padding: 15px 0;
    right: ${(props) => props.show ? "-1%" : "-101%" };
    transition: linear .3s;
`;
export const PricingContainer = styled.div`
    display: flex;
    max-width: 100%;
    border: 1px solid #ccc;
    background: #f8f8f8;
`;
export const TitleColumn = styled.div`
    width: 15%;
    max-width: 15%;
    font-size: 15px;
    border-right: 1px solid #ccc;
    #heading-cell {
        height: 160px;
        align-items: flex-start;
    }
`;
export const HeadingCell = styled.div`
    border-bottom: 1px solid #ccc;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px;
    font-weight: 600;
    font-size: 15px;
    span {
        width: 100%;
        text-align: center;
    }
`;
export const InputCell = styled.div`
    padding: 5px;
    border-bottom: 1px solid #ccc;
    max-height: 160px;
    textarea {
        width: 100%;
        height: 150px;
        outline: none;
        border: none;
        background: #fff;
        resize: none;
        border-radius: 5px;
        font-size: 15px;
        padding: 5px;
    }
    input {
        width: 100%;
        height: 39px;
        outline: none;
        border: none;
        background: #fff;
        resize: none;
        border-radius: 5px;
        font-size: 15px;
        padding: 5px;
    }
`;
export const PackageColumn = styled.div`
     width: calc(85% / 3);
     max-width: calc(85% / 3);
     min-width: calc(85% / 3);
     border-right: 1px solid #ccc;
     :last-of-type {
        border-right: none;
     }
`;
export const SubHeadingCell = styled.div`
    border-bottom: 1px solid #ccc;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 15px;
    span {
        width: 100%;
        text-align: center;
    }
`;
export const FeatureCell = styled.div`
    padding: 5px;
    position: relative;
    display: flex;
    align-items: center;
    input {
        width: 100%;
        border: none;
        outline: none;
        width: 100%;
        border-radius: 5px;
        background: #fff;
        height: 40px;
        padding: 5px;
    }
    button {
        border: none;
        background: transparent;
        position: absolute;
        right: 15px;
        display: none;
        cursor: pointer;
    }
    :hover button {
        display: block;
    }
`;
export const AddFeatureBtn = styled.button`
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    padding: 5px;
    height: 40px;
    align-items: center;
    font-size: 15px;
    margin-bottom: 15px;
    span {
        padding-left: 10px;
        color: ${colors.primaryColor};
    }
`;
export const SwitchBtn = styled.div`
    height: 35px;
    width: 35px;
    min-width: 35px;
    background: #eee;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    margin-left: 12px;
`;
