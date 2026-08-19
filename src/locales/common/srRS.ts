import type { NLocale } from './enUS'

const srRS: NLocale = {
  name: 'sr-RS',
  global: {
    undo: 'Опозови',
    redo: 'Понови',
    confirm: 'Потврди',
    clear: 'Очисти'
  },
  Popconfirm: {
    positiveText: 'Потврди',
    negativeText: 'Откажи'
  },
  Cascader: {
    placeholder: 'Изаберите',
    loading: 'Учитавање',
    loadingRequiredMessage: (label: string): string =>
      `Учитајте све потомке ставке ${label} пре избора.`
  },
  Time: {
    dateFormat: 'dd.MM.yyyy.',
    dateTimeFormat: 'dd.MM.yyyy. HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM.yyyy.',
    dateFormat: 'dd.MM.yyyy.',
    dateTimeFormat: 'dd.MM.yyyy. HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Очисти',
    now: 'Сада',
    confirm: 'Потврди',
    selectTime: 'Изаберите време',
    selectDate: 'Изаберите датум',
    datePlaceholder: 'Изаберите датум',
    datetimePlaceholder: 'Изаберите датум и време',
    monthPlaceholder: 'Изаберите месец',
    yearPlaceholder: 'Изаберите годину',
    quarterPlaceholder: 'Изаберите квартал',
    weekPlaceholder: 'Изаберите седмицу',
    startDatePlaceholder: 'Датум почетка',
    endDatePlaceholder: 'Датум завршетка',
    startDatetimePlaceholder: 'Датум и време почетка',
    endDatetimePlaceholder: 'Датум и време завршетка',
    startMonthPlaceholder: 'Месец почетка',
    endMonthPlaceholder: 'Месец завршетка',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Данас'
  },
  DataTable: {
    checkTableAll: 'Изабери све у табели',
    uncheckTableAll: 'Поништи избор у табели',
    confirm: 'Потврди',
    clear: 'Очисти'
  },
  LegacyTransfer: {
    sourceTitle: 'Извор',
    targetTitle: 'Одредиште'
  },
  Transfer: {
    selectAll: 'Изабери све',
    unselectAll: 'Поништи избор',
    clearAll: 'Очисти',
    total: (num: number): string => `Укупно ${num} ставки`,
    selected: (num: number): string => `Изабрано ${num} ставки`
  },
  Empty: {
    description: 'Нема података'
  },
  Select: {
    placeholder: 'Изаберите'
  },
  TimePicker: {
    placeholder: 'Изаберите време',
    positiveText: 'У реду',
    negativeText: 'Откажи',
    now: 'Сада',
    clear: 'Очисти'
  },
  Pagination: {
    goto: 'Иди на',
    selectionSuffix: 'страница'
  },
  DynamicTags: {
    add: 'Додај'
  },
  Log: {
    loading: 'Учитавање'
  },
  Input: {
    placeholder: 'Унесите'
  },
  InputNumber: {
    placeholder: 'Унесите'
  },
  DynamicInput: {
    create: 'Направи'
  },
  ThemeEditor: {
    title: 'Уређивач теме',
    clearAllVars: 'Очисти све променљиве',
    clearSearch: 'Очисти претрагу',
    filterCompName: 'Филтрирај назив компоненте',
    filterVarName: 'Филтрирај назив променљиве',
    import: 'Увези',
    export: 'Извези',
    restore: 'Врати на подразумевано'
  },
  Image: {
    tipPrevious: 'Претходна слика (←)',
    tipNext: 'Следећа слика (→)',
    tipCounterclockwise: 'Супротно од казаљке на сату',
    tipClockwise: 'У смеру казаљке на сату',
    tipZoomOut: 'Умањи',
    tipZoomIn: 'Увећај',
    tipDownload: 'Преузми',
    tipClose: 'Затвори (Esc)',
    tipOriginalSize: 'Зумирај на оригиналну величину'
  },
  Heatmap: {
    less: 'мање',
    more: 'више',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default srRS
