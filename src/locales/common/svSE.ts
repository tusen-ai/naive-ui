import type { NLocale } from './enUS'

const svSE: NLocale = {
  name: 'sv-SE',
  global: {
    undo: 'Ångra',
    redo: 'Gör om',
    confirm: 'Bekräfta',
    clear: 'Rensa'
  },
  Popconfirm: {
    positiveText: 'Bekräfta',
    negativeText: 'Avbryt'
  },
  Cascader: {
    placeholder: 'Vänligen välj',
    loading: 'Laddar',
    loadingRequiredMessage: (label: string): string =>
      `Vänligen ladda alla underpunkter till ${label} innan du väljer punkten.`
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
    clear: 'Rensa',
    now: 'Nu',
    confirm: 'Bekräfta',
    selectTime: 'Välj tid',
    selectDate: 'Välj datum',
    datePlaceholder: 'Välj datum',
    datetimePlaceholder: 'Välj datum och tid',
    monthPlaceholder: 'Välj månad',
    yearPlaceholder: 'Välj år',
    quarterPlaceholder: 'Välj kvartal',
    startDatePlaceholder: 'Startdatum',
    endDatePlaceholder: 'Slutdatum',
    startDatetimePlaceholder: 'Startdatum och -tid',
    endDatetimePlaceholder: 'Slutdatum och -tid',
    startMonthPlaceholder: 'Startmånad',
    endMonthPlaceholder: 'Slutmånad',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'I dag'
  },
  DataTable: {
    checkTableAll: 'Välj allt',
    uncheckTableAll: 'Välj inget',
    confirm: 'Bekräfta',
    clear: 'Rensa'
  },
  LegacyTransfer: {
    sourceTitle: 'Källa',
    targetTitle: 'Mål'
  },
  Transfer: {
    selectAll: 'Välj allt',
    unselectAll: 'Välj inget',
    clearAll: 'Rensa',
    total: (num: number): string => `Totalt ${num} rader`,
    selected: (num: number): string => `${num} rader valda`
  },
  Empty: {
    description: 'Ingen data'
  },
  Select: {
    placeholder: 'Vänligen välj'
  },
  TimePicker: {
    placeholder: 'Välj tid',
    positiveText: 'OK',
    negativeText: 'Avbryt',
    now: 'Nu'
  },
  Pagination: {
    goto: 'Gå till',
    selectionSuffix: 'sida'
  },
  DynamicTags: {
    add: 'Lägg till'
  },
  Log: {
    loading: 'Laddar'
  },
  Input: {
    placeholder: 'Vänligen fyll i'
  },
  InputNumber: {
    placeholder: 'Vänligen fyll i'
  },
  DynamicInput: {
    create: 'Skapa'
  },
  ThemeEditor: {
    title: 'Temaverktyg',
    clearAllVars: 'Nollställ alla variabler',
    clearSearch: 'Rensa sökning',
    filterCompName: 'Filtrera efter komponentnamn',
    filterVarName: 'Filtrera efter variabelnamn',
    import: 'Importera',
    export: 'Exportera',
    restore: 'Nollställ till ursprungsval'
  },
  Image: {
    tipPrevious: 'Förgående bild (←)',
    tipNext: 'Nästa bild (→)',
    tipCounterclockwise: 'Moturs',
    tipClockwise: 'Medurs',
    tipZoomOut: 'Zooma in',
    tipZoomIn: 'Zooma ut',
    tipDownload: 'Ladda ned',
    tipClose: 'Stäng (Esc)',
    tipOriginalSize: 'Zooma till ursprunglig storlek'
  }
}

export default svSE
