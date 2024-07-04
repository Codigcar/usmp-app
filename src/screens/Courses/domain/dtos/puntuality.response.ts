export interface IPuntualityResponse {
    success: boolean;
    message: string;
    data:    IDataPuntuality;
}

export interface IDataPuntuality {
    nonAttendancesHours:           number;
    nonAttendancesHoursPercentage: number;
    attendancesHours:              number;
    attendancesHoursPercentage:    number;
    totalHours:                    number;
    totalHoursPercentage:          number;
    nonAttendances:                INonAttendance[];
}

export interface INonAttendance {
    id:      number;
    day:     string;
    date:    string;
    startAt: string;
    endAt:   string;
    reason:  string;
}
