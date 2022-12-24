import styled from "styled-components";
import { breakpoints, colors } from "../../styles/theme";

export const Container = styled.div`
    width: 100px;
    max-width: 100px;
    min-width: 100px;
    position: fixed;
    row-gap: 3px;
    min-height: calc(100vh - 80px);
    background: #fff;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;
export const NavButton = styled.button`
    width: 90%;
    height: 80px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: ${(props) => props.isActive ? `${colors.primaryColor}11` : "transparent"};
    svg {
        color: ${colors.primaryColor};
        height: 28px;
        width: 28px;
        margin-bottom: 5px;
    }
    span {
        color: ${colors.primaryColor};
        font-size: 12px;
    }
    :hover {
        background: #f3f3f3;
    }
    ::after {
        content: "";
        display: ${(props) => props.isActive ? "block" : "none"};
        height: 4px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        position: absolute;
        bottom: 0;
        width: 60%;
        background: ${colors.primaryColor};
    }
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
    ${breakpoints.lg}{
        width: 50px;
        height: 50px;
        ::after {
            height: 12px;
            width: 12px;
            border: 2px solid #fff;
        }
    }
`;
export const InnerWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    height: 50px;
    width: 50px;
    ${breakpoints.lg}{
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }
`;
export const Status = styled.div`
    font-size: 10px;
    text-align: center;
    color: ${colors.primaryColor};
`;
