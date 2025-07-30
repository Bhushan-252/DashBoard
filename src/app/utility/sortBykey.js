export const sortByKey = (arr, key, order = 'asc') => {
  return [...arr].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (typeof aVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    if (typeof aVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }
    return 0
  })
}

