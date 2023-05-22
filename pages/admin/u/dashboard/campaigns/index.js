import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllCampaigns } from '../../../../../api/admin'
import { getCampaigns } from '../../../../../api/campaigns'
import { setLoading } from '../../../../../app/reducers/status'
import { ChevronLeft, ChevronRight } from '../../../../../assets/svgIcons'
import AdminLayout from '../../../../../layouts/admin.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../../../styles/connect-pages.style'

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [campaignList, setCampaignList] = useState({
    data: [],
  });
  const { data, refetch } = useQuery(["get-admin-campaigns"], async () => {
    return await getAllCampaigns(getUrl);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(res) {
        dispatch(setLoading(false));
        setCampaignList(res.data.data);
    },
    onError(res) {
        dispatch(setLoading(false));
    } 
});
    useEffect(() => {
        refetch();
    }, [getUrl])
  return (
    <Container>
        <Wrapper>
            <TableWrapper>
                <TableHeader>
                    <h2>Campaigns</h2>
                </TableHeader>
                {/* <TableControls>
                        <SearchContainer>
                            <input type="text" placeholder="Search by influencer"/>
                            <button>
                                <Image src="/search-b.svg" alt="" height={22} width={22}/>
                            </button>
                        </SearchContainer>
                        <FilterContainer>
                            <button><Image src="/filter.svg" alt="" height={20} width={20} /><span>Filter</span></button>
                            <button><Image src="/upload.svg" alt="" height={20} width={20} /><span>Export</span></button>
                            <button>Find Influencers</button>
                        </FilterContainer>
                </TableControls> */}
                <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                    <Checkbox>
                                    </Checkbox>
                                </Th>
                                <Th cellWidth="300px">Influencer</Th>
                                <Th cellWidth="150px">Start Date</Th>
                                <Th cellWidth="150px">Duration</Th>
                                <Th cellWidth="120px">Status</Th>
                                <Th cellWidth="120px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                campaignList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="300px">{val.provider.firstname} {val.provider.lastname}</Td>
                                        <Td cellWidth="150px">{val.start_date ? (new Date(val.start_date)).toDateString() : "Not specified"}</Td>
                                        <Td cellWidth="150px">{val.duration_count ?? "Not specified"} {val.duration_count && val.duration_type}</Td>
                                        <Td cellWidth="120px">{val.status}</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn onClick={() => router.push(`/admin/u/dashboard/campaigns/view/${val.id}`)}>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                </TableContent>
                <TableFooter>
                    <p>Showing {((campaignList.current_page - 1) * campaignList.per_page) + campaignList.data.length} of {campaignList.total}</p>
                    <Pagination>
                        <NavBtn onClick={() => campaignList.current_page.prev_page_url && setGetUrl(campaignList.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronLeft />
                        </NavBtn>
                        <Pages>
                            <PageBtn activePage={true}>{campaignList.current_page}</PageBtn>
                        </Pages>
                        <NavBtn onClick={() => campaignList.current_page.next_page_url && setGetUrl(campaignList.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronRight />
                        </NavBtn>
                    </Pagination>
                </TableFooter>
            </TableWrapper>
        </Wrapper>
    </Container>
  )
}

Campaigns.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default Campaigns
