import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    padding: 80px 0 40px 0;
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