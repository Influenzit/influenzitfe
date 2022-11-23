import styled from "styled-components";
import { colors } from "./theme";
export const Container = styled.div`
    background: #fff;
    border-radius: 5px;
    padding: 10px 50px;
`;

export const Top = styled.div`
    display: flex;
    padding: 30px 0;
`;
export const Details = styled.div`
    padding-left: 20px;
    h3 {
        color: #111;
    }
    p {
        color: #333;
    }
`;
export const StarsContainer = styled.div`
    width: 240px;
    display: flex;
    column-gap: 10px;
    padding: 15px 0;
    button {
        width: 40px;
        height: 40px;
        border: none;
        background: transparent;
        cursor: pointer;
    }
`;
export const Textarea = styled.textarea`
    resize: none;
    background: #FCFCFC;
    border: 1px solid #E1E7EC;
    border-radius: 3px;
    height: 180px;
    padding: 15px;
    width: 100%;
    outline: none;
`;
export const ControlContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    button {
        border: none;
        padding: 12px 22px;
        border-radius: 3px;
        background: #F5F8FA;
        color: ${colors.primaryColor};
        cursor: pointer;
        :last-of-type {
            background: ${colors.primaryColor};
            color: #fff;
        }
    }
`;
