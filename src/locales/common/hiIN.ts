import type { NLocale } from './enUS'

const hiIN: NLocale = {
  name: 'hi-IN',
  global: {
    undo: 'पूर्ववत करें',
    redo: 'पुनः करें',
    confirm: 'पुष्टि करें',
    clear: 'साफ़ करें'
  },
  Popconfirm: {
    positiveText: 'पुष्टि करें',
    negativeText: 'रद्द करें'
  },
  Cascader: {
    placeholder: 'कृपया चुनें',
    loading: 'लोड हो रहा है',
    loadingRequiredMessage: (label: string): string =>
      `कृपया जाँचने से पहले ${label} के सभी वंशजों को लोड करें।`
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
    clear: 'साफ़ करें',
    now: 'अभी',
    confirm: 'पुष्टि करें',
    selectTime: 'समय चुनें',
    selectDate: 'तारीख चुनें',
    datePlaceholder: 'तारीख चुनें',
    datetimePlaceholder: 'तारीख और समय चुनें',
    monthPlaceholder: 'महीना चुनें',
    yearPlaceholder: 'वर्ष चुनें',
    quarterPlaceholder: 'तिमाही चुनें',
    weekPlaceholder: 'सप्ताह चुनें',
    startDatePlaceholder: 'आरंभ तारीख',
    endDatePlaceholder: 'समाप्ति तारीख',
    startDatetimePlaceholder: 'आरंभ तारीख और समय',
    endDatetimePlaceholder: 'समाप्ति तारीख और समय',
    startMonthPlaceholder: 'आरंभ महीना',
    endMonthPlaceholder: 'समाप्ति महीना',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'आज'
  },
  DataTable: {
    checkTableAll: 'तालिका में सभी चुनें',
    uncheckTableAll: 'तालिका में सभी चयन हटाएँ',
    confirm: 'पुष्टि करें',
    clear: 'साफ़ करें'
  },
  LegacyTransfer: {
    sourceTitle: 'स्रोत',
    targetTitle: 'लक्ष्य'
  },
  Transfer: {
    selectAll: 'सभी चुनें',
    unselectAll: 'सभी चयन हटाएँ',
    clearAll: 'साफ़ करें',
    total: (num: number): string => `कुल ${num} आइटम`,
    selected: (num: number): string => `${num} आइटम चयनित`
  },
  Empty: {
    description: 'कोई डेटा नहीं'
  },
  Select: {
    placeholder: 'कृपया चुनें'
  },
  TimePicker: {
    placeholder: 'समय चुनें',
    positiveText: 'ठीक है',
    negativeText: 'रद्द करें',
    now: 'अभी',
    clear: 'साफ़ करें'
  },
  Pagination: {
    goto: 'जाएँ',
    selectionSuffix: 'पृष्ठ'
  },
  DynamicTags: {
    add: 'जोड़ें'
  },
  Log: {
    loading: 'लोड हो रहा है'
  },
  Input: {
    placeholder: 'कृपया दर्ज करें'
  },
  InputNumber: {
    placeholder: 'कृपया दर्ज करें'
  },
  DynamicInput: {
    create: 'बनाएँ'
  },
  ThemeEditor: {
    title: 'थीम संपादक',
    clearAllVars: 'सभी चर साफ़ करें',
    clearSearch: 'खोज साफ़ करें',
    filterCompName: 'घटक नाम फ़िल्टर करें',
    filterVarName: 'चर नाम फ़िल्टर करें',
    import: 'आयात',
    export: 'निर्यात',
    restore: 'डिफ़ॉल्ट पर रीसेट करें'
  },
  Image: {
    tipPrevious: 'पिछली तस्वीर (←)',
    tipNext: 'अगली तस्वीर (→)',
    tipCounterclockwise: 'वामावर्त',
    tipClockwise: 'दक्षिणावर्त',
    tipZoomOut: 'छोटा करें',
    tipZoomIn: 'बड़ा करें',
    tipDownload: 'डाउनलोड',
    tipClose: 'बंद करें (Esc)',
    tipOriginalSize: 'मूल आकार पर ज़ूम करें'
  },
  Heatmap: {
    less: 'कम',
    more: 'अधिक',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default hiIN
