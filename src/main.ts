import express from 'express';
import {fetchBenefits, fetchPrograms} from "./api/requests";
import IncentivesService from "./services/incentives";

/*
  - fetch programs
  - fetch benefits
  - build internal model
  - make the endpont query the model
*/

export const createApp = async () => {
    const programs = await fetchPrograms();
    const benefits = await fetchBenefits();
    const service = new IncentivesService(programs, benefits);

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
