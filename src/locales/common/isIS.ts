import type { NLocale } from './enUS'

const isIS: NLocale = {
  name: 'is-IS',
  global: {
    undo: 'Afturkalla',
    redo: 'Endurtaka',
    confirm: 'Staðfesta',
    clear: 'Hreinsa'
  },
  Popconfirm: {
    positiveText: 'Staðfesta',
    negativeText: 'Hætta við'
  },
  Cascader: {
    placeholder: 'Vinsamlegast veldu',
    loading: 'Hleð',
    loadingRequiredMessage: (label: string): string =>
      `Hladdu öllum afkomendum ${label} áður en þú velur.`
  },
  Time: {
    dateFormat: 'd.M.yyyy',
    dateTimeFormat: 'd.M.yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'M.yyyy',
    dateFormat: 'd.M.yyyy',
    dateTimeFormat: 'd.M.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Hreinsa',
    now: 'Núna',
    confirm: 'Staðfesta',
    selectTime: 'Veldu tíma',
    selectDate: 'Veldu dagsetningu',
    datePlaceholder: 'Veldu dagsetningu',
    datetimePlaceholder: 'Veldu dagsetningu og tíma',
    monthPlaceholder: 'Veldu mánuð',
    yearPlaceholder: 'Veldu ár',
    quarterPlaceholder: 'Veldu ársfjórðung',
    weekPlaceholder: 'Veldu viku',
    startDatePlaceholder: 'Upphafsdagur',
    endDatePlaceholder: 'Lokadagur',
    startDatetimePlaceholder: 'Upphafsdagur og tími',
    endDatetimePlaceholder: 'Lokadagur og tími',
    startMonthPlaceholder: 'Upphafsmánuður',
    endMonthPlaceholder: 'Lokamánuður',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Í dag'
  },
  DataTable: {
    checkTableAll: 'Velja allt í töflunni',
    uncheckTableAll: 'Afvelja allt í töflunni',
    confirm: 'Staðfesta',
    clear: 'Hreinsa'
  },
  LegacyTransfer: {
    sourceTitle: 'Uppruni',
    targetTitle: 'Áfangastaður'
  },
  Transfer: {
    selectAll: 'Velja allt',
    unselectAll: 'Afvelja allt',
    clearAll: 'Hreinsa',
    total: (num: number): string => `Samtals ${num} atriði`,
    selected: (num: number): string => `${num} atriði valin`
  },
  Empty: {
    description: 'Engin gögn'
  },
  Select: {
    placeholder: 'Vinsamlegast veldu'
  },
  TimePicker: {
    placeholder: 'Veldu tíma',
    positiveText: 'Í lagi',
    negativeText: 'Hætta við',
    now: 'Núna',
    clear: 'Hreinsa'
  },
  Pagination: {
    goto: 'Fara á',
    selectionSuffix: 'síða'
  },
  DynamicTags: {
    add: 'Bæta við'
  },
  Log: {
    loading: 'Hleð'
  },
  Input: {
    placeholder: 'Vinsamlegast sláðu inn'
  },
  InputNumber: {
    placeholder: 'Vinsamlegast sláðu inn'
  },
  DynamicInput: {
    create: 'Búa til'
  },
  ThemeEditor: {
    title: 'Þema ritstjóri',
    clearAllVars: 'Hreinsa allar breytur',
    clearSearch: 'Hreinsa leit',
    filterCompName: 'Sía heiti íhlutar',
    filterVarName: 'Sía heiti breytu',
    import: 'Flytja inn',
    export: 'Flytja út',
    restore: 'Endurstilla á sjálfgefið'
  },
  Image: {
    tipPrevious: 'Fyrri mynd (←)',
    tipNext: 'Næsta mynd (→)',
    tipCounterclockwise: 'Rangsælis',
    tipClockwise: 'Réttsælis',
    tipZoomOut: 'Minnka',
    tipZoomIn: 'Stækka',
    tipDownload: 'Sækja',
    tipClose: 'Loka (Esc)',
    tipOriginalSize: 'Aðdráttur í upprunalega stærð'
  },
  Heatmap: {
    less: 'minna',
    more: 'meira',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default isIS
