import styled from "styled-components";
import { colors } from "../../styles/theme";

export const Container = styled.div`
    height: auto;
    width: 285px;
    border: 1px solid #D2D2D2;
    text-align: center;
    min-height: 400px;
    p {
        font-size: 14px;
        color: #999;
    }
`;
export const SocialHandle = styled.div`
    font-size: 14px;
    padding: 5px 0;
    span {
        padding-left: 10px;
    }
    a {
        display: inline-flex;
        align-items: center;
    }
`;
export const Controls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    a {
        background: ${colors.primaryColor};
        color: #fff;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        padding: 5px 15px;
        margin-right: 10px;
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
    }
    button {
        background: #F6F6F6;
        border-radius: 2px;
        border: none;
        padding: 6px;
        cursor: pointer;
    }
`;
export const TopImg = styled.div`
    height: 50%; 
    min-height: 210px;
    width: 100%;
    position: relative;
`;
export const CreatorDetails = styled.div`
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50%;
    min-height: 50%;
`;
