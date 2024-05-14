import { useEffect, useState } from "react";
import PaginateTypeTwo from "../components/PaginateTypeTwo";

const PaginationTypeTwo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((error) => {
        alert("something went wrong");
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="py-10 shadow-lg max-w-7xl mx-auto px-10">
        <div className="h-[calc(100vh-180px)] overflow-y-auto grid grid-cols-2 gap-5 grid-flow-row">
          {data?.map((post) => (
            <div
              className="px-3 py-2 border border-gray-400 space-y-3 text-wrap"
              key={post.id}
            >
              <h2 className="text-base font-medium">{post.title}</h2>
              <p className="text-sm font-normal text-gray-700">{post.body}</p>
              <p className="text-sm font-normal text-gray-700">
                User: {post.userId}
              </p>
            </div>
          ))}
        </div>
        <PaginateTypeTwo />
      </div>
    </div>
  );
};

export default PaginationTypeTwo;
