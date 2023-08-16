import express from 'express';
import axios from 'axios';
import {z} from 'zod';
import {ApiBenefitType, ApiPropertyType} from "./utils/types";

/*
  - fetch programs
  - fetch benefits
  - build internal model
  - make the endpont query the model
*/
const PROGRAMS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/programs.json";
const BENEFITS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/benefits.json";

const AirtablePropertyTypeEnum = z.enum(["Single Family", "Multifamily", "Commercial"] as const);
type AirtablePropertyType = z.infer<typeof AirtablePropertyTypeEnum>;

const ProgramSchema = z.object({
    id: z.string(),
    UUID: z.string().optional(),
    "Program Name": z.string().optional(),
    "Program Cap": z.number().optional(),
    "Availability: Property Type": z.array(AirtablePropertyTypeEnum).optional(),
    Publish: z.boolean().optional(),
}).strict();
type AirtableProgram = z.infer<typeof ProgramSchema>;

interface Program {
    id: string;
    name: string;
    cap?: number;
    propertyType: ApiPropertyType[];
}

const BenefitSchema = z.object({
    id: z.string(),
    UUID: z.string(),
    ID: z.string(),
    Amount: z.number().optional(),
    Minimum: z.number().optional(),
    Program: z.array(z.string()).optional(),
    "Benefit Type": z.string().optional(),
});
type AirtableBenefit = z.infer<typeof BenefitSchema>;

interface Benefit {
    id: string;
    name: string;
    type: string;
    minAmount?: number;
    maxAmount: number;
    program: Program;
}

type ProgramsMap = { [id: string]: Program };
type BenefitsMap = { [id: string]: Benefit };

export const createApp = () => {
    return express()
        .use(express.json())
        .use('/api/incentives', (req, res) => {
            res.json([]);
        });
};

let benefits = {};

const port = 3000;

const mapAirtablePropertyType = (type: AirtablePropertyType): ApiPropertyType => {
    switch (type) {
        case "Single Family":
            return "single_family";
        case "Multifamily":
            return "multifamily";
        case "Commercial":
            return "commercial";
        default:
            throw new Error(`Unkown AirtablePropertyType value: ${type}`);
    }
}

export const convertFromAirtableFormat = (programs: AirtableProgram[]): Program[] => {
    return programs
        .map(r => ProgramSchema.parse({
            id: r.id,
            UUID: r.UUID,
            "Program Name": r["Program Name"],
            "Program Cap": r["Program Cap"],
            "Availability: Property Type": r["Availability: Property Type"],
            Publish: r.Publish,
        }))
        .filter(p => p.Publish)
        .map(p => ({
            id: p.UUID,
            name: p["Program Name"],
            cap: (p["Program Cap"] && p["Program Cap"] >= 0) ? p["Program Cap"] : null,
            propertyType: p["Availability: Property Type"]?.map(mapAirtablePropertyType),
        } as Program));
};

(async () => {
    // const airtablePrograms: AirtableProgram[] = await axios.get(PROGRAMS_URL).then(r => r.data);
    const programs = await axios.get(PROGRAMS_URL).then(r => convertFromAirtableFormat(r.data));
        // .reduce((acc, curr) => ({...acc, [curr.id]: curr}), {} as ProgramsMap);

    const airtableBenefits: AirtableBenefit[] = await axios.get(BENEFITS_URL).then(r => r.data);
    // benefits = airtableBenefits
    //     .map(r => BenefitSchema.parse({
    //         id: r.id,
    //         UUID: r.UUID,
    //         ID: r.ID,
    //         Program: r.Program,
    //         "Benefit Type": r["Benefit Type"],
    //     }))
    //     .filter(b => b.Program && b.Program.length > 0 && b["Benefit Type"] && b.Amount)
    //     .map(b => {
    //         const p = programs[b.Program!.at(0).toString()];
    //         return {
    //             id: b.UUID,
    //             name: b.ID,
    //             type: b["Benefit Type"],
    //             program: {
    //                 id: p.id,
    //                 name: p.name,
    //                 cap: p.cap,
    //                 propertyType: p.propertyType,
    //             },
    //             minAmount: (b.Minimum && b.Minimum >= 0) ? b.Minimum : null,
    //             maxAmount: b.Amount,
    //         } as Benefit;
    //     })
    //     .reduce((acc, curr) => ({...acc, [curr.id]: curr}), {} as BenefitsMap);

    // Object.keys(benefitsMap)
    //   .map(k => benefitsMap[k])
    //   .filter(b => b.propertyType === "")
    //   .map(b => {
    //     return {
    //
    //     }
    //   });

    //const airtableProgram = AirtableProgramSchema.parse({});

    createApp().listen(port, () => {
        console.log(`Starting app listening on port ${port}`);
    });
})();
