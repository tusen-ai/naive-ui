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
    weekFormat: 'yyyy-w',
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
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Data inizio',
    endDatePlaceholder: 'Data fine',
    startDatetimePlaceholder: 'Data e ora di inizio',
    endDatetimePlaceholder: 'Data e ora di fine',
    startMonthPlaceholder: 'Mese di inizio',
    endMonthPlaceholder: 'Mese di fine',
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
  Transfer: {
    selectAll: 'Seleziona tutto',
    unselectAll: 'Deseleziona tutto',
    clearAll: 'Pulisci',
    total: (num: number): string => {
      if (num !== 1) return `${num} elementi in totale`
      return '1 elemento in totale'
    },
    selected: (num: number): string => {
      if (num !== 1) return `${num} elementi selezionati`
      return '1 elemento selezionato'
    }
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
    now: 'Ora',
    clear: 'Cancella'
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
    tipDownload: 'Download',
    tipClose: 'Chiudi (Esc)',
    tipOriginalSize: 'Torna alla dimensione originale'
  }
}

export default itIT
