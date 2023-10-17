import React from 'react'
import { RangeSlider, Thumb, Track } from '../../styles/complete.style';
import { Input, InputContainer } from '../../styles/auth.style';
import { Container, Modal } from './style';
import { useState } from 'react';
import { getIndustries } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { CancelIcon } from '../../assets/svgIcons';
import { Country } from 'country-state-city';
import { useEffect } from 'react';

const AdvanceFilter = ({ 
  filters,
  amountStart,
  amountEnd,
  setAmountStart,
  setAmountEnd,
  currency,
  setCurrency,
  apply,
  setApply,
  setShow,
  age,
  setAge,
  platform,
  setPlatform,
  industry,
  setIndustry,
  country,
  setCountry,
}) => {
  const [industryList, setIndustryList] = useState([]);
  const [countries] = useState(Country.getAllCountries());
  const { data: industryData, refetch: refetchIndustryData } = useQuery(["get-industries"], async () => {
    return await getIndustries();
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
          setIndustryList(res.data.data);
      }
  });
  const handleClear = () => {
    setAmountStart("");
    setAmountEnd("");
    setCurrency("");
    setAge("");
    setPlatform("");
    setCountry("");
    setIndustry("");
  }
  useEffect(() => {
    refetchIndustryData();
  }, [])
  
  return (
    <Container>
      <Modal>
        <h2>Advance Filter</h2>
        <button className="close" onClick={() => setShow(false)}><CancelIcon /></button>
        <button className="clear" onClick={handleClear}>Clear Filter</button>
        <button className="clear" style={{ marginLeft: "15px" }} onClick={() => setApply(!apply)}>Apply</button>
        {
          filters.includes("currency") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>Currency</h4>
            <InputContainer style={{ marginTop: "5px" }}>   
                <select style={{ fontSize: "14px" }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="">Select Currency</option>
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                </select>
            </InputContainer>
          </div>
          )
        }
        {
          filters.includes("platform") && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Platform</h4>
              <InputContainer style={{ marginTop: "5px" }}>
                <select style={{ fontSize: "14px" }} value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option value="">Select Platform</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Youtube">Youtube</option>
                </select>
              </InputContainer>
            </div>
          )
        }
        { 
          filters.includes("amount") && (
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
              <h4>Amount</h4>
              <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                  <InputContainer style={{ marginTop: "5px" }}>
                      <Input style={{ fontSize: "14px" }} value={amountStart} onChange={(e) => !isNaN(Number(e.target.value)) && setAmountStart(Number(e.target.value))} type="text" placeholder='0' />
                  </InputContainer>
                  <span>-</span>
                  <InputContainer style={{ marginTop: "5px" }}>
                      <Input style={{ fontSize: "14px" }} value={amountEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setAmountEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                  </InputContainer>
              </div>
              <div>
                  <RangeSlider
                    value={[amountStart,amountEnd]}
                    max={1000000}
                    step={1000}
                    onChange={(val) => { 
                      setAmountStart(val[0]);
                      setAmountEnd(val[1]);
                    }}
                    renderTrack={Track}
                    renderThumb={Thumb}
                  />
              </div>
          </div>
           )
        }
        {
          filters.includes("age") && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Age</h4>
              <InputContainer style={{ marginTop: "5px" }}>
                <select style={{ fontSize: "14px" }} value={age} onChange={(e) => setAge(e.target.value)}>
                  <option value="">Select Age Range</option>
                  <option value="10-20">10-20</option>
                  <option value="20-30">20-30</option>
                  <option value="30-40">30-40</option>
                  <option value="40-50">40-50</option>
                  <option value="50-60+">50-60+</option>
                </select>
              </InputContainer>
            </div>
          )
        }
        {
          filters.includes("country") && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Country</h4>
              <InputContainer style={{ marginTop: "5px" }}>
                  <select style={{ fontSize: "14px" }} value={country} onChange={(e) => setCountry(e.target.value)}>
                      <option value={""}>Select Country</option>
                      {
                          countries.map((country, i) => {
                              return (<option value={country.name} key={i}>{country.name}</option>)
                          })
                      }
                  </select>
              </InputContainer>
            </div>
          )
        }
        {
          filters.includes("industry") && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Industry</h4>
              <InputContainer style={{ marginTop: "5px" }}>
                  <select style={{ fontSize: "14px" }} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                      <option value={""}>Select Industry</option>
                      {
                          industryList.map((val, i) => (
                              <option key={i} value={val}>{val}</option>
                          ))
                      }
                  </select>
              </InputContainer>
            </div>
          )
        }
      </Modal>  
    </Container>
  )
}

export default AdvanceFilter