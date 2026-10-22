import type { NLocale } from './enUS'

const amET: NLocale = {
  name: 'am-ET',
  global: {
    undo: 'ቀልብስ',
    redo: 'ድገም',
    confirm: 'አረጋግጥ',
    clear: 'አጽዳ'
  },
  Popconfirm: {
    positiveText: 'አረጋግጥ',
    negativeText: 'ሰርዝ'
  },
  Cascader: {
    placeholder: 'እባክዎ ይምረጡ',
    loading: 'በመጫን ላይ',
    loadingRequiredMessage: (label: string): string =>
      `ከመምረጥዎ በፊት የ${label}ን ሁሉንም ልጆች ይጫኑ።`
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
    clear: 'አጽዳ',
    now: 'አሁን',
    confirm: 'አረጋግጥ',
    selectTime: 'ሰዓት ይምረጡ',
    selectDate: 'ቀን ይምረጡ',
    datePlaceholder: 'ቀን ይምረጡ',
    datetimePlaceholder: 'ቀን እና ሰዓት ይምረጡ',
    monthPlaceholder: 'ወር ይምረጡ',
    yearPlaceholder: 'ዓመት ይምረጡ',
    quarterPlaceholder: 'ሩብ ዓመት ይምረጡ',
    weekPlaceholder: 'ሳምንት ይምረጡ',
    startDatePlaceholder: 'መጀመሪያ ቀን',
    endDatePlaceholder: 'መጨረሻ ቀን',
    startDatetimePlaceholder: 'መጀመሪያ ቀን እና ሰዓት',
    endDatetimePlaceholder: 'መጨረሻ ቀን እና ሰዓት',
    startMonthPlaceholder: 'መጀመሪያ ወር',
    endMonthPlaceholder: 'መጨረሻ ወር',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ዛሬ'
  },
  DataTable: {
    checkTableAll: 'በሰንጠረዡ ሁሉንም ምረጥ',
    uncheckTableAll: 'በሰንጠረዡ ሁሉንም አንሳ',
    confirm: 'አረጋግጥ',
    clear: 'አጽዳ'
  },
  LegacyTransfer: {
    sourceTitle: 'ምንጭ',
    targetTitle: 'መድረሻ'
  },
  Transfer: {
    selectAll: 'ሁሉንም ምረጥ',
    unselectAll: 'ሁሉንም አንሳ',
    clearAll: 'አጽዳ',
    total: (num: number): string => `በጠቅላላ ${num} ንጥሎች`,
    selected: (num: number): string => `${num} ንጥሎች ተመርጠዋል`
  },
  Empty: {
    description: 'መረጃ የለም'
  },
  Select: {
    placeholder: 'እባክዎ ይምረጡ'
  },
  TimePicker: {
    placeholder: 'ሰዓት ይምረጡ',
    positiveText: 'እሺ',
    negativeText: 'ሰርዝ',
    now: 'አሁን',
    clear: 'አጽዳ'
  },
  Pagination: {
    goto: 'ሂድ ወደ',
    selectionSuffix: 'ገጽ'
  },
  DynamicTags: {
    add: 'ጨምር'
  },
  Log: {
    loading: 'በመጫን ላይ'
  },
  Input: {
    placeholder: 'እባክዎ ያስገቡ'
  },
  InputNumber: {
    placeholder: 'እባክዎ ያስገቡ'
  },
  DynamicInput: {
    create: 'ፍጠር'
  },
  ThemeEditor: {
    title: 'የገጽታ አርታኢ',
    clearAllVars: 'ሁሉንም ተለዋዋጮች አጽዳ',
    clearSearch: 'ፍለጋን አጽዳ',
    filterCompName: 'የአካል ስም አጣራ',
    filterVarName: 'የተለዋዋጭ ስም አጣራ',
    import: 'አስመጣ',
    export: 'ወደ ውጭ ላክ',
    restore: 'ወደ ነባሪ መልስ'
  },
  Image: {
    tipPrevious: 'ቀዳሚ ምስል (←)',
    tipNext: 'ቀጣይ ምስል (→)',
    tipCounterclockwise: 'ከሰዓት በተቃራኒ',
    tipClockwise: 'ከሰዓት አቅጣጫ',
    tipZoomOut: 'አሳንስ',
    tipZoomIn: 'አጉላ',
    tipDownload: 'አውርድ',
    tipClose: 'ዝጋ (Esc)',
    tipOriginalSize: 'ወደ ኦሪጂናል መጠን አጉላ'
  },
  Heatmap: {
    less: 'ያነሰ',
    more: 'ተጨማሪ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default amET
