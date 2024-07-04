export default interface IListCoursesByStudyPlanIdResponse {
    success: boolean;
    message: string;
    data:    ICourseByStudyPlanIdResponseData[];
}

export interface ICourseByStudyPlanIdResponseData {
    id:      string;
    name:    string;
    credits: string;
    abreviation: string;
    code: string;
    events: IEvent[];
}

export interface IEvent {
    id:           string;
    name:         string;
    abbreviation: string;
    modality: string;
}

