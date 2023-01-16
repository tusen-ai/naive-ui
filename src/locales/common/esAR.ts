import type { NLocale } from './enUS'

const esAR: NLocale = {
  name: 'es-AR',
  global: {
    undo: 'Deshacer',
    redo: 'Rehacer',
    confirm: 'Confirmar',
    clear: 'Borrar'
  },
  Popconfirm: {
    positiveText: 'Confirmar',
    negativeText: 'Cancelar'
  },
  Cascader: {
    placeholder: 'Seleccionar por favor',
    loading: 'Cargando',
    loadingRequiredMessage: (label: string): string =>
      `Por favor, cargue los descendientes de ${label} antes de marcarlo.`
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
    clear: 'Borrar',
    now: 'Ahora',
    confirm: 'Confirmar',
    selectTime: 'Seleccionar hora',
    selectDate: 'Seleccionar fecha',
    datePlaceholder: 'Seleccionar fecha',
    datetimePlaceholder: 'Seleccionar fecha y hora',
    monthPlaceholder: 'Seleccionar mes',
    yearPlaceholder: 'Seleccionar año',
    quarterPlaceholder: 'Seleccionar Trimestre',
    startDatePlaceholder: 'Fecha de inicio',
    endDatePlaceholder: 'Fecha final',
    startDatetimePlaceholder: 'Fecha y hora de inicio',
    endDatetimePlaceholder: 'Fecha y hora final',
    monthBeforeYear: true,
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    // 0 is Monday / 0 es Lunes
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hoy'
  },
  DataTable: {
    checkTableAll: 'Seleccionar todo de la tabla',
    uncheckTableAll: 'Deseleccionar todo de la tabla',
    confirm: 'Confirmar',
    clear: 'Limpiar'
  },
  LegacyTransfer: {
    sourceTitle: 'Fuente',
    targetTitle: 'Objetivo'
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
    description: 'Sin datos'
  },
  Select: {
    placeholder: 'Seleccionar por favor'
  },
  TimePicker: {
    placeholder: 'Seleccionar hora',
    positiveText: 'OK',
    negativeText: 'Cancelar',
    now: 'Ahora'
  },
  Pagination: {
    goto: 'Ir a',
    selectionSuffix: 'página'
  },
  DynamicTags: {
    add: 'Agregar'
  },
  Log: {
    loading: 'Cargando'
  },
  Input: {
    placeholder: 'Ingrese datos por favor'
  },
  InputNumber: {
    placeholder: 'Ingrese datos por favor'
  },
  DynamicInput: {
    create: 'Crear'
  },
  ThemeEditor: {
    title: 'Editor de Tema',
    clearAllVars: 'Limpiar todas las variables',
    clearSearch: 'Limpiar búsqueda',
    filterCompName: 'Filtro para nombre del componente',
    filterVarName: 'Filtro para nombre de la variable',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Restablecer los valores por defecto'
  },
  Image: {
    tipPrevious: 'Imagen anterior (←)',
    tipNext: 'Siguiente imagen (→)',
    tipCounterclockwise: 'Sentido antihorario',
    tipClockwise: 'Sentido horario',
    tipZoomOut: 'Alejar',
    tipZoomIn: 'Acercar',
    tipClose: 'Cerrar (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default esAR
