import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Container, Content, Filter, ListWrapper, PageBtn, Pages, Tab, Tabs, Top, Wrapper } from '../../styles/search.style';
import { exploreServices, getExploreNiches } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { EmptyWrapper, ImageWrap, ServRate, ServStats, ServUserCard, TopImg } from '../../styles/influencer-profile';
import Image from 'next/image';
import { CreatorDetails, CreatorsCard } from '../../styles/business-owner.style';
import { getQueryString } from '../../helpers/helper';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const router = useRouter();
    const { data: servicesData, refetch: refetchServicesData } = useQuery(["get-service"], async () => {
        return await exploreServices(getQueryString(getUrl ? getUrl : router.asPath));
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
        refetchServicesData();
        refetch();
    }, [router.asPath])

    return (
        <Container>
            <Wrapper>
                <Content>
                    <Top>
                        <h2>Services</h2>
                    </Top>
                    <Bottom>
                        <Filter>
                            <p id='explore_pagenumber'>{((servicesData?.data?.data?.current_page - 1) * servicesData?.data?.data?.per_page) + servicesData?.data?.data?.data.length} of {servicesData?.data?.data?.total}</p>
                        </Filter>
                        <ListWrapper>
                            {
                                servicesData?.data?.data?.data.map((val, i) => {
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
                        <Pages>
                            <PageBtn onClick={() => servicesData?.data?.data?.current_page.prev_page_url && setGetUrl(servicesData?.data?.data?.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&lt;&lt;</PageBtn>
                            <PageBtn>{servicesData?.data?.data?.current_page}</PageBtn>
                            <PageBtn onClick={() => servicesData?.data?.data?.current_page.next_page_url && setGetUrl(servicesData?.data?.data?.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&gt;&gt;</PageBtn>
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