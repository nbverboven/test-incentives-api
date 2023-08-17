import IncentivesService from "../../src/services/incentives";
import {Benefit, Program} from "../../src/utils/types";

describe("IncentiveService tests", () => {
    const program: Program = {
        id: "1",
        name: "test program",
        cap: null,
        propertyType: ["single_family", "multifamily"],
    };
    const benefit: Benefit = {
        id: "1",
        maxAmount: 0,
        minAmount: null,
        name: "test benefit",
        programId: "1"
    };

    describe("findProgramById", () => {
        it("should return undefined if there's no program", () => {
            const service = new IncentivesService([], []);
            expect(service.findProgramById("1")).toBeUndefined();
        });

        it("should return undefined if there's no program with a given id", () => {
            const service = new IncentivesService([program], []);
            expect(service.findProgramById("2")).toBeUndefined();
        });

        it("should return the correct program if there's one with a matching id", () => {
            const service = new IncentivesService([program], []);
            expect(service.findProgramById("1")).toBe(program);
        });
    });

    describe("findBenefitsByPropertyType", () => {
        it("should return an empty list if there aren't any benefits", () => {
            const service = new IncentivesService([], []);
            expect(service.findBenefitsByPropertyType("single_family")).toHaveLength(0);
        });

        it("should return an empty list if no benefit belongs to a program with the given property type", () => {
            const service = new IncentivesService([program], [benefit]);
            expect(service.findBenefitsByPropertyType("commercial")).toHaveLength(0);
        });

        it("should return the benefits belonging to a program applicable to the given property type", () => {
            const service = new IncentivesService([program], [benefit]);
            expect(service.findBenefitsByPropertyType("single_family")).toStrictEqual([benefit]);
        })
    });
});
