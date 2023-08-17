import axios from "axios";
import {AirtableBenefit, AirtableProgram} from "../etl/types";

const PROGRAMS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/programs.json";

const BENEFITS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/benefits.json";

export const fetchPrograms = (): Promise<AirtableProgram[]> => {
    return axios.get(PROGRAMS_URL).then(r => r.data);
};

export const fetchBenefits = (): Promise<AirtableBenefit[]> => {
    return axios.get(BENEFITS_URL).then(r => r.data);
};
