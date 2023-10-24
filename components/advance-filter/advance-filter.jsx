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
  followersStart,
  followersEnd,
  pageLikesStart,
  pageLikesEnd,
  pageViewsStart,
  pageViewsEnd,
  impressionStart,
  impressionEnd,
  setPageViewsStart,
  setPageViewsEnd,
  setFollowersStart,
  setFollowersEnd,
  setPageLikesStart,
  setPageLikesEnd,
  setImpressionStart,
  setImpressionEnd,
  reachStart,
  reachEnd,
  engagementRateStart,
  engagementRateEnd,
  followingStart,
  followingEnd,
  dislikesStart,
  dislikesEnd,
  commentStart,
  commentEnd,
  shareStart,
  shareEnd,
  setReachStart,
  setReachEnd,
  setEngagementRateStart,
  setEngagementRateEnd,
  setFollowingStart,
  setFollowingEnd,
  setDislikesStart,
  setDislikesEnd,
  setCommentStart,
  setCommentEnd,
  setShareStart,
  setShareEnd,
  negotiable,
  setNegotiable
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
    if(filters.includes("social")) {

    } else {
      setAmountStart("");
      setAmountEnd("");
      setCurrency("");
      setAge("");
      setPlatform("");
      setCountry("");
      setIndustry("");
    }
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
          (filters.includes("platform") || filters.includes("social")) && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Platform</h4>
              <InputContainer style={{ marginTop: "5px" }}>
                <select style={{ fontSize: "14px" }} value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option value="">Select Platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">Youtube</option>
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
          filters.includes("negotiable") && (
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
              <h4>Negotiable</h4>
              <InputContainer style={{ marginTop: "5px" }}>   
                  <select style={{ fontSize: "14px" }} value={negotiable} onChange={(e) => setNegotiable(e.target.value)}>
                      <option value="">Select</option>
                      <option value="1">Negotiable</option>
                      <option value="0">Not negotiable</option>
                  </select>
              </InputContainer>
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
        {
          filters.includes("social") && (platform === "facebook") && (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Impression</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={impressionStart} onChange={(e) => !isNaN(Number(e.target.value)) && setImpressionStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={impressionEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setImpressionEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[impressionStart,impressionEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setImpressionStart(val[0]);
                        setImpressionEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Followers</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followersStart} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowersStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followersEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowersEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[followersStart,followersEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setFollowersStart(val[0]);
                        setFollowersEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Page Views</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageViewsStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageViewsStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageViewsEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageViewsEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageViewsStart,pageViewsEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setPageViewsStart(val[0]);
                        setPageViewsEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Page Likes</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageLikesStart,pageLikesEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setPageLikesStart(val[0]);
                        setPageLikesEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
            </>
          )
        }
        {
          filters.includes("social") && (platform === "tiktok") && (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Following</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followingStart} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowingStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followingEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowingEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[followingStart,followingEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setFollowersStart(val[0]);
                        setFollowersEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Followers</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followersStart} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowersStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followersEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowersEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[followersStart,followersEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setFollowersStart(val[0]);
                        setFollowersEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Likes</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageLikesStart,pageLikesEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setPageLikesStart(val[0]);
                        setPageLikesEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
            </>
          )
        }
        {
          filters.includes("social") && (platform === "youtube") && (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Views</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageViewsStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageViewsStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageViewsEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageViewsEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageViewsStart,pageViewsEnd]}
                      max={1000000}
                      step={100}
                      onChange={(val) => { 
                        setPageViewsStart(val[0]);
                        setPageViewsEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Dislikes</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={dislikesStart} onChange={(e) => !isNaN(Number(e.target.value)) && setDislikesStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={dislikesEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setDislikesEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[dislikesStart,dislikesEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setDislikesStart(val[0]);
                        setDislikesEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Comments</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={commentStart} onChange={(e) => !isNaN(Number(e.target.value)) && setCommentStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={commentEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setCommentEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[commentStart,commentEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setCommentStart(val[0]);
                        setCommentEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Likes</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageLikesStart,pageLikesEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setPageLikesStart(val[0]);
                        setPageLikesEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Shares</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={shareStart} onChange={(e) => !isNaN(Number(e.target.value)) && setShareStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={shareEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setShareEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[shareStart,shareEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setShareStart(val[0]);
                        setSharesEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
            </>
          )
        }
        {
          filters.includes("social") && (platform === "instagram") && (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Impression</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={impressionStart} onChange={(e) => !isNaN(Number(e.target.value)) && setImpressionStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={impressionEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setImpressionEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[impressionStart,impressionEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setImpressionStart(val[0]);
                        setImpressionEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Followers</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followersStart} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowersStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followersEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowersEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[followersStart,followersEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setFollowersStart(val[0]);
                        setFollowersEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Following</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followingStart} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowingStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={followingEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setFollowingEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[followingStart,followingEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setFollowingStart(val[0]);
                        setFollowingEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Profile Views</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageViewsStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageViewsStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageViewsEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageViewsEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageViewsStart,pageViewsEnd]}
                      max={1000000}
                      step={100}
                      onChange={(val) => { 
                        setPageViewsStart(val[0]);
                        setPageViewsEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Likes</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesStart} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={pageLikesEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setPageLikesEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[pageLikesStart,pageLikesEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setPageLikesStart(val[0]);
                        setPageLikesEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Reach</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={reachStart} onChange={(e) => !isNaN(Number(e.target.value)) && setReachStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={reachEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setReachEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[reachStart,reachEnd]}
                      max={100000000}
                      step={10000}
                      onChange={(val) => { 
                        setReachStart(val[0]);
                        setReachEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Engagement Rate</h4>
                <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={engagementRateStart} onChange={(e) => !isNaN(Number(e.target.value)) && setEngagementRateStart(Number(e.target.value))} type="text" placeholder='0' />
                    </InputContainer>
                    <span>-</span>
                    <InputContainer style={{ marginTop: "5px" }}>
                        <Input style={{ fontSize: "14px" }} value={engagementRateEnd} onChange={(e) => !isNaN(Number(e.target.value)) && setEngagementRateEnd(Number(e.target.value))} type="text" placeholder='10,000' />
                    </InputContainer>
                </div>
                <div>
                    <RangeSlider
                      value={[engagementRateStart,engagementRateEnd]}
                      max={20}
                      step={1}
                      onChange={(val) => { 
                        setEngagementRateStart(val[0]);
                        setEngagementRateEnd(val[1]);
                      }}
                      renderTrack={Track}
                      renderThumb={Thumb}
                    />
                </div>
              </div>
            </>
          )
        }
      </Modal>  
    </Container>
  )
}

export default AdvanceFilter