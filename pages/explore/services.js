import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Category, CategoryWrapper, Container, Content, Filter, ListWrapper, PageBtn, Pages, Section, Tab, Tabs, Top, TopBanner, ViewMore, Wrapper } from '../../styles/search.style';
import { exploreServices, getExploreNiches, getIndustries } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { EmptyWrapper, ImageWrap, ServRate, ServStats, ServUserCard, TopImg } from '../../styles/influencer-profile';
import Image from 'next/image';
import { CreatorDetails, CreatorsCard } from '../../styles/business-owner.style';
import { getQueryString } from '../../helpers/helper';
import { CustomSelect } from '../../styles/home.style';
import ServiceCard from '../../components/service-card';
import Link from 'next/link';
import { getUser } from '../../app/reducers/user';
import { useSelector } from 'react-redux';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const router = useRouter();
    const user = useSelector(getUser);
    const [nicheVal, setNicheVal] = useState("");
    const [searchString, setSearchString] = useState("");
    const { data: servicesData, refetch: refetchServicesData } = useQuery(["get-service"], async () => {
        return await exploreServices(getQueryString(`${getUrl ? getUrl : router.asPath}${getQueryString(getUrl ? getUrl : router.asPath) ? "&" : "?" }industry=${currentIndustry}&platform=${nicheVal}`));
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
    const [currentIndustry, setCurrentIndustry] = useState("");
    const [category, setCategory] = useState([]);
    const { data: industryData, refetch: refetchIndustryData } = useQuery(["get-industries"], async () => {
        return await getIndustries();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(data) {
            setCategory(data.data.data);
        }
    });
    useEffect(() => {
        refetchIndustryData();
        refetch();
    }, [router.asPath]);
    useEffect(() => {
        refetchServicesData();
    }, [router.asPath, currentIndustry, nicheVal])

    return (
        <Container>
            <Section>
                <TopBanner>
                    <h1>Find Services</h1>
                    <form>
                        <CustomSelect borderLeft>
                            <label>Platform</label>
                            <select val={nicheVal} onChange={(e) => setNicheVal(e.target.value)}>
                                <option value="">All</option>
                                <option value="tiktok">Tiktok</option>
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="youtube">Youtube</option>
                                <option value="twitter">Twitter</option>
                            </select>
                        </CustomSelect>
                        <CustomSelect>
                        <label>Search</label>
                        <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Enter keyword, niche or category" />
                        </CustomSelect>
                        <button onClick={(e) => {
                        e.preventDefault();
                        router.push(`/explore?search=${searchString}&niche=${nicheVal.toLocaleLowerCase()}`);
                        }}><Image src="/search.svg" height={20} width={20}/></button>
                    </form>
                    <CategoryWrapper>
                        <Category isSelected={"" === currentIndustry} onClick={() => setCurrentIndustry("")}>All</Category>
                        {category.map((val, i) => (
                            <Category key={i} isSelected={val === currentIndustry} onClick={() => setCurrentIndustry(val)}>{val}</Category>
                        ))}
                    </CategoryWrapper>
                </TopBanner>
            </Section>
            <Wrapper>
                <Content>
                    <Bottom>
                        <Filter>
                            <p id='explore_pagenumber'>{((servicesData?.data?.data?.current_page - 1) * servicesData?.data?.data?.per_page) + servicesData?.data?.data?.data.length} of {servicesData?.data?.data?.total}</p>
                        </Filter>
                        <ListWrapper>
                            {
                                servicesData?.data?.data?.data.map((val, i) => {
                                    return (
                                        <ServiceCard
                                            key={i}
                                            title={val.name}
                                            imgSrc={val.media[0]?.url ?? "/web-services.jpg"}
                                            userName={`${val.user.firstname} ${val.user.lastname}`}
                                            price={`${val.currency} ${val.starting_from}`}
                                            serviceLink={`/services/${val.id}`}
                                            profileImg={val.user.profile_pic}
                                        />
                                    )
                                })
                            }
                        </ListWrapper>
                        {!user && (
                            <ViewMore>
                                <div>
                                    <h1>Sign up to view more services</h1>
                                    <p>Your customers and fans look to creators to discover new products and make</p>
                                    <Link href="/register" passHref>
                                        <a>Get Started</a>
                                    </Link>
                                </div>
                            </ViewMore>
                        )}
                        {/* <Pages>
                            <PageBtn onClick={() => servicesData?.data?.data?.current_page.prev_page_url && setGetUrl(servicesData?.data?.data?.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&lt;&lt;</PageBtn>
                            <PageBtn>{servicesData?.data?.data?.current_page}</PageBtn>
                            <PageBtn onClick={() => servicesData?.data?.data?.current_page.next_page_url && setGetUrl(servicesData?.data?.data?.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&gt;&gt;</PageBtn>
                        </Pages> */}
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