import type { NLocale } from './enUS'

const eo: NLocale = {
  name: 'eo',
  global: {
    undo: 'Malfari',
    redo: 'Refari',
    confirm: 'Konfirmi',
    clear: 'Malplenigi'
  },
  Popconfirm: {
    positiveText: 'Konfirmi',
    negativeText: 'Nuligi'
  },
  Cascader: {
    placeholder: 'Bonvolu elekti',
    loading: 'Ŝargiĝo',
    loadingRequiredMessage: (label: string): string =>
      `Bonvolu ŝargi ĉiujn idojn de ${label} antaŭ ol elekti ĝin.`
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
    clear: 'Malplenigi',
    now: 'Nun',
    confirm: 'Konfirmi',
    selectTime: 'Elekti tempon',
    selectDate: 'Elekti daton',
    datePlaceholder: 'Elekti daton',
    datetimePlaceholder: 'Elekti daton kaj tempon',
    monthPlaceholder: 'Elekti monaton',
    yearPlaceholder: 'Elekti jaron',
    quarterPlaceholder: 'Elekti jarkvaronon',
    startDatePlaceholder: 'Komenca dato',
    endDatePlaceholder: 'Fina dato',
    startDatetimePlaceholder: 'Komencaj dato kaj tempo',
    endDatetimePlaceholder: 'Finaj dato kaj tempo',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hodiaŭ'
  },
  DataTable: {
    checkTableAll: 'Elekti ĉiujn en la tabelo',
    uncheckTableAll: 'Malelekti ĉiujn en la tabelo',
    confirm: 'Konfirmi',
    clear: 'Malplenigi'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target'
  },
  // TODO: translation
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (num: number): string => `Total ${num} items`,
    selected: (num: number): string => `${num} items selected`
  },
  Empty: {
    description: 'Neniu datumo'
  },
  Select: {
    placeholder: 'Bonvolu elekti'
  },
  TimePicker: {
    placeholder: 'Elekti tempon',
    positiveText: 'Bone',
    negativeText: 'Nuligi',
    now: 'Nun'
  },
  Pagination: {
    goto: 'Iri al',
    selectionSuffix: 'paĝo'
  },
  DynamicTags: {
    add: 'Aldoni'
  },
  Log: {
    loading: 'Ŝargado'
  },
  Input: {
    placeholder: 'Bonvolu entajpi'
  },
  InputNumber: {
    placeholder: 'Bonvolu entajpi'
  },
  DynamicInput: {
    create: 'Krei'
  },
  ThemeEditor: {
    title: 'Etosredaktilo',
    clearAllVars: 'Malplenigi ĉiujn variablojn',
    clearSearch: 'Malplenigi serĉon',
    filterCompName: 'Filtri nomojn de komponaĵoj',
    filterVarName: 'Filtri nomojn de variabloj',
    import: 'Importi',
    export: 'Eksporti',
    restore: 'Restarigi defaŭltajn valorojn'
  },
  Image: {
    tipPrevious: 'Antaŭa bildo (←)',
    tipNext: 'Sekva bildo (→)',
    tipCounterclockwise: 'Maldekstrume',
    tipClockwise: 'Dekstrume',
    tipZoomOut: 'Malzomi',
    tipZoomIn: 'Zomi',
    tipClose: 'Fermi (Esc)',
    tipOriginalSize: 'Zoom to original size'
  }
}

export default eo
