import type { NLocale } from './enUS'

const kkKZ: NLocale = {
  name: 'kk-KZ',
  global: {
    undo: 'Болдырмау',
    redo: 'Қайталау',
    confirm: 'Растау',
    clear: 'Тазалау'
  },
  Popconfirm: {
    positiveText: 'Растау',
    negativeText: 'Бас тарту'
  },
  Cascader: {
    placeholder: 'Таңдаңыз',
    loading: 'Жүктелуде',
    loadingRequiredMessage: (label: string): string =>
      `${label} барлық еншілерін белгілеуден бұрын жүктеңіз.`
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
    clear: 'Тазалау',
    now: 'Қазір',
    confirm: 'Растау',
    selectTime: 'Уақытты таңдау',
    selectDate: 'Күнді таңдау',
    datePlaceholder: 'Күнді таңдау',
    datetimePlaceholder: 'Күн мен уақытты таңдау',
    monthPlaceholder: 'Айды таңдау',
    yearPlaceholder: 'Жылды таңдау',
    quarterPlaceholder: 'Тоқсанды таңдау',
    weekPlaceholder: 'Аптаны таңдау',
    startDatePlaceholder: 'Басталу күні',
    endDatePlaceholder: 'Аяқталу күні',
    startDatetimePlaceholder: 'Басталу күні мен уақыты',
    endDatetimePlaceholder: 'Аяқталу күні мен уақыты',
    startMonthPlaceholder: 'Басталу айы',
    endMonthPlaceholder: 'Аяқталу айы',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Бүгін'
  },
  DataTable: {
    checkTableAll: 'Кестедегі барлығын таңдау',
    uncheckTableAll: 'Кестедегі таңдауды алу',
    confirm: 'Растау',
    clear: 'Тазалау'
  },
  LegacyTransfer: {
    sourceTitle: 'Көз',
    targetTitle: 'Мақсат'
  },
  Transfer: {
    selectAll: 'Барлығын таңдау',
    unselectAll: 'Таңдауды алу',
    clearAll: 'Тазалау',
    total: (num: number): string => `Барлығы ${num} элемент`,
    selected: (num: number): string => `${num} элемент таңдалды`
  },
  Empty: {
    description: 'Дерек жоқ'
  },
  Select: {
    placeholder: 'Таңдаңыз'
  },
  TimePicker: {
    placeholder: 'Уақытты таңдау',
    positiveText: 'OK',
    negativeText: 'Бас тарту',
    now: 'Қазір',
    clear: 'Тазалау'
  },
  Pagination: {
    goto: 'Өту',
    selectionSuffix: 'бет'
  },
  DynamicTags: {
    add: 'Қосу'
  },
  Log: {
    loading: 'Жүктелуде'
  },
  Input: {
    placeholder: 'Енгізіңіз'
  },
  InputNumber: {
    placeholder: 'Енгізіңіз'
  },
  DynamicInput: {
    create: 'Жасау'
  },
  ThemeEditor: {
    title: 'Тақырып редакторы',
    clearAllVars: 'Барлық айнымалыларды тазалау',
    clearSearch: 'Іздеуді тазалау',
    filterCompName: 'Компонент атауын сүзу',
    filterVarName: 'Айнымалы атауын сүзу',
    import: 'Импорттау',
    export: 'Экспорттау',
    restore: 'Әдепкіге қайтару'
  },
  Image: {
    tipPrevious: 'Алдыңғы сурет (←)',
    tipNext: 'Келесі сурет (→)',
    tipCounterclockwise: 'Сағат тіліне қарсы',
    tipClockwise: 'Сағат тілімен',
    tipZoomOut: 'Кішірейту',
    tipZoomIn: 'Үлкейту',
    tipDownload: 'Жүктеп алу',
    tipClose: 'Жабу (Esc)',
    tipOriginalSize: 'Бастапқы өлшемге масштабтау'
  },
  Heatmap: {
    less: 'аз',
    more: 'көп',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default kkKZ
