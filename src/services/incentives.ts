import {ApiPropertyType, Benefit, DenormalizedBenefit, Program} from "../utils/types";

export default class IncentivesService {
    benefitsMap: { [id: string]: DenormalizedBenefit };

    constructor(programs: Program[], benefits: Benefit[]) {
        const programsMap: { [id: string]: Program } =
            programs.reduce((acc, curr) => ({...acc, [curr.id]: curr}), {});

        this.benefitsMap = benefits.reduce(
            (map, benefit) => {
                const program = programsMap[benefit.programId];
                const denormalizedBenefit = program ? {
                    [benefit.id]: {
                        id: benefit.id,
                        name: benefit.name,
                        minAmount: benefit.minAmount,
                        maxAmount: benefit.maxAmount,
                        program: {
                            ...program,
                        }
                    }
                } : {};
                return {
                    ...map,
                    ...denormalizedBenefit
                };
            }, {});
    }

    public findBenefitsByPropertyType(propertyType: ApiPropertyType): DenormalizedBenefit[] {
        return Object.values(this.benefitsMap)
            .filter(benefit => benefit.program.propertyType.includes(propertyType));
    }
}
