import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Container, Content, Filter, ListWrapper, PageBtn, Pages, Tab, Tabs, Top, Wrapper } from '../../styles/search.style';
import ProfileCard from '../../components/profile-card';
import { getCreators, getExploreNiches, getInfluencers } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const router = useRouter();
    const { data: creatorsData, refetch: refetchCreatorData } = useQuery(["get-service"], async () => {
        return await getCreators(getUrl ? getUrl : router.asPath);
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
        refetchCreatorData();
        refetch();
    }, [router.asPath])

    return (
        <Container>
            <Wrapper>
                <Content>
                    <Top>
                        <h2>Creators</h2>
                    </Top>
                    <Bottom>
                        <Filter>
                            <p id='explore_pagenumber'>{((creatorsData?.data?.data?.current_page - 1) * creatorsData?.data?.data?.per_page) + creatorsData?.data?.data?.data.length} of {creatorsData?.data?.data?.total}</p>
                        </Filter>
                        <ListWrapper>
                            {
                                creatorsData?.data?.data?.data.map((val, i) => {
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
                                        profileLink={`/creators/${val.id}`}
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
                            <PageBtn onClick={() => creatorsData?.data?.data?.current_page.prev_page_url && setGetUrl(creatorsData?.data?.data?.current_page.prev_page_url.replace("https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1", ""))}>&lt;&lt;</PageBtn>
                            <PageBtn>{creatorsData?.data?.data?.current_page}</PageBtn>
                            <PageBtn onClick={() => creatorsData?.data?.data?.current_page.next_page_url && setGetUrl(creatorsData?.data?.data?.current_page.next_page_url.replace("https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1", ""))}>&gt;&gt;</PageBtn>
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