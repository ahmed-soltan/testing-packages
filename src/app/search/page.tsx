import { Pagination } from "@/components/search/pagination";
import { SearchInput } from "@/components/search/search-input";
import { SearchResult } from "@/components/search/search-result";
import React from "react";

const SearchPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-full">
      <SearchInput />
      <SearchResult />
      <Pagination totalPages={10}/>
    </div>
  );
};

export default SearchPage;
