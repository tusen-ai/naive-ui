import type { NLocale } from './enUS'

const afZA: NLocale = {
  name: 'af-ZA',
  global: {
    undo: 'Ontdoen',
    redo: 'Herdoen',
    confirm: 'Bevestig',
    clear: 'Maak skoon'
  },
  Popconfirm: {
    positiveText: 'Bevestig',
    negativeText: 'Kanselleer'
  },
  Cascader: {
    placeholder: 'Kies asseblief',
    loading: 'Laai tans',
    loadingRequiredMessage: (label: string): string =>
      `Laai asseblief al ${label} se afstammelinge voordat u dit kies.`
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
    weekFormat: 'YYYY-w',
    clear: 'Maak skoon',
    now: 'Nou',
    confirm: 'Bevestig',
    selectTime: 'Kies tyd',
    selectDate: 'Kies datum',
    datePlaceholder: 'Kies datum',
    datetimePlaceholder: 'Kies datum en tyd',
    monthPlaceholder: 'Kies maand',
    yearPlaceholder: 'Kies jaar',
    quarterPlaceholder: 'Kies kwartaal',
    weekPlaceholder: 'Kies week',
    startDatePlaceholder: 'Begindatum',
    endDatePlaceholder: 'Einddatum',
    startDatetimePlaceholder: 'Begin datum en tyd',
    endDatetimePlaceholder: 'Eind datum en tyd',
    startMonthPlaceholder: 'Beginmaand',
    endMonthPlaceholder: 'Eindmaand',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Vandag'
  },
  DataTable: {
    checkTableAll: 'Kies alles in die tabel',
    uncheckTableAll: 'Ontkies alles in die tabel',
    confirm: 'Bevestig',
    clear: 'Maak skoon'
  },
  LegacyTransfer: {
    sourceTitle: 'Bron',
    targetTitle: 'Teiken'
  },
  Transfer: {
    selectAll: 'Kies alles',
    unselectAll: 'Ontkies alles',
    clearAll: 'Maak skoon',
    total: (num: number): string => `Totaal ${num} items`,
    selected: (num: number): string => `${num} items gekies`
  },
  Empty: {
    description: 'Geen data'
  },
  Select: {
    placeholder: 'Kies asseblief'
  },
  TimePicker: {
    placeholder: 'Kies tyd',
    positiveText: 'OK',
    negativeText: 'Kanselleer',
    now: 'Nou',
    clear: 'Maak skoon'
  },
  Pagination: {
    goto: 'Gaan na',
    selectionSuffix: 'bladsy'
  },
  DynamicTags: {
    add: 'Voeg by'
  },
  Log: {
    loading: 'Laai tans'
  },
  Input: {
    placeholder: 'Voer asseblief in'
  },
  InputNumber: {
    placeholder: 'Voer asseblief in'
  },
  DynamicInput: {
    create: 'Skep'
  },
  ThemeEditor: {
    title: 'Tema-redigeerder',
    clearAllVars: 'Vee alle veranderlikes uit',
    clearSearch: 'Maak soektog skoon',
    filterCompName: 'Filter komponentnaam',
    filterVarName: 'Filter veranderlikenaam',
    import: 'Voer in',
    export: 'Voer uit',
    restore: 'Herstel na verstek'
  },
  Image: {
    tipPrevious: 'Vorige prent (←)',
    tipNext: 'Volgende prent (→)',
    tipCounterclockwise: 'Teen die kloksgewys',
    tipClockwise: 'Kloksgewys',
    tipZoomOut: 'Zoem uit',
    tipZoomIn: 'Zoem in',
    tipDownload: 'Aflaai',
    tipClose: 'Sluit (Esc)',
    tipOriginalSize: 'Zoem na oorspronklike grootte'
  },
  Heatmap: {
    less: 'minder',
    more: 'meer',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default afZA
