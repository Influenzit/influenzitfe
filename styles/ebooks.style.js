import styled from "styled-components";
import { colors, sizes, breakpoints } from "./theme";

export const HeroSectionTwo = styled.section`
`;
export const Wrapper = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 80px auto 20px auto;
    padding: 40px 0;
    h3 {
        font-size: 30px;
        font-weight: 400;
        margin-bottom: 40px;
    }
`;
export const EbookWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
`;
export const EbookCard = styled.div`
    max-width: 260px;
    min-width: 260px;
    width: 23%;
    text-align: center;
    background: #f8f8f8;
    box-shadow: 0 0 10px #88888840;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div:last-of-type {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    div:first-of-type {
        min-height: 50%;
        min-width: 100%;
    }
    h4 {
        font-size: 18px;
        margin: 15px 0;
    }
    a {
        display: inline-block;
        margin: 20px 0;
        background: ${colors.primaryColor};
        color: white;
        border-radius: 5px;
        padding: 10px 30px;
        max-width: 120px;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
    }
    ${breakpoints.sm} {
        margin: 0 auto;
    }
`;
export const ImgSect = styled.div`
    position: relative;
    height: 200px;
`;
export const Container = styled.div`
    iframe {
        width: 100%;
        height: calc(100vh - 100px);
    }
`;
