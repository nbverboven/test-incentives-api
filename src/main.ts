import express from 'express';
import axios from 'axios';
import {Benefit, Program} from "./utils/types";
import {mapAirtableBenefits, mapAirtablePrograms} from "./etl/mappers";

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

    const benefits = await axios.get(BENEFITS_URL).then(r => mapAirtableBenefits(r.data));
    //     .reduce((acc, curr) => ({...acc, [curr.id]: curr}), {} as BenefitsMap);

    // Object.keys(benefitsMap)
    //   .map(k => benefitsMap[k])
    //   .filter(b => b.propertyType === "")
    //   .map(b => {
    //     return {
    //
    //     }
    //   });

    createApp().listen(port, () => {
        console.log(`Starting app listening on port ${port}`);
    });
})();
