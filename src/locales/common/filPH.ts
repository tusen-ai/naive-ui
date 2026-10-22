import type { NLocale } from './enUS'

const filPH: NLocale = {
  name: 'fil-PH',
  global: {
    undo: 'I-undo',
    redo: 'I-redo',
    confirm: 'Kumpirmahin',
    clear: 'I-clear'
  },
  Popconfirm: {
    positiveText: 'Kumpirmahin',
    negativeText: 'Kanselahin'
  },
  Cascader: {
    placeholder: 'Mangyaring pumili',
    loading: 'Naglo-load',
    loadingRequiredMessage: (label: string): string =>
      `I-load muna ang lahat ng descendant ng ${label} bago ito piliin.`
  },
  Time: {
    dateFormat: 'MM/dd/yyyy',
    dateTimeFormat: 'MM/dd/yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'MM/dd/yyyy',
    dateTimeFormat: 'MM/dd/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'I-clear',
    now: 'Ngayon',
    confirm: 'Kumpirmahin',
    selectTime: 'Pumili ng oras',
    selectDate: 'Pumili ng petsa',
    datePlaceholder: 'Pumili ng petsa',
    datetimePlaceholder: 'Pumili ng petsa at oras',
    monthPlaceholder: 'Pumili ng buwan',
    yearPlaceholder: 'Pumili ng taon',
    quarterPlaceholder: 'Pumili ng quarter',
    weekPlaceholder: 'Pumili ng linggo',
    startDatePlaceholder: 'Petsa ng simula',
    endDatePlaceholder: 'Petsa ng tapos',
    startDatetimePlaceholder: 'Petsa at oras ng simula',
    endDatetimePlaceholder: 'Petsa at oras ng tapos',
    startMonthPlaceholder: 'Buwan ng simula',
    endMonthPlaceholder: 'Buwan ng tapos',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Ngayong araw'
  },
  DataTable: {
    checkTableAll: 'Piliin lahat sa talahanayan',
    uncheckTableAll: 'Alisin ang lahat ng seleksyon sa talahanayan',
    confirm: 'Kumpirmahin',
    clear: 'I-clear'
  },
  LegacyTransfer: {
    sourceTitle: 'Pinagmulan',
    targetTitle: 'Destinasyon'
  },
  Transfer: {
    selectAll: 'Piliin lahat',
    unselectAll: 'Alisin ang lahat ng seleksyon',
    clearAll: 'I-clear',
    total: (num: number): string => `Kabuuan ${num} item`,
    selected: (num: number): string => `${num} item ang napili`
  },
  Empty: {
    description: 'Walang data'
  },
  Select: {
    placeholder: 'Mangyaring pumili'
  },
  TimePicker: {
    placeholder: 'Pumili ng oras',
    positiveText: 'OK',
    negativeText: 'Kanselahin',
    now: 'Ngayon',
    clear: 'I-clear'
  },
  Pagination: {
    goto: 'Pumunta sa',
    selectionSuffix: 'pahina'
  },
  DynamicTags: {
    add: 'Idagdag'
  },
  Log: {
    loading: 'Naglo-load'
  },
  Input: {
    placeholder: 'Mangyaring maglagay'
  },
  InputNumber: {
    placeholder: 'Mangyaring maglagay'
  },
  DynamicInput: {
    create: 'Lumikha'
  },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'I-clear ang lahat ng variable',
    clearSearch: 'I-clear ang paghahanap',
    filterCompName: 'I-filter ang pangalan ng component',
    filterVarName: 'I-filter ang pangalan ng variable',
    import: 'I-import',
    export: 'I-export',
    restore: 'Ibalik sa default'
  },
  Image: {
    tipPrevious: 'Nakaraang larawan (←)',
    tipNext: 'Susunod na larawan (→)',
    tipCounterclockwise: 'Pakaliwa',
    tipClockwise: 'Pakanan',
    tipZoomOut: 'Liitan',
    tipZoomIn: 'Palakihin',
    tipDownload: 'I-download',
    tipClose: 'Isara (Esc)',
    tipOriginalSize: 'I-zoom sa orihinal na sukat'
  },
  Heatmap: {
    less: 'mas kaunti',
    more: 'mas marami',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default filPH
