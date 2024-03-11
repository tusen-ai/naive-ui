import type { NLocale } from './enUS'

const csCZ: NLocale = {
  name: 'cs-CZ',
  global: {
    undo: 'Zpět',
    redo: 'Obnovit',
    confirm: 'Potvrdit',
    clear: 'Vyčistit'
  },
  Popconfirm: {
    positiveText: 'Potvrdit',
    negativeText: 'Zrušit'
  },
  Cascader: {
    placeholder: 'Prosím vyberte',
    loading: 'Načítání',
    loadingRequiredMessage: (label: string): string =>
      `Prosím načtěte před kontrolou všechny potomky pro ${label}.`
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
    clear: 'Vyčistit',
    now: 'Teď',
    confirm: 'Potvrdit',
    selectTime: 'Vybrat čas',
    selectDate: 'Vybrat datum',
    datePlaceholder: 'Vyberte čas',
    datetimePlaceholder: 'Vyberte datum a čas',
    monthPlaceholder: 'Vyberte měsíc',
    yearPlaceholder: 'Vyberte rok',
    quarterPlaceholder: 'Vyberte čtvrtletí',
    weekPlaceholder: 'Vyberte týden',
    startDatePlaceholder: 'Datum začátku',
    endDatePlaceholder: 'Datum ukončení',
    startDatetimePlaceholder: 'Datum a čas začátku',
    endDatetimePlaceholder: 'Datum a čas ukončení ',
    startMonthPlaceholder: 'Začátek měsíce',
    endMonthPlaceholder: 'Konec měsíce',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Dnes'
  },
  DataTable: {
    checkTableAll: 'Vybrat vše v tabulce',
    uncheckTableAll: 'Zrušit výběr všeho v tabulce ',
    confirm: 'Potvrdit',
    clear: 'Vyčistit'
  },
  LegacyTransfer: {
    sourceTitle: 'Zdroj',
    targetTitle: 'Cíl'
  },
  Transfer: {
    selectAll: 'Vybrat vše',
    unselectAll: 'Odznačit vše',
    clearAll: 'Vyčistit',
    total: (num: number): string => `Celkem ${num} položek`,
    selected: (num: number): string => `${num} položek vybráno`
  },
  Empty: {
    description: 'Žádná data'
  },
  Select: {
    placeholder: 'Prosím vyberte'
  },
  TimePicker: {
    placeholder: 'Vybrat čas',
    positiveText: 'OK',
    negativeText: 'Zrušit',
    now: 'Teď',
    clear: 'Vyčistit'
  },
  Pagination: {
    goto: 'Jít na',
    selectionSuffix: 'Strana'
  },
  DynamicTags: {
    add: 'Přidat'
  },
  Log: {
    loading: 'Načítání'
  },
  Input: {
    placeholder: 'Zadejte'
  },
  InputNumber: {
    placeholder: 'Zadejte'
  },
  DynamicInput: {
    create: 'Vytvořit'
  },
  ThemeEditor: {
    title: 'Editor témat',
    clearAllVars: 'Vymazat všechny proměnné',
    clearSearch: 'Vymazat vyhledávání',
    filterCompName: 'Filtrovat název komponenty',
    filterVarName: 'Filztrovat název proměnné',
    import: 'Importovat',
    export: 'Exportovat',
    restore: 'Obnovit původní nastavení'
  },
  Image: {
    tipPrevious: 'Předchozí obrázek (←)',
    tipNext: 'Další obrázek (→)',
    tipCounterclockwise: 'Proti směru hodinových ručiček',
    tipClockwise: 'Ve směru hodinových ručiček',
    tipZoomOut: 'Oddálit',
    tipZoomIn: 'Přiblížit',
    tipDownload: 'Stáhnout',
    tipClose: 'Zavřít (Esc)',
    tipOriginalSize: 'Přiblížit na původní velikost'
  }
}

export default csCZ
