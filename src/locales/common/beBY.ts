import type { NLocale } from './enUS'

const beBY: NLocale = {
  name: 'be-BY',
  global: {
    undo: 'Адмяніць',
    redo: 'Паўтарыць',
    confirm: 'Пацвердзіць',
    clear: 'Ачысціць'
  },
  Popconfirm: {
    positiveText: 'Пацвердзіць',
    negativeText: 'Скасаваць'
  },
  Cascader: {
    placeholder: 'Калі ласка, выберыце',
    loading: 'Загрузка',
    loadingRequiredMessage: (label: string): string =>
      `Загрузіце ўсе нашчадкі ${label} перад выбарам.`
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
    clear: 'Ачысціць',
    now: 'Зараз',
    confirm: 'Пацвердзіць',
    selectTime: 'Выбраць час',
    selectDate: 'Выбраць дату',
    datePlaceholder: 'Выбраць дату',
    datetimePlaceholder: 'Выбраць дату і час',
    monthPlaceholder: 'Выбраць месяц',
    yearPlaceholder: 'Выбраць год',
    quarterPlaceholder: 'Выбраць квартал',
    weekPlaceholder: 'Выбраць тыдзень',
    startDatePlaceholder: 'Дата пачатку',
    endDatePlaceholder: 'Дата заканчэння',
    startDatetimePlaceholder: 'Дата і час пачатку',
    endDatetimePlaceholder: 'Дата і час заканчэння',
    startMonthPlaceholder: 'Месяц пачатку',
    endMonthPlaceholder: 'Месяц заканчэння',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Сёння'
  },
  DataTable: {
    checkTableAll: 'Выбраць усё ў табліцы',
    uncheckTableAll: 'Зняць выбар з усяго ў табліцы',
    confirm: 'Пацвердзіць',
    clear: 'Ачысціць'
  },
  LegacyTransfer: {
    sourceTitle: 'Крыніца',
    targetTitle: 'Прызначэнне'
  },
  Transfer: {
    selectAll: 'Выбраць усё',
    unselectAll: 'Зняць выбар',
    clearAll: 'Ачысціць',
    total: (num: number): string => `Усяго ${num} элементаў`,
    selected: (num: number): string => `Выбрана ${num} элементаў`
  },
  Empty: {
    description: 'Няма даных'
  },
  Select: {
    placeholder: 'Калі ласка, выберыце'
  },
  TimePicker: {
    placeholder: 'Выбраць час',
    positiveText: 'ОК',
    negativeText: 'Скасаваць',
    now: 'Зараз',
    clear: 'Ачысціць'
  },
  Pagination: {
    goto: 'Перайсці да',
    selectionSuffix: 'старонка'
  },
  DynamicTags: {
    add: 'Дадаць'
  },
  Log: {
    loading: 'Загрузка'
  },
  Input: {
    placeholder: 'Калі ласка, увядзіце'
  },
  InputNumber: {
    placeholder: 'Калі ласка, увядзіце'
  },
  DynamicInput: {
    create: 'Стварыць'
  },
  ThemeEditor: {
    title: 'Рэдактар тэмы',
    clearAllVars: 'Ачысціць усе зменныя',
    clearSearch: 'Ачысціць пошук',
    filterCompName: 'Фільтр назвы кампанента',
    filterVarName: 'Фільтр назвы зменнай',
    import: 'Імпартаваць',
    export: 'Экспартаваць',
    restore: 'Скінуць да прадвызначаных'
  },
  Image: {
    tipPrevious: 'Папярэдняя выява (←)',
    tipNext: 'Наступная выява (→)',
    tipCounterclockwise: 'Супраць гадзіннікавай стрэлкі',
    tipClockwise: 'Па гадзіннікавай стрэлцы',
    tipZoomOut: 'Паменшыць',
    tipZoomIn: 'Павялічыць',
    tipDownload: 'Спампаваць',
    tipClose: 'Закрыць (Esc)',
    tipOriginalSize: 'Маштаб да зыходнага памеру'
  },
  Heatmap: {
    less: 'менш',
    more: 'больш',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default beBY
