import { IAccesoriosResponseData } from "./accesorios.response";
import { ICubiclesResponseData } from "./cubicules.response";
import { IHoursFreeResponseData } from "./hoursFree.response";
import { IStudentsResponseData } from "./students.response";

export interface IReservationListResponse {
    data:    IReservationListResponseData[];
    success: boolean;
    message: string;
}

export interface IReservationListResponseData {
    id:                 number;
    attended:           boolean;
    status:             string;
    observation:        string;
    cubicle:            ICubiclesResponseData;
    cubicleSchedule:    IHoursFreeResponseData;
    responsibleStudent: IStudentsResponseData;
    reasonCancellation: string;
    accessories:        IAccesoriosResponseData[];
    guestStudents:      IStudentsResponseData[];
    sedeId?: string
}

// export interface IAccessory {
//     id:          number;
//     name:        string;
//     description: string;
// }

// export interface ICubicle {
//     id:       number;
//     name:     string;
//     capacity: number;
//     color:    string;
//     active:   boolean;
// }

// export interface ICubicleSchedule {
//     id:          number;
//     numberHours: number;
//     startAt:     string;
//     endAt:       string;
//     active:      boolean;
// }

// export interface IStudent {
//     id:             number;
//     code:           string;
//     email:          string;
//     name:           string;
//     lastName:       string;
//     phone:          string;
//     documentType:   string;
//     documentNumber: string;
//     sapId?:         string;
//     imageUrl?:      string;
// }
