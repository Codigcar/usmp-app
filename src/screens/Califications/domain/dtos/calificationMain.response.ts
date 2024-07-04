export interface ICalificationsMainResponse {
    success: boolean;
    message: string;
    data:    IData;
}

export interface IData {
    generalAvergae: string;
    periodAverage:  string;
    periodCredits:  string;
    coursesGrades:  ICoursesGrade[];
}

export interface ICoursesGrade {
    id:           string;
    name:         string;
    abreviation:  string;
    status:       string;
    credits:      string;
    averageGrade: string;
}
