import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import { Pages, PageBtn } from "../styles/connect-pages.style";
import "./pagination.scss";
const PaginationComponent = ({
  onPageChange,
  total,
  siblingCount,
  currentPage,
}) => {
  // const {
  //   onPageChange,
  //   total,
  //   siblingCount = 1,
  //   currentPage,
  //   pageSize,
  //   className,
  // } = props;

  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>

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
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default PaginationComponent;
