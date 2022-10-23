import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    z-index: 999999;
`;
export const LoaderCard = styled.div`
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    object {
        height: 70px;
    }
    p {
        margin-top: 10px;
        font-weight: 700;
        letter-spacing: 6px;
        font-size: 20px;
    }
`;
