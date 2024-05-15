import { useEffect, useState } from "react";
import PaginateTypeTwo from "../components/PaginateTypeTwo";
import { usePaginationTypeTwo } from "../hooks/usePaginationTypeTwo";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PaginationTypeTwo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .catch((error) => {
          alert("something went wrong");
          console.log(error);
        });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const {
    currentPage,
    itemsPerPage,
    paginate,
    changeItemsPerPage,
    indexOfLastItem,
    indexOfFirstItem,
  } = usePaginationTypeTwo(1, 10);

  // slicing a portion of data
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="py-10 shadow-lg w-full max-w-7xl mx-auto px-10">
        <div className="h-[calc(100vh-180px)] overflow-y-auto grid grid-cols-2 gap-5 grid-flow-row w-full">
          {currentItems?.map((post) => (
            <div
              className="px-3 py-2 border border-gray-400 space-y-3 text-wrap col-span-1"
              key={post.id}
            >
              <h2 className="text-base font-medium">
                {post.title || <Skeleton />}
              </h2>
              <p className="text-sm font-normal text-gray-700 w-full">
                {post.body || <Skeleton count={2} />}
              </p>
              <p className="text-sm font-normal text-gray-700">
                User: {post.userId || <Skeleton />}
              </p>
            </div>
          ))}
        </div>
        <PaginateTypeTwo
          totalItems={data?.length || 0}
          paginate={paginate}
          changeItemsPerPage={changeItemsPerPage}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default PaginationTypeTwo;
