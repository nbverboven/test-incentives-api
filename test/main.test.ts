import {convertFromAirtableFormat} from "../src/main";

describe('Airtable program mapper', () => {
  it('should ignore unpublished programs', () => {
    const unpublishedPrograms = require('./resources/programs/airtable-unpublished.json');
    const programs = convertFromAirtableFormat(unpublishedPrograms);

    expect(programs).toHaveLength(0);
  });

  it('should work correctly for published programs', () => {
    const expectedOutput = require('./resources/programs/airtable-published-expected.json');
    const publishedPrograms = require('./resources/programs/airtable-published.json');
    const programs = convertFromAirtableFormat(publishedPrograms);

    expect(programs).toEqual(expectedOutput);
  })
});
