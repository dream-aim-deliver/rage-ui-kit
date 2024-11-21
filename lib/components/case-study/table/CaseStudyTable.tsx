import { ReactNode } from "react";

export interface CaseStudyTableProps<TData> {
  rowData: TData[];
  isLoading: boolean;
  error?: string;
}

export type CaseStudyTable<TData> = (
  props: CaseStudyTableProps<TData>,
) => ReactNode;
