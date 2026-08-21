import type { NLocale } from './enUS'

const hyAM: NLocale = {
  name: 'hy-AM',
  global: {
    undo: 'Հետարկել',
    redo: 'Կրկնել',
    confirm: 'Հաստատել',
    clear: 'Մաքրել'
  },
  Popconfirm: {
    positiveText: 'Հաստատել',
    negativeText: 'Չեղարկել'
  },
  Cascader: {
    placeholder: 'Խնդրում ենք ընտրել',
    loading: 'Բեռնում',
    loadingRequiredMessage: (label: string): string =>
      `Ընտրելուց առաջ բեռնեք ${label}-ի բոլոր ժառանգներին։`
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
    clear: 'Մաքրել',
    now: 'Հիմա',
    confirm: 'Հաստատել',
    selectTime: 'Ընտրել ժամը',
    selectDate: 'Ընտրել ամսաթիվը',
    datePlaceholder: 'Ընտրել ամսաթիվը',
    datetimePlaceholder: 'Ընտրել ամսաթիվը և ժամը',
    monthPlaceholder: 'Ընտրել ամիսը',
    yearPlaceholder: 'Ընտրել տարին',
    quarterPlaceholder: 'Ընտրել եռամսյակը',
    weekPlaceholder: 'Ընտրել շաբաթը',
    startDatePlaceholder: 'Սկզբի ամսաթիվ',
    endDatePlaceholder: 'Ավարտի ամսաթիվ',
    startDatetimePlaceholder: 'Սկզբի ամսաթիվ և ժամ',
    endDatetimePlaceholder: 'Ավարտի ամսաթիվ և ժամ',
    startMonthPlaceholder: 'Սկզբի ամիս',
    endMonthPlaceholder: 'Ավարտի ամիս',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Այսօր'
  },
  DataTable: {
    checkTableAll: 'Ընտրել աղյուսակի բոլորը',
    uncheckTableAll: 'Ապաընտրել աղյուսակի բոլորը',
    confirm: 'Հաստատել',
    clear: 'Մաքրել'
  },
  LegacyTransfer: {
    sourceTitle: 'Աղբյուր',
    targetTitle: 'Նպատակ'
  },
  Transfer: {
    selectAll: 'Ընտրել բոլորը',
    unselectAll: 'Ապաընտրել բոլորը',
    clearAll: 'Մաքրել',
    total: (num: number): string => `Ընդամենը ${num} տարր`,
    selected: (num: number): string => `Ընտրված է ${num} տարր`
  },
  Empty: {
    description: 'Տվյալներ չկան'
  },
  Select: {
    placeholder: 'Խնդրում ենք ընտրել'
  },
  TimePicker: {
    placeholder: 'Ընտրել ժամը',
    positiveText: 'Լավ',
    negativeText: 'Չեղարկել',
    now: 'Հիմա',
    clear: 'Մաքրել'
  },
  Pagination: {
    goto: 'Անցնել',
    selectionSuffix: 'էջ'
  },
  DynamicTags: {
    add: 'Ավելացնել'
  },
  Log: {
    loading: 'Բեռնում'
  },
  Input: {
    placeholder: 'Խնդրում ենք մուտքագրել'
  },
  InputNumber: {
    placeholder: 'Խնդրում ենք մուտքագրել'
  },
  DynamicInput: {
    create: 'Ստեղծել'
  },
  ThemeEditor: {
    title: 'Թեմայի խմբագիր',
    clearAllVars: 'Մաքրել բոլոր փոփոխականները',
    clearSearch: 'Մաքրել որոնումը',
    filterCompName: 'Զտել բաղադրիչի անունը',
    filterVarName: 'Զտել փոփոխականի անունը',
    import: 'Ներմուծել',
    export: 'Արտահանել',
    restore: 'Վերականգնել լռելյայնը'
  },
  Image: {
    tipPrevious: 'Նախորդ նկար (←)',
    tipNext: 'Հաջորդ նկար (→)',
    tipCounterclockwise: 'Ժամացույցի սլաքին հակառակ',
    tipClockwise: 'Ժամացույցի սլաքի ուղղությամբ',
    tipZoomOut: 'Փոքրացնել',
    tipZoomIn: 'Մեծացնել',
    tipDownload: 'Ներբեռնել',
    tipClose: 'Փակել (Esc)',
    tipOriginalSize: 'Մեծացնել սկզբնական չափին'
  },
  Heatmap: {
    less: 'պակաս',
    more: 'ավելի',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default hyAM
