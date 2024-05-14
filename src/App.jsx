import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-orange-300">
        <div className="container mx-auto h-full">
          <h1 className="text-3xl text-[#212121] font-medium tracking-wide text-center">
            React Client side custom pagination
          </h1>
          <div className="flex justify-center items-center h-56 gap-10">
            <Link
              className="shadow-2xl font-medium text-xl px-6 py-2 border-none outline-none rounded-md text-white bg-purple-800 hover:bg-purple-300 hover:text-gray-800 duration-150"
              to="/pagination-type-one"
            >
              Pagination Type one
            </Link>
            <Link
              className="shadow-2xl font-medium text-xl px-6 py-2 border-none outline-none rounded-md text-white bg-emerald-800 hover:bg-emerald-300 hover:text-gray-800 duration-150"
              to="/pagination-type-two"
            >
              Pagination Type two
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
