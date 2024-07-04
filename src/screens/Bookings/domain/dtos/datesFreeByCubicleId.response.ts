export interface IDatesFreeResponse {
    data:    IDatum[];
    success: boolean;
    message: string;
}

export interface IDatum {
    nameDay:     string;
    numberDay:   number;
    nameMonth:   string;
    date:        string;
    numberHours: number[];
}