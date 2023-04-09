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
    min-height: 128px;
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
    border-radius: 8px;
    background: #F9FAFB;
    display: flex;
    align-items: center;
    margin-top: 15px;
    input {
        border: none;
        background: transparent;
        height: 100%;
        width: 100%;
        padding: 0 10px;
        outline: none;
        font-size: 14px;
        color: #6A6974;
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
    padding-left: 14px;
`;
export const ChatTop = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50%;
    align-items: center;
    width: 100%;
    padding: 5px 0;
    p {
        width: 100%;
        max-width: 190px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;
        color: #2E384D;
        text-align: left;
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
    img {
        vertical-align: middle;
        display: inline;
    }
`;
export const UserSect = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    ::after {
        height: 8px;
        width: 8px;
        display: block;
        content: "";
        position: absolute;
        top: -4px;
        right: 5px;
        border-radius: 50%;
        background: ${colors.primaryColor};
    }
`;
export const ProfilePicWrapper = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
`;
