import type { NLocale } from './enUS'

const tgTJ: NLocale = {
  name: 'tg-TJ',
  global: {
    undo: 'Бекор кардан',
    redo: 'Барқарор кардан',
    confirm: 'Тасдиқ кардан',
    clear: 'Пок кардан'
  },
  Popconfirm: {
    positiveText: 'Тасдиқ кардан',
    negativeText: 'Бекор кардан'
  },
  Cascader: {
    placeholder: 'Лутфан интихоб кунед',
    loading: 'Бор шуда истодааст',
    loadingRequiredMessage: (label: string): string =>
      `Лутфан пеш аз интихоб кардани ${label} ҳамаи унсурҳои фаръии онро бор кунед.`
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
    clear: 'Пок кардан',
    now: 'Ҳозир',
    confirm: 'Тасдиқ кардан',
    selectTime: 'Вақтро интихоб кунед',
    selectDate: 'Санаро интихоб кунед',
    datePlaceholder: 'Санаро интихоб кунед',
    datetimePlaceholder: 'Сана ва вақтро интихоб кунед',
    monthPlaceholder: 'Моҳро интихоб кунед',
    yearPlaceholder: 'Солро интихоб кунед',
    quarterPlaceholder: 'Чорякро интихоб кунед',
    weekPlaceholder: 'Ҳафтаро интихоб кунед',
    startDatePlaceholder: 'Санаи оғоз',
    endDatePlaceholder: 'Санаи анҷом',
    startDatetimePlaceholder: 'Сана ва вақти оғоз',
    endDatetimePlaceholder: 'Сана ва вақти анҷом',
    startMonthPlaceholder: 'Моҳи оғоз',
    endMonthPlaceholder: 'Моҳи анҷом',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Имрӯз'
  },
  DataTable: {
    checkTableAll: 'Ҳамаро дар ҷадвал интихоб кардан',
    uncheckTableAll: 'Бекор кардани интихоби ҳама дар ҷадвал',
    confirm: 'Тасдиқ кардан',
    clear: 'Пок кардан'
  },
  LegacyTransfer: {
    sourceTitle: 'Манбаъ',
    targetTitle: 'Мақсад'
  },
  Transfer: {
    selectAll: 'Ҳамаро интихоб кардан',
    unselectAll: 'Бекор кардани интихоби ҳама',
    clearAll: 'Пок кардан',
    total: (num: number): string => `Ҳамагӣ ${num} унсур`,
    selected: (num: number): string => `${num} унсур интихоб шуд`
  },
  Empty: {
    description: 'Маълумот нест'
  },
  Select: {
    placeholder: 'Лутфан интихоб кунед'
  },
  TimePicker: {
    placeholder: 'Вақтро интихоб кунед',
    positiveText: 'ХУБ',
    negativeText: 'Бекор кардан',
    now: 'Ҳозир',
    clear: 'Пок кардан'
  },
  Pagination: {
    goto: 'Гузаштан',
    selectionSuffix: 'саҳифа'
  },
  DynamicTags: {
    add: 'Илова кардан'
  },
  Log: {
    loading: 'Бор шуда истодааст'
  },
  Input: {
    placeholder: 'Лутфан ворид кунед'
  },
  InputNumber: {
    placeholder: 'Лутфан ворид кунед'
  },
  DynamicInput: {
    create: 'Сохтан'
  },
  ThemeEditor: {
    title: 'Муҳаррири мавзӯъ',
    clearAllVars: 'Пок кардани ҳамаи тағйирёбандаҳо',
    clearSearch: 'Пок кардани ҷустуҷӯ',
    filterCompName: 'Филтр аз рӯйи номи ҷузъ',
    filterVarName: 'Филтр аз рӯйи номи тағйирёбанда',
    import: 'Ворид кардан',
    export: 'Содир кардан',
    restore: 'Барқарор кардани пешфарзҳо'
  },
  Image: {
    tipPrevious: 'Тасвири қаблӣ (←)',
    tipNext: 'Тасвири баъдӣ (→)',
    tipCounterclockwise: 'Ба муқобили ақрабаки соат',
    tipClockwise: 'Ба самти ақрабаки соат',
    tipZoomOut: 'Хурд кардан',
    tipZoomIn: 'Калон кардан',
    tipDownload: 'Боргирӣ',
    tipClose: 'Пӯшидан (Esc)',
    tipOriginalSize: 'Андозаи аслӣ'
  },
  Heatmap: {
    less: 'камтар',
    more: 'бештар',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default tgTJ
