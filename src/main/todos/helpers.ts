import moment from "moment-timezone"

const isDateRangeValid = (startDate: Date, endDate: Date) => {
  return !moment(startDate).isSame(endDate)
}
export { isDateRangeValid }
