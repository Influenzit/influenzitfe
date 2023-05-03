import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCampaigns } from '../../../../../api/campaigns'
import { setLoading } from '../../../../../app/reducers/status'
import { ChevronLeft, ChevronRight } from '../../../../../assets/svgIcons'
import LandingLayout from '../../../../../layouts/admin.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../../../styles/connect-pages.style'
import { getAllUsers, verifyUserAccount } from 'api/admin'
import { getQueryString } from 'helpers/helper'
import { toast } from 'react-toastify'

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [userList, setUserList] = useState({
    data: [],
  });
  const { data: usersData, refetch: refetchUsersData } = useQuery(["get-users"], async () => {
    return await getAllUsers(getQueryString(getUrl));
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
const updateAccountMutation = useMutation(
    (data) => {
      return verifyUserAccount(data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Account verified successfully", {
            position: toast.POSITION.TOP_RIGHT
          });
        refetchUsersData();
        dispatch(setLoading(false));
      },
      onError(error) {
        const res = error.response.data;
        dispatch(setLoading(false));
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const verifyAcc = (id) => {
    dispatch(setLoading(true));
    updateAccountMutation.mutate(id);
  }
useEffect(() => {
  refetchUsersData();
  console.log
}, [getUrl])

  return (
    <Container>
        <Wrapper>
            <TableWrapper>
                <TableHeader>
                    <h2>Validate Users</h2>
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
                                <Th cellWidth="250px">Fullname</Th>
                                <Th cellWidth="150px">Join Date</Th>
                                <Th cellWidth="250px">Email</Th>
                                <Th cellWidth="120px">Status</Th>
                                <Th cellWidth="120px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                userList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="250px">{val.firstname} {val.lastname}</Td>
                                        <Td cellWidth="150px">{val.created_at ? (new Date(val.created_at)).toDateString() : "Not specified"}</Td>
                                        <Td cellWidth="250px">{val.email}</Td>
                                        <Td cellWidth="120px">{val.account.influenzit_verified ? "Verified" : "Not Verified"}</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn onClick={() => verifyAcc(val.account.id)}>{val.account.influenzit_verified ? "Disable User" : "Verify User"}</ActionBtn>
                                        </Td>
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

Campaigns.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Campaigns