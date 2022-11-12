import type { NLocale } from './enUS'

const enGB: NLocale = {
  name: 'en-GB',
  global: {
    undo: 'Undo',
    redo: 'Redo',
    confirm: 'Confirm',
    clear: 'Clear'
  },
  Popconfirm: {
    positiveText: 'Confirm',
    negativeText: 'Cancel'
  },
  Cascader: {
    placeholder: 'Please Select',
    loading: 'Loading',
    loadingRequiredMessage: (label: string): string =>
      `Please load all ${label}'s descendants before checking it.`
  },
  Time: {
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy/MM',
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'Clear',
    now: 'Now',
    confirm: 'Confirm',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    datePlaceholder: 'Select Date',
    datetimePlaceholder: 'Select Date and Time',
    monthPlaceholder: 'Select Month',
    yearPlaceholder: 'Select Year',
    quarterPlaceholder: 'Select Quarter',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    startDatetimePlaceholder: 'Start Date and Time',
    endDatetimePlaceholder: 'End Date and Time',
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Today'
  },
  DataTable: {
    checkTableAll: 'Select all in the table',
    uncheckTableAll: 'Unselect all in the table',
    confirm: 'Confirm',
    clear: 'Clear'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target'
  },
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (num: number): string => `Total ${num} items`,
    selected: (num: number): string => `${num} items selected`
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
  },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'Clear All Variables',
    clearSearch: 'Clear Search',
    filterCompName: 'Filter Component Name',
    filterVarName: 'Filter Variable Name',
    import: 'Import',
    export: 'Export',
    restore: 'Reset to Default'
  },
  Image: {
    tipPrevious: 'Previous picture (←)',
    tipNext: 'Next picture (→)',
    tipCounterclockwise: 'Counterclockwise',
    tipClockwise: 'Clockwise',
    tipZoomOut: 'Zoom out',
    tipZoomIn: 'Zoom in',
    tipClose: 'Close (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default enGB
