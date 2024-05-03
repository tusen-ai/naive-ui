import type { NLocale } from './enUS'

const skSK: NLocale = {
  name: 'sk-SK',
  global: {
    undo: 'Späť',
    redo: 'Obnoviť',
    confirm: 'Potvrdiť',
    clear: 'Vyčistiť'
  },
  Popconfirm: {
    positiveText: 'Potvrdiť',
    negativeText: 'Zrušiť'
  },
  Cascader: {
    placeholder: 'Prosím vyberte',
    loading: 'Načítavanie',
    loadingRequiredMessage: (label: string): string =>
      `Prosím načítajte všetkých ${label} potomkov pred kontrolou.`
  },
  Time: {
    dateFormat: 'd-M-yyyy',
    dateTimeFormat: 'd-M-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'EEEE',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MMM-yyyy',
    dateFormat: 'd-M-yyyy',
    dateTimeFormat: 'd-M-yyyy HH:mm:ss',
    quarterFormat: 'qqq-yyyy',
    weekFormat: 'yyyy-w',
    clear: 'Vyčistiť',
    now: 'Teraz',
    confirm: 'Potvrdiť',
    selectTime: 'Vybrať čas',
    selectDate: 'Vybrať dátum',
    datePlaceholder: 'Vyberte čas',
    datetimePlaceholder: 'Vyberte dátum a čas',
    monthPlaceholder: 'Vyberte mesiac',
    yearPlaceholder: 'Vyberte rok',
    quarterPlaceholder: 'Vyberte štvrťrok',
    weekPlaceholder: 'Vyberte týždeň',
    startDatePlaceholder: 'Dátum začiatku',
    endDatePlaceholder: 'Dátum ukončenia',
    startDatetimePlaceholder: 'Dátum a čas začiatku',
    endDatetimePlaceholder: 'Dátum a čas ukončenia ',
    startMonthPlaceholder: 'Začiatok mesiaca',
    endMonthPlaceholder: 'Koniec mesiaca',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Dnes'
  },
  DataTable: {
    checkTableAll: 'Vybrať všetko v tabuľke',
    uncheckTableAll: 'Zrušiť výber všetkého v tabuľke ',
    confirm: 'Potvrdiť',
    clear: 'Vyčistiť'
  },
  LegacyTransfer: {
    sourceTitle: 'Zdroj',
    targetTitle: 'Cieľ'
  },
  Transfer: {
    selectAll: 'Vybrať všetko',
    unselectAll: 'odznačiť všetko',
    clearAll: 'Vyčistiť',
    total: (num: number): string => `Celkom ${num} položiek`,
    selected: (num: number): string => `Vybratých ${num} položiek`
  },
  Empty: {
    description: 'Žiadne dáta'
  },
  Select: {
    placeholder: 'Prosím vyberte'
  },
  TimePicker: {
    placeholder: 'Vybrať čas',
    positiveText: 'OK',
    negativeText: 'Zrušiť',
    now: 'Teraz',
    clear: 'Vyčistiť'
  },
  Pagination: {
    goto: 'Ísť na',
    selectionSuffix: 'Strana'
  },
  DynamicTags: {
    add: 'Pridať'
  },
  Log: {
    loading: 'Načítavanie'
  },
  Input: {
    placeholder: 'Zadajte'
  },
  InputNumber: {
    placeholder: 'Zadajte'
  },
  DynamicInput: {
    create: 'Vytvoriť'
  },
  ThemeEditor: {
    title: 'Editor tém',
    clearAllVars: 'Vymazať všetky premenné',
    clearSearch: 'Vymazať vyhľadávanie',
    filterCompName: 'Filtrovať názov komponentu',
    filterVarName: 'Filtrovať názov premennej',
    import: 'Importovať',
    export: 'Exportovať',
    restore: 'Obnoviť pôvodné nastavenia'
  },
  Image: {
    tipPrevious: 'Predchádzajúci obrázok (←)',
    tipNext: 'Ďalší obrázok (→)',
    tipCounterclockwise: 'Proti smeru hodinových ručičiek',
    tipClockwise: 'V smere hodinových ručičiek',
    tipZoomOut: 'Oddialiť',
    tipZoomIn: 'Priblížiť',
    tipDownload: 'Sťahovať',
    tipClose: 'Zavrieť (Esc)',
    tipOriginalSize: 'Priblížiť na pôvodnú veľkosť'
  }
}

export default skSK
