import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    background: #F7FAFC;
    padding: 110px 20px 30px 20px;
    min-height: 100vh;
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
    max-width: 95vw;
    overflow-x: scroll;
`;
export const TableHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D2D2D2;
    color: #111;
    h2 {
        font-size: 22px;
    }
    ${breakpoints.lg}{
        h2 {
            font-size: 17px;
        }
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        font-weight: 500;
        font-size: 14px;
        border-radius: 8px;
        background: ${colors.primaryColor};
        color: #fff;
        border: none;
        outline: none;
        padding: 12px 20px;
        cursor: pointer;
    }
`;
export const TableControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    ${breakpoints.md}{
        flex-direction: column;
        row-gap: 15px;
    }
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
    ${breakpoints.md}{
        width: 100%;
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
    ${breakpoints.lg}{
        justify-content: center;
        button {
            font-size: 12px;
            padding: 10px;
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
export const TrH = styled.tr`
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #D2D2D2;
`;
export const Th = styled.th`
    flex-grow: 1;
    width: ${(props) => props.cellWidth && props.cellWidth};
    text-align: left;
    ${breakpoints.lg}{
        font-size: 14px;
        width: ${(props) => props.cellWidth && `calc(${props.cellWidth} * 0.7)`};
        min-width: max-content;
        max-width: ${(props) => props.cellWidth && props.cellWidth};
    }
`;
export const Td = styled.td`
    flex-grow: 1;
    width: ${(props) => props.cellWidth && props.cellWidth};
    text-align: left;
    ${breakpoints.lg}{
        font-size: 14px;
        width: ${(props) => props.cellWidth && `calc(${props.cellWidth} * 0.7)`};
        min-width: max-content;
        max-width: ${(props) => props.cellWidth && props.cellWidth};
    }
`;
export const Tr = styled.tr`
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #D2D2D2;
    font-size: 14px;
    ${breakpoints.lg}{
        font-size: 14px;
        width: ${(props) => props.cellWidth && `calc(${props.cellWidth}*(95vw/1440px))`};
        min-width: max-content;
    }
`;
export const TableFooter = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    p {
        font-size: 14px;
        color: #333;
    }
    ${breakpoints.md}{
        p {
            font-size: 12px;
        }
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
export const WelcomeModal = styled.div`
    background: #fff;
    width: 95%;
    max-width: 500px;
    border-radius: 16px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h2 {
        font-size: 24px;
        color: ${colors.textColor};
        font-weight: 600;
        padding: 15px 0 10px 0;
    }
    p {
        color: #555461;
        a {
            color: ${colors.primaryColor};
            font-weight: 500;
        }
    }
    div {
        display: flex;
        justify-content: right;
        width: 100%;
        :first-of-type {
            padding-bottom: 20px;
        }
        :last-of-type {
            margin-top: 20px;
            button {
                padding: 12px 20px;
                font-weight: 500;
                font-size: 14px;
                color: #fff;
                background: ${colors.primaryColor};
                border-radius: 8px;
            }
            a {
                padding: 12px 20px;
                font-weight: 500;
                font-size: 14px;
                color: #fff;
                background: ${colors.primaryColor};
                border-radius: 8px;
            }
        }
    }
    
`;
