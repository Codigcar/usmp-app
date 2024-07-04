export interface IHoursFreeResponse {
    data:    IHoursFreeResponseData[];
    success: boolean;
    message: string;
}

export interface IHoursFreeResponseData {
    id:          number;
    numberHours: number;
    startAt:     string;
    endAt:       string;
    active:      boolean;
}
