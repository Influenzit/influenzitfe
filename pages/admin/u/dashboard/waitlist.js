import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../../app/reducers/status'
import { ChevronLeft, ChevronRight } from '../../../../assets/svgIcons'
import AdminLayout from '../../../../layouts/admin.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../../styles/connect-pages.style'
import { getWaitlist } from '../../../../api/admin'

const Waitlist = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [waitlist, setWaitlist] = useState({
    data: [],
  });
  const { data, refetch } = useQuery(["get-admin-waitlist"], async () => {
    return await getWaitlist(getUrl);
}, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
    onSuccess(res) {
        dispatch(setLoading(false));
        setWaitlist(res.data.data);
    },
    onError(res) {
        dispatch(setLoading(false));
    } 
});
const handleDownload = () => {
    let csvArray = [["Account Type", "Email", "Joined"]]
    if(waitlist.data.length) {
        waitlist.data.forEach((val) => {
            csvArray.push([val.account_type, val.email, (new Date(val.created_at)).toDateString()])
        })
    }
    let csvContent = "data:text/csv;charset=utf-8," + csvArray.map(e => e.join(",")).join("\n");
    const Url = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", Url);
    link.setAttribute("download", "influenzit_waitlist.csv");
    document.body.appendChild(link);
    link.click();
}
    useEffect(() => {
        refetch();
    }, [getUrl])
  return (
    <Container>
        <Wrapper>
            <TableWrapper>
                <TableHeader>
                    <h2>Waitlist</h2>
                    <button onClick={handleDownload}>Export</button>
                </TableHeader>
                <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                </Th>
                                <Th cellWidth="300px">Account Type</Th>
                                <Th cellWidth="350px">Email</Th>
                                <Th cellWidth="150px">Joined</Th>
                                <Th cellWidth="120px"></Th>
                                <Th cellWidth="120px"></Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                waitlist.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                        </Td>
                                        <Td cellWidth="300px">{val.account_type}</Td>
                                        <Td cellWidth="350px">{val.email}</Td>
                                        <Td cellWidth="150px">{(new Date(val.created_at)).toDateString()}</Td>
                                        <Td cellWidth="120px"></Td>
                                        <Td cellWidth="120px"></Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                </TableContent>
                <TableFooter>
                    <p>Showing {((waitlist.current_page - 1) * waitlist.per_page) + waitlist.data.length} of {waitlist.total}</p>
                    <Pagination>
                        <NavBtn onClick={() => waitlist.current_page.prev_page_url && setGetUrl(waitlist.current_page.prev_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronLeft />
                        </NavBtn>
                        <Pages>
                            <PageBtn activePage={true}>{waitlist.current_page}</PageBtn>
                        </Pages>
                        <NavBtn onClick={() => waitlist.current_page.next_page_url && setGetUrl(waitlist.current_page.next_page_url.replace(process.env.NEXT_PUBLIC_API_URI + "/api/v1", ""))}>
                            <ChevronRight />
                        </NavBtn>
                    </Pagination>
                </TableFooter>
            </TableWrapper>
        </Wrapper>
    </Container>
  )
}

Waitlist.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default Waitlist;
