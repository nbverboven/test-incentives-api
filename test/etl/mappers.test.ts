import {mapAirtableBenefits, mapAirtablePrograms} from "../../src/etl/mappers";

const loadPrograms = (filename: string) => require(`../resources/programs/${filename}`);

const loadBenefits = (filename: string) => require(`../resources/benefits/${filename}`);

describe("Airtable mappers tests", () => {
    describe('Program mapper', () => {
        it('should ignore unpublished programs', () => {
            const unpublishedPrograms = loadPrograms('airtable-programs-unpublished.json');
            const programs = mapAirtablePrograms(unpublishedPrograms);

            expect(programs).toHaveLength(0);
        });

        it('should work correctly for published programs', () => {
            const expectedOutput = loadPrograms('airtable-programs-published-expected.json');
            const publishedPrograms = loadPrograms('airtable-programs-published.json');
            const programs = mapAirtablePrograms(publishedPrograms);

            expect(programs).toEqual(expectedOutput);
        });
    });

    describe("Benefits mapper", () => {
        it("should ignore benefits that don't belong to any program", () => {
            const benefitsWithoutPrograms = loadBenefits("airtable-benefits-without-programs.json");
            const benefits = mapAirtableBenefits(benefitsWithoutPrograms);

            expect(benefits).toHaveLength(0);
        });

        it("should ignore benefits that don't have an amount", () => {
            const benefitsWithoutAmount = loadBenefits("airtable-benefits-without-amount.json");
            const benefits = mapAirtableBenefits(benefitsWithoutAmount);

            expect(benefits).toHaveLength(0);
        });

        it("should ignore benefits that don't have a uuid", () => {
            const benefitsWithoutUuid = loadBenefits("airtable-benefits-without-uuid.json");
            const benefits = mapAirtableBenefits(benefitsWithoutUuid);

            expect(benefits).toHaveLength(0);
        });

        it("should work correctly for well formed benefits", () => {
            const expectedOutput = loadBenefits("airtable-benefits-expected.json");
            const wellFormedBenefits = loadBenefits("airtable-benefits.json");
            const benefits = mapAirtableBenefits(wellFormedBenefits);

            expect(benefits).toEqual(expectedOutput);
        });
    });
});
