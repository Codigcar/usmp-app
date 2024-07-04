export interface ICourseSummaryResponse {
    success: boolean;
    message: string;
    data:    IData;
}

export interface IData {
    tutoringCount:      number;
    materialCount:      number;
    nonAssistenceCount: number;
    classmatesCount:    number;
}
