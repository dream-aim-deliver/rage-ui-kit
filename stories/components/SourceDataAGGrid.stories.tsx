import type { Meta, StoryObj } from "@storybook/react";

import {
    SourceDataAGGrid,
    SourceDataRow,
} from "@/components/table/SourceDataAGGrid";

const meta: Meta = {
    title: "AGGrid/SourceData",
    component: SourceDataAGGrid,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SourceDataAGGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

function randomChoice<T>(list: T[]): T {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

const thousand = Array.from({ length: 1000 }, (_, i) => i + 1);

const dataGenerator = () => {
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const statuses = [
        "created",
        "available",
        "unavailable",
        "inconsistent_dataset",
    ];
    const extensions = ["txt", "csv", "json", "xml"];
    const ext = randomChoice(extensions);
    const piece_number = randomChoice(thousand);

    const datum: SourceDataRow = {
        id: randomChoice(thousand),
        name: `Piece ${piece_number}`,
        relative_path: `/client${randomChoice<number>(thousand)}/topic${randomChoice<string>(alphabet)}/piece_${piece_number}.${ext}`,
        type: ext,
        protocol: "S3",
        status: randomChoice(statuses),
    };

    return datum;
};

export const SmallTable: Story = {
    args: {
        rowData: Array.from({ length: 5 }, dataGenerator),
    },
};

export const LargeTable: Story = {
    args: {
        rowData: Array.from({ length: 106 }, dataGenerator),
    },
};
