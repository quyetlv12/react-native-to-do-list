export const isArrayEmpty = (arr) => {
    if (!arr) return true
    if (Array.isArray(arr) && arr.length > 0) {
      return false
    }
    return true
  }