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
    weekFormat: 'yyyy-w',
    clear: 'Очистить',
    now: 'Сейчас',
    confirm: 'Подтвердить',
    selectTime: 'Выбрать время',
    selectDate: 'Выбрать дату',
    datePlaceholder: 'Выбрать дату',
    datetimePlaceholder: 'Выбрать дату и время',
    monthPlaceholder: 'Выберите месяц',
    yearPlaceholder: 'Выберите год',
    quarterPlaceholder: 'Выберите квартал',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Дата начала',
    endDatePlaceholder: 'Дата окончания',
    startDatetimePlaceholder: 'Дата и время начала',
    endDatetimePlaceholder: 'Дата и время окончания',
    startMonthPlaceholder: 'Начало месяца',
    endMonthPlaceholder: 'Конец месяца',
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
  Transfer: {
    selectAll: 'Выбрать все',
    unselectAll: 'Снять все',
    clearAll: 'Очистить',
    total: (num: number): string => `Всего ${num} элементов`,
    selected: (num: number): string => `${num} выбрано элементов`
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
    now: 'Сейчас',
    clear: 'Очистить'
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
  Image: {
    tipPrevious: 'Предыдущее изображение (←)',
    tipNext: 'Следующее изображение (→)',
    tipCounterclockwise: 'Против часовой стрелки',
    tipClockwise: 'По часовой стрелке',
    tipZoomOut: 'Отдалить',
    tipZoomIn: 'Приблизить',
    tipDownload: 'Скачать',
    tipClose: 'Закрыть (Esc)',
    tipOriginalSize: 'Вернуть исходный размер'
  }
}

export default ruRu
