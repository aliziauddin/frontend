import { DefaultCustomDateRangeProps } from "./Orders"

export interface DateRangePickerProps {
  fixedHeight: boolean
  date: DefaultCustomDateRangeProps
  handleDateRange: (rangesByKey: RangeKeyDict) => void
}
