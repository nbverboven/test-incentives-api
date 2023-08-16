import express from 'express';
import axios from 'axios';
import {Benefit, Program} from "./utils/types";
import {mapAirtablePrograms} from "./etl/mappers";
import {AirtableBenefit} from "./etl/types";

/*
  - fetch programs
  - fetch benefits
  - build internal model
  - make the endpont query the model
*/
const PROGRAMS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/programs.json";
const BENEFITS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/benefits.json";

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

(async () => {
    const programs = await axios.get(PROGRAMS_URL).then(r => mapAirtablePrograms(r.data));
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
