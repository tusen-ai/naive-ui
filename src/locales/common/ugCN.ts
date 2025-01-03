import type { NLocale } from './enUS'

const ugCN: NLocale = {
  name: 'ug-CN',
  global: {
    undo: 'قالدۇرۇش',
    redo: 'قايتا',
    confirm: 'جەزملەش',
    clear: 'تازلاش'
  },
  Popconfirm: {
    positiveText: 'جەزملەش',
    negativeText: 'بىكار قىلىش'
  },
  Cascader: {
    placeholder: 'تاللاڭ',
    loading: 'يۈكلەۋاتىدۇ',
    loadingRequiredMessage: (label: string): string =>
      `جەمئى ${label} تۈگۈننى يۈكلەپ بولغاندىن كېيىن تاللىغىلى بولىدۇ`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy-يىل',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-wھەپتە',
    clear: 'تازلاش',
    now: 'مۇشۇ ۋاقىت',
    confirm: 'جەزملەش',
    selectTime: 'ۋاقىت تاللاڭ',
    selectDate: 'چىسلا تاللاڭ',
    datePlaceholder: 'چىسلا تاللاڭ',
    datetimePlaceholder: 'چىسلا ۋاقىت تاللاڭ',
    monthPlaceholder: 'ئاي تاللاڭ',
    yearPlaceholder: 'يىل تاللاڭ',
    quarterPlaceholder: 'پەسىل تاللاڭ',
    weekPlaceholder: 'ھەپتە تاللاڭ',
    startDatePlaceholder: 'باشلىنىش ۋاقتى',
    endDatePlaceholder: 'ئاخىرلىشىش ۋاقتى',
    startDatetimePlaceholder: 'باشلىندىغان چىسلا ۋاقىت',
    endDatetimePlaceholder: 'ئاخىرلىشىدىغان چىسلا ۋاقىت',
    startMonthPlaceholder: 'باشلىندىغان ئاي',
    endMonthPlaceholder: 'ئاخىرلىشىدىغان ئاي',
    monthBeforeYear: false,
    firstDayOfWeek: 0,
    today: 'بۈگۈن'
  },
  DataTable: {
    checkTableAll: 'ھەممە ئۇچۇرنى تاللاش',
    uncheckTableAll: 'تاللاشنى بىكار قىلىش',
    confirm: 'جەزملەش',
    clear: 'تازلاش'
  },
  LegacyTransfer: {
    sourceTitle: 'ئەسلى تۈر',
    targetTitle: 'نىشان تۈر'
  },
  Transfer: {
    selectAll: 'ھەممىنى تاللاش',
    clearAll: 'تازلاش',
    unselectAll: 'ھەممىنى بىكار قىلىش',
    total: (num: number): string => `جەمئى ${num} تۈر`,
    selected: (num: number): string => `${num} تۈر تاللاندى`
  },
  Empty: {
    description: 'ئۇچۇر يوق'
  },
  Select: {
    placeholder: 'تاللاڭ'
  },
  TimePicker: {
    placeholder: 'ۋاقىت تاللاڭ',
    positiveText: 'جەزملەش',
    negativeText: 'بىكار قىلىش',
    now: 'مۇشۇ ۋاقىت',
    clear: 'تازلاش'
  },
  Pagination: {
    goto: 'ئاتلاش',
    selectionSuffix: 'بەت'
  },
  DynamicTags: {
    add: 'قوشۇش'
  },
  Log: {
    loading: 'يۈكلەۋاتىدۇ'
  },
  Input: {
    placeholder: 'كىرگۈزۈڭ'
  },
  InputNumber: {
    placeholder: 'كىرگۈزۈڭ'
  },
  DynamicInput: {
    create: 'قوشۇش'
  },
  ThemeEditor: {
    title: 'ئۇسلوب تەھرىرلىگۈچ',
    clearAllVars: 'ھەممە پارامىتىرنى تازلاش',
    clearSearch: 'ئىزدەشنى تازلاش',
    filterCompName: 'ۋىجىت ئىسمىنى فىلتىرلاش',
    filterVarName: 'پارامىتېرنى فىلتىرلاش',
    import: 'ئەكىرىش',
    export: 'چىقىرىش',
    restore: 'ئەسلىگە قايتۇرۇش'
  },
  Image: {
    tipPrevious: '（←）ئالدىنقىسى',
    tipNext: 'كېيىنكىسى（→）',
    tipCounterclockwise: 'سولغا چۆرۈش',
    tipClockwise: 'ئوڭغا چۆرۈش',
    tipZoomOut: 'كىچىكلىتىش',
    tipZoomIn: 'چوڭايتىش',
    tipDownload: 'چۈشۈرۈش',
    tipClose: 'تاقاش（Esc）',
    tipOriginalSize: 'ئەسلىگە قايتۇرۇش'
  }
}

export default ugCN
