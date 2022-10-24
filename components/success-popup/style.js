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
        margin-top: 10px;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
    }
    button {
        color: #fff;
        background: crimson;
        padding: 10px 25px;
        border-radius: 99px;
        border: none;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        margin: 10px 0;
    }
`;
