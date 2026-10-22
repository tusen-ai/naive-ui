import type { NLocale } from './enUS'

const paIN: NLocale = {
  name: 'pa-IN',
  global: {
    undo: 'ਅਣਕੀਤਾ',
    redo: 'ਮੁੜ ਕਰੋ',
    confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    clear: 'ਸਾਫ਼ ਕਰੋ'
  },
  Popconfirm: {
    positiveText: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    negativeText: 'ਰੱਦ ਕਰੋ'
  },
  Cascader: {
    placeholder: 'ਕਿਰਪਾ ਕਰਕੇ ਚੁਣੋ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
    loadingRequiredMessage: (label: string): string =>
      `ਕਿਰਪਾ ਕਰਕੇ ਚੈੱਕ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ${label} ਦੀਆਂ ਸਾਰੀਆਂ ਸੰਤਾਨਾਂ ਲੋਡ ਕਰੋ।`
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
    clear: 'ਸਾਫ਼ ਕਰੋ',
    now: 'ਹੁਣ',
    confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    selectTime: 'ਸਮਾਂ ਚੁਣੋ',
    selectDate: 'ਤਾਰੀਖ ਚੁਣੋ',
    datePlaceholder: 'ਤਾਰੀਖ ਚੁਣੋ',
    datetimePlaceholder: 'ਤਾਰੀਖ ਅਤੇ ਸਮਾਂ ਚੁਣੋ',
    monthPlaceholder: 'ਮਹੀਨਾ ਚੁਣੋ',
    yearPlaceholder: 'ਸਾਲ ਚੁਣੋ',
    quarterPlaceholder: 'ਤਿਮਾਹੀ ਚੁਣੋ',
    weekPlaceholder: 'ਹਫ਼ਤਾ ਚੁਣੋ',
    startDatePlaceholder: 'ਸ਼ੁਰੂਆਤੀ ਤਾਰੀਖ',
    endDatePlaceholder: 'ਅੰਤਮ ਤਾਰੀਖ',
    startDatetimePlaceholder: 'ਸ਼ੁਰੂਆਤੀ ਤਾਰੀਖ ਅਤੇ ਸਮਾਂ',
    endDatetimePlaceholder: 'ਅੰਤਮ ਤਾਰੀਖ ਅਤੇ ਸਮਾਂ',
    startMonthPlaceholder: 'ਸ਼ੁਰੂਆਤੀ ਮਹੀਨਾ',
    endMonthPlaceholder: 'ਅੰਤਮ ਮਹੀਨਾ',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ਅੱਜ'
  },
  DataTable: {
    checkTableAll: 'ਸਾਰਣੀ ਵਿੱਚ ਸਭ ਚੁਣੋ',
    uncheckTableAll: 'ਸਾਰਣੀ ਵਿੱਚ ਸਭ ਅਣਚੁਣੇ ਕਰੋ',
    confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    clear: 'ਸਾਫ਼ ਕਰੋ'
  },
  LegacyTransfer: {
    sourceTitle: 'ਸਰੋਤ',
    targetTitle: 'ਟੀਚਾ'
  },
  Transfer: {
    selectAll: 'ਸਭ ਚੁਣੋ',
    unselectAll: 'ਸਭ ਅਣਚੁਣੇ ਕਰੋ',
    clearAll: 'ਸਾਫ਼ ਕਰੋ',
    total: (num: number): string => `ਕੁੱਲ ${num} ਆਈਟਮਾਂ`,
    selected: (num: number): string => `${num} ਆਈਟਮਾਂ ਚੁਣੀਆਂ`
  },
  Empty: {
    description: 'ਕੋਈ ਡਾਟਾ ਨਹੀਂ'
  },
  Select: {
    placeholder: 'ਕਿਰਪਾ ਕਰਕੇ ਚੁਣੋ'
  },
  TimePicker: {
    placeholder: 'ਸਮਾਂ ਚੁਣੋ',
    positiveText: 'ਠੀਕ ਹੈ',
    negativeText: 'ਰੱਦ ਕਰੋ',
    now: 'ਹੁਣ',
    clear: 'ਸਾਫ਼ ਕਰੋ'
  },
  Pagination: {
    goto: 'ਜਾਓ',
    selectionSuffix: 'ਪੰਨਾ'
  },
  DynamicTags: {
    add: 'ਜੋੜੋ'
  },
  Log: {
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ'
  },
  Input: {
    placeholder: 'ਕਿਰਪਾ ਕਰਕੇ ਦਰਜ ਕਰੋ'
  },
  InputNumber: {
    placeholder: 'ਕਿਰਪਾ ਕਰਕੇ ਦਰਜ ਕਰੋ'
  },
  DynamicInput: {
    create: 'ਬਣਾਓ'
  },
  ThemeEditor: {
    title: 'ਥੀਮ ਸੰਪਾਦਕ',
    clearAllVars: 'ਸਾਰੇ ਚਰ ਸਾਫ਼ ਕਰੋ',
    clearSearch: 'ਖੋਜ ਸਾਫ਼ ਕਰੋ',
    filterCompName: 'ਭਾਗ ਦਾ ਨਾਮ ਛਾਣੋ',
    filterVarName: 'ਚਰ ਦਾ ਨਾਮ ਛਾਣੋ',
    import: 'ਆਯਾਤ',
    export: 'ਨਿਰਯਾਤ',
    restore: 'ਮੂਲ ਉੱਤੇ ਰੀਸੈੱਟ ਕਰੋ'
  },
  Image: {
    tipPrevious: 'ਪਿਛਲੀ ਤਸਵੀਰ (←)',
    tipNext: 'ਅਗਲੀ ਤਸਵੀਰ (→)',
    tipCounterclockwise: 'ਘੜੀ ਦੀ ਉਲਟ ਦਿਸ਼ਾ',
    tipClockwise: 'ਘੜੀ ਦੀ ਦਿਸ਼ਾ',
    tipZoomOut: 'ਛੋਟਾ ਕਰੋ',
    tipZoomIn: 'ਵੱਡਾ ਕਰੋ',
    tipDownload: 'ਡਾਊਨਲੋਡ',
    tipClose: 'ਬੰਦ ਕਰੋ (Esc)',
    tipOriginalSize: 'ਅਸਲ ਆਕਾਰ ਉੱਤੇ ਜ਼ੂਮ ਕਰੋ'
  },
  Heatmap: {
    less: 'ਘੱਟ',
    more: 'ਵੱਧ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default paIN
