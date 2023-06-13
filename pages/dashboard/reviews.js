import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight } from '../../assets/svgIcons'
import LandingLayout from '../../layouts/landing.layout'
import { ActionBtn, ActionBtnB, Checkbox, Container, FilterContainer, HTab, HTabs, NavBtn, PageBtn, Pages, Pagination, SearchContainer, TabBtn, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapped, TableWrapper, Tabs, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../styles/connect-pages.style'
import { getQueryString } from 'helpers/helper'
import { toast } from 'react-toastify'
import { InputContainer } from 'styles/auth.style'
import { setLoading } from 'app/reducers/status'
import { getAllReviews } from 'api/auth'
import { getUser } from 'app/reducers/user'

const Reviews = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const user = useSelector(getUser);
  const [reviewList, setReviewList] = useState({
    data: [],
  });
  const { data: reviewsData, refetch: refetchReviewsData } = useQuery(["get-reviews"], async () => {
    return await getAllReviews(getQueryString(getUrl), user?.account?.id);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(res) {
        dispatch(setLoading(false));
        setReviewList(res.data);
    },
    onError(res) {
        dispatch(setLoading(false));
    } 
});
useEffect(() => {
  refetchReviewsData();
}, [getUrl])

  return (
    <Container>
        <Wrapper>
            <TableWrapped>
                <TableHeader>
                    <h2>Reviews</h2>
                    <div id="left">
                        {/* <InputContainer>
                            <label>Ratings</label>
                            <select>
                                <option>1 star</option>
                                <option>2 stars</option>
                                <option>3 stars</option>
                                <option>4 stars</option>
                                <option>5 stars</option>
                            </select>
                        </InputContainer>
                        <InputContainer>
                            <label>Time</label>
                            <select>
                                <option>Latest</option>
                                <option>Oldest</option>
                            </select>
                        </InputContainer> */}
                    </div>
                    {/* <Tabs style={{ fontSize: "14px", height: "40px" }}>
                        <TabBtn isActive={currentTab === ""} onClick={() => setCurrentTab("")}>
                            <span>All</span>
                        </TabBtn>
                        <TabBtn isActive={currentTab === "1"} onClick={() => setCurrentTab("1")}>
                            <span>1</span> <Image src="/star-p.svg" alt="" height={10} width={10}/>
                        </TabBtn>
                        <TabBtn isActive={currentTab === "2"} onClick={() => setCurrentTab("2")}>
                            <span>2</span> <Image src="/star-p.svg" alt="" height={10} width={10}/>
                        </TabBtn>
                        <TabBtn isActive={currentTab === "3"} onClick={() => setCurrentTab("3")}>
                            <span>3</span> <Image src="/star-p.svg" alt="" height={10} width={10}/>
                        </TabBtn>
                        <TabBtn isActive={currentTab === "4"} onClick={() => setCurrentTab("4")}>
                            <span>4</span> <Image src="/star-p.svg" alt="" height={10} width={10}/>
                        </TabBtn>
                        <TabBtn isActive={currentTab === "5"} onClick={() => setCurrentTab("5")}>
                            <span>5</span> <Image src="/star-p.svg" alt="" height={10} width={10}/>
                        </TabBtn>
                    </Tabs> */}
                </TableHeader>
                <TableWrapper style={{ marginBottom: "15px" }}>
                    <TableContent>
                        <Table>
                            <THead>
                                <TrH>
                                    <Th cellWidth="400px">Message</Th>
                                    <Th cellWidth="250px">Name</Th>
                                    <Th cellWidth="140px">Ratings</Th>
                                    <Th cellWidth="150px">Action</Th>
                                </TrH>
                            </THead>
                            <TBody>
                                {
                                    reviewList?.data.map((val, i) => (
                                        <Tr key={i}>
                                            <Td cellWidth="400px">{val.comment}</Td>
                                            <Td cellWidth="250px">{val.name}</Td>
                                            <Td cellWidth="140px">{val.rating}</Td>
                                            <Td cellWidth="150px">
                                                <ActionBtnB onClick={() => {}}>Appeal</ActionBtnB>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </TBody>
                        </Table>
                    </TableContent>
                </TableWrapper>
                {/* <TableFooter>
                    <p>Showing {((reviewList.current_page - 1) * reviewList.per_page) + reviewList.data.length} of {reviewList.total}</p>
                    <Pagination>
                        <NavBtn onClick={() => reviewList.prev_page_url && setGetUrl(reviewList.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronLeft />
                        </NavBtn>
                        <Pages>
                            <PageBtn activePage={true}>{reviewList.current_page}</PageBtn>
                        </Pages>
                        <NavBtn onClick={() => reviewList.next_page_url && setGetUrl(reviewList.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronRight />
                        </NavBtn>
                    </Pagination>
                </TableFooter> */}
            </TableWrapped>
        </Wrapper>
    </Container>
  )
}

Reviews.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Reviews
