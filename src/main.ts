import express from 'express';
import {Benefit, Program} from "./utils/types";
import {fetchBenefits, fetchPrograms} from "./api/requests";

/*
  - fetch programs
  - fetch benefits
  - build internal model
  - make the endpont query the model
*/

type ProgramsMap = { [id: string]: Program };
type BenefitsMap = { [id: string]: Benefit };

const buildI

export const createApp = async () => {
    const programs = await fetchPrograms();
    const programsMap = programs.reduce((acc, curr) => ({...acc, [curr.id]: curr}), {} as ProgramsMap);

    const benefits = await fetchBenefits();
    //     .reduce((acc, curr) => ({...acc, [curr.id]: curr}), {} as BenefitsMap);

    return express()
        .use(express.json())
        .use('/api/incentives', (req, res) => {
            res.json([]);
        });
};

const port = 3000;

createApp().then(app => app.listen(port, () => {
    console.log(`Starting app listening on port ${port}`);
}));
