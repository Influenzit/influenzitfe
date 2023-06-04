import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Input, InputContainer, SubmitButton } from 'styles/auth.style';
import allBanks from 'ng-banks';
import { BankWrapper } from 'styles/profile.style';

const Stage5 = ({user}) => { 
  return (
    <BankWrapper>
        <InputContainer>
            <label>Bank</label>
            <select>
                <option>Select Bank</option>
                {
                    allBanks.getBanks().map((bank, idx) => (
                        (<option value={bank.code} key={idx}>{bank.name}</option>)
                    ))
                }
            </select>
        </InputContainer>
        <InputContainer>
            <label>Account Name</label>
            <Input type='text' placeholder='Enter Account Name' />
        </InputContainer>
        <InputContainer>
            <label>Account Number</label>
            <Input type='text' placeholder='Enter Account Number' />
        </InputContainer>
        <SubmitButton>
            Update Bank Details
        </SubmitButton>
    </BankWrapper>
  )
}

export default Stage5