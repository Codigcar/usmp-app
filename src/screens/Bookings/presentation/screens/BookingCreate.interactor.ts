import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import GetListSedesUseCase from '../../application/getSedes.useCase'
import SedeEntity from '../../domain/entities/sedes.entity'
import { ISedeResponse } from '../../domain/dtos/sedes.response'
import CubiclesEntity, {
  CubiclesEntityData,
} from '../../domain/entities/cubicles.entity'
import GetListCubiclesByLibraryIdUseCase from '../../application/getCubicleByLibraryId.useCase'
import { ICubiclesRequest } from '../../domain/dtos/cubicles.request'
import { IDatesFreeRequest } from '../../domain/dtos/datesFreeByCubicleId.request'
import GetListDatesFreeByCubicleIdUseCase from '../../application/getDatesFreeByCubicleId.useCase'
import DatesFreeEntity, {
  DatesFreeEntityData,
} from '../../domain/entities/datesFree.entity'
import { IHoursFreeRequest } from '../../domain/dtos/hoursFree.request'
import GetListHoursFree from '../../application/getHoursFreeByCubicleId.useCase'
import HoursFreeEntity, { HoursFreeEntityData } from '../../domain/entities/hoursFree.entity'
import { ReservationListEntityData } from '../../domain/entities/reservationList.entity'
import CDateTime from '../../../../libraries-implementation/dateTime'
import moment from 'moment'

const useBookingCreateInteractor = (editBook?: ReservationListEntityData) => {
  const [isLoading, setIsLoading] = useState(false)
  const [valueDropdown, setValueDropdown] = useState()
  const [getSedesList, setGetSedesList] = useState<ISedeResponse>()
  
  const fetchFechasDisponibles = async () => {
    if (!cubicleSelect) return
    setIsLoading(true)
    const getDatesFree = await fetchDatesFreeList({
      cubicleId: String(cubicleSelect.id),
    })
    setFechaDisponibleList(getDatesFree.data)
    setIsLoading(false)
    return getDatesFree.data
  }

  // cubiculos
  const [getCubiclesList, setGetCubiclesList] = useState<CubiclesEntity>()
  const [cubicleSelect, setCubicleSelect] = useState<CubiclesEntityData | undefined>(editBook?.cubicle)
  // fechas disponbiles
  const [getFechaDisponibleList, setFechaDisponibleList] = useState<DatesFreeEntity>()
  const [fechaDisponibleSelect, setFechaDisponibleSelect] = useState<DatesFreeEntityData | undefined>()
  // horarios
  const [getHorarioList, setGetHorarioList] = useState<HoursFreeEntity>()
  const [horarioSelect, setHorarioSelect] = useState<number | undefined>(editBook?.cubicleSchedule.numberHours)
  // disponibilidad
  const [disponibilidadSelect, setDisponibilidadSelect] = useState<HoursFreeEntityData | undefined>(editBook?.cubicleSchedule)

  const fetchSedesList = async () => {
    try {
      const response = await GetListSedesUseCase.getInstance().execute()

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
      console.log("🚀 -------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: BookingCreate.interactor.ts:58 ~ fetchSedesList ~ error:", error)
      console.log("🚀 -------------------------------------------------------------------------🚀")
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    }
  }

  const fetchCubiclesList = async (payload: ICubiclesRequest) => {
    try {
      const response =
        await GetListCubiclesByLibraryIdUseCase.getInstance().execute(payload)

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
      console.log("🚀 ----------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: BookingCreate.interactor.ts:81 ~ fetchCubiclesList ~ error:", error)
      console.log("🚀 ----------------------------------------------------------------------------🚀")
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    }
  }

  const fetchDatesFreeList = async (payload: IDatesFreeRequest) => {
    try {
      const response =
        await GetListDatesFreeByCubicleIdUseCase.getInstance().execute(payload)

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
      console.log("🚀 ------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: BookingCreate.interactor.ts:104 ~ fetchDatesFreeList ~ error:", error)
      console.log("🚀 ------------------------------------------------------------------------------🚀")
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    }
  }

  const fetchHoursFreeList = async (payload: IHoursFreeRequest) => {
    try {
      const response = await GetListHoursFree.getInstance().execute(payload)

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
      console.log("🚀 ------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: BookingCreate.interactor.ts:126 ~ fetchHoursFreeList ~ error:", error)
      console.log("🚀 ------------------------------------------------------------------------------🚀")
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    }
  }

  const onChangeValueDropdown = (item: any) => {
    setValueDropdown(item)
  }

  const onChangeCubicleSelect = (item: CubiclesEntityData) => {
    setCubicleSelect(item)
  }

  const onChangeFechaDisponibleSelect = (item: DatesFreeEntityData) => {
    setFechaDisponibleSelect(item)
  }

  const onChangeHorarioSelect = (item: number) => {
    setHorarioSelect(item)
  }

  const onChangeDisponibilidadSelect = (item: HoursFreeEntityData) => {
    setDisponibilidadSelect(item)
  }

  const fetchCubicles = async () => {
    if (!valueDropdown) return
    setIsLoading(true)
    const getCubicles = await fetchCubiclesList({ libraryId: valueDropdown })
    setGetCubiclesList(getCubicles.data)
    setIsLoading(false)
  }

  const fetchHorasDisponibles = async () => {
    if (!horarioSelect) return
    if(!cubicleSelect ||  !fechaDisponibleSelect || !fechaDisponibleSelect) return 
    setIsLoading(true)
    const getDatesFree = await fetchHoursFreeList({
      cubicleId: String(cubicleSelect.id),
      date: fechaDisponibleSelect.date,
      numberHours: String(horarioSelect),
    })
    setGetHorarioList(getDatesFree.data)
    setIsLoading(false)
  }

  const init = async () => {
    setIsLoading(true)
    const getData = await fetchSedesList()
    setGetSedesList(getData.data)
    setIsLoading(false)
    // default
    onChangeValueDropdown(1)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    // setGetCubiclesList(undefined)
    // setCubicleSelect(undefined)
    // setDatesFreeList(undefined)
    // setDateFreeSelect(undefined)
    // setDateHoursSelect(undefined)
    // setGetHoursFreeList(undefined)
    // setHoursFreeSelect(undefined)

    fetchCubicles().then(() => {
      // para editar
      // if(!editBook) return
      // if(cubicleSelect) return
      // onChangeCubicleSelect(editBook.cubicle)
    })
  }, [valueDropdown])
  
  useEffect(() => {

    // setDatesFreeList(undefined)
    // setDateFreeSelect(undefined)
    // setDateHoursSelect(undefined)
    // setGetHoursFreeList(undefined)
    // setHoursFreeSelect(undefined)

    fetchFechasDisponibles().then((response) => {
      // para editar
      if(!editBook || fechaDisponibleSelect) return
      const getDate =  CDateTime.getInstance().getMetaDataByDay(moment(editBook.cubicleSchedule.startAt)).date
      const getSelected = response?.data.filter((item) => item.date === getDate)
      if(!getSelected) return
      onChangeFechaDisponibleSelect(getSelected[0])
      onChangeDisponibilidadSelect(editBook.cubicleSchedule)
    })
  }, [cubicleSelect])

  useEffect(() => {

    // setGetHoursFreeList(undefined)
    // setHoursFreeSelect(undefined)

    fetchHorasDisponibles().then(() => {
      // para editar
      // if(!editBook) return
      // if(!dateHoursSelect) return
      // onChangeDateHoursFreeSelect(editBook.cubicleSchedule.numberHours)
    })
  }, [horarioSelect])

  return {
    isLoading,
    getSedesList,
    valueDropdown,
    onChangeValueDropdown,
    getCubiclesList,
    onChangeCubicleSelect,
    cubicleSelect,
    getDatesFreeList: getFechaDisponibleList,
    dateFreeSelect: fechaDisponibleSelect,
    onChangeDateFreeSelect: onChangeFechaDisponibleSelect,
    onChangeDateHoursFreeSelect: onChangeHorarioSelect,
    dateHoursSelect: horarioSelect,
    onChangeHoursFreeSelect: onChangeDisponibilidadSelect,
    getHoursFreeList: getHorarioList,
    hoursFreeSelect: disponibilidadSelect
  }
}

export default useBookingCreateInteractor
