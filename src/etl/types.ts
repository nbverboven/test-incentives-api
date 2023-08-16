import {z} from "zod";

export const AirtablePropertyTypeEnum = z.enum(["Single Family", "Multifamily", "Commercial"] as const);
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

export const BenefitSchema = z.object({
    id: z.string(),
    UUID: z.string(),
    ID: z.string(),
    Amount: z.number().optional(),
    Minimum: z.number().optional(),
    Program: z.array(z.string()).optional(),
    "Benefit Type": z.string().optional(),
});
export type AirtableBenefit = z.infer<typeof BenefitSchema>;
