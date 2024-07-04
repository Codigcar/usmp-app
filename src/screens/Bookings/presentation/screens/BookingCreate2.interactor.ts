import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import GetListStudents from '../../application/getStudents.useCase'
import StudentsEntity from '../../domain/entities/students.entity'
import AccesoriosEntity, { AccesoriosEntityData } from '../../domain/entities/accesorios.entity'
import GetListAccesorios from '../../application/getAccesorios.useCase'
import { IAccesoriosRequest } from '../../domain/dtos/accesorios.request'
import { ICreateReservationRequest } from '../../domain/dtos/reservationCreate.request'
import CreateReservationUseCase from '../../application/createReservation.useCase'
import { ReservationListEntityData } from '../../domain/entities/reservationList.entity'

const useBookingCreate2Interactor = (editBook?: ReservationListEntityData) => {
  const [isLoading, setIsLoading] = useState(false)
  const [getMembersList, setGetMembersList] = useState<StudentsEntity>()
  const [getAccesoriosList, setGetAccesoriosList] = useState<AccesoriosEntity>()
  const [accesorioSelect, setAccesorioSelect] = useState<AccesoriosEntityData | undefined>(editBook?.accessories[0].id as any)
  const [showModalConfirmation, setShowModalConfirmation] = useState(false)
  // const [membersSelect, setMembersSelect] = useState<string[] | undefined>(editBook?.guestStudents.map(item => String(item.id)))
  const [membersSelect, setMembersSelect] = useState<string[] | undefined>(editBook?.guestStudents.map(item => item.id) as any)

  const fetchMembers = async () => {
    try {
      const response = await GetListStudents.getInstance().execute()

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
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

  const fetchAccesoriosList = async (payload: IAccesoriosRequest) => {
    try {
      const response = await GetListAccesorios.getInstance().execute(payload)

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
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

  const fetchCreateReservation = async (payload: ICreateReservationRequest) => {
    try {
      const response = await CreateReservationUseCase.getInstance().execute(payload)

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
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

  const handleCreateReservation = async (payload: ICreateReservationRequest, onSuccess: () => void) => {
    setIsLoading(true)
    const getCreateResponse = await fetchCreateReservation(payload)
    setIsLoading(false)
    if(!getCreateResponse.status) return
    onSuccess()
  }

  const onChangeMembers = (item: string[]) => {
    setMembersSelect(item)
  }

  const onChangeAccesorio = (item:AccesoriosEntityData) => {
    setAccesorioSelect(item)
  }

  const toggleShowModalConfirmation = () => {
    setShowModalConfirmation(!showModalConfirmation)
  }

  const init = async () => {
    setIsLoading(true)

    const getMembersData = await fetchMembers()
    if (!getMembersData.status) return
    setGetMembersList(getMembersData.data)

    const getAccesoriosData = await fetchAccesoriosList({ libraryId: '1' })
    if (!getAccesoriosData.status) return
    setGetAccesoriosList(getAccesoriosData.data)

    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    isLoading,
    getMembersList,
    getAccesoriosList,
    onChangeAccesorio,
    accesorioSelect,
    fetchCreateReservation,
    toggleShowModalConfirmation,
    showModalConfirmation,
    handleCreateReservation,
    membersSelect,
    onChangeMembers
  }
}
export default useBookingCreate2Interactor
