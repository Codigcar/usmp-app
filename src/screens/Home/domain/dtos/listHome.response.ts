import { ICalendarResponseData } from "../../../Calendar/domain/dtos/calendar.response";
import { INewsInfo } from "../../../News/domain/dtos/news.response";
import { ICourseByStudyPlanIdResponseData } from "./listCoursesByStudyPlanId.response";

export interface IHomeResponse {
    success: boolean;
    message: string;
    data:    IHomeResponseData;
}

export interface IHomeResponseData {
    courses:   ICourseByStudyPlanIdResponseData[];
    schedules: ICalendarResponseData[];
    payments:  IPayment;
    events:    INewsInfo[];
}

export interface IPayment {
    paymentsCount:  number;
    paymentsDate:   string;
    paymentsAmount: number;
}
