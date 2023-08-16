import {ApiPropertyType, Program} from "../utils/types";
import {AirtableProgram, AirtablePropertyType, ProgramSchema} from "./types";

const mapAirtablePropertyType = (type: AirtablePropertyType): ApiPropertyType => {
    switch (type) {
        case "Single Family":
            return "single_family";
        case "Multifamily":
            return "multifamily";
        case "Commercial":
            return "commercial";
        default:
            throw new Error(`Unkown AirtablePropertyType value: ${type}`);
    }
}

export const mapAirtablePrograms = (programs: AirtableProgram[]): Program[] => {
    return programs
        .map(r => ProgramSchema.parse({
            id: r.id,
            UUID: r.UUID,
            "Program Name": r["Program Name"],
            "Program Cap": r["Program Cap"],
            "Availability: Property Type": r["Availability: Property Type"],
            Publish: r.Publish,
        }))
        .filter(p => p.Publish)
        .map(p => ({
            id: p.UUID,
            name: p["Program Name"],
            cap: (p["Program Cap"] && p["Program Cap"] >= 0) ? p["Program Cap"] : null,
            propertyType: p["Availability: Property Type"]?.map(mapAirtablePropertyType),
        } as Program));
};
