import moment from 'moment'
import 'moment/src/locale/es'

export interface IDay {
  shortNameFull: string
  firstLetter: string
  num: string
  name: string
  date: string
}

export default class CDateTime {
  static instance: CDateTime
  private currentDate

  static getInstance() {
    if (!this.instance) {
      return new CDateTime()
    }
    return this.instance
  }

  constructor() {
    this.currentDate = moment().locale('es')
  }

  dayNameShort() {
    return this.currentDate.format('ddd')
  }

  getCurrentDate() {
    return this.currentDate
  }

  setCurrentDate(dateNew: moment.Moment) {
    this.currentDate = dateNew
  }

  getWeekDays(today = this.currentDate ) {
    // const today = this.currentDate
    const weekStart = today

    let days: IDay[] = []
    for (let i = 0; i < 8; i++) {
      days.push({
        shortNameFull: weekStart
          .clone()
          .add(i, 'day')
          .format('ddd D [de] MMMM'),
        firstLetter: weekStart
          .clone()
          .add(i, 'day')
          .format('dddd')
          .charAt(0)
          .toUpperCase(),
        num: weekStart.clone().add(i, 'day').format('D'),
        name: weekStart.clone().add(i, 'days').format('ddd'),
        date: weekStart.clone().add(i, 'days').format('YYYY-MM-DD'),
      })
    }

    return days
  }

  getMetaDataByDay(currentDay: moment.Moment) {
    return {
      shortNameFull: currentDay.clone().format('ddd D [de] MMMM'), // jue. 20 de junio
      firstLetter: currentDay.clone().format('dddd').charAt(0).toUpperCase(),
      num: currentDay.clone().format('D'), // 20
      name: currentDay.clone().format('ddd'), // jue.
      date: currentDay.clone().format('YYYY-MM-DD'), //2024-06-20
      DDMMMAAAA: currentDay.clone().format('DD MMM YYYY'), // 20 jun. 2024
      DDMMMMAAAA: currentDay.clone().format('DD MMMM YYYY'), // 20 junio 2024
      DDMMM: currentDay.clone().format('DD MMM'), // 20 jun.
      hora: currentDay.clone().format('hh:mm') // 01:30
      // hora: currentDay.clone().format('hh:mm A')
    }
  }
}
