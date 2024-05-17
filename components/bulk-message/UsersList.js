import Image from "next/image";
import cancel from "./../../assets/close.svg";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersWithoutPagination } from "../../api/admin";
import { getQueryString } from "../../helpers/helper";
export const UsersList = ({
  handleClose,
  handleSelectedUser,
  handleUsers,
  users,
  selectAllHandler,
  selectAll,
  selectedUsers,
}) => {
  const [getUrl, setGetUrl] = useState("");
  // const [users, setUsers] = useState([]);

  //const [selectedUsers, setSelectedUsers] = useState([]);
  const [status, setStatus] = useState("");
  // const [loading, setLoading] = useState(false);
  //const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownHandler = () => setDropdown(!dropdown);

  const {
    data: usersData,
    refetch: refetchUsersData,
    isFetching,
  } = useQuery(
    ["get-users"],
    async () => {
      return await getAllUsersWithoutPagination(getQueryString(getUrl));
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        // setLoading(false);
        console.log(res.data.data);
        handleUsers(res.data.data);

        console.log(res.data.data);
      },
      onError(res) {
        // setLoading(false);
        setError(res);
      },
    }
  );

  useEffect(() => {
    refetchUsersData();
  }, [getUrl, refetchUsersData]);
  const statusHandler = (e) => {
    setStatus(e);
    dropdownHandler();
  };
  const handleSelectedUsers = (e) => {
    handleSelectedUser(e);
  };
  const handleSelectAll = (e) => {
    selectAllHandler(e);
    // setSelectAll(e.target.checked);
    // if (e.target.checked) {
    //   setSelectedUsers(users.map((user) => user.user.email));
    // } else {
    //   setSelectedUsers([]);
    // }
  };

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
            <h1 className="text-xl relative flex items-end font-medium">
              {status === "verified"
                ? "Verified"
                : status === "not_verified"
                ? "Unverified"
                : "All"}{" "}
              users
              <button onClick={dropdownHandler}>
                <i className={`${dropdown ? "rotate-180" : "rotate-0"}`}>
                  {dropdown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#2A2939"
                    >
                      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#2A2939"
                    >
                      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                    </svg>
                  )}
                </i>
              </button>
              {dropdown && (
                <ul className="absolute w-[150px] flex flex-col gap-2 shadow-sm top-full text-[#333333] text-sm  font-normal !leading-[18px] px-3 py-2 rounded-lg bg-white z-[1000] h-fit border">
                  {[
                    { name: "All", id: "" },
                    { name: "Verified", id: "verified" },
                    { name: "Unverified", id: "not_verified" },
                  ].map((item) => (
                    <li
                      key={item.id}
                      onClick={() => {
                        statusHandler(item.id);
                        setGetUrl(`?status=${item.id}`);
                      }}
                      className="cursor-pointer"
                    >
                      {item.name} users
                    </li>
                  ))}
                </ul>
              )}
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
                  />

                  {selectAll ? `Unselect All` : `Select all`}
                </label>
              </button>
            </div>
          </div>
          {isFetching ? (
            <p className="text-lg text-center font-semibold">
              Fetching users data...
            </p>
          ) : (
            <ul className="flex flex-col max-h-[calc(100vh_-_200px)] overflow-x-auto py-4 gap-[10px] items-start ">
              {users?.map((user, i) => (
                <li
                  key={user.id}
                  className="flex gap-[10px] p-2 w-full items-center"
                >
                  <input
                    type="checkbox"
                    name={user.id}
                    id={user.user.email}
                    checked={selectedUsers?.includes(user.user.email)}
                    // checked={
                    //   selectedUsers.includes(user.user.id) || allPagesSelected
                    // }
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
          )}
          {/* <div className="w-full flex justify-between">
            {users && (
              <p className="text-xs">
                {" "}
                Showing{" "}
                {(users.current_page - 1) * users.per_page +
                  users?.data?.length}{" "}
                of {users.total}
              </p>
            )} */}
          {/* <div className="w-full flex justify-between">
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
            </div> */}
          {/* </div> */}
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
