export interface ISedeResponse {
    data:    IDatum[];
    success: boolean;
    message: string;
}

export interface IDatum {
    id:      number;
    name:    string;
    address: string;
    phone:   string;
    campus:  ICampus;
}

export interface ICampus {
    id:        number;
    name:      string;
    createdAt: string;
}
