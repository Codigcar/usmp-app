export interface IEventsResponse {
    success: boolean;
    message: string;
    data:    IEventsResponseData;
}

export interface IEventsResponseData {
    featured:   IEventInfo[];
    events:     IEventInfo[];
    totalPages: number;
}

export interface IEventInfo {
    id:              number;
    title:           string;
    description:     string;
    backgroundColor: null | string;
    backgroundImage: null;
    modality:        number | null;
    currency:        null;
    address:         null | string;
    date:            string;
    typeId:          number;
    type:            null;
    cost:            number | null;
    urlLink:         null | string;
    capacity:        number | null;
    featured:        boolean;
    audienceType:    AudienceType;
    audiences:       any[];
    startAt:         string;
    endAt:           string;
}

export enum AudienceType {
    Faculty = "Faculty",
    Students = "Students",
}