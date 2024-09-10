export type RemoteFile = {
  name: string;
  id: number;
  relativePath: string;
};

import { z } from "zod";
export const ResearchContextSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const CreateResearchContextRequestViewModelSchema = z.object({
  status: z.enum(["request"]),
  researchContextName: z.string(),
});
export type TCreateResearchContextRequestViewModel = z.infer<
  typeof CreateResearchContextRequestViewModelSchema
>;

export const CreateResearchContextSuccessViewModelSchema = z.object({
  status: z.enum(["success"]),
  researchContext: ResearchContextSchema,
});
export type TCreateResearchContextSuccessViewModel = z.infer<
  typeof CreateResearchContextSuccessViewModelSchema
>;

export const CreateResearchContextErrorViewModelSchema = z.object({
  status: z.enum(["error"]),
  message: z.string(),
  context: z.any(),
});
export type TCreateResearchContextErrorViewModel = z.infer<
  typeof CreateResearchContextErrorViewModelSchema
>;

export const CreateResearchContextProgressViewModelSchema = z.object({
  status: z.enum(["progress"]),
  message: z.string(),
  context: z.any(),
});
export type TCreateResearchContextProgressViewModel = z.infer<
  typeof CreateResearchContextProgressViewModelSchema
>;

export const CreateResearchContextViewModelSchema = z.discriminatedUnion(
  "status",
  [
    CreateResearchContextRequestViewModelSchema,
    CreateResearchContextSuccessViewModelSchema,
    CreateResearchContextErrorViewModelSchema,
    CreateResearchContextProgressViewModelSchema,
  ],
);
export type TCreateResearchContextViewModel = z.infer<
  typeof CreateResearchContextViewModelSchema
>;
