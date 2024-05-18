/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronLast } from "react-icons/lu";
import { LuChevronFirst } from "react-icons/lu";
const PaginateTypeTwo = memo(
  ({
    totalItems = 0,
    itemsPerPage = 10,
    itemsPerPageOptions = [5, 10, 15],
    paginate,
    changeItemsPerPage,
    currentPage = 1,
    hideChangeOptions = false,
  }) => {
    // const [active, setActive] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const pageNumbers = [];
    // const [selectedValue, setSelectedValue] = useState(defaultValue);
    console.log(hideChangeOptions);

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const totalPageNumber = pageNumbers.length;

    const startItem =
      totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem =
      currentPage * itemsPerPage < totalItems
        ? currentPage * itemsPerPage
        : totalItems;
    const handlePagination = (number = 1) => {
      if (number < 1) {
        number = 1;
      }
      if (number > totalPageNumber) {
        number = totalPageNumber;
      }
      if (number >= 3 && number <= totalPageNumber - 3) {
        setPageGroup(number - 1);
      }
      if (number < 5) {
        setPageGroup(1);
      }
      if (number > totalPageNumber - 3 && number <= totalPageNumber) {
        setPageGroup(totalPageNumber - 3);
      }
      paginate(number);
    };
    const handleChangePerPage = (e) => {
      changeItemsPerPage(e.target.value);
      setPageGroup(1);
    };

    console.log("Rendering", currentPage);

    return (
      <div className="w-full py-1 mx-auto lg:col-start-2 lg:col-end-5">
        <div className="w-full flex items-center justify-between">
          {/* pagination left side */}
          <div className="flex items-center font-inter gap-10 text-gray-700 text-sm">
            {hideChangeOptions === false && (
              <div className="flex gap-2 items-center tracking-wide">
                <p className="text-sm text-gray-700">Show</p>
                <select
                  value={itemsPerPage}
                  name="showData"
                  onChange={handleChangePerPage}
                  className="border-gray-500 hover:border-gray-700 border focus:outline-none"
                >
                  {itemsPerPageOptions?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className="tracking-wide">entries per page</p>
              </div>
            )}
            <p>
              Showing {startItem}-{endItem} of {totalItems || 0} entries
            </p>
          </div>

          {/* right side pagination  */}
          {totalPageNumber >= 1 && totalPageNumber <= 6 ? (
            <ul className="flex items-center justify-between gap-2 text-sm text-gray-800 lg:max-w-md">
              <li
                title="first"
                onClick={() => handlePagination(1)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronFirst className="w-5 h-5 text-gray-700" />
              </li>
              <li
                title="previous"
                onClick={() => handlePagination(currentPage - 1)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronLeft className="w-5 h-5 text-gray-700" />
              </li>

              {pageNumbers.map((number) => (
                <li
                  onClick={() => handlePagination(number)}
                  className={`${
                    number === currentPage ? "bg-gray-300" : ""
                  } flex items-center justify-center w-6 h-6 p-1 rounded-full font-medium hover:bg-gray-300 font-inter cursor-pointer`}
                  key={number}
                >
                  {number}
                </li>
              ))}
              <li
                title="next"
                onClick={() => handlePagination(currentPage + 1)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronRight className="w-5 h-5 text-gray-700" />
              </li>
              <li
                title="last"
                onClick={() => handlePagination(totalPageNumber)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronLast className="w-5 h-5 text-gray-700" />
              </li>
            </ul>
          ) : (
            <ul className="flex items-center justify-between gap-2 text-sm text-gray-800 lg:max-w-md select-none">
              <li
                title="first"
                onClick={() => handlePagination(1)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronFirst className="w-5 h-5 text-gray-700" />
              </li>
              <li
                title="previous"
                onClick={() => handlePagination(currentPage - 1)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronLeft className="w-5 h-5 text-gray-700" />
              </li>

              <li
                onClick={() => handlePagination(1)}
                className={`${
                  1 === currentPage ? "bg-gray-300" : ""
                } flex items-center justify-center w-6 h-6 p-1 rounded-full font-medium hover:bg-gray-300 font-inter cursor-pointer`}
              >
                1
              </li>
              {pageGroup > 1 && (
                <li
                  onClick={() => handlePagination(currentPage - 3)}
                  className="flex items-center justify-center w-6 h-6 p-1 font-medium hover:bg-gray-300 cursor-pointer rounded-full"
                >
                  ...
                </li>
              )}
              {pageGroup === 1 &&
                pageNumbers.slice(pageGroup, pageGroup + 4).map((number) => (
                  <li
                    onClick={() => handlePagination(number)}
                    className={`${
                      number === currentPage ? "bg-gray-300" : ""
                    } flex items-center justify-center w-6 h-6 p-1 rounded-full font-medium hover:bg-gray-300 font-inter cursor-pointer`}
                    key={number}
                  >
                    {number}
                  </li>
                ))}
              {pageGroup > 1 &&
                pageGroup < totalPageNumber - 3 &&
                pageNumbers
                  .slice(pageGroup - 1, pageGroup + 2)
                  .map((number) => (
                    <li
                      onClick={() => handlePagination(number)}
                      className={`${
                        number === currentPage ? "bg-gray-300" : ""
                      } flex items-center justify-center w-6 h-6 p-1 rounded-full font-medium hover:bg-gray-300 font-inter cursor-pointer`}
                      key={number}
                    >
                      {number}
                    </li>
                  ))}
              {pageGroup < totalPageNumber - 3 && (
                <>
                  <li
                    onClick={() => handlePagination(currentPage + 3)}
                    className="flex items-center justify-center w-6 h-6 p-1 font-medium"
                  >
                    ...
                  </li>
                  <li
                    onClick={() => handlePagination(totalPageNumber)}
                    className={`${
                      totalPageNumber === currentPage ? "bg-gray-300" : ""
                    } flex items-center justify-center w-6 h-6 p-1 rounded-full font-medium hover:bg-gray-300 font-inter cursor-pointer`}
                  >
                    {totalPageNumber}
                  </li>
                </>
              )}
              {pageGroup >= totalPageNumber - 3 &&
                pageNumbers
                  .slice(pageGroup - 2, totalPageNumber + 1)
                  .map((number) => (
                    <li
                      onClick={() => handlePagination(number)}
                      className={`${
                        number === currentPage ? "bg-gray-300" : ""
                      } flex items-center justify-center w-6 h-6 p-1 rounded-full font-medium hover:bg-gray-300 font-inter cursor-pointer`}
                      key={number}
                    >
                      {number}
                    </li>
                  ))}
              <li
                title="next"
                onClick={() => handlePagination(currentPage + 1)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronRight className="w-5 h-5 text-gray-700" />
              </li>
              <li
                title="last"
                onClick={() => handlePagination(totalItems)}
                className="px-1 rounded-sm font-medium py-1 hover:bg-gray-300 font-inter cursor-pointer"
              >
                <LuChevronLast className="w-5 h-5 text-gray-700" />
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
);

PaginateTypeTwo.displayName = "PaginateTypeTwo";

export default PaginateTypeTwo;
