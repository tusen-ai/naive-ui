import type { NLocale } from './enUS'

const etEE: NLocale = {
  name: 'et-EE',
  global: {
    undo: 'Võta tagasi',
    redo: 'Rakenda uuesti',
    confirm: 'Kinnita',
    clear: 'Tühjenda'
  },
  Popconfirm: {
    positiveText: 'Kinnita',
    negativeText: 'Katkesta'
  },
  Cascader: {
    placeholder: 'Vali',
    loading: 'Laeb',
    loadingRequiredMessage: (label: string): string =>
      `Enne kontrollimist pead elemendi ${label} kõik alamad laadima.`
  },
  Time: {
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'yyyy-w',
    clear: 'Tühjenda',
    now: 'Nüüd',
    confirm: 'Kinnita',
    selectTime: 'Vali aeg',
    selectDate: 'Vali kuupäev',
    datePlaceholder: 'Vali kuupäev',
    datetimePlaceholder: 'Vali aeg ja kuupäev',
    monthPlaceholder: 'Vali kuu',
    yearPlaceholder: 'Vali aasta',
    quarterPlaceholder: 'Vali kvartal',
    weekPlaceholder: 'Vali nädal',
    startDatePlaceholder: 'Alguskpv',
    endDatePlaceholder: 'Lõppkpv',
    startDatetimePlaceholder: 'Alguskpv ja -aeg',
    endDatetimePlaceholder: 'Lõppkpv ja -aeg',
    startMonthPlaceholder: 'Alguskuu',
    endMonthPlaceholder: 'Lõppkuu',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Täna'
  },
  DataTable: {
    checkTableAll: 'Vali tabelis kõik',
    uncheckTableAll: 'Tühista tabeli valik',
    confirm: 'Kinnita',
    clear: 'Tühjenda'
  },
  LegacyTransfer: {
    sourceTitle: 'Kust',
    targetTitle: 'Kuhu'
  },
  Transfer: {
    selectAll: 'Vali kõik',
    unselectAll: 'Tühista valik',
    clearAll: 'Tühjenda',
    total: (num: number): string => `Kokku ${num} rida`,
    selected: (num: number): string => `${num} rida valitud`
  },
  Empty: {
    description: 'Andmeid pole'
  },
  Select: {
    placeholder: 'Vali'
  },
  TimePicker: {
    placeholder: 'Vali aeg',
    positiveText: 'OK',
    negativeText: 'Katkesta',
    now: 'Nüüd',
    clear: 'Tühjenda'
  },
  Pagination: {
    goto: 'Mine',
    selectionSuffix: 'lk'
  },
  DynamicTags: {
    add: 'Lisa'
  },
  Log: {
    loading: 'Laeb'
  },
  Input: {
    placeholder: 'Sisesta'
  },
  InputNumber: {
    placeholder: 'Sisesta'
  },
  DynamicInput: {
    create: 'Loo'
  },
  ThemeEditor: {
    title: 'Teemaredaktor',
    clearAllVars: 'Tühjenda kõik muutujad',
    clearSearch: 'Tühjenda otsing',
    filterCompName: 'Filter komponendi nimega',
    filterVarName: 'Filter muutuja nimega',
    import: 'Import',
    export: 'Eksport',
    restore: 'Taasta originaal'
  },
  Image: {
    tipPrevious: 'Eelmine pilt (←)',
    tipNext: 'Järgmine pilt (→)',
    tipCounterclockwise: 'Vastupäeva',
    tipClockwise: 'Päripäeva',
    tipZoomOut: 'Suumi välja',
    tipZoomIn: 'Suumi sisse',
    tipDownload: 'Lae alla',
    tipClose: 'Sulge (Esc)',
    tipOriginalSize: 'Algsuurus'
  }
}

export default etEE
