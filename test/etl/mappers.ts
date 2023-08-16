import {mapAirtablePrograms} from "../../src/etl/mappers";

describe('Airtable program mapper', () => {
    it('should ignore unpublished programs', () => {
        const unpublishedPrograms = require('./resources/programs/airtable-unpublished.json');
        const programs = mapAirtablePrograms(unpublishedPrograms);

        expect(programs).toHaveLength(0);
    });

    it('should work correctly for published programs', () => {
        const expectedOutput = require('./resources/programs/airtable-published-expected.json');
        const publishedPrograms = require('./resources/programs/airtable-published.json');
        const programs = mapAirtablePrograms(publishedPrograms);

        expect(programs).toEqual(expectedOutput);
    })
});
