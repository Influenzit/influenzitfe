import Link from "next/link";
import styled from "styled-components";
import { colors, sizes } from "../../styles/theme";

export const Container = styled.nav`
    height: 70px;
    background: white;
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    z-index: 99999;
    box-shadow: 0 0 10px #ccc;
`;
export const Wrapper = styled.div`
    width: 98%;
    height: 100%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    a {
        text-decoration: none;
        padding-right: 15px;
        color: #111;
        :hover {
            color: ${colors.primaryColor};
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
    border-right: 1px solid #D2D2D2;
    border-left: 1px solid #D2D2D2;
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
    width: 160px;
    min-width: 160px;
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-left: 15px;
    font-size: 15px;
    cursor: pointer;
`;
export const ConnectDropdownCont = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    top: 40px;
    background: #fff;
    display: flex;
    flex-direction: column;
    color: #111;
    box-shadow: 0px 4px 12px 0px #0000001A;
    border: 1px solid #D2D2D2;
    border-radius: 2px;
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
    }
`;
export const UserBtn = styled.div`
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    ::after {
        height: 11px;
        width: 11px;
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        right: 18px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #14A800;
    }
`;
export const ProfilePicWrapper = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
`;
export const UserDropdown = styled.div`
    position: absolute;
    right: 15px;
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
