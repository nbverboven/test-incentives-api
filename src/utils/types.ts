export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export type ApiPropertyType = "single_family" | "multifamily" | "commercial";

export interface Program {
    id: string;
    uuid: string;
    name: string;
    cap: number | null;
    propertyType: ApiPropertyType[];
}

export interface Benefit {
    id: string;
    uuid: string;
    name: string;
    // type: ApiBenefitType;
    minAmount: number | null;
    maxAmount: number;
    programId: string;
}

export interface DenormalizedBenefit {
    id: string;
    uuid: string;
    name: string;
    minAmount: number | null;
    maxAmount: number;
    program: Program;
}

export interface ApiRequest {
    property_type: ApiPropertyType;
}

export type ApiBenefitType =
    "rebate"
    | "reduced-utility-time-of-use-tou-rate"
    | "no-cost"
    | "certificate"
    | "loan-interest-rate-reduction";

export interface ApiResponse {
    id: string;
    name: string;
    program: {
        id: string;
        name: string;
        program_cap: number | null;
    };
    // benefit_type: ApiBenefitType;
    min_amount: number | null;
    max_amount: number;
}
