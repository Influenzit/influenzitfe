import styled from "styled-components";
import { breakpoints, colors } from "../../styles/theme";

export const Container = styled.div`
    width: 350px;
    min-width: 350px;
    border-right: 1px solid #D2D2D2;
    height: 100%;
    max-height: 100%;
    background: #fff;
    ${breakpoints.md} {
        display: none;
    }
`;
export const Top = styled.div`
    padding: 20px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    h2 {
        color: #000;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
    }
`;
export const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 128px);
    max-height: calc(100% - 128px);
    overflow-y: scroll;
    scrollbar-color: ${colors.primaryColor} ${colors.primaryColor}11;

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.primaryColor};
    }
    ::-webkit-scrollbar {
        background-color: ${colors.primaryColor}11;
        width: 3px;
    }
`;
export const UserCard = styled.button`
   display: flex;
    border: none;
    background: ${({isActive}) => isActive ? "#FDF6F7" : "transparent"};
    width: 100%;
    height: 80px;
    min-height: 80px;
    padding: 2px 20px;
    align-items: center;
    border-bottom: 1px solid #D2D2D2;
    cursor: pointer;
`;
export const SearchContainer = styled.div`
    height: 40px;
    width: 100%;
    border-radius: 5px;
    background: #F5F8FA;
    display: flex;
    align-items: center;
    input {
        border: none;
        background: transparent;
        height: 100%;
        width: 100%;
        padding: 0 10px;
        outline: none;
        font-size: 15px;
    }
    button {
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        padding: 10px ;
    }
`;
export const ChatDetails = styled.div`
    width: 100%;
`;
export const ChatTop = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50%;
    align-items: center;
    width: 100%;
    padding: 5px 0;
    p {
        max-width: 190px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 600;
        line-height: 120%;
        color: #94949C;
        text-align: left;
    }
    p:first-of-type {
        font-size: 12px;
    }
    p:last-of-type {
        font-size: 10px;
    }
    span {
        width: 100px;
        min-width: 100px;
        font-size: 10px;
        text-align: right;
        line-height: 120%;
        color: #94949C;
    }
`;
export const ChatBottom = styled.div`
     display: flex;
    justify-content: space-between;
    height: 50%;
    align-items: center;
    p {
        /* */
        font-size: 12px;
        line-height: 120%;
        color: #8798AD;
        width: 100%;
        max-width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }
    #unread-count {
        padding: 3px 10px;
        color: white;
        background: #14A800;
        border-radius: 5px;
    }
    span {
        color: #94949C;
        font-size: 10px;
    }
    img {
        vertical-align: middle;
    }
`;
export const UserSect = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    ::after {
        height: 11px;
        width: 11px;
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
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
    overflow: hidden;
`;
export const OpenBtn = styled.button`
    outline: none;
    border: none;
    background: ${colors.primaryColor};
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    padding: 12px 20px;
    cursor: pointer;
`;
