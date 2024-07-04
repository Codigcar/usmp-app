export interface ICubiclesResponse {
    success: boolean;
    message: string;
    data:    ICubiclesResponseData[];
}

export interface ICubiclesResponseData {
    id:       number;
    name:     string;
    capacity: number;
    color:    string;
    active:   boolean;
}