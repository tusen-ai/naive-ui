import type { NLocale } from './enUS'

const kyKG: NLocale = {
  name: 'ky-KG',
  global: {
    undo: 'Жокко чыгаруу',
    redo: 'Кайталоо',
    confirm: 'Ырастоо',
    clear: 'Тазалоо'
  },
  Popconfirm: {
    positiveText: 'Ырастоо',
    negativeText: 'Жокко чыгаруу'
  },
  Cascader: {
    placeholder: 'Тандаңыз',
    loading: 'Жүктөлүүдө',
    loadingRequiredMessage: (label: string): string =>
      `${label} бардык тукумдарын тандоодон мурун жүктөңүз.`
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
    clear: 'Тазалоо',
    now: 'Азыр',
    confirm: 'Ырастоо',
    selectTime: 'Убакытты тандаңыз',
    selectDate: 'Күнү тандаңыз',
    datePlaceholder: 'Күнү тандаңыз',
    datetimePlaceholder: 'Күнү жана убакытты тандаңыз',
    monthPlaceholder: 'Айды тандаңыз',
    yearPlaceholder: 'Жылды тандаңыз',
    quarterPlaceholder: 'Чейректи тандаңыз',
    weekPlaceholder: 'Аптаны тандаңыз',
    startDatePlaceholder: 'Башталуу күнү',
    endDatePlaceholder: 'Аяктоо күнү',
    startDatetimePlaceholder: 'Башталуу күнү жана убакыты',
    endDatetimePlaceholder: 'Аяктоо күнү жана убакыты',
    startMonthPlaceholder: 'Башталуу айы',
    endMonthPlaceholder: 'Аяктоо айы',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Бүгүн'
  },
  DataTable: {
    checkTableAll: 'Таблицадагы баарын тандоо',
    uncheckTableAll: 'Таблицадагы тандоону алуу',
    confirm: 'Ырастоо',
    clear: 'Тазалоо'
  },
  LegacyTransfer: {
    sourceTitle: 'Булагы',
    targetTitle: 'Максат'
  },
  Transfer: {
    selectAll: 'Баарын тандоо',
    unselectAll: 'Тандоону алуу',
    clearAll: 'Тазалоо',
    total: (num: number): string => `Жалпы ${num} элемент`,
    selected: (num: number): string => `${num} элемент тандалды`
  },
  Empty: {
    description: 'Маалымат жок'
  },
  Select: {
    placeholder: 'Тандаңыз'
  },
  TimePicker: {
    placeholder: 'Убакытты тандаңыз',
    positiveText: 'OK',
    negativeText: 'Жокко чыгаруу',
    now: 'Азыр',
    clear: 'Тазалоо'
  },
  Pagination: {
    goto: 'Өтүү',
    selectionSuffix: 'бет'
  },
  DynamicTags: {
    add: 'Кошуу'
  },
  Log: {
    loading: 'Жүктөлүүдө'
  },
  Input: {
    placeholder: 'Киргизиңиз'
  },
  InputNumber: {
    placeholder: 'Киргизиңиз'
  },
  DynamicInput: {
    create: 'Түзүү'
  },
  ThemeEditor: {
    title: 'Тема редактору',
    clearAllVars: 'Бардык өзгөрмөлөрдү тазалоо',
    clearSearch: 'Издөөнү тазалоо',
    filterCompName: 'Компонент атын чыпкалоо',
    filterVarName: 'Өзгөрмө атын чыпкалоо',
    import: 'Импорттоо',
    export: 'Экспорттоо',
    restore: 'Баштапкы абалга кайтаруу'
  },
  Image: {
    tipPrevious: 'Мурунку сүрөт (←)',
    tipNext: 'Кийинки сүрөт (→)',
    tipCounterclockwise: 'Саат жебесине каршы',
    tipClockwise: 'Саат жебеси боюнча',
    tipZoomOut: 'Кичирейтүү',
    tipZoomIn: 'Чоңойтуу',
    tipDownload: 'Жүктөп алуу',
    tipClose: 'Жабуу (Esc)',
    tipOriginalSize: 'Баштапкы өлчөмгө чоңойтуу'
  },
  Heatmap: {
    less: 'аз',
    more: 'көп',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default kyKG
