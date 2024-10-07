import React, { useEffect, useState } from 'react'
import { Input, InputContainer, SubmitButton } from 'styles/auth.style';
import allBanks from 'ng-banks';
import { BankWrapper } from 'styles/profile.style';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addBankDetails, getBankDetails, lookupBankDetails, storeBvn } from '../../api/bank'
import { toast } from 'react-toastify';

const Stage5 = ({user}) => { 
  const [detailsAvailable, setDetailsAvailable] = useState(false);
  const [bvnAvail, setBvnAvail] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountLoad, setAccountLoad] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [saveLoad, setSaveLoad] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bvn, setBvn] = useState("");
  const [bvnLoad, setBvnLoad] = useState(false);

  // const {data, refetch} =  useQuery(["get-bank-details"], async () => {
  //   return await getBankDetails()
  //   }, {
  //       enabled: false,
  //       staleTime: Infinity,
  //       retry: false,
  //       onSuccess(res) {
  //           console.log(res.data.data);
  //           const bankDet = res.data.data;
  //           if(bankDet.account_name) {
  //               setDetailsAvailable(true);
  //               setAccountNumber(bankDet.account_number);
  //               setBankCode(bankDet.account_bank_code);
  //               setAccountName(bankDet.account_name);
  //           }
  //           if(bankDet.bvn) {
  //               setBvn(bankDet.bvn);
  //               setBvnAvail(true);
  //           }
  //       },
  //       onError(res) {
  //       }
  //   });
  const {data, refetch} =  useQuery(["get-bank-details"], async () => {
    return await getBankDetails()
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
          console.log(res.data.data);
          const bankDet = res.data.data;
      
          if(bankDet.account_name) {
              setDetailsAvailable(true);
              setAccountNumber(bankDet.account_number);
              setBankCode(bankDet.account_bank_code);
              setAccountName(bankDet.account_name);
          }
      
          if(bankDet.bvn && bankDet.bvn.bvn) { // Check if `bvn` and `bvn.bvn` exist
              setBvn(bankDet.bvn.bvn); // Set only the BVN number, not the whole object
              setBvnAvail(true);
          }
      },
        onError(res) {
        }
    });
    const addAccountMutation = useMutation(accountData => {
        return addBankDetails(accountData)
    }, {
        onSuccess(res) {
            if(res.data.data) {
                console.log(res.data.data);
                setSaveLoad(false);
            }
        },
        onError(error) {
            const res = error.response.data;
            setSaveLoad(false);
            if (res) {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
              });
              return;
            }
            
          },
    }
    )
    const lookupAccountMutation = useMutation(accountData => {
        return lookupBankDetails(accountData)
    }, {
        onSuccess(res) {
            if(res.data.data) {
                console.log(res.data.data);
                setAccountName(res.data.data.account_name)
                setAccountLoad(false);
            }
        },
        onError(error) {
            const res = error.response.data;
            setAccountLoad(false);
            if (res) {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
              });
              return;
            }
            
          },
    }
    )
    const validateBvnMutation = useMutation(bvnData => {
      return storeBvn(bvnData);
  }, {
      onSuccess(res) {
          if(res.data.data) {
              console.log(res.data.data);
              setBvnLoad(false);
              setBvnAvail(true);
          }
      },
      onError(error) {
          const res = error.response.data;
          setBvnLoad(false);
          if (res) {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });
            return;
          }
          
        },
  }
  )

  const handleBankInput = (val) => {
    if(!detailsAvailable) {
        const filteredBankName = allBanks.getBanks().filter((bank) => bank.code === val)[0].name;
        setAccountName("");
        setBankName(filteredBankName);
        setBankCode(val);
    }
  }
  const handleAccountNumberChange = (val) => {
    if(!detailsAvailable) {
        setAccountName("");
        setAccountNumber(val)
    }
  }
  const handleAddAccount = () => {
    if(saveLoad) return;
    setSaveLoad(true);
    if(accountName.length !== 10) {
      toast.error("Account should be 10 digit", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    addAccountMutation.mutate({
      account_bank_code: bankCode,
      account_name: accountName,
      account_number: accountNumber,
      account_bank_name: bankName,
    })
  }
  const handleResolveAccount = () => {
    if(accountLoad) return;
    if(!bankCode || !accountNumber) return;
    setAccountLoad(true);
    lookupAccountMutation.mutate({
        account_number: accountNumber,
        account_bank_code: bankCode,
    })
  }
  const handleValidateBvn = () => {
    if(bvnLoad) return;
    setBvnLoad(true);
    validateBvnMutation.mutate({
      bvn, 
      account_number: accountNumber, 
      bank_code: bankCode,
    })
  }
  useEffect(() => {
    refetch();
  }, [])
  
  return (
    <BankWrapper>
        <InputContainer>
            <label>Bank</label>
            <select value={bankCode} onChange={(e) => handleBankInput(e.target.value)}>
                <option value={""}>Select Bank</option>
                {
                    allBanks.getBanks().map((bank, idx) => (
                        (<option value={bank.code} key={idx}>{bank.name}</option>)
                    ))
                }
            </select>
        </InputContainer>
        <InputContainer>
            <label >Account Number</label>
            <Input type='text' placeholder='Enter Account Number' value={accountNumber} onChange={(e) => handleAccountNumberChange(e.target.value)} />
        </InputContainer>
        <InputContainer>
            <label >Account Name</label>
            <Input type='text' placeholder='Get Account Name' style={{ cursor: detailsAvailable? "not-allowed" : "pointer" }} value={accountLoad ?  "Fetching..." : accountName} onClick={(!detailsAvailable && !accountLoad) ? handleResolveAccount : () => {}} />
        </InputContainer>
        { detailsAvailable && <InputContainer>
                <label>BVN</label>
                <Input type='text' placeholder='Enter Bvn' onChange={(e) => !bvnAvail && setBvn(e.target.value)} value={bvn} />
            </InputContainer>
        }
        { !detailsAvailable && accountName && <SubmitButton onClick={handleAddAccount}>{saveLoad ? "Saving..." : "Save Account"}</SubmitButton> }
        { !bvnAvail && detailsAvailable && (<SubmitButton onClick={() => handleValidateBvn()}>{bvnLoad ? "Validating..." : "Validate BVN"}</SubmitButton>) }
    </BankWrapper>
  )
}

export default Stage5
