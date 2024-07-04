import { IStudyPlan } from '../../../Home/domain/dtos/listStudyPlan.response'

export const convertToDataDropdown = (
  items: any[] | any,
  { labelKey = 'name', valueKey = 'name' } = {} as {
    labelKey?: string
    valueKey?: string
  },
) => {
  if (Array.isArray(items)) {
    const newData = items.map((itemx: any) => {
      return {
        label: itemx[labelKey],
        value: itemx[valueKey],
      }
    })
    return newData
  }
  return {
    label: items[labelKey],
    value: items[valueKey],
  }
}
