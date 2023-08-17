import {ApiPropertyType, Benefit, Program} from "../utils/types";

export default class IncentivesService {

    programsMap: { [id: string]: Program };
    benefitsMap: { [id: string]: Benefit };

    constructor(programs: Program[], benefits: Benefit[]) {
        this.programsMap = programs.reduce((acc, curr) => ({...acc, [curr.id]: curr}), {});
        this.benefitsMap = benefits.reduce((acc, curr) => ({...acc, [curr.id]: curr}), {});
    }

    public findBenefitsByPropertyType(propertyType: ApiPropertyType): Benefit[] {
        return Object.values(this.benefitsMap)
            .filter(benefit => {
                return this.programsMap[benefit.programId]?.propertyType.includes(propertyType);
            });
    }

    public findProgramById(id: string): Program | undefined {
        return this.programsMap[id];
    }
}
