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
    ${breakpoints.sm} {
        padding-left: 0;
    }
`;
