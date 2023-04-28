import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    padding: 100px 0 40px 0;
    width: 100%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    h2 {
        font-weight: 600;
        font-size: 20px;
        margin-top: 15px;
    }
    p {
        margin-top: 10px;
    }
    iframe {
        width: 90%;
        margin: 0 auto;
        height: 80vh;
        min-height: 500px;
        border: none;
        font-family: "Figtree", sans-serif;
        a {
            color: ${colors.primaryColor} !important;
            text-decoration: none !important;
        }
    }
`;
