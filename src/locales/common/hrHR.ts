import type { NLocale } from './enUS'

const hrHR: NLocale = {
  name: 'hr-HR',
  global: {
    undo: 'Poništi',
    redo: 'Ponovi',
    confirm: 'Potvrdi',
    clear: 'Očisti'
  },
  Popconfirm: {
    positiveText: 'Potvrdi',
    negativeText: 'Odustani'
  },
  Cascader: {
    placeholder: 'Odaberite',
    loading: 'Učitavanje',
    loadingRequiredMessage: (label: string): string =>
      `Učitajte sve potomke stavke ${label} prije odabira.`
  },
  Time: {
    dateFormat: 'dd.MM.yyyy.',
    dateTimeFormat: 'dd.MM.yyyy. HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM.yyyy.',
    dateFormat: 'dd.MM.yyyy.',
    dateTimeFormat: 'dd.MM.yyyy. HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Očisti',
    now: 'Sada',
    confirm: 'Potvrdi',
    selectTime: 'Odaberite vrijeme',
    selectDate: 'Odaberite datum',
    datePlaceholder: 'Odaberite datum',
    datetimePlaceholder: 'Odaberite datum i vrijeme',
    monthPlaceholder: 'Odaberite mjesec',
    yearPlaceholder: 'Odaberite godinu',
    quarterPlaceholder: 'Odaberite kvartal',
    weekPlaceholder: 'Odaberite tjedan',
    startDatePlaceholder: 'Datum početka',
    endDatePlaceholder: 'Datum završetka',
    startDatetimePlaceholder: 'Datum i vrijeme početka',
    endDatetimePlaceholder: 'Datum i vrijeme završetka',
    startMonthPlaceholder: 'Mjesec početka',
    endMonthPlaceholder: 'Mjesec završetka',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Danas'
  },
  DataTable: {
    checkTableAll: 'Odaberi sve u tablici',
    uncheckTableAll: 'Poništi odabir u tablici',
    confirm: 'Potvrdi',
    clear: 'Očisti'
  },
  LegacyTransfer: {
    sourceTitle: 'Izvor',
    targetTitle: 'Odredište'
  },
  Transfer: {
    selectAll: 'Odaberi sve',
    unselectAll: 'Poništi odabir',
    clearAll: 'Očisti',
    total: (num: number): string => `Ukupno ${num} stavki`,
    selected: (num: number): string => `Odabrano ${num} stavki`
  },
  Empty: {
    description: 'Nema podataka'
  },
  Select: {
    placeholder: 'Odaberite'
  },
  TimePicker: {
    placeholder: 'Odaberite vrijeme',
    positiveText: 'U redu',
    negativeText: 'Odustani',
    now: 'Sada',
    clear: 'Očisti'
  },
  Pagination: {
    goto: 'Idi na',
    selectionSuffix: 'stranica'
  },
  DynamicTags: {
    add: 'Dodaj'
  },
  Log: {
    loading: 'Učitavanje'
  },
  Input: {
    placeholder: 'Unesite'
  },
  InputNumber: {
    placeholder: 'Unesite'
  },
  DynamicInput: {
    create: 'Stvori'
  },
  ThemeEditor: {
    title: 'Uređivač teme',
    clearAllVars: 'Očisti sve varijable',
    clearSearch: 'Očisti pretraživanje',
    filterCompName: 'Filtriraj naziv komponente',
    filterVarName: 'Filtriraj naziv varijable',
    import: 'Uvezi',
    export: 'Izvezi',
    restore: 'Vrati na zadano'
  },
  Image: {
    tipPrevious: 'Prethodna slika (←)',
    tipNext: 'Sljedeća slika (→)',
    tipCounterclockwise: 'Suprotno od kazaljke na satu',
    tipClockwise: 'U smjeru kazaljke na satu',
    tipZoomOut: 'Umanji',
    tipZoomIn: 'Uvećaj',
    tipDownload: 'Preuzmi',
    tipClose: 'Zatvori (Esc)',
    tipOriginalSize: 'Zumiraj na izvornu veličinu'
  },
  Heatmap: {
    less: 'manje',
    more: 'više',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default hrHR
