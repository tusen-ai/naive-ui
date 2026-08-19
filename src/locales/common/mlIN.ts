import type { NLocale } from './enUS'

const mlIN: NLocale = {
  name: 'ml-IN',
  global: {
    undo: 'പഴയപടിയാക്കുക',
    redo: 'വീണ്ടും ചെയ്യുക',
    confirm: 'സ്ഥിരീകരിക്കുക',
    clear: 'മായ്ക്കുക'
  },
  Popconfirm: {
    positiveText: 'സ്ഥിരീകരിക്കുക',
    negativeText: 'റദ്ദാക്കുക'
  },
  Cascader: {
    placeholder: 'ദയവായി തിരഞ്ഞെടുക്കുക',
    loading: 'ലോഡ് ചെയ്യുന്നു',
    loadingRequiredMessage: (label: string): string =>
      `പരിശോധിക്കുന്നതിന് മുമ്പ് ${label} ന്റെ എല്ലാ സന്തതികളെയും ലೋಡ് ചെയ്യുക.`
  },
  Time: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'മായ്ക്കുക',
    now: 'ഇപ്പോൾ',
    confirm: 'സ്ഥിരീകരിക്കുക',
    selectTime: 'സമയം തിരഞ്ഞെടുക്കുക',
    selectDate: 'തീയതി തിരഞ്ഞെടുക്കുക',
    datePlaceholder: 'തീയതി തിരഞ്ഞെടുക്കുക',
    datetimePlaceholder: 'തീയതിയും സമയവും തിരഞ്ഞെടുക്കുക',
    monthPlaceholder: 'മാസം തിരഞ്ഞെടുക്കുക',
    yearPlaceholder: 'വർഷം തിരഞ്ഞെടുക്കുക',
    quarterPlaceholder: 'ത്രൈമാസം തിരഞ്ഞെടുക്കുക',
    weekPlaceholder: 'ആഴ്ച തിരഞ്ഞെടുക്കുക',
    startDatePlaceholder: 'ആരംഭ തീയതി',
    endDatePlaceholder: 'അവസാന തീയതി',
    startDatetimePlaceholder: 'ആരംഭ തീയതിയും സമയവും',
    endDatetimePlaceholder: 'അവസാന തീയതിയും സമയവും',
    startMonthPlaceholder: 'ആരംഭ മാസം',
    endMonthPlaceholder: 'അവസാന മാസം',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ഇന്ന്'
  },
  DataTable: {
    checkTableAll: 'പട്ടികയിലെ എല്ലാം തിരഞ്ഞെടുക്കുക',
    uncheckTableAll: 'പട്ടികയിലെ എല്ലാ തിരഞ്ഞെടുപ്പും നീക്കം ചെയ്യുക',
    confirm: 'സ്ഥിരീകരിക്കുക',
    clear: 'മായ്ക്കുക'
  },
  LegacyTransfer: {
    sourceTitle: 'ഉറവിടം',
    targetTitle: 'ലക്ഷ്യം'
  },
  Transfer: {
    selectAll: 'എല്ലാം തിരഞ്ഞെടുക്കുക',
    unselectAll: 'എല്ലാ തിരഞ്ഞെടുപ്പും നീക്കം ചെയ്യുക',
    clearAll: 'മായ്ക്കുക',
    total: (num: number): string => `ആകെ ${num} ഇനങ്ങൾ`,
    selected: (num: number): string => `${num} ഇനങ്ങൾ തിരഞ്ഞെടുത്തു`
  },
  Empty: {
    description: 'ഡാറ്റയില്ല'
  },
  Select: {
    placeholder: 'ദയവായി തിരഞ്ഞെടുക്കുക'
  },
  TimePicker: {
    placeholder: 'സമയം തിരഞ്ഞെടുക്കുക',
    positiveText: 'ശരി',
    negativeText: 'റദ്ദാക്കുക',
    now: 'ഇപ്പോൾ',
    clear: 'മായ്ക്കുക'
  },
  Pagination: {
    goto: 'ഇവിടേക്ക് പോകുക',
    selectionSuffix: 'പേജ്'
  },
  DynamicTags: {
    add: 'ചേർക്കുക'
  },
  Log: {
    loading: 'ലോഡ് ചെയ്യുന്നു'
  },
  Input: {
    placeholder: 'ദയവായി നൽകുക'
  },
  InputNumber: {
    placeholder: 'ദയവായി നൽകുക'
  },
  DynamicInput: {
    create: 'സൃഷ്ടിക്കുക'
  },
  ThemeEditor: {
    title: 'തീം എഡിറ്റർ',
    clearAllVars: 'എല്ലാ വേരിയബിളുകളും മായ്ക്കുക',
    clearSearch: 'തിരയൽ മായ്ക്കുക',
    filterCompName: 'ഘടകത്തിന്റെ പേര് ഫിൽട്ടർ ചെയ്യുക',
    filterVarName: 'വേരിയബിളിന്റെ പേര് ഫിൽട്ടർ ചെയ്യുക',
    import: 'ഇറക്കുമതി',
    export: 'കയറ്റുമതി',
    restore: 'ഡിഫോൾട്ടിലേക്ക് പുനഃസജ്ജമാക്കുക'
  },
  Image: {
    tipPrevious: 'മുമ്പത്തെ ചിത്രം (←)',
    tipNext: 'അടുത്ത ചിത്രം (→)',
    tipCounterclockwise: 'ഘടികാരദിശയ്ക്ക് വിപരീതമായി',
    tipClockwise: 'ഘടികാരദിശയിൽ',
    tipZoomOut: 'ചെറുതാക്കുക',
    tipZoomIn: 'വലുതാക്കുക',
    tipDownload: 'ഡൗൺലോഡ്',
    tipClose: 'അടയ്ക്കുക (Esc)',
    tipOriginalSize: 'യഥാർത്ഥ വലുപ്പത്തിലേക്ക് സൂം ചെയ്യുക'
  },
  Heatmap: {
    less: 'കുറവ്',
    more: 'കൂടുതൽ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default mlIN
