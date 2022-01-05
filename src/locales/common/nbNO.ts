import type { NLocale } from './enUS'

const nbNO: NLocale = {
  name: 'nb-NO',
  global: {
    undo: 'Angre',
    redo: 'Utfør likevel',
    confirm: 'Bekreft'
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
    clear: 'Tøm',
    now: 'Nå',
    confirm: 'Bekreft',
    selectTime: 'Velg tid',
    selectDate: 'Velg dato',
    datePlaceholder: 'Velg dato',
    datetimePlaceholder: 'Velg dato og tid',
    monthPlaceholder: 'Velg måned',
    // FIXME: translation needed
    yearPlaceholder: 'Select Year',
    quarterPlaceholder: 'Select Quarter',
    startDatePlaceholder: 'Startdato',
    endDatePlaceholder: 'Sluttdato',
    startDatetimePlaceholder: 'Startdato og -tid',
    endDatetimePlaceholder: 'Sluttdato og -tid',
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
  Transfer: {
    sourceTitle: 'Kilde',
    targetTitle: 'Mål'
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
    now: 'Nå'
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
  }
}

export default nbNO
