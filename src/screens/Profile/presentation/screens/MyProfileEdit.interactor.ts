import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import { IDepartamentsResponse } from '../../domain/dtos/departaments.response'
import GetDepartamentsUseCase from '../../application/getDepartaments.useCase'
import { IProvinceRequest } from '../../domain/dtos/provinces.request'
import GetProvinceUseCase from '../../application/getProvince.useCase'
import { IDistrictsRequest } from '../../domain/dtos/districts.request'
import GetDistrictUseCase from '../../application/getDistrict.useCase'
import { IProviceResponse } from '../../domain/dtos/provinces.response'
import { IDistrictsResponse } from '../../domain/dtos/districts.response'
import { ProfileStackScreenProps } from '../../../../routes/types'
import { useRoute } from '@react-navigation/native'
import { IUpdateProfileRequest } from '../../domain/dtos/updateProfile.request'
import UpdateProfileUseCase from '../../application/updateProfile.useCase'

const useMyProfileEditInteractor = () => {
    const { params: { profileEntity } } = useRoute<ProfileStackScreenProps<'MyProfileEditScreen'>['route']>()

  const [isLoading, setIsLoading] = useState(false)
  const [getDepartaments, setDepartaments] = useState<IDepartamentsResponse>()
  const [getProvinces, setGetProvinces] = useState<IProviceResponse>()
  const [getDistricts, setGetDistricts] = useState<IDistrictsResponse>()
  const [valueDropdownDepartaments, setValueDropdownDepartaments] = useState<any>(profileEntity?.data?.department?.id)
  const [valueDropdownProvince, setValueDropdownProvince] = useState<any>(profileEntity?.data?.province?.id)
  const [valueDropdownDistrict, setValueDropdownDistrict] = useState<any>(profileEntity?.data?.district?.id)

  const onChangeDepartaments = (item: any) => {
    setValueDropdownDepartaments(item)
  }
  const onChangeProvince = (item: any) => {
    setValueDropdownProvince(item)
  }
  const onChangeDistrict = (item: any) => {
    setValueDropdownDistrict(item)
  }

  const fetchDepartaments = async () => {
    try {
      const response = await GetDepartamentsUseCase.getInstance().execute()
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

  const fetchProvince = async (payload: IProvinceRequest) => {
    try {
      const response = await GetProvinceUseCase.getInstance().execute(payload)
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

  const fetchDistrict = async (payload: IDistrictsRequest) => {
    try {
      const response = await GetDistrictUseCase.getInstance().execute(payload)
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

  const fetchUpdateProfile = async (payload: IUpdateProfileRequest) => {
    setIsLoading(true)
    try {
      const response = await UpdateProfileUseCase.getInstance().execute(payload)
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
    } finally {
    setIsLoading(false)
    }
  }

  const init = async () => {
    setIsLoading(true)

    const getdep = await fetchDepartaments()
    const getprov = await fetchProvince({ departmentId: valueDropdownDepartaments })
    const getdist = await fetchDistrict({ provinceId: valueDropdownProvince })
    setDepartaments(getdep.data)
    setGetProvinces(getprov.data)
    setGetDistricts(getdist.data)

    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [valueDropdownDepartaments,valueDropdownProvince])

  return {
    isLoading,
    getDepartaments,
    getProvinces,
    getDistricts,
    onChangeDepartaments,
    onChangeProvince,
    onChangeDistrict,
    valueDropdownDepartaments,
    valueDropdownProvince,
    valueDropdownDistrict,
    fetchUpdateProfile,
  }
}
export default useMyProfileEditInteractor
