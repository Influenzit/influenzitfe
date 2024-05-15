import Image from "next/image";
import cancel from "./../../assets/close.svg";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/admin";
import { getQueryString } from "../../helpers/helper";
import { useDispatch } from "react-redux";
import { Pages, PageBtn, NavBtn } from "../../styles/connect-pages.style";
import { ChevronLeft, ChevronRight } from "../../assets/svgIcons";

const DOTS = "...";
export const UsersList = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [getUrl, setGetUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPagesSelected, setAllPagesSelected] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(false);
        console.log(res.data.data);
        setUsers(res.data.data);
        setCurrentPage(res.data.current_page);
        console.log(res.data.data);
      },
      onError(res) {
        setLoading(false);
      },
    }
  );
  useEffect(() => {
    refetchUsersData();
  }, [getUrl, refetchUsersData]);
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const paginationRange = useMemo(() => {
    let siblingCount = 1;
    const totalPageCount = Math.ceil(users.total / users.per_page);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(users.current_page - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      users.current_page + siblingCount,
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
  }, [users.current_page, users.per_page, users.total]);
  const handleSelectedUsers = (e) => {
    const { id, checked } = e.target;
    console.log(id, checked);
    setSelectedUsers((prevState) => {
      if (checked) {
        return [...prevState, id];
      } else {
        return prevState.filter((user) => user !== id);
      }
    });
    console.log(selectedUsers);
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      if (selectedUsers.length === 0) {
        setSelectedUsers(
          users?.data?.map(
            (user) => user.user.id + (users.current_page - 1) * users.per_page
          )
        );
      }
      //setAllPagesSelected(true);
    } else {
      setSelectedUsers([]);
      // setAllPagesSelected(false);
    }
    setAllPagesSelected(isChecked);
    console.log(selectedUsers);
  };
  useEffect(() => {
    setSelectedUsers([]);
    setAllPagesSelected(false);
  }, [users?.data, users?.data?.current_page]);

  return (
    <div>
      <div className="fixed inset-0 bg-black/30 z-[999999] flex justify-center items-center">
        <div className="bg-white w-[500px] relative p-4 rounded-lg overflow-hidden">
          <button
            onClick={handleClose}
            className="outline-none absolute right-0 top-2"
          >
            <Image src={cancel} alt="cancel" height={20} />
          </button>
          <div className="flex justify-between mt-2 pb-2 border-b">
            <h1 className="text-xl font-medium">
              List of users
              {/* {selectedUsers.length} */}
            </h1>
            <div>
              <button className="outline-none text-sm text-primary-100">
                <label htmlFor="selectAll" className="w-full cursor-pointer">
                  <input
                    type="checkbox"
                    id="selectAll"
                    className="appearance-none"
                    onChange={(e) => {
                      handleSelectAll(e);
                    }}
                    checked={allPagesSelected}
                  />
                  {!allPagesSelected ? "Select all" : "Unselect All"}
                </label>
              </button>
            </div>
          </div>
          <ul className="flex flex-col max-h-[calc(100vh_-_200px)] overflow-x-auto py-4 gap-[10px] items-start ">
            {users?.data?.map((user, i) => (
              <li
                key={user.id}
                className="flex gap-[10px] p-2 w-full items-center"
              >
                <input
                  type="checkbox"
                  name={user.user.id}
                  id={user.user.id}
                  checked={
                    selectedUsers.includes(user.user.id) || allPagesSelected
                  }
                  // checked={selectedUsers?.includes(user.user.id)}
                  onChange={(e) => {
                    handleSelectedUsers(e);
                  }}
                  className={`h-4 w-4 bg-[#e5e7eb] checked:bg-primary-100
                  border appearance-none rounded-[50%] `}
                />
                <div className="w-[38px] h-[38px] rounded-[50%] bg-[#e5e7eb] ">
                  {user.user.profile_pic && (
                    <Image
                      src={user.user.profile_pic}
                      alt={user.user.display_name}
                      width={38}
                      height={38}
                      className="rounded-[50%]"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium">
                    {user.user.firstname} {user.user.lastname}
                  </h1>
                  <p className="text-xs text-gray-500">{user.user.email}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full flex justify-between">
            {users && (
              <p className="text-xs">
                {" "}
                Showing{" "}
                {(users.current_page - 1) * users.per_page +
                  users?.data?.length}{" "}
                of {users.total}
              </p>
            )}
            <div className="w-full flex justify-between">
              <NavBtn
                disabled={users.prev_page_url === null}
                className="disabled:cursor-not-allowed"
                onClick={() =>
                  users.prev_page_url &&
                  setGetUrl(
                    users.prev_page_url.replace(
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
                        activePage={users.current_page === pageNumber}
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
                disabled={users.next_page_url === null}
                onClick={() =>
                  users.next_page_url &&
                  setGetUrl(
                    users.next_page_url.replace(
                      process.env.NEXT_PUBLIC_API_URI + "/api/v1",
                      ""
                    )
                  )
                }
              >
                <ChevronRight />
              </NavBtn>
            </div>
          </div>
          <div className="flex justify-between w-full text-lg font-semibold ">
            <button type="button" className="text-[#2A2939]">
              Close Modal
            </button>
            <button
              type="submit"
              className=" bg-primary-100 rounded-lg px-4 py-2 text-white "
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
