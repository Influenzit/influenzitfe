import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 150px);
    background: #F7FAFC;
    padding: 25px 0;
`;
export const Wrapper = styled.div`
    max-width: ${sizes.wrapperWidth};
    width: 98%;
    margin: 0 auto;
    background: #F7FAFC;
`;
export const Content = styled.div`
    background: #fff;
    border-radius: 5px;
`;
export const Top = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid #D2D2D2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        color: #333;
        font-size: 22px;
    }
`;
export const Tabs = styled.div`
`;
export const Tab = styled.button`
    padding: 12px 30px;
    border-radius: 3px;
    font-size: 15px;
    font-weight: 500;
    color: ${(prop) => prop.isActive ? colors.primaryColor : "#111"};
    border: 1px solid ${(prop) => prop.isActive ? colors.primaryColor : "#D2D2D2"};
    background: ${(prop) => prop.isActive ? "#f6f6f6" : "#fff"};
    margin-left: 15px;
    cursor: pointer;
`;
export const Bottom = styled.div`
    padding: 20px 0;
`;
export const Filter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    p {
        color: #111;
        font-size: 15px;
        font-weight: 600;
    }
    div {
        display: flex;
        align-items: center;
        select {
            padding: 10px;
            border: 1px solid #D2D2D2;
            border-radius: 3px;
            margin-left: 10px;
            background: #fff;
        }
    }
`;
export const ListWrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    column-gap: 23px;
    row-gap: 20px;
    flex-wrap: wrap;
`;
export const Pages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
`;
export const PageBtn = styled.button`
    height: 36px;
    width: 36px;
    border-radius: 3px;
    border: 1px solid #D2D2D2;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    cursor: pointer;
    margin: 0 4px;
    transition: .3s ease;
    :hover {
        background: #F6F6F6;
    }
`;
