import {ApiPropertyType, Benefit, Program} from "../utils/types";
import {AirtableBenefit, AirtableProgram, AirtablePropertyType, BenefitSchema, ProgramSchema} from "./types";

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
            id: p.id,
            uuid: p.UUID,
            name: p["Program Name"],
            cap: (p["Program Cap"] && p["Program Cap"] >= 0) ? p["Program Cap"] : null,
            propertyType: p["Availability: Property Type"]!.map(mapAirtablePropertyType),
        } as Program));
};

export const mapAirtableBenefits = (benefits: AirtableBenefit[]): Benefit[] => {
    return benefits
        .map(r => BenefitSchema.parse({
            id: r.id,
            UUID: r.UUID,
            ID: r.ID,
            Program: r.Program,
            Amount: r.Amount,
            // "Benefit Type": r["Benefit Type"],
        }))
        .filter(b => b.Program && b.Program.length > 0 && b.UUID /* && b["Benefit Type"] */ && b.Amount)
        .map(b => ({
            id: b.id,
            uuid: b.UUID,
            name: b.ID,
            // type: b["Benefit Type"],
            programId: b.Program![0],
            minAmount: (b.Minimum && b.Minimum >= 0) ? b.Minimum : null,
            maxAmount: b.Amount,
        } as Benefit));
};
