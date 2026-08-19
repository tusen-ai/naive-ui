import type { NLocale } from './enUS'

const euES: NLocale = {
  name: 'eu-ES',
  global: {
    undo: 'Desegin',
    redo: 'Berregin',
    confirm: 'Berretsi',
    clear: 'Garbitu'
  },
  Popconfirm: {
    positiveText: 'Berretsi',
    negativeText: 'Utzi'
  },
  Cascader: {
    placeholder: 'Hautatu',
    loading: 'Kargatzen',
    loadingRequiredMessage: (label: string): string =>
      `Kargatu ${label}(r)en ondorengo guztiak hautatu aurretik.`
  },
  Time: {
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy/MM',
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Garbitu',
    now: 'Orain',
    confirm: 'Berretsi',
    selectTime: 'Hautatu ordua',
    selectDate: 'Hautatu data',
    datePlaceholder: 'Hautatu data',
    datetimePlaceholder: 'Hautatu data eta ordua',
    monthPlaceholder: 'Hautatu hilabetea',
    yearPlaceholder: 'Hautatu urtea',
    quarterPlaceholder: 'Hautatu hiruhilekoa',
    weekPlaceholder: 'Hautatu astea',
    startDatePlaceholder: 'Hasiera-data',
    endDatePlaceholder: 'Amaiera-data',
    startDatetimePlaceholder: 'Hasiera-data eta ordua',
    endDatetimePlaceholder: 'Amaiera-data eta ordua',
    startMonthPlaceholder: 'Hasiera-hilabetea',
    endMonthPlaceholder: 'Amaiera-hilabetea',
    monthBeforeYear: false,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Gaur'
  },
  DataTable: {
    checkTableAll: 'Hautatu taulako dena',
    uncheckTableAll: 'Desautatu taulako dena',
    confirm: 'Berretsi',
    clear: 'Garbitu'
  },
  LegacyTransfer: {
    sourceTitle: 'Iturburua',
    targetTitle: 'Helburua'
  },
  Transfer: {
    selectAll: 'Hautatu dena',
    unselectAll: 'Desautatu dena',
    clearAll: 'Garbitu',
    total: (num: number): string => `Guztira ${num} elementu`,
    selected: (num: number): string => `${num} elementu hautatuta`
  },
  Empty: {
    description: 'Ez dago daturik'
  },
  Select: {
    placeholder: 'Hautatu'
  },
  TimePicker: {
    placeholder: 'Hautatu ordua',
    positiveText: 'Ados',
    negativeText: 'Utzi',
    now: 'Orain',
    clear: 'Garbitu'
  },
  Pagination: {
    goto: 'Joan hona',
    selectionSuffix: 'orrialde'
  },
  DynamicTags: {
    add: 'Gehitu'
  },
  Log: {
    loading: 'Kargatzen'
  },
  Input: {
    placeholder: 'Idatzi'
  },
  InputNumber: {
    placeholder: 'Idatzi'
  },
  DynamicInput: {
    create: 'Sortu'
  },
  ThemeEditor: {
    title: 'Gai-editorea',
    clearAllVars: 'Garbitu aldagai guztiak',
    clearSearch: 'Garbitu bilaketa',
    filterCompName: 'Iragazi osagaiaren izena',
    filterVarName: 'Iragazi aldagaiaren izena',
    import: 'Inportatu',
    export: 'Esportatu',
    restore: 'Berrezarri lehenetsiak'
  },
  Image: {
    tipPrevious: 'Aurreko irudia (←)',
    tipNext: 'Hurrengo irudia (→)',
    tipCounterclockwise: 'Erlojuaren aurka',
    tipClockwise: 'Erlojuaren noranzkoan',
    tipZoomOut: 'Urrundu',
    tipZoomIn: 'Hurbildu',
    tipDownload: 'Deskargatu',
    tipClose: 'Itxi (Esc)',
    tipOriginalSize: 'Jatorrizko tamainara zooma'
  },
  Heatmap: {
    less: 'gutxiago',
    more: 'gehiago',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default euES
