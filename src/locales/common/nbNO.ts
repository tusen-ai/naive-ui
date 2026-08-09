import type { NLocale } from './enUS'

const nbNO: NLocale = {
  name: 'nb-NO',
  global: {
    undo: 'Angre',
    redo: 'Utfør likevel',
    confirm: 'Bekreft',
    clear: 'Tøm'
  },
  Popconfirm: {
    positiveText: 'Bekreft',
    negativeText: 'Avbryt'
  },
  Cascader: {
    placeholder: 'Vennligst velg',
    loading: 'Laster',
    loadingRequiredMessage: (label: string): string =>
      `Vennligst last alle underpunkter av ${label} før du velger oppføringen.`
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
    monthTypeFormat: 'MM.yyyy',
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Tøm',
    now: 'Nå',
    confirm: 'Bekreft',
    selectTime: 'Velg tid',
    selectDate: 'Velg dato',
    datePlaceholder: 'Velg dato',
    datetimePlaceholder: 'Velg dato og tid',
    monthPlaceholder: 'Velg måned',
    yearPlaceholder: 'Velg år',
    quarterPlaceholder: 'Velg kvartal',
    weekPlaceholder: 'Velg uke',
    startDatePlaceholder: 'Startdato',
    endDatePlaceholder: 'Sluttdato',
    startDatetimePlaceholder: 'Startdato og -tid',
    endDatetimePlaceholder: 'Sluttdato og -tid',
    startMonthPlaceholder: 'Startmåned',
    endMonthPlaceholder: 'Sluttmåned',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'I dag'
  },
  DataTable: {
    checkTableAll: 'Velg alt',
    uncheckTableAll: 'Velg ingenting',
    confirm: 'Bekreft',
    clear: 'Tøm'
  },
  LegacyTransfer: {
    sourceTitle: 'Kilde',
    targetTitle: 'Mål'
  },
  Transfer: {
    selectAll: 'Velg alle',
    unselectAll: 'Fjern alle',
    clearAll: 'Tøm',
    total: (num: number): string => `Totalt ${num} elementer`,
    selected: (num: number): string => `${num} elementer valgt`
  },
  Empty: {
    description: 'Ingen data'
  },
  Select: {
    placeholder: 'Vennligst velg'
  },
  TimePicker: {
    placeholder: 'Velg tid',
    positiveText: 'OK',
    negativeText: 'Avbryt',
    now: 'Nå',
    clear: 'Tøm'
  },
  Pagination: {
    goto: 'Gå til',
    selectionSuffix: 'side'
  },
  DynamicTags: {
    add: 'Legg til'
  },
  Log: {
    loading: 'Laster'
  },
  Input: {
    placeholder: 'Vennligst fyll ut'
  },
  InputNumber: {
    placeholder: 'Vennligst fyll ut'
  },
  DynamicInput: {
    create: 'Opprett'
  },
  ThemeEditor: {
    title: 'Temaredigerer',
    clearAllVars: 'Nullstill alle variabler',
    clearSearch: 'Tøm søk',
    filterCompName: 'Filtrer etter komponentnavn',
    filterVarName: 'Filtrer etter variabelnavn',
    import: 'Importer',
    export: 'Eksporter',
    restore: 'Nullstill til standardvalg'
  },
  Image: {
    tipPrevious: 'Forrige bilde (←)',
    tipNext: 'Neste bilde (→)',
    tipCounterclockwise: 'Mot klokken',
    tipClockwise: 'Med klokken',
    tipZoomOut: 'Zoom ut',
    tipZoomIn: 'Zoom inn',
    tipDownload: 'Last ned',
    tipClose: 'Lukk (Esc)',
    tipOriginalSize: 'Zoom til opprinnelig størrelse'
  },
  Heatmap: {
    less: 'mindre',
    more: 'mer',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default nbNO
