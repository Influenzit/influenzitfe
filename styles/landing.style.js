import styled from "styled-components";
import { breakpoints } from "./theme";

export const Container = styled.div`
`;
export const Wrapper = styled.main`
    display: flex;
    width: 100%;
    position: relative;
`;
export const Content = styled.div`
    width: 100%;
    padding-left: ${(props) => props.isPadded ? "230px" : "0" };
    ${breakpoints.md} {
        padding-left: 0;
    }
`;
export const NetworkModal = styled.div`
    width: 100vw;
    height: 25px;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({status}) => status ? "#4BB543" : "#808080"};
    z-index: 9999999;
    span {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
    }
`;
