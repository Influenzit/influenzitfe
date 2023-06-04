import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.div`
    background: #fff;
    padding: 110px 20px 30px 20px;
    min-height: 100vh;
`;
export const Wrapper = styled.div`
    width: 98%;
    margin: 0 auto;
    max-width: ${sizes.wrapperWidth};
`;
export const TableWrapper = styled.div`
    background: #FFFFFF;
`;
export const TableWrapped = styled.div`
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    overflow: hidden;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;
`;
export const TableContent = styled.div`
    max-width: 95vw;
    overflow-x: scroll;
`;
export const TableHeader = styled.div`
    padding: 15px 10px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        font-size: 16px;
        color: #101828;
    }
    #left {
        display: flex;
        column-gap: 15px;
    }
    ${breakpoints.lg}{
        flex-direction: column;
        h2 {
            font-size: 14px;
        }
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
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
export const HTabs = styled.div`
`;
export const HTab = styled.div`
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
    color: ${colors.textColor};
`;
export const THead = styled.thead`
    width: 100%;
    font-weight: 400;
    background: #F9FAFB;
    border-bottom: 1px solid #EAECF0;
    border-top: 1px solid #EAECF0;
`;
export const TBody = styled.tbody`
    width: 100%;
    color: ${colors.textColor};
`;
export const TrH = styled.tr`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    color: #667085;
    font-size: 12px;
`;
export const Th = styled.th`
    flex-grow: 1;
    width: ${(props) => props.cellWidth && props.cellWidth};
    text-align: left;
    font-weight: 500;
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
    padding: 15px 10px;
    border-bottom: 1px solid #EAECF0;
    font-size: 14px;
    color: #667085;
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
    outline: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    background: #FCEDEF;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    color: ${colors.textColor};
`;
export const ActionBtnB = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    background: ${colors.textColor};
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    margin-left: 5px;
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
export const Tabs = styled.div`
    display: flex;
    height: 50px;
    column-gap: 15px;
`;
export const TabBtn = styled.button`
    color: ${(props) => props.isActive ? colors.primaryColor : "#6A6974"};
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    border: none;
    background: transparent;
    position: relative;
    ::after {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        background: ${(props) => props.isActive ? colors.primaryColor : "transparent"};
        height: 4px;
        bottom: 0;
        border-top-left-radius: 99px;
        border-top-right-radius: 99px;
    }
`;
