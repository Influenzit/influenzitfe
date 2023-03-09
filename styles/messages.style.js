import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    background: #F7FAFC;
`;
export const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    height: calc(100vh - 70px);
    overflow: hidden;
    max-height: calc(100vh - 70px);
    background: #FFFFFF;
    min-height: 480px;
    border-radius: 5px;
    display: flex;
    margin-top: 70px;
`;
export const MessageSection = styled.div`
    width: 100%;
`;
export const NonSelectedCont = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        font-size: 24px;
        color: #111;
        font-weight: 500;
    }
    p {
        font-size: 14px;
        color: #333;
        text-align: center;
    }
`;
export const ImageWrapper = styled.div`
    height: 70%;
    width: 80%;
    position: relative;
`;
export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #F9FAFB;
`;
export const ChatHeader = styled.div`
    height: 70px;
    min-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    border-bottom: 1px solid #D2D2D2;
`;
export const CloseBtn = styled.button`
    background: transparent;
    outline: none;
    border: none;
    color: red;
    cursor: pointer;
`;
export const HLeft = styled.div`
    h2 {
        font-size: 20px;
        ${breakpoints.md} {
            font-size: 16px;
        }
    }
    p {
        font-size: 12px;
        color: rgba(0,0,0, 0.5);
    }
`;
export const ContextBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F6F6F6;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    cursor: pointer;
`;
export const MessagesCont = styled.div`
    height: calc(100% - 110px);
    min-height: calc(100% - 110px);
    max-height: calc(100% - 110px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
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
`;
export const MessageCard = styled.div`
    display: flex;
    padding: 12px 10px;
    display: flex;
    column-gap: 10px;
    border-radius: 20px;
    margin:  10px 20px;
`;
export const MessageContent = styled.div`
    h2 {
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;
        color: #2E384D;
        span {
            font-weight: 500;
            font-size: 10px;
            color: #94949C;
            line-height: 120%;
            margin-left: 10px;
        }
    }
    div {
        img {
            vertical-align: middle;
        }
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        color: #555461;
    }
`;
export const Editor = styled.div`
    height: 100px;
    max-height: 100px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #EAEAEB;
    border-radius: 16px;
    width: 95%;
    margin: 0 auto;
    position: relative;
`;
export const MessageInput = styled.div`
    outline: none;
    height: 100%;
    position: relative;
    overflow-y: scroll;
    cursor: text;
    padding: 10px 0;
    font-size: 14px;
    color: #94949C;
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
    ::before {
        content: attr(data-placeholder);
        display: ${(props) => !props.showPlaceholder ? "block": "none"};
        position: absolute;
        left: 0;
        top: 0;
        padding-top: 10px;
        color: #949494;
        font-size: 16px;
    }
    img {
        vertical-align: middle;
    }
`;
export const ChatControls = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 30%;
    padding: 0 15px;
`;
export const LeftControls = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;
export const RightControls = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;
export const EditorBtn = styled.button`
    border: none;
    outline: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    color: #949494;
    display: flex;
    align-items: center;
    :hover {
        color: ${colors.primaryColor};
    }
`;
export const ActionBtn = styled.button`
    border: none;
    outline: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 120%;
    display: flex;
    align-items: center;
    column-gap: 5px;
`;
export const PickerContainer = styled.div`
    position: absolute;
    left: 20px;
    top: -300px;
    z-index: 99;

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
