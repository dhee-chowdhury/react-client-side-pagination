/* eslint-disable no-unused-vars */
import { useState } from "react";

export function usePaginationTypeTwo(
  initialPage = 1,
  initialItemsPerPage = 10
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = (itemsLength) => {
    if (currentPage !== Math.ceil(itemsLength / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = (itemsLength) => {
    const lastPageNumber = Math.ceil(itemsLength / itemsPerPage);
    setCurrentPage(lastPageNumber);
  };

  const changeItemsPerPage = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    paginate,
    changeItemsPerPage,
    indexOfLastItem,
    indexOfFirstItem,
  };
}
