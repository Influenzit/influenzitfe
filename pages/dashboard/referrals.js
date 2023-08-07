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
import { getAllReviews, getReferrals } from 'api/auth'
import { getUser } from 'app/reducers/user'

const Reviews = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const user = useSelector(getUser);
  const [reviewList, setReviewList] = useState({
    refferred: [],
  });
  const { data: reviewsData, refetch: refetchReviewsData } = useQuery(["get-reviews"], async () => {
        // return await getReferrals(getQueryString(getUrl));
        return await getReferrals();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            setReviewList({ refferred: res.data.data.refferred });
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
                    <h2>Referrals</h2>
                </TableHeader>
                <TableWrapper style={{ marginBottom: "15px" }}>
                    <TableContent>
                        <Table>
                            <THead>
                                <TrH>
                                    <Th cellWidth="400px">Name</Th>
                                    <Th cellWidth="250px">Email</Th>
                                    <Th cellWidth="290px">Referral Id</Th>
                                </TrH>
                            </THead>
                            <TBody>
                                {
                                    reviewList?.refferred.map((val, i) => (
                                        <Tr key={i}>
                                            <Td cellWidth="400px">{val.firstname} {val.lastname}</Td>
                                            <Td cellWidth="250px">{val.email}</Td>
                                            <Td cellWidth="290px">{val.referred_id}</Td>
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
