import styled from "styled-components";

export const Container = styled.div`
    width: 350px;
    min-width: 350px;
    border-right: 1px solid #D2D2D2;
    height: 100%;
    max-height: 100%;
    background: #fff;
`;
export const Top = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D2D2D2;
    min-height: 128px;
    h2 {
        color: #111;
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        font-weight: 400;
    }
`;
export const Bottom = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 128px);
    max-height: calc(100% - 128px);
    overflow-y: scroll;
`;
export const UserCard = styled.button`
    display: flex;
    border: none;
    background: transparent;
    width: 100%;
    height: 80px;
    min-height: 80px;
    padding: 2px 0;
    align-items: center;
    border-bottom: 1px solid #D2D2D2;
    cursor: pointer;
    :last-of-type {
        border-bottom: none;
    }
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
        font-size: 16px;
        color: #111;
        text-align: left;
    }
    span {
        width: 100px;
        min-width: 100px;
        color: rgba(0,0,0,0.5);
        font-size: 12px;
        text-align: right;
    }
`;
export const ChatBottom = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50%;
    align-items: center;
    p {
        font-size: 14px;
        ${(props) => props.isUnread && "font-weight: 600;"}
        color: #111;
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
