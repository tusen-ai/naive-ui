import type { NLocale } from './enUS'

const zuZA: NLocale = {
  name: 'zu-ZA',
  global: {
    undo: 'Hlehlisa',
    redo: 'Phinda wenze',
    confirm: 'Qinisekisa',
    clear: 'Sula'
  },
  Popconfirm: {
    positiveText: 'Qinisekisa',
    negativeText: 'Khansela'
  },
  Cascader: {
    placeholder: 'Sicela ukhethe',
    loading: 'Iyalayisha',
    loadingRequiredMessage: (label: string): string =>
      `Sicela ulayishe zonke izizukulwane zika-${label} ngaphambi kokukhetha.`
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
    clear: 'Sula',
    now: 'Manje',
    confirm: 'Qinisekisa',
    selectTime: 'Khetha isikhathi',
    selectDate: 'Khetha usuku',
    datePlaceholder: 'Khetha usuku',
    datetimePlaceholder: 'Khetha usuku nesikhathi',
    monthPlaceholder: 'Khetha inyanga',
    yearPlaceholder: 'Khetha unyaka',
    quarterPlaceholder: 'Khetha ikota',
    weekPlaceholder: 'Khetha isonto',
    startDatePlaceholder: 'Usuku lokuqala',
    endDatePlaceholder: 'Usuku lokugcina',
    startDatetimePlaceholder: 'Usuku nesikhathi sokuqala',
    endDatetimePlaceholder: 'Usuku nesikhathi sokugcina',
    startMonthPlaceholder: 'Inyanga yokuqala',
    endMonthPlaceholder: 'Inyanga yokugcina',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Namuhla'
  },
  DataTable: {
    checkTableAll: 'Khetha konke etafuleni',
    uncheckTableAll: 'Susa ukukhetha konke etafuleni',
    confirm: 'Qinisekisa',
    clear: 'Sula'
  },
  LegacyTransfer: {
    sourceTitle: 'Umthombo',
    targetTitle: 'Inhloso'
  },
  Transfer: {
    selectAll: 'Khetha konke',
    unselectAll: 'Susa ukukhetha konke',
    clearAll: 'Sula',
    total: (num: number): string => `Ingqikithi yezinto ezingu-${num}`,
    selected: (num: number): string => `Kukhethwe izinto ezingu-${num}`
  },
  Empty: {
    description: 'Ayikho idatha'
  },
  Select: {
    placeholder: 'Sicela ukhethe'
  },
  TimePicker: {
    placeholder: 'Khetha isikhathi',
    positiveText: 'KULUNGILE',
    negativeText: 'Khansela',
    now: 'Manje',
    clear: 'Sula'
  },
  Pagination: {
    goto: 'Iya ku',
    selectionSuffix: 'ikhasi'
  },
  DynamicTags: {
    add: 'Engeza'
  },
  Log: {
    loading: 'Iyalayisha'
  },
  Input: {
    placeholder: 'Sicela ufake'
  },
  InputNumber: {
    placeholder: 'Sicela ufake'
  },
  DynamicInput: {
    create: 'Dala'
  },
  ThemeEditor: {
    title: 'Umhleli wetimu',
    clearAllVars: 'Sula zonke izinguquko',
    clearSearch: 'Sula ukusesha',
    filterCompName: 'Hlunga igama lengxenye',
    filterVarName: 'Hlunga igama lenguquko',
    import: 'Ngenisa',
    export: 'Khipha',
    restore: 'Buyisela okwakhona'
  },
  Image: {
    tipPrevious: 'Isithombe sangaphambilini (←)',
    tipNext: 'Isithombe esilandelayo (→)',
    tipCounterclockwise: 'Ngokuphikisana newashi',
    tipClockwise: 'Ngokulandela iwashi',
    tipZoomOut: 'Nciphisa',
    tipZoomIn: 'Khulisa',
    tipDownload: 'Landa',
    tipClose: 'Vala (Esc)',
    tipOriginalSize: 'Sondeza kubukhulu boqobo'
  },
  Heatmap: {
    less: 'kuncane',
    more: 'kuningi',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default zuZA
