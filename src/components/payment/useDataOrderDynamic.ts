const useDataOrderDynamic = () => {
  const generateDataOrderDynamic = () => {
    const currentTimeUnix = Math.floor(Date.now()) * 1000
    const transactionId = currentTimeUnix.toString().slice(0, 14)
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString()

    return {
      currentTimeUnix: String(currentTimeUnix),
      transactionId,
      orderNumber,
    }
  }

  return {
    generateDataOrderDynamic,
  }
}

export default useDataOrderDynamic
