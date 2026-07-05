import type { NLocale } from 'naive-ui'

const daDK: NLocale = {
  name: 'da-DK',
  global: {
    undo: 'Fortryd',
    redo: 'Gentag',
    confirm: 'Bekræft',
    clear: 'Ryd'
  },
  Popconfirm: {
    positiveText: 'Bekræft',
    negativeText: 'Annuller'
  },
  Cascader: {
    placeholder: 'Vælg venligst',
    loading: 'Indlæser',
    loadingRequiredMessage: (label: string): string =>
      `Indlæs venligst alle underpunkter til ${label} før du vælger punktet.`
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
    clear: 'Ryd',
    now: 'Nu',
    confirm: 'Bekræft',
    selectTime: 'Vælg tid',
    selectDate: 'Vælg dato',
    datePlaceholder: 'Vælg dato',
    datetimePlaceholder: 'Vælg dato og tid',
    monthPlaceholder: 'Vælg måned',
    yearPlaceholder: 'Vælg år',
    quarterPlaceholder: 'Vælg kvartal',
    weekPlaceholder: 'Vælg uge',
    startDatePlaceholder: 'Startdato',
    endDatePlaceholder: 'Slutdato',
    startDatetimePlaceholder: 'Startdato og -tid',
    endDatetimePlaceholder: 'Slutdato og -tid',
    startMonthPlaceholder: 'Startmåned',
    endMonthPlaceholder: 'Slutmåned',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'I dag'
  },
  DataTable: {
    checkTableAll: 'Vælg alle',
    uncheckTableAll: 'Vælg ingen',
    confirm: 'Bekræft',
    clear: 'Ryd'
  },
  LegacyTransfer: {
    sourceTitle: 'Kilde',
    targetTitle: 'Mål'
  },
  Transfer: {
    selectAll: 'Vælg alle',
    unselectAll: 'Vælg ingen',
    clearAll: 'Ryd',
    total: (num: number): string => `I alt ${num} rækker`,
    selected: (num: number): string => `${num} rækker valgt`
  },
  Empty: {
    description: 'Ingen data'
  },
  Select: {
    placeholder: 'Vælg venligst'
  },
  TimePicker: {
    placeholder: 'Vælg tid',
    positiveText: 'OK',
    negativeText: 'Annuller',
    now: 'Nu',
    clear: 'Ryd'
  },
  Pagination: {
    goto: 'Gå til',
    selectionSuffix: 'side'
  },
  DynamicTags: {
    add: 'Tilføj'
  },
  Log: {
    loading: 'Indlæser'
  },
  Input: {
    placeholder: 'Udfyld venligst'
  },
  InputNumber: {
    placeholder: 'Udfyld venligst'
  },
  DynamicInput: {
    create: 'Opret'
  },
  ThemeEditor: {
    title: 'Temaværktøj',
    clearAllVars: 'Nulstil alle variabler',
    clearSearch: 'Ryd søgning',
    filterCompName: 'Filtrer efter komponentnavn',
    filterVarName: 'Filtrer efter variabelnavn',
    import: 'Importér',
    export: 'Eksportér',
    restore: 'Nulstil til oprindelige valg'
  },
  Image: {
    tipPrevious: 'Forrige billede (←)',
    tipNext: 'Næste billede (→)',
    tipCounterclockwise: 'Mod uret',
    tipClockwise: 'Med uret',
    tipZoomOut: 'Zoom ud',
    tipZoomIn: 'Zoom ind',
    tipDownload: 'Download',
    tipClose: 'Luk (Esc)',
    tipOriginalSize: 'Zoom til oprindelig størrelse'
  },
  Heatmap: {
    less: 'mindre',
    more: 'mere',
    monthFormat: 'MMM',
    weekdayFormat: 'eee'
  }
}

export default daDK
