import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Category, CategoryWrapper, Container, Content, EmptySearch, Filter, ListWrapper, PageBtn, Pages, Section, Tab, Tabs, Top, TopBanner, ViewMore, Wrapper } from '../../styles/search.style';
import ProfileCard from '../../components/profile-card';
import { getExploreNiches, getIndustries, getInfluencers } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getQueryString } from '../../helpers/helper';
import { CustomSelect } from '../../styles/home.style';
import Image from 'next/image';
import Link from 'next/link';
import { getUser } from 'app/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'app/reducers/status';
import Loader from 'components/UI/Loader';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const [nicheVal, setNicheVal] = useState("");
    const [searchString, setSearchString] = useState("");
    const [seeAll, setSeeAll] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [influencerList, setInfluencerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { search } = router.query;
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [currentIndustry, setCurrentIndustry] = useState("");
    const { data: influencersData, refetch: refetchInfluencerData } = useQuery(["get-influencers"], async () => {
        return await getInfluencers(getQueryString(`${getUrl ? getUrl : firstLoad ? router.asPath : ""}${getQueryString(getUrl ? getUrl : router.asPath) && firstLoad ? `&platform=${nicheVal}` : `?industry=${currentIndustry}&platform=${nicheVal}&search=${searchString}` }`));
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            setFirstLoad(false);
            setIsLoading(false);
            sessionStorage.setItem("inp", res.data.data.next_page_url ? res.data.data.next_page_url : "");
            setInfluencerList((prev) => {
                if(isLoading) {
                    return [...prev, ...res.data.data.data]
                } else {
                    return res.data.data.data;
                }
            })
        }
    });
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
    // const category = ["Food", "Fashion", "Travel", "Lifestyle", "Health & Fitness", "Gadgets & Technology", "Family & Children", "Sports"];
    const { data, refetch } = useQuery(["get-niche"], async () => {
        return await getExploreNiches();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });
    const handleScroll = (e) => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight - 300;
        if(window.scrollY >= scrollHeight) {
            if(localStorage.getItem("token")) {
                if(sessionStorage.getItem("inp")) {
                    console.log("verified fetching next page...");
                    setIsLoading(true);
                    setGetUrl(sessionStorage.getItem("inp"));
                }
            }
        }
    }
    useEffect(() => {
        refetchIndustryData();
        refetch();
    }, [router.asPath])
    useEffect(() => {
        refetchInfluencerData();
        if (search) {
            setSearchString(search);
        }
    }, [router.asPath, currentIndustry, nicheVal, search])
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return (
        <Container>
            <Section>
                <TopBanner>
                    <h1>Find Influencers</h1>
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
                        <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Enter Influencer's Name or Interest" />
                        </CustomSelect>
                        <button onClick={(e) => {
                            e.preventDefault();
                            refetchInfluencerData();
                            dispatch(setLoading(true));
                        }}><Image src="/search.svg" height={15} width={15}/></button>
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
                            <p id='explore_pagenumber'>{influencersData?.data?.data?.total} influencers available</p>
                            <button>
                                <Image src="/filter.svg" height={16} width={16}/>
                                <span>Filter</span>
                            </button>
                        </Filter>
                        <ListWrapper>
                            {
                                influencerList.length > 0 &&
                                influencerList.map((val, i) => {
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
                                        profileLink={`/influencers/${val.slug}`}
                                        imgSrc={val?.user.profile_pic ?? '/niche8.png'  }
                                        handle={val.twitter}
                                        name={val.user.display_name ?? ""}
                                        sex={val.gender}
                                        rating={val.rating.rating_count}
                                        skills={val.niche}
                                        address={val.address}
                                        platforms={val}
                                    />
                                })
                            }
                        </ListWrapper>
                        {
                            (
                                firstLoad ? <Loader /> : influencerList.length === 0 ? ( <EmptySearch>
                                    <Image src="/i-empty.svg" alt="" height={150} width={150} />
                                    <h1>No influencers found</h1>
                                    <p>We have no influencers that match your search terms</p>
                                </EmptySearch>) : null
                            )
                        }
                        {
                            isLoading && <Loader />
                        }
                        {
                            !user && (<ViewMore>
                                <div>
                                    <h1>Sign up to view more influencer profiles</h1>
                                    <p>Your customers and fans look to creators to discover new products and make</p>
                                    <Link href="/register" passHref>
                                        <a>Get Started</a>
                                    </Link>
                                </div>
                            </ViewMore>)
                        }
                        {/* <Pages>
                            <PageBtn onClick={() => influencersData?.data?.data?.current_page.prev_page_url && setGetUrl(influencersData?.data?.data?.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&lt;&lt;</PageBtn>
                            <PageBtn>{influencersData?.data?.data?.current_page}</PageBtn>
                            <PageBtn onClick={() => influencersData?.data?.data?.current_page.next_page_url && setGetUrl(influencersData?.data?.data?.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>&gt;&gt;</PageBtn>
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