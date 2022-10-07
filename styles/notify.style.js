import styled from "styled-components";
import { sizes } from "./theme";

export const Container = styled.div`
    background: url("/bg.png");
    background-size: cover;
    background-position: center;
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
`;