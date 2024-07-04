export interface IProfileResponse {
    success: boolean;
    message: string;
    data:    IData;
}

export interface IData {
    imageUrl:      string;
    name:          string;
    lastName:      string;
    code:          string;
    personalEmail: string;
    phone:         string;
    district:      IDepartment;
    province:      IDepartment;
    department:    IDepartment;
    address:       string;
}

export interface IDepartment {
    id:      number;
    name:    string;
    country: string;
    code:    string;
}
