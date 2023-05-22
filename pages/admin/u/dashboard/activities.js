import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCampaigns } from '../../../../api/campaigns'
import { setLoading } from '../../../../app/reducers/status'
import { ChevronLeft, ChevronRight } from '../../../../assets/svgIcons'
import LandingLayout from '../../../../layouts/admin.layout'
import { ActionBtn, ActionBtnB, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../../styles/connect-pages.style'
import { getAllUsers, verifyUserAccount } from 'api/admin'
import { getQueryString } from 'helpers/helper'
import { toast } from 'react-toastify'
import { getAccountActivities } from 'api/admin'

const Activities = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [userList, setUserList] = useState({
    data: [],
  });
  const { data: usersActivityData, refetch: refetchUsersActivityData } = useQuery(["get-users-activities"], async () => {
    return await getAccountActivities(getUrl);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(res) {
        dispatch(setLoading(false));
        setUserList(res.data.data);
    },
    onError(res) {
        dispatch(setLoading(false));
    } 
});
useEffect(() => {
  refetchUsersActivityData();
}, [getUrl])

  return (
    <Container>
        <Wrapper>
            <TableWrapper>
                <TableHeader>
                    <h2>User Activities</h2>
                </TableHeader>
                <TableWrapper style={{ marginBottom: "15px" }}>
                    <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="300px">Action</Th>
                                <Th cellWidth="200px">Level</Th>
                                <Th cellWidth="540px">Description</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                userList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="300px">{val.action}</Td>
                                        <Td cellWidth="200px">{val.level}</Td>
                                        <Td cellWidth="540px">{val.description}</Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                    </TableContent>
                </TableWrapper>
                <TableFooter>
                    <p>Showing {((userList.current_page - 1) * userList.per_page) + userList.data.length} of {userList.total}</p>
                    <Pagination>
                        <NavBtn onClick={() => userList.prev_page_url && setGetUrl(userList.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronLeft />
                        </NavBtn>
                        <Pages>
                            <PageBtn activePage={true}>{userList.current_page}</PageBtn>
                        </Pages>
                        <NavBtn onClick={() => userList.next_page_url && setGetUrl(userList.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronRight />
                        </NavBtn>
                    </Pagination>
                </TableFooter>
            </TableWrapper>
        </Wrapper>
    </Container>
  )
}

Activities.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Activities;
