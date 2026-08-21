import type { NLocale } from './enUS'

const caES: NLocale = {
  name: 'ca-ES',
  global: {
    undo: 'Desfer',
    redo: 'Refer',
    confirm: 'Confirmar',
    clear: 'Esborrar'
  },
  Popconfirm: {
    positiveText: 'Confirmar',
    negativeText: 'Cancel·lar'
  },
  Cascader: {
    placeholder: 'Seleccioneu',
    loading: 'S\'està carregant',
    loadingRequiredMessage: (label: string): string =>
      `Carregueu tots els descendents de ${label} abans de seleccionar-lo.`
  },
  Time: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Esborrar',
    now: 'Ara',
    confirm: 'Confirmar',
    selectTime: 'Seleccionar hora',
    selectDate: 'Seleccionar data',
    datePlaceholder: 'Seleccionar data',
    datetimePlaceholder: 'Seleccionar data i hora',
    monthPlaceholder: 'Seleccionar mes',
    yearPlaceholder: 'Seleccionar any',
    quarterPlaceholder: 'Seleccionar trimestre',
    weekPlaceholder: 'Seleccionar setmana',
    startDatePlaceholder: 'Data d\'inici',
    endDatePlaceholder: 'Data de fi',
    startDatetimePlaceholder: 'Data i hora d\'inici',
    endDatetimePlaceholder: 'Data i hora de fi',
    startMonthPlaceholder: 'Mes d\'inici',
    endMonthPlaceholder: 'Mes de fi',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Avui'
  },
  DataTable: {
    checkTableAll: 'Seleccionar-ho tot a la taula',
    uncheckTableAll: 'Desseleccionar-ho tot a la taula',
    confirm: 'Confirmar',
    clear: 'Esborrar'
  },
  LegacyTransfer: {
    sourceTitle: 'Origen',
    targetTitle: 'Destinació'
  },
  Transfer: {
    selectAll: 'Seleccionar-ho tot',
    unselectAll: 'Desseleccionar-ho tot',
    clearAll: 'Esborrar',
    total: (num: number): string => `Total ${num} elements`,
    selected: (num: number): string => `${num} elements seleccionats`
  },
  Empty: {
    description: 'Sense dades'
  },
  Select: {
    placeholder: 'Seleccioneu'
  },
  TimePicker: {
    placeholder: 'Seleccionar hora',
    positiveText: 'D\'acord',
    negativeText: 'Cancel·lar',
    now: 'Ara',
    clear: 'Esborrar'
  },
  Pagination: {
    goto: 'Anar a',
    selectionSuffix: 'pàgina'
  },
  DynamicTags: {
    add: 'Afegir'
  },
  Log: {
    loading: 'S\'està carregant'
  },
  Input: {
    placeholder: 'Introduïu'
  },
  InputNumber: {
    placeholder: 'Introduïu'
  },
  DynamicInput: {
    create: 'Crear'
  },
  ThemeEditor: {
    title: 'Editor de tema',
    clearAllVars: 'Esborrar totes les variables',
    clearSearch: 'Esborrar la cerca',
    filterCompName: 'Filtrar nom del component',
    filterVarName: 'Filtrar nom de la variable',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Restaurar els valors per defecte'
  },
  Image: {
    tipPrevious: 'Imatge anterior (←)',
    tipNext: 'Imatge següent (→)',
    tipCounterclockwise: 'Sentit antihorari',
    tipClockwise: 'Sentit horari',
    tipZoomOut: 'Allunyar',
    tipZoomIn: 'Acostar',
    tipDownload: 'Baixar',
    tipClose: 'Tancar (Esc)',
    tipOriginalSize: 'Zoom a la mida original'
  },
  Heatmap: {
    less: 'menys',
    more: 'més',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default caES
