import type { NLocale } from './enUS'

const esES: NLocale = {
  name: 'es-ES',
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
    placeholder: 'Seleccione',
    loading: 'Cargando',
    loadingRequiredMessage: (label: string): string =>
      `Cargue todos los descendientes de ${label} antes de seleccionarlo.`
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
    now: 'Ahora',
    confirm: 'Confirmar',
    selectTime: 'Seleccionar hora',
    selectDate: 'Seleccionar fecha',
    datePlaceholder: 'Seleccionar fecha',
    datetimePlaceholder: 'Seleccionar fecha y hora',
    monthPlaceholder: 'Seleccionar mes',
    yearPlaceholder: 'Seleccionar año',
    quarterPlaceholder: 'Seleccionar trimestre',
    weekPlaceholder: 'Seleccionar semana',
    startDatePlaceholder: 'Fecha de inicio',
    endDatePlaceholder: 'Fecha de fin',
    startDatetimePlaceholder: 'Fecha y hora de inicio',
    endDatetimePlaceholder: 'Fecha y hora de fin',
    startMonthPlaceholder: 'Mes de inicio',
    endMonthPlaceholder: 'Mes de fin',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hoy'
  },
  DataTable: {
    checkTableAll: 'Seleccionar todo en la tabla',
    uncheckTableAll: 'Deseleccionar todo en la tabla',
    confirm: 'Confirmar',
    clear: 'Borrar'
  },
  LegacyTransfer: {
    sourceTitle: 'Origen',
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
    description: 'Sin datos'
  },
  Select: {
    placeholder: 'Seleccione'
  },
  TimePicker: {
    placeholder: 'Seleccionar hora',
    positiveText: 'Aceptar',
    negativeText: 'Cancelar',
    now: 'Ahora',
    clear: 'Borrar'
  },
  Pagination: {
    goto: 'Ir a',
    selectionSuffix: 'página'
  },
  DynamicTags: {
    add: 'Añadir'
  },
  Log: {
    loading: 'Cargando'
  },
  Input: {
    placeholder: 'Introduzca'
  },
  InputNumber: {
    placeholder: 'Introduzca'
  },
  DynamicInput: {
    create: 'Crear'
  },
  ThemeEditor: {
    title: 'Editor de tema',
    clearAllVars: 'Borrar todas las variables',
    clearSearch: 'Borrar búsqueda',
    filterCompName: 'Filtrar nombre del componente',
    filterVarName: 'Filtrar nombre de la variable',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Restablecer valores predeterminados'
  },
  Image: {
    tipPrevious: 'Imagen anterior (←)',
    tipNext: 'Imagen siguiente (→)',
    tipCounterclockwise: 'Sentido antihorario',
    tipClockwise: 'Sentido horario',
    tipZoomOut: 'Alejar',
    tipZoomIn: 'Acercar',
    tipDownload: 'Descargar',
    tipClose: 'Cerrar (Esc)',
    tipOriginalSize: 'Zoom al tamaño original'
  },
  Heatmap: {
    less: 'menos',
    more: 'más',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default esES
