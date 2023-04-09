import React, { useEffect, useState } from 'react';
import LandingLayout from '../../layouts/landing.layout';
import { Bottom, Category, CategoryWrapper, Container, Content, Filter, ListWrapper, PageBtn, Pages, Section, Tab, Tabs, Top, TopBanner, ViewMore, Wrapper } from '../../styles/search.style';
import ProfileCard from '../../components/profile-card';
import { getCreators, getExploreNiches, getInfluencers } from '../../api/influencer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getQueryString } from '../../helpers/helper';
import { CustomSelect } from '../../styles/home.style';
import Link from 'next/link';
import Image from 'next/image';

const Search = () => {
    const [getUrl, setGetUrl] = useState("");
    const router = useRouter();
    const { data: creatorsData, refetch: refetchCreatorData } = useQuery(["get-service"], async () => {
        return await getCreators(getQueryString(getUrl ? getUrl : router.asPath));
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false
    });
    const category = ["Food", "Fashion", "Travel", "Lifestyle", "Health & Fitness", "Gadgets & Technology", "Family & Children", "Sports"];
    const [nicheVal, setNicheVal] = useState("");
    const [searchString, setSearchString] = useState("");
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
             <Section>
                <TopBanner>
                    <h1>Find Creators</h1>
                    <form>
                        <CustomSelect borderLeft>
                            <label>Platform</label>
                            <select val={nicheVal} onChange={(e) => setNicheVal(e.target.value)}>
                                <option value="">Choose Platform</option>
                                <option value="Tiktok">Tiktok</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
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
                        {category.map((val, i) => (
                            <Category key={i}>{val}</Category>
                        ))}
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
                                        skills={genSkills}
                                        address={val.address}
                                    />
                                })
                            }
                        </ListWrapper>
                        <ViewMore>
                            <div>
                                <h1>Sign up to view more creator profiles</h1>
                                <p>Your customers and fans look to creators to discover new products and make</p>
                                <Link href="/register" passHref>
                                    <a>Get Started</a>
                                </Link>
                            </div>
                        </ViewMore>
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