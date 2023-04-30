import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Category, CategoryWrapper, Container, Content, EmptySearch, Filter, ListWrapper, PageBtn, Pages, Section, Tab, Tabs, Top, TopBanner, ViewMore, Wrapper } from '../../styles/search.style';
import ProfileCard from '../../components/profile-card';
import { getCreators, getExploreNiches, getIndustries, getInfluencers } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getQueryString } from '../../helpers/helper';
import { CustomSelect } from '../../styles/home.style';
import Link from 'next/link';
import Image from 'next/image';
import { getUser } from 'app/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'app/reducers/status';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const [nicheVal, setNicheVal] = useState("");
    const [searchString, setSearchString] = useState("");
    const [seeAll, setSeeAll] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { search } = router.query;
    const user = useSelector(getUser);
    const [firstLoad, setFirstLoad] = useState(true);
    const { data: creatorsData, refetch: refetchCreatorData } = useQuery(["get-creators"], async () => {
        return await getCreators(getQueryString(`${getUrl ? getUrl : firstLoad ? router.asPath : ""}${getQueryString(getUrl ? getUrl : router.asPath) && firstLoad ? `&industry=${currentIndustry}&platform=${nicheVal}` : `?industry=${currentIndustry}&platform=${nicheVal}&search=${searchString}` }`));
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
        refetchCreatorData();
        if (search) {
            setSearchString(search);
        }
    }, [router.asPath, currentIndustry, nicheVal, search])

    return (
        <Container>
             <Section>
                <TopBanner>
                    <h1>Find Creators</h1>
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
                        <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Enter Creator's Name or Interest" />
                        </CustomSelect>
                        <button onClick={(e) => {
                            e.preventDefault();
                            refetchCreatorData();
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
                            {/* <p id='explore_pagenumber'>{((creatorsData?.data?.data?.current_page - 1) * creatorsData?.data?.data?.per_page) + creatorsData?.data?.data?.data.length} of {creatorsData?.data?.data?.total}</p> */}
                            <p id='explore_pagenumber'>{creatorsData?.data?.data?.total} creators available</p>
                            <button>
                                <Image src="/filter.svg" height={16} width={16}/>
                                <span>Filter</span>
                            </button>
                        </Filter>
                        <ListWrapper>
                            {
                                creatorsData?.data?.data?.data.length > 0 ? (
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
                                        profileLink={`/creators/${val.slug}`}
                                        imgSrc={val?.user.profile_pic ?? '/niche8.png'  }
                                        handle={val.twitter}
                                        name={`${val.user.firstname} ${val.user.lastname}`}
                                        sex={val.gender}
                                        rating={val.rating}
                                        skills={val.user.email}
                                        address={val.address}
                                    />
                                })) : (
                                    <EmptySearch>
                                        <Image src="/i-empty.svg" alt="" height={150} width={150} />
                                        <h1>No creators found</h1>
                                        <p>We have no influencers that match your search terms</p>
                                    </EmptySearch>
                                )
                            }
                        </ListWrapper>
                        {
                            !user && (
                                <ViewMore>
                                    <div>
                                        <h1>Sign up to view more creator profiles</h1>
                                        <p>Your customers and fans look to creators to discover new products and make</p>
                                        <Link href="/register" passHref>
                                            <a>Get Started</a>
                                        </Link>
                                    </div>
                                </ViewMore>
                            )
                        }
                        {/* <Pages>
                            <PageBtn onClick={() => creatorsData?.data?.data?.current_page.prev_page_url && setGetUrl(creatorsData?.data?.data?.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&lt;&lt;</PageBtn>
                            <PageBtn>{creatorsData?.data?.data?.current_page}</PageBtn>
                            <PageBtn onClick={() => creatorsData?.data?.data?.current_page.next_page_url && setGetUrl(creatorsData?.data?.data?.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&gt;&gt;</PageBtn>
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