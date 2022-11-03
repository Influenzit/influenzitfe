import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { resetPassword } from '../../../api/auth'
import { CancelIcon, CheckIcon } from '../../../assets/svgIcons'
import ProfileSidebar from '../../../components/profile-sidebar'
import LandingLayout from '../../../layouts/landing.layout'
import { Bottom, Container, Content, FormContainer, Heading, InputContainer, Left, PasswordContainer, Right, Wrapper } from '../../../styles/profile.style'

const Password = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("")
    const [oneLC, setOneLC] = useState(false);
    const [oneUC, setOneUC] = useState(false);
    const [oneNum, setOneNum] = useState(false);
    const [isMinLen, setIsMinLen] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false);
    const handlePasswordValidation = (type, value) => {
        if (type === "new") {
            setNewPassword(value)
            if(!value) {
                setIsMinLen(false);
                setOneLC(false);
                setOneUC(false);
                setOneNum(false);
                setPasswordMatch(false);
                return;
            }
            const asciiList = value.split("").map(val => val.charCodeAt());
            if (value.length >= 8 && value.length <= 60) {
                setIsMinLen(true);
            } else {
                setIsMinLen(false);
            }
            // lowercase ascii 97 to 122
            asciiList.every((val, i) => {
                if (val >= 97 && val <= 122) {
                    setOneLC(true);
                    return false;
                } else {
                    if (i === asciiList.length - 1) {
                        setOneLC(false)
                    }
                    return true;
                }
            })
            // uppercase ascii 65 to 90
            asciiList.every((val, i) => {
                if(val >= 65 && val <= 90) {
                    setOneUC(true);
                    return false;
                } else {
                    if (i === asciiList.length - 1) {
                        setOneUC(false)
                    }
                    return true
                }
            })
            // number ascii 48 to 57
            asciiList.every((val, i) => {
                if(val >= 48 && val <= 57) {
                    setOneNum(true);
                    return false;
                } else {
                    if (i === asciiList.length - 1) {
                        setOneNum(false)
                    }
                    return true;
                }
            })
            if (value === confirmNewPassword) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        } else {
            setConfirmNewPassword(value);
            if(!value) {
                setPasswordMatch(false);
                return;
            }
            if (value === newPassword) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        }
    }
    const muation = useMutation(passwordData => (
        resetPassword(passwordData)
    ))
    const handleSubmit = () => {
        dispatch(setLoading(true));
        muation.mutate({
            old_password: oldPassword,
            password: newPassword,
            password_confirmation: confirmNewPassword,
        })
    }
  return (
    <Container>
        <Wrapper>
            <ProfileSidebar />
            <Content>
                <Heading>
                    <h2>Password & Security</h2>
                </Heading>
                <FormContainer style={{ paddingTop: 0 }}>
                    <Heading>
                        <h2>Change Password</h2>
                    </Heading>
                    <PasswordContainer>
                        <Left>
                            <InputContainer>
                                <label>Old Password</label>
                                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <label>New Password</label>
                                <input type="password" value={newPassword} onChange={(e) => handlePasswordValidation("new", e.target.value)} />
                            </InputContainer>
                            <InputContainer>
                                <label>Confirm New Password</label>
                                <input type="password" value={confirmNewPassword} onChange={(e) => handlePasswordValidation("cnew", e.target.value)} />
                            </InputContainer>
                        </Left>
                        <Right>
                            <h3>Your password must have:</h3>
                            <p className={isMinLen ? "pri" : "red"}>{isMinLen ? <CheckIcon /> : <CancelIcon />} <span>Length between 8 and 60 characters</span></p>
                            <p className={oneLC ? "pri" : "red"}>{oneLC ? <CheckIcon /> : <CancelIcon />} <span>At least one lowercase character</span></p>
                            <p className={oneUC ? "pri" : "red"}>{oneUC ? <CheckIcon /> : <CancelIcon />} <span>At least one uppercase character</span></p>
                            <p className={oneNum ? "pri" : "red"}>{oneNum ? <CheckIcon /> : <CancelIcon />} <span>At least one number</span></p>
                            <p className={passwordMatch ? "pri" : "red"}>{passwordMatch ? <CheckIcon /> : <CancelIcon />} <span>Password must match</span></p>
                        </Right>
                    </PasswordContainer>
                </FormContainer>
                <Bottom>
                    <button onClick={handleSubmit}>Save Changes</button>
                </Bottom>
            </Content>
        </Wrapper>
    </Container>
  )
}
Password.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Password