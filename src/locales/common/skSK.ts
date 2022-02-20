import type { NLocale } from './enUS'

const skSK: NLocale = {
  name: 'sk-SK',
  global: {
    undo: 'Späť',
    redo: 'Obnoviť',
    confirm: 'Potvrdiť'
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
    startDatePlaceholder: 'Dátum začiatku',
    endDatePlaceholder: 'Dátum ukončenia',
    startDatetimePlaceholder: 'Dátum a čas začiatku',
    endDatetimePlaceholder: 'Dátum a čas ukončenia ',
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
  Transfer: {
    sourceTitle: 'Zdroj',
    targetTitle: 'Cieľ'
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
    now: 'Teraz'
  },
  Pagination: {
    goto: 'Ísť',
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
    filterCompName: 'Názov komponentu filtra',
    filterVarName: 'Názov premennej filtra',
    import: 'Importovať',
    export: 'Exportovať',
    restore: 'Obnoviť pôvodné nastavenia'
  },
  // TODO: translation
  Image: {
    tipPrevious: 'Predchádzajúci obrázok (←)',
    tipNext: 'Ďalší obrázok (→)',
    tipCounterclockwise: 'Proti smeru hodinových ručičiek',
    tipClockwise: 'V smere hodinových ručičiek',
    tipZoomOut: 'Oddialiť',
    tipZoomIn: 'Priblížiť',
    tipClose: 'Zavrieť (Esc)'
  }
}

export default skSK
