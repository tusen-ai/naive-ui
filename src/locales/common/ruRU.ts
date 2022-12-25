import type { NLocale } from './enUS'

const ruRu: NLocale = {
  name: 'ru-RU',
  global: {
    undo: 'Отменить',
    redo: 'Вернуть',
    confirm: 'Подтвердить',
    clear: 'Очистить'
  },
  Popconfirm: {
    positiveText: 'Подтвердить',
    negativeText: 'Отмена'
  },
  Cascader: {
    placeholder: 'Выбрать',
    loading: 'Загрузка',
    loadingRequiredMessage: (label: string): string =>
      `Загрузите все дочерние узлы ${label} прежде чем они станут необязательными`
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
    clear: 'Очистить',
    now: 'Сейчас',
    confirm: 'Подтвердить',
    selectTime: 'Выбрать время',
    selectDate: 'Выбрать дату',
    datePlaceholder: 'Выбрать дату',
    datetimePlaceholder: 'Выбрать дату и время',
    monthPlaceholder: 'Выберите месяц',
    // FIXME: translation needed
    yearPlaceholder: 'Select Year',
    quarterPlaceholder: 'Select Quarter',
    startDatePlaceholder: 'Дата начала',
    endDatePlaceholder: 'Дата окончания',
    startDatetimePlaceholder: 'Дата и время начала',
    endDatetimePlaceholder: 'Дата и время окончания',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Сегодня'
  },
  DataTable: {
    checkTableAll: 'Выбрать все в таблице',
    uncheckTableAll: 'Отменить все в таблице',
    confirm: 'Подтвердить',
    clear: 'Очистить'
  },
  LegacyTransfer: {
    sourceTitle: 'Источник',
    targetTitle: 'Назначение'
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
    description: 'Нет данных'
  },
  Select: {
    placeholder: 'Выбрать'
  },
  TimePicker: {
    placeholder: 'Выбрать время',
    positiveText: 'OK',
    negativeText: 'Отменить',
    now: 'Сейчас'
  },
  Pagination: {
    goto: 'Перейти',
    selectionSuffix: 'страница'
  },
  DynamicTags: {
    add: 'Добавить'
  },
  Log: {
    loading: 'Загрузка'
  },
  Input: {
    placeholder: 'Ввести'
  },
  InputNumber: {
    placeholder: 'Ввести'
  },
  DynamicInput: {
    create: 'Создать'
  },
  ThemeEditor: {
    title: 'Редактор темы',
    clearAllVars: 'Очистить все',
    clearSearch: 'Очистить поиск',
    filterCompName: 'Фильтровать по имени компонента',
    filterVarName: 'Фильтровать имена переменных',
    import: 'Импорт',
    export: 'Экспорт',
    restore: 'Сбросить'
  },
  // TODO: translation
  Image: {
    tipPrevious: 'Previous picture (←)',
    tipNext: 'Next picture (→)',
    tipCounterclockwise: 'Counterclockwise',
    tipClockwise: 'Clockwise',
    tipZoomOut: 'Zoom out',
    tipZoomIn: 'Zoom in',
    tipClose: 'Close (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default ruRu
