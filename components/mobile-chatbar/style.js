import styled from "styled-components";
import { breakpoints, colors } from "../../styles/theme";

export const Container = styled.div`
    display: none;
    overflow-x: scroll;
    border: 1px solid #ddd;
    margin: 5px 5px;
    padding: 5px;
    border-radius: 8px;
    background: #fff;
    ${breakpoints.md} {
        display: flex;
    }
`;
export const UserCard = styled.button`
    border: none;
    background: transparent;
    width: 60px;
    min-width: 60px;
    padding: 2px 0;
    border-right: 1px solid #D2D2D2;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :last-of-type {
        border-right: none;
    }
`;
export const ProfilePicWrapper = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
`;
export const ChatCount = styled.div`
    position: absolute;
    top: 0;
    right: 5px;
    background: ${colors.primaryColor};
    font-size: 10px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    color: #fff;
`;
export const ChatTitle = styled.p`
    padding: 2px;
    font-size: 9px;
    color: #555;
`;
