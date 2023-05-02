import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Category, CategoryWrapper, Container, Content, EmptySearch, Filter, ListWrapper, PageBtn, Pages, Section, Tab, Tabs, Top, TopBanner, ViewMore, Wrapper } from '../../styles/search.style';
import { exploreServices, getExploreNiches, getIndustries, getServices } from '../../api/influencer';
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
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'app/reducers/status';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const router = useRouter();
    const { search } = router.query;
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [nicheVal, setNicheVal] = useState("");
    const [seeAll, setSeeAll] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [firstLoad, setFirstLoad] = useState(true);
    const { data: servicesData, refetch: refetchServicesData } = useQuery(["get-services"], async () => {
        return await exploreServices(getQueryString(`${getUrl ? getUrl : firstLoad ? router.asPath : ""}${getQueryString(getUrl ? getUrl : router.asPath) && firstLoad ? `&industry=${currentIndustry}&platform=${nicheVal}` : `?industry=${currentIndustry}&platform=${nicheVal}&search=${searchString}` }`));
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess() {
            dispatch(setLoading(false));
            setFirstLoad(false);
        }
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
        if (search) {
            setSearchString(search);
        }
    }, [router.asPath, currentIndustry, nicheVal, search])

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
                        <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Enter Service Name" />
                        </CustomSelect>
                        <button onClick={(e) => {
                            e.preventDefault();
                           refetchServicesData();
                           dispatch(setLoading(true));
                        }}><Image src="/search.svg" height={20} width={20}/></button>
                    </form>
                    <CategoryWrapper>
                        <Category isSelected={"" === currentIndustry} onClick={() => setCurrentIndustry("")}>All</Category>
                        {(seeAll ? category : JSON.parse(JSON.stringify(category)).splice(0, 8)).map((val, i) => (
                            <Category key={i} isSelected={val === currentIndustry} onClick={() => setCurrentIndustry(val)}>{val}</Category>
                        ))}
                        <Category onClick={() => setSeeAll(!seeAll)}>{seeAll ? "See less" : "See all"}</Category>
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
                                servicesData?.data?.data?.data.length > 0 ?
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
                                }) : (
                                    <EmptySearch>
                                        <Image src="/i-empty.svg" alt="" height={150} width={150} />
                                        <h1>No services found</h1>
                                        <p>We have no services that match your search terms</p>
                                    </EmptySearch>
                                )
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