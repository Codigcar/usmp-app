import { useState } from 'react'

const useDropdown = (defaultValueId?: string) => {
  const [valueDropdown, setValueDropdown] = useState(defaultValueId)

  const onChangeValueDropdown = (item: any) => {
    setValueDropdown(item)
  }

  return {
    valueDropdown,
    onChangeValueDropdown,
  }
}

export default useDropdown
