import styled from "styled-components";
import { sizes } from "./theme";

export const Container = styled.div`
    background: #E5E5E5;
    padding: 50px 0;
    min-height: calc(100vh - 140px);
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    h1 {
        font-size: 24px;
        color: #111;
        margin: 20px 0;
        font-weight: 500;
    }
    h2 {
        font-size: 20px;
        font-weight: 400;
    }
`;
export const NotificationWrapper = styled.div`
`;
export const Notify = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #D2D2D2;
    padding: 20px 30px;
    :last-of-type {
        border-bottom: none;
    }
    button {
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
    }
`;
export const ImgWrapper = styled.div`
    display: flex;
    align-items: center;
`;
export const NotifyContent = styled.div`
    width: 100%;
    padding: 0 20px;
    p {
        font-size: 15px;
    }
`;
export const Top = styled.div`
    padding: 15px 20px;
    border-bottom: 1px solid #D2D2D2;
    color: #333;
    h3 {
        font-weight: 400;
    }
`;
export const Bottom = styled.div`
    padding: 10px 0px;
`;
