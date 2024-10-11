export const formatter = (date: string) => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('en-US', { month: 'long' })
  const day = String(dateObj.getDate()).padStart(2, '0')
  const year = dateObj.getFullYear()

  return { month, day, year }
}
