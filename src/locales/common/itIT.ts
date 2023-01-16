import type { NLocale } from './enUS'

const itIT: NLocale = {
  name: 'it-IT',
  global: {
    undo: 'Annulla',
    redo: 'Ripeti',
    confirm: 'Conferma',
    clear: 'Cancella'
  },
  Popconfirm: {
    positiveText: 'Conferma',
    negativeText: 'Annulla'
  },
  Cascader: {
    placeholder: 'Si prega di selezionare',
    loading: 'Caricamento',
    loadingRequiredMessage: (label: string): string =>
      `Carica tutti i discendenti di ${label} prima di controllarlo.`
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
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'Cancella',
    now: 'Adesso',
    confirm: 'Conferma',
    selectTime: 'Seleziona ora',
    selectDate: 'Seleziona data',
    datePlaceholder: 'Seleziona data',
    datetimePlaceholder: 'Seleziona data e ora',
    monthPlaceholder: 'Seleziona mese',
    yearPlaceholder: 'Seleziona anno',
    quarterPlaceholder: 'Seleziona trimestre',
    startDatePlaceholder: 'Data inizio',
    endDatePlaceholder: 'Data fine',
    startDatetimePlaceholder: 'Data e ora di inizio',
    endDatetimePlaceholder: 'Data e ora di fine',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Oggi'
  },
  DataTable: {
    checkTableAll: 'Seleziona tutto nella tabella',
    uncheckTableAll: 'Deseleziona tutto nella tabella',
    confirm: 'Conferma',
    clear: 'Cancella'
  },
  LegacyTransfer: {
    sourceTitle: 'Fonte',
    targetTitle: 'Destinazione'
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
    description: 'Nessun Dato'
  },
  Select: {
    placeholder: 'Si prega di selezionare'
  },
  TimePicker: {
    placeholder: 'Seleziona ora',
    positiveText: 'OK',
    negativeText: 'Annulla',
    now: 'Ora'
  },
  Pagination: {
    goto: 'Vai a',
    selectionSuffix: 'per pagina'
  },
  DynamicTags: {
    add: 'Aggiungi'
  },
  Log: {
    loading: 'Caricamento'
  },
  Input: {
    placeholder: 'Si prega di inserire'
  },
  InputNumber: {
    placeholder: 'Si prega di inserire'
  },
  DynamicInput: {
    create: 'Crea'
  },
  ThemeEditor: {
    title: 'Editor Tema',
    clearAllVars: 'Cancella tutte le variabili',
    clearSearch: 'Cancella ricerca',
    filterCompName: 'Filtra componenti',
    filterVarName: 'Filtra variabili',
    import: 'Importa',
    export: 'Esporta',
    restore: 'Ripristina'
  },
  Image: {
    tipPrevious: 'Immagine precedente (←)',
    tipNext: 'Immagine successiva (→)',
    tipCounterclockwise: 'Ruota a sinistra',
    tipClockwise: 'Ruota a destra',
    tipZoomOut: 'Ingrandisci',
    tipZoomIn: 'Riduci',
    tipClose: 'Chiudi (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default itIT
