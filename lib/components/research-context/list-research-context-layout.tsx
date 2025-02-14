"use client";
import React, { useMemo, useState } from "react";
import {
  ResearchContextCard,
  ResearchContextCardProps,
} from "./research-context-card";
import { Input } from "@/ui/input.tsx";

export interface ListResearchContextCardProps {
  items: ResearchContextCardProps[];
}

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <Input
      type="text"
      placeholder="Search"
      onChange={(e) => onSearch(e.target.value)}
      className="w-full"
    />
  );
};

export const ListResearchContextLayout = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1       
        sm:grid-cols-2    
        lg:grid-cols-3    
        w-full
      "
    >
      {props.children}
    </div>
  );
};

export const ListResearchContextCard = ({
  items,
}: ListResearchContextCardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    const searchFields = ["title", "description"];
    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field as keyof ResearchContextCardProps];
        return value && value.toString().toLowerCase().includes(query);
      });
    });
  }, [searchQuery, items]);

  return (
    <div className="w-full space-y-4">
      <SearchBar onSearch={setSearchQuery} />
      {filteredItems.length > 0 && (
        <ListResearchContextLayout>
          {filteredItems.map((item) => (
            <ResearchContextCard key={item.id} {...item} />
          ))}
        </ListResearchContextLayout>
      )}
      {filteredItems.length === 0 && items.length !== 0 && (
        <div className="flex w-full grow items-center justify-center text-neutral-900">
          No matching research contexts found
        </div>
      )}
    </div>
  );
};
