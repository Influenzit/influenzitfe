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
