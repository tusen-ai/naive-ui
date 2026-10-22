import type { NLocale } from './enUS'

const glES: NLocale = {
  name: 'gl-ES',
  global: {
    undo: 'Desfacer',
    redo: 'Refacer',
    confirm: 'Confirmar',
    clear: 'Borrar'
  },
  Popconfirm: {
    positiveText: 'Confirmar',
    negativeText: 'Cancelar'
  },
  Cascader: {
    placeholder: 'Seleccione',
    loading: 'Cargando',
    loadingRequiredMessage: (label: string): string =>
      `Cargue todos os descendentes de ${label} antes de seleccionalo.`
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
    clear: 'Borrar',
    now: 'Agora',
    confirm: 'Confirmar',
    selectTime: 'Seleccionar hora',
    selectDate: 'Seleccionar data',
    datePlaceholder: 'Seleccionar data',
    datetimePlaceholder: 'Seleccionar data e hora',
    monthPlaceholder: 'Seleccionar mes',
    yearPlaceholder: 'Seleccionar ano',
    quarterPlaceholder: 'Seleccionar trimestre',
    weekPlaceholder: 'Seleccionar semana',
    startDatePlaceholder: 'Data de inicio',
    endDatePlaceholder: 'Data de fin',
    startDatetimePlaceholder: 'Data e hora de inicio',
    endDatetimePlaceholder: 'Data e hora de fin',
    startMonthPlaceholder: 'Mes de inicio',
    endMonthPlaceholder: 'Mes de fin',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hoxe'
  },
  DataTable: {
    checkTableAll: 'Seleccionar todo na táboa',
    uncheckTableAll: 'Deseleccionar todo na táboa',
    confirm: 'Confirmar',
    clear: 'Borrar'
  },
  LegacyTransfer: {
    sourceTitle: 'Orixe',
    targetTitle: 'Destino'
  },
  Transfer: {
    selectAll: 'Seleccionar todo',
    unselectAll: 'Deseleccionar todo',
    clearAll: 'Borrar',
    total: (num: number): string => `Total ${num} elementos`,
    selected: (num: number): string => `${num} elementos seleccionados`
  },
  Empty: {
    description: 'Sen datos'
  },
  Select: {
    placeholder: 'Seleccione'
  },
  TimePicker: {
    placeholder: 'Seleccionar hora',
    positiveText: 'Aceptar',
    negativeText: 'Cancelar',
    now: 'Agora',
    clear: 'Borrar'
  },
  Pagination: {
    goto: 'Ir a',
    selectionSuffix: 'páxina'
  },
  DynamicTags: {
    add: 'Engadir'
  },
  Log: {
    loading: 'Cargando'
  },
  Input: {
    placeholder: 'Introduza'
  },
  InputNumber: {
    placeholder: 'Introduza'
  },
  DynamicInput: {
    create: 'Crear'
  },
  ThemeEditor: {
    title: 'Editor de tema',
    clearAllVars: 'Borrar todas as variables',
    clearSearch: 'Borrar a busca',
    filterCompName: 'Filtrar nome do compoñente',
    filterVarName: 'Filtrar nome da variable',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Restablecer os valores predeterminados'
  },
  Image: {
    tipPrevious: 'Imaxe anterior (←)',
    tipNext: 'Imaxe seguinte (→)',
    tipCounterclockwise: 'Sentido antihorario',
    tipClockwise: 'Sentido horario',
    tipZoomOut: 'Afastar',
    tipZoomIn: 'Achegar',
    tipDownload: 'Descargar',
    tipClose: 'Pechar (Esc)',
    tipOriginalSize: 'Zoom ao tamaño orixinal'
  },
  Heatmap: {
    less: 'menos',
    more: 'máis',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default glES
