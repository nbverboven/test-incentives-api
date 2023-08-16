import {z} from "zod";

const AirtablePropertyTypeEnum = z.enum(["Single Family", "Multifamily", "Commercial"] as const);
export type AirtablePropertyType = z.infer<typeof AirtablePropertyTypeEnum>;

export const ProgramSchema = z.object({
    id: z.string(),
    UUID: z.string().optional(),
    "Program Name": z.string().optional(),
    "Program Cap": z.number().optional(),
    "Availability: Property Type": z.array(AirtablePropertyTypeEnum).optional(),
    Publish: z.boolean().optional(),
}).strict();
export type AirtableProgram = z.infer<typeof ProgramSchema>;

// const AirtableBenefitTypeEnum = z.enum(["Rebate"] as const);
// export type AirtableBenefitType = z.infer<typeof AirtableBenefitTypeEnum>;

export const BenefitSchema = z.object({
    id: z.string(),
    UUID: z.string().optional(),
    ID: z.string(),
    Amount: z.number().optional(),
    Minimum: z.number().optional(),
    Program: z.array(z.string()).optional(),
    // "Benefit Type": AirtableBenefitTypeEnum.optional(),
});
export type AirtableBenefit = z.infer<typeof BenefitSchema>;
