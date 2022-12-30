import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Container, Content, Filter, ListWrapper, PageBtn, Pages, Tab, Tabs, Top, ViewMoreBtn, Wrapper } from '../../styles/search.style';
import ProfileCard from '../../components/profile-card';
import { exploreAll } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { EmptyWrapper, ImageWrap, ServRate, ServStats, ServUserCard, TopImg } from '../../styles/influencer-profile';
import Image from 'next/image';
import { CreatorDetails, CreatorsCard } from '../../styles/business-owner.style';
import { useRouter } from 'next/router';

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const { data, refetch } = useQuery(["get-influencers"], async () => {
        return await exploreAll(router.asPath);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });
    // const { data: influencersData, refetch: refetchInfluencerData } = useQuery(["get-influencers"], async () => {
    //     return await getInfluencers(getUrl);
    // }, {
    //     enabled: false,
    //     staleTime: Infinity,
    //     retry: false
    // });
    // const { data: creatorsData, refetch: refetchCreatorData } = useQuery(["get-creators"], async () => {
    //     return await getCreators(getUrlT);
    // }, {
    //     enabled: false,
    //     staleTime: Infinity,
    //     retry: false
    // });
    // const { data, refetch } = useQuery(["get-niche"], async () => {
    //     return await getExploreNiches();
    // }, {
    //     enabled: false,
    //     staleTime: Infinity,
    //     retry: false
    // });
    useEffect(() => {
        // refetchInfluencerData();
        // refetchCreatorData();
        console.log(router)
        if(router.asPath) {
            refetch();
        }
    }, [router.asPath])

    return (
        <Container>
            <Wrapper>
                <Content>
                    <Top>
                        <h2>{search ? "Influencer search result for: " + search : "Top Influencers"}</h2>
                    </Top>
                    <Bottom>
                        <ListWrapper>
                            {
                                data?.data?.data.influencers.map((val, i) => {
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
                                        profileLink={`/influencers/${val.id}`}
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
                        {
                            !data?.data?.data.influencers.length ?
                            <EmptyWrapper>
                                <Image src="/empty.png" alt="" height={150} width={150}/>
                                <h3>Influencer not found</h3>
                            </EmptyWrapper>
                            : null
                        }
                        <Pages>
                            <ViewMoreBtn onClick={
                                () => {
                                    router.push(`/explore/influencers${search ? "?search=" + search : ""}`);
                                }}>
                                View All Influencers
                            </ViewMoreBtn>
                        </Pages>
                    </Bottom>
                    <Top>
                        <h2>{search ? "Creator search result for: " + search : "Top Creators"}</h2>
                    </Top>
                    <Bottom>
                    <ListWrapper>
                            {
                                data?.data?.data.creators.map((val, i) => {
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
                        {
                            !data?.data?.data.creators.length ?
                            <EmptyWrapper>
                                <Image src="/empty.png" alt="" height={150} width={150}/>
                                <h3>Creators not found</h3>
                            </EmptyWrapper>
                            : null
                        }
                        <Pages>
                            <ViewMoreBtn onClick={
                                () => {
                                    router.push(`/explore/creators${search ? "?search=" + search : ""}`);
                                }}>
                                View All Creators
                            </ViewMoreBtn>
                        </Pages>
                    </Bottom>
                    <Top>
                        <h2>{search ? "Service search result for: " + search : "Top Services"}</h2>
                    </Top>
                    <Bottom>
                    <ListWrapper>
                            {
                                data?.data?.data.services.map((val, i) => {
                                    return <CreatorsCard key={i} style={{ cursor: "pointer" }} onClick={() => router.push(`/services/${val.id}`)}>
                                    <TopImg>
                                        <Image src={val.media[0]?.url ?? "/web-services.jpg"} alt="" layout="fill" objectPosition="center" objectFit='cover' />
                                    </TopImg>
                                    <CreatorDetails>
                                        <ServUserCard>
                                            {/* <ImageWrap>
                                                inData?.media?.[0]?.url ? inData?.media?.[0]?.url :  ${inData?.user?.firstname}+${inData?.user?.lastname}
                                                <Image src={`https://ui-avatars.com/api/?name=T+T&color=FFFFFF&background=12544D`} alt="" layout="fill" objectPosition="center" objectFit='cover'/>
                                            </ImageWrap> */}
                                            <p>{val.description}</p>
                                        </ServUserCard>
                                        <ServRate>
                                            starting from <span>{val.currency} {val.starting_from}</span> 
                                        </ServRate>
                                    </CreatorDetails>
                                    <ServStats>
                                        <div>
                                            <Image src="/star.svg" height={20} width={20} />
                                            <span>0/5 (0)</span>
                                        </div>
                                        <div>
                                            <span>0 in queue</span>
                                        </div>
                                    </ServStats>
                                </CreatorsCard>
                                })
                            }
                        </ListWrapper>
                        {
                            !data?.data?.data.services.length ?
                            <EmptyWrapper>
                                <Image src="/empty.png" alt="" height={150} width={150}/>
                                <h3>Services not found</h3>
                            </EmptyWrapper>
                            : null
                        }
                        <Pages>
                            <ViewMoreBtn onClick={
                                () => {
                                    router.push(`/explore/services${search ? "?search=" + search : ""}`);
                                }}>
                                View All Services
                            </ViewMoreBtn>
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