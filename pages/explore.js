import React, { useEffect, useState } from 'react';
import LandingLayout from '../layouts/landing.layout';
import { Bottom, Container, Content, Filter, ListWrapper, PageBtn, Pages, Tab, Tabs, Top, Wrapper } from '../styles/search.style';
import ProfileCard from '../components/profile-card';
import { getExploreNiches, getInfluencers } from '../api/influencer';
import { useQuery } from '@tanstack/react-query';

const Search = () => {
    const [currentTab, setCurrentTab] = useState("influencer");
    const { data: influencersData, refetch: refetchInfluencerData } = useQuery(["get-service"], async () => {
        return await getInfluencers();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });
    const { data, refetch } = useQuery(["get-niche"], async () => {
        return await getExploreNiches();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });
    useEffect(() => {
        refetchInfluencerData();
        refetch();
    }, [])

    return (
        <Container>
            <Wrapper>
                <Content>
                    <Top>
                        <h2>Start a campaign/project</h2>
                        <Tabs>
                            <Tab isActive={currentTab === "influencer"} onClick={() => setCurrentTab("influencer")}>Influencers</Tab>
                            <Tab isActive={currentTab === "creator"} onClick={() => setCurrentTab("creator")}>Creators</Tab>
                        </Tabs>
                    </Top>
                    <Bottom>
                        <Filter>
                            <p id='explore_pagenumber'>{((influencersData?.data?.data?.current_page - 1) * influencersData?.data?.data?.per_page) + influencersData?.data?.data?.data.length} of {influencersData?.data?.data?.total}</p>
                            <div>
                                <p>Filter</p>
                                <select>
                                    <option value="">Select a niche</option>
                                    {
                                        data?.data?.data?.map((val, i) => (
                                        <option key={i} value={val.name}>{val.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Filter>
                        <ListWrapper>
                            {
                                influencersData?.data?.data?.data.map((val, i) => {
                                    let genSkills = "";
                                    val.skills.forEach((val, i) => {
                                        if(i < 5){
                                            if (i !== 0) {
                                                genSkills += `| ${val.name} `
                                            } else {
                                                genSkills += `${val.name} `
                                            }
                                        }
                                    })
                                    return <ProfileCard
                                        key={i}
                                        profileLink={`/influencer/${val.id}`}
                                        imgSrc={val?.media.filter(med => med.identifier === 'profile_pic')?.[0]?.url ?? '/profile-2.png'  }
                                        handle={val.twitter}
                                        name={`${val.user.firstname} ${val.user.lastname}`}
                                        sex={val.gender}
                                        skills={genSkills}
                                        address={val.address}
                                    />
                                })
                            }
                        </ListWrapper>
                        <Pages>
                            <PageBtn onClick={() => influencersData?.data?.data?.current_page.prev_page_url && setGetUrl(influencersData?.data?.data?.current_page.prev_page_url.replace("https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1", ""))}>&lt;&lt;</PageBtn>
                            <PageBtn>{influencersData?.data?.data?.current_page}</PageBtn>
                            <PageBtn onClick={() => influencersData?.data?.data?.current_page.next_page_url && setGetUrl(influencersData?.data?.data?.current_page.next_page_url.replace("https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1", ""))}>&gt;&gt;</PageBtn>
                        </Pages>
                    </Bottom>
                </Content>
            </Wrapper>
        </Container>
    )
}
Search.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Search