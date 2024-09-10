"use client";
import React from "react";
import {
  ResearchContextCard,
  ResearchContextCardProps,
} from "./research-context-card";

export interface ListResearchContextCardProps {
  items: ResearchContextCardProps[];
}

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
        p-4
      "
    >
      {props.children}
    </div>
  );
};

export const ListResearchContextCard = ({
  items,
}: ListResearchContextCardProps) => {
  return (
    <ListResearchContextLayout>
      {items.map((item) => (
        <ResearchContextCard key={item.id} {...item} />
      ))}
    </ListResearchContextLayout>
  );
};
