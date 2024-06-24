import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaigns } from "../../../../../api/campaigns";
import status, { setLoading } from "../../../../../app/reducers/status";
import { ChevronLeft, ChevronRight } from "../../../../../assets/svgIcons";
import LandingLayout from "../../../../../layouts/admin.layout";
import {
  ActionBtn,
  ActionBtnB,
  Checkbox,
  Container,
  FilterContainer,
  NavBtn,
  PageBtn,
  Pages,
  Pagination,
  SearchContainer,
  Table,
  TableContent,
  TableControls,
  TableFooter,
  TableHeader,
  TableWrapped,
  TableWrapper,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrH,
  Wrapper,
} from "../../../../../styles/connect-pages.style";
import { getAllUsers, verifyUserAccount } from "api/admin";
import { getQueryString } from "helpers/helper";
import { toast } from "react-toastify";
import Link from "next/link";
import styled from "styled-components";
import { axiosInstance } from "../../../../../api/axios";
const DOTS = "...";
const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // [true, false]
  const [accountType, setAccountType] = useState(""); // [is_influencer, is_creator, is_businessowner]
  const [showAccount, setShowAccount] = useState(false);

  const showStatusHandler = () => setShowStatus(!showStatus);
  const showAccountHandler = () => setShowAccount(!showAccount);
  const accountTypeHandler = (type) => {
    setAccountType(type);
    console.log(getUrl);
    setShowAccount(false);
  };
  const [userList, setUserList] = useState({
    data: [],
  });

  const { data: usersData, refetch: refetchUsersData } = useQuery(
    ["get-users"],
    async () => {
      return await getAllUsers(getQueryString(getUrl));
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        console.log(res.data.data);
        setUserList(res.data.data);
        console.log(res.data.data);
      },
      onError(res) {
        dispatch(setLoading(false));
      },
    }
  );
  const updateAccountMutation = useMutation(
    (data) => {
      return verifyUserAccount(data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Account verified successfully", {
          position: toast.POSITION.TOP_RIGHT,
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
  };
  useEffect(() => {
    refetchUsersData();
  }, [getUrl, refetchUsersData]);
  const statusHandler = (status_) => {
    setStatus(status_);
    // setGetUrl(
    //   `?account_type=${accountType}&status=${status}&fullname=${search}`
    // );
    setShowStatus(false);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setGetUrl(
      `?account_type=${accountType}&status=${status}&fullname=${search}`
    );
  };
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const paginationRange = useMemo(() => {
    let siblingCount = 1;
    const totalPageCount = Math.ceil(userList.total / userList.per_page);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(userList.current_page - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      userList.current_page + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [userList.current_page, userList.per_page, userList.total]);

  console.log(userList);
  return (
    <Container>
      <Wrapper>
        <TableWrapped>
          <TableHeader>
            <h2>Validate Users</h2>

            <div className="flex gap-4">
              <form>
                {" "}
                <input
                  type="search"
                  name="search"
                  id="search"
                  onChange={(e) => {
                    searchHandler(e);
                  }}
                  value={search}
                  placeholder="Search for influencers"
                  className="border-[#E1E8F1] border text-[#667085] rounded-md py-2 text-sm w-[300px] px-4 outline-none focus:ring-1 focus:ring-[#2A2939]"
                />{" "}
              </form>
              <div className="relative">
                <button
                  onClick={showStatusHandler}
                  className="text-[#667085;] border capitalize rounded-md py-2 text-sm w-fit px-4 flex items-center justify-center bg-[#F9FAFB]"
                >
                  {status === "" ? "Status" : status.split("_").join(" ")}
                </button>
                {showStatus && (
                  <>
                    <div className="absolute shadow-lg rounded-md py-2 text-sm w-[150px] text-[#667085]  px-2 flex flex-col bg-white right-0 z-10">
                      <button
                        onClick={() => {
                          setGetUrl(
                            `?status=verified&account_type=${accountType}&fullname=${search}`
                          );
                          statusHandler("verified");
                        }}
                        className={`${
                          status === "verified" &&
                          "bg-[#F9FAFB] border rounded-md p-[2px] font-semibold text-[#667085;] "
                        }`}
                      >
                        Verified
                      </button>
                      <button
                        onClick={() => {
                          setGetUrl(
                            `?status=not_verified&account_type=${accountType}&fullname=${search}`
                          );
                          statusHandler("not_verified");
                        }}
                        className={`${
                          status === "not_verified" &&
                          "bg-[#F9FAFB] border rounded-md p-[2px] font-semibold text-[#667085;] "
                        }`}
                      >
                        Not Verified
                      </button>
                    </div>
                    <div
                      onClick={showStatusHandler}
                      className="fixed top-0 left-0 w-full h-screen transparent z-5"
                    ></div>
                  </>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={showAccountHandler}
                  className="text-[#667085;] capitalize border rounded-md py-2 text-sm w-fit px-4 flex items-center justify-center bg-[#F9FAFB]"
                >
                  {accountType === ""
                    ? "Account Type"
                    : accountType.split("_")[1]}
                </button>
                {showAccount && (
                  <>
                    <div className="absolute shadow-lg rounded-md py-2 text-sm w-[150px] text-[#667085]  px-2 flex flex-col gap-[2px] bg-white right-0 z-10">
                      <button
                        onClick={() => {
                          setGetUrl(
                            `?account_type=is_influencer&status=${status}&fullname=${search}`
                          );
                          accountTypeHandler("is_influencer");
                        }}
                        className={`${
                          accountType === "is_influencer" &&
                          "bg-[#F9FAFB] border rounded-md p-[2px] font-semibold text-[#667085;] "
                        }`}
                      >
                        Influencer
                      </button>
                      <button
                        onClick={() => {
                          setGetUrl(
                            `?account_type=is_creator&status=${status}&fullname=${search}`
                          );
                          accountTypeHandler("is_creator");
                        }}
                        className={`${
                          accountType === "is_creator" &&
                          "bg-[#F9FAFB] border rounded-md p-[2px] font-semibold text-[#667085;] "
                        }`}
                      >
                        Creator
                      </button>
                      <button
                        onClick={() => {
                          setGetUrl(
                            `?account_type=is_businessowner&status=${status}&fullname=${search}`
                          );
                          accountTypeHandler("is_businessowner");
                        }}
                        className={`${
                          accountType === "is_businessowner" &&
                          "bg-[#F9FAFB] border rounded-md p-[2px] font-semibold text-[#667085;] "
                        }`}
                      >
                        Business owner
                      </button>
                    </div>
                    <div
                      onClick={showAccountHandler}
                      className="fixed top-0 left-0 w-full h-screen transparent z-5"
                    ></div>
                  </>
                )}
              </div>
            </div>
          </TableHeader>
          <TableWrapper style={{ marginBottom: "15px" }}>
            <TableContent>
              <Table>
                <THead>
                  <TrH>
                    <Th cellWidth="320px">Fullname</Th>
                    <Th cellWidth="250px">Email</Th>
                    <Th cellWidth="150px">Phone Number</Th>
                    <Th cellWidth="120px">Status</Th>
                    <Th cellWidth="200px">Action</Th>
                  </TrH>
                </THead>
                <TBody>
                  {userList.data.map((val, i) => (
                    <Tr key={i}>
                      <Td cellWidth="320px">
                        {val.?user?.firstname} {val?.user?.lastname}
                      </Td>
                      <Td cellWidth="250px">{val.user.email}</Td>
                      <Td cellWidth="150px">
                        {val.phone1 === null ? "Not Available" : val.phone1}
                      </Td>
                      <Td cellWidth="120px">
                        {val?.influenzit_verified ? "Verified" : "Not Verified"}
                      </Td>
                      <Td
                        cellWidth="200px"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingRight: "20px",
                        }}
                      >
                        <ActionBtn onClick={() => verifyAcc(val.id)}>
                          {val?.influenzit_verified
                            ? "Disapprove User"
                            : "Approve User"}
                        </ActionBtn>
                        <span
                          className={
                            "outline-none cursor-pointer inline-flex items-center text-xs py-[6px] px-3 text-white bg-[#2A2939] font-semibold rounded-lg  "
                          }
                        >
                          <Link href={`/admin/u/dashboard/accounts/${val.id}`}>
                            View
                          </Link>
                        </span>
                      </Td>
                    </Tr>
                  ))}
                  {userList.data.length === 0 && (
                    <div className="text-center p-3 text-xl text-[#667085;]">
                      No influencers for this category
                    </div>
                  )}
                </TBody>
              </Table>
            </TableContent>
          </TableWrapper>
          <TableFooter>
            <p className="w-fit mr-2 ">
              Showing{" "}
              {(userList.current_page - 1) * userList.per_page +
                userList.data.length}{" "}
              of {userList.total}
            </p>
            <Pagination className="w-full flex justify-between">
              <NavBtn
                disabled={userList.prev_page_url === null}
                className="disabled:cursor-not-allowed"
                onClick={() =>
                  userList.prev_page_url &&
                  setGetUrl(
                    userList.prev_page_url.replace(
                      process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                      ""
                    )
                  )
                }
              >
                <ChevronLeft />
              </NavBtn>
              <div className="flex gap-1">
                {paginationRange?.map((pageNumber) => {
                  if (pageNumber === "DOTS") {
                    return <Pages key={pageNumber}>...</Pages>;
                  }
                  return (
                    <Pages key={pageNumber}>
                      <PageBtn
                        className={"w-10 h-10"}
                        activePage={userList.current_page === pageNumber}
                        onClick={() => setGetUrl(`?page=${pageNumber}`)}
                      >
                        {pageNumber}
                      </PageBtn>
                    </Pages>
                  );
                })}
              </div>

              <NavBtn
                className="disabled:cursor-not-allowed "
                disabled={userList.next_page_url === null}
                onClick={() =>
                  userList.next_page_url &&
                  setGetUrl(
                    userList.next_page_url.replace(
                      process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                      ""
                    )
                  )
                }
              >
                <ChevronRight />
              </NavBtn>
            </Pagination>
          </TableFooter>
        </TableWrapped>
      </Wrapper>
    </Container>
  );
};

Campaigns.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Campaigns;
