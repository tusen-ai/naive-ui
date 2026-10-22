import type { NLocale } from './enUS'

const ltLT: NLocale = {
  name: 'lt-LT',
  global: {
    undo: 'Atšaukti',
    redo: 'Grąžinti',
    confirm: 'Patvirtinti',
    clear: 'Išvalyti'
  },
  Popconfirm: {
    positiveText: 'Patvirtinti',
    negativeText: 'Atšaukti'
  },
  Cascader: {
    placeholder: 'Pasirinkite',
    loading: 'Įkeliama',
    loadingRequiredMessage: (label: string): string =>
      `Prieš pažymėdami įkelkite visus ${label} palikuonis.`
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
    clear: 'Išvalyti',
    now: 'Dabar',
    confirm: 'Patvirtinti',
    selectTime: 'Pasirinkite laiką',
    selectDate: 'Pasirinkite datą',
    datePlaceholder: 'Pasirinkite datą',
    datetimePlaceholder: 'Pasirinkite datą ir laiką',
    monthPlaceholder: 'Pasirinkite mėnesį',
    yearPlaceholder: 'Pasirinkite metus',
    quarterPlaceholder: 'Pasirinkite ketvirtį',
    weekPlaceholder: 'Pasirinkite savaitę',
    startDatePlaceholder: 'Pradžios data',
    endDatePlaceholder: 'Pabaigos data',
    startDatetimePlaceholder: 'Pradžios data ir laikas',
    endDatetimePlaceholder: 'Pabaigos data ir laikas',
    startMonthPlaceholder: 'Pradžios mėnuo',
    endMonthPlaceholder: 'Pabaigos mėnuo',
    monthBeforeYear: false,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Šiandien'
  },
  DataTable: {
    checkTableAll: 'Pasirinkti viską lentelėje',
    uncheckTableAll: 'Panaikinti lentelės žymėjimą',
    confirm: 'Patvirtinti',
    clear: 'Išvalyti'
  },
  LegacyTransfer: {
    sourceTitle: 'Šaltinis',
    targetTitle: 'Tikslas'
  },
  Transfer: {
    selectAll: 'Pasirinkti viską',
    unselectAll: 'Panaikinti visą žymėjimą',
    clearAll: 'Išvalyti',
    total: (num: number): string => `Iš viso ${num} elementų`,
    selected: (num: number): string => `Pasirinkta ${num} elementų`
  },
  Empty: {
    description: 'Nėra duomenų'
  },
  Select: {
    placeholder: 'Pasirinkite'
  },
  TimePicker: {
    placeholder: 'Pasirinkite laiką',
    positiveText: 'Gerai',
    negativeText: 'Atšaukti',
    now: 'Dabar',
    clear: 'Išvalyti'
  },
  Pagination: {
    goto: 'Eiti į',
    selectionSuffix: 'puslapis'
  },
  DynamicTags: {
    add: 'Pridėti'
  },
  Log: {
    loading: 'Įkeliama'
  },
  Input: {
    placeholder: 'Įveskite'
  },
  InputNumber: {
    placeholder: 'Įveskite'
  },
  DynamicInput: {
    create: 'Sukurti'
  },
  ThemeEditor: {
    title: 'Temos rengyklė',
    clearAllVars: 'Išvalyti visus kintamuosius',
    clearSearch: 'Išvalyti paiešką',
    filterCompName: 'Filtruoti komponento pavadinimą',
    filterVarName: 'Filtruoti kintamojo pavadinimą',
    import: 'Importuoti',
    export: 'Eksportuoti',
    restore: 'Atkurti numatytąsias'
  },
  Image: {
    tipPrevious: 'Ankstesnis paveikslėlis (←)',
    tipNext: 'Kitas paveikslėlis (→)',
    tipCounterclockwise: 'Prieš laikrodžio rodyklę',
    tipClockwise: 'Pagal laikrodžio rodyklę',
    tipZoomOut: 'Sumažinti',
    tipZoomIn: 'Padidinti',
    tipDownload: 'Atsisiųsti',
    tipClose: 'Uždaryti (Esc)',
    tipOriginalSize: 'Mastelis į pradinį dydį'
  },
  Heatmap: {
    less: 'mažiau',
    more: 'daugiau',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default ltLT
