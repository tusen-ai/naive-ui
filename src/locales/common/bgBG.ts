import type { NLocale } from './enUS'

const bgBG: NLocale = {
  name: 'bg-BG',
  global: {
    undo: 'Отмени',
    redo: 'Повтори',
    confirm: 'Потвърди',
    clear: 'Изчисти'
  },
  Popconfirm: {
    positiveText: 'Потвърди',
    negativeText: 'Отказ'
  },
  Cascader: {
    placeholder: 'Моля, изберете',
    loading: 'Зареждане',
    loadingRequiredMessage: (label: string): string =>
      `Моля, заредете всички наследници на ${label} преди да го изберете.`
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
    clear: 'Изчисти',
    now: 'Сега',
    confirm: 'Потвърди',
    selectTime: 'Изберете час',
    selectDate: 'Изберете дата',
    datePlaceholder: 'Изберете дата',
    datetimePlaceholder: 'Изберете дата и час',
    monthPlaceholder: 'Изберете месец',
    yearPlaceholder: 'Изберете година',
    quarterPlaceholder: 'Изберете тримесечие',
    weekPlaceholder: 'Изберете седмица',
    startDatePlaceholder: 'Начална дата',
    endDatePlaceholder: 'Крайна дата',
    startDatetimePlaceholder: 'Начална дата и час',
    endDatetimePlaceholder: 'Крайна дата и час',
    startMonthPlaceholder: 'Начален месец',
    endMonthPlaceholder: 'Краен месец',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Днес'
  },
  DataTable: {
    checkTableAll: 'Избери всички в таблицата',
    uncheckTableAll: 'Отмени избора в таблицата',
    confirm: 'Потвърди',
    clear: 'Изчисти'
  },
  LegacyTransfer: {
    sourceTitle: 'Източник',
    targetTitle: 'Цел'
  },
  Transfer: {
    selectAll: 'Избери всички',
    unselectAll: 'Отмени всички',
    clearAll: 'Изчисти',
    total: (num: number): string => `Общо ${num} елемента`,
    selected: (num: number): string => `Избрани ${num} елемента`
  },
  Empty: {
    description: 'Няма данни'
  },
  Select: {
    placeholder: 'Моля, изберете'
  },
  TimePicker: {
    placeholder: 'Изберете час',
    positiveText: 'ОК',
    negativeText: 'Отказ',
    now: 'Сега',
    clear: 'Изчисти'
  },
  Pagination: {
    goto: 'Към',
    selectionSuffix: 'страница'
  },
  DynamicTags: {
    add: 'Добави'
  },
  Log: {
    loading: 'Зареждане'
  },
  Input: {
    placeholder: 'Моля, въведете'
  },
  InputNumber: {
    placeholder: 'Моля, въведете'
  },
  DynamicInput: {
    create: 'Създай'
  },
  ThemeEditor: {
    title: 'Редактор на тема',
    clearAllVars: 'Изчисти всички променливи',
    clearSearch: 'Изчисти търсенето',
    filterCompName: 'Филтър по име на компонент',
    filterVarName: 'Филтър по име на променлива',
    import: 'Импортиране',
    export: 'Експортиране',
    restore: 'Възстанови по подразбиране'
  },
  Image: {
    tipPrevious: 'Предишно изображение (←)',
    tipNext: 'Следващо изображение (→)',
    tipCounterclockwise: 'Обратно на часовниковата стрелка',
    tipClockwise: 'По часовниковата стрелка',
    tipZoomOut: 'Намали',
    tipZoomIn: 'Увеличи',
    tipDownload: 'Изтегли',
    tipClose: 'Затвори (Esc)',
    tipOriginalSize: 'Мащаб към оригинален размер'
  },
  Heatmap: {
    less: 'по-малко',
    more: 'повече',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default bgBG
