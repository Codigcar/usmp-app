import { useState } from "react"
import { ICalificationDetailRequest } from '../domain/dtos/calificationDetail.request';
import GetCalificationsByCourseIdUseCase from "../application/getCalificationsByCourseId.useCase";

const useCalificationDetailInteractor = () => {
    const [isLoading, setIsLoading] = useState(false)

    const fetchCalificationsByCourseId = async(payload: ICalificationDetailRequest) => {
        setIsLoading(true)
        try {
            const data = await GetCalificationsByCourseIdUseCase.getInstance().execute(payload)
            return {status: true, data: data}
        } catch (error) {
            console.log("🚀 -----------------------------------------------------------------------------------------------🚀")
            console.log("🚀 ~ file: MyCalificationsDetail.interactor.ts:12 ~ fetchCalificationsByCourseId ~ error:", error)
            console.log("🚀 -----------------------------------------------------------------------------------------------🚀")
            
        } finally {
            setIsLoading(false)
        }
    }

    return {
        fetchCalificationsByCourseId,
        isLoading
    }
}

export default useCalificationDetailInteractor