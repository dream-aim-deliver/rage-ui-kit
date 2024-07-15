import type { Meta, StoryObj } from "@storybook/react";

import {
  BaseDataTable,
  type BaseDataTableProps,
} from "@/components/table/BaseDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";

type PaymentExample = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const meta: Meta<BaseDataTableProps<PaymentExample, unknown>> = {
  title: "DataTable/Base",
  component: BaseDataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const columns: ColumnDef<PaymentExample>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

function generateRandomPayments(count: number): PaymentExample[] {
  const statuses: PaymentExample["status"][] = [
    "pending",
    "processing",
    "success",
    "failed",
  ];
  const words = [
    "alpha",
    "beta",
    "gamma",
    "delta",
    "epsilon",
    "zeta",
    "eta",
    "theta",
    "iota",
    "kappa",
  ];

  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    amount: Math.floor(Math.random() * 1000) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: `${words[Math.floor(Math.random() * words.length)]}@${words[Math.floor(Math.random() * words.length)]}.com`,
  }));
}

const data = generateRandomPayments(10);

export const ExamplePaymentsTable: StoryObj<
  BaseDataTableProps<PaymentExample, unknown>
> = {
  args: {
    columns: columns,
    data: data,
  },
};
