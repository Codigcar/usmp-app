export default interface IStudyPlanResponse {
    success: boolean;
    message: string;
    data:    IStudyPlan[];
}

export interface IStudyPlan {
    id:         number;
    code:       string;
    name:       Name;
    year:       string;
    yearName:   string;
    period:     string;
    periodName: string;
}

export type Name = "ADMINISTRACION Vers.01" | "ADMINISTRACION Vers.02";
