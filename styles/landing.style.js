import styled from "styled-components";

export const Container = styled.div`
    padding-top: 70px;
`;
export const Wrapper = styled.main`
    display: flex;
    width: 100%;
    position: relative;
`;
export const Content = styled.div`
    width: 100%;
    padding-left: ${(props) => props.isPadded ? "100px" : "0" };
`;
