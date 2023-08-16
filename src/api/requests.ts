import axios from "axios/index";
import {mapAirtableBenefits, mapAirtablePrograms} from "../etl/mappers";
import {Benefit, Program} from "../utils/types";

const PROGRAMS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/programs.json";

const BENEFITS_URL = "https://gist.githubusercontent.com/edelbalso/ca099cc11ac46befabcc789c0c905764/raw/0f317591841cdea1e6a1a927dd706c123b9f927f/benefits.json";

export const fetchPrograms = (): Promise<Program[]> => {
    return axios.get(PROGRAMS_URL).then(r => mapAirtablePrograms(r.data));
};

export const fetchBenefits = (): Promise<Benefit[]> => {
    return axios.get(BENEFITS_URL).then(r => mapAirtableBenefits(r.data));
};
