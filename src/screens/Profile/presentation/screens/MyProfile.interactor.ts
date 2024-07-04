import { useCallback, useState } from 'react'

import GetProfileUseCase from '../../application/getProfile.useCase'
import Toast from 'react-native-toast-message'
import ProfileEntity from '../../domain/entities/profile.entity'
import { useFocusEffect } from '@react-navigation/native'

const useMyProfileInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [myProfileInfo, setMyProfileInfo] = useState<ProfileEntity>()

  const fetchListProfile = async () => {
    setIsLoading(true)
    try {
      const response = await GetProfileUseCase.getInstance().execute()
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
    const response = await fetchListProfile()
    setMyProfileInfo(response.data)
  }

  useFocusEffect(
    useCallback(() => {
      init()
    }, [])
  );

  return {
    isLoading,
    myProfileInfo,
  }
}
export default useMyProfileInteractor
