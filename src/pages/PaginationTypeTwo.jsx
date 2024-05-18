import { useEffect, useState } from "react";
import PaginateTypeTwo from "../components/PaginateTypeTwo";
import { usePaginationTypeTwo } from "../hooks/usePaginationTypeTwo";

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
  } = usePaginationTypeTwo(1, 20);

  // slicing a portion of data
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="py-6 shadow-lg w-full max-w-7xl mx-auto px-10">
        <div className="overflow-y-auto grid min-h-[calc(100vh-120px)] grid-cols-2 grid-rows-5 gap-5 grid-flow-row w-full">
          {currentItems?.map((post) => (
            <div
              className="px-3 py-2 border border-gray-400 space-y-3 col-span-1 text-ellipsis"
              key={post.id}
            >
              <h2 className="text-base font-medium w-full text-nowrap overflow-hidden text-ellipsis">
                {post.title}
              </h2>
              <p className="text-sm font-normal text-gray-700 w-full overflow-hidden text-ellipsis">
                {post.body.length > 100
                  ? `${post.body.substring(0, 150)}...`
                  : post.body}
              </p>
              <p className="text-sm font-normal text-gray-700">
                User: {post.userId}
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
          hideChangeOptions={true}
        />
      </div>
    </div>
  );
};

export default PaginationTypeTwo;
