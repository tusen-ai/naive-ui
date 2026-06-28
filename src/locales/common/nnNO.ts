import type { NLocale } from './enUS'

const nnNO: NLocale = {
  name: 'nn-NO',
  global: {
    undo: 'Angre',
    redo: 'Utfør likevel',
    confirm: 'Stadfest',
    clear: 'Tøm'
  },
  Popconfirm: {
    positiveText: 'Stadfest',
    negativeText: 'Avbryt'
  },
  Cascader: {
    placeholder: 'Vel',
    loading: 'Lastar',
    loadingRequiredMessage: (label: string): string =>
      `Last alle underpunkt av ${label} før du vel oppføringa.`
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
    now: 'No',
    confirm: 'Stadfest',
    selectTime: 'Vel tid',
    selectDate: 'Vel dato',
    datePlaceholder: 'Vel dato',
    datetimePlaceholder: 'Vel dato og tid',
    monthPlaceholder: 'Vel månad',
    yearPlaceholder: 'Vel år',
    quarterPlaceholder: 'Vel kvartal',
    weekPlaceholder: 'Vel veke',
    startDatePlaceholder: 'Startdato',
    endDatePlaceholder: 'Sluttdato',
    startDatetimePlaceholder: 'Startdato og -tid',
    endDatetimePlaceholder: 'Sluttdato og -tid',
    startMonthPlaceholder: 'Startmånad',
    endMonthPlaceholder: 'Sluttmånad',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'I dag'
  },
  DataTable: {
    checkTableAll: 'Vel alt',
    uncheckTableAll: 'Vel ingenting',
    confirm: 'Stadfest',
    clear: 'Tøm'
  },
  LegacyTransfer: {
    sourceTitle: 'Kjelde',
    targetTitle: 'Mål'
  },
  Transfer: {
    selectAll: 'Vel alle',
    unselectAll: 'Fjern alle',
    clearAll: 'Tøm',
    total: (num: number): string => `Totalt ${num} element`,
    selected: (num: number): string => `${num} element valt`
  },
  Empty: {
    description: 'Ingen data'
  },
  Select: {
    placeholder: 'Vel'
  },
  TimePicker: {
    placeholder: 'Vel tid',
    positiveText: 'OK',
    negativeText: 'Avbryt',
    now: 'No',
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
    loading: 'Lastar'
  },
  Input: {
    placeholder: 'Fyll ut'
  },
  InputNumber: {
    placeholder: 'Fyll ut'
  },
  DynamicInput: {
    create: 'Opprett'
  },
  ThemeEditor: {
    title: 'Temaredigerar',
    clearAllVars: 'Nullstill alle variablar',
    clearSearch: 'Tøm søk',
    filterCompName: 'Filtrer etter komponentnamn',
    filterVarName: 'Filtrer etter variabelnamn',
    import: 'Importer',
    export: 'Eksporter',
    restore: 'Nullstill til standardval'
  },
  Image: {
    tipPrevious: 'Førre bilete (←)',
    tipNext: 'Neste bilete (→)',
    tipCounterclockwise: 'Mot klokka',
    tipClockwise: 'Med klokka',
    tipZoomOut: 'Zoom ut',
    tipZoomIn: 'Zoom inn',
    tipDownload: 'Last ned',
    tipClose: 'Lukk (Esc)',
    tipOriginalSize: 'Zoom til opphavleg storleik'
  },
  Heatmap: {
    less: 'mindre',
    more: 'meir',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default nnNO
