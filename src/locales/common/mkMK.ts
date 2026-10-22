import type { NLocale } from './enUS'

const mkMK: NLocale = {
  name: 'mk-MK',
  global: {
    undo: 'Врати',
    redo: 'Повтори',
    confirm: 'Потврди',
    clear: 'Исчисти'
  },
  Popconfirm: {
    positiveText: 'Потврди',
    negativeText: 'Откажи'
  },
  Cascader: {
    placeholder: 'Изберете',
    loading: 'Се вчитува',
    loadingRequiredMessage: (label: string): string =>
      `Вчитајте ги сите потомци на ${label} пред да го изберете.`
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
    clear: 'Исчисти',
    now: 'Сега',
    confirm: 'Потврди',
    selectTime: 'Изберете време',
    selectDate: 'Изберете датум',
    datePlaceholder: 'Изберете датум',
    datetimePlaceholder: 'Изберете датум и време',
    monthPlaceholder: 'Изберете месец',
    yearPlaceholder: 'Изберете година',
    quarterPlaceholder: 'Изберете квартал',
    weekPlaceholder: 'Изберете недела',
    startDatePlaceholder: 'Почетен датум',
    endDatePlaceholder: 'Краен датум',
    startDatetimePlaceholder: 'Почетен датум и време',
    endDatetimePlaceholder: 'Краен датум и време',
    startMonthPlaceholder: 'Почетен месец',
    endMonthPlaceholder: 'Краен месец',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Денес'
  },
  DataTable: {
    checkTableAll: 'Избери сè во табелата',
    uncheckTableAll: 'Отштиклирај сè во табелата',
    confirm: 'Потврди',
    clear: 'Исчисти'
  },
  LegacyTransfer: {
    sourceTitle: 'Извор',
    targetTitle: 'Одредиште'
  },
  Transfer: {
    selectAll: 'Избери сè',
    unselectAll: 'Отштиклирај сè',
    clearAll: 'Исчисти',
    total: (num: number): string => `Вкупно ${num} ставки`,
    selected: (num: number): string => `Избрани се ${num} ставки`
  },
  Empty: {
    description: 'Нема податоци'
  },
  Select: {
    placeholder: 'Изберете'
  },
  TimePicker: {
    placeholder: 'Изберете време',
    positiveText: 'ОК',
    negativeText: 'Откажи',
    now: 'Сега',
    clear: 'Исчисти'
  },
  Pagination: {
    goto: 'Оди на',
    selectionSuffix: 'страница'
  },
  DynamicTags: {
    add: 'Додај'
  },
  Log: {
    loading: 'Се вчитува'
  },
  Input: {
    placeholder: 'Внесете'
  },
  InputNumber: {
    placeholder: 'Внесете'
  },
  DynamicInput: {
    create: 'Создај'
  },
  ThemeEditor: {
    title: 'Уредувач на тема',
    clearAllVars: 'Исчисти ги сите променливи',
    clearSearch: 'Исчисти го пребарувањето',
    filterCompName: 'Филтрирај име на компонента',
    filterVarName: 'Филтрирај име на променлива',
    import: 'Увези',
    export: 'Извези',
    restore: 'Врати на стандардно'
  },
  Image: {
    tipPrevious: 'Претходна слика (←)',
    tipNext: 'Следна слика (→)',
    tipCounterclockwise: 'Спротивно од стрелките на часовникот',
    tipClockwise: 'Во насока на стрелките на часовникот',
    tipZoomOut: 'Намали',
    tipZoomIn: 'Зголеми',
    tipDownload: 'Преземи',
    tipClose: 'Затвори (Esc)',
    tipOriginalSize: 'Зум до оригинална големина'
  },
  Heatmap: {
    less: 'помалку',
    more: 'повеќе',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default mkMK
