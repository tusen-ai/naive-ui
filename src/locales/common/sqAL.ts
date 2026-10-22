import type { NLocale } from './enUS'

const sqAL: NLocale = {
  name: 'sq-AL',
  global: {
    undo: 'Zhbëj',
    redo: 'Ribëj',
    confirm: 'Konfirmo',
    clear: 'Pastro'
  },
  Popconfirm: {
    positiveText: 'Konfirmo',
    negativeText: 'Anulo'
  },
  Cascader: {
    placeholder: 'Ju lutemi zgjidhni',
    loading: 'Duke u ngarkuar',
    loadingRequiredMessage: (label: string): string =>
      `Ngarkoni të gjithë pasardhësit e ${label} para se ta zgjidhni.`
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
    clear: 'Pastro',
    now: 'Tani',
    confirm: 'Konfirmo',
    selectTime: 'Zgjidhni orën',
    selectDate: 'Zgjidhni datën',
    datePlaceholder: 'Zgjidhni datën',
    datetimePlaceholder: 'Zgjidhni datën dhe orën',
    monthPlaceholder: 'Zgjidhni muajin',
    yearPlaceholder: 'Zgjidhni vitin',
    quarterPlaceholder: 'Zgjidhni tremujorin',
    weekPlaceholder: 'Zgjidhni javën',
    startDatePlaceholder: 'Data e fillimit',
    endDatePlaceholder: 'Data e mbarimit',
    startDatetimePlaceholder: 'Data dhe ora e fillimit',
    endDatetimePlaceholder: 'Data dhe ora e mbarimit',
    startMonthPlaceholder: 'Muaji i fillimit',
    endMonthPlaceholder: 'Muaji i mbarimit',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Sot'
  },
  DataTable: {
    checkTableAll: 'Zgjidh të gjitha në tabelë',
    uncheckTableAll: 'Hiq zgjedhjen në tabelë',
    confirm: 'Konfirmo',
    clear: 'Pastro'
  },
  LegacyTransfer: {
    sourceTitle: 'Burimi',
    targetTitle: 'Destinacioni'
  },
  Transfer: {
    selectAll: 'Zgjidh të gjitha',
    unselectAll: 'Hiq të gjitha',
    clearAll: 'Pastro',
    total: (num: number): string => `Gjithsej ${num} elemente`,
    selected: (num: number): string => `${num} elemente të zgjedhura`
  },
  Empty: {
    description: 'Nuk ka të dhëna'
  },
  Select: {
    placeholder: 'Ju lutemi zgjidhni'
  },
  TimePicker: {
    placeholder: 'Zgjidhni orën',
    positiveText: 'OK',
    negativeText: 'Anulo',
    now: 'Tani',
    clear: 'Pastro'
  },
  Pagination: {
    goto: 'Shko te',
    selectionSuffix: 'faqe'
  },
  DynamicTags: {
    add: 'Shto'
  },
  Log: {
    loading: 'Duke u ngarkuar'
  },
  Input: {
    placeholder: 'Ju lutemi shkruani'
  },
  InputNumber: {
    placeholder: 'Ju lutemi shkruani'
  },
  DynamicInput: {
    create: 'Krijo'
  },
  ThemeEditor: {
    title: 'Redaktuesi i temës',
    clearAllVars: 'Pastro të gjitha variablat',
    clearSearch: 'Pastro kërkimin',
    filterCompName: 'Filtro emrin e komponentit',
    filterVarName: 'Filtro emrin e variablit',
    import: 'Importo',
    export: 'Eksporto',
    restore: 'Rikthe në parazgjedhje'
  },
  Image: {
    tipPrevious: 'Imazhi i mëparshëm (←)',
    tipNext: 'Imazhi tjetër (→)',
    tipCounterclockwise: 'Kundër akrepave të orës',
    tipClockwise: 'Në drejtim të akrepave të orës',
    tipZoomOut: 'Zvogëlo',
    tipZoomIn: 'Zmadho',
    tipDownload: 'Shkarko',
    tipClose: 'Mbyll (Esc)',
    tipOriginalSize: 'Zmadho në madhësinë origjinale'
  },
  Heatmap: {
    less: 'më pak',
    more: 'më shumë',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default sqAL
