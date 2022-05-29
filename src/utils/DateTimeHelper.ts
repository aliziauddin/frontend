export const DateTimeHelper = {
  getDateAndTime(when: number) {
    const date = new Date(when)
    return `${this.formatDate(date)} ${this.formatTime(date)}`
  },
  formatDate(timestamp: Date) {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  },
  formatTime(timestamp: Date) {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    })
  }
}
