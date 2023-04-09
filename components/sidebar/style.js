import styled from "styled-components";
import { breakpoints, colors } from "../../styles/theme";

export const Container = styled.div`
    width: 230px;
    max-width: 230px;
    min-width: 230px;
    position: fixed;
    row-gap: 3px;
    min-height: calc(100vh - 70px);
    max-height: calc(100vh - 70px);
    background: #fff;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    overflow-y: scroll;
    top: 70px;
    border-right: 1px solid #EAEAEB;
    :hover {
        scrollbar-color: ${colors.primaryColor} ${colors.primaryColor}11;

        ::-webkit-scrollbar-thumb {
            background-color: ${colors.primaryColor};
        }
        ::-webkit-scrollbar {
            background-color: ${colors.primaryColor}11;
            width: 3px;
        }
    }
    scrollbar-color: transparent transparent;

    ::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    ::-webkit-scrollbar {
        background-color: transparent;
        width: 3px;
    }
    ${breakpoints.sm}{
        position: fixed;
        left: ${(props) => props.showSidebar ? "0" : "-100px"};
        z-index: 90;
        top: 70px;
    }
`;
export const NavButton = styled.button`
    width: 90%;
    height: 40px;
    min-height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 15px;
    column-gap: 10px;
    position: relative;
    font-weight: 500;
    background: ${(props) => props.isActive ? `${colors.textColor}` : "transparent"};
    svg {
        color: ${(props) => props.isActive ? "#fff" : colors.textColor};
        height: 15px;
        width: 15px;
    }
    span {
        color: ${(props) => props.isActive ? "#fff" : colors.textColor};
        font-size: 14px;
    }
    :hover {
        background: ${(props) => !props.isActive && `${colors.textColor}11`};
    }
    /* ::after {
        content: "";
        display: ${(props) => props.isActive ? "block" : "none"};
        height: 2px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        position: absolute;
        bottom: 0;
        width: 60%;
        background: ${colors.primaryColor};
    } */
`;
export const ProfileImageCont = styled.div`
    margin-bottom: 5px;
    height: 50px;
    width: 50px;
    position: relative;
    ::after {
        height: 12px;
        width: 12px;
        display: block;
        content: "";
        position: absolute;
        bottom: 2px;
        right: 4px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #14A800;
    }
    /* ${breakpoints.lg}{
        width: 50px;
        height: 50px;
        ::after {
            height: 12px;
            width: 12px;
            border: 2px solid #fff;
        }
    } */
`;
export const InnerWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    height: 50px;
    width: 50px;
    ${breakpoints.lg}{
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }
`;
export const Status = styled.div`
    font-size: 10px;
    text-align: center;
    color: ${colors.primaryColor};
`;
