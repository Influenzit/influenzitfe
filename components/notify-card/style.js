import styled from "styled-components";
import { colors } from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 18px;
    border-radius: 5px;
    box-shadow: 0px 4px 15px 0px #0000001A;
    height: 400px;
    width: 370px;
    background: #fff;
    h2 {
        font-size: 22px;
        font-weight: 500;
        padding: 5px 0;
        color: #111;
    }
    p {
        font-size: 14px;
        color: #333;
        padding-bottom: 15px;
        span {
            color: ${colors.primaryColor}
        }
        text-align: center;
    }
    a {
        display: inline-block;
        color: #fff;
        border: 1px solid ${colors.primaryColor};
        font-size: 16px;
        padding: 12px 23px;
        border-radius: 3px;
        background: ${colors.primaryColor};
        cursor: pointer;
        transition: .3s ease;
        :hover {
            background: #fff;
            color: ${colors.primaryColor};
        }
    } 
`;
