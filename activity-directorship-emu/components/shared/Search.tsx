"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder = "Search title..." }: { placeholder?: string }) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="flex items-center min-h-[32px] w-full overflow-hidden rounded-full bg-gray-800 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="Search"
        width={24}
        height={24}
        className="mr-2 brightness-200"
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-transparent text-gray-200 placeholder:text-gray-400 outline-none focus:ring-0 focus-visible:ring-0 w-full"
      />
    </div>
  );
};

export default Search;
