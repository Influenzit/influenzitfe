import styled from "styled-components";
import { breakpoints } from "../../styles/theme";

export const Wrapper = styled.div`
    width: 300px;
    height: calc(100vh - 130px);
    max-height: calc(100vh - 130px);
    position: sticky;
    top: 90px;
    transition: .3s ease-in-out;
    ${breakpoints.lg}{
        width: 80px;
        min-width: 80px;
    }
    ${breakpoints.md}{
        position: fixed;
        z-index: 99;
        left: ${(props) => props.show ? "0px" : "-81px"};
    }
`;
export const Container = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    background: #fff;
    border: 1px solid #D2D2D2;
    border-radius: 5px;
    min-width: 300px;
    ${breakpoints.lg}{
        width: 100%;
        min-width: 100%;
    }
`;
export const ToggleBtn = styled.button`
    border: none;
    position: absolute;
    right: -28px;
    border: 1px solid #D2D2D2;
    top: 10px;
    display: none;
    border-left: none;
    z-index: 100;
    width: 30px;
    height: 30px;
    top: 0;
    background: #fff;
    cursor: pointer;
    ${breakpoints.md}{
        display: block;
    }
`;
export const InnerWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    height: 100px;
    width: 100px;
    ${breakpoints.lg}{
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }
`;
export const ProfileImageCont = styled.div`
    margin-bottom: 20px;
    height: 100px;
    width: 100px;
    position: relative;
    ::after {
        height: 20px;
        width: 20px;
        display: block;
        content: "";
        position: absolute;
        bottom: 2px;
        right: 4px;
        border-radius: 50%;
        border: 4px solid #fff;
        background: #14A800;
    }
    ${breakpoints.lg}{
        width: 60px;
        height: 60px;
        ::after {
            height: 12px;
            width: 12px;
            border: 2px solid #fff;
        }
    }
`;
export const Top = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    h2 {
        font-size: 22px;
        max-width: 260px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    p {
        font-size: 15px;
        color: #333;
    }
    ${breakpoints.lg}{
        h2, p {
            display: none;
        }
    }
`;
export const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    button {
        border: none;
        cursor: pointer;
        background: white;
        display: flex;
        justify-content: left;
        padding: 15px 20px;
        border-bottom: 1px solid #D2D2D2;
        font-size: 15px;
        align-items: center;
        span {
            padding-left: 15px;
        }
        :last-of-type {
            border: none;
            color: red;
        }
    }
    ${breakpoints.lg}{
        button {
            padding: 15px 10px;
            flex-direction: column;
            span {
                padding-left: 0;
                font-size: 11px;
                padding-top: 4px;
            }
            :last-of-type {
                border: none;
                color: red;
            }
        }
    }
`;
