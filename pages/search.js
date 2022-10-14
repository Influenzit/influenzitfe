import React, { useState } from 'react';
import LandingLayout from '../layouts/landing.layout';
import { Bottom, Container, Content, Filter, ListWrapper, PageBtn, Pages, Tab, Tabs, Top, Wrapper } from '../styles/search.style';
import ProfileCard from '../components/profile-card';

const Search = () => {
  const [currentTab, setCurrentTab] = useState("influencer");
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
                        <p>15 of 150 Results</p>
                        <div>
                            <p>Filter</p>
                            <select>
                                <option>All Niche</option>
                            </select>
                        </div>
                    </Filter>
                    <ListWrapper>
                        <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                         <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                         <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                         <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                         <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                         <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                        <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                         <ProfileCard 
                            profileLink={"/"}
                            imgSrc="/profile-2.png"
                            name="Jade Jackman"
                            sex="male"
                            address="Rex Villa, GT, Mexico."
                        />
                    </ListWrapper>
                    <Pages>
                        <PageBtn>1</PageBtn>
                        <PageBtn>2</PageBtn>
                        <PageBtn>3</PageBtn>
                        <PageBtn>4</PageBtn>
                        <PageBtn>&gt;&gt;</PageBtn>
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