export default class CourseDetailEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Datum[],
  ) {}

  static fromJson(json: any) {
    return new CourseDetailEntity(
      json['success'],
      json['message'],
      Array.from(json['data'] as Datum[]).map((x) => Datum.fromJson(x)),
    )
  }
}

class Datum {
  constructor(
    readonly id: string,
    readonly classroom: string,
    readonly section: string,
    readonly confirmation: null,
    readonly date: string,
    readonly startTime: string,
    readonly endTime: string,
    readonly professor: Professor,
  ) {}

  static fromJson(json: any) {
    return new Datum(
      json['id'],
      json['classroom'],
      json['section'],
      json['confirmation'],
      json['date'],
      json['startTime'],
      json['endTime'],
      Professor.fromJson(json['professor']),
    )
  }
}

class Professor {
  constructor(
    readonly id: string,
    readonly code: string,
    readonly name: string,
    readonly imageUrl: string,
  ) {}

  static fromJson(json: any) {
    return new Professor(
      json['id'],
      json['code'],
      json['name'],
      json['imageUrl'] ?? 'https://turkeyanaclinic.com/wp-content/uploads/2023/05/Baby-Face-02.jpg',
    )
  }
}
