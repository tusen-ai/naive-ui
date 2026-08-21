import type { NLocale } from './enUS'

const swKE: NLocale = {
  name: 'sw-KE',
  global: {
    undo: 'Tendua',
    redo: 'Rudia',
    confirm: 'Thibitisha',
    clear: 'Futa'
  },
  Popconfirm: {
    positiveText: 'Thibitisha',
    negativeText: 'Ghairi'
  },
  Cascader: {
    placeholder: 'Tafadhali chagua',
    loading: 'Inapakia',
    loadingRequiredMessage: (label: string): string =>
      `Tafadhali pakia vizazi vyote vya ${label} kabla ya kukichagua.`
  },
  Time: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Futa',
    now: 'Sasa',
    confirm: 'Thibitisha',
    selectTime: 'Chagua saa',
    selectDate: 'Chagua tarehe',
    datePlaceholder: 'Chagua tarehe',
    datetimePlaceholder: 'Chagua tarehe na saa',
    monthPlaceholder: 'Chagua mwezi',
    yearPlaceholder: 'Chagua mwaka',
    quarterPlaceholder: 'Chagua robo',
    weekPlaceholder: 'Chagua wiki',
    startDatePlaceholder: 'Tarehe ya kuanza',
    endDatePlaceholder: 'Tarehe ya kumaliza',
    startDatetimePlaceholder: 'Tarehe na saa ya kuanza',
    endDatetimePlaceholder: 'Tarehe na saa ya kumaliza',
    startMonthPlaceholder: 'Mwezi wa kuanza',
    endMonthPlaceholder: 'Mwezi wa kumaliza',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Leo'
  },
  DataTable: {
    checkTableAll: 'Chagua yote kwenye jedwali',
    uncheckTableAll: 'Ondoa uteuzi wote kwenye jedwali',
    confirm: 'Thibitisha',
    clear: 'Futa'
  },
  LegacyTransfer: {
    sourceTitle: 'Chanzo',
    targetTitle: 'Lengo'
  },
  Transfer: {
    selectAll: 'Chagua yote',
    unselectAll: 'Ondoa uteuzi wote',
    clearAll: 'Futa',
    total: (num: number): string => `Jumla ya vipengee ${num}`,
    selected: (num: number): string => `Vipengee ${num} vimechaguliwa`
  },
  Empty: {
    description: 'Hakuna data'
  },
  Select: {
    placeholder: 'Tafadhali chagua'
  },
  TimePicker: {
    placeholder: 'Chagua saa',
    positiveText: 'Sawa',
    negativeText: 'Ghairi',
    now: 'Sasa',
    clear: 'Futa'
  },
  Pagination: {
    goto: 'Nenda',
    selectionSuffix: 'ukurasa'
  },
  DynamicTags: {
    add: 'Ongeza'
  },
  Log: {
    loading: 'Inapakia'
  },
  Input: {
    placeholder: 'Tafadhali ingiza'
  },
  InputNumber: {
    placeholder: 'Tafadhali ingiza'
  },
  DynamicInput: {
    create: 'Unda'
  },
  ThemeEditor: {
    title: 'Kihariri cha mandhari',
    clearAllVars: 'Futa vigezo vyote',
    clearSearch: 'Futa utafutaji',
    filterCompName: 'Chuja jina la kijenzi',
    filterVarName: 'Chuja jina la kigezo',
    import: 'Leta',
    export: 'Hamisha',
    restore: 'Rejesha chaguo-msingi'
  },
  Image: {
    tipPrevious: 'Picha iliyotangulia (←)',
    tipNext: 'Picha inayofuata (→)',
    tipCounterclockwise: 'Kinyume cha saa',
    tipClockwise: 'Saa',
    tipZoomOut: 'Punguza',
    tipZoomIn: 'Kuza',
    tipDownload: 'Pakua',
    tipClose: 'Funga (Esc)',
    tipOriginalSize: 'Kuza kwa ukubwa asilia'
  },
  Heatmap: {
    less: 'chache',
    more: 'zaidi',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default swKE
