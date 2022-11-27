import styled from "styled-components";
import { colors } from "../../styles/theme";


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999999;
`;
export const LoaderCard = styled.div`
    color: #444;
    padding: 20px 25px;
    width: 350px;
    min-width: 350px;
    max-width: 350px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #fff;
    object {
        height: 70px;
    }
    p {
        margin-top: 15px;
        font-size: 17px;
        text-align: center;
    }
    button {
        background: ${colors.primaryColor};
        color: white;
        padding: 12px 25px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        border-radius: 3px;
        margin: 12px 0;
    }
    `;
