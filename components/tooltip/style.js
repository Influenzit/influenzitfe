import styled from "styled-components";
import { colors } from "../../styles/theme"

export const Container = styled.div`
    background: #fff;
    color: ${colors.textColor};
    font-size: 10px;
    z-index: 999999999;
    width: 200px;
    max-width: 200px;
    min-width: 200px;
    ${({show}) => show ? "position: fixed;" : "position: absolute;"}
    ${({show}) => !show ? "left: -999em !important;" : ""}
    padding: 4px 10px;
    border-radius: 5px;
    text-align: center;
    border: 0.5px solid #EAEAEB;
`;
