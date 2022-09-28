import styled from "styled-components";
import { colors, sizes } from "./theme";

export const HeroSectionTwo = styled.section`
`;
export const Wrapper = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
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
    justify-content: space-between;
    row-gap: 30px;
`;
export const EbookCard = styled.div`
    width: 31%;
    max-width: 31%;
    max-width: 387px;
    min-width: 300px;
    text-align: center;
    background: #f8f8f8;
    box-shadow: 0 0 10px #88888840;
    h4 {
        font-size: 20px;
        margin: 15px 0;
    }
    a {
        display: inline-block;
        margin: 20px 0;
        background: ${colors.primaryColor};
        color: white;
        border-radius: 5px;
        padding: 10px 30px;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
    }
`;
export const ImgSect = styled.div`
    position: relative;
    height: 200px;
`;
