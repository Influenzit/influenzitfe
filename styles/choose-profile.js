import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    background: url("/bg.png");
    background-size: cover;
    background-position: center;
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
`;
export const OptionWrapper = styled.div`
    display: flex;
    column-gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 40px 0;
`;
export const Option = styled.div`
    height: 300px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    box-shadow: 0px 4px 15px 0px #0000001A;
    background: #fff;
    h2 {
        color: ${colors.primaryColor};
        font-weight: 500;
    }
    p {
        color: #333;
        margin: 15px 0;
        text-align: center;
        font-size: 15px;
    }
    a {
        display: inline-block;
        color: ${colors.primaryColor};
        border: 1px solid ${colors.primaryColor};
        font-size: 16px;
        padding: 12px 23px;
        height: 50px;
        border-radius: 3px;
        background: #fff;
        cursor: pointer;
        transition: .3s ease;
        :hover {
            background: ${colors.primaryColor};
            color: #fff;
        }
    }
    button {
        display: inline-block;
        color: ${colors.primaryColor};
        border: 1px solid ${colors.primaryColor};
        font-size: 16px;
        height: 50px;
        padding: 12px 23px;
        border-radius: 3px;
        background: #fff;
        cursor: pointer;
        transition: .3s ease;
        :hover {
            background: ${colors.primaryColor};
            color: #fff;
        }
    }
    :hover {
        border: 1px solid #12544D;
    }
`;
export const IconContainer = styled.div`
    height: 90px;
    width: 90px;
    position: relative;
`;
export const FirstIcon = styled.div`
    height: 60px;
    width: 67px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
`;
export const SecondIcon = styled.div`
    height: 70px;
    width: 70px;
    position: absolute;
    bottom: 0;
    left: 0;
`;
