import React from "react";
import { Link } from "react-router";

export default function Error() {
  return (
    <div className="bg-gray-950 h-screen text-gray-300 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl mb-1">Error 404</h1>
        <p className="text-lg lg:text-xl">Not found this page!</p>
        <Link
          to={"/"}
          className="py-2 px-4 rounded-md bg-gray-300 text-black mt-4 block text-sm cursor-pointer w-fit mx-auto shadow shadow-gray-200"
        >
          Go Home Page
        </Link>
      </div>
    </div>
  );
}
