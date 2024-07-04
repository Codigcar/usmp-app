export interface IStudentsResponse {
    data:    IStudentsResponseData[];
    success: boolean;
    message: string;
}

export interface IStudentsResponseData {
    id:             number;
    sapId:          string;
    code:           string;
    name:           string;
    lastName:       string;
    email:          string;
    phone:          string;
    documentType:   string;
    documentNumber: string;
    imageUrl:       string;
}
