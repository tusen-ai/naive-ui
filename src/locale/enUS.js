import enUS from 'date-fns/locale/en-US'

export default {
  _name: 'en-US',
  _dateFns: enUS,
  Popconfirm: {
    positiveText: 'Confirm',
    negativeText: 'Cancel'
  },
  Cascader: {
    placeholder: 'Please Select',
    loading: 'Loading',
    loadingRequiredMessage: label => `Please load all ${label}'s descedants before checking it.`
  },
  DatePicker: {
    Jan: 'Jan',
    Feb: 'Feb',
    Mar: 'Mar',
    Apr: 'Apr',
    May: 'May',
    Jun: 'Jun',
    Jul: 'Jul',
    Aug: 'Aug',
    Sep: 'Sep',
    Oct: 'Oct',
    Nov: 'Nov',
    Dec: 'Dec',
    Sun: 'Sun',
    Mon: 'Mon',
    Tue: 'Tue',
    Wed: 'Wed',
    Thu: 'Thu',
    Fri: 'Fri',
    Sat: 'Sat',
    seperator: 'to',
    clear: 'Clear',
    now: 'Now',
    confirm: 'Confirm',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    datePlaceholder: 'Select Date',
    datetimePlaceholder: 'Select Date and Time',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    startDatetimePlaceholder: 'Start Date and Time',
    endDatetimePlaceholder: 'End Date and Time'
  },
  DataTable: {
    confirm: 'Confirm',
    clear: 'Clear'
  },
  Transfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target'
  },
  Empty: {
    description: 'No Data'
  },
  Select: {
    placeholder: 'Please Select'
  },
  TimePicker: {
    placeholder: 'Select Time',
    positiveText: 'OK',
    negativeText: 'Cancel',
    now: 'Now'
  },
  Pagination: {
    goto: 'Goto',
    selectionSuffix: 'page'
  }
}
