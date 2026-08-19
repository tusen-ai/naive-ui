import type { NLocale } from './enUS'

const fiFI: NLocale = {
  name: 'fi-FI',
  global: {
    undo: 'Kumoa',
    redo: 'Tee uudelleen',
    confirm: 'Vahvista',
    clear: 'Tyhjennä'
  },
  Popconfirm: {
    positiveText: 'Vahvista',
    negativeText: 'Peruuta'
  },
  Cascader: {
    placeholder: 'Valitse',
    loading: 'Ladataan',
    loadingRequiredMessage: (label: string): string =>
      `Lataa kaikki kohteen ${label} alikohteet ennen valintaa.`
  },
  Time: {
    dateFormat: 'd.M.yyyy',
    dateTimeFormat: 'd.M.yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'M.yyyy',
    dateFormat: 'd.M.yyyy',
    dateTimeFormat: 'd.M.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Tyhjennä',
    now: 'Nyt',
    confirm: 'Vahvista',
    selectTime: 'Valitse aika',
    selectDate: 'Valitse päivämäärä',
    datePlaceholder: 'Valitse päivämäärä',
    datetimePlaceholder: 'Valitse päivämäärä ja aika',
    monthPlaceholder: 'Valitse kuukausi',
    yearPlaceholder: 'Valitse vuosi',
    quarterPlaceholder: 'Valitse vuosineljännes',
    weekPlaceholder: 'Valitse viikko',
    startDatePlaceholder: 'Alkamispäivä',
    endDatePlaceholder: 'Päättymispäivä',
    startDatetimePlaceholder: 'Alkamisajankohta',
    endDatetimePlaceholder: 'Päättymisajankohta',
    startMonthPlaceholder: 'Alkukuukausi',
    endMonthPlaceholder: 'Päättymiskuukausi',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Tänään'
  },
  DataTable: {
    checkTableAll: 'Valitse kaikki taulukosta',
    uncheckTableAll: 'Poista taulukon valinnat',
    confirm: 'Vahvista',
    clear: 'Tyhjennä'
  },
  LegacyTransfer: {
    sourceTitle: 'Lähde',
    targetTitle: 'Kohde'
  },
  Transfer: {
    selectAll: 'Valitse kaikki',
    unselectAll: 'Poista kaikki valinnat',
    clearAll: 'Tyhjennä',
    total: (num: number): string => `Yhteensä ${num} kohdetta`,
    selected: (num: number): string => `${num} kohdetta valittu`
  },
  Empty: {
    description: 'Ei tietoja'
  },
  Select: {
    placeholder: 'Valitse'
  },
  TimePicker: {
    placeholder: 'Valitse aika',
    positiveText: 'OK',
    negativeText: 'Peruuta',
    now: 'Nyt',
    clear: 'Tyhjennä'
  },
  Pagination: {
    goto: 'Siirry',
    selectionSuffix: 'sivu'
  },
  DynamicTags: {
    add: 'Lisää'
  },
  Log: {
    loading: 'Ladataan'
  },
  Input: {
    placeholder: 'Kirjoita'
  },
  InputNumber: {
    placeholder: 'Kirjoita'
  },
  DynamicInput: {
    create: 'Luo'
  },
  ThemeEditor: {
    title: 'Teemaeditori',
    clearAllVars: 'Tyhjennä kaikki muuttujat',
    clearSearch: 'Tyhjennä haku',
    filterCompName: 'Suodata komponentin nimi',
    filterVarName: 'Suodata muuttujan nimi',
    import: 'Tuo',
    export: 'Vie',
    restore: 'Palauta oletukset'
  },
  Image: {
    tipPrevious: 'Edellinen kuva (←)',
    tipNext: 'Seuraava kuva (→)',
    tipCounterclockwise: 'Vastapäivään',
    tipClockwise: 'Myötäpäivään',
    tipZoomOut: 'Loitonna',
    tipZoomIn: 'Lähennä',
    tipDownload: 'Lataa',
    tipClose: 'Sulje (Esc)',
    tipOriginalSize: 'Zoomaa alkuperäiseen kokoon'
  },
  Heatmap: {
    less: 'vähemmän',
    more: 'enemmän',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default fiFI
