import { createContext, useContext, useState } from 'react'
import { IStudyPlan } from '../screens/Home/domain/dtos/listStudyPlan.response'
import { ICourseByStudyPlanIdResponseData, IEvent } from '../screens/Home/domain/dtos/listCoursesByStudyPlanId.response'

type Props = {
  children: any
}

interface Context {
  studyPlanSelect: IStudyPlan | null
  onChangeStudyPlanSelect: (studyPlan: IStudyPlan) => void
  studyPLanList: IStudyPlan[]
  setListStudyPlans: (studyPlans: IStudyPlan[]) => void

  setterCourseList: (list: ICourseByStudyPlanIdResponseData[]) => void
  onChangeCourseSelect: any
  onChangeEvent: any

  courseList: ICourseByStudyPlanIdResponseData[]
  courseSelect: ICourseByStudyPlanIdResponseData | null
  eventByCourseSelect: IEvent | null
}

const StudyPlanContext = createContext<Context>({} as Context)

export const StudyPlanProvider: React.FC<Props> = ({ children }) => {
  const [studyPLanList, setStudyPLanList] = useState<IStudyPlan[]>([])
  const [studyPlanSelect, setStudyPlanSelect] = useState<IStudyPlan | null>(
    null,
  )
  const [courseList, setCourseList] = useState<ICourseByStudyPlanIdResponseData[]>([])
  const [courseSelect, setCourseSelect] = useState<ICourseByStudyPlanIdResponseData | null>(
    null,
  )

  const [eventByCourseSelect, setEventByCourseSelect] = useState<IEvent | null>(null)

  const onChangeStudyPlanSelect = (studyPlan: IStudyPlan) => {
    setStudyPlanSelect(studyPlan)
  }

  const setListStudyPlans = (studyPlans: IStudyPlan[]) => {
    setStudyPLanList(studyPlans)
  }

  const setterCourseList = (list: ICourseByStudyPlanIdResponseData[]) => {
    setCourseList(list)
  }

  const onChangeCourseSelect = (courseSelect: ICourseByStudyPlanIdResponseData) => {
    setCourseSelect(courseSelect)
  }

  const onChangeEvent = (event: IEvent) => {
    setEventByCourseSelect(event)
  }

  return (
    <StudyPlanContext.Provider
      value={{
        courseList,
        courseSelect,
        eventByCourseSelect,
        studyPlanSelect,
        studyPLanList,
        setListStudyPlans,
        setterCourseList,
        onChangeStudyPlanSelect,
        onChangeCourseSelect,
        onChangeEvent,
      }}>
      {children}
    </StudyPlanContext.Provider>
  )
}

export const useStudyPlan = (): Context => useContext(StudyPlanContext)
