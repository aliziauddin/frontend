import { useTheme } from "@mui/material"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePickerProps } from "../@types/DateRangePicker"

const DatePicker: React.FC<DateRangePickerProps> = ({
  date,
  handleDateRange,
  fixedHeight = false
}) => {
  const theme = useTheme()

  return (
    <DateRange
      onChange={handleDateRange}
      moveRangeOnFirstSelection={false}
      ranges={[date]}
      months={2}
      direction="horizontal"
      color={theme.palette.primary.main}
      fixedHeight={fixedHeight}
    />
  )
}

export default DatePicker
