const ckb = {
  name: 'ckb',
  global: {
    undo: 'هەڵوەشاندنەوە',
    redo: 'ئەنجامدانەوە',
    confirm: 'پشتڕاستکردنەوە',
    clear: 'پاککردنەوە'
  },
  Popconfirm: {
    positiveText: 'پشتڕاستکردنەوە',
    negativeText: 'پاشگەزبوونەوە'
  },
  Cascader: {
    placeholder: 'تکایە هەڵبژێرە',
    loading: 'بارکردن',
    loadingRequiredMessage: (label: string): string =>
      `تکایە هەموو نەوەکانی ${label} باربکە پێشئەوەی بیناپشکنیت.`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'پاککردنەوە',
    now: 'ئێستا',
    confirm: 'پشتڕاستکردنەوە',
    selectTime: 'هەڵبژاردنی کات',
    selectDate: 'هەڵبژاردنی بەروار',
    datePlaceholder: 'هەڵبژاردنی بەروار',
    datetimePlaceholder: 'هەڵبژاردنی کات و بەروار',
    monthPlaceholder: 'هەڵبژاردنی مانگ',
    yearPlaceholder: 'هەڵبژاردنی ساڵ',
    quarterPlaceholder: 'هەڵبژاردنی چارەک',
    startDatePlaceholder: 'بەرواری دەستپێک',
    endDatePlaceholder: 'بەرواری کۆتایی',
    startDatetimePlaceholder: 'کات و بەرواری دەستپێک',
    endDatetimePlaceholder: 'کات و بەرواری کۆتایی,
    startMonthPlaceholder: 'مانگی دەستپێک',
    endMonthPlaceholder: 'مانگی کۆتایی',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ئەمڕۆ'
  },
  DataTable: {
    checkTableAll: 'هەموویان لە خشتەکەدا هەڵبژێرە',
    uncheckTableAll: 'هەموویان لە خشتەکەدا هەڵمەبژێرە',
    confirm: 'پشتڕاستکردنەوە',
    clear: 'پاککردنەوە'
  },
  LegacyTransfer: {
    sourceTitle: 'سه‌رچاوه‌',
    targetTitle: 'ئامانج'
  },
  Transfer: {
    selectAll: 'هەمووی هەڵبژێرە',
    unselectAll: 'هەمووی هەڵمەبژێرە',
    clearAll: 'پاککردنەوە',
    total: (num: number): string => `کۆ ${num} دانە`,
    selected: (num: number): string => `${num} دانە هەڵبژێردراوە`
  },
  Empty: {
    description: 'هیچ داتا نیە'
  },
  Select: {
    placeholder: 'تکایە هەڵبژێرە'
  },
  TimePicker: {
    placeholder: 'کات هەڵبژێرە',
    positiveText: 'باشە',
    negativeText: 'پەشیمانبوونەوە',
    now: 'ئێستا'
  },
  Pagination: {
    goto: 'بڕۆ بۆ',
    selectionSuffix: 'لاپەڕە'
  },
  DynamicTags: {
    add: 'زیادکردن'
  },
  Log: {
    loading: 'بارکردن'
  },
  Input: {
    placeholder: 'تکایە بنوسە'
  },
  InputNumber: {
    placeholder: 'تکایە بنوسە'
  },
  DynamicInput: {
    create: 'زیادکردن'
  },
  ThemeEditor: {
    title: 'دەستکاریی شێواز',
    clearAllVars: 'هەموو گۆڕدراوەکان پابکەرەوە',
    clearSearch: 'پاککردنەوەی گەڕان',
    filterCompName: 'ناوی پێکهاتەی پاڵاوتن',
    filterVarName: 'ناوی گۆڕدراوی پاڵاوتن',
    import: 'هێنان',
    export: 'هەناردە',
    restore: 'وەکخۆی لێ بکەرەوە'
  },
  Image: {
    tipPrevious: 'وێنەی پێشوو (→)',
    tipNext: 'وێنەی دواتر (←)',
    tipCounterclockwise: 'بە پێچەوانەی کاتژمێر',
    tipClockwise: 'بە ئاراستەی کاتژمێر',
    tipZoomOut: 'دووری بخەرەوە',
    tipZoomIn: 'نزیکی بخەرەوە',
    tipDownload: 'داگرتن',
    tipClose: 'داخستن (Esc)',
    // TODO: translation
    tipOriginalSize: 'نزیکردنەوە وەک قەبارەی بنەڕەت'
  }
}

export type NLocale = typeof ckb
export default ckb
