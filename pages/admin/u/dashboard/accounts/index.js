import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState(); // [true, false]
  const showStatusHandler = () => setShowStatus(!showStatus);

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
    console.log;
  }, [getUrl]);
  const statusHandler = (status) => {
    setVerified(status);
    setShowStatus(false);
  };
  const searchHandler = () => {
    return userList.data.filter((val) => {
      return (
        val.user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        val.user.lastname.toLowerCase().includes(search.toLowerCase()) ||
        val.user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  };
  let filterUserList =
    verified === true
      ? searchHandler().filter((val) => val.influenzit_verified)
      : verified === false
      ? searchHandler().filter((val) => !val.influenzit_verified)
      : searchHandler();

  //console.log(filter);

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
                    setSearch(e.target.value);
                  }}
                  value={search}
                  placeholder="Search for influencers"
                  className="border-[#E1E8F1] border text-[#667085] rounded-md py-2 text-sm w-[300px] px-4 outline-none focus:ring-1 focus:ring-[#2A2939]"
                />{" "}
              </form>
              <div className="relative">
                <button
                  onClick={showStatusHandler}
                  className="text-[#667085;] border rounded-md py-2 text-sm w-fit px-4 flex items-center justify-center bg-[#F9FAFB]"
                >
                  Status
                </button>
                {showStatus && (
                  <div className="absolute shadow-lg rounded-md py-2 text-sm w-[110px] text-[#667085]  px-4 flex flex-col bg-white right-0 z-10">
                    <button
                      onClick={() => {
                        statusHandler(true);
                      }}
                    >
                      Verified
                    </button>
                    <button
                      onClick={() => {
                        statusHandler(false);
                      }}
                    >
                      Not Verified
                    </button>
                  </div>
                )}
              </div>
            </div>
          </TableHeader>
          <TableWrapper style={{ marginBottom: "15px" }}>
            <TableContent>
              <Table>
                <THead>
                  <TrH>
                    <Th cellWidth="370px">Fullname</Th>
                    <Th cellWidth="250px">Email</Th>
                    <Th cellWidth="120px">Status</Th>
                    <Th cellWidth="200px">Action</Th>
                  </TrH>
                </THead>
                <TBody>
                  {filterUserList.map((val, i) => (
                    <Tr key={i}>
                      <Td cellWidth="370px">
                        {val.user.firstname} {val.user.lastname}
                      </Td>
                      <Td cellWidth="250px">{val.user.email}</Td>
                      <Td cellWidth="120px">
                        {val.influenzit_verified ? "Verified" : "Not Verified"}
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
                          {val.influenzit_verified
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
                  {filterUserList.length === 0 && (
                    <div className="text-center p-3 text-xl text-[#667085;]">
                      No influencers for this category
                    </div>
                  )}
                </TBody>
              </Table>
            </TableContent>
          </TableWrapper>
          <TableFooter>
            <p>
              Showing{" "}
              {(userList.current_page - 1) * userList.per_page +
                userList.data.length}{" "}
              of {userList.total}
            </p>
            <Pagination>
              <NavBtn
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
              <Pages>
                <PageBtn activePage={true}>{userList.current_page}</PageBtn>
              </Pages>
              <NavBtn
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
