import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../../../app/reducers/status'
import { ChevronLeft, ChevronRight } from '../../../../../assets/svgIcons'
import LandingLayout from '../../../../../layouts/admin.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapped, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../../../styles/connect-pages.style'
import { getAllBusinesses } from '../../../../../api/admin'
import { getQueryString } from 'helpers/helper'
import { toast } from 'react-toastify'

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [businessList, setBusinessList] = useState({
    data: [],
  });
  const { data: businessData, refetch: refetchBusinessData } = useQuery(["get-businesses"], async () => {
    return await getAllBusinesses(getQueryString(getUrl));
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(res) {
        dispatch(setLoading(false));
        setBusinessList(res.data.data);
    },
    onError(res) {
        dispatch(setLoading(false));
    } 
});
useEffect(() => {
  refetchBusinessData();
  console.log
}, [getUrl])

  return (
    <Container>
        <Wrapper>
            <TableWrapped>
                <TableHeader>
                    <h2>Businesses</h2>
                </TableHeader>
                {/* <TableControls>
                        <SearchContainer>
                            <input type="text" placeholder="Search by user"/>
                            <button>
                                <Image src="/search-b.svg" alt="" height={22} width={22}/>
                            </button>
                        </SearchContainer> 
                </TableControls> */}
                <TableWrapper style={{ marginBottom: "15px" }}>
                    <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                    <Checkbox>
                                    </Checkbox>
                                </Th>
                                <Th cellWidth="250px">Name</Th>
                                <Th cellWidth="150px">Phone</Th>
                                <Th cellWidth="250px">Email</Th>
                                <Th cellWidth="140px">Website</Th>
                                <Th cellWidth="80px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                businessList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="250px">{val.name}</Td>
                                        <Td cellWidth="150px">{val.phone}</Td>
                                        <Td cellWidth="250px">{val.email}</Td>
                                        <Td cellWidth="140px">{val.website}</Td>
                                        <Td cellWidth="80px">
                                            <ActionBtn onClick={() => router.push(`/admin/u/dashboard/businesses/${val.id}`)}>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                    </TableContent>
                </TableWrapper>
                <TableFooter>
                    <p>Showing {((businessList.current_page - 1) * businessList.per_page) + businessList.data.length} of {businessList.total}</p>
                    <Pagination>
                        <NavBtn onClick={() => businessList.prev_page_url && setGetUrl(businessList.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronLeft />
                        </NavBtn>
                        <Pages>
                            <PageBtn activePage={true}>{businessList.current_page}</PageBtn>
                        </Pages>
                        <NavBtn onClick={() => businessList.next_page_url && setGetUrl(businessList.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronRight />
                        </NavBtn>
                    </Pagination>
                </TableFooter>
            </TableWrapped>
        </Wrapper>
    </Container>
  )
}

Campaigns.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Campaigns