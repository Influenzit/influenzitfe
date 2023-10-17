import styled from "styled-components"
import { colors } from "../../styles/theme"
export const Container = styled.div`
    display: flex;
    justify-content: right;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    height: 100vh;
    width: 100vw;
    z-index: 9999999;
`;
export const Modal = styled.div`
    width: 100%;
    max-width: 360px;
    padding: 20px;
    background: #fff;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: scroll;
    position: relative;
    .close {
        position: absolute;
        top: 25px;
        right: 30px;
    }
    .clear {
        background: transparent;
        border: 2px solid ${colors.textColor};
        color: ${colors.textColor};
        font-size: 14px;
        padding: 7px 10px;
        border-radius: 99px;
        display: inline-flex;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
        span {
            padding-left: 10px;
        }
        :hover {
            color: ${colors.primaryColor};
            border: 2px solid ${colors.primaryColor};
        }
    }
    h2 {
        font-weight: 600;
        font-size: 20px;
        color: #101828;
        margin-bottom: 20px;
    }
`;
