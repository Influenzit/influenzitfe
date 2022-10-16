import styled from "styled-components";
import { sizes } from "./theme";

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
