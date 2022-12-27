import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    background: #F7FAFC;
    padding: 20px 0;
`;
export const Wrapper = styled.div`
    max-width: ${sizes.wrapperWidth};
    width: 98%;
    margin: 0 auto;
    height: calc(100vh - 180px);
    overflow: hidden;
    max-height: calc(100vh - 180px);
    background: #FFFFFF;
    min-height: 480px;
    border-radius: 5px;
    display: flex;
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
export const HLeft = styled.div`
    h2 {
        font-size: 20px;
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
    height: calc(100% - 170px);
    min-height: calc(100% - 220px);
    max-height: calc(100% - 170px);
    overflow-y: scroll;
`;
export const Editor = styled.div`
    height: 100px;
    padding: 0 30px;
    max-height: 100px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #D2D2D2;
    position: relative;
`;
export const MessageInput = styled.div`
    outline: none;
    height: 50%;
    position: relative;
    max-height: 50%;
    overflow-y: scroll;
    cursor: text;
    padding: 10px 0;
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
`;
export const ChatControls = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 50%;

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
`;
export const PickerContainer = styled.div`
    position: absolute;
    left: 20px;
    top: -300px;
    z-index: 99;

`;
