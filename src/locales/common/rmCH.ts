import type { NLocale } from './enUS'

const rmCH: NLocale = {
  name: 'rm-CH',
  global: {
    undo: 'Distornar',
    redo: 'Repeter',
    confirm: 'Confermar',
    clear: 'Stizzar'
  },
  Popconfirm: {
    positiveText: 'Confermar',
    negativeText: 'Interrumper'
  },
  Cascader: {
    placeholder: 'Tscherni per plaschair',
    loading: 'Chargiar',
    loadingRequiredMessage: (label: string): string =>
      `Chargiai tut ils descendents da ${label} avant da tscherner.`
  },
  Time: {
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Stizzar',
    now: 'Ussa',
    confirm: 'Confermar',
    selectTime: 'Tscherni l\'ura',
    selectDate: 'Tscherni la data',
    datePlaceholder: 'Tscherni la data',
    datetimePlaceholder: 'Tscherni la data e l\'ura',
    monthPlaceholder: 'Tscherni il mais',
    yearPlaceholder: 'Tscherni l\'onn',
    quarterPlaceholder: 'Tscherni il quartal',
    weekPlaceholder: 'Tscherni l\'emna',
    startDatePlaceholder: 'Data da cumenzament',
    endDatePlaceholder: 'Data da finiziun',
    startDatetimePlaceholder: 'Data ed ura da cumenzament',
    endDatetimePlaceholder: 'Data ed ura da finiziun',
    startMonthPlaceholder: 'Mais da cumenzament',
    endMonthPlaceholder: 'Mais da finiziun',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Oz'
  },
  DataTable: {
    checkTableAll: 'Tscherni tut en la tabella',
    uncheckTableAll: 'Destscherni tut en la tabella',
    confirm: 'Confermar',
    clear: 'Stizzar'
  },
  LegacyTransfer: {
    sourceTitle: 'Funtauna',
    targetTitle: 'Destinaziun'
  },
  Transfer: {
    selectAll: 'Tscherni tut',
    unselectAll: 'Destscherni tut',
    clearAll: 'Stizzar',
    total: (num: number): string => `Total ${num} elements`,
    selected: (num: number): string => `${num} elements tschernids`
  },
  Empty: {
    description: 'Naginas datas'
  },
  Select: {
    placeholder: 'Tscherni per plaschair'
  },
  TimePicker: {
    placeholder: 'Tscherni l\'ura',
    positiveText: 'OK',
    negativeText: 'Interrumper',
    now: 'Ussa',
    clear: 'Stizzar'
  },
  Pagination: {
    goto: 'Ir a',
    selectionSuffix: 'pagina'
  },
  DynamicTags: {
    add: 'Agiuntar'
  },
  Log: {
    loading: 'Chargiar'
  },
  Input: {
    placeholder: 'Endatai per plaschair'
  },
  InputNumber: {
    placeholder: 'Endatai per plaschair'
  },
  DynamicInput: {
    create: 'Crear'
  },
  ThemeEditor: {
    title: 'Editur da tema',
    clearAllVars: 'Stizzar tut las variablas',
    clearSearch: 'Stizzar la tschertga',
    filterCompName: 'Filtrar il num dal component',
    filterVarName: 'Filtrar il num da la variabla',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Restaurar il standard'
  },
  Image: {
    tipPrevious: 'Maletg precedent (←)',
    tipNext: 'Maletg proxim (→)',
    tipCounterclockwise: 'En contra dal sens da l\'ura',
    tipClockwise: 'En il sens da l\'ura',
    tipZoomOut: 'Empitschnir',
    tipZoomIn: 'Engrondir',
    tipDownload: 'Telechargiar',
    tipClose: 'Serrar (Esc)',
    tipOriginalSize: 'Zoom a la grondezza originala'
  },
  Heatmap: {
    less: 'damain',
    more: 'dapli',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default rmCH
