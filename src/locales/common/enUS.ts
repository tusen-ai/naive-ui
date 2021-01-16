const enUS = {
  name: 'en-US',
  Popconfirm: {
    positiveText: 'Confirm',
    negativeText: 'Cancel'
  },
  Cascader: {
    placeholder: 'Please Select',
    loading: 'Loading',
    loadingRequiredMessage: (label: string): string =>
      `Please load all ${label}'s descedants before checking it.`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd hh:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
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
    endDatetimePlaceholder: 'End Date and Time',
    monthBeforeYear: true
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
  },
  DynamicTags: {
    add: 'Add'
  },
  Log: {
    loading: 'Loading'
  },
  Input: {
    placeholder: 'Please Input'
  },
  InputNumber: {
    placeholder: 'Please Input'
  },
  DynamicInput: {
    create: 'Create'
  }
}

export type NaiveLocale = typeof enUS
export default enUS
