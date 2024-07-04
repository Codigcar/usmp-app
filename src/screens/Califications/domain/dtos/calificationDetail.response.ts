export interface ICalificationDetailResponse {
  success: boolean
  message: string
  data: IData
}
export interface IData {
  finalAverage: IFinalAverage;
  partialExams: IFinalAverage[];
}

export interface IFinalAverage {
  id:            string;
  weighing:      string;
  name:          string;
  qualification: string;
  confirmation:  string;
  subgroups:     Subgroup[];
}

export interface Subgroup {
  name:          string;
  weighing:      string;
  qualification: string;
  subgroups:     any[];
}
