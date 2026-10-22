import type { NLocale } from './enUS'

const slSI: NLocale = {
  name: 'sl-SI',
  global: {
    undo: 'Razveljavi',
    redo: 'Uveljavi',
    confirm: 'Potrdi',
    clear: 'Počisti'
  },
  Popconfirm: {
    positiveText: 'Potrdi',
    negativeText: 'Prekliči'
  },
  Cascader: {
    placeholder: 'Izberite',
    loading: 'Nalaganje',
    loadingRequiredMessage: (label: string): string =>
      `Pred izbiro naložite vse potomce elementa ${label}.`
  },
  Time: {
    dateFormat: 'd. M. yyyy',
    dateTimeFormat: 'd. M. yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'M. yyyy',
    dateFormat: 'd. M. yyyy',
    dateTimeFormat: 'd. M. yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Počisti',
    now: 'Zdaj',
    confirm: 'Potrdi',
    selectTime: 'Izberite čas',
    selectDate: 'Izberite datum',
    datePlaceholder: 'Izberite datum',
    datetimePlaceholder: 'Izberite datum in čas',
    monthPlaceholder: 'Izberite mesec',
    yearPlaceholder: 'Izberite leto',
    quarterPlaceholder: 'Izberite četrtletje',
    weekPlaceholder: 'Izberite teden',
    startDatePlaceholder: 'Začetni datum',
    endDatePlaceholder: 'Končni datum',
    startDatetimePlaceholder: 'Začetni datum in čas',
    endDatetimePlaceholder: 'Končni datum in čas',
    startMonthPlaceholder: 'Začetni mesec',
    endMonthPlaceholder: 'Končni mesec',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Danes'
  },
  DataTable: {
    checkTableAll: 'Izberi vse v tabeli',
    uncheckTableAll: 'Počisti izbor v tabeli',
    confirm: 'Potrdi',
    clear: 'Počisti'
  },
  LegacyTransfer: {
    sourceTitle: 'Vir',
    targetTitle: 'Cilj'
  },
  Transfer: {
    selectAll: 'Izberi vse',
    unselectAll: 'Počisti izbor',
    clearAll: 'Počisti',
    total: (num: number): string => `Skupaj ${num} elementov`,
    selected: (num: number): string => `Izbranih ${num} elementov`
  },
  Empty: {
    description: 'Ni podatkov'
  },
  Select: {
    placeholder: 'Izberite'
  },
  TimePicker: {
    placeholder: 'Izberite čas',
    positiveText: 'V redu',
    negativeText: 'Prekliči',
    now: 'Zdaj',
    clear: 'Počisti'
  },
  Pagination: {
    goto: 'Pojdi na',
    selectionSuffix: 'stran'
  },
  DynamicTags: {
    add: 'Dodaj'
  },
  Log: {
    loading: 'Nalaganje'
  },
  Input: {
    placeholder: 'Vnesite'
  },
  InputNumber: {
    placeholder: 'Vnesite'
  },
  DynamicInput: {
    create: 'Ustvari'
  },
  ThemeEditor: {
    title: 'Urejevalnik teme',
    clearAllVars: 'Počisti vse spremenljivke',
    clearSearch: 'Počisti iskanje',
    filterCompName: 'Filtriraj ime komponente',
    filterVarName: 'Filtriraj ime spremenljivke',
    import: 'Uvozi',
    export: 'Izvozi',
    restore: 'Obnovi privzeto'
  },
  Image: {
    tipPrevious: 'Prejšnja slika (←)',
    tipNext: 'Naslednja slika (→)',
    tipCounterclockwise: 'V nasprotni smeri urinega kazalca',
    tipClockwise: 'V smeri urinega kazalca',
    tipZoomOut: 'Pomanjšaj',
    tipZoomIn: 'Povečaj',
    tipDownload: 'Prenesi',
    tipClose: 'Zapri (Esc)',
    tipOriginalSize: 'Povečava na izvirno velikost'
  },
  Heatmap: {
    less: 'manj',
    more: 'več',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default slSI
