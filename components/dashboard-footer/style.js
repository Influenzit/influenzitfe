import styled from "styled-components";
import { breakpoints, colors, sizes } from "../../styles/theme";

export const Container = styled.div`
`;
export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    padding-left: 200px;
    font-size: 14px;
    margin: 0 auto;
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    a {
        padding-left: 15px;
        :hover {
            color: ${colors.primaryColor}
        }
    }
    ${breakpoints.md}{
        font-size: 14px;
        flex-direction: column-reverse;
        row-gap: 10px;
        align-items: center;
        padding-left: 0;
        a:first-of-type{
            padding-left: 0;
        }
    }
`;
