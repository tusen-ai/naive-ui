import type { NLocale } from './enUS'

const lvLV: NLocale = {
  name: 'lv-LV',
  global: {
    undo: 'Atsaukt',
    redo: 'Atcelt atsaukšanu',
    confirm: 'Apstiprināt',
    clear: 'Notīrīt'
  },
  Popconfirm: {
    positiveText: 'Apstiprināt',
    negativeText: 'Atcelt'
  },
  Cascader: {
    placeholder: 'Lūdzu, atlasiet',
    loading: 'Ielādē',
    loadingRequiredMessage: (label: string): string =>
      `Pirms atlases ielādējiet visus ${label} pēctečus.`
  },
  Time: {
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM.yyyy',
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Notīrīt',
    now: 'Tagad',
    confirm: 'Apstiprināt',
    selectTime: 'Atlasīt laiku',
    selectDate: 'Atlasīt datumu',
    datePlaceholder: 'Atlasīt datumu',
    datetimePlaceholder: 'Atlasīt datumu un laiku',
    monthPlaceholder: 'Atlasīt mēnesi',
    yearPlaceholder: 'Atlasīt gadu',
    quarterPlaceholder: 'Atlasīt ceturksni',
    weekPlaceholder: 'Atlasīt nedēļu',
    startDatePlaceholder: 'Sākuma datums',
    endDatePlaceholder: 'Beigu datums',
    startDatetimePlaceholder: 'Sākuma datums un laiks',
    endDatetimePlaceholder: 'Beigu datums un laiks',
    startMonthPlaceholder: 'Sākuma mēnesis',
    endMonthPlaceholder: 'Beigu mēnesis',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Šodien'
  },
  DataTable: {
    checkTableAll: 'Atlasīt visu tabulā',
    uncheckTableAll: 'Noņemt atlasi tabulā',
    confirm: 'Apstiprināt',
    clear: 'Notīrīt'
  },
  LegacyTransfer: {
    sourceTitle: 'Avots',
    targetTitle: 'Mērķis'
  },
  Transfer: {
    selectAll: 'Atlasīt visu',
    unselectAll: 'Noņemt atlasi',
    clearAll: 'Notīrīt',
    total: (num: number): string => `Kopā ${num} vienumi`,
    selected: (num: number): string => `Atlasīti ${num} vienumi`
  },
  Empty: {
    description: 'Nav datu'
  },
  Select: {
    placeholder: 'Lūdzu, atlasiet'
  },
  TimePicker: {
    placeholder: 'Atlasīt laiku',
    positiveText: 'Labi',
    negativeText: 'Atcelt',
    now: 'Tagad',
    clear: 'Notīrīt'
  },
  Pagination: {
    goto: 'Doties uz',
    selectionSuffix: 'lapa'
  },
  DynamicTags: {
    add: 'Pievienot'
  },
  Log: {
    loading: 'Ielādē'
  },
  Input: {
    placeholder: 'Lūdzu, ievadiet'
  },
  InputNumber: {
    placeholder: 'Lūdzu, ievadiet'
  },
  DynamicInput: {
    create: 'Izveidot'
  },
  ThemeEditor: {
    title: 'Tēmas redaktors',
    clearAllVars: 'Notīrīt visus mainīgos',
    clearSearch: 'Notīrīt meklēšanu',
    filterCompName: 'Filtrēt komponenta nosaukumu',
    filterVarName: 'Filtrēt mainīgā nosaukumu',
    import: 'Importēt',
    export: 'Eksportēt',
    restore: 'Atiestatīt uz noklusējumu'
  },
  Image: {
    tipPrevious: 'Iepriekšējais attēls (←)',
    tipNext: 'Nākamais attēls (→)',
    tipCounterclockwise: 'Pretēji pulksteņrādītāja virzienam',
    tipClockwise: 'Pulksteņrādītāja virzienā',
    tipZoomOut: 'Attālināt',
    tipZoomIn: 'Pietuvināt',
    tipDownload: 'Lejupielādēt',
    tipClose: 'Aizvērt (Esc)',
    tipOriginalSize: 'Tālummaiņa līdz sākotnējam izmēram'
  },
  Heatmap: {
    less: 'mazāk',
    more: 'vairāk',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default lvLV
