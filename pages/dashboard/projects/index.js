import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProjects } from '../../../api/projects'
import { setError, setLoading } from '../../../app/reducers/status'
import { ChevronLeft, ChevronRight } from '../../../assets/svgIcons'
import LandingLayout from '../../../layouts/landing.layout'
import { ActionBtn, Checkbox, Container, FilterContainer, NavBtn, PageBtn, Pages, Pagination, SearchContainer, Table, TableContent, TableControls, TableFooter, TableHeader, TableWrapper, TBody, Td, Th, THead, Tr, TrH, Wrapper } from '../../../styles/connect-pages.style'

const Projects = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState({
    data: [],
  });
  const { data, refetch } = useQuery(["get-projects"], async () => {
        return await getProjects();
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            setProjectList(res.data.data);
        },
        onError(res) {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: "An error occured"}));
        } 
    });
    useEffect(() => {
        refetch();
    }, []);

  return (
    <Container>
        <Wrapper>
            <TableWrapper>
                <TableHeader>
                    <h2>My Projects</h2>
                </TableHeader>
                <TableControls>
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
                </TableControls>
                <TableContent>
                    <Table>
                        <THead>
                            <TrH>
                                <Th cellWidth="50px">
                                    <Checkbox>
                                    </Checkbox>
                                </Th>
                                <Th cellWidth="500px">Creator</Th>
                                <Th cellWidth="150px">Start Date</Th>
                                <Th cellWidth="150px">Duration</Th>
                                <Th cellWidth="120px">Status</Th>
                                <Th cellWidth="120px">Action</Th>
                            </TrH>
                        </THead>
                        <TBody>
                            {
                                projectList.data.map((val, i) => (
                                    <Tr key={i}>
                                        <Td cellWidth="50px">
                                            <Checkbox>
                                            </Checkbox>
                                        </Td>
                                        <Td cellWidth="500px">{val.provider.firstname} {val.provider.lastname}</Td>
                                        <Td cellWidth="150px">{val.start_date ?? "Not specified"}</Td>
                                        <Td cellWidth="150px">{val.duration_count ?? "Not specified"}</Td>
                                        <Td cellWidth="120px">{val.status}</Td>
                                        <Td cellWidth="120px">
                                            <ActionBtn onClick={() => router.push(`/dashboard/projects/view/${val.id}`)}>View</ActionBtn>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </TBody>
                    </Table>
                </TableContent>
                <TableFooter>
                        <p>Showing {((projectList.current_page - 1) * projectList.per_page) + projectList.data.length} of {projectList.total}</p>
                        <Pagination>
                            <NavBtn onClick={() => projectList.current_page.prev_page_url && setGetUrl(projectList.current_page.prev_page_url.replace("https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1", ""))}>
                                <ChevronLeft />
                            </NavBtn>
                            <Pages>
                                <PageBtn activePage={true}>{projectList.current_page}</PageBtn>
                            </Pages>
                            <NavBtn onClick={() => projectList.current_page.next_page_url && setGetUrl(projectList.current_page.next_page_url.replace("https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1", ""))}>
                                <ChevronRight />
                            </NavBtn>
                        </Pagination>
                    </TableFooter>
            </TableWrapper>
        </Wrapper>
    </Container>
  )
}

Projects.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Projects