import styled from "styled-components";
import { breakpoints, colors, sizes } from "./theme";

export const Container = styled.section`
    background: #FDFAF5;
`;

export const ContactFlex = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    padding: 50px;
    padding-top: 150px;
    ${breakpoints.md}{
        padding: 40px 20px;
        padding-top: 120px;
        flex-direction: column;
    }
`;

// 

export const Wrapper = styled.div`
    width: 98%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    h1 {
        font-size: 40px;
    }
    p {
        width: 80%;
        max-width: 600px;
        min-width: 300px;
        font-size: 18px;
        padding: 15px 0;
        text-align: center;
    }
    a {
        padding: 5px 0;
        color: ${colors.primaryColor};
    }
    h3 {
        font-size: 25px;
        color: #333;
        margin-bottom: 20px;
        margin-top: 40px;
    }
    ${breakpoints.md}{
        h1 {
            font-size: 22px;
        }
        p {
            width: 80%;
            font-size: 15px;
        }
        h3 {
            font-size: 18px;
        }
    }
`;
export const SocialLinks = styled.div`
    width: 80%;
    max-width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    img {
        cursor: pointer;
    }
`;
export const FormContainer = styled.form`
    padding: 40px 0;
    width: 50%;
    max-width: 600px;
    // border: 1px solid #444;
    button {
        text-align: center !important;
        padding: 12px 30px;
        color: #fff;
        background: ${colors.primaryColor};
        display: flex;
        justify-content: center;
        margin: 20px 0;
        width: 100%;
        border-radius: 5px;
        transition: .5s ease;
        border: 2px solid ${colors.primaryColor};
        :hover {
            background: white;
            color: ${colors.primaryColor};
        }
        cursor: pointer;
    }
    ${breakpoints.lg}{
        width: 80%;
        padding: 0px;
    }
    ${breakpoints.md}{
        width: 100%;
        padding: 0px;
    }
`;
export const FormTop = styled.div`
    h1{
        font-weight: 700;
        font-size: 40px;
    }
    p{
        line-height: 30px;
    }
    ${breakpoints.md}{
        text-align: center;
    }
`;
export const BanImage = styled.div`
    display: block;
    ${breakpoints.md}{
        display: none;
    }
`;
export const InputSection = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    ${breakpoints.md}{
        flex-direction: column;
        padding: 0;
    }
`;
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    label {
        font-size: 14px;
        padding-bottom: 7px;
        color: #333;
    }
    input {
        height: 45px;
        width: 100%;
        background: white;
        border: 1px solid #333;
        outline: none;
        padding: 0 10px;
    }
    ${breakpoints.md}{
        width: 100%;
        padding: 10px 0;
    }
`;
export const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-size: 14px;
        padding-bottom: 7px;
        color: #333;
    }
    textarea {
        width: 100%;
        height: 200px;
        resize: none;
        outline: none;
        padding: 10px;
        border: 1px solid #333;
    }
`;
