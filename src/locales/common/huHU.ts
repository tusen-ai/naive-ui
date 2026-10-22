import type { NLocale } from './enUS'

const huHU: NLocale = {
  name: 'hu-HU',
  global: {
    undo: 'Visszavonás',
    redo: 'Ismétlés',
    confirm: 'Megerősítés',
    clear: 'Törlés'
  },
  Popconfirm: {
    positiveText: 'Megerősítés',
    negativeText: 'Mégse'
  },
  Cascader: {
    placeholder: 'Kérjük, válasszon',
    loading: 'Betöltés',
    loadingRequiredMessage: (label: string): string =>
      `A kiválasztás előtt töltse be a(z) ${label} összes utódját.`
  },
  Time: {
    dateFormat: 'yyyy.MM.dd.',
    dateTimeFormat: 'yyyy.MM.dd. HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy.MM.',
    dateFormat: 'yyyy.MM.dd.',
    dateTimeFormat: 'yyyy.MM.dd. HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Törlés',
    now: 'Most',
    confirm: 'Megerősítés',
    selectTime: 'Időpont kiválasztása',
    selectDate: 'Dátum kiválasztása',
    datePlaceholder: 'Dátum kiválasztása',
    datetimePlaceholder: 'Dátum és idő kiválasztása',
    monthPlaceholder: 'Hónap kiválasztása',
    yearPlaceholder: 'Év kiválasztása',
    quarterPlaceholder: 'Negyedév kiválasztása',
    weekPlaceholder: 'Hét kiválasztása',
    startDatePlaceholder: 'Kezdő dátum',
    endDatePlaceholder: 'Záró dátum',
    startDatetimePlaceholder: 'Kezdő dátum és idő',
    endDatetimePlaceholder: 'Záró dátum és idő',
    startMonthPlaceholder: 'Kezdő hónap',
    endMonthPlaceholder: 'Záró hónap',
    monthBeforeYear: false,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Ma'
  },
  DataTable: {
    checkTableAll: 'Összes kijelölése a táblázatban',
    uncheckTableAll: 'Kijelölés törlése a táblázatban',
    confirm: 'Megerősítés',
    clear: 'Törlés'
  },
  LegacyTransfer: {
    sourceTitle: 'Forrás',
    targetTitle: 'Cél'
  },
  Transfer: {
    selectAll: 'Összes kijelölése',
    unselectAll: 'Kijelölés törlése',
    clearAll: 'Törlés',
    total: (num: number): string => `Összesen ${num} elem`,
    selected: (num: number): string => `${num} elem kiválasztva`
  },
  Empty: {
    description: 'Nincs adat'
  },
  Select: {
    placeholder: 'Kérjük, válasszon'
  },
  TimePicker: {
    placeholder: 'Időpont kiválasztása',
    positiveText: 'OK',
    negativeText: 'Mégse',
    now: 'Most',
    clear: 'Törlés'
  },
  Pagination: {
    goto: 'Ugrás',
    selectionSuffix: 'oldal'
  },
  DynamicTags: {
    add: 'Hozzáadás'
  },
  Log: {
    loading: 'Betöltés'
  },
  Input: {
    placeholder: 'Kérjük, adja meg'
  },
  InputNumber: {
    placeholder: 'Kérjük, adja meg'
  },
  DynamicInput: {
    create: 'Létrehozás'
  },
  ThemeEditor: {
    title: 'Témaszerkesztő',
    clearAllVars: 'Összes változó törlése',
    clearSearch: 'Keresés törlése',
    filterCompName: 'Komponensnév szűrése',
    filterVarName: 'Változónév szűrése',
    import: 'Importálás',
    export: 'Exportálás',
    restore: 'Alapértelmezés visszaállítása'
  },
  Image: {
    tipPrevious: 'Előző kép (←)',
    tipNext: 'Következő kép (→)',
    tipCounterclockwise: 'Óramutatóval ellentétesen',
    tipClockwise: 'Óramutató szerint',
    tipZoomOut: 'Kicsinyítés',
    tipZoomIn: 'Nagyítás',
    tipDownload: 'Letöltés',
    tipClose: 'Bezárás (Esc)',
    tipOriginalSize: 'Eredeti méretre nagyítás'
  },
  Heatmap: {
    less: 'kevesebb',
    more: 'több',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default huHU
