import IncentivesService from "../services/incentives";
import express, {Request} from "express";
import {ApiRequest, ApiResponse} from "../utils/types";
import {fetchBenefits, fetchPrograms} from "../api";
import {mapAirtableBenefits, mapAirtablePrograms} from "../etl/mappers";

export const createApp = async () => {
    const programs = await fetchPrograms().then(mapAirtablePrograms);
    const benefits = await fetchBenefits().then(mapAirtableBenefits);
    const service = new IncentivesService(programs, benefits);

    return express()
        .use(express.json())
        .post('/api/incentives', (req: Request<{}, ApiResponse[], ApiRequest>, res) => {
            const propertyType = req.body.property_type
            const responseBody = service.findBenefitsByPropertyType(propertyType)
                .map(benefit => {
                    return {
                        id: benefit.uuid,
                        name: benefit.name,
                        program: {
                            id: benefit.program.uuid,
                            name: benefit.program.name,
                            program_cap: benefit.program.cap,
                        },
                        min_amount: benefit.minAmount,
                        max_amount: benefit.maxAmount,
                    };
                });
            res.json(responseBody);
        });
};
