const eo = {
  name: 'eo',
  global: {
    undo: 'Malfari',
    redo: 'Refari',
    confirm: 'Konfirmi'
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
  Transfer: {
    sourceTitle: 'Fonto',
    targetTitle: 'Celo'
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
    tipClose: 'Fermi (Esc)'
  }
}

export default eo
