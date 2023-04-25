import styled from "styled-components";
import { colors } from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 18px;
    border-radius: 5px;
    height: 400px;
    width: 470px;
    background: #fff;
    h2 {
        font-size: 25px;
        font-weight: 700;
        padding: 5px 0;
        color: ${colors.textColor};
    }
    p {
        font-size: 16px;
        color: #6A6974;
        padding-bottom: 15px;
        span {
            color: ${colors.primaryColor}
        }
        text-align: center;
    }
    a {
        display: inline-block;
        color: #fff;
        border: 2px solid ${colors.primaryColor};
        font-size: 16px;
        padding: 12px 23px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        cursor: pointer;
        transition: .3s ease;
        :hover {
            background: #fff;
            color: ${colors.primaryColor};
        }
    } 
`;
