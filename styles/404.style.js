import styled from "styled-components";
import { colors } from "./theme";

export const Container = styled.div`
    padding: 90px 0 40px 0;
    h1 {
        color: ${colors.textColor};
        font-size: 30px;
        text-align: center;
        font-weight: 700;
    }
    p {
        color: #6A6974;
        font-size: 18px;
        text-align: center;
    }
    div {
        display: flex;
        align-items: center;
        padding: 20px 0;
        justify-content: center;
        a {
            display: inline-block;
            color: #fff;
            border: 2px solid ${colors.primaryColor};
            font-size: 16px;
            padding: 10px 23px;
            border-radius: 8px;
            background: ${colors.primaryColor};
            cursor: pointer;
            transition: .3s ease;
            :hover {
                background: #fff;
                color: ${colors.primaryColor};
            }
        }
    }
`;
