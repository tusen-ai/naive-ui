import type { NLocale } from './enUS'

const siLK: NLocale = {
  name: 'si-LK',
  global: {
    undo: 'අහෝසි කරන්න',
    redo: 'නැවත කරන්න',
    confirm: 'තහවුරු කරන්න',
    clear: 'හිස් කරන්න'
  },
  Popconfirm: {
    positiveText: 'තහවුරු කරන්න',
    negativeText: 'අවලංගු කරන්න'
  },
  Cascader: {
    placeholder: 'කරුණාකර තෝරන්න',
    loading: 'පූරණය වෙමින්',
    loadingRequiredMessage: (label: string): string =>
      `කරුණාකර එය සලකුණු කිරීමට පෙර ${label} හි සියලු පරම්පරාවන් පූරණය කරන්න.`
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
    weekFormat: 'YYYY-w',
    clear: 'හිස් කරන්න',
    now: 'දැන්',
    confirm: 'තහවුරු කරන්න',
    selectTime: 'වේලාව තෝරන්න',
    selectDate: 'දිනය තෝරන්න',
    datePlaceholder: 'දිනය තෝරන්න',
    datetimePlaceholder: 'දිනය සහ වේලාව තෝරන්න',
    monthPlaceholder: 'මාසය තෝරන්න',
    yearPlaceholder: 'වර්ෂය තෝරන්න',
    quarterPlaceholder: 'කාර්තුව තෝරන්න',
    weekPlaceholder: 'සතිය තෝරන්න',
    startDatePlaceholder: 'ආරම්භක දිනය',
    endDatePlaceholder: 'අවසන් දිනය',
    startDatetimePlaceholder: 'ආරම්භක දිනය සහ වේලාව',
    endDatetimePlaceholder: 'අවසන් දිනය සහ වේලාව',
    startMonthPlaceholder: 'ආරම්භක මාසය',
    endMonthPlaceholder: 'අවසන් මාසය',
    monthBeforeYear: false,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'අද'
  },
  DataTable: {
    checkTableAll: 'වගුවේ සියල්ල තෝරන්න',
    uncheckTableAll: 'වගුවේ සියල්ල තේරීම ඉවත් කරන්න',
    confirm: 'තහවුරු කරන්න',
    clear: 'හිස් කරන්න'
  },
  LegacyTransfer: {
    sourceTitle: 'මූලාශ්‍රය',
    targetTitle: 'ඉලක්කය'
  },
  Transfer: {
    selectAll: 'සියල්ල තෝරන්න',
    unselectAll: 'සියල්ල තේරීම ඉවත් කරන්න',
    clearAll: 'හිස් කරන්න',
    total: (num: number): string => `මුළු ${num} අයිතම`,
    selected: (num: number): string => `${num} අයිතම තෝරා ඇත`
  },
  Empty: {
    description: 'දත්ත නැත'
  },
  Select: {
    placeholder: 'කරුණාකර තෝරන්න'
  },
  TimePicker: {
    placeholder: 'වේලාව තෝරන්න',
    positiveText: 'හරි',
    negativeText: 'අවලංගු කරන්න',
    now: 'දැන්',
    clear: 'හිස් කරන්න'
  },
  Pagination: {
    goto: 'යන්න',
    selectionSuffix: 'පිටුව'
  },
  DynamicTags: {
    add: 'එක් කරන්න'
  },
  Log: {
    loading: 'පූරණය වෙමින්'
  },
  Input: {
    placeholder: 'කරුණාකර ඇතුළත් කරන්න'
  },
  InputNumber: {
    placeholder: 'කරුණාකර ඇතුළත් කරන්න'
  },
  DynamicInput: {
    create: 'සාදන්න'
  },
  ThemeEditor: {
    title: 'තේමා සංස්කාරකය',
    clearAllVars: 'සියලු විචල්‍යයන් හිස් කරන්න',
    clearSearch: 'සෙවීම හිස් කරන්න',
    filterCompName: 'සංරචක නාමය පෙරහන් කරන්න',
    filterVarName: 'විචල්‍ය නාමය පෙරහන් කරන්න',
    import: 'ආනයනය',
    export: 'අපනයනය',
    restore: 'පෙරනිමියට යළි සකසන්න'
  },
  Image: {
    tipPrevious: 'පෙර පින්තූරය (←)',
    tipNext: 'ඊළඟ පින්තූරය (→)',
    tipCounterclockwise: 'ඔරලෝසුවට විරුද්ධව',
    tipClockwise: 'ඔරලෝසුව අනුව',
    tipZoomOut: 'කුඩා කරන්න',
    tipZoomIn: 'විශාල කරන්න',
    tipDownload: 'බාගන්න',
    tipClose: 'වසන්න (Esc)',
    tipOriginalSize: 'මුල් ප්‍රමාණයට විශාලනය කරන්න'
  },
  Heatmap: {
    less: 'අඩු',
    more: 'වැඩි',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default siLK
