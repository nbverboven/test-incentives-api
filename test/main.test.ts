import request from 'supertest';
import {Express} from "express";
import {createApp} from "../src/app";
import {HttpStatus} from "../src/utils/types";

jest.mock('../src/api', () => ({
    fetchPrograms: jest.fn().mockReturnValue(Promise.resolve(require("./resources/programs/airtable-programs-integration.json"))),
    fetchBenefits: jest.fn().mockReturnValue(Promise.resolve(require("./resources/benefits/airtable-benefits-integration.json"))),
}));

describe("Application tests", () => {
    let app: Express;

    beforeAll(async () => {
        app = await createApp();
    });

    describe("POST /api/incentives", () => {
        it("should return all the benefits pertaining to a given property type", async () => {
            const response = await request(app)
                .post('/api/incentives')
                .send({ property_type: "single_family" });
            const expectedBody = require("./resources/benefits/airtable-benefits-integration-expected.json");

            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toStrictEqual(expectedBody);
        });

        it("should return an empty list if no benefit match the property type", async () => {
            const response = await request(app)
                .post('/api/incentives')
                .send({ property_type: "commercial" });

            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toHaveLength(0);
        });
    });
});