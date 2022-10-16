import styled from "styled-components";
import { colors, sizes } from "./theme";

export const Container = styled.div`
    background: #F7FAFC;
    padding: 50px 0;
    min-height: calc(100vh - 140px);
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
`;
export const TableWrapper = styled.div`
    background: #fff;
    border-radius: 5px;
`;
export const TableContent = styled.div`
    padding: 10px 0;
`;
export const TableHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D2D2D2;
    color: #111;
    h2 {
        font-size: 22px;
    }
`;
export const TableControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
`;
export const SearchContainer = styled.div`
    height: 40px;
    width: 320px;
    border-radius: 5px;
    background: #F5F8FA;
    display: flex;
    align-items: center;
    input {
        border: none;
        background: transparent;
        height: 100%;
        width: 100%;
        padding: 0 10px;
        outline: none;
        font-size: 15px;
    }
    button {
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        padding: 10px ;
    }
`;
export const FilterContainer = styled.div`
display: flex;
align-items: center;
    button {
        padding: 10px 16px;
        height: 40px;
        border-radius: 5px;
        background: #F0F1FF;
        color: ${colors.primaryColor};
        border: none;
        cursor: pointer;
        font-weight: 500;
        font-size: 15px;
        margin-left: 12px;
        display: inline-flex;
        align-items: center;
        :last-of-type {
            background: ${colors.primaryColor};
            color: #fff;
        }
        span {
            padding-left: 10px;
        }
    }
`;
export const Table = styled.table`
    width: 100%;
`;
export const THead = styled.thead`
    width: 100%;
    color: #333333;
    font-weight: 600;
`;
export const TBody = styled.tbody`
    width: 100%;
    color: #333333;
`;
export const Th = styled.th`
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #D2D2D2;
`;
export const Td = styled.td`
    flex-grow: 1;
    width: ${(props) => props.cellWidth && props.cellWidth};
    text-align: left;
`;
export const Tr = styled.tr`
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #D2D2D2;
    font-size: 14px;
`;
export const TableFooter = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    p {
        font-size: 14px;
        color: #333;
    }
`;
export const Pagination = styled.div`
    display: flex;
    align-items: center;
`;
export const NavBtn = styled.button`
    padding: 5px 15px;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    color: #5E6A79;
    :hover {
        color: ${colors.primaryColor};
    }
`;
export const Pages = styled.div`
    display: flex;
    align-items: center;
`;
export const PageBtn = styled.button`
    padding: 4px 8px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    color: ${(props) => !props.activePage ? colors.primaryColor : "#fff"};
    background: ${(props) => props.activePage ? colors.primaryColor : "transparent"};
`;
export const Checkbox = styled.button`
    height: 18px;
    width: 18px;
    display: flex;
    margin: 0 auto;
    background: #F5F8FA;
    border: 1px solid #D2D2D2;
    border-radius: 3px;
    cursor: pointer;
`;
export const ActionBtn = styled.button`
    background: #F0F1FF;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    color: #333;
    font-weight: 500;
    cursor: pointer;
`;
