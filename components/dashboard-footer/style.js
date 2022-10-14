import styled from "styled-components";
import { colors, sizes } from "../../styles/theme";

export const Container = styled.div`
`;
export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 14pxu;
    margin: 0 auto;
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    a {
        padding-left: 15px;
        :hover {
            color: ${colors.primaryColor}
        }
    }
`;
