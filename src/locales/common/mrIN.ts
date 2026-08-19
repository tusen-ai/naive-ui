import type { NLocale } from './enUS'

const mrIN: NLocale = {
  name: 'mr-IN',
  global: {
    undo: 'पूर्ववत करा',
    redo: 'पुन्हा करा',
    confirm: 'पुष्टी करा',
    clear: 'साफ करा'
  },
  Popconfirm: {
    positiveText: 'पुष्टी करा',
    negativeText: 'रद्द करा'
  },
  Cascader: {
    placeholder: 'कृपया निवडा',
    loading: 'लोड होत आहे',
    loadingRequiredMessage: (label: string): string =>
      `कृपया तपासण्यापूर्वी ${label}चे सर्व वंशज लोड करा.`
  },
  Time: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'साफ करा',
    now: 'आता',
    confirm: 'पुष्टी करा',
    selectTime: 'वेळ निवडा',
    selectDate: 'दिनांक निवडा',
    datePlaceholder: 'दिनांक निवडा',
    datetimePlaceholder: 'दिनांक आणि वेळ निवडा',
    monthPlaceholder: 'महिना निवडा',
    yearPlaceholder: 'वर्ष निवडा',
    quarterPlaceholder: 'तिमाही निवडा',
    weekPlaceholder: 'आठवडा निवडा',
    startDatePlaceholder: 'प्रारंभ दिनांक',
    endDatePlaceholder: 'समाप्ती दिनांक',
    startDatetimePlaceholder: 'प्रारंभ दिनांक आणि वेळ',
    endDatetimePlaceholder: 'समाप्ती दिनांक आणि वेळ',
    startMonthPlaceholder: 'प्रारंभ महिना',
    endMonthPlaceholder: 'समाप्ती महिना',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'आज'
  },
  DataTable: {
    checkTableAll: 'तक्त्यातील सर्व निवडा',
    uncheckTableAll: 'तक्त्यातील सर्व निवड रद्द करा',
    confirm: 'पुष्टी करा',
    clear: 'साफ करा'
  },
  LegacyTransfer: {
    sourceTitle: 'स्रोत',
    targetTitle: 'लक्ष्य'
  },
  Transfer: {
    selectAll: 'सर्व निवडा',
    unselectAll: 'सर्व निवड रद्द करा',
    clearAll: 'साफ करा',
    total: (num: number): string => `एकूण ${num} आयटम`,
    selected: (num: number): string => `${num} आयटम निवडले`
  },
  Empty: {
    description: 'डेटा नाही'
  },
  Select: {
    placeholder: 'कृपया निवडा'
  },
  TimePicker: {
    placeholder: 'वेळ निवडा',
    positiveText: 'ठीक आहे',
    negativeText: 'रद्द करा',
    now: 'आता',
    clear: 'साफ करा'
  },
  Pagination: {
    goto: 'जा',
    selectionSuffix: 'पृष्ठ'
  },
  DynamicTags: {
    add: 'जोडा'
  },
  Log: {
    loading: 'लोड होत आहे'
  },
  Input: {
    placeholder: 'कृपया प्रविष्ट करा'
  },
  InputNumber: {
    placeholder: 'कृपया प्रविष्ट करा'
  },
  DynamicInput: {
    create: 'तयार करा'
  },
  ThemeEditor: {
    title: 'थीम संपादक',
    clearAllVars: 'सर्व चल साफ करा',
    clearSearch: 'शोध साफ करा',
    filterCompName: 'घटक नाव फिल्टर करा',
    filterVarName: 'चल नाव फिल्टर करा',
    import: 'आयात',
    export: 'निर्यात',
    restore: 'डीफॉल्टवर रीसेट करा'
  },
  Image: {
    tipPrevious: 'मागील चित्र (←)',
    tipNext: 'पुढील चित्र (→)',
    tipCounterclockwise: 'घड्याळाच्या विरुद्ध दिशेने',
    tipClockwise: 'घड्याळाच्या दिशेने',
    tipZoomOut: 'लहान करा',
    tipZoomIn: 'मोठे करा',
    tipDownload: 'डाउनलोड',
    tipClose: 'बंद करा (Esc)',
    tipOriginalSize: 'मूळ आकारावर झूम करा'
  },
  Heatmap: {
    less: 'कमी',
    more: 'अधिक',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default mrIN
