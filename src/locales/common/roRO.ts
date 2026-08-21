import type { NLocale } from './enUS'

const roRO: NLocale = {
  name: 'ro-RO',
  global: {
    undo: 'Anulează',
    redo: 'Refă',
    confirm: 'Confirmă',
    clear: 'Șterge'
  },
  Popconfirm: {
    positiveText: 'Confirmă',
    negativeText: 'Anulează'
  },
  Cascader: {
    placeholder: 'Selectați',
    loading: 'Se încarcă',
    loadingRequiredMessage: (label: string): string =>
      `Încărcați toți descendenții lui ${label} înainte de a-l selecta.`
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
    clear: 'Șterge',
    now: 'Acum',
    confirm: 'Confirmă',
    selectTime: 'Selectați ora',
    selectDate: 'Selectați data',
    datePlaceholder: 'Selectați data',
    datetimePlaceholder: 'Selectați data și ora',
    monthPlaceholder: 'Selectați luna',
    yearPlaceholder: 'Selectați anul',
    quarterPlaceholder: 'Selectați trimestrul',
    weekPlaceholder: 'Selectați săptămâna',
    startDatePlaceholder: 'Data de început',
    endDatePlaceholder: 'Data de sfârșit',
    startDatetimePlaceholder: 'Data și ora de început',
    endDatetimePlaceholder: 'Data și ora de sfârșit',
    startMonthPlaceholder: 'Luna de început',
    endMonthPlaceholder: 'Luna de sfârșit',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Astăzi'
  },
  DataTable: {
    checkTableAll: 'Selectează tot din tabel',
    uncheckTableAll: 'Deselectează tot din tabel',
    confirm: 'Confirmă',
    clear: 'Șterge'
  },
  LegacyTransfer: {
    sourceTitle: 'Sursă',
    targetTitle: 'Destinație'
  },
  Transfer: {
    selectAll: 'Selectează tot',
    unselectAll: 'Deselectează tot',
    clearAll: 'Șterge',
    total: (num: number): string => `Total ${num} elemente`,
    selected: (num: number): string => `${num} elemente selectate`
  },
  Empty: {
    description: 'Nu există date'
  },
  Select: {
    placeholder: 'Selectați'
  },
  TimePicker: {
    placeholder: 'Selectați ora',
    positiveText: 'OK',
    negativeText: 'Anulează',
    now: 'Acum',
    clear: 'Șterge'
  },
  Pagination: {
    goto: 'Mergi la',
    selectionSuffix: 'pagină'
  },
  DynamicTags: {
    add: 'Adaugă'
  },
  Log: {
    loading: 'Se încarcă'
  },
  Input: {
    placeholder: 'Introduceți'
  },
  InputNumber: {
    placeholder: 'Introduceți'
  },
  DynamicInput: {
    create: 'Creează'
  },
  ThemeEditor: {
    title: 'Editor de temă',
    clearAllVars: 'Șterge toate variabilele',
    clearSearch: 'Șterge căutarea',
    filterCompName: 'Filtrează numele componentei',
    filterVarName: 'Filtrează numele variabilei',
    import: 'Importă',
    export: 'Exportă',
    restore: 'Restabilește valorile implicite'
  },
  Image: {
    tipPrevious: 'Imaginea anterioară (←)',
    tipNext: 'Imaginea următoare (→)',
    tipCounterclockwise: 'Sens antiorar',
    tipClockwise: 'Sens orar',
    tipZoomOut: 'Micșorează',
    tipZoomIn: 'Mărește',
    tipDownload: 'Descarcă',
    tipClose: 'Închide (Esc)',
    tipOriginalSize: 'Zoom la dimensiunea originală'
  },
  Heatmap: {
    less: 'mai puțin',
    more: 'mai mult',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default roRO
