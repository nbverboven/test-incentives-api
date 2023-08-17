import IncentivesService from "../../src/services/incentives";
import {Benefit, DenormalizedBenefit, Program} from "../../src/utils/types";

describe("IncentiveService tests", () => {
    const program: Program = {
        id: "1",
        uuid: "dvorak",
        name: "test program",
        cap: null,
        propertyType: ["single_family", "multifamily"],
    };
    const benefit: Benefit = {
        id: "1",
        uuid: "qwerty",
        maxAmount: 0,
        minAmount: null,
        name: "test benefit",
        programId: "1"
    };
    const denormalizedBenefit: DenormalizedBenefit = {
        id: "1",
        uuid: "qwerty",
        maxAmount: 0,
        minAmount: null,
        name: "test benefit",
        program: {
            id: "1",
            uuid: "dvorak",
            name: "test program",
            cap: null,
            propertyType: ["single_family", "multifamily"],
        }
    };

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
            expect(service.findBenefitsByPropertyType("single_family")).toStrictEqual([denormalizedBenefit]);
        })
    });
});
